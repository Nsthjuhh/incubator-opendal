// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.

use std::cell::RefCell;
use std::collections::HashMap;
use std::ffi::c_void;

use jni::objects::JObject;
use jni::objects::JValue;
use jni::sys::jboolean;
use jni::sys::jint;
use jni::sys::jlong;
use jni::sys::JNI_VERSION_1_8;
use jni::JNIEnv;
use jni::JavaVM;
use once_cell::sync::OnceCell;
use opendal::raw::PresignedRequest;
use opendal::Capability;
use opendal::Entry;
use opendal::EntryMode;
use opendal::Metadata;
use opendal::Metakey;
use opendal::OperatorInfo;
use tokio::runtime::Builder;
use tokio::runtime::Runtime;

mod blocking_operator;
mod convert;
mod error;
mod layer;
mod operator;
mod utility;

pub(crate) type Result<T> = std::result::Result<T, error::Error>;

static mut RUNTIME: OnceCell<Runtime> = OnceCell::new();
thread_local! {
    static ENV: RefCell<Option<*mut jni::sys::JNIEnv>> = RefCell::new(None);
}

/// # Safety
///
/// This function could be only called by java vm when load this lib.
#[no_mangle]
pub unsafe extern "system" fn JNI_OnLoad(vm: JavaVM, _: *mut c_void) -> jint {
    RUNTIME
        .set(
            Builder::new_multi_thread()
                .worker_threads(num_cpus::get())
                .on_thread_start(move || {
                    ENV.with(|cell| {
                        let env = vm.attach_current_thread_as_daemon().unwrap();
                        *cell.borrow_mut() = Some(env.get_raw());
                    })
                })
                .enable_all()
                .build()
                .unwrap(),
        )
        .unwrap();

    JNI_VERSION_1_8
}

/// # Safety
///
/// This function could be only called by java vm when unload this lib.
#[no_mangle]
pub unsafe extern "system" fn JNI_OnUnload(_: JavaVM, _: *mut c_void) {
    if let Some(r) = RUNTIME.take() {
        r.shutdown_background()
    }
}

/// # Safety
///
/// This function could be only when the lib is loaded and within a RUNTIME-spawned thread.
unsafe fn get_current_env<'local>() -> JNIEnv<'local> {
    let env = ENV.with(|cell| *cell.borrow_mut()).unwrap();
    JNIEnv::from_raw(env).unwrap()
}

/// # Safety
///
/// This function could be only when the lib is loaded.
unsafe fn get_global_runtime<'local>() -> &'local Runtime {
    RUNTIME.get_unchecked()
}

fn make_presigned_request<'a>(env: &mut JNIEnv<'a>, req: PresignedRequest) -> Result<JObject<'a>> {
    let method = env.new_string(req.method().as_str())?;
    let uri = env.new_string(req.uri().to_string())?;
    let headers = {
        let mut map = HashMap::new();
        for (k, v) in req.header().iter() {
            let key = k.to_string();
            let value = v.to_str().map_err(|err| {
                opendal::Error::new(opendal::ErrorKind::Unexpected, &err.to_string())
            })?;
            map.insert(key, value.to_owned());
        }
        map
    };
    let headers = convert::hashmap_to_jmap(env, &headers)?;
    let result = env.new_object(
        "org/apache/opendal/PresignedRequest",
        "(Ljava/lang/String;Ljava/lang/String;Ljava/util/Map;)V",
        &[
            JValue::Object(&method),
            JValue::Object(&uri),
            JValue::Object(&headers),
        ],
    )?;
    Ok(result)
}

fn make_operator_info<'a>(env: &mut JNIEnv<'a>, info: OperatorInfo) -> Result<JObject<'a>> {
    let schema = env.new_string(info.scheme().to_string())?;
    let root = env.new_string(info.root().to_string())?;
    let name = env.new_string(info.name().to_string())?;
    let full_capability_obj = make_capability(env, info.full_capability())?;
    let native_capability_obj = make_capability(env, info.native_capability())?;

    let result = env
        .new_object(
            "org/apache/opendal/OperatorInfo",
            "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Lorg/apache/opendal/Capability;Lorg/apache/opendal/Capability;)V",
            &[
                JValue::Object(&schema),
                JValue::Object(&root),
                JValue::Object(&name),
                JValue::Object(&full_capability_obj),
                JValue::Object(&native_capability_obj),
            ],
        )?;
    Ok(result)
}

fn make_capability<'a>(env: &mut JNIEnv<'a>, cap: Capability) -> Result<JObject<'a>> {
    let capability = env.new_object(
        "org/apache/opendal/Capability",
        "(ZZZZZZZZZZZZZZZZZZJJJZZZZZZZZZZZZZZZJZ)V",
        &[
            JValue::Bool(cap.stat as jboolean),
            JValue::Bool(cap.stat_with_if_match as jboolean),
            JValue::Bool(cap.stat_with_if_none_match as jboolean),
            JValue::Bool(cap.read as jboolean),
            JValue::Bool(cap.read_can_seek as jboolean),
            JValue::Bool(cap.read_can_next as jboolean),
            JValue::Bool(cap.read_with_range as jboolean),
            JValue::Bool(cap.read_with_if_match as jboolean),
            JValue::Bool(cap.read_with_if_none_match as jboolean),
            JValue::Bool(cap.read_with_override_cache_control as jboolean),
            JValue::Bool(cap.read_with_override_content_disposition as jboolean),
            JValue::Bool(cap.read_with_override_content_type as jboolean),
            JValue::Bool(cap.write as jboolean),
            JValue::Bool(cap.write_can_multi as jboolean),
            JValue::Bool(cap.write_can_append as jboolean),
            JValue::Bool(cap.write_with_content_type as jboolean),
            JValue::Bool(cap.write_with_content_disposition as jboolean),
            JValue::Bool(cap.write_with_cache_control as jboolean),
            JValue::Long(convert::usize_to_jlong(cap.write_multi_max_size)),
            JValue::Long(convert::usize_to_jlong(cap.write_multi_min_size)),
            JValue::Long(convert::usize_to_jlong(cap.write_multi_align_size)),
            JValue::Bool(cap.create_dir as jboolean),
            JValue::Bool(cap.delete as jboolean),
            JValue::Bool(cap.copy as jboolean),
            JValue::Bool(cap.rename as jboolean),
            JValue::Bool(cap.list as jboolean),
            JValue::Bool(cap.list_with_limit as jboolean),
            JValue::Bool(cap.list_with_start_after as jboolean),
            JValue::Bool(cap.list_with_delimiter_slash as jboolean),
            JValue::Bool(cap.list_without_delimiter as jboolean),
            JValue::Bool(cap.presign as jboolean),
            JValue::Bool(cap.presign_read as jboolean),
            JValue::Bool(cap.presign_stat as jboolean),
            JValue::Bool(cap.presign_write as jboolean),
            JValue::Bool(cap.batch as jboolean),
            JValue::Bool(cap.batch_delete as jboolean),
            JValue::Long(convert::usize_to_jlong(cap.batch_max_operations)),
            JValue::Bool(cap.blocking as jboolean),
        ],
    )?;
    Ok(capability)
}

fn make_metadata<'a>(env: &mut JNIEnv<'a>, metadata: Metadata) -> Result<JObject<'a>> {
    let mode = match metadata.mode() {
        EntryMode::FILE => 0,
        EntryMode::DIR => 1,
        EntryMode::Unknown => 2,
    };

    let metakey = metadata.metakey();

    let contains_metakey = |k| metakey.contains(k) || metakey.contains(Metakey::Complete);

    let last_modified = if contains_metakey(Metakey::LastModified) {
        metadata.last_modified().map_or_else(
            || Ok::<JObject<'_>, error::Error>(JObject::null()),
            |v| {
                Ok(env
                    .call_static_method(
                        "java/time/Instant",
                        "ofEpochSecond",
                        "(JJ)Ljava/time/Instant;",
                        &[
                            JValue::Long(v.timestamp()),
                            JValue::Long(v.timestamp_subsec_nanos() as jlong),
                        ],
                    )?
                    .l()?)
            },
        )?
    } else {
        JObject::null()
    };

    let cache_control = if contains_metakey(Metakey::CacheControl) {
        convert::string_to_jstring(env, metadata.cache_control())?
    } else {
        JObject::null()
    };

    let content_disposition = if contains_metakey(Metakey::ContentDisposition) {
        convert::string_to_jstring(env, metadata.content_disposition())?
    } else {
        JObject::null()
    };

    let content_md5 = if contains_metakey(Metakey::ContentMd5) {
        convert::string_to_jstring(env, metadata.content_md5())?
    } else {
        JObject::null()
    };

    let content_type = if contains_metakey(Metakey::ContentType) {
        convert::string_to_jstring(env, metadata.content_type())?
    } else {
        JObject::null()
    };

    let etag = if contains_metakey(Metakey::Etag) {
        convert::string_to_jstring(env, metadata.etag())?
    } else {
        JObject::null()
    };

    let version = if contains_metakey(Metakey::Version) {
        convert::string_to_jstring(env, metadata.version())?
    } else {
        JObject::null()
    };

    let content_length = if contains_metakey(Metakey::ContentLength) {
        metadata.content_length() as jlong
    } else {
        -1
    };

    let result = env
        .new_object(
            "org/apache/opendal/Metadata",
            "(IJLjava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/time/Instant;Ljava/lang/String;)V",
            &[
                JValue::Int(mode as jint),
                JValue::Long(content_length),
                JValue::Object(&content_disposition),
                JValue::Object(&content_md5),
                JValue::Object(&content_type),
                JValue::Object(&cache_control),
                JValue::Object(&etag),
                JValue::Object(&last_modified),
                JValue::Object(&version),
            ],
        )?;
    Ok(result)
}

fn make_entry<'a>(env: &mut JNIEnv<'a>, entry: Entry) -> Result<JObject<'a>> {
    let path = env.new_string(entry.path())?;
    let metadata = make_metadata(env, entry.metadata().to_owned())?;

    Ok(env.new_object(
        "org/apache/opendal/Entry",
        "(Ljava/lang/String;Lorg/apache/opendal/Metadata;)V",
        &[JValue::Object(&path), JValue::Object(&metadata)],
    )?)
}

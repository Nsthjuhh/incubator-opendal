"use strict";(self.webpackChunkopendal_website=self.webpackChunkopendal_website||[]).push([[7289],{3905:(e,t,a)=>{a.d(t,{Zo:()=>c,kt:()=>b});var n=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function l(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?l(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function i(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},l=Object.keys(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var s=n.createContext({}),u=function(e){var t=n.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},c=function(e){var t=u(e.components);return n.createElement(s.Provider,{value:t},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,l=e.originalType,s=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),p=u(a),m=r,b=p["".concat(s,".").concat(m)]||p[m]||d[m]||l;return a?n.createElement(b,o(o({ref:t},c),{},{components:a})):n.createElement(b,o({ref:t},c))}));function b(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=a.length,o=new Array(l);o[0]=m;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i[p]="string"==typeof e?e:r,o[1]=i;for(var u=2;u<l;u++)o[u]=a[u];return n.createElement.apply(null,o)}return n.createElement.apply(null,a)}m.displayName="MDXCreateElement"},5162:(e,t,a)=>{a.d(t,{Z:()=>o});var n=a(7294),r=a(6010);const l={tabItem:"tabItem_Ymn6"};function o(e){let{children:t,hidden:a,className:o}=e;return n.createElement("div",{role:"tabpanel",className:(0,r.Z)(l.tabItem,o),hidden:a},t)}},4866:(e,t,a)=>{a.d(t,{Z:()=>N});var n=a(7462),r=a(7294),l=a(6010),o=a(2466),i=a(6550),s=a(1980),u=a(7392),c=a(12);function p(e){return function(e){return r.Children.map(e,(e=>{if(!e||(0,r.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}(e).map((e=>{let{props:{value:t,label:a,attributes:n,default:r}}=e;return{value:t,label:a,attributes:n,default:r}}))}function d(e){const{values:t,children:a}=e;return(0,r.useMemo)((()=>{const e=t??p(a);return function(e){const t=(0,u.l)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,a])}function m(e){let{value:t,tabValues:a}=e;return a.some((e=>e.value===t))}function b(e){let{queryString:t=!1,groupId:a}=e;const n=(0,i.k6)(),l=function(e){let{queryString:t=!1,groupId:a}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!a)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return a??null}({queryString:t,groupId:a});return[(0,s._X)(l),(0,r.useCallback)((e=>{if(!l)return;const t=new URLSearchParams(n.location.search);t.set(l,e),n.replace({...n.location,search:t.toString()})}),[l,n])]}function f(e){const{defaultValue:t,queryString:a=!1,groupId:n}=e,l=d(e),[o,i]=(0,r.useState)((()=>function(e){let{defaultValue:t,tabValues:a}=e;if(0===a.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!m({value:t,tabValues:a}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${a.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const n=a.find((e=>e.default))??a[0];if(!n)throw new Error("Unexpected error: 0 tabValues");return n.value}({defaultValue:t,tabValues:l}))),[s,u]=b({queryString:a,groupId:n}),[p,f]=function(e){let{groupId:t}=e;const a=function(e){return e?`docusaurus.tab.${e}`:null}(t),[n,l]=(0,c.Nk)(a);return[n,(0,r.useCallback)((e=>{a&&l.set(e)}),[a,l])]}({groupId:n}),h=(()=>{const e=s??p;return m({value:e,tabValues:l})?e:null})();(0,r.useLayoutEffect)((()=>{h&&i(h)}),[h]);return{selectedValue:o,selectValue:(0,r.useCallback)((e=>{if(!m({value:e,tabValues:l}))throw new Error(`Can't select invalid tab value=${e}`);i(e),u(e),f(e)}),[u,f,l]),tabValues:l}}var h=a(2389);const k={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};function v(e){let{className:t,block:a,selectedValue:i,selectValue:s,tabValues:u}=e;const c=[],{blockElementScrollPositionUntilNextRender:p}=(0,o.o5)(),d=e=>{const t=e.currentTarget,a=c.indexOf(t),n=u[a].value;n!==i&&(p(t),s(n))},m=e=>{let t=null;switch(e.key){case"Enter":d(e);break;case"ArrowRight":{const a=c.indexOf(e.currentTarget)+1;t=c[a]??c[0];break}case"ArrowLeft":{const a=c.indexOf(e.currentTarget)-1;t=c[a]??c[c.length-1];break}}t?.focus()};return r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,l.Z)("tabs",{"tabs--block":a},t)},u.map((e=>{let{value:t,label:a,attributes:o}=e;return r.createElement("li",(0,n.Z)({role:"tab",tabIndex:i===t?0:-1,"aria-selected":i===t,key:t,ref:e=>c.push(e),onKeyDown:m,onClick:d},o,{className:(0,l.Z)("tabs__item",k.tabItem,o?.className,{"tabs__item--active":i===t})}),a??t)})))}function y(e){let{lazy:t,children:a,selectedValue:n}=e;const l=(Array.isArray(a)?a:[a]).filter(Boolean);if(t){const e=l.find((e=>e.props.value===n));return e?(0,r.cloneElement)(e,{className:"margin-top--md"}):null}return r.createElement("div",{className:"margin-top--md"},l.map(((e,t)=>(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==n}))))}function g(e){const t=f(e);return r.createElement("div",{className:(0,l.Z)("tabs-container",k.tabList)},r.createElement(v,(0,n.Z)({},e,t)),r.createElement(y,(0,n.Z)({},e,t)))}function N(e){const t=(0,h.Z)();return r.createElement(g,(0,n.Z)({key:String(t)},e))}},2226:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>m,contentTitle:()=>p,default:()=>k,frontMatter:()=>c,metadata:()=>d,toc:()=>b});var n=a(7462),r=(a(7294),a(3905));const l={toc:[{value:"Capabilities",id:"capabilities",level:2},{value:"Differences with HDFS",id:"differences-with-hdfs",level:2},{value:"Configurations",id:"configurations",level:2},{value:"Examples",id:"examples",level:2},{value:"Via Builder",id:"via-builder",level:3}]},o="wrapper";function i(e){let{components:t,...a}=e;return(0,r.kt)(o,(0,n.Z)({},l,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"There two implementations of WebHDFS REST API:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Native via HDFS Namenode and Datanode, data are transferred between nodes directly."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://hadoop.apache.org/docs/stable/hadoop-hdfs-httpfs/index.html"},"HttpFS")," is a gateway before hdfs nodes, data are proxied.")),(0,r.kt)("h2",{id:"capabilities"},"Capabilities"),(0,r.kt)("p",null,"This service can be used to:"),(0,r.kt)("ul",{className:"contains-task-list"},(0,r.kt)("li",{parentName:"ul",className:"task-list-item"},(0,r.kt)("input",{parentName:"li",type:"checkbox",checked:!0,disabled:!0})," ","stat"),(0,r.kt)("li",{parentName:"ul",className:"task-list-item"},(0,r.kt)("input",{parentName:"li",type:"checkbox",checked:!0,disabled:!0})," ","read"),(0,r.kt)("li",{parentName:"ul",className:"task-list-item"},(0,r.kt)("input",{parentName:"li",type:"checkbox",checked:!0,disabled:!0})," ","write"),(0,r.kt)("li",{parentName:"ul",className:"task-list-item"},(0,r.kt)("input",{parentName:"li",type:"checkbox",checked:!0,disabled:!0})," ","create_dir"),(0,r.kt)("li",{parentName:"ul",className:"task-list-item"},(0,r.kt)("input",{parentName:"li",type:"checkbox",checked:!0,disabled:!0})," ","delete"),(0,r.kt)("li",{parentName:"ul",className:"task-list-item"},(0,r.kt)("input",{parentName:"li",type:"checkbox",checked:!1,disabled:!0})," ","copy"),(0,r.kt)("li",{parentName:"ul",className:"task-list-item"},(0,r.kt)("input",{parentName:"li",type:"checkbox",checked:!1,disabled:!0})," ","rename"),(0,r.kt)("li",{parentName:"ul",className:"task-list-item"},(0,r.kt)("input",{parentName:"li",type:"checkbox",checked:!0,disabled:!0})," ","list"),(0,r.kt)("li",{parentName:"ul",className:"task-list-item"},(0,r.kt)("input",{parentName:"li",type:"checkbox",checked:!1,disabled:!0})," ",(0,r.kt)("del",{parentName:"li"},"scan")),(0,r.kt)("li",{parentName:"ul",className:"task-list-item"},(0,r.kt)("input",{parentName:"li",type:"checkbox",checked:!1,disabled:!0})," ",(0,r.kt)("del",{parentName:"li"},"presign")),(0,r.kt)("li",{parentName:"ul",className:"task-list-item"},(0,r.kt)("input",{parentName:"li",type:"checkbox",checked:!1,disabled:!0})," ","blocking")),(0,r.kt)("h2",{id:"differences-with-hdfs"},"Differences with HDFS"),(0,r.kt)("p",null,"[Hdfs][crate::services::Hdfs]"," is powered by HDFS's native java client. Users need to set up the HDFS services correctly. But webhdfs can access from HTTP API and no extra setup needed."),(0,r.kt)("h2",{id:"configurations"},"Configurations"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"root"),": The root path of the WebHDFS service."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"endpoint"),": The endpoint of the WebHDFS service."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"delegation"),": The delegation token for WebHDFS.")),(0,r.kt)("p",null,"Refer to ","[",(0,r.kt)("inlineCode",{parentName:"p"},"Builder"),"]","'s public API docs for more information."),(0,r.kt)("h2",{id:"examples"},"Examples"),(0,r.kt)("h3",{id:"via-builder"},"Via Builder"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-rust"},'use std::sync::Arc;\n\nuse anyhow::Result;\nuse opendal::services::Webhdfs;\nuse opendal::Operator;\n\n#[tokio::main]\nasync fn main() -> Result<()> {\n    let mut builder = Webhdfs::default();\n    // set the root for WebHDFS, all operations will happen under this root\n    //\n    // Note:\n    // if the root is not exists, the builder will automatically create the\n    // root directory for you\n    // if the root exists and is a directory, the builder will continue working\n    // if the root exists and is a folder, the builder will fail on building backend\n    builder.root("/path/to/dir");\n    // set the endpoint of webhdfs namenode, controlled by dfs.namenode.http-address\n    // default is http://127.0.0.1:9870\n    builder.endpoint("http://127.0.0.1:9870");\n    // set the delegation_token for builder\n    builder.delegation("delegation_token");\n\n    let op: Operator = Operator::new(builder)?.finish();\n\n    Ok(())\n}\n')))}i.isMDXComponent=!0;var s=a(4866),u=a(5162);const c={title:"WebHDFS"},p=void 0,d={unversionedId:"services/webhdfs",id:"services/webhdfs",title:"WebHDFS",description:"WebHDFS's REST API support.",source:"@site/docs/services/webhdfs.mdx",sourceDirName:"services",slug:"/services/webhdfs",permalink:"/docs/services/webhdfs",draft:!1,editUrl:"https://github.com/apache/incubator-opendal/tree/main/website/docs/services/webhdfs.mdx",tags:[],version:"current",lastUpdatedBy:"Xuanwo",lastUpdatedAt:1693971025,formattedLastUpdatedAt:"Sep 6, 2023",frontMatter:{title:"WebHDFS"},sidebar:"docs",previous:{title:"WebDAV",permalink:"/docs/services/webdav"},next:{title:"Contributing",permalink:"/docs/category/contributing"}},m={},b=[{value:"Via Config",id:"via-config",level:3}],f={toc:b},h="wrapper";function k(e){let{components:t,...a}=e;return(0,r.kt)(h,(0,n.Z)({},f,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://hadoop.apache.org/docs/stable/hadoop-project-dist/hadoop-hdfs/WebHDFS.html"},"WebHDFS"),"'s REST API support."),(0,r.kt)(i,{components:a.components,mdxType:"Docs"}),(0,r.kt)("h3",{id:"via-config"},"Via Config"),(0,r.kt)(s.Z,{mdxType:"Tabs"},(0,r.kt)(u.Z,{value:"rust",label:"Rust",default:!0,mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-rust"},'use anyhow::Result;\nuse opendal::Operator;\nuse opendal::Scheme;\nuse std::collections::HashMap;\n\n#[tokio::main]\nasync fn main() -> Result<()> {\n  let mut map = HashMap::new();\n  map.insert("endpoint".to_string(), "http://127.0.0.1:9870".to_string());\n  map.insert("root".to_string(), "/path/to/dir".to_string());\n  map.insert("delegation".to_string(), "delegation_token".to_string());\n\n  let op: Operator = Operator::via_map(Scheme::Webhdfs, map)?;\n  Ok(())\n}\n'))),(0,r.kt)(u.Z,{value:"node.js",label:"Node.js",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},'import { Operator } from "opendal";\n\nasync function main() {\n  const op = new Operator("webhdfs", {\n    endpoint: "http://127.0.0.1:9870",\n    root: "/path/to/dir",\n    delegation: "delegation_token",\n  });\n}\n'))),(0,r.kt)(u.Z,{value:"python",label:"Python",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},'import opendal\n\nop = opendal.Operator("webhdfs",\n    endpoint="http://127.0.0.1:9870",\n    root="/path/to/dir",\n    delegation="delegation_token",\n)\n')))))}k.isMDXComponent=!0}}]);
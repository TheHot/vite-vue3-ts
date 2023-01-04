import{bA as I,T,ak as y,ac as E,C,aX as H,G as g,aA as W,K,I as q}from"./home-c54d2e61.js";function G(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function A(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable})),n.push.apply(n,r)}return n}function $(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?A(Object(n),!0).forEach(function(r){G(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):A(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function X(e,t){if(e==null)return{};var n={},r=Object.keys(e),a,i;for(i=0;i<r.length;i++)a=r[i],!(t.indexOf(a)>=0)&&(n[a]=e[a]);return n}function Y(e,t){if(e==null)return{};var n=X(e,t),r,a;if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)r=i[a],!(t.indexOf(r)>=0)&&(!Object.prototype.propertyIsEnumerable.call(e,r)||(n[r]=e[r]))}return n}function _(e,t){return J(e)||Q(e,t)||Z(e,t)||k()}function J(e){if(Array.isArray(e))return e}function Q(e,t){if(!(typeof Symbol>"u"||!(Symbol.iterator in Object(e)))){var n=[],r=!0,a=!1,i=void 0;try{for(var u=e[Symbol.iterator](),c;!(r=(c=u.next()).done)&&(n.push(c.value),!(t&&n.length===t));r=!0);}catch(o){a=!0,i=o}finally{try{!r&&u.return!=null&&u.return()}finally{if(a)throw i}}return n}}function Z(e,t){if(!!e){if(typeof e=="string")return L(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if(n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set")return Array.from(e);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return L(e,t)}}function L(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function k(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function ee(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function R(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable})),n.push.apply(n,r)}return n}function V(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?R(Object(n),!0).forEach(function(r){ee(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):R(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function te(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(r){return t.reduceRight(function(a,i){return i(a)},r)}}function m(e){return function t(){for(var n=this,r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];return a.length>=e.length?e.apply(this,a):function(){for(var u=arguments.length,c=new Array(u),o=0;o<u;o++)c[o]=arguments[o];return t.apply(n,[].concat(a,c))}}}function O(e){return{}.toString.call(e).includes("Object")}function ne(e){return!Object.keys(e).length}function p(e){return typeof e=="function"}function re(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function ae(e,t){return O(t)||h("changeType"),Object.keys(t).some(function(n){return!re(e,n)})&&h("changeField"),t}function ie(e){p(e)||h("selectorType")}function oe(e){p(e)||O(e)||h("handlerType"),O(e)&&Object.values(e).some(function(t){return!p(t)})&&h("handlersType")}function ue(e){e||h("initialIsRequired"),O(e)||h("initialType"),ne(e)&&h("initialContent")}function le(e,t){throw new Error(e[t]||e.default)}var ce={initialIsRequired:"initial state is required",initialType:"initial state should be an object",initialContent:"initial state shouldn't be an empty object",handlerType:"handler should be an object or a function",handlersType:"all handlers should be a functions",selectorType:"selector should be a function",changeType:"provided value of changes should be an object",changeField:'it seams you want to change a field in the state which is not specified in the "initial" state',default:"an unknown error accured in `state-local` package"},h=m(le)(ce),w={changes:ae,selector:ie,handler:oe,initial:ue};function de(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};w.initial(e),w.handler(t);var n={current:e},r=m(ve)(n,t),a=m(fe)(n),i=m(w.changes)(e),u=m(se)(n);function c(){var d=arguments.length>0&&arguments[0]!==void 0?arguments[0]:function(f){return f};return w.selector(d),d(n.current)}function o(d){te(r,a,i,u)(d)}return[c,o]}function se(e,t){return p(t)?t(e.current):t}function fe(e,t){return e.current=V(V({},e.current),t),t}function ve(e,t,n){return p(t)?t(e.current):Object.keys(n).forEach(function(r){var a;return(a=t[r])===null||a===void 0?void 0:a.call(t,e.current[r])}),n}var ge={create:de},he={paths:{vs:"https://cdn.jsdelivr.net/npm/monaco-editor@0.33.0/min/vs"}};function me(e){return function t(){for(var n=this,r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];return a.length>=e.length?e.apply(this,a):function(){for(var u=arguments.length,c=new Array(u),o=0;o<u;o++)c[o]=arguments[o];return t.apply(n,[].concat(a,c))}}}function ye(e){return{}.toString.call(e).includes("Object")}function pe(e){return e||D("configIsRequired"),ye(e)||D("configType"),e.urls?(be(),{paths:{vs:e.urls.monacoBase}}):e}function be(){console.warn(N.deprecation)}function we(e,t){throw new Error(e[t]||e.default)}var N={configIsRequired:"the configuration object is required",configType:"the configuration object should be an object",default:"an unknown error accured in `@monaco-editor/loader` package",deprecation:`Deprecation warning!
    You are using deprecated way of configuration.

    Instead of using
      monaco.config({ urls: { monacoBase: '...' } })
    use
      monaco.config({ paths: { vs: '...' } })

    For more please check the link https://github.com/suren-atoyan/monaco-loader#config
  `},D=me(we)(N),Oe={config:pe},je=function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return function(a){return n.reduceRight(function(i,u){return u(i)},a)}};function F(e,t){return Object.keys(t).forEach(function(n){t[n]instanceof Object&&e[n]&&Object.assign(t[n],F(e[n],t[n]))}),$($({},e),t)}var Se={type:"cancelation",msg:"operation is manually canceled"};function S(e){var t=!1,n=new Promise(function(r,a){e.then(function(i){return t?a(Se):r(i)}),e.catch(a)});return n.cancel=function(){return t=!0},n}var Me=ge.create({config:he,isInitialized:!1,resolve:null,reject:null,monaco:null}),z=_(Me,2),b=z[0],j=z[1];function Pe(e){var t=Oe.config(e),n=t.monaco,r=Y(t,["monaco"]);j(function(a){return{config:F(a.config,r),monaco:n}})}function Ee(){var e=b(function(t){var n=t.monaco,r=t.isInitialized,a=t.resolve;return{monaco:n,isInitialized:r,resolve:a}});if(!e.isInitialized){if(j({isInitialized:!0}),e.monaco)return e.resolve(e.monaco),S(M);if(window.monaco&&window.monaco.editor)return U(window.monaco),e.resolve(window.monaco),S(M);je(Ce,Te)(Ae)}return S(M)}function Ce(e){return document.body.appendChild(e)}function Ie(e){var t=document.createElement("script");return e&&(t.src=e),t}function Te(e){var t=b(function(r){var a=r.config,i=r.reject;return{config:a,reject:i}}),n=Ie("".concat(t.config.paths.vs,"/loader.js"));return n.onload=function(){return e()},n.onerror=t.reject,n}function Ae(){var e=b(function(n){var r=n.config,a=n.resolve,i=n.reject;return{config:r,resolve:a,reject:i}}),t=window.require;t.config(e.config),t(["vs/editor/editor.main"],function(n){U(n),e.resolve(n)},function(n){e.reject(n)})}function U(e){b().monaco||j({monaco:e})}function $e(){return b(function(e){var t=e.monaco;return t})}var M=new Promise(function(e,t){return j({resolve:e,reject:t})}),Le={config:Pe,init:Ee,__getMonacoInstance:$e};function Re(){const e=I(null),t=Le.init(),n=()=>t.cancel();return t.then(r=>e.value=r).catch(r=>{(r==null?void 0:r.type)!=="cancelation"&&console.error("Monaco initialization error:",r)}),{monacoRef:e,unload:n}}const Ve={defaultValue:String,defaultPath:String,defaultLanguage:String,value:String,language:String,path:String,theme:{type:String,default:"light"},line:Number,options:{type:Object,default:()=>({})},overrideServices:{type:Object,default:()=>({})},saveViewState:{type:Boolean,default:!0},width:{type:[Number,String],default:"100%"},height:{type:[Number,String],default:"100%"},className:String,"onUpdate:value":Function,onBeforeMount:Function,onMount:Function,onChange:Function,onValidate:Function};function De(e){return e===void 0}function x(e,t,n,r){return qe(e,r)||Ne(e,t,n,r)}function qe(e,t){return e.editor.getModel(B(e,t))}function Ne(e,t,n,r){return e.editor.createModel(t,n,r?B(e,r):void 0)}function B(e,t){return e.Uri.parse(t)}const Fe={width:{type:[Number,String],required:!0},height:{type:[Number,String],required:!0},isEditorReady:{type:Boolean,required:!0},className:String,setContainerRef:Function},P={wrapper:{display:"flex",position:"relative",textAlign:"initial"},fullWidth:{width:"100%"},hide:{display:"none"}},ze={display:"flex",height:"100%",width:"100%",justifyContent:"center",alignItems:"center"};var Ue=T((e,t)=>{let{slots:n}=t;return()=>{var r;return y("div",{style:E(ze)},[(r=n.default)===null||r===void 0?void 0:r.call(n)])}}),xe=T({props:Fe,setup(e,t){let{slots:n}=t;const r=C(()=>{const{width:i,height:u}=e;return E({...P.wrapper,width:i,height:u})}),a=C(()=>E({...P.fullWidth,...!e.isEditorReady&&P.hide}));return()=>{var i;return y("div",{style:r.value},[!e.isEditorReady&&y(Ue,null,{default:()=>[(i=n.default)===null||i===void 0?void 0:i.call(n)]}),y("div",{ref:e.setContainerRef,style:a.value,class:e.className},null)])}}}),Ke=T({props:Ve,setup(e,t){let{slots:n}=t;const r=new Map,a=I(null),i=l=>a.value=l,{monacoRef:u,unload:c}=Re(),{editorRef:o}=Be(e,u,a),{disposeValidator:d}=He(e,u,o),f=C(()=>!!u.value&&!!o.value);return H(()=>{var l,s,v;(l=d.value)===null||l===void 0||l.call(d),(s=o.value.getModel())===null||s===void 0||s.dispose(),((v=o.value)===null||v===void 0?void 0:v.dispose())??c()}),g(()=>e.value,l=>{o.value&&o.value.getValue()!==l&&o.value.setValue(l)}),g(()=>e.path,(l,s)=>{const v=x(u.value,e.value||e.defaultValue,e.language||e.defaultLanguage,l);v!==o.value.getModel()&&(e.saveViewState&&r.set(s,o.value.saveViewState()),o.value.setModel(v),e.saveViewState&&o.value.restoreViewState(r.get(l)))}),g(()=>e.options,l=>o.value&&o.value.updateOptions(l),{deep:!0}),g(()=>e.theme,l=>u.value&&u.value.editor.setTheme(l)),g(()=>e.language,l=>f.value&&u.value.editor.setModelLanguage(o.value.getModel(),l)),g(()=>e.line,l=>{o.value&&!De(l)&&o.value.revealLine(l)}),()=>{var l;return y(xe,{setContainerRef:i,width:e.width,height:e.height,isEditorReady:f.value},{default:()=>[((l=n.default)===null||l===void 0?void 0:l.call(n))??"loading..."]})}}});function Be(e,t,n){const r=I(null);W(()=>{const i=g(t,()=>{n.value&&t.value&&(q(()=>i()),a())},{immediate:!0})});function a(){var i,u,c;if(!n.value||!t.value||r.value)return;(i=e.onBeforeMount)===null||i===void 0||i.call(e,t.value);const o=e.path||e.defaultPath,d=x(t.value,e.value||e.defaultValue,e.language||e.defaultLanguage,o);r.value=t.value.editor.create(n.value,{model:d,theme:e.theme,automaticLayout:!0,autoIndent:"brackets",formatOnPaste:!0,formatOnType:!0,...e.options},e.overrideServices),(u=r.value)===null||u===void 0||u.onDidChangeModelContent(f=>{const l=r.value.getValue();if(l!==e.value){var s,v;(s=e["onUpdate:value"])===null||s===void 0||s.call(e,l),(v=e.onChange)===null||v===void 0||v.call(e,l,f)}}),(c=e.onMount)===null||c===void 0||c.call(e,r.value,t.value)}return{editorRef:r}}function He(e,t,n){const r=K(null),a=g([t,n],()=>{if(t.value&&n.value){q(()=>a());const i=t.value.editor.onDidChangeMarkers(u=>{var c,o;const d=(c=n.value)===null||c===void 0||(o=c.getModel())===null||o===void 0?void 0:o.uri;if(d&&u.find(s=>s.path===d.path)){var f;const s=t.value.editor.getModelMarkers({resource:d});(f=e.onValidate)===null||f===void 0||f.call(e,s)}});r.value=()=>i==null?void 0:i.dispose()}});return{disposeValidator:r}}export{Ke as E};

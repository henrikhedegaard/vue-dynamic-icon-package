(function(s,t){typeof exports=="object"&&typeof module<"u"?t(exports,require("vue")):typeof define=="function"&&define.amd?define(["exports","vue"],t):(s=typeof globalThis<"u"?globalThis:s||self,t(s.VueIconPackage={},s.Vue))})(this,function(s,t){"use strict";const y="",l=(e,o)=>{const n=e.__vccOpts||e;for(const[i,r]of o)n[i]=r;return n},d={name:"Icon",props:{name:{type:String,required:!0,description:"The filename of the SVG icon (without extension)"},folder:{type:String,default:"",description:"Optional subfolder within the icons directory"},size:{type:[String,Number],default:24,description:"Size of the icon (number for pixels, string for custom units)"},class:{type:String,default:"",description:"Additional CSS classes (e.g. Tailwind classes)"}},data(){return{dynamicComponent:null,error:null}},computed:{computedSize(){return typeof this.size=="number"?`${this.size}px`:this.size},customClass(){return this.class?this.class:""},iconPath(){var n;const e=((n=this.$iconOptions)==null?void 0:n.basePath)||"",o=this.folder?`${this.folder}/`:"";return`${e}${o}${this.name}`}},async mounted(){await this.loadIcon()},watch:{name(){this.loadIcon()},folder(){this.loadIcon()}},methods:{async loadIcon(){var e;try{this.error=null;const o=(e=this.$iconOptions)==null?void 0:e.loader;if(!o){console.error("Icon loader not configured. Did you install the plugin correctly?"),this.error="Icon loader not configured",this.dynamicComponent=null;return}this.dynamicComponent=await o(this.iconPath)}catch(o){console.warn(`Failed to load icon: ${this.iconPath}`,o),this.error=o.message,this.dynamicComponent=null}}}},u={key:1,class:"icon-placeholder w-full h-full"};function p(e,o,n,i,r,c){return t.openBlock(),t.createElementBlock("div",{class:"icon-wrapper",style:t.normalizeStyle({width:c.computedSize,height:c.computedSize})},[r.dynamicComponent?(t.openBlock(),t.createBlock(t.resolveDynamicComponent(r.dynamicComponent),t.mergeProps({key:0},e.$attrs,{class:["icon-svg",c.customClass]}),null,16,["class"])):(t.openBlock(),t.createElementBlock("div",u))],4)}const a=l(d,[["render",p],["__scopeId","data-v-52316063"]]),h=e=>async o=>{try{return await e.resolver(o)}catch(n){return console.warn(`Failed to resolve icon: ${o}`,n),null}},m={install(e,o={}){const i={...{basePath:"",resolver:async c=>{try{return await import(`${c}.vue`)}catch(f){return console.error(`Icon not found: ${c}.vue`,f),null}}},...o},r=h(i);e.provide("iconOptions",{basePath:i.basePath,loader:r}),e.config.globalProperties.$iconOptions={basePath:i.basePath,loader:r},e.component("Icon",a)}};s.Icon=a,s.IconPlugin=m,Object.defineProperty(s,Symbol.toStringTag,{value:"Module"})});

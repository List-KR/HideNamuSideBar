// ==UserScript==
// @name         HideNamuSideBar
// @encoding     utf-8
// @namespace    https://github.com/List-KR/HideNamuSideBar
// @homepageURL  https://github.com/List-KR/HideNamuSideBar
// @supportURL   https://github.com/List-KR/HideNamuSideBar/issues
// @updateURL    https://cdn.jsdelivr.net/gh/List-KR/HideNamuSideBar@latest/HideNamuSideBar.user.js
// @downloadURL  https://cdn.jsdelivr.net/gh/List-KR/HideNamuSideBar@latest/HideNamuSideBar.user.js
// @license      MIT
//
// @version      1.0.0
// @author       PiQuark6046 and contributors
//
// @match        https://namu.wiki/*
//
// @description        HideNamuSideBar hides all sidebars at NamuWiki.
// @description:ko     HideNamuSideBar는 나무위키에 있는 모든 사이드바를 숨깁니다.
//
// @grant        unsafeWindow
// @run-at       document-start
// @inject-into  page
// ==/UserScript==
// Used libraries:
(()=>{var a=class{value;next;constructor(e){this.value=e}},l=class{#e;#t;#n;constructor(){this.clear()}enqueue(e){let n=new a(e);this.#e?(this.#t.next=n,this.#t=n):(this.#e=n,this.#t=n),this.#n++}dequeue(){let e=this.#e;if(e)return this.#e=this.#e.next,this.#n--,e.value}clear(){this.#e=void 0,this.#t=void 0,this.#n=0}get size(){return this.#n}*[Symbol.iterator](){let e=this.#e;for(;e;)yield e.value,e=e.next}};var m={bind(t,e,n){return t.bind(n)}};function d(t){if(!((Number.isInteger(t)||t===Number.POSITIVE_INFINITY)&&t>0))throw new TypeError("Expected `concurrency` to be a number from 1 and up");let e=new l,n=0,r=()=>{n--,e.size>0&&e.dequeue()()},o=async(i,s,u)=>{n++;let f=(async()=>i(...u))();s(f);try{await f}catch{}r()},E=(i,s,u)=>{e.enqueue(m.bind(o.bind(void 0,i,s,u))),(async()=>(await Promise.resolve(),n<t&&e.size>0&&e.dequeue()()))()},h=(i,...s)=>new Promise(u=>{E(i,u,s)});return Object.defineProperties(h,{activeCount:{get:()=>n},pendingCount:{get:()=>e.size},clearQueue:{value(){e.clear()}}}),h}function g(t){if(!Number.isInteger(t.Count))throw new Error("MultithreadArrayOptions.Count should be an integer");if(t.Count<=0)throw new Error("MultithreadArrayOptions.Count should be greater than 0")}function p(t,e){g(e);let n=[];for(var r=0;r<e.Count;r++)n.push(t.slice(r*Math.floor(t.length/e.Count),(r+1)*Math.floor(t.length/e.Count)));t=t.slice(e.Count*Math.floor(t.length/e.Count));for(var o=0;o<t.length;o++)n[o].push(t[o]);return n}var c=typeof unsafeWindow<"u"?unsafeWindow:window,w=(navigator.hardwareConcurrency??4)<4?4:navigator.hardwareConcurrency,v=new Event("SideBarFetchEvent"),y=t=>{var e=t.filter(n=>n instanceof HTMLElement);return e=e.filter(n=>n.querySelectorAll('div[style*="display"] > span').length!==0),e},C=t=>{t.forEach(e=>{e.style.setProperty("display","none","important")})},b=async()=>{let t=Array.from(document.querySelectorAll('main > div[class]:not([class=" "]) div[class*=" "] ~ div[class]:not([class*=" "]) ~ div[class*=" "]')),e=d(w),n=[],r=[];for(let o of p(t,{Count:w}))n.push(e(()=>y(o)));r=await Promise.all(n).then(o=>o.flat()),console.debug("[HideNamuSideBar:index] HideFunction:",r),C(r)};c.fetch=new Proxy(c.fetch,{apply:(t,e,n)=>{if(n[0]==="/sidebar.json"){c.dispatchEvent(v);return}return Reflect.apply(t,e,n)}});c.addEventListener("SideBarFetchEvent",()=>{setTimeout(b,750)});})();

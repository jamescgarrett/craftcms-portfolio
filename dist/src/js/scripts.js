!function e(t,n,o){function i(s,l){if(!n[s]){if(!t[s]){var u="function"==typeof require&&require;if(!l&&u)return u(s,!0);if(r)return r(s,!0);var a=new Error("Cannot find module '"+s+"'");throw a.code="MODULE_NOT_FOUND",a}var c=n[s]={exports:{}};t[s][0].call(c.exports,function(e){var n=t[s][1][e];return i(n?n:e)},c,c.exports,e,t,n,o)}return n[s].exports}for(var r="function"==typeof require&&require,s=0;s<o.length;s++)i(o[s]);return i}({1:[function(e,t,n){function o(e,t){"object"!=typeof t?t={hash:!!t}:void 0===t.hash&&(t.hash=!0);for(var n=t.hash?{}:"",o=t.serializer||(t.hash?s:l),i=e&&e.elements?e.elements:[],r=Object.create(null),c=0;c<i.length;++c){var f=i[c];if((t.disabled||!f.disabled)&&f.name&&a.test(f.nodeName)&&!u.test(f.type)){var d=f.name,m=f.value;if("checkbox"!==f.type&&"radio"!==f.type||f.checked||(m=void 0),t.empty){if("checkbox"!==f.type||f.checked||(m=""),"radio"===f.type&&(r[f.name]||f.checked?f.checked&&(r[f.name]=!0):r[f.name]=!1),!m&&"radio"==f.type)continue}else if(!m)continue;if("select-multiple"!==f.type)n=o(n,d,m);else{m=[];for(var p=f.options,v=!1,h=0;h<p.length;++h){var y=p[h],g=t.empty&&!y.value,S=y.value||g;y.selected&&S&&(v=!0,n=t.hash&&"[]"!==d.slice(d.length-2)?o(n,d+"[]",y.value):o(n,d,y.value))}!v&&t.empty&&(n=o(n,d,""))}}}if(t.empty)for(var d in r)r[d]||(n=o(n,d,""));return n}function i(e){var t=[],n=/^([^\[\]]*)/,o=new RegExp(c),i=n.exec(e);for(i[1]&&t.push(i[1]);null!==(i=o.exec(e));)t.push(i[1]);return t}function r(e,t,n){if(0===t.length)return e=n;var o=t.shift(),i=o.match(/^\[(.+?)\]$/);if("[]"===o)return e=e||[],Array.isArray(e)?e.push(r(null,t,n)):(e._values=e._values||[],e._values.push(r(null,t,n))),e;if(i){var s=i[1],l=+s;isNaN(l)?(e=e||{},e[s]=r(e[s],t,n)):(e=e||[],e[l]=r(e[l],t,n))}else e[o]=r(e[o],t,n);return e}function s(e,t,n){var o=t.match(c);if(o){var s=i(t);r(e,s,n)}else{var l=e[t];l?(Array.isArray(l)||(e[t]=[l]),e[t].push(n)):e[t]=n}return e}function l(e,t,n){return n=n.replace(/(\r)?\n/g,"\r\n"),n=encodeURIComponent(n),n=n.replace(/%20/g,"+"),e+(e?"&":"")+encodeURIComponent(t)+"="+n}var u=/^(?:submit|button|image|reset|file)$/i,a=/^(?:input|select|textarea|keygen)/i,c=/(\[[^\[\]]*\])/g;t.exports=o},{}],2:[function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}var i=e("../utils/Utils"),r=o(i);t.exports=function(e){for(var t=[document.querySelector(".js-hiddenList-lists"),document.querySelector(".js-hiddenList-toggle")],n=document.querySelectorAll(".js-hiddenList-item"),o=0;o<t.length;o++)r["default"].toggleClass(t[o],"is-active");for(var i=0;i<n.length;i++)r["default"].toggleClass(n[i],"is-active");"View More Clients"===e.currentTarget.textContent?e.currentTarget.textContent="View Less":e.currentTarget.textContent="View More Clients"}},{"../utils/Utils":8}],3:[function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}var i=e("form-serialize"),r=o(i),s=e("../utils/Utils"),l=o(s),u={},a=function(e,t,n){n.querySelector(".formSuccess").innerHTML=t},c=function(e,t){var n=t.querySelector(".formSuccess-loading");n.classList&&n.classList.add("is-active"),e.classList&&e.classList.add("hidden")};u.submitForm=function(e,t,n,o,i){i.preventDefault(),c(e,n);var s=(0,r["default"])(e),u=new XMLHttpRequest;u.open("post",encodeURI("/"),!0),u.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),u.onreadystatechange=function(){200===u.status&&4===u.readyState?(a(e,t,n),o&&!function(){var e=document.getElementsByTagName("body")[0];setTimeout(function(){l["default"].toggleClass(n,"is-active"),l["default"].toggleClass(e,"is-locked")},1200)}()):200===u.status&&4!==u.readyState&&c(e,n)},u.send(s)},u.ToggleForm=function(e,t){var n=document.getElementsByTagName("body")[0];l["default"].toggleClass(e,"is-active"),l["default"].toggleClass(n,"is-locked")},t.exports=u},{"../utils/Utils":8,"form-serialize":1}],4:[function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}var i=e("../utils/Utils"),r=o(i);t.exports=function(){for(var e=[document.querySelector(".js-nav"),document.querySelector(".js-navToggle"),document.querySelector(".js-overlay")],t=document.getElementsByTagName("body")[0],n=0;n<e.length;n++)r["default"].toggleClass(e[n],"is-active");r["default"].toggleClass(t,"is-locked")}},{"../utils/Utils":8}],5:[function(e,t,n){"use strict";function o(){this.lstScrollY=0,this.ticking=!1,this.done=!1;var e={item:null,animation:null,offset:null,reverse:!1};arguments[0]&&"object"===s(arguments[0])&&(this.options=r(e,arguments[0])),i.call(this)}function i(){window.addEventListener("scroll",this.onScroll.bind(this),!1)}function r(e,t){var n;for(n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e}var s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};o.prototype.onScroll=function(){this.done||(this.lastScrollY=window.scrollY,this.requestTick())},o.prototype.requestTick=function(){this.ticking||(requestAnimationFrame(this.rafUpdate.bind(this)),this.ticking=!0)},o.prototype.rafUpdate=function(){this.lastScrollY>this.options.offset?(this.options.item.classList.add(this.options.animation),this.options.reverse||(this.done=!0)):this.options.item.classList.remove(this.options.animation),this.ticking=!1},t.exports=o},{}],6:[function(e,t,n){"use strict";t.exports=function(e,t,n){for(var o=document.querySelectorAll(".workList-item"),i=t.getAttribute("data-category"),r=0;r<e.length;r++)e[r].classList.remove("workList-filter-item-is-active");t.classList.add("workList-filter-item-is-active");for(var s=0;s<o.length;s++)o[s].classList.contains(i)||"all"===i?o[s].classList.remove("workList-item-is-hidden"):o[s].classList.add("workList-item-is-hidden")}},{}],7:[function(e,t,n){(function(t){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}var o="undefined"!=typeof window?window.WOW:"undefined"!=typeof t?t.WOW:null,i=(n(o),e("./components/Nav")),r=n(i),s=e("./components/ClientList"),l=(n(s),e("./components/WorkFilter")),u=(n(l),e("./components/Form")),a=n(u),c=e("./components/Stick");n(c);document.addEventListener("DOMContentLoaded",function(){if("undefined"!=typeof document.querySelector(".js-navToggle")&&null!==document.querySelector(".js-navToggle")||"undefined"!==document.querySelector(".js-overlay")&&null!==document.querySelector(".js-overlay"))for(var e=[document.querySelector(".js-navToggle"),document.querySelector(".js-overlay")],t=0;t<e.length;t++)e[t].addEventListener("click",r["default"].bind(this));if("undefined"!=typeof document.querySelector(".js_form")&&null!==document.querySelector(".js_form")){var n=document.querySelector(".js_form"),o=document.querySelector(".js_formContainer");n.addEventListener("submit",a["default"].submitForm.bind(this,n,"<p><b>Thank you for contacting me, I'll be in touch with you shortly!</b></p>",o,!1))}})}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./components/ClientList":2,"./components/Form":3,"./components/Nav":4,"./components/Stick":5,"./components/WorkFilter":6}],8:[function(e,t,n){"use strict";var o={};o.toggleClass=function(e,t){if(e.classList)e.classList.toggle(t);else{var n=e.className.split(" "),o=n.indexOf(t);o>=0?n.splice(o,1):n.push(t),e.className=n.join(" ")}},o.closest=function(e,t){for(;e.className!==t;)if(e=e.parentNode,!e)return null;return e},o.toJSONObject=function(e){var t=JSON.parse(e);return t},o.toJSONString=function(e){var t=JSON.stringify(e);return t},o.inObject=function(e,t,n){for(var o=0;o<e.length;){if(e[o][t]===n)return o;o++}return-1},t.exports=o},{}]},{},[7]);
//# sourceMappingURL=scripts.js.map

/* Modernizr 2.6.2 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-fontface-backgroundsize-borderimage-borderradius-boxshadow-flexbox-hsla-multiplebgs-opacity-rgba-textshadow-cssanimations-csscolumns-generatedcontent-cssgradients-cssreflections-csstransforms-csstransforms3d-csstransitions-applicationcache-canvas-canvastext-draganddrop-hashchange-history-audio-video-indexeddb-input-inputtypes-localstorage-postmessage-sessionstorage-websockets-websqldatabase-webworkers-geolocation-inlinesvg-smil-svg-svgclippaths-touch-webgl-shiv-mq-cssclasses-addtest-prefixed-teststyles-testprop-testallprops-hasevent-prefixes-domprefixes-load
 */
;window.Modernizr=function(a,b,c){function D(a){j.cssText=a}function E(a,b){return D(n.join(a+";")+(b||""))}function F(a,b){return typeof a===b}function G(a,b){return!!~(""+a).indexOf(b)}function H(a,b){for(var d in a){var e=a[d];if(!G(e,"-")&&j[e]!==c)return b=="pfx"?e:!0}return!1}function I(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:F(f,"function")?f.bind(d||b):f}return!1}function J(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+p.join(d+" ")+d).split(" ");return F(b,"string")||F(b,"undefined")?H(e,b):(e=(a+" "+q.join(d+" ")+d).split(" "),I(e,b,c))}function K(){e.input=function(c){for(var d=0,e=c.length;d<e;d++)u[c[d]]=c[d]in k;return u.list&&(u.list=!!b.createElement("datalist")&&!!a.HTMLDataListElement),u}("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")),e.inputtypes=function(a){for(var d=0,e,f,h,i=a.length;d<i;d++)k.setAttribute("type",f=a[d]),e=k.type!=="text",e&&(k.value=l,k.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(f)&&k.style.WebkitAppearance!==c?(g.appendChild(k),h=b.defaultView,e=h.getComputedStyle&&h.getComputedStyle(k,null).WebkitAppearance!=="textfield"&&k.offsetHeight!==0,g.removeChild(k)):/^(search|tel)$/.test(f)||(/^(url|email)$/.test(f)?e=k.checkValidity&&k.checkValidity()===!1:e=k.value!=l)),t[a[d]]=!!e;return t}("search tel url email datetime date month week time datetime-local number range color".split(" "))}var d="2.6.2",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k=b.createElement("input"),l=":)",m={}.toString,n=" -webkit- -moz- -o- -ms- ".split(" "),o="Webkit Moz O ms",p=o.split(" "),q=o.toLowerCase().split(" "),r={svg:"http://www.w3.org/2000/svg"},s={},t={},u={},v=[],w=v.slice,x,y=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},z=function(b){var c=a.matchMedia||a.msMatchMedia;if(c)return c(b).matches;var d;return y("@media "+b+" { #"+h+" { position: absolute; } }",function(b){d=(a.getComputedStyle?getComputedStyle(b,null):b.currentStyle)["position"]=="absolute"}),d},A=function(){function d(d,e){e=e||b.createElement(a[d]||"div"),d="on"+d;var f=d in e;return f||(e.setAttribute||(e=b.createElement("div")),e.setAttribute&&e.removeAttribute&&(e.setAttribute(d,""),f=F(e[d],"function"),F(e[d],"undefined")||(e[d]=c),e.removeAttribute(d))),e=null,f}var a={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return d}(),B={}.hasOwnProperty,C;!F(B,"undefined")&&!F(B.call,"undefined")?C=function(a,b){return B.call(a,b)}:C=function(a,b){return b in a&&F(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=w.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(w.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(w.call(arguments)))};return e}),s.flexbox=function(){return J("flexWrap")},s.canvas=function(){var a=b.createElement("canvas");return!!a.getContext&&!!a.getContext("2d")},s.canvastext=function(){return!!e.canvas&&!!F(b.createElement("canvas").getContext("2d").fillText,"function")},s.webgl=function(){return!!a.WebGLRenderingContext},s.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:y(["@media (",n.join("touch-enabled),("),h,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c},s.geolocation=function(){return"geolocation"in navigator},s.postmessage=function(){return!!a.postMessage},s.websqldatabase=function(){return!!a.openDatabase},s.indexedDB=function(){return!!J("indexedDB",a)},s.hashchange=function(){return A("hashchange",a)&&(b.documentMode===c||b.documentMode>7)},s.history=function(){return!!a.history&&!!history.pushState},s.draganddrop=function(){var a=b.createElement("div");return"draggable"in a||"ondragstart"in a&&"ondrop"in a},s.websockets=function(){return"WebSocket"in a||"MozWebSocket"in a},s.rgba=function(){return D("background-color:rgba(150,255,150,.5)"),G(j.backgroundColor,"rgba")},s.hsla=function(){return D("background-color:hsla(120,40%,100%,.5)"),G(j.backgroundColor,"rgba")||G(j.backgroundColor,"hsla")},s.multiplebgs=function(){return D("background:url(https://),url(https://),red url(https://)"),/(url\s*\(.*?){3}/.test(j.background)},s.backgroundsize=function(){return J("backgroundSize")},s.borderimage=function(){return J("borderImage")},s.borderradius=function(){return J("borderRadius")},s.boxshadow=function(){return J("boxShadow")},s.textshadow=function(){return b.createElement("div").style.textShadow===""},s.opacity=function(){return E("opacity:.55"),/^0.55$/.test(j.opacity)},s.cssanimations=function(){return J("animationName")},s.csscolumns=function(){return J("columnCount")},s.cssgradients=function(){var a="background-image:",b="gradient(linear,left top,right bottom,from(#9f9),to(white));",c="linear-gradient(left top,#9f9, white);";return D((a+"-webkit- ".split(" ").join(b+a)+n.join(c+a)).slice(0,-a.length)),G(j.backgroundImage,"gradient")},s.cssreflections=function(){return J("boxReflect")},s.csstransforms=function(){return!!J("transform")},s.csstransforms3d=function(){var a=!!J("perspective");return a&&"webkitPerspective"in g.style&&y("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(b,c){a=b.offsetLeft===9&&b.offsetHeight===3}),a},s.csstransitions=function(){return J("transition")},s.fontface=function(){var a;return y('@font-face {font-family:"font";src:url("https://")}',function(c,d){var e=b.getElementById("smodernizr"),f=e.sheet||e.styleSheet,g=f?f.cssRules&&f.cssRules[0]?f.cssRules[0].cssText:f.cssText||"":"";a=/src/i.test(g)&&g.indexOf(d.split(" ")[0])===0}),a},s.generatedcontent=function(){var a;return y(["#",h,"{font:0/0 a}#",h,':after{content:"',l,'";visibility:hidden;font:3px/1 a}'].join(""),function(b){a=b.offsetHeight>=3}),a},s.video=function(){var a=b.createElement("video"),c=!1;try{if(c=!!a.canPlayType)c=new Boolean(c),c.ogg=a.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),c.h264=a.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),c.webm=a.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,"")}catch(d){}return c},s.audio=function(){var a=b.createElement("audio"),c=!1;try{if(c=!!a.canPlayType)c=new Boolean(c),c.ogg=a.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),c.mp3=a.canPlayType("audio/mpeg;").replace(/^no$/,""),c.wav=a.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),c.m4a=(a.canPlayType("audio/x-m4a;")||a.canPlayType("audio/aac;")).replace(/^no$/,"")}catch(d){}return c},s.localstorage=function(){try{return localStorage.setItem(h,h),localStorage.removeItem(h),!0}catch(a){return!1}},s.sessionstorage=function(){try{return sessionStorage.setItem(h,h),sessionStorage.removeItem(h),!0}catch(a){return!1}},s.webworkers=function(){return!!a.Worker},s.applicationcache=function(){return!!a.applicationCache},s.svg=function(){return!!b.createElementNS&&!!b.createElementNS(r.svg,"svg").createSVGRect},s.inlinesvg=function(){var a=b.createElement("div");return a.innerHTML="<svg/>",(a.firstChild&&a.firstChild.namespaceURI)==r.svg},s.smil=function(){return!!b.createElementNS&&/SVGAnimate/.test(m.call(b.createElementNS(r.svg,"animate")))},s.svgclippaths=function(){return!!b.createElementNS&&/SVGClipPath/.test(m.call(b.createElementNS(r.svg,"clipPath")))};for(var L in s)C(s,L)&&(x=L.toLowerCase(),e[x]=s[L](),v.push((e[x]?"":"no-")+x));return e.input||K(),e.addTest=function(a,b){if(typeof a=="object")for(var d in a)C(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},D(""),i=k=null,function(a,b){function k(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function l(){var a=r.elements;return typeof a=="string"?a.split(" "):a}function m(a){var b=i[a[g]];return b||(b={},h++,a[g]=h,i[h]=b),b}function n(a,c,f){c||(c=b);if(j)return c.createElement(a);f||(f=m(c));var g;return f.cache[a]?g=f.cache[a].cloneNode():e.test(a)?g=(f.cache[a]=f.createElem(a)).cloneNode():g=f.createElem(a),g.canHaveChildren&&!d.test(a)?f.frag.appendChild(g):g}function o(a,c){a||(a=b);if(j)return a.createDocumentFragment();c=c||m(a);var d=c.frag.cloneNode(),e=0,f=l(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function p(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return r.shivMethods?n(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+l().join().replace(/\w+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(r,b.frag)}function q(a){a||(a=b);var c=m(a);return r.shivCSS&&!f&&!c.hasCSS&&(c.hasCSS=!!k(a,"article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")),j||p(a,c),a}var c=a.html5||{},d=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,e=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,f,g="_html5shiv",h=0,i={},j;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",f="hidden"in a,j=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){f=!0,j=!0}})();var r={elements:c.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS:c.shivCSS!==!1,supportsUnknownElements:j,shivMethods:c.shivMethods!==!1,type:"default",shivDocument:q,createElement:n,createDocumentFragment:o};a.html5=r,q(b)}(this,b),e._version=d,e._prefixes=n,e._domPrefixes=q,e._cssomPrefixes=p,e.mq=z,e.hasEvent=A,e.testProp=function(a){return H([a])},e.testAllProps=J,e.testStyles=y,e.prefixed=function(a,b,c){return b?J(a,b,c):J(a,"pfx")},g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+v.join(" "):""),e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};

/*!
  * Bootstrap v4.0.0-beta.3 (https://getbootstrap.com)
  * Copyright 2011-2017 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
  */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("jquery"),require("popper.js")):"function"==typeof define&&define.amd?define(["exports","jquery","popper.js"],e):e(t.bootstrap={},t.jQuery,t.Popper)}(this,function(t,e,n){"use strict";function i(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function s(t,e,n){return e&&i(t.prototype,e),n&&i(t,n),t}function r(){return(r=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t}).apply(this,arguments)}e=e&&e.hasOwnProperty("default")?e.default:e,n=n&&n.hasOwnProperty("default")?n.default:n;var o=function(t){function e(t){return{}.toString.call(t).match(/\s([a-zA-Z]+)/)[1].toLowerCase()}function n(e){var n=this,i=!1;return t(this).one(s.TRANSITION_END,function(){i=!0}),setTimeout(function(){i||s.triggerTransitionEnd(n)},e),this}var i=!1,s={TRANSITION_END:"bsTransitionEnd",getUID:function(t){do{t+=~~(1e6*Math.random())}while(document.getElementById(t));return t},getSelectorFromElement:function(e){var n=e.getAttribute("data-target");n&&"#"!==n||(n=e.getAttribute("href")||""),"#"===n.charAt(0)&&(n=function(e){return e="function"==typeof t.escapeSelector?t.escapeSelector(e).substr(1):e.replace(/(:|\.|\[|\]|,|=|@)/g,"\\$1")}(n));try{return t(document).find(n).length>0?n:null}catch(t){return null}},reflow:function(t){return t.offsetHeight},triggerTransitionEnd:function(e){t(e).trigger(i.end)},supportsTransitionEnd:function(){return Boolean(i)},isElement:function(t){return(t[0]||t).nodeType},typeCheckConfig:function(t,n,i){for(var r in i)if(Object.prototype.hasOwnProperty.call(i,r)){var o=i[r],a=n[r],l=a&&s.isElement(a)?"element":e(a);if(!new RegExp(o).test(l))throw new Error(t.toUpperCase()+': Option "'+r+'" provided type "'+l+'" but expected type "'+o+'".')}}};return i=!window.QUnit&&{end:"transitionend"},t.fn.emulateTransitionEnd=n,s.supportsTransitionEnd()&&(t.event.special[s.TRANSITION_END]={bindType:i.end,delegateType:i.end,handle:function(e){if(t(e.target).is(this))return e.handleObj.handler.apply(this,arguments)}}),s}(e),a=function(t){var e="alert",n="bs.alert",i="."+n,r=t.fn[e],a={CLOSE:"close"+i,CLOSED:"closed"+i,CLICK_DATA_API:"click"+i+".data-api"},l="alert",h="fade",c="show",u=function(){function e(t){this._element=t}var i=e.prototype;return i.close=function(t){t=t||this._element;var e=this._getRootElement(t);this._triggerCloseEvent(e).isDefaultPrevented()||this._removeElement(e)},i.dispose=function(){t.removeData(this._element,n),this._element=null},i._getRootElement=function(e){var n=o.getSelectorFromElement(e),i=!1;return n&&(i=t(n)[0]),i||(i=t(e).closest("."+l)[0]),i},i._triggerCloseEvent=function(e){var n=t.Event(a.CLOSE);return t(e).trigger(n),n},i._removeElement=function(e){var n=this;t(e).removeClass(c),o.supportsTransitionEnd()&&t(e).hasClass(h)?t(e).one(o.TRANSITION_END,function(t){return n._destroyElement(e,t)}).emulateTransitionEnd(150):this._destroyElement(e)},i._destroyElement=function(e){t(e).detach().trigger(a.CLOSED).remove()},e._jQueryInterface=function(i){return this.each(function(){var s=t(this),r=s.data(n);r||(r=new e(this),s.data(n,r)),"close"===i&&r[i](this)})},e._handleDismiss=function(t){return function(e){e&&e.preventDefault(),t.close(this)}},s(e,null,[{key:"VERSION",get:function(){return"4.0.0-beta.3"}}]),e}();return t(document).on(a.CLICK_DATA_API,'[data-dismiss="alert"]',u._handleDismiss(new u)),t.fn[e]=u._jQueryInterface,t.fn[e].Constructor=u,t.fn[e].noConflict=function(){return t.fn[e]=r,u._jQueryInterface},u}(e),l=function(t){var e="button",n="bs.button",i="."+n,r=".data-api",o=t.fn[e],a="active",l="btn",h="focus",c='[data-toggle^="button"]',u='[data-toggle="buttons"]',f="input",d=".active",_=".btn",g={CLICK_DATA_API:"click"+i+r,FOCUS_BLUR_DATA_API:"focus"+i+r+" blur"+i+r},m=function(){function e(t){this._element=t}var i=e.prototype;return i.toggle=function(){var e=!0,n=!0,i=t(this._element).closest(u)[0];if(i){var s=t(this._element).find(f)[0];if(s){if("radio"===s.type)if(s.checked&&t(this._element).hasClass(a))e=!1;else{var r=t(i).find(d)[0];r&&t(r).removeClass(a)}if(e){if(s.hasAttribute("disabled")||i.hasAttribute("disabled")||s.classList.contains("disabled")||i.classList.contains("disabled"))return;s.checked=!t(this._element).hasClass(a),t(s).trigger("change")}s.focus(),n=!1}}n&&this._element.setAttribute("aria-pressed",!t(this._element).hasClass(a)),e&&t(this._element).toggleClass(a)},i.dispose=function(){t.removeData(this._element,n),this._element=null},e._jQueryInterface=function(i){return this.each(function(){var s=t(this).data(n);s||(s=new e(this),t(this).data(n,s)),"toggle"===i&&s[i]()})},s(e,null,[{key:"VERSION",get:function(){return"4.0.0-beta.3"}}]),e}();return t(document).on(g.CLICK_DATA_API,c,function(e){e.preventDefault();var n=e.target;t(n).hasClass(l)||(n=t(n).closest(_)),m._jQueryInterface.call(t(n),"toggle")}).on(g.FOCUS_BLUR_DATA_API,c,function(e){var n=t(e.target).closest(_)[0];t(n).toggleClass(h,/^focus(in)?$/.test(e.type))}),t.fn[e]=m._jQueryInterface,t.fn[e].Constructor=m,t.fn[e].noConflict=function(){return t.fn[e]=o,m._jQueryInterface},m}(e),h=function(t){var e="carousel",n="bs.carousel",i="."+n,a=t.fn[e],l={interval:5e3,keyboard:!0,slide:!1,pause:"hover",wrap:!0},h={interval:"(number|boolean)",keyboard:"boolean",slide:"(boolean|string)",pause:"(string|boolean)",wrap:"boolean"},c="next",u="prev",f="left",d="right",_={SLIDE:"slide"+i,SLID:"slid"+i,KEYDOWN:"keydown"+i,MOUSEENTER:"mouseenter"+i,MOUSELEAVE:"mouseleave"+i,TOUCHEND:"touchend"+i,LOAD_DATA_API:"load"+i+".data-api",CLICK_DATA_API:"click"+i+".data-api"},g="carousel",m="active",p="slide",v="carousel-item-right",E="carousel-item-left",T="carousel-item-next",y="carousel-item-prev",C={ACTIVE:".active",ACTIVE_ITEM:".active.carousel-item",ITEM:".carousel-item",NEXT_PREV:".carousel-item-next, .carousel-item-prev",INDICATORS:".carousel-indicators",DATA_SLIDE:"[data-slide], [data-slide-to]",DATA_RIDE:'[data-ride="carousel"]'},I=function(){function a(e,n){this._items=null,this._interval=null,this._activeElement=null,this._isPaused=!1,this._isSliding=!1,this.touchTimeout=null,this._config=this._getConfig(n),this._element=t(e)[0],this._indicatorsElement=t(this._element).find(C.INDICATORS)[0],this._addEventListeners()}var I=a.prototype;return I.next=function(){this._isSliding||this._slide(c)},I.nextWhenVisible=function(){!document.hidden&&t(this._element).is(":visible")&&"hidden"!==t(this._element).css("visibility")&&this.next()},I.prev=function(){this._isSliding||this._slide(u)},I.pause=function(e){e||(this._isPaused=!0),t(this._element).find(C.NEXT_PREV)[0]&&o.supportsTransitionEnd()&&(o.triggerTransitionEnd(this._element),this.cycle(!0)),clearInterval(this._interval),this._interval=null},I.cycle=function(t){t||(this._isPaused=!1),this._interval&&(clearInterval(this._interval),this._interval=null),this._config.interval&&!this._isPaused&&(this._interval=setInterval((document.visibilityState?this.nextWhenVisible:this.next).bind(this),this._config.interval))},I.to=function(e){var n=this;this._activeElement=t(this._element).find(C.ACTIVE_ITEM)[0];var i=this._getItemIndex(this._activeElement);if(!(e>this._items.length-1||e<0))if(this._isSliding)t(this._element).one(_.SLID,function(){return n.to(e)});else{if(i===e)return this.pause(),void this.cycle();var s=e>i?c:u;this._slide(s,this._items[e])}},I.dispose=function(){t(this._element).off(i),t.removeData(this._element,n),this._items=null,this._config=null,this._element=null,this._interval=null,this._isPaused=null,this._isSliding=null,this._activeElement=null,this._indicatorsElement=null},I._getConfig=function(t){return t=r({},l,t),o.typeCheckConfig(e,t,h),t},I._addEventListeners=function(){var e=this;this._config.keyboard&&t(this._element).on(_.KEYDOWN,function(t){return e._keydown(t)}),"hover"===this._config.pause&&(t(this._element).on(_.MOUSEENTER,function(t){return e.pause(t)}).on(_.MOUSELEAVE,function(t){return e.cycle(t)}),"ontouchstart"in document.documentElement&&t(this._element).on(_.TOUCHEND,function(){e.pause(),e.touchTimeout&&clearTimeout(e.touchTimeout),e.touchTimeout=setTimeout(function(t){return e.cycle(t)},500+e._config.interval)}))},I._keydown=function(t){if(!/input|textarea/i.test(t.target.tagName))switch(t.which){case 37:t.preventDefault(),this.prev();break;case 39:t.preventDefault(),this.next();break;default:return}},I._getItemIndex=function(e){return this._items=t.makeArray(t(e).parent().find(C.ITEM)),this._items.indexOf(e)},I._getItemByDirection=function(t,e){var n=t===c,i=t===u,s=this._getItemIndex(e),r=this._items.length-1;if((i&&0===s||n&&s===r)&&!this._config.wrap)return e;var o=(s+(t===u?-1:1))%this._items.length;return-1===o?this._items[this._items.length-1]:this._items[o]},I._triggerSlideEvent=function(e,n){var i=this._getItemIndex(e),s=this._getItemIndex(t(this._element).find(C.ACTIVE_ITEM)[0]),r=t.Event(_.SLIDE,{relatedTarget:e,direction:n,from:s,to:i});return t(this._element).trigger(r),r},I._setActiveIndicatorElement=function(e){if(this._indicatorsElement){t(this._indicatorsElement).find(C.ACTIVE).removeClass(m);var n=this._indicatorsElement.children[this._getItemIndex(e)];n&&t(n).addClass(m)}},I._slide=function(e,n){var i,s,r,a=this,l=t(this._element).find(C.ACTIVE_ITEM)[0],h=this._getItemIndex(l),u=n||l&&this._getItemByDirection(e,l),g=this._getItemIndex(u),I=Boolean(this._interval);if(e===c?(i=E,s=T,r=f):(i=v,s=y,r=d),u&&t(u).hasClass(m))this._isSliding=!1;else{if(!this._triggerSlideEvent(u,r).isDefaultPrevented()&&l&&u){this._isSliding=!0,I&&this.pause(),this._setActiveIndicatorElement(u);var A=t.Event(_.SLID,{relatedTarget:u,direction:r,from:h,to:g});o.supportsTransitionEnd()&&t(this._element).hasClass(p)?(t(u).addClass(s),o.reflow(u),t(l).addClass(i),t(u).addClass(i),t(l).one(o.TRANSITION_END,function(){t(u).removeClass(i+" "+s).addClass(m),t(l).removeClass(m+" "+s+" "+i),a._isSliding=!1,setTimeout(function(){return t(a._element).trigger(A)},0)}).emulateTransitionEnd(600)):(t(l).removeClass(m),t(u).addClass(m),this._isSliding=!1,t(this._element).trigger(A)),I&&this.cycle()}}},a._jQueryInterface=function(e){return this.each(function(){var i=t(this).data(n),s=r({},l,t(this).data());"object"==typeof e&&(s=r({},s,e));var o="string"==typeof e?e:s.slide;if(i||(i=new a(this,s),t(this).data(n,i)),"number"==typeof e)i.to(e);else if("string"==typeof o){if("undefined"==typeof i[o])throw new Error('No method named "'+o+'"');i[o]()}else s.interval&&(i.pause(),i.cycle())})},a._dataApiClickHandler=function(e){var i=o.getSelectorFromElement(this);if(i){var s=t(i)[0];if(s&&t(s).hasClass(g)){var l=r({},t(s).data(),t(this).data()),h=this.getAttribute("data-slide-to");h&&(l.interval=!1),a._jQueryInterface.call(t(s),l),h&&t(s).data(n).to(h),e.preventDefault()}}},s(a,null,[{key:"VERSION",get:function(){return"4.0.0-beta.3"}},{key:"Default",get:function(){return l}}]),a}();return t(document).on(_.CLICK_DATA_API,C.DATA_SLIDE,I._dataApiClickHandler),t(window).on(_.LOAD_DATA_API,function(){t(C.DATA_RIDE).each(function(){var e=t(this);I._jQueryInterface.call(e,e.data())})}),t.fn[e]=I._jQueryInterface,t.fn[e].Constructor=I,t.fn[e].noConflict=function(){return t.fn[e]=a,I._jQueryInterface},I}(e),c=function(t){var e="collapse",n="bs.collapse",i="."+n,a=t.fn[e],l={toggle:!0,parent:""},h={toggle:"boolean",parent:"(string|element)"},c={SHOW:"show"+i,SHOWN:"shown"+i,HIDE:"hide"+i,HIDDEN:"hidden"+i,CLICK_DATA_API:"click"+i+".data-api"},u="show",f="collapse",d="collapsing",_="collapsed",g="width",m="height",p={ACTIVES:".show, .collapsing",DATA_TOGGLE:'[data-toggle="collapse"]'},v=function(){function i(e,n){this._isTransitioning=!1,this._element=e,this._config=this._getConfig(n),this._triggerArray=t.makeArray(t('[data-toggle="collapse"][href="#'+e.id+'"],[data-toggle="collapse"][data-target="#'+e.id+'"]'));for(var i=t(p.DATA_TOGGLE),s=0;s<i.length;s++){var r=i[s],a=o.getSelectorFromElement(r);null!==a&&t(a).filter(e).length>0&&this._triggerArray.push(r)}this._parent=this._config.parent?this._getParent():null,this._config.parent||this._addAriaAndCollapsedClass(this._element,this._triggerArray),this._config.toggle&&this.toggle()}var a=i.prototype;return a.toggle=function(){t(this._element).hasClass(u)?this.hide():this.show()},a.show=function(){var e=this;if(!this._isTransitioning&&!t(this._element).hasClass(u)){var s,r;if(this._parent&&((s=t.makeArray(t(this._parent).children().children(p.ACTIVES))).length||(s=null)),!(s&&(r=t(s).data(n))&&r._isTransitioning)){var a=t.Event(c.SHOW);if(t(this._element).trigger(a),!a.isDefaultPrevented()){s&&(i._jQueryInterface.call(t(s),"hide"),r||t(s).data(n,null));var l=this._getDimension();t(this._element).removeClass(f).addClass(d),this._element.style[l]=0,this._triggerArray.length&&t(this._triggerArray).removeClass(_).attr("aria-expanded",!0),this.setTransitioning(!0);var h=function(){t(e._element).removeClass(d).addClass(f).addClass(u),e._element.style[l]="",e.setTransitioning(!1),t(e._element).trigger(c.SHOWN)};if(o.supportsTransitionEnd()){var g="scroll"+(l[0].toUpperCase()+l.slice(1));t(this._element).one(o.TRANSITION_END,h).emulateTransitionEnd(600),this._element.style[l]=this._element[g]+"px"}else h()}}}},a.hide=function(){var e=this;if(!this._isTransitioning&&t(this._element).hasClass(u)){var n=t.Event(c.HIDE);if(t(this._element).trigger(n),!n.isDefaultPrevented()){var i=this._getDimension();if(this._element.style[i]=this._element.getBoundingClientRect()[i]+"px",o.reflow(this._element),t(this._element).addClass(d).removeClass(f).removeClass(u),this._triggerArray.length)for(var s=0;s<this._triggerArray.length;s++){var r=this._triggerArray[s],a=o.getSelectorFromElement(r);if(null!==a){t(a).hasClass(u)||t(r).addClass(_).attr("aria-expanded",!1)}}this.setTransitioning(!0);var l=function(){e.setTransitioning(!1),t(e._element).removeClass(d).addClass(f).trigger(c.HIDDEN)};this._element.style[i]="",o.supportsTransitionEnd()?t(this._element).one(o.TRANSITION_END,l).emulateTransitionEnd(600):l()}}},a.setTransitioning=function(t){this._isTransitioning=t},a.dispose=function(){t.removeData(this._element,n),this._config=null,this._parent=null,this._element=null,this._triggerArray=null,this._isTransitioning=null},a._getConfig=function(t){return t=r({},l,t),t.toggle=Boolean(t.toggle),o.typeCheckConfig(e,t,h),t},a._getDimension=function(){return t(this._element).hasClass(g)?g:m},a._getParent=function(){var e=this,n=null;o.isElement(this._config.parent)?(n=this._config.parent,"undefined"!=typeof this._config.parent.jquery&&(n=this._config.parent[0])):n=t(this._config.parent)[0];var s='[data-toggle="collapse"][data-parent="'+this._config.parent+'"]';return t(n).find(s).each(function(t,n){e._addAriaAndCollapsedClass(i._getTargetFromElement(n),[n])}),n},a._addAriaAndCollapsedClass=function(e,n){if(e){var i=t(e).hasClass(u);n.length&&t(n).toggleClass(_,!i).attr("aria-expanded",i)}},i._getTargetFromElement=function(e){var n=o.getSelectorFromElement(e);return n?t(n)[0]:null},i._jQueryInterface=function(e){return this.each(function(){var s=t(this),o=s.data(n),a=r({},l,s.data(),"object"==typeof e&&e);if(!o&&a.toggle&&/show|hide/.test(e)&&(a.toggle=!1),o||(o=new i(this,a),s.data(n,o)),"string"==typeof e){if("undefined"==typeof o[e])throw new Error('No method named "'+e+'"');o[e]()}})},s(i,null,[{key:"VERSION",get:function(){return"4.0.0-beta.3"}},{key:"Default",get:function(){return l}}]),i}();return t(document).on(c.CLICK_DATA_API,p.DATA_TOGGLE,function(e){"A"===e.currentTarget.tagName&&e.preventDefault();var i=t(this),s=o.getSelectorFromElement(this);t(s).each(function(){var e=t(this),s=e.data(n)?"toggle":i.data();v._jQueryInterface.call(e,s)})}),t.fn[e]=v._jQueryInterface,t.fn[e].Constructor=v,t.fn[e].noConflict=function(){return t.fn[e]=a,v._jQueryInterface},v}(e),u=function(t){var e="dropdown",i="bs.dropdown",a="."+i,l=".data-api",h=t.fn[e],c=new RegExp("38|40|27"),u={HIDE:"hide"+a,HIDDEN:"hidden"+a,SHOW:"show"+a,SHOWN:"shown"+a,CLICK:"click"+a,CLICK_DATA_API:"click"+a+l,KEYDOWN_DATA_API:"keydown"+a+l,KEYUP_DATA_API:"keyup"+a+l},f="disabled",d="show",_="dropup",g="dropright",m="dropleft",p="dropdown-menu-right",v="dropdown-menu-left",E="position-static",T='[data-toggle="dropdown"]',y=".dropdown form",C=".dropdown-menu",I=".navbar-nav",A=".dropdown-menu .dropdown-item:not(.disabled)",b="top-start",D="top-end",S="bottom-start",w="bottom-end",N="right-start",O="left-start",k={offset:0,flip:!0,boundary:"scrollParent"},P={offset:"(number|string|function)",flip:"boolean",boundary:"(string|element)"},L=function(){function l(t,e){this._element=t,this._popper=null,this._config=this._getConfig(e),this._menu=this._getMenuElement(),this._inNavbar=this._detectNavbar(),this._addEventListeners()}var h=l.prototype;return h.toggle=function(){if(!this._element.disabled&&!t(this._element).hasClass(f)){var e=l._getParentFromElement(this._element),i=t(this._menu).hasClass(d);if(l._clearMenus(),!i){var s={relatedTarget:this._element},r=t.Event(u.SHOW,s);if(t(e).trigger(r),!r.isDefaultPrevented()){if(!this._inNavbar){if("undefined"==typeof n)throw new Error("Bootstrap dropdown require Popper.js (https://popper.js.org)");var o=this._element;t(e).hasClass(_)&&(t(this._menu).hasClass(v)||t(this._menu).hasClass(p))&&(o=e),"scrollParent"!==this._config.boundary&&t(e).addClass(E),this._popper=new n(o,this._menu,this._getPopperConfig())}"ontouchstart"in document.documentElement&&!t(e).closest(I).length&&t("body").children().on("mouseover",null,t.noop),this._element.focus(),this._element.setAttribute("aria-expanded",!0),t(this._menu).toggleClass(d),t(e).toggleClass(d).trigger(t.Event(u.SHOWN,s))}}}},h.dispose=function(){t.removeData(this._element,i),t(this._element).off(a),this._element=null,this._menu=null,null!==this._popper&&(this._popper.destroy(),this._popper=null)},h.update=function(){this._inNavbar=this._detectNavbar(),null!==this._popper&&this._popper.scheduleUpdate()},h._addEventListeners=function(){var e=this;t(this._element).on(u.CLICK,function(t){t.preventDefault(),t.stopPropagation(),e.toggle()})},h._getConfig=function(n){return n=r({},this.constructor.Default,t(this._element).data(),n),o.typeCheckConfig(e,n,this.constructor.DefaultType),n},h._getMenuElement=function(){if(!this._menu){var e=l._getParentFromElement(this._element);this._menu=t(e).find(C)[0]}return this._menu},h._getPlacement=function(){var e=t(this._element).parent(),n=S;return e.hasClass(_)?(n=b,t(this._menu).hasClass(p)&&(n=D)):e.hasClass(g)?n=N:e.hasClass(m)?n=O:t(this._menu).hasClass(p)&&(n=w),n},h._detectNavbar=function(){return t(this._element).closest(".navbar").length>0},h._getPopperConfig=function(){var t=this,e={};"function"==typeof this._config.offset?e.fn=function(e){return e.offsets=r({},e.offsets,t._config.offset(e.offsets)||{}),e}:e.offset=this._config.offset;return{placement:this._getPlacement(),modifiers:{offset:e,flip:{enabled:this._config.flip},preventOverflow:{boundariesElement:this._config.boundary}}}},l._jQueryInterface=function(e){return this.each(function(){var n=t(this).data(i);if(n||(n=new l(this,"object"==typeof e?e:null),t(this).data(i,n)),"string"==typeof e){if("undefined"==typeof n[e])throw new Error('No method named "'+e+'"');n[e]()}})},l._clearMenus=function(e){if(!e||3!==e.which&&("keyup"!==e.type||9===e.which))for(var n=t.makeArray(t(T)),s=0;s<n.length;s++){var r=l._getParentFromElement(n[s]),o=t(n[s]).data(i),a={relatedTarget:n[s]};if(o){var h=o._menu;if(t(r).hasClass(d)&&!(e&&("click"===e.type&&/input|textarea/i.test(e.target.tagName)||"keyup"===e.type&&9===e.which)&&t.contains(r,e.target))){var c=t.Event(u.HIDE,a);t(r).trigger(c),c.isDefaultPrevented()||("ontouchstart"in document.documentElement&&t("body").children().off("mouseover",null,t.noop),n[s].setAttribute("aria-expanded","false"),t(h).removeClass(d),t(r).removeClass(d).trigger(t.Event(u.HIDDEN,a)))}}}},l._getParentFromElement=function(e){var n,i=o.getSelectorFromElement(e);return i&&(n=t(i)[0]),n||e.parentNode},l._dataApiKeydownHandler=function(e){if((/input|textarea/i.test(e.target.tagName)?!(32===e.which||27!==e.which&&(40!==e.which&&38!==e.which||t(e.target).closest(C).length)):c.test(e.which))&&(e.preventDefault(),e.stopPropagation(),!this.disabled&&!t(this).hasClass(f))){var n=l._getParentFromElement(this),i=t(n).hasClass(d);if((i||27===e.which&&32===e.which)&&(!i||27!==e.which&&32!==e.which)){var s=t(n).find(A).get();if(s.length){var r=s.indexOf(e.target);38===e.which&&r>0&&r--,40===e.which&&r<s.length-1&&r++,r<0&&(r=0),s[r].focus()}}else{if(27===e.which){var o=t(n).find(T)[0];t(o).trigger("focus")}t(this).trigger("click")}}},s(l,null,[{key:"VERSION",get:function(){return"4.0.0-beta.3"}},{key:"Default",get:function(){return k}},{key:"DefaultType",get:function(){return P}}]),l}();return t(document).on(u.KEYDOWN_DATA_API,T,L._dataApiKeydownHandler).on(u.KEYDOWN_DATA_API,C,L._dataApiKeydownHandler).on(u.CLICK_DATA_API+" "+u.KEYUP_DATA_API,L._clearMenus).on(u.CLICK_DATA_API,T,function(e){e.preventDefault(),e.stopPropagation(),L._jQueryInterface.call(t(this),"toggle")}).on(u.CLICK_DATA_API,y,function(t){t.stopPropagation()}),t.fn[e]=L._jQueryInterface,t.fn[e].Constructor=L,t.fn[e].noConflict=function(){return t.fn[e]=h,L._jQueryInterface},L}(e),f=function(t){var e="modal",n="bs.modal",i="."+n,a=t.fn.modal,l={backdrop:!0,keyboard:!0,focus:!0,show:!0},h={backdrop:"(boolean|string)",keyboard:"boolean",focus:"boolean",show:"boolean"},c={HIDE:"hide"+i,HIDDEN:"hidden"+i,SHOW:"show"+i,SHOWN:"shown"+i,FOCUSIN:"focusin"+i,RESIZE:"resize"+i,CLICK_DISMISS:"click.dismiss"+i,KEYDOWN_DISMISS:"keydown.dismiss"+i,MOUSEUP_DISMISS:"mouseup.dismiss"+i,MOUSEDOWN_DISMISS:"mousedown.dismiss"+i,CLICK_DATA_API:"click"+i+".data-api"},u="modal-scrollbar-measure",f="modal-backdrop",d="modal-open",_="fade",g="show",m={DIALOG:".modal-dialog",DATA_TOGGLE:'[data-toggle="modal"]',DATA_DISMISS:'[data-dismiss="modal"]',FIXED_CONTENT:".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",STICKY_CONTENT:".sticky-top",NAVBAR_TOGGLER:".navbar-toggler"},p=function(){function a(e,n){this._config=this._getConfig(n),this._element=e,this._dialog=t(e).find(m.DIALOG)[0],this._backdrop=null,this._isShown=!1,this._isBodyOverflowing=!1,this._ignoreBackdropClick=!1,this._originalBodyPadding=0,this._scrollbarWidth=0}var p=a.prototype;return p.toggle=function(t){return this._isShown?this.hide():this.show(t)},p.show=function(e){var n=this;if(!this._isTransitioning&&!this._isShown){o.supportsTransitionEnd()&&t(this._element).hasClass(_)&&(this._isTransitioning=!0);var i=t.Event(c.SHOW,{relatedTarget:e});t(this._element).trigger(i),this._isShown||i.isDefaultPrevented()||(this._isShown=!0,this._checkScrollbar(),this._setScrollbar(),this._adjustDialog(),t(document.body).addClass(d),this._setEscapeEvent(),this._setResizeEvent(),t(this._element).on(c.CLICK_DISMISS,m.DATA_DISMISS,function(t){return n.hide(t)}),t(this._dialog).on(c.MOUSEDOWN_DISMISS,function(){t(n._element).one(c.MOUSEUP_DISMISS,function(e){t(e.target).is(n._element)&&(n._ignoreBackdropClick=!0)})}),this._showBackdrop(function(){return n._showElement(e)}))}},p.hide=function(e){var n=this;if(e&&e.preventDefault(),!this._isTransitioning&&this._isShown){var i=t.Event(c.HIDE);if(t(this._element).trigger(i),this._isShown&&!i.isDefaultPrevented()){this._isShown=!1;var s=o.supportsTransitionEnd()&&t(this._element).hasClass(_);s&&(this._isTransitioning=!0),this._setEscapeEvent(),this._setResizeEvent(),t(document).off(c.FOCUSIN),t(this._element).removeClass(g),t(this._element).off(c.CLICK_DISMISS),t(this._dialog).off(c.MOUSEDOWN_DISMISS),s?t(this._element).one(o.TRANSITION_END,function(t){return n._hideModal(t)}).emulateTransitionEnd(300):this._hideModal()}}},p.dispose=function(){t.removeData(this._element,n),t(window,document,this._element,this._backdrop).off(i),this._config=null,this._element=null,this._dialog=null,this._backdrop=null,this._isShown=null,this._isBodyOverflowing=null,this._ignoreBackdropClick=null,this._scrollbarWidth=null},p.handleUpdate=function(){this._adjustDialog()},p._getConfig=function(t){return t=r({},l,t),o.typeCheckConfig(e,t,h),t},p._showElement=function(e){var n=this,i=o.supportsTransitionEnd()&&t(this._element).hasClass(_);this._element.parentNode&&this._element.parentNode.nodeType===Node.ELEMENT_NODE||document.body.appendChild(this._element),this._element.style.display="block",this._element.removeAttribute("aria-hidden"),this._element.scrollTop=0,i&&o.reflow(this._element),t(this._element).addClass(g),this._config.focus&&this._enforceFocus();var s=t.Event(c.SHOWN,{relatedTarget:e}),r=function(){n._config.focus&&n._element.focus(),n._isTransitioning=!1,t(n._element).trigger(s)};i?t(this._dialog).one(o.TRANSITION_END,r).emulateTransitionEnd(300):r()},p._enforceFocus=function(){var e=this;t(document).off(c.FOCUSIN).on(c.FOCUSIN,function(n){document===n.target||e._element===n.target||t(e._element).has(n.target).length||e._element.focus()})},p._setEscapeEvent=function(){var e=this;this._isShown&&this._config.keyboard?t(this._element).on(c.KEYDOWN_DISMISS,function(t){27===t.which&&(t.preventDefault(),e.hide())}):this._isShown||t(this._element).off(c.KEYDOWN_DISMISS)},p._setResizeEvent=function(){var e=this;this._isShown?t(window).on(c.RESIZE,function(t){return e.handleUpdate(t)}):t(window).off(c.RESIZE)},p._hideModal=function(){var e=this;this._element.style.display="none",this._element.setAttribute("aria-hidden",!0),this._isTransitioning=!1,this._showBackdrop(function(){t(document.body).removeClass(d),e._resetAdjustments(),e._resetScrollbar(),t(e._element).trigger(c.HIDDEN)})},p._removeBackdrop=function(){this._backdrop&&(t(this._backdrop).remove(),this._backdrop=null)},p._showBackdrop=function(e){var n=this,i=t(this._element).hasClass(_)?_:"";if(this._isShown&&this._config.backdrop){var s=o.supportsTransitionEnd()&&i;if(this._backdrop=document.createElement("div"),this._backdrop.className=f,i&&t(this._backdrop).addClass(i),t(this._backdrop).appendTo(document.body),t(this._element).on(c.CLICK_DISMISS,function(t){n._ignoreBackdropClick?n._ignoreBackdropClick=!1:t.target===t.currentTarget&&("static"===n._config.backdrop?n._element.focus():n.hide())}),s&&o.reflow(this._backdrop),t(this._backdrop).addClass(g),!e)return;if(!s)return void e();t(this._backdrop).one(o.TRANSITION_END,e).emulateTransitionEnd(150)}else if(!this._isShown&&this._backdrop){t(this._backdrop).removeClass(g);var r=function(){n._removeBackdrop(),e&&e()};o.supportsTransitionEnd()&&t(this._element).hasClass(_)?t(this._backdrop).one(o.TRANSITION_END,r).emulateTransitionEnd(150):r()}else e&&e()},p._adjustDialog=function(){var t=this._element.scrollHeight>document.documentElement.clientHeight;!this._isBodyOverflowing&&t&&(this._element.style.paddingLeft=this._scrollbarWidth+"px"),this._isBodyOverflowing&&!t&&(this._element.style.paddingRight=this._scrollbarWidth+"px")},p._resetAdjustments=function(){this._element.style.paddingLeft="",this._element.style.paddingRight=""},p._checkScrollbar=function(){var t=document.body.getBoundingClientRect();this._isBodyOverflowing=t.left+t.right<window.innerWidth,this._scrollbarWidth=this._getScrollbarWidth()},p._setScrollbar=function(){var e=this;if(this._isBodyOverflowing){t(m.FIXED_CONTENT).each(function(n,i){var s=t(i)[0].style.paddingRight,r=t(i).css("padding-right");t(i).data("padding-right",s).css("padding-right",parseFloat(r)+e._scrollbarWidth+"px")}),t(m.STICKY_CONTENT).each(function(n,i){var s=t(i)[0].style.marginRight,r=t(i).css("margin-right");t(i).data("margin-right",s).css("margin-right",parseFloat(r)-e._scrollbarWidth+"px")}),t(m.NAVBAR_TOGGLER).each(function(n,i){var s=t(i)[0].style.marginRight,r=t(i).css("margin-right");t(i).data("margin-right",s).css("margin-right",parseFloat(r)+e._scrollbarWidth+"px")});var n=document.body.style.paddingRight,i=t("body").css("padding-right");t("body").data("padding-right",n).css("padding-right",parseFloat(i)+this._scrollbarWidth+"px")}},p._resetScrollbar=function(){t(m.FIXED_CONTENT).each(function(e,n){var i=t(n).data("padding-right");"undefined"!=typeof i&&t(n).css("padding-right",i).removeData("padding-right")}),t(m.STICKY_CONTENT+", "+m.NAVBAR_TOGGLER).each(function(e,n){var i=t(n).data("margin-right");"undefined"!=typeof i&&t(n).css("margin-right",i).removeData("margin-right")});var e=t("body").data("padding-right");"undefined"!=typeof e&&t("body").css("padding-right",e).removeData("padding-right")},p._getScrollbarWidth=function(){var t=document.createElement("div");t.className=u,document.body.appendChild(t);var e=t.getBoundingClientRect().width-t.clientWidth;return document.body.removeChild(t),e},a._jQueryInterface=function(e,i){return this.each(function(){var s=t(this).data(n),o=r({},a.Default,t(this).data(),"object"==typeof e&&e);if(s||(s=new a(this,o),t(this).data(n,s)),"string"==typeof e){if("undefined"==typeof s[e])throw new Error('No method named "'+e+'"');s[e](i)}else o.show&&s.show(i)})},s(a,null,[{key:"VERSION",get:function(){return"4.0.0-beta.3"}},{key:"Default",get:function(){return l}}]),a}();return t(document).on(c.CLICK_DATA_API,m.DATA_TOGGLE,function(e){var i,s=this,a=o.getSelectorFromElement(this);a&&(i=t(a)[0]);var l=t(i).data(n)?"toggle":r({},t(i).data(),t(this).data());"A"!==this.tagName&&"AREA"!==this.tagName||e.preventDefault();var h=t(i).one(c.SHOW,function(e){e.isDefaultPrevented()||h.one(c.HIDDEN,function(){t(s).is(":visible")&&s.focus()})});p._jQueryInterface.call(t(i),l,this)}),t.fn.modal=p._jQueryInterface,t.fn.modal.Constructor=p,t.fn.modal.noConflict=function(){return t.fn.modal=a,p._jQueryInterface},p}(e),d=function(t){var e="tooltip",i="bs.tooltip",a="."+i,l=t.fn[e],h=new RegExp("(^|\\s)bs-tooltip\\S+","g"),c={animation:"boolean",template:"string",title:"(string|element|function)",trigger:"string",delay:"(number|object)",html:"boolean",selector:"(string|boolean)",placement:"(string|function)",offset:"(number|string)",container:"(string|element|boolean)",fallbackPlacement:"(string|array)",boundary:"(string|element)"},u={AUTO:"auto",TOP:"top",RIGHT:"right",BOTTOM:"bottom",LEFT:"left"},f={animation:!0,template:'<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,selector:!1,placement:"top",offset:0,container:!1,fallbackPlacement:"flip",boundary:"scrollParent"},d="show",_="out",g={HIDE:"hide"+a,HIDDEN:"hidden"+a,SHOW:"show"+a,SHOWN:"shown"+a,INSERTED:"inserted"+a,CLICK:"click"+a,FOCUSIN:"focusin"+a,FOCUSOUT:"focusout"+a,MOUSEENTER:"mouseenter"+a,MOUSELEAVE:"mouseleave"+a},m="fade",p="show",v=".tooltip-inner",E=".arrow",T="hover",y="focus",C="click",I="manual",A=function(){function l(t,e){if("undefined"==typeof n)throw new Error("Bootstrap tooltips require Popper.js (https://popper.js.org)");this._isEnabled=!0,this._timeout=0,this._hoverState="",this._activeTrigger={},this._popper=null,this.element=t,this.config=this._getConfig(e),this.tip=null,this._setListeners()}var A=l.prototype;return A.enable=function(){this._isEnabled=!0},A.disable=function(){this._isEnabled=!1},A.toggleEnabled=function(){this._isEnabled=!this._isEnabled},A.toggle=function(e){if(this._isEnabled)if(e){var n=this.constructor.DATA_KEY,i=t(e.currentTarget).data(n);i||(i=new this.constructor(e.currentTarget,this._getDelegateConfig()),t(e.currentTarget).data(n,i)),i._activeTrigger.click=!i._activeTrigger.click,i._isWithActiveTrigger()?i._enter(null,i):i._leave(null,i)}else{if(t(this.getTipElement()).hasClass(p))return void this._leave(null,this);this._enter(null,this)}},A.dispose=function(){clearTimeout(this._timeout),t.removeData(this.element,this.constructor.DATA_KEY),t(this.element).off(this.constructor.EVENT_KEY),t(this.element).closest(".modal").off("hide.bs.modal"),this.tip&&t(this.tip).remove(),this._isEnabled=null,this._timeout=null,this._hoverState=null,this._activeTrigger=null,null!==this._popper&&this._popper.destroy(),this._popper=null,this.element=null,this.config=null,this.tip=null},A.show=function(){var e=this;if("none"===t(this.element).css("display"))throw new Error("Please use show on visible elements");var i=t.Event(this.constructor.Event.SHOW);if(this.isWithContent()&&this._isEnabled){t(this.element).trigger(i);var s=t.contains(this.element.ownerDocument.documentElement,this.element);if(i.isDefaultPrevented()||!s)return;var r=this.getTipElement(),a=o.getUID(this.constructor.NAME);r.setAttribute("id",a),this.element.setAttribute("aria-describedby",a),this.setContent(),this.config.animation&&t(r).addClass(m);var h="function"==typeof this.config.placement?this.config.placement.call(this,r,this.element):this.config.placement,c=this._getAttachment(h);this.addAttachmentClass(c);var u=!1===this.config.container?document.body:t(this.config.container);t(r).data(this.constructor.DATA_KEY,this),t.contains(this.element.ownerDocument.documentElement,this.tip)||t(r).appendTo(u),t(this.element).trigger(this.constructor.Event.INSERTED),this._popper=new n(this.element,r,{placement:c,modifiers:{offset:{offset:this.config.offset},flip:{behavior:this.config.fallbackPlacement},arrow:{element:E},preventOverflow:{boundariesElement:this.config.boundary}},onCreate:function(t){t.originalPlacement!==t.placement&&e._handlePopperPlacementChange(t)},onUpdate:function(t){e._handlePopperPlacementChange(t)}}),t(r).addClass(p),"ontouchstart"in document.documentElement&&t("body").children().on("mouseover",null,t.noop);var f=function(){e.config.animation&&e._fixTransition();var n=e._hoverState;e._hoverState=null,t(e.element).trigger(e.constructor.Event.SHOWN),n===_&&e._leave(null,e)};o.supportsTransitionEnd()&&t(this.tip).hasClass(m)?t(this.tip).one(o.TRANSITION_END,f).emulateTransitionEnd(l._TRANSITION_DURATION):f()}},A.hide=function(e){var n=this,i=this.getTipElement(),s=t.Event(this.constructor.Event.HIDE),r=function(){n._hoverState!==d&&i.parentNode&&i.parentNode.removeChild(i),n._cleanTipClass(),n.element.removeAttribute("aria-describedby"),t(n.element).trigger(n.constructor.Event.HIDDEN),null!==n._popper&&n._popper.destroy(),e&&e()};t(this.element).trigger(s),s.isDefaultPrevented()||(t(i).removeClass(p),"ontouchstart"in document.documentElement&&t("body").children().off("mouseover",null,t.noop),this._activeTrigger[C]=!1,this._activeTrigger[y]=!1,this._activeTrigger[T]=!1,o.supportsTransitionEnd()&&t(this.tip).hasClass(m)?t(i).one(o.TRANSITION_END,r).emulateTransitionEnd(150):r(),this._hoverState="")},A.update=function(){null!==this._popper&&this._popper.scheduleUpdate()},A.isWithContent=function(){return Boolean(this.getTitle())},A.addAttachmentClass=function(e){t(this.getTipElement()).addClass("bs-tooltip-"+e)},A.getTipElement=function(){return this.tip=this.tip||t(this.config.template)[0],this.tip},A.setContent=function(){var e=t(this.getTipElement());this.setElementContent(e.find(v),this.getTitle()),e.removeClass(m+" "+p)},A.setElementContent=function(e,n){var i=this.config.html;"object"==typeof n&&(n.nodeType||n.jquery)?i?t(n).parent().is(e)||e.empty().append(n):e.text(t(n).text()):e[i?"html":"text"](n)},A.getTitle=function(){var t=this.element.getAttribute("data-original-title");return t||(t="function"==typeof this.config.title?this.config.title.call(this.element):this.config.title),t},A._getAttachment=function(t){return u[t.toUpperCase()]},A._setListeners=function(){var e=this;this.config.trigger.split(" ").forEach(function(n){if("click"===n)t(e.element).on(e.constructor.Event.CLICK,e.config.selector,function(t){return e.toggle(t)});else if(n!==I){var i=n===T?e.constructor.Event.MOUSEENTER:e.constructor.Event.FOCUSIN,s=n===T?e.constructor.Event.MOUSELEAVE:e.constructor.Event.FOCUSOUT;t(e.element).on(i,e.config.selector,function(t){return e._enter(t)}).on(s,e.config.selector,function(t){return e._leave(t)})}t(e.element).closest(".modal").on("hide.bs.modal",function(){return e.hide()})}),this.config.selector?this.config=r({},this.config,{trigger:"manual",selector:""}):this._fixTitle()},A._fixTitle=function(){var t=typeof this.element.getAttribute("data-original-title");(this.element.getAttribute("title")||"string"!==t)&&(this.element.setAttribute("data-original-title",this.element.getAttribute("title")||""),this.element.setAttribute("title",""))},A._enter=function(e,n){var i=this.constructor.DATA_KEY;(n=n||t(e.currentTarget).data(i))||(n=new this.constructor(e.currentTarget,this._getDelegateConfig()),t(e.currentTarget).data(i,n)),e&&(n._activeTrigger["focusin"===e.type?y:T]=!0),t(n.getTipElement()).hasClass(p)||n._hoverState===d?n._hoverState=d:(clearTimeout(n._timeout),n._hoverState=d,n.config.delay&&n.config.delay.show?n._timeout=setTimeout(function(){n._hoverState===d&&n.show()},n.config.delay.show):n.show())},A._leave=function(e,n){var i=this.constructor.DATA_KEY;(n=n||t(e.currentTarget).data(i))||(n=new this.constructor(e.currentTarget,this._getDelegateConfig()),t(e.currentTarget).data(i,n)),e&&(n._activeTrigger["focusout"===e.type?y:T]=!1),n._isWithActiveTrigger()||(clearTimeout(n._timeout),n._hoverState=_,n.config.delay&&n.config.delay.hide?n._timeout=setTimeout(function(){n._hoverState===_&&n.hide()},n.config.delay.hide):n.hide())},A._isWithActiveTrigger=function(){for(var t in this._activeTrigger)if(this._activeTrigger[t])return!0;return!1},A._getConfig=function(n){return"number"==typeof(n=r({},this.constructor.Default,t(this.element).data(),n)).delay&&(n.delay={show:n.delay,hide:n.delay}),"number"==typeof n.title&&(n.title=n.title.toString()),"number"==typeof n.content&&(n.content=n.content.toString()),o.typeCheckConfig(e,n,this.constructor.DefaultType),n},A._getDelegateConfig=function(){var t={};if(this.config)for(var e in this.config)this.constructor.Default[e]!==this.config[e]&&(t[e]=this.config[e]);return t},A._cleanTipClass=function(){var e=t(this.getTipElement()),n=e.attr("class").match(h);null!==n&&n.length>0&&e.removeClass(n.join(""))},A._handlePopperPlacementChange=function(t){this._cleanTipClass(),this.addAttachmentClass(this._getAttachment(t.placement))},A._fixTransition=function(){var e=this.getTipElement(),n=this.config.animation;null===e.getAttribute("x-placement")&&(t(e).removeClass(m),this.config.animation=!1,this.hide(),this.show(),this.config.animation=n)},l._jQueryInterface=function(e){return this.each(function(){var n=t(this).data(i),s="object"==typeof e&&e;if((n||!/dispose|hide/.test(e))&&(n||(n=new l(this,s),t(this).data(i,n)),"string"==typeof e)){if("undefined"==typeof n[e])throw new Error('No method named "'+e+'"');n[e]()}})},s(l,null,[{key:"VERSION",get:function(){return"4.0.0-beta.3"}},{key:"Default",get:function(){return f}},{key:"NAME",get:function(){return e}},{key:"DATA_KEY",get:function(){return i}},{key:"Event",get:function(){return g}},{key:"EVENT_KEY",get:function(){return a}},{key:"DefaultType",get:function(){return c}}]),l}();return t.fn[e]=A._jQueryInterface,t.fn[e].Constructor=A,t.fn[e].noConflict=function(){return t.fn[e]=l,A._jQueryInterface},A}(e),_=function(t){var e="popover",n="bs.popover",i="."+n,o=t.fn[e],a=new RegExp("(^|\\s)bs-popover\\S+","g"),l=r({},d.Default,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'}),h=r({},d.DefaultType,{content:"(string|element|function)"}),c="fade",u="show",f=".popover-header",_=".popover-body",g={HIDE:"hide"+i,HIDDEN:"hidden"+i,SHOW:"show"+i,SHOWN:"shown"+i,INSERTED:"inserted"+i,CLICK:"click"+i,FOCUSIN:"focusin"+i,FOCUSOUT:"focusout"+i,MOUSEENTER:"mouseenter"+i,MOUSELEAVE:"mouseleave"+i},m=function(r){function o(){return r.apply(this,arguments)||this}!function(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,t.__proto__=e}(o,r);var d=o.prototype;return d.isWithContent=function(){return this.getTitle()||this._getContent()},d.addAttachmentClass=function(e){t(this.getTipElement()).addClass("bs-popover-"+e)},d.getTipElement=function(){return this.tip=this.tip||t(this.config.template)[0],this.tip},d.setContent=function(){var e=t(this.getTipElement());this.setElementContent(e.find(f),this.getTitle());var n=this._getContent();"function"==typeof n&&(n=n.call(this.element)),this.setElementContent(e.find(_),n),e.removeClass(c+" "+u)},d._getContent=function(){return this.element.getAttribute("data-content")||this.config.content},d._cleanTipClass=function(){var e=t(this.getTipElement()),n=e.attr("class").match(a);null!==n&&n.length>0&&e.removeClass(n.join(""))},o._jQueryInterface=function(e){return this.each(function(){var i=t(this).data(n),s="object"==typeof e?e:null;if((i||!/destroy|hide/.test(e))&&(i||(i=new o(this,s),t(this).data(n,i)),"string"==typeof e)){if("undefined"==typeof i[e])throw new Error('No method named "'+e+'"');i[e]()}})},s(o,null,[{key:"VERSION",get:function(){return"4.0.0-beta.3"}},{key:"Default",get:function(){return l}},{key:"NAME",get:function(){return e}},{key:"DATA_KEY",get:function(){return n}},{key:"Event",get:function(){return g}},{key:"EVENT_KEY",get:function(){return i}},{key:"DefaultType",get:function(){return h}}]),o}(d);return t.fn[e]=m._jQueryInterface,t.fn[e].Constructor=m,t.fn[e].noConflict=function(){return t.fn[e]=o,m._jQueryInterface},m}(e),g=function(t){var e="scrollspy",n="bs.scrollspy",i="."+n,a=t.fn[e],l={offset:10,method:"auto",target:""},h={offset:"number",method:"string",target:"(string|element)"},c={ACTIVATE:"activate"+i,SCROLL:"scroll"+i,LOAD_DATA_API:"load"+i+".data-api"},u="dropdown-item",f="active",d={DATA_SPY:'[data-spy="scroll"]',ACTIVE:".active",NAV_LIST_GROUP:".nav, .list-group",NAV_LINKS:".nav-link",NAV_ITEMS:".nav-item",LIST_ITEMS:".list-group-item",DROPDOWN:".dropdown",DROPDOWN_ITEMS:".dropdown-item",DROPDOWN_TOGGLE:".dropdown-toggle"},_="offset",g="position",m=function(){function a(e,n){var i=this;this._element=e,this._scrollElement="BODY"===e.tagName?window:e,this._config=this._getConfig(n),this._selector=this._config.target+" "+d.NAV_LINKS+","+this._config.target+" "+d.LIST_ITEMS+","+this._config.target+" "+d.DROPDOWN_ITEMS,this._offsets=[],this._targets=[],this._activeTarget=null,this._scrollHeight=0,t(this._scrollElement).on(c.SCROLL,function(t){return i._process(t)}),this.refresh(),this._process()}var m=a.prototype;return m.refresh=function(){var e=this,n=this._scrollElement!==this._scrollElement.window?g:_,i="auto"===this._config.method?n:this._config.method,s=i===g?this._getScrollTop():0;this._offsets=[],this._targets=[],this._scrollHeight=this._getScrollHeight();t.makeArray(t(this._selector)).map(function(e){var n,r=o.getSelectorFromElement(e);if(r&&(n=t(r)[0]),n){var a=n.getBoundingClientRect();if(a.width||a.height)return[t(n)[i]().top+s,r]}return null}).filter(function(t){return t}).sort(function(t,e){return t[0]-e[0]}).forEach(function(t){e._offsets.push(t[0]),e._targets.push(t[1])})},m.dispose=function(){t.removeData(this._element,n),t(this._scrollElement).off(i),this._element=null,this._scrollElement=null,this._config=null,this._selector=null,this._offsets=null,this._targets=null,this._activeTarget=null,this._scrollHeight=null},m._getConfig=function(n){if("string"!=typeof(n=r({},l,n)).target){var i=t(n.target).attr("id");i||(i=o.getUID(e),t(n.target).attr("id",i)),n.target="#"+i}return o.typeCheckConfig(e,n,h),n},m._getScrollTop=function(){return this._scrollElement===window?this._scrollElement.pageYOffset:this._scrollElement.scrollTop},m._getScrollHeight=function(){return this._scrollElement.scrollHeight||Math.max(document.body.scrollHeight,document.documentElement.scrollHeight)},m._getOffsetHeight=function(){return this._scrollElement===window?window.innerHeight:this._scrollElement.getBoundingClientRect().height},m._process=function(){var t=this._getScrollTop()+this._config.offset,e=this._getScrollHeight(),n=this._config.offset+e-this._getOffsetHeight();if(this._scrollHeight!==e&&this.refresh(),t>=n){var i=this._targets[this._targets.length-1];this._activeTarget!==i&&this._activate(i)}else{if(this._activeTarget&&t<this._offsets[0]&&this._offsets[0]>0)return this._activeTarget=null,void this._clear();for(var s=this._offsets.length;s--;){this._activeTarget!==this._targets[s]&&t>=this._offsets[s]&&("undefined"==typeof this._offsets[s+1]||t<this._offsets[s+1])&&this._activate(this._targets[s])}}},m._activate=function(e){this._activeTarget=e,this._clear();var n=this._selector.split(",");n=n.map(function(t){return t+'[data-target="'+e+'"],'+t+'[href="'+e+'"]'});var i=t(n.join(","));i.hasClass(u)?(i.closest(d.DROPDOWN).find(d.DROPDOWN_TOGGLE).addClass(f),i.addClass(f)):(i.addClass(f),i.parents(d.NAV_LIST_GROUP).prev(d.NAV_LINKS+", "+d.LIST_ITEMS).addClass(f),i.parents(d.NAV_LIST_GROUP).prev(d.NAV_ITEMS).children(d.NAV_LINKS).addClass(f)),t(this._scrollElement).trigger(c.ACTIVATE,{relatedTarget:e})},m._clear=function(){t(this._selector).filter(d.ACTIVE).removeClass(f)},a._jQueryInterface=function(e){return this.each(function(){var i=t(this).data(n);if(i||(i=new a(this,"object"==typeof e&&e),t(this).data(n,i)),"string"==typeof e){if("undefined"==typeof i[e])throw new Error('No method named "'+e+'"');i[e]()}})},s(a,null,[{key:"VERSION",get:function(){return"4.0.0-beta.3"}},{key:"Default",get:function(){return l}}]),a}();return t(window).on(c.LOAD_DATA_API,function(){for(var e=t.makeArray(t(d.DATA_SPY)),n=e.length;n--;){var i=t(e[n]);m._jQueryInterface.call(i,i.data())}}),t.fn[e]=m._jQueryInterface,t.fn[e].Constructor=m,t.fn[e].noConflict=function(){return t.fn[e]=a,m._jQueryInterface},m}(e),m=function(t){var e="bs.tab",n="."+e,i=t.fn.tab,r={HIDE:"hide"+n,HIDDEN:"hidden"+n,SHOW:"show"+n,SHOWN:"shown"+n,CLICK_DATA_API:"click.bs.tab.data-api"},a="dropdown-menu",l="active",h="disabled",c="fade",u="show",f=".dropdown",d=".nav, .list-group",_=".active",g="> li > .active",m='[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',p=".dropdown-toggle",v="> .dropdown-menu .active",E=function(){function n(t){this._element=t}var i=n.prototype;return i.show=function(){var e=this;if(!(this._element.parentNode&&this._element.parentNode.nodeType===Node.ELEMENT_NODE&&t(this._element).hasClass(l)||t(this._element).hasClass(h))){var n,i,s=t(this._element).closest(d)[0],a=o.getSelectorFromElement(this._element);if(s){var c="UL"===s.nodeName?g:_;i=(i=t.makeArray(t(s).find(c)))[i.length-1]}var u=t.Event(r.HIDE,{relatedTarget:this._element}),f=t.Event(r.SHOW,{relatedTarget:i});if(i&&t(i).trigger(u),t(this._element).trigger(f),!f.isDefaultPrevented()&&!u.isDefaultPrevented()){a&&(n=t(a)[0]),this._activate(this._element,s);var m=function(){var n=t.Event(r.HIDDEN,{relatedTarget:e._element}),s=t.Event(r.SHOWN,{relatedTarget:i});t(i).trigger(n),t(e._element).trigger(s)};n?this._activate(n,n.parentNode,m):m()}}},i.dispose=function(){t.removeData(this._element,e),this._element=null},i._activate=function(e,n,i){var s=this,r=("UL"===n.nodeName?t(n).find(g):t(n).children(_))[0],a=i&&o.supportsTransitionEnd()&&r&&t(r).hasClass(c),l=function(){return s._transitionComplete(e,r,i)};r&&a?t(r).one(o.TRANSITION_END,l).emulateTransitionEnd(150):l()},i._transitionComplete=function(e,n,i){if(n){t(n).removeClass(u+" "+l);var s=t(n.parentNode).find(v)[0];s&&t(s).removeClass(l),"tab"===n.getAttribute("role")&&n.setAttribute("aria-selected",!1)}if(t(e).addClass(l),"tab"===e.getAttribute("role")&&e.setAttribute("aria-selected",!0),o.reflow(e),t(e).addClass(u),e.parentNode&&t(e.parentNode).hasClass(a)){var r=t(e).closest(f)[0];r&&t(r).find(p).addClass(l),e.setAttribute("aria-expanded",!0)}i&&i()},n._jQueryInterface=function(i){return this.each(function(){var s=t(this),r=s.data(e);if(r||(r=new n(this),s.data(e,r)),"string"==typeof i){if("undefined"==typeof r[i])throw new Error('No method named "'+i+'"');r[i]()}})},s(n,null,[{key:"VERSION",get:function(){return"4.0.0-beta.3"}}]),n}();return t(document).on(r.CLICK_DATA_API,m,function(e){e.preventDefault(),E._jQueryInterface.call(t(this),"show")}),t.fn.tab=E._jQueryInterface,t.fn.tab.Constructor=E,t.fn.tab.noConflict=function(){return t.fn.tab=i,E._jQueryInterface},E}(e);!function(t){if("undefined"==typeof t)throw new Error("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");var e=t.fn.jquery.split(" ")[0].split(".");if(e[0]<2&&e[1]<9||1===e[0]&&9===e[1]&&e[2]<1||e[0]>=4)throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")}(e),t.Util=o,t.Alert=a,t.Button=l,t.Carousel=h,t.Collapse=c,t.Dropdown=u,t.Modal=f,t.Popover=_,t.Scrollspy=g,t.Tab=m,t.Tooltip=d,Object.defineProperty(t,"__esModule",{value:!0})});
//# sourceMappingURL=bootstrap.min.js.map
/*	
 * jQuery mmenu v4.5.7
 * @requires jQuery 1.7.0 or later
 *
 * mmenu.frebsite.nl
 *	
 * Copyright (c) Fred Heusschen
 * www.frebsite.nl
 *
 * Licensed under the MIT license:
 * http://en.wikipedia.org/wiki/MIT_License
 */
!function(e){function n(n,s,t){if(t)return"object"!=typeof n&&(n={}),n;n=e.extend(!0,{},e[a].defaults,n);for(var i=["position","zposition","modal","moveBackground"],o=0,l=i.length;l>o;o++)"undefined"!=typeof n[i[o]]&&(e[a].deprecated('The option "'+i[o]+'"',"offCanvas."+i[o]),n.offCanvas=n.offCanvas||{},n.offCanvas[i[o]]=n[i[o]]);return n}function s(n){n=e.extend(!0,{},e[a].configuration,n);for(var s=["panel","list","selected","label","spacer"],t=0,i=s.length;i>t;t++)"undefined"!=typeof n[s[t]+"Class"]&&(e[a].deprecated('The configuration option "'+s[t]+'Class"',"classNames."+s[t]),n.classNames[s[t]]=n[s[t]+"Class"]);if("undefined"!=typeof n.counterClass&&(e[a].deprecated('The configuration option "counterClass"',"classNames.counters.counter"),n.classNames.counters=n.classNames.counters||{},n.classNames.counters.counter=n.counterClass),"undefined"!=typeof n.collapsedClass&&(e[a].deprecated('The configuration option "collapsedClass"',"classNames.labels.collapsed"),n.classNames.labels=n.classNames.labels||{},n.classNames.labels.collapsed=n.collapsedClass),"undefined"!=typeof n.header)for(var s=["panelHeader","panelNext","panelPrev"],t=0,i=s.length;i>t;t++)"undefined"!=typeof n.header[s[t]+"Class"]&&(e[a].deprecated('The configuration option "header.'+s[t]+'Class"',"classNames.header."+s[t]),n.classNames.header=n.classNames.header||{},n.classNames.header[s[t]]=n.header[s[t]+"Class"]);for(var s=["pageNodetype","pageSelector","menuWrapperSelector","menuInjectMethod"],t=0,i=s.length;i>t;t++)"undefined"!=typeof n[s[t]]&&(e[a].deprecated('The configuration option "'+s[t]+'"',"offCanvas."+s[t]),n.offCanvas=n.offCanvas||{},n.offCanvas[s[t]]=n[s[t]]);return n}function t(){r=!0,c.$wndw=e(window),c.$html=e("html"),c.$body=e("body"),e.each([o,l,d],function(e,n){n.add=function(e){e=e.split(" ");for(var s in e)n[e[s]]=n.mm(e[s])}}),o.mm=function(e){return"mm-"+e},o.add("wrapper menu inline panel nopanel list nolist subtitle selected label spacer current highest hidden opened subopened subopen fullsubopen subclose"),o.umm=function(e){return"mm-"==e.slice(0,3)&&(e=e.slice(3)),e},l.mm=function(e){return"mm-"+e},l.add("parent"),d.mm=function(e){return e+".mm"},d.add("toggle open close setSelected transitionend webkitTransitionEnd mousedown mouseup touchstart touchmove touchend scroll resize click keydown keyup"),e[a]._c=o,e[a]._d=l,e[a]._e=d,e[a].glbl=c}var a="mmenu",i="4.5.7";if(!e[a]){var o={},l={},d={},r=!1,c={$wndw:null,$html:null,$body:null};e[a]=function(e,s,t){return this.$menu=e,this.opts=s,this.conf=t,this.vars={},this.opts=n(this.opts,this.conf,this.$menu),this._initMenu(),this._init(this.$menu.children(this.conf.panelNodetype)),this},e[a].version=i,e[a].addons=[],e[a].uniqueId=0,e[a].defaults={classes:"",slidingSubmenus:!0,onClick:{setSelected:!0}},e[a].configuration={panelNodetype:"ul, ol, div",transitionDuration:400,openingInterval:25,classNames:{panel:"Panel",selected:"Selected",label:"Label",spacer:"Spacer"}},e[a].prototype={_init:function(n){n=n.not("."+o.nopanel),n=this._initPanels(n),n=this._initLinks(n),n=this._bindCustomEvents(n);for(var s=0;s<e[a].addons.length;s++)"function"==typeof this["_init_"+e[a].addons[s]]&&this["_init_"+e[a].addons[s]](n);this._update()},_initMenu:function(){this.opts.offCanvas&&this.conf.clone&&(this.$menu=this.$menu.clone(!0),this.$menu.add(this.$menu.find("*")).filter("[id]").each(function(){e(this).attr("id",o.mm(e(this).attr("id")))})),this.$menu.contents().each(function(){3==e(this)[0].nodeType&&e(this).remove()}),this.$menu.parent().addClass(o.wrapper);var n=[o.menu];n.push(o.mm(this.opts.slidingSubmenus?"horizontal":"vertical")),this.opts.classes&&n.push(this.opts.classes),this.$menu.addClass(n.join(" "))},_initPanels:function(n){var s=this;this.__findAddBack(n,"ul, ol").not("."+o.nolist).addClass(o.list);var t=this.__findAddBack(n,"."+o.list).find("> li");this.__refactorClass(t,this.conf.classNames.selected,"selected"),this.__refactorClass(t,this.conf.classNames.label,"label"),this.__refactorClass(t,this.conf.classNames.spacer,"spacer"),t.off(d.setSelected).on(d.setSelected,function(n,s){n.stopPropagation(),t.removeClass(o.selected),"boolean"!=typeof s&&(s=!0),s&&e(this).addClass(o.selected)}),this.__refactorClass(this.__findAddBack(n,"."+this.conf.classNames.panel),this.conf.classNames.panel,"panel"),n.add(this.__findAddBack(n,"."+o.list).children().children().filter(this.conf.panelNodetype).not("."+o.nopanel)).addClass(o.panel);var a=this.__findAddBack(n,"."+o.panel),i=e("."+o.panel,this.$menu);a.each(function(){var n=e(this),t=n.attr("id")||s.__getUniqueId();n.attr("id",t)}),a.each(function(){var n=e(this),t=n.is("ul, ol")?n:n.find("ul ,ol").first(),a=n.parent(),i=a.find("> a, > span"),d=a.closest("."+o.panel);if(a.parent().is("."+o.list)){n.data(l.parent,a);var r=e('<a class="'+o.subopen+'" href="#'+n.attr("id")+'" />').insertBefore(i);i.is("a")||r.addClass(o.fullsubopen),s.opts.slidingSubmenus&&t.prepend('<li class="'+o.subtitle+'"><a class="'+o.subclose+'" href="#'+d.attr("id")+'">'+i.text()+"</a></li>")}});var r=this.opts.slidingSubmenus?d.open:d.toggle;if(i.each(function(){var n=e(this),s=n.attr("id");e('a[href="#'+s+'"]',i).off(d.click).on(d.click,function(e){e.preventDefault(),n.trigger(r)})}),this.opts.slidingSubmenus){var c=this.__findAddBack(n,"."+o.list).find("> li."+o.selected);c.parents("li").removeClass(o.selected).end().add(c.parents("li")).each(function(){var n=e(this),s=n.find("> ."+o.panel);s.length&&(n.parents("."+o.panel).addClass(o.subopened),s.addClass(o.opened))}).closest("."+o.panel).addClass(o.opened).parents("."+o.panel).addClass(o.subopened)}else{var c=e("li."+o.selected,i);c.parents("li").removeClass(o.selected).end().add(c.parents("li")).addClass(o.opened)}var u=i.filter("."+o.opened);return u.length||(u=a.first()),u.addClass(o.opened).last().addClass(o.current),this.opts.slidingSubmenus&&a.not(u.last()).addClass(o.hidden).end().appendTo(this.$menu),a},_initLinks:function(n){var s=this;return this.__findAddBack(n,"."+o.list).find("> li > a").not("."+o.subopen).not("."+o.subclose).not('[rel="external"]').not('[target="_blank"]').off(d.click).on(d.click,function(n){var t=e(this),a=t.attr("href")||"";s.__valueOrFn(s.opts.onClick.setSelected,t)&&t.parent().trigger(d.setSelected);var i=s.__valueOrFn(s.opts.onClick.preventDefault,t,"#"==a.slice(0,1));i&&n.preventDefault(),s.__valueOrFn(s.opts.onClick.blockUI,t,!i)&&c.$html.addClass(o.blocking),s.__valueOrFn(s.opts.onClick.close,t,i)&&s.$menu.triggerHandler(d.close)}),n},_bindCustomEvents:function(n){var s=this;return n.off(d.toggle+" "+d.open+" "+d.close).on(d.toggle+" "+d.open+" "+d.close,function(e){e.stopPropagation()}),this.opts.slidingSubmenus?n.on(d.open,function(){return s._openSubmenuHorizontal(e(this))}):n.on(d.toggle,function(){var n=e(this);return n.triggerHandler(n.parent().hasClass(o.opened)?d.close:d.open)}).on(d.open,function(){return e(this).parent().addClass(o.opened),"open"}).on(d.close,function(){return e(this).parent().removeClass(o.opened),"close"}),n},_openSubmenuHorizontal:function(n){if(n.hasClass(o.current))return!1;var s=e("."+o.panel,this.$menu),t=s.filter("."+o.current);return s.removeClass(o.highest).removeClass(o.current).not(n).not(t).addClass(o.hidden),n.hasClass(o.opened)?t.addClass(o.highest).removeClass(o.opened).removeClass(o.subopened):(n.addClass(o.highest),t.addClass(o.subopened)),n.removeClass(o.hidden).addClass(o.current),setTimeout(function(){n.removeClass(o.subopened).addClass(o.opened)},this.conf.openingInterval),"open"},_update:function(e){if(this.updates||(this.updates=[]),"function"==typeof e)this.updates.push(e);else for(var n=0,s=this.updates.length;s>n;n++)this.updates[n].call(this,e)},__valueOrFn:function(e,n,s){return"function"==typeof e?e.call(n[0]):"undefined"==typeof e&&"undefined"!=typeof s?s:e},__refactorClass:function(e,n,s){e.filter("."+n).removeClass(n).addClass(o[s])},__findAddBack:function(e,n){return e.find(n).add(e.filter(n))},__transitionend:function(e,n,s){var t=!1,a=function(){t||n.call(e[0]),t=!0};e.one(d.transitionend,a),e.one(d.webkitTransitionEnd,a),setTimeout(a,1.1*s)},__getUniqueId:function(){return o.mm(e[a].uniqueId++)}},e.fn[a]=function(i,o){return r||t(),i=n(i,o),o=s(o),this.each(function(){var n=e(this);n.data(a)||n.data(a,new e[a](n,i,o))})},e[a].support={touch:"ontouchstart"in window.document},e[a].debug=function(){},e[a].deprecated=function(e,n){"undefined"!=typeof console&&"undefined"!=typeof console.warn&&console.warn("MMENU: "+e+" is deprecated, use "+n+" instead.")}}}(jQuery);
/*	
 * jQuery mmenu offCanvas addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
!function(e){function o(o){return("top"==o.position||"bottom"==o.position)&&("back"==o.zposition||"next"==o.zposition)&&(e[s].deprecated('Using position "'+o.position+'" in combination with zposition "'+o.zposition+'"','zposition "front"'),o.zposition="front"),o}function t(e){return"string"!=typeof e.pageSelector&&(e.pageSelector="> "+e.pageNodetype),e}function n(){c=!0,p=e[s]._c,a=e[s]._d,r=e[s]._e,p.add("offcanvas modal background opening blocker page"),a.add("style"),r.add("opening opened closing closed setPage"),l=e[s].glbl,l.$allMenus=(l.$allMenus||e()).add(this.$menu),l.$wndw.on(r.keydown,function(e){return l.$html.hasClass(p.opened)&&9==e.keyCode?(e.preventDefault(),!1):void 0});var o=0;l.$wndw.on(r.resize,function(e,t){if(t||l.$html.hasClass(p.opened)){var n=l.$wndw.height();(t||n!=o)&&(o=n,l.$page.css("minHeight",n))}})}var s="mmenu",i="offCanvas";e[s].prototype["_init_"+i]=function(){if(this.opts[i]&&!this.vars[i+"_added"]){this.vars[i+"_added"]=!0,c||n(),this.opts[i]=o(this.opts[i]),this.conf[i]=t(this.conf[i]);var e=this.opts[i],s=this.conf[i],a=[p.offcanvas];"boolean"!=typeof this.vars.opened&&(this.vars.opened=!1),"left"!=e.position&&a.push(p.mm(e.position)),"back"!=e.zposition&&a.push(p.mm(e.zposition)),this.$menu.addClass(a.join(" ")).parent().removeClass(p.wrapper),this[i+"_initPage"](l.$page),this[i+"_initBlocker"](),this[i+"_initOpenClose"](),this[i+"_bindCustomEvents"](),this.$menu[s.menuInjectMethod+"To"](s.menuWrapperSelector)}},e[s].addons.push(i),e[s].defaults[i]={position:"left",zposition:"back",modal:!1,moveBackground:!0},e[s].configuration[i]={pageNodetype:"div",pageSelector:null,menuWrapperSelector:"body",menuInjectMethod:"prepend"},e[s].prototype.open=function(){if(this.vars.opened)return!1;var e=this;return this._openSetup(),setTimeout(function(){e._openFinish()},this.conf.openingInterval),"open"},e[s].prototype._openSetup=function(){l.$allMenus.not(this.$menu).trigger(r.close),l.$page.data(a.style,l.$page.attr("style")||""),l.$wndw.trigger(r.resize,[!0]);var e=[p.opened];this.opts[i].modal&&e.push(p.modal),this.opts[i].moveBackground&&e.push(p.background),"left"!=this.opts[i].position&&e.push(p.mm(this.opts[i].position)),"back"!=this.opts[i].zposition&&e.push(p.mm(this.opts[i].zposition)),this.opts.classes&&e.push(this.opts.classes),l.$html.addClass(e.join(" ")),this.vars.opened=!0,this.$menu.addClass(p.current+" "+p.opened)},e[s].prototype._openFinish=function(){var e=this;this.__transitionend(l.$page,function(){e.$menu.trigger(r.opened)},this.conf.transitionDuration),l.$html.addClass(p.opening),this.$menu.trigger(r.opening)},e[s].prototype.close=function(){if(!this.vars.opened)return!1;var e=this;return this.__transitionend(l.$page,function(){e.$menu.removeClass(p.current).removeClass(p.opened),l.$html.removeClass(p.opened).removeClass(p.modal).removeClass(p.background).removeClass(p.mm(e.opts[i].position)).removeClass(p.mm(e.opts[i].zposition)),e.opts.classes&&l.$html.removeClass(e.opts.classes),l.$page.attr("style",l.$page.data(a.style)),e.vars.opened=!1,e.$menu.trigger(r.closed)},this.conf.transitionDuration),l.$html.removeClass(p.opening),this.$menu.trigger(r.closing),"close"},e[s].prototype[i+"_initBlocker"]=function(){var o=this;l.$blck||(l.$blck=e('<div id="'+p.blocker+'" />').appendTo(l.$body)),l.$blck.off(r.touchstart).on(r.touchstart,function(e){e.preventDefault(),e.stopPropagation(),l.$blck.trigger(r.mousedown)}).on(r.mousedown,function(e){e.preventDefault(),l.$html.hasClass(p.modal)||o.close()})},e[s].prototype[i+"_initPage"]=function(o){o||(o=e(this.conf[i].pageSelector,l.$body),o.length>1&&(e[s].debug("Multiple nodes found for the page-node, all nodes are wrapped in one <"+this.conf[i].pageNodetype+">."),o=o.wrapAll("<"+this.conf[i].pageNodetype+" />").parent())),o.addClass(p.page),l.$page=o},e[s].prototype[i+"_initOpenClose"]=function(){var o=this,t=this.$menu.attr("id");t&&t.length&&(this.conf.clone&&(t=p.umm(t)),e('a[href="#'+t+'"]').off(r.click).on(r.click,function(e){e.preventDefault(),o.open()}));var t=l.$page.attr("id");t&&t.length&&e('a[href="#'+t+'"]').on(r.click,function(e){e.preventDefault(),o.close()})},e[s].prototype[i+"_bindCustomEvents"]=function(){var e=this,o=r.open+" "+r.opening+" "+r.opened+" "+r.close+" "+r.closing+" "+r.closed+" "+r.setPage;this.$menu.off(o).on(o,function(e){e.stopPropagation()}),this.$menu.on(r.open,function(){e.open()}).on(r.close,function(){e.close()}).on(r.setPage,function(o,t){e[i+"_initPage"](t),e[i+"_initOpenClose"]()})};var p,a,r,l,c=!1}(jQuery);
/*	
 * jQuery mmenu buttonbars addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
!function(t){function n(t){return t}function a(t){return t}function i(){d=!0,o=t[r]._c,e=t[r]._d,u=t[r]._e,o.add("buttonbar"),c=t[r].glbl}var r="mmenu",s="buttonbars";t[r].prototype["_init_"+s]=function(r){d||i();var e=this.vars[s+"_added"];this.vars[s+"_added"]=!0,e||(this.opts[s]=n(this.opts[s]),this.conf[s]=a(this.conf[s])),this.opts[s],this.conf[s],this.__refactorClass(t("div",r),this.conf.classNames[s].buttonbar,"buttonbar"),t("div."+o.buttonbar,r).each(function(){var n=t(this),a=n.children().not("input"),i=n.children().filter("input");n.addClass(o.buttonbar+"-"+a.length),i.each(function(){var n=t(this),i=a.filter('label[for="'+n.attr("id")+'"]');i.length&&n.insertBefore(i)})})},t[r].addons.push(s),t[r].defaults[s]={},t[r].configuration.classNames[s]={buttonbar:"Buttonbar"};var o,e,u,c,d=!1}(jQuery);
/*	
 * jQuery mmenu counters addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
!function(t){function e(e){return"boolean"==typeof e&&(e={add:e,update:e}),"object"!=typeof e&&(e={}),e=t.extend(!0,{},t[o].defaults[s],e)}function n(t){return t}function a(){i=!0,d=t[o]._c,r=t[o]._d,u=t[o]._e,d.add("counter search noresultsmsg"),r.add("updatecounter"),c=t[o].glbl}var o="mmenu",s="counters";t[o].prototype["_init_"+s]=function(o){i||a();var u=this.vars[s+"_added"];this.vars[s+"_added"]=!0,u||(this.opts[s]=e(this.opts[s]),this.conf[s]=n(this.conf[s]));var c=this,h=this.opts[s];this.conf[s],this.__refactorClass(t("em",o),this.conf.classNames[s].counter,"counter"),h.add&&o.each(function(){var e=t(this).data(r.parent);e&&(e.find("> em."+d.counter).length||e.prepend(t('<em class="'+d.counter+'" />')))}),h.update&&o.each(function(){var e=t(this),n=e.data(r.parent);if(n){var a=n.find("> em."+d.counter);a.length&&(e.is("."+d.list)||(e=e.find("> ."+d.list)),e.length&&!e.data(r.updatecounter)&&(e.data(r.updatecounter,!0),c._update(function(){var t=e.children().not("."+d.label).not("."+d.subtitle).not("."+d.hidden).not("."+d.search).not("."+d.noresultsmsg);a.html(t.length)})))}})},t[o].addons.push(s),t[o].defaults[s]={add:!1,update:!1},t[o].configuration.classNames[s]={counter:"Counter"};var d,r,u,c,i=!1}(jQuery);
/*	
 * jQuery mmenu dragOpen addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
!function(e){function t(e,t,n){return t>e&&(e=t),e>n&&(e=n),e}function n(t){return"boolean"==typeof t&&(t={open:t}),"object"!=typeof t&&(t={}),t=e.extend(!0,{},e[s].defaults[i],t)}function o(e){return e}function a(){c=!0,r=e[s]._c,p=e[s]._d,f=e[s]._e,r.add("dragging"),d=e[s].glbl}var s="mmenu",i="dragOpen";e[s].prototype["_init_"+i]=function(){if("function"==typeof Hammer&&this.opts.offCanvas&&!this.vars[i+"_added"]){this.vars[i+"_added"]=!0,c||a(),this.opts[i]=n(this.opts[i]),this.conf[i]=o(this.conf[i]);var p=this,h=this.opts[i],m=this.conf[i];if(h.open){if(Hammer.VERSION<2)return e[s].deprecated("Older version of the Hammer library","version 2 or newer"),!1;var u,g,l,v,_={},w=0,b=!1,y=!1,$=0,x=0;switch(this.opts.offCanvas.position){case"left":case"right":_.events="panleft panright",_.typeLower="x",_.typeUpper="X",y="width";break;case"top":case"bottom":_.events="panup pandown",_.typeLower="y",_.typeUpper="Y",y="height"}switch(this.opts.offCanvas.position){case"left":case"top":_.negative=!1;break;case"right":case"bottom":_.negative=!0}switch(this.opts.offCanvas.position){case"left":_.open_dir="right",_.close_dir="left";break;case"right":_.open_dir="left",_.close_dir="right";break;case"top":_.open_dir="down",_.close_dir="up";break;case"bottom":_.open_dir="up",_.close_dir="down"}var C=this.__valueOrFn(h.pageNode,this.$menu,d.$page);"string"==typeof C&&(C=e(C));var k=d.$page;switch(this.opts.offCanvas.zposition){case"front":k=this.$menu;break;case"next":k=k.add(this.$menu)}var S=new Hammer(C[0]);S.on("panstart",function(e){switch(v=e.center[_.typeLower],p.opts.offCanvas.position){case"right":case"bottom":v>=d.$wndw[y]()-h.maxStartPos&&(w=1);break;default:v<=h.maxStartPos&&(w=1)}b=_.open_dir}).on(_.events+" panend",function(e){w>0&&e.preventDefault()}).on(_.events,function(e){if(u=e["delta"+_.typeUpper],_.negative&&(u=-u),u!=$&&(b=u>=$?_.open_dir:_.close_dir),$=u,$>h.threshold&&1==w){if(d.$html.hasClass(r.opened))return;w=2,p._openSetup(),p.$menu.trigger(f.opening),d.$html.addClass(r.dragging),x=t(d.$wndw[y]()*m[y].perc,m[y].min,m[y].max)}2==w&&(g=t($,10,x)-("front"==p.opts.offCanvas.zposition?x:0),_.negative&&(g=-g),l="translate"+_.typeUpper+"("+g+"px )",k.css({"-webkit-transform":"-webkit-"+l,transform:l}))}).on("panend",function(){2==w&&(d.$html.removeClass(r.dragging),k.css("transform",""),p[b==_.open_dir?"_openFinish":"close"]()),w=0})}}},e[s].addons.push(i),e[s].defaults[i]={open:!1,maxStartPos:100,threshold:50},e[s].configuration[i]={width:{perc:.8,min:140,max:440},height:{perc:.8,min:140,max:880}};var r,p,f,d,c=!1}(jQuery);
/*	
 * jQuery mmenu fixedElements addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
!function(t){function s(t){return t}function o(t){return t}function n(){c=!0,e=t[i]._c,f=t[i]._d,r=t[i]._e,e.add("fixed-top fixed-bottom"),d=t[i].glbl}var i="mmenu",a="fixedElements";t[i].prototype["_init_"+a]=function(){if(this.opts.offCanvas){c||n();var i=this.vars[a+"_added"];if(this.vars[a+"_added"]=!0,i||(this.opts[a]=s(this.opts[a]),this.conf[a]=o(this.conf[a])),this.opts[a],this.conf[a],this.__refactorClass(t("div, span, a",d.$page),this.conf.classNames[a].fixedTop,"fixed-top"),this.__refactorClass(t("div, span, a",d.$page),this.conf.classNames[a].fixedBottom,"fixed-bottom"),!i){var f,p;this.$menu.on(r.opening,function(){var s=t(window).scrollTop(),o=d.$page.height()-s-d.$wndw.height();f=t("."+e["fixed-top"]),p=t("."+e["fixed-bottom"]),f.css({"-webkit-transform":"translateY( "+s+"px )",transform:"translateY( "+s+"px )"}),p.css({"-webkit-transform":"translateY( -"+o+"px )",transform:"translateY( -"+o+"px )"})}).on(r.closed,function(){f.add(p).css({"-webkit-transform":"none",transform:"none"})})}}},t[i].addons.push(a),t[i].defaults[a]={},t[i].configuration.classNames[a]={fixedTop:"FixedTop",fixedBottom:"FixedBottom"};var e,f,r,d,c=!1}(jQuery);
/*	
 * jQuery mmenu footer addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
!function(t){function o(o){return"boolean"==typeof o&&(o={add:o,update:o}),"object"!=typeof o&&(o={}),o=t.extend(!0,{},t[a].defaults[s],o)}function n(t){return t}function e(){h=!0,i=t[a]._c,d=t[a]._d,r=t[a]._e,i.add("footer hasfooter"),f=t[a].glbl}var a="mmenu",s="footer";t[a].prototype["_init_"+s]=function(a){h||e();var d=this.vars[s+"_added"];this.vars[s+"_added"]=!0,d||(this.opts[s]=o(this.opts[s]),this.conf[s]=n(this.conf[s]));var f=this,u=this.opts[s];if(this.conf[s],!d&&u.add){var c=u.content?u.content:u.title;t('<div class="'+i.footer+'" />').appendTo(this.$menu).append(c)}var p=t("div."+i.footer,this.$menu);p.length&&(this.$menu.addClass(i.hasfooter),u.update&&a.each(function(){var o=t(this),n=t("."+f.conf.classNames[s].panelFooter,o),e=n.html();e||(e=u.title);var a=function(){p[e?"show":"hide"](),p.html(e)};o.on(r.open,a),o.hasClass(i.current)&&a()}),"function"==typeof this._init_buttonbars&&this._init_buttonbars(p))},t[a].addons.push(s),t[a].defaults[s]={add:!1,content:!1,title:"",update:!1},t[a].configuration.classNames[s]={panelFooter:"Footer"};var i,d,r,f,h=!1}(jQuery);
/*	
 * jQuery mmenu header addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
!function(e){function t(t){return"boolean"==typeof t&&(t={add:t,update:t}),"object"!=typeof t&&(t={}),t=e.extend(!0,{},e[s].defaults[r],t)}function a(e){return e}function n(){l=!0,i=e[s]._c,o=e[s]._d,h=e[s]._e,i.add("header hasheader prev next title"),d=e[s].glbl}var s="mmenu",r="header";e[s].prototype["_init_"+r]=function(s){l||n();var o=this.vars[r+"_added"];this.vars[r+"_added"]=!0,o||(this.opts[r]=t(this.opts[r]),this.conf[r]=a(this.conf[r]));var c=this,f=this.opts[r];if(this.conf[r],!o&&f.add){var p=f.content?f.content:'<a class="'+i.prev+'" href="#"></a><span class="'+i.title+'"></span><a class="'+i.next+'" href="#"></a>';e('<div class="'+i.header+'" />').prependTo(this.$menu).append(p)}var u=e("div."+i.header,this.$menu);if(u.length){if(this.$menu.addClass(i.hasheader),f.update){var v=u.find("."+i.title),m=u.find("."+i.prev),_=u.find("."+i.next),g=!1;d.$page&&(g="#"+d.$page.attr("id")),o||m.add(_).off(h.click).on(h.click,function(t){t.preventDefault(),t.stopPropagation();var a=e(this).attr("href");"#"!==a&&(g&&a==g?c.$menu.trigger(h.close):e(a,c.$menu).trigger(h.open))}),s.each(function(){var t=e(this),a=e("."+c.conf.classNames[r].panelHeader,t),n=e("."+c.conf.classNames[r].panelPrev,t),s=e("."+c.conf.classNames[r].panelNext,t),o=a.html(),d=n.attr("href"),l=s.attr("href");o||(o=e("."+i.subclose,t).html()),o||(o=f.title),d||(d=e("."+i.subclose,t).attr("href"));var p=n.html(),u=s.html(),g=function(){v[o?"show":"hide"](),v.html(o),m[d?"attr":"removeAttr"]("href",d),m[d||p?"show":"hide"](),m.html(p),_[l?"attr":"removeAttr"]("href",l),_[l||u?"show":"hide"](),_.html(u)};t.on(h.open,g),t.hasClass(i.current)&&g()})}"function"==typeof this._init_buttonbars&&this._init_buttonbars(u)}},e[s].addons.push(r),e[s].defaults[r]={add:!1,content:!1,title:"Menu",update:!1},e[s].configuration.classNames[r]={panelHeader:"Header",panelNext:"Next",panelPrev:"Prev"};var i,o,h,d,l=!1}(jQuery);
/*	
 * jQuery mmenu labels addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
!function(l){function a(a){return"boolean"==typeof a&&(a={collapse:a}),"object"!=typeof a&&(a={}),a=l.extend(!0,{},l[o].defaults[t],a)}function e(l){return l}function s(){i=!0,n=l[o]._c,d=l[o]._d,c=l[o]._e,n.add("collapsed"),d.add("updatelabel"),p=l[o].glbl}var o="mmenu",t="labels";l[o].prototype["_init_"+t]=function(o){i||s();var p=this.vars[t+"_added"];this.vars[t+"_added"]=!0,p||(this.opts[t]=a(this.opts[t]),this.conf[t]=e(this.conf[t]));var u=this.opts[t];this.conf[t],u.collapse&&(this.__refactorClass(l("li",this.$menu),this.conf.classNames[t].collapsed,"collapsed"),l("."+n.label,o).each(function(){var a=l(this),e=a.nextUntil("."+n.label,"all"==u.collapse?null:"."+n.collapsed);"all"==u.collapse&&(a.addClass(n.opened),e.removeClass(n.collapsed)),e.length&&(a.data(d.updatelabel)||(a.data(d.updatelabel,!0),a.wrapInner("<span />"),a.prepend('<a href="#" class="'+n.subopen+" "+n.fullsubopen+'" />')),a.find("a."+n.subopen).off(c.click).on(c.click,function(l){l.preventDefault(),a.toggleClass(n.opened),e[a.hasClass(n.opened)?"removeClass":"addClass"](n.collapsed)}))}))},l[o].addons.push(t),l[o].defaults[t]={collapse:!1},l[o].configuration.classNames[t]={collapsed:"Collapsed"};var n,d,c,p,i=!1}(jQuery);
/*	
 * jQuery mmenu searchfield addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
!function(e){function s(e){switch(e){case 9:case 16:case 17:case 18:case 37:case 38:case 39:case 40:return!0}return!1}function n(s){return"boolean"==typeof s&&(s={add:s,search:s}),"object"!=typeof s&&(s={}),s=e.extend(!0,{},e[r].defaults[o],s),"boolean"!=typeof s.showLinksOnly&&(s.showLinksOnly="menu"==s.addTo),s}function t(e){return e}function a(){c=!0,i=e[r]._c,l=e[r]._d,d=e[r]._e,i.add("search hassearch noresultsmsg noresults nosubresults"),d.add("search reset change"),h=e[r].glbl}var r="mmenu",o="searchfield";e[r].prototype["_init_"+o]=function(r){c||a();var h=this.vars[o+"_added"];this.vars[o+"_added"]=!0,h||(this.opts[o]=n(this.opts[o]),this.conf[o]=t(this.conf[o]));var u=this,f=this.opts[o];if(this.conf[o],f.add){switch(f.addTo){case"menu":var p=this.$menu;break;case"panels":var p=r;break;default:var p=e(f.addTo,this.$menu).filter("."+i.panel)}p.length&&p.each(function(){var s=e(this),n=s.is("."+i.list)?"li":"div";if(!s.children(n+"."+i.search).length){if(s.is("."+i.menu))var t=u.$menu,a="prependTo";else var t=s.children().first(),a=t.is("."+i.subtitle)?"insertAfter":"insertBefore";e("<"+n+' class="'+i.search+'" />').append('<input placeholder="'+f.placeholder+'" type="text" autocomplete="off" />')[a](t)}f.noResults&&(s.is("."+i.menu)&&(s=s.children("."+i.panel).first()),n=s.is("."+i.list)?"li":"div",s.children(n+"."+i.noresultsmsg).length||e("<"+n+' class="'+i.noresultsmsg+'" />').html(f.noResults).appendTo(s))})}if(this.$menu.children("div."+i.search).length&&this.$menu.addClass(i.hassearch),f.search){var v=e("."+i.search,this.$menu);v.length&&v.each(function(){var n=e(this);if("menu"==f.addTo)var t=e("."+i.panel,u.$menu),a=u.$menu;else var t=n.closest("."+i.panel),a=t;var r=n.children("input"),o=u.__findAddBack(t,"."+i.list).children("li"),h=o.filter("."+i.label),c=o.not("."+i.subtitle).not("."+i.label).not("."+i.search).not("."+i.noresultsmsg),p="> a";f.showLinksOnly||(p+=", > span"),r.off(d.keyup+" "+d.change).on(d.keyup,function(e){s(e.keyCode)||n.trigger(d.search)}).on(d.change,function(){n.trigger(d.search)}),n.off(d.reset+" "+d.search).on(d.reset+" "+d.search,function(e){e.stopPropagation()}).on(d.reset,function(){n.trigger(d.search,[""])}).on(d.search,function(s,n){"string"==typeof n?r.val(n):n=r.val(),n=n.toLowerCase(),t.scrollTop(0),c.add(h).addClass(i.hidden),c.each(function(){var s=e(this);e(p,s).text().toLowerCase().indexOf(n)>-1&&s.add(s.prevAll("."+i.label).first()).removeClass(i.hidden)}),e(t.get().reverse()).each(function(s){var n=e(this),t=n.data(l.parent);if(t){var a=n.add(n.find("> ."+i.list)).find("> li").not("."+i.subtitle).not("."+i.search).not("."+i.noresultsmsg).not("."+i.label).not("."+i.hidden);a.length?t.removeClass(i.hidden).removeClass(i.nosubresults).prevAll("."+i.label).first().removeClass(i.hidden):"menu"==f.addTo&&(n.hasClass(i.opened)&&setTimeout(function(){t.trigger(d.open)},1.5*(s+1)*u.conf.openingInterval),t.addClass(i.nosubresults))}}),a[c.not("."+i.hidden).length?"removeClass":"addClass"](i.noresults),u._update()})})}},e[r].addons.push(o),e[r].defaults[o]={add:!1,addTo:"menu",search:!1,placeholder:"Search",noResults:"No results found."};var i,l,d,h,c=!1}(jQuery);
/*	
 * jQuery mmenu toggles addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
!function(t){function s(t){return t}function e(t){return t}function a(){r=!0,n=t[c]._c,o=t[c]._d,l=t[c]._e,n.add("toggle check"),h=t[c].glbl}var c="mmenu",i="toggles";t[c].prototype["_init_"+i]=function(c){r||a();var o=this.vars[i+"_added"];this.vars[i+"_added"]=!0,o||(this.opts[i]=s(this.opts[i]),this.conf[i]=e(this.conf[i]));var l=this;this.opts[i],this.conf[i],this.__refactorClass(t("input",c),this.conf.classNames[i].toggle,"toggle"),this.__refactorClass(t("input",c),this.conf.classNames[i].check,"check"),t("input."+n.toggle,c).add("input."+n.check,c).each(function(){var s=t(this),e=s.closest("li"),a=s.hasClass(n.toggle)?"toggle":"check",c=s.attr("id")||l.__getUniqueId();e.children('label[for="'+c+'"]').length||(s.attr("id",c),e.prepend(s),t('<label for="'+c+'" class="'+n[a]+'"></label>').insertBefore(e.children("a, span").last()))})},t[c].addons.push(i),t[c].defaults[i]={},t[c].configuration.classNames[i]={toggle:"Toggle",check:"Check"};var n,o,l,h,r=!1}(jQuery);
/*********************************************************************
*  #### Twitter Post Fetcher v17.0.2 ####
*  Coded by Jason Mayes 2015. A present to all the developers out there.
*  www.jasonmayes.com
*  Please keep this disclaimer with my code if you use it. Thanks. :-)
*  Got feedback or questions, ask here:
*  http://www.jasonmayes.com/projects/twitterApi/
*  Github: https://github.com/jasonmayes/Twitter-Post-Fetcher
*  Updates will be posted to this site.
*********************************************************************/
(function(root,factory){if(typeof define==='function'&&define.amd){define([],factory);}else if(typeof exports==='object'){module.exports=factory();}else{factory();}}(this,function(){var domNode='';var maxTweets=20;var parseLinks=true;var queue=[];var inProgress=false;var printTime=true;var printUser=true;var formatterFunction=null;var supportsClassName=true;var showRts=true;var customCallbackFunction=null;var showInteractionLinks=true;var showImages=false;var useEmoji=false;var targetBlank=true;var lang='en';var permalinks=true;var dataOnly=false;var script=null;var scriptAdded=false;function handleTweets(tweets){if(customCallbackFunction===null){var x=tweets.length;var n=0;var element=document.getElementById(domNode);var html='';while(n<x){html+=tweets[n];n++;}
html+='';element.innerHTML=html;}else{customCallbackFunction(tweets);}}
function strip(data){return data.replace(/<b[^>]*>(.*?)<\/b>/gi,function(a,s){return s;}).replace(/class="(?!(tco-hidden|tco-display|tco-ellipsis))+.*?"|data-query-source=".*?"|dir=".*?"|rel=".*?"/gi,'');}
function targetLinksToNewWindow(el){var links=el.getElementsByTagName('a');for(var i=links.length-1;i>=0;i--){links[i].setAttribute('target','_blank');}}
function getElementsByClassName(node,classname){var a=[];var regex=new RegExp('(^| )'+classname+'( |$)');var elems=node.getElementsByTagName('*');for(var i=0,j=elems.length;i<j;i++){if(regex.test(elems[i].className)){a.push(elems[i]);}}
return a;}
function extractImageUrl(image_data){if(image_data!==undefined&&image_data.innerHTML.indexOf('data-srcset')>=0){var data_src=image_data.innerHTML.match(/data-srcset="([A-z0-9%_\.-]+)/i)[0];return decodeURIComponent(data_src).split('"')[1];}}
var twitterFetcher={fetch:function(config){if(config.maxTweets===undefined){config.maxTweets=20;}
if(config.enableLinks===undefined){config.enableLinks=true;}
if(config.showUser===undefined){config.showUser=true;}
if(config.showTime===undefined){config.showTime=true;}
if(config.dateFunction===undefined){config.dateFunction='default';}
if(config.showRetweet===undefined){config.showRetweet=true;}
if(config.customCallback===undefined){config.customCallback=null;}
if(config.showInteraction===undefined){config.showInteraction=true;}
if(config.showImages===undefined){config.showImages=false;}
if(config.useEmoji===undefined){config.useEmoji=false;}
if(config.linksInNewWindow===undefined){config.linksInNewWindow=true;}
if(config.showPermalinks===undefined){config.showPermalinks=true;}
if(config.dataOnly===undefined){config.dataOnly=false;}
if(inProgress){queue.push(config);}else{inProgress=true;domNode=config.domId;maxTweets=config.maxTweets;parseLinks=config.enableLinks;printUser=config.showUser;printTime=config.showTime;showRts=config.showRetweet;formatterFunction=config.dateFunction;customCallbackFunction=config.customCallback;showInteractionLinks=config.showInteraction;showImages=config.showImages;useEmoji=config.useEmoji;targetBlank=config.linksInNewWindow;permalinks=config.showPermalinks;dataOnly=config.dataOnly;var head=document.getElementsByTagName('head')[0];if(script!==null){head.removeChild(script);}
script=document.createElement('script');script.type='text/javascript';if(config.list!==undefined){script.src='https://syndication.twitter.com/timeline/list?'+'callback=__twttrf.callback&dnt=false&list_slug='+
config.list.listSlug+'&screen_name='+config.list.screenName+'&suppress_response_codes=true&lang='+(config.lang||lang)+'&rnd='+Math.random();}else if(config.profile!==undefined){script.src='https://syndication.twitter.com/timeline/profile?'+'callback=__twttrf.callback&dnt=false'+'&screen_name='+config.profile.screenName+'&suppress_response_codes=true&lang='+(config.lang||lang)+'&rnd='+Math.random();}else if(config.likes!==undefined){script.src='https://syndication.twitter.com/timeline/likes?'+'callback=__twttrf.callback&dnt=false'+'&screen_name='+config.likes.screenName+'&suppress_response_codes=true&lang='+(config.lang||lang)+'&rnd='+Math.random();}else{script.src='https://cdn.syndication.twimg.com/widgets/timelines/'+
config.id+'?&lang='+(config.lang||lang)+'&callback=__twttrf.callback&'+'suppress_response_codes=true&rnd='+Math.random();}
head.appendChild(script);}},callback:function(data){if(data===undefined||data.body===undefined){inProgress=false;if(queue.length>0){twitterFetcher.fetch(queue[0]);queue.splice(0,1);}
return;}
if(!useEmoji){data.body=data.body.replace(/(<img[^c]*class="Emoji[^>]*>)|(<img[^c]*class="u-block[^>]*>)/g,'');}
if(!showImages){data.body=data.body.replace(/(<img[^c]*class="NaturalImage-image[^>]*>|(<img[^c]*class="CroppedImage-image[^>]*>))/g,'');}
if(!printUser){data.body=data.body.replace(/(<img[^c]*class="Avatar"[^>]*>)/g,'');}
var div=document.createElement('div');div.innerHTML=data.body;if(typeof(div.getElementsByClassName)==='undefined'){supportsClassName=false;}
function swapDataSrc(element){var avatarImg=element.getElementsByTagName('img')[0];avatarImg.src=avatarImg.getAttribute('data-src-2x');return element;}
var tweets=[];var authors=[];var times=[];var images=[];var rts=[];var tids=[];var permalinksURL=[];var x=0;if(supportsClassName){var tmp=div.getElementsByClassName('timeline-Tweet');while(x<tmp.length){if(tmp[x].getElementsByClassName('timeline-Tweet-retweetCredit').length>0){rts.push(true);}else{rts.push(false);}
if(!rts[x]||rts[x]&&showRts){tweets.push(tmp[x].getElementsByClassName('timeline-Tweet-text')[0]);tids.push(tmp[x].getAttribute('data-tweet-id'));if(printUser){authors.push(swapDataSrc(tmp[x].getElementsByClassName('timeline-Tweet-author')[0]));}
times.push(tmp[x].getElementsByClassName('dt-updated')[0]);permalinksURL.push(tmp[x].getElementsByClassName('timeline-Tweet-timestamp')[0]);if(tmp[x].getElementsByClassName('timeline-Tweet-media')[0]!==undefined){images.push(tmp[x].getElementsByClassName('timeline-Tweet-media')[0]);}else{images.push(undefined);}}
x++;}}else{var tmp=getElementsByClassName(div,'timeline-Tweet');while(x<tmp.length){if(getElementsByClassName(tmp[x],'timeline-Tweet-retweetCredit').length>0){rts.push(true);}else{rts.push(false);}
if(!rts[x]||rts[x]&&showRts){tweets.push(getElementsByClassName(tmp[x],'timeline-Tweet-text')[0]);tids.push(tmp[x].getAttribute('data-tweet-id'));if(printUser){authors.push(swapDataSrc(getElementsByClassName(tmp[x],'timeline-Tweet-author')[0]));}
times.push(getElementsByClassName(tmp[x],'dt-updated')[0]);permalinksURL.push(getElementsByClassName(tmp[x],'timeline-Tweet-timestamp')[0]);if(getElementsByClassName(tmp[x],'timeline-Tweet-media')[0]!==undefined){images.push(getElementsByClassName(tmp[x],'timeline-Tweet-media')[0]);}else{images.push(undefined);}}
x++;}}
if(tweets.length>maxTweets){tweets.splice(maxTweets,(tweets.length-maxTweets));authors.splice(maxTweets,(authors.length-maxTweets));times.splice(maxTweets,(times.length-maxTweets));rts.splice(maxTweets,(rts.length-maxTweets));images.splice(maxTweets,(images.length-maxTweets));permalinksURL.splice(maxTweets,(permalinksURL.length-maxTweets));}
var arrayTweets=[];var x=tweets.length;var n=0;if(dataOnly){while(n<x){arrayTweets.push({tweet:tweets[n].innerHTML,author:authors[n]?authors[n].innerHTML:'Unknown Author',author_data:{profile_url:authors[n]?authors[n].querySelector('[data-scribe="element:user_link"]').href:null,profile_image:authors[n]?authors[n].querySelector('[data-scribe="element:avatar"]').getAttribute('data-src-1x'):null,profile_image_2x:authors[n]?authors[n].querySelector('[data-scribe="element:avatar"]').getAttribute('data-src-2x'):null,screen_name:authors[n]?authors[n].querySelector('[data-scribe="element:screen_name"]').title:null,name:authors[n]?authors[n].querySelector('[data-scribe="element:name"]').title:null},time:times[n].textContent,timestamp:times[n].getAttribute('datetime').replace('+0000','Z').replace(/([\+\-])(\d\d)(\d\d)/,'$1$2:$3'),image:extractImageUrl(images[n]),rt:rts[n],tid:tids[n],permalinkURL:(permalinksURL[n]===undefined)?'':permalinksURL[n].href});n++;}}else{while(n<x){if(typeof(formatterFunction)!=='string'){var datetimeText=times[n].getAttribute('datetime');var newDate=new Date(times[n].getAttribute('datetime').replace(/-/g,'/').replace('T',' ').split('+')[0]);var dateString=formatterFunction(newDate,datetimeText);times[n].setAttribute('aria-label',dateString);if(tweets[n].textContent){if(supportsClassName){times[n].textContent=dateString;}else{var h=document.createElement('p');var t=document.createTextNode(dateString);h.appendChild(t);h.setAttribute('aria-label',dateString);times[n]=h;}}else{times[n].textContent=dateString;}}
var op='';if(parseLinks){if(targetBlank){targetLinksToNewWindow(tweets[n]);if(printUser){targetLinksToNewWindow(authors[n]);}}
if(printUser){op+='<div class="user">'+strip(authors[n].innerHTML)+'</div>';}
op+='<p class="tweet">'+strip(tweets[n].innerHTML)+'</p>';if(printTime){if(permalinks){op+='<p class="timePosted"><a href="'+permalinksURL[n]+'">'+times[n].getAttribute('aria-label')+'</a></p>';}else{op+='<p class="timePosted">'+
times[n].getAttribute('aria-label')+'</p>';}}}else{if(tweets[n].textContent){if(printUser){op+='<p class="user">'+authors[n].textContent+'</p>';}
op+='<p class="tweet">'+tweets[n].textContent+'</p>';if(printTime){op+='<p class="timePosted">'+times[n].textContent+'</p>';}}else{if(printUser){op+='<p class="user">'+authors[n].textContent+'</p>';}
op+='<p class="tweet">'+tweets[n].textContent+'</p>';if(printTime){op+='<p class="timePosted">'+times[n].textContent+'</p>';}}}
if(showInteractionLinks){op+='<p class="interact"><a href="https://twitter.com/intent/'+'tweet?in_reply_to='+tids[n]+'" class="twitter_reply_icon"'+
(targetBlank?' target="_blank">':'>')+'Reply</a><a href="https://twitter.com/intent/retweet?'+'tweet_id='+tids[n]+'" class="twitter_retweet_icon"'+
(targetBlank?' target="_blank">':'>')+'Retweet</a>'+'<a href="https://twitter.com/intent/favorite?tweet_id='+
tids[n]+'" class="twitter_fav_icon"'+
(targetBlank?' target="_blank">':'>')+'Favorite</a></p>';}
if(showImages&&images[n]!==undefined&&extractImageUrl(images[n])!==undefined){op+='<div class="media">'+'<img src="'+extractImageUrl(images[n])+'" alt="Image from tweet" />'+'</div>';}
if(showImages){arrayTweets.push(op);}else if(!showImages&&tweets[n].textContent.length){arrayTweets.push(op);}
n++;}}
handleTweets(arrayTweets);inProgress=false;if(queue.length>0){twitterFetcher.fetch(queue[0]);queue.splice(0,1);}}};window.__twttrf=twitterFetcher;window.twitterFetcher=twitterFetcher;return twitterFetcher;}));

/**
 * ### HOW TO CREATE A VALID ID TO USE: ###
 * Go to www.twitter.com and sign in as normal, go to your settings page.
 * Go to "Widgets" on the left hand side.
 * Create a new widget for what you need eg "user time line" or "search" etc.
 * Feel free to check "exclude replies" if you don't want replies in results.
 * Now go back to settings page, and then go back to widgets page and
 * you should see the widget you just created. Click edit.
 * Look at the URL in your web browser, you will see a long number like this:
 * 345735908357048478
 * Use this as your ID below instead!
 */

/**
 * How to use TwitterFetcher's fetch function:
 * 
 * @function fetch(object) Fetches the Twitter content according to
 *     the parameters specified in object.
 * 
 * @param object {Object} An object containing case sensitive key-value pairs
 *     of properties below.
 * 
 * You may specify at minimum the following two required properties:
 * 
 * @param object.id {string} The ID of the Twitter widget you wish
 *     to grab data from (see above for how to generate this number).
 * @param object.domId {string} The ID of the DOM element you want
 *     to write results to.
 *
 * You may also specify one or more of the following optional properties
 *     if you desire:
 *
 * @param object.maxTweets [int] The maximum number of tweets you want
 *     to return. Must be a number between 1 and 20. Default value is 20.
 * @param object.enableLinks [boolean] Set false if you don't want
 *     urls and hashtags to be hyperlinked.
 * @param object.showUser [boolean] Set false if you don't want user
 *     photo / name for tweet to show.
 * @param object.showTime [boolean] Set false if you don't want time of tweet
 *     to show.
 * @param object.dateFunction [function] A function you can specify
 *     to format date/time of tweet however you like. This function takes
 *     a JavaScript date as a parameter and returns a String representation
 *     of that date.
 * @param object.showRetweet [boolean] Set false if you don't want retweets
 *     to show.
 * @param object.customCallback [function] A function you can specify
 *     to call when data are ready. It also passes data to this function
 *     to manipulate them yourself before outputting. If you specify
 *     this parameter you must output data yourself!
 * @param object.showInteraction [boolean] Set false if you don't want links
 *     for reply, retweet and favourite to show.
 * @param object.showImages [boolean] Set true if you want images from tweet
 *     to show.
 * @param object.lang [string] The abbreviation of the language you want to use
 *     for Twitter phrases like "posted on" or "time ago". Default value
 *     is "en" (English).
 */

// ##### Simple example 1 #####
// A simple example to get my latest tweet and write to a HTML element with
// id "example1". Also automatically hyperlinks URLS and user mentions and
// hashtags.
var configProfile = {
  "profile": {"screenName": 'mijo'},
  "domId": 'tweet',
  "maxTweets": 1,
  "enableLinks": true, 
  "showUser": false,
  "showTime": false,
  "showImages": false,
  "lang": 'es',
  "showInteraction": false,
  "showRetweet": true
};
twitterFetcher.fetch(configProfile);
/*

simple last.fm jQuery plugin
shows recently played tracks

Author: Ringo Rohe
       - with much help from Douglas Neiner

Custom tweaks by: Luis Carlos Pando (@mijo)


-- lastplayed --

Options:

apikey:         (string) Last.fm API key - get it from here: http://www.lastfm.com/api/account
username:       (string) username
limit:          (int) Number of tracks to load - optional, default is 20
cover:          (bool) show covers - optional, default is true
datetime:       (bool) show date and time - optional, default is true
refresh:        (int) number of seconds to check for new tracks - optional, default is 0 (no refresh)
grow:           (bool) if true new tracks extend the box, if false older tracks will be removed - optional, default is false
shownowplaying: (bool) shows currently playing tracks - optional, default is true


Usage:

$(document).ready(function() {
	$('#lastBox').lastplayed({
		apikey:     'b25b9595...',
		username:   'Username',
		limit:      5,
		cover:      true,
		datetime:   true,
		refresh:    30,
		grow:       true
	});
});



-- nowplaying --

Options

apikey:         (string) Last.fm API key - get it from here: http://www.lastfm.com/api/account
username:       (string) username
refresh:        (int) number of seconds to check for new tracks - optional, default is 0 (no refresh)
icon:			(string) url of a Icon showed beside the text - optional, default is false
hide:			(bool) hides the element when nothing is playing - optional, default is false
notplayingtext:	(string) text that is shown when nothing is played - optional, default is 'nothing playing'

Usage:

$('#nowPlayingBox').nowplaying({
	apikey:			'b25b9595...',
	username:		'Username',
	refresh:		30,
	icon:			'http://cdn.last.fm/flatness/global/icon_eq.gif',
	hide:			false,
	notplayingtext:	'some text'
});




############## BUGS ####################
- tell me if you find some



*/

(function ($) {

	/* ######################### Recent Tracks Class definition ################################# */

	var recentTracksClass = function (elem, options) {

		var $myDiv	 = elem,
			lasttime = 0,
			refresh	 = parseInt(options['refresh'], 10),
			$list,
			timer,
			lastCurrentPlaying = false;

		if (refresh > 0) {
			timer = window.setInterval(function(){
				doLastPlayedStuff();
			}, refresh * 1000);
		}

		doLastPlayedStuff();

		function doLastPlayedStuff() {

			// remove error div if exists
			$myDiv.children('.error').remove();

			//create URL
			var url = 'https://ws.audioscrobbler.com/2.0/?callback=?',
				params = {
					method:  "user.getrecenttracks",
					format:  "json",
					limit:   options.limit,
					user:    options.username,
					api_key: options.apikey
				};

			//sending request
			$.getJSON(url, params, function(data) {

				var foundCurrentPlayingTrack = false;

				//check for errors
				if (!data || !data.recenttracks) {
					return error('Username "' + options.username + '" does not exist!');
				} else if (!data.recenttracks.track) {
					return error('"' + options.username + '" has no tracks to show!');
				}

				//create ul if not exists
				$list = $myDiv.children('ul');
				if (!$list.length) {
					$list = $("<ul>").appendTo( $myDiv.html('') );
				}

				//walk through each Track - reversed to fill up list from latest to newest
				$(data.recenttracks.track.reverse()).each(function(i, track) {
					var tracktime, tracknowplaying, ts, listitem, dateCont;

					//getting timestamp from latestentry
					if(track.date && track.date.uts > lasttime) {
						tracktime = parseInt(track.date.uts, 10);
					}

					//check if entry is currently playing
					if( track['@attr'] && track['@attr'].nowplaying == 'true' ) {
						foundCurrentPlayingTrack = true;
						if( lastCurrentPlaying.name != track.name ) {
							lastCurrentPlaying = track;
							tracknowplaying = true;
							//remove old nowplaying entry
							$list.children('li.nowplaying').remove();
						}
					}

					if(tracktime > lasttime || (tracknowplaying && options.shownowplaying)) {

						// ------------ create list item -----------
						listitem = $( "<li>", {
							// add nowplaying class
							class: tracknowplaying ? "nowplaying" : "notplaying"
						});

						// ----------------- IMAGE -----------------
						if (options.cover) {
							if (track.image[2]['#text']) {
								var $cover = $("<img>", {
									alt: track.artist['#text'],
									src: track.image[2]['#text'],
									width: parseInt(options.coversize, 10)
								}).appendTo(listitem);

								if (options.coverlinks) {
									var coverpath = [
										track.artist['#text'], '/',
										track.album['#text']
									].join('').replace(/[\s]/gi, '+');

									$cover.wrap($("<a>", {
										href: lastfmLinkPrefix + coverpath,
										target: options.linktarget
									}));
								}
							}
						}

						// ---------------- DATE -------------------
						if (options.datetime) {

							if (tracknowplaying) {
								dateCont = 'now';
							} else {
								ts = new Date(tracktime * 1000);
								dateCont = makeTwo(ts.getDate()) + '.' + makeTwo(ts.getMonth() + 1) + ' - ' + makeTwo(ts.getHours()) + ':' + makeTwo(ts.getMinutes());
							}

							$("<div>", {
								className: "date",
								html: dateCont
							}).appendTo(listitem);
						}

						if (tracknowplaying) {
							// ----------- THIS MOMENT -----------------
							$("<div>", {
								class: 'this-moment',
								html: '<h4 class="latest-post text-center zero-margin"><i class="fas fa-headphones"></i> En este momento estoy escuchando:</h4>'
							}).appendTo(listitem);
							

							// ----------------- TRACK -----------------
							$("<div>", {
								class: 'track',
								html: track.name
							}).appendTo(listitem);


							// ---------------- BY -----------------
							$("<div>", {
								class: 'by',
								html: '<span> por </span>'
							}).appendTo(listitem);


							// ---------------- ARTIST -----------------
							$("<div>", {
								class: 'artist',
								html: track.artist['#text']
							}).appendTo(listitem);


							// ---------------- FROM -----------------
							$("<div>", {
								class: 'from',
								html: '<span> del álbum </span>'
							}).appendTo(listitem);


							// ---------------- ALBUM ------------------
							$("<div>", {
								class: 'album',
								html: track.album['#text']
							}).appendTo(listitem);
						}

						//add listitem to list
						$list.prepend(listitem);

						if(!tracknowplaying) {
							lasttime = tracktime;
						}
					}

				});

				if( !foundCurrentPlayingTrack ) {
					lastCurrentPlaying = false;
					//remove old nowplaying entry
					$list.children('li.nowplaying').remove();
				}

				//throw old entries away
				if (options.grow === false) {
					while($list.children().length > options.limit) {
						$list.children('li').last().remove();
					}
				}

			});

		}

		function makeTwo(i) {
			return i < 10 ? '0' + i : i;
		}

		function error( message ) {
			 $("<p>", {
					className: "error",
					html: message
				}).appendTo($myDiv);
				window.clearInterval(timer);
		}

	};

	/* ######################## Recent Tracks Class ends here ################################# */





	/* ######################### Now Playing Class definition ################################# */

	var nowPlayingClass = function (elem, options) {

		var $myDiv	 = elem,
			refresh	 = parseInt(options['refresh'], 10),
			timer,
			lastCurrentPlaying = false;

		if (refresh > 0) {
			timer = window.setInterval(function(){
				nowPlayingInterval();
			}, refresh * 1000);
		}

		nowPlayingInterval();

		function nowPlayingInterval() {

			// remove error div if exists
			$myDiv.children('.error').remove();

			//create URL
			var url = 'https://ws.audioscrobbler.com/2.0/?callback=?',
				params = {
					method:  "user.getrecenttracks",
					format:  "json",
					limit:   1,
					user:    options.username,
					api_key: options.apikey
				};

			//sending request
			$.getJSON(url, params, function(data) {

				//check for errors
				if (!data || !data.recenttracks) {
					return error('Username "' + options.username + '" does not exist!');
				} else if (!data.recenttracks.track) {
					return error('"' + options.username + '" has no tracks to show!');
				}

				var track = data.recenttracks.track[0];

				if( track && track['@attr'] && track['@attr'].nowplaying == 'true' ) {
					var html = '';

					if (options.icon) {
						html = html + '<img src="' + options.icon + '" class="icon" alt="now playing icon" />';
					}

					html = html + '<span class="track">' + track.artist['#text'] + '</span>';
					html = html + ' - ';
					html = html + '<span class="track">' + track.name + '</span>';
					if(track.album['#text']) {
						html = html + ' (';
						html = html + '<span class="track">' + track.album['#text'] + '</span>';
						html = html + ')';
					}

					$myDiv.show();
					update(html);
				} else {
					if(options.hide) {
						$myDiv.hide();
					} else {
						update(options.notplayingtext)
					}
				}

			});

		}

		function error( message ) {
			 $("<p>", {
					className: "error",
					html: message
				}).appendTo($myDiv);
				window.clearInterval(timer);
		}

		function update( html ) {
			$myDiv.html( html );
		}

	};

	/* ######################## Now Playing Class ends here ################################# */








	/* ##################################### Recent Tracks Function ########################### */

	$.fn.lastplayed = function (options) {
		var opts = $.extend({}, $.fn.lastplayed.defaults, options);

		if (typeof(options.username) === "undefined") {
			return this;
		}

		if (typeof(options.apikey) === "undefined") {
			return this;
		}

		return this.each(function(){
			recentTracksClass($(this), opts);
		});

	};

	$.fn.lastplayed.defaults = {
		limit:			1,
		refresh:		0,
		cover:			false,
		datetime:		false,
		grow:			false,
		shownowplaying:	true
	};



	/* ################################# Now Playing Function ################################ */

	$.fn.nowplaying = function (options) {
		var opts = $.extend({}, $.fn.nowplaying.defaults, options);

		if (typeof(options.username) === "undefined") {
			return this;
		}

		if (typeof(options.apikey) === "undefined") {
			return this;
		}

		return this.each(function(){
			nowPlayingClass($(this), opts);
		});

	};

	$.fn.nowplaying.defaults = {
		refresh:		0,
		icon:			false,
		hide:			false,
		notplayingtext: 'nothing playing'
	};

}(jQuery));

(function(d){var e=function(a,b,c,f){this.target=a;this.url=b;this.html=[];this.effectQueue=[];this.options=d.extend({ssl:!1,host:"www.feedrapp.info",limit:null,key:null,layoutTemplate:"<ul>{entries}</ul>",entryTemplate:'<li><a href="{url}">[{author}@{date}] {title}</a><br/>{shortBodyPlain}</li>',tokens:{},outputMode:"json",dateFormat:"dddd MMM Do",dateLocale:"en",effect:"show",offsetStart:!1,offsetEnd:!1,error:function(){console.log("jQuery RSS: url doesn't link to RSS-Feed")},onData:function(){},
success:function(){}},c||{});this.callback=f||this.options.success};e.htmlTags="doctype,html,head,title,base,link,meta,style,script,noscript,body,article,nav,aside,section,header,footer,h1-h6,hgroup,address,p,hr,pre,blockquote,ol,ul,li,dl,dt,dd,figure,figcaption,div,table,caption,thead,tbody,tfoot,tr,th,td,col,colgroup,form,fieldset,legend,label,input,button,select,datalist,optgroup,option,textarea,keygen,output,progress,meter,details,summary,command,menu,del,ins,img,iframe,embed,object,param,video,audio,source,canvas,track,map,area,a,em,strong,i,b,u,s,small,abbr,q,cite,dfn,sub,sup,time,code,kbd,samp,var,mark,bdi,bdo,ruby,rt,rp,span,br,wbr".split(",");
e.prototype.load=function(a){var b="http"+(this.options.ssl?"s":"")+"://"+this.options.host+"?callback=?&q="+encodeURIComponent(this.url);this.options.offsetStart&&this.options.offsetEnd&&(this.options.limit=this.options.offsetEnd);null!==this.options.limit&&(b+="&num="+this.options.limit);null!==this.options.key&&(b+="&key="+this.options.key);d.getJSON(b,a)};e.prototype.render=function(){var a=this;this.load(function(b){try{a.feed=b.responseData.feed,a.entries=b.responseData.feed.entries}catch(c){return a.entries=
[],a.feed=null,a.options.error.call(a)}b=a.generateHTMLForEntries();a.target.append(b.layout);if(0!==b.entries.length){d.isFunction(a.options.onData)&&a.options.onData.call(a);var f=d(b.layout).is("entries")?b.layout:d("entries",b.layout);a.appendEntriesAndApplyEffects(f,b.entries)}0<a.effectQueue.length?a.executeEffectQueue(a.callback):d.isFunction(a.callback)&&a.callback.call(a)})};e.prototype.appendEntriesAndApplyEffects=function(a,b){var c=this;d.each(b,function(b,e){var d=c.wrapContent(e);"show"===
c.options.effect?a.before(d):(d.css({display:"none"}),a.before(d),c.applyEffect(d,c.options.effect))});a.remove()};e.prototype.generateHTMLForEntries=function(){var a=this,b={entries:[],layout:null};d(this.entries).each(function(){var c=a.options.offsetStart,f=a.options.offsetEnd;c&&f?index>=c&&index<=f&&a.isRelevant(this,b.entries)&&(c=a.evaluateStringForEntry(a.options.entryTemplate,this),b.entries.push(c)):a.isRelevant(this,b.entries)&&(c=a.evaluateStringForEntry(a.options.entryTemplate,this),
b.entries.push(c))});b.layout=this.options.entryTemplate?this.wrapContent(this.options.layoutTemplate.replace("{entries}","<entries></entries>")):this.wrapContent("<div><entries></entries></div>");return b};e.prototype.wrapContent=function(a){return 0!==d.trim(a).indexOf("<")?d("<div>"+a+"</div>"):d(a)};e.prototype.applyEffect=function(a,b,c){switch(b){case "slide":a.slideDown("slow",c);break;case "slideFast":a.slideDown(c);break;case "slideSynced":this.effectQueue.push({element:a,effect:"slide"});
break;case "slideFastSynced":this.effectQueue.push({element:a,effect:"slideFast"})}};e.prototype.executeEffectQueue=function(a){var b=this;this.effectQueue.reverse();var c=function(){var f=b.effectQueue.pop();f?b.applyEffect(f.element,f.effect,c):a&&a()};c()};e.prototype.evaluateStringForEntry=function(a,b){var c=a,f=this;d(a.match(/(\{.*?\})/g)).each(function(){var a=this.toString();c=c.replace(a,f.getValueForToken(a,b))});return c};e.prototype.isRelevant=function(a,b){var c=this.getTokenMap(a);
return this.options.filter?this.options.filterLimit&&this.options.filterLimit===b.length?!1:this.options.filter(a,c):!0};e.prototype.getFormattedDate=function(a){if(this.options.dateFormatFunction)return this.options.dateFormatFunction(a);return"undefined"!==typeof moment?(a=moment(new Date(a)),a=a.locale?a.locale(this.options.dateLocale):a.lang(this.options.dateLocale),a.format(this.options.dateFormat)):a};e.prototype.getTokenMap=function(a){if(!this.feedTokens){var b=JSON.parse(JSON.stringify(this.feed));
delete b.entries;this.feedTokens=b}return d.extend({feed:this.feedTokens,url:a.link,author:a.author,date:this.getFormattedDate(a.publishedDate),title:a.title,body:a.content,shortBody:a.contentSnippet,bodyPlain:function(a){for(var a=a.content.replace(/<script[\\r\\\s\S]*<\/script>/mgi,"").replace(/<\/?[^>]+>/gi,""),b=0;b<e.htmlTags.length;b++)a=a.replace(RegExp("<"+e.htmlTags[b],"gi"),"");return a}(a),shortBodyPlain:a.contentSnippet.replace(/<\/?[^>]+>/gi,""),index:d.inArray(a,this.entries),totalEntries:this.entries.length,
teaserImage:function(a){try{return a.content.match(/(<img.*?>)/gi)[0]}catch(b){return""}}(a),teaserImageUrl:function(a){try{return a.content.match(/(<img.*?>)/gi)[0].match(/src="(.*?)"/)[1]}catch(b){return""}}(a)},this.options.tokens)};e.prototype.getValueForToken=function(a,b){var c=this.getTokenMap(b),d=a.replace(/[\{\}]/g,""),d=c[d];if("undefined"!==typeof d)return"function"===typeof d?d(b,c):d;throw Error("Unknown token: "+a+", url:"+this.url);};d.fn.rss=function(a,b,c){(new e(this,a,b,c)).render();
return this}})(jQuery);

// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.

(function() {
    /*!
    * LuisCarlosPando.net
    * Copyright © 2014-2018 Luis Carlos Pando.
    * Made with love in Chihuahua, Mexico.
    */

    $(document).ready(function () {
        // Enable nav menu
        $("#menu").mmenu({
            classes: "mm-slide",
            "slidingSubmenus": true,
            "header": {
                "title": "Menú",
                "add": true,
                "update": true
            },
            "footer": {
                "add": true,
                "title": "Hi, how are you? 🖖"
            },
            "searchfield": {
                "placeholder": "Buscar",
                "noResults": "No se encontraron resultados.",
                "add": true,
                "search": false
            },
            dragOpen: {
                open: false
            }
        });

        $("#menu .mm-search input").keyup(function (e) {
            if (e.keyCode == 13) {
                window.location.href = 'https://blog.luiscarlospando.net/?s=' + $(this).val();
            }
        });

        // Enable Last.fm last played song
        $('#lastfm').lastplayed({
            apikey: '0665c6724df040e8c33e44b1eb1ba888',
            username: 'hmstarlight',
            refresh: 30
        });

        $(window).scroll(function () {
            var scroll = $(window).scrollTop();
            if (scroll >= 1) {
                $(".nav-container").addClass("scrolled-position");
            } else if (scroll <= 0) {
                $(".nav-container").removeClass("scrolled-position");
            }
        });

        // Browser window scroll (in pixels) after which the "back to top" link is shown
        var offset = 300,
            // Browser window scroll (in pixels) after which the "back to top" link opacity is reduced
            offset_opacity = 1200,
            // Duration of the top scrolling animation (in ms)
            scroll_top_duration = 700,
            // Grab the "back to top" link
            $back_to_top = $('.cd-top');

        // Hide or show the "back to top" link
        $(window).scroll(function () {
            ($(this).scrollTop() > offset) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
            if ($(this).scrollTop() > offset_opacity) {
                $back_to_top.addClass('cd-fade-out');
            }
        });

        // Smooth scroll to top
        $back_to_top.on('click', function (event) {
            event.preventDefault();
            $('body,html').animate({
                scrollTop: 0,
            }, scroll_top_duration
            );
        });

        // Tooltips
        $('[data-toggle="tooltip"]').tooltip();

        // Progress bar
        var winHeight = $(window).height(),
            docHeight = $(document).height(),
            progressBar = $('progress'),
            max, value;

        // Set the max scrollable area
        max = docHeight - winHeight;
        progressBar.attr('max', max);

        $(document).on('scroll', function () {
            value = $(window).scrollTop();
            progressBar.attr('value', value);
        });

        // RSS Feed
        jQuery(function ($) {
            $("#blog").rss("https://blog.luiscarlospando.net/feed", {
                limit: 1,
                ssl: true,
                layoutTemplate: "<div style='display: inline;'>{entries}</div>",
                entryTemplate: '<a href="{url}">{title}</a>'
            });
        });
    });

    // Enabling Font Awesome Pseudo Elements
    window.FontAwesomeConfig = {
        searchPseudoElements: true
    }
    
})();
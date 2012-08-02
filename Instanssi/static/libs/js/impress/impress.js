(function(B,C){'use strict';var D=(function(){var c=B.createElement('dummy').style,prefixes='Webkit Moz O ms Khtml'.split(' '),memory={};return function(a){if(typeof memory[a]==="undefined"){var b=a.charAt(0).toUpperCase()+a.substr(1),props=(a+' '+prefixes.join(b+' ')+b).split(' ');memory[a]=null;for(var i in props){if(c[props[i]]!==undefined){memory[a]=props[i];break}}}return memory[a]}})();var E=function(a){return[].slice.call(a)};var F=function(a,b){var c,pkey;for(c in b){if(b.hasOwnProperty(c)){pkey=D(c);if(pkey!==null){a.style[pkey]=b[c]}}}return a};var G=function(a,b){return isNaN(a)?(b||0):Number(a)};var H=function(a){return B.getElementById(a)};var $=function(a,b){b=b||B;return b.querySelector(a)};var I=function(a,b){b=b||B;return E(b.querySelectorAll(a))};var J=function(a,b,c){var d=B.createEvent("CustomEvent");d.initCustomEvent(b,true,true,c);a.dispatchEvent(d)};var K=function(t){return" translate3d("+t.x+"px,"+t.y+"px,"+t.z+"px) "};var L=function(r,a){var b=" rotateX("+r.x+"deg) ",rY=" rotateY("+r.y+"deg) ",rZ=" rotateZ("+r.z+"deg) ";return a?rZ+rY+b:b+rY+rZ};var M=function(s){return" scale("+s+") "};var N=function(p){return" perspective("+p+"px) "};var O=function(){return H(C.location.hash.replace(/^#\/?/,""))};var P=function(a){var b=C.innerHeight/a.height,wScale=C.innerWidth/a.width,M=b>wScale?wScale:b;if(a.maxScale&&M>a.maxScale){M=a.maxScale}if(a.minScale&&M<a.minScale){M=a.minScale}return M};var Q=B.body;var R=navigator.userAgent.toLowerCase();var S=(D("perspective")!==null)&&(Q.classList)&&(Q.dataset)&&(R.search(/(iphone)|(ipod)|(android)/)===-1);if(!S){Q.className+=" impress-not-supported "}else{Q.classList.remove("impress-not-supported");Q.classList.add("impress-supported")}var T={};var U={width:1024,height:768,maxScale:1,minScale:0,perspective:1000,transitionDuration:1000};var V=function(){return false};var W=C.impress=function(h){if(!S){return{init:V,goto:V,prev:V,next:V}}h=h||"impress";if(T["impress-root-"+h]){return T["impress-root-"+h]}var i={};var j=null;var k=null;var l=null;var m=null;var n=null;var o=H(h);var p=B.createElement("div");var q=false;var r=null;var s=function(a){if(r!==a){J(a,"impress:stepenter");r=a}};var t=function(a){if(r===a){J(a,"impress:stepleave");r=null}};var u=function(a,b){var c=a.dataset,step={translate:{x:G(c.x),y:G(c.y),z:G(c.z)},rotate:{x:G(c.rotateX),y:G(c.rotateY),z:G(c.rotateZ||c.rotate)},scale:G(c.scale,1),el:a};if(!a.id){a.id="step-"+(b+1)}i["impress-"+a.id]=step;F(a,{position:"absolute",transform:"translate(-50%,-50%)"+K(step.translate)+L(step.rotate)+M(step.scale),transformStyle:"preserve-3d"})};var v=function(){if(q){return}var b=$("meta[name='viewport']")||B.createElement("meta");b.content="width=device-width, minimum-scale=1, maximum-scale=1, user-scalable=no";if(b.parentNode!==B.head){b.name='viewport';B.head.appendChild(b)}var c=o.dataset;m={width:G(c.width,U.width),height:G(c.height,U.height),maxScale:G(c.maxScale,U.maxScale),minScale:G(c.minScale,U.minScale),perspective:G(c.perspective,U.perspective),transitionDuration:G(c.transitionDuration,U.transitionDuration)};n=P(m);E(o.childNodes).forEach(function(a){p.appendChild(a)});o.appendChild(p);B.documentElement.style.height="100%";F(Q,{height:"100%",overflow:"hidden"});var d={position:"absolute",transformOrigin:"top left",transition:"all 0s ease-in-out",transformStyle:"preserve-3d"};F(o,d);F(o,{top:"50%",left:"50%",transform:N(m.perspective/n)+M(n)});F(p,d);Q.classList.remove("impress-disabled");Q.classList.add("impress-enabled");l=I(".step",o);l.forEach(u);k={translate:{x:0,y:0,z:0},rotate:{x:0,y:0,z:0},scale:1};q=true;J(o,"impress:init",{api:T["impress-root-"+h]})};var w=function(a){if(typeof a==="number"){a=a<0?l[l.length+a]:l[a]}else if(typeof a==="string"){a=H(a)}return(a&&a.id&&i["impress-"+a.id])?a:null};var x=null;var y=function(a,b){if(!q||!(a=w(a))){return false}C.scrollTo(0,0);var c=i["impress-"+a.id];if(j){j.classList.remove("active");Q.classList.remove("impress-on-"+j.id)}a.classList.add("active");Q.classList.add("impress-on-"+a.id);var d={rotate:{x:-c.rotate.x,y:-c.rotate.y,z:-c.rotate.z},translate:{x:-c.translate.x,y:-c.translate.y,z:-c.translate.z},scale:1/c.scale};var e=d.scale>=k.scale;b=G(b,m.transitionDuration);var f=(b/2);if(a===j){n=P(m)}var g=d.scale*n;if(j&&j!==a){t(j)}F(o,{transform:N(m.perspective/g)+M(g),transitionDuration:b+"ms",transitionDelay:(e?f:0)+"ms"});F(p,{transform:L(d.rotate,true)+K(d.translate),transitionDuration:b+"ms",transitionDelay:(e?0:f)+"ms"});if(k.scale===d.scale||(k.rotate.x===d.rotate.x&&k.rotate.y===d.rotate.y&&k.rotate.z===d.rotate.z&&k.translate.x===d.translate.x&&k.translate.y===d.translate.y&&k.translate.z===d.translate.z)){f=0}k=d;j=a;C.clearTimeout(x);x=C.setTimeout(function(){s(j)},b+f);return a};var z=function(){var a=l.indexOf(j)-1;a=a>=0?l[a]:l[l.length-1];return y(a)};var A=function(){var a=l.indexOf(j)+1;a=a<l.length?l[a]:l[0];return y(a)};o.addEventListener("impress:init",function(){l.forEach(function(a){a.classList.add("future")});o.addEventListener("impress:stepenter",function(a){a.target.classList.remove("past");a.target.classList.remove("future");a.target.classList.add("present")},false);o.addEventListener("impress:stepleave",function(a){a.target.classList.remove("present");a.target.classList.add("past")},false)},false);o.addEventListener("impress:init",function(){var b="";o.addEventListener("impress:stepenter",function(a){C.location.hash=b="#/"+a.target.id},false);C.addEventListener("hashchange",function(){if(C.location.hash!==b){y(O())}},false);y(O()||l[0],0)},false);Q.classList.add("impress-disabled");return(T["impress-root-"+h]={init:v,goto:y,next:A,prev:z})};W.supported=S})(document,window);(function(f,g){'use strict';var h=function(b,c){var d=null;return function(){var a=this,args=arguments;clearTimeout(d);d=setTimeout(function(){b.apply(a,args)},c)}};f.addEventListener("impress:init",function(d){var e=d.detail.api;f.addEventListener("keydown",function(a){if(a.keyCode===9||(a.keyCode>=32&&a.keyCode<=34)||(a.keyCode>=37&&a.keyCode<=40)){a.preventDefault()}},false);f.addEventListener("keyup",function(a){if(a.keyCode===9||(a.keyCode>=32&&a.keyCode<=34)||(a.keyCode>=37&&a.keyCode<=40)){switch(a.keyCode){case 33:case 37:case 38:e.prev();break;case 9:case 32:case 34:case 39:case 40:e.next();break}a.preventDefault()}},false);f.addEventListener("click",function(a){var b=a.target;while((b.tagName!=="A")&&(b!==f.documentElement)){b=b.parentNode}if(b.tagName==="A"){var c=b.getAttribute("href");if(c&&c[0]==='#'){b=f.getElementById(c.slice(1))}}if(e.goto(b)){a.stopImmediatePropagation();a.preventDefault()}},false);f.addEventListener("click",function(a){var b=a.target;while(!(b.classList.contains("step")&&!b.classList.contains("active"))&&(b!==f.documentElement)){b=b.parentNode}if(e.goto(b)){a.preventDefault()}},false);f.addEventListener("touchstart",function(a){if(a.touches.length===1){var x=a.touches[0].clientX,width=g.innerWidth*0.3,result=null;if(x<width){result=e.prev()}else if(x>g.innerWidth-width){result=e.next()}if(result){a.preventDefault()}}},false);g.addEventListener("resize",h(function(){e.goto(f.querySelector(".active"),500)},250),false)},false)})(document,window);
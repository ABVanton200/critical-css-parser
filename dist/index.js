var e=function(e){try{var r={};return Promise.resolve(n.launch()).then(function(n){var o="";return Promise.resolve(n.createIncognitoBrowserContext()).then(function(s){return Promise.resolve(s.newPage()).then(function(s){return Promise.resolve(s.setRequestInterception(!0)).then(function(){return s.on("request",function(e){-1!==e.url().indexOf(".css")&&(r[e.url()]=e),e.continue()}),Promise.resolve(n.createIncognitoBrowserContext()).then(function(u){return Promise.resolve(u.newPage()).then(function(u){return Promise.resolve(Promise.all([new Promise(function(t,n){try{return Promise.resolve(s.setDefaultNavigationTimeout(12e4)).then(function(){return Promise.resolve(s.setViewport({width:1920,height:1200})).then(function(){function n(){t()}var u="HTML"===e.type?Promise.resolve(s.setContent(e.html,{waitUntil:"networkidle2"})).then(function(){return Promise.resolve(s.addStyleTag({content:e.css})).then(function(){})}):Promise.resolve(s.goto(e.url,{waitUntil:"networkidle2"})).then(function(){return Promise.resolve(s.$$eval(":not(noscript) > link[rel=stylesheet]",function(e){return Array.from(e).map(function(e){return e.href})})).then(function(t){return e.enableGoogleFonts||(t=t.filter(function(e){return-1===e.indexOf("fonts.googleapis.com")})),Promise.resolve(Promise.all(t.map(function(e){try{var t=r[e]?Promise.resolve(r[e].response().text()).then(function(e){o+=e}):Promise.resolve(i(e)).then(function(e){o+=e.data});return Promise.resolve(t&&t.then?t.then(function(){}):void 0)}catch(e){return Promise.reject(e)}}))).then(function(){})})});return u&&u.then?u.then(n):n()})})}catch(e){return Promise.reject(e)}}),new Promise(function(t,r){try{return Promise.resolve(u.setDefaultNavigationTimeout(6e4)).then(function(){return Promise.resolve(u.setViewport({width:480,height:650,isMobile:!0,hasTouch:!0})).then(function(){function r(){t()}var n="HTML"===e.type?Promise.resolve(u.setContent(e.html,{waitUntil:"networkidle2"})).then(function(){return Promise.resolve(u.addStyleTag({content:e.css})).then(function(){})}):Promise.resolve(u.goto(e.url,{waitUntil:"networkidle2"})).then(function(){});return n&&n.then?n.then(r):r()})})}catch(e){return Promise.reject(e)}})])).then(function(){return Promise.resolve(t(s,1200)).then(function(e){return Promise.resolve(t(u,650)).then(function(t){return Promise.resolve(n.close()).then(function(){return{aboveTheFold:e,aboveTheFoldMob:t,css:o}})})})})})})})})})})}catch(e){return Promise.reject(e)}},t=function(e,t){try{return Promise.resolve(e.$$eval("body *:not(script):not(style)",function(e,t){Array.from(e).forEach(function(e){try{var r,n=window.getComputedStyle(e),o=0,i=n.top;if(-1!==i.indexOf("px")?o=Math.abs(Number.parseInt(i,10)):-1!==i.indexOf("%")&&(o=e.parentElement.offsetHeight*Math.abs(Number.parseInt(i,10))/100),r=Math.abs(Number.parseInt(n.marginTop,10)),e.getBoundingClientRect().top-r-o+pageYOffset>t)e.remove();else{var s=window.getComputedStyle(e.parentElement);"none"!==s.display&&("hidden"!==s.overflow||"0px"!==s.height&&"0px"!==s.width)||e.remove()}}catch(e){console.error(e)}})},t)).then(function(){return Promise.resolve(e.content())})}catch(e){return Promise.reject(e)}},r=require("http-server"),n=require("puppeteer"),o=require("dropcss"),i=require("axios").get;function s(e,t,r,n,i){var s=o({css:r,html:e,shouldDrop:function(e){return!n.test(e)}}),u=o({css:r,html:t,shouldDrop:function(e){return!n.test(e)}}),c=new Set;s.sels.forEach(function(e){return c.add(e)}),u.sels.forEach(function(e){return c.add(e)});var l=o({css:r,html:"",shouldDrop:function(e){return!c.has(e)}}),a=o({css:r,html:"",shouldDrop:function(e){return c.has(e)}});if(i){var h=require("csso");l.css=h.minify(l.css).css,a.css=h.minify(a.css).css}return{critical:l.css,rest:a.css}}module.exports=function(t){try{return Promise.resolve(function(){if("HTML"===t.type){var n=t.html,o=t.css,i=void 0===o?"":o,u=t.whitelist,c=void 0===u?/#fooBazBarAboveTheFold8917/:u,l=t.minify,a=void 0!==l&&l;return Promise.resolve(e({html:void 0===n?"":n,css:i,type:t.type})).then(function(e){return s(e.aboveTheFold,e.aboveTheFoldMob,i,c,a)})}return function(){if("URL"===t.type){var n=t.URL,o=t.enableGoogleFonts,i=t.whitelist,u=void 0===i?/#fooBazBarAboveTheFold8917/:i,c=t.minify,l=void 0!==c&&c;return Promise.resolve(e({enableGoogleFonts:void 0===o?0:o,url:void 0===n?"":n,type:t.type})).then(function(e){return s(e.aboveTheFold,e.aboveTheFoldMob,e.css,u,l)})}return function(){if("localServer"===t.type){var n=t.entrypoint,o=t.filename,i=void 0===o?"index.html":o,u=t.enableGoogleFonts,c=void 0===u?0:u,l=t.whitelist,a=void 0===l?/#fooBazBarAboveTheFold8917/:l,h=t.minify,f=void 0!==h&&h,v=r.createServer({root:void 0===n?"":n});return v.listen(6543),Promise.resolve(e({enableGoogleFonts:c,url:"http://127.0.0.1:6543/"+i,type:t.type})).then(function(e){var t=e.aboveTheFold,r=e.aboveTheFoldMob,n=e.css;return v.close(),s(t,r,n,a,f)})}}()}()}())}catch(e){return Promise.reject(e)}};
//# sourceMappingURL=index.js.map

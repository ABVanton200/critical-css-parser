var e=function(e,t){try{return Promise.resolve(e.$$eval("body *:not(script):not(style)",function(e,t){Array.from(e).forEach(function(e){if(e.getBoundingClientRect().top+pageYOffset>t)try{e.remove()}catch(e){console.log(e)}})},t)).then(function(){return Promise.resolve(e.content())})}catch(e){return Promise.reject(e)}},t=require("http-server"),r=require("puppeteer"),n=require("dropcss"),o=require("axios").get;function i(e,t,r,o,i){var s=n({html:e,css:r,shouldDrop:function(e){return!o.test(e)}}),u=n({html:t,css:r,shouldDrop:function(e){return!o.test(e)}}),l=new Set;s.sels.forEach(function(e){return l.add(e)}),u.sels.forEach(function(e){return l.add(e)});var c=n({html:"",css:r,shouldDrop:function(e){return!l.has(e)}}),h=n({html:"",css:r,shouldDrop:function(e){return l.has(e)}});if(i){var a=require("csso");c.css=a.minify(c.css).css,h.css=a.minify(h.css).css}return{critical:c.css,rest:h.css}}module.exports=function(n){try{return Promise.resolve(function(){if("HTML"===n.type){var s=n.html;void 0===s&&(s="");var u=n.css;void 0===u&&(u="");var l=n.whitelist;void 0===l&&(l=/#fooBazBarAboveTheFold8917/);var c=n.minify;return void 0===c&&(c=!1),Promise.resolve(r.launch()).then(function(t){return Promise.resolve(t.newPage()).then(function(r){return Promise.resolve(r.setDefaultNavigationTimeout(6e4)).then(function(){return Promise.resolve(r.setContent(s,{waitUntil:"networkidle2"})).then(function(){return Promise.resolve(r.addStyleTag({content:u})).then(function(){return Promise.resolve(r.setViewport({width:1920,height:1200})).then(function(){return Promise.resolve(t.newPage()).then(function(n){return Promise.resolve(n.setDefaultNavigationTimeout(6e4)).then(function(){return Promise.resolve(n.setContent(s,{waitUntil:"networkidle2"})).then(function(){return Promise.resolve(n.addStyleTag({content:u})).then(function(){return Promise.resolve(n.setViewport({width:480,height:650,isMobile:!0,hasTouch:!0})).then(function(){return Promise.resolve(e(r,1200)).then(function(r){return Promise.resolve(e(n,650)).then(function(e){return Promise.resolve(t.close()).then(function(){return i(r,e,u,l,c)})})})})})})})})})})})})})})}return function(){if("URL"===n.type){var s=n.URL;void 0===s&&(s="");var u=n.enableGoogleFonts;void 0===u&&(u=0);var l=n.whitelist;void 0===l&&(l=/#fooBazBarAboveTheFold8917/);var c=n.minify;return void 0===c&&(c=!1),Promise.resolve(r.launch()).then(function(t){return Promise.resolve(t.newPage()).then(function(r){return Promise.resolve(r.setDefaultNavigationTimeout(6e4)).then(function(){return Promise.resolve(r.goto(s,{waitUntil:"networkidle2"})).then(function(){return Promise.resolve(r.setViewport({width:1920,height:1200})).then(function(){return Promise.resolve(r.$$eval("link[rel=stylesheet]",function(e){return Array.from(e).map(function(e){return e.href})})).then(function(n){return u||(n=n.filter(function(e){return-1===e.indexOf("fonts.googleapis.com")})),Promise.resolve(t.newPage()).then(function(u){return Promise.resolve(u.setDefaultNavigationTimeout(6e4)).then(function(){return Promise.resolve(u.goto(s,{waitUntil:"networkidle2"})).then(function(){return Promise.resolve(u.setViewport({width:480,height:650,isMobile:!0,hasTouch:!0})).then(function(){return Promise.resolve(e(r,1200)).then(function(r){return Promise.resolve(e(u,650)).then(function(e){return Promise.resolve(t.close()).then(function(){var t="";return Promise.resolve(Promise.all(n.map(function(e){try{return Promise.resolve(o(e)).then(function(e){t+=e.data})}catch(e){return Promise.reject(e)}}))).then(function(){return i(r,e,t,l,c)})})})})})})})})})})})})})})}return function(){if("localServer"===n.type){var s=n.entrypoint;void 0===s&&(s="");var u=n.filename;void 0===u&&(u="index.html");var l=n.enableGoogleFonts;void 0===l&&(l=0);var c=n.whitelist;void 0===c&&(c=/#fooBazBarAboveTheFold8917/);var h=n.minify;void 0===h&&(h=!1);var a=t.createServer({root:s});return a.listen(6543),Promise.resolve(r.launch()).then(function(t){return Promise.resolve(t.newPage()).then(function(r){return Promise.resolve(r.setDefaultNavigationTimeout(6e4)).then(function(){return Promise.resolve(r.goto("http://127.0.0.1:6543/"+u,{waitUntil:"networkidle2"})).then(function(){return Promise.resolve(r.setViewport({width:1920,height:1200})).then(function(){return Promise.resolve(r.$$eval("link[rel=stylesheet]",function(e){return Array.from(e).map(function(e){return e.href})})).then(function(n){return l||(n=n.filter(function(e){return-1===e.indexOf("fonts.googleapis.com")})),Promise.resolve(t.newPage()).then(function(s){return Promise.resolve(s.setDefaultNavigationTimeout(6e4)).then(function(){return Promise.resolve(s.goto("http://127.0.0.1:6543/"+u,{waitUntil:"networkidle2"})).then(function(){return Promise.resolve(s.setViewport({width:480,height:650,isMobile:!0,hasTouch:!0})).then(function(){return Promise.resolve(e(r,1200)).then(function(r){return Promise.resolve(e(s,650)).then(function(e){return Promise.resolve(t.close()).then(function(){var t="";return Promise.resolve(Promise.all(n.map(function(e){try{return Promise.resolve(o(e)).then(function(e){t+=e.data})}catch(e){return Promise.reject(e)}}))).then(function(){return a.close(),i(r,e,t,c,h)})})})})})})})})})})})})})})}}()}()}())}catch(e){return Promise.reject(e)}};
//# sourceMappingURL=index.mjs.map

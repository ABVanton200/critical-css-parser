const assert = require('assert').strict;
const criticalCSSParser = require('../dist/index');

let html = `
  <html>
    <head>
      <meta name="viewport" content="width=device-width,minimum-scale=1,maximum-scale=1,initial-scale=1,user-scalable=no">
    </head>
    <body>
      <p>Hello <a href="#">World!</a></p>
      <div class="top-margin"></div>
    </body>
  </html>
`;

let css = `
  .card {
    padding: 8px;
  }

  p:hover a:first-child {
    color: red;
  }

  div.top-margin {
    margin-top: 1300px;
  }
`;

let cssMob = `
  p {
    height: 1500px;
  }

  div.top-margin {
    margin-top: 1300px;
  }

  @media screen and (max-width: 500px) {
    p {
      height: 100px;
    }
  }
`;

let rest = `:not(pre)>code[class*=language-]{background:#272822}:not(pre)>code[class*=language-]{padding:.1em;border-radius:.3em;white-space:normal}.token.cdata,.token.comment,.token.doctype,.token.prolog{color:#708090}.namespace{opacity:.7}.token.constant,.token.deleted,.token.symbol,.token.tag{color:#f92672}.token.boolean,.token.number{color:#ae81ff}.token.attr-name,.token.builtin,.token.char,.token.inserted,.token.string{color:#a6e22e}.language-css .token.string,.style .token.string,.token.entity,.token.operator,.token.url,.token.variable{color:#f8f8f2}.token.atrule,.token.attr-value,.token.class-name,.token.function{color:#e6db74}.token.keyword{color:#66d9ef}.token.important,.token.regex{color:#fd971f}.token.bold,.token.important{font-weight:700}.token.italic{font-style:italic}.token.entity{cursor:help}div.code-toolbar>.toolbar .toolbar-item{display:inline-block}div.code-toolbar>.toolbar a{cursor:pointer}div.code-toolbar>.toolbar button{background:0 0;border:0;color:inherit;font:inherit;line-height:normal;overflow:visible;padding:0;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none}div.code-toolbar>.toolbar a,div.code-toolbar>.toolbar button,div.code-toolbar>.toolbar span{color:#bbb;font-size:.8em;padding:0 .5em;background:#f5f2f0;background:rgba(224,224,224,.2);box-shadow:0 2px 0 0 rgba(0,0,0,.2);border-radius:.5em}div.code-toolbar>.toolbar a:focus,div.code-toolbar>.toolbar a:hover,div.code-toolbar>.toolbar button:focus,div.code-toolbar>.toolbar button:hover,div.code-toolbar>.toolbar span:focus,div.code-toolbar>.toolbar span:hover{color:inherit;text-decoration:none}main{display:block}h1{font-size:2em;margin:.67em 0}hr{box-sizing:content-box;height:0;overflow:visible}abbr[title]{border-bottom:none;text-decoration:underline;-webkit-text-decoration:underline dotted;text-decoration:underline dotted}strong{font-weight:bolder}kbd,samp{font-family:monospace,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,input{overflow:visible}button,select{text-transform:none}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:.35em .75em .625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{vertical-align:baseline}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}details{display:block}summary{display:list-item}[hidden],template{display:none}.footer{height:100%;box-sizing:border-box;padding:30px 0 90px;text-align:center}.footer__img{width:200px}.footer__copyright{margin-top:20px;font-size:16px}.Align-center{text-align:center}.Highlighted{color:#0a0a0a;background-color:rgba(10,10,10,.05);font-style:italic;border-radius:4px}.Dark-mode .Highlighted{color:#fefefe;background-color:hsla(0,0%,99.6%,.05)}@media screen and (max-width:768px){.menu-opened #sidebar{height:100%}.mobile-menu__arrow{display:inline-block;width:40px;height:40px;box-sizing:border-box;padding:5px;margin-right:15px;transition:all .4s ease}.mobile-menu__arrow_active{transform:rotate(180deg)}}@media screen and (max-width:375px){.main-text__image{width:90%}}`;
let rest2 = `:not(pre)>code[class*=language-]{background:#272822;padding:.1em;border-radius:.3em;white-space:normal}.token.cdata,.token.comment,.token.doctype,.token.prolog{color:#708090}.namespace{opacity:.7}.token.constant,.token.deleted,.token.symbol,.token.tag{color:#f92672}.token.boolean,.token.number{color:#ae81ff}.token.attr-name,.token.builtin,.token.char,.token.inserted,.token.string{color:#a6e22e}.language-css .token.string,.style .token.string,.token.entity,.token.operator,.token.url,.token.variable{color:#f8f8f2}.token.atrule,.token.attr-value,.token.class-name,.token.function{color:#e6db74}.token.keyword{color:#66d9ef}.token.important,.token.regex{color:#fd971f}.token.bold,.token.important{font-weight:700}.token.italic{font-style:italic}.token.entity{cursor:help}div.code-toolbar>.toolbar .toolbar-item{display:inline-block}div.code-toolbar>.toolbar a{cursor:pointer}div.code-toolbar>.toolbar button{background:0 0;border:0;font:inherit;line-height:normal;overflow:visible;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none}div.code-toolbar>.toolbar a,div.code-toolbar>.toolbar button,div.code-toolbar>.toolbar span{color:#bbb;font-size:.8em;padding:0 .5em;background:#f5f2f0;background:rgba(224,224,224,.2);box-shadow:0 2px 0 0 rgba(0,0,0,.2);border-radius:.5em}div.code-toolbar>.toolbar a:focus,div.code-toolbar>.toolbar a:hover,div.code-toolbar>.toolbar button:focus,div.code-toolbar>.toolbar button:hover,div.code-toolbar>.toolbar span:focus,div.code-toolbar>.toolbar span:hover{color:inherit;text-decoration:none}details,main{display:block}h1{font-size:2em;margin:.67em 0}hr{box-sizing:content-box;height:0;overflow:visible}abbr[title]{border-bottom:none;-webkit-text-decoration:underline dotted;text-decoration:underline dotted}strong{font-weight:bolder}kbd,samp{font-family:monospace,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,input{overflow:visible}button,select{text-transform:none}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:.35em .75em .625em}legend{color:inherit;display:table;max-width:100%;white-space:normal}progress{vertical-align:baseline}textarea{overflow:auto}[type=checkbox],[type=radio],legend{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}summary{display:list-item}[hidden],template{display:none}.footer{height:100%;box-sizing:border-box;padding:30px 0 90px;text-align:center}.footer__img{width:200px}.footer__copyright{margin-top:20px;font-size:16px}.Align-center{text-align:center}.Highlighted{color:#0a0a0a;background-color:rgba(10,10,10,.05);font-style:italic;border-radius:4px}.Dark-mode .Highlighted{color:#fefefe;background-color:rgba(254,254,254,.05)}@media screen and (max-width:768px){.menu-opened #sidebar{height:100%}.mobile-menu__arrow{display:inline-block;width:40px;height:40px;box-sizing:border-box;padding:5px;margin-right:15px;transition:all .4s ease}.mobile-menu__arrow_active{transform:rotate(180deg)}}@media screen and (max-width:375px){.main-text__image{width:90%}}`;

describe('HTML and CSS', function() {
  it('should get right critical', async function() {        

    const res = await criticalCSSParser({
      html,
      css,
      type: 'HTML',
      enableGoogleFonts: false
    });

    assert.strictEqual(res.critical, 'p:hover a:first-child{color: red;}div.top-margin{margin-top: 1300px;}');
  });

  it('should get right rest', async function() {        

    const res = await criticalCSSParser({
      html,
      css,
      type: 'HTML',
      enableGoogleFonts: false
    });

    assert.strictEqual(res.rest, '.card{padding: 8px;}');
    
  });
});

describe('URL', function() {
  it('should get right critical', async function() {        

    const res = await criticalCSSParser({
      type: 'URL',
      URL: 'https://abvcss.github.io/abvcss-website/',
      enableGoogleFonts: false
    });

    assert.strictEqual(res.critical, '');
  });

  it('should get right rest', async function() {        

    const res = await criticalCSSParser({
      type: 'URL',
      URL: 'https://abvcss.github.io/abvcss-website/',
      enableGoogleFonts: false
    });

    assert.strictEqual(res.rest, rest);
    
  });
});

describe('localServer', function() {
  it('should get right critical', async function() {        

    const res = await criticalCSSParser({
      type: 'localServer',
      entrypoint: './www',
      enableGoogleFonts: false
    });

    assert.strictEqual(res.critical, 'html{font-size: 10pt;}div{color: red;}');
  });

  it('should get right rest', async function() {        

    const res = await criticalCSSParser({
      type: 'localServer',
      entrypoint: './www',
      filename: 'index.html',
      enableGoogleFonts: false
    });

    assert.strictEqual(res.rest, 'p{color: red;}');
    
  });
});

describe('Test minifying', function() {
  it('should get right critical', async function() {        

    const res = await criticalCSSParser({
      html,
      css,
      type: 'HTML',
      enableGoogleFonts: false,
      minify: true
    });

    assert.strictEqual(res.critical, 'p:hover a:first-child{color:red}div.top-margin{margin-top:1300px}');
  });

  it('should get right rest', async function() {        

    const res = await criticalCSSParser({
      type: 'URL',
      URL: 'https://abvcss.github.io/abvcss-website/',
      enableGoogleFonts: false,
      minify: true
    });

    assert.strictEqual(res.rest, rest2);
    
  });
});

describe('Test mobile version', function() {
  it('should get right critical', async function() {        

    const res = await criticalCSSParser({
      html,
      type: 'HTML',
      css: cssMob,
      enableGoogleFonts: false,
      minify: true
    });

    assert.strictEqual(res.critical, 'p{height:1500px}div.top-margin{margin-top:1300px}@media screen and (max-width:500px){p{height:100px}}');
  });

  it('should get right rest', async function() {        

    const res = await criticalCSSParser({
      html,
      type: 'HTML',
      css: cssMob,
      enableGoogleFonts: false,
      minify: true
    });

    assert.strictEqual(res.rest, '');
  });
});

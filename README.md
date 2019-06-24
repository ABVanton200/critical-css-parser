# critical-css-parser

[![install size](https://packagephobia.now.sh/badge?p=critical-css-parser)](https://packagephobia.now.sh/result?p=critical-css-parser)

> **Critical-css-parser** allows you to receive critical (**above-the-fold**) and the rest CSS.
> It might be helpful to speed up initial rendering of a web page. **[More information](https://web.dev/defer-non-critical-css/)**.

There are 3 types of input information: **HTML and CSS**, **URL** and **localServer**.

> **Critical-css-parser** uses [Puppeteer](https://github.com/GoogleChrome/puppeteer) and [DropCSS](https://github.com/leeoniya/dropcss) under the hood, so IT ALSO SUPPORTS ADAPTIVE DESIGN (BOTH DESKTOP AND MOBILE VERSIONS)!
> It also supports minifying (by [CSSO](https://github.com/css/csso)).

---
**This library is part of other projects: [critical-css-inliner](https://github.com/ABVanton200/critical-css-inliner), [webpack-critical-css-inliner](https://github.com/ABVanton200/webpack-critical-css-inliner)**

---

### Installation

```sh
npm install --save-dev critical-css-parser

// or

yarn add --dev critical-css-parser
```
## Examples

### URL

```js
const criticalCSSParser = require('critical-css-parser');

(async () => {

    const result = await criticalCSSParser({
        type: 'URL',
        URL: 'https://enigmatic-dawn-63122.herokuapp.com/', // try to check your site
        enableGoogleFonts: false,
        whitelist: /#foo|\.bar/
    });

    console.log(result.critical); // ''

    console.log(result.rest); // '.Toastify__toast-container{z-index:9999;position:fixed; ...'

})();
```

### localServer

```js
const criticalCSSParser = require('critical-css-parser');

(async () => {

    const result = await criticalCSSParser({
        type: 'localServer',
        entrypoint: './www',
        filename: 'index.html',
        enableGoogleFonts: true
    });

    console.log(result.critical); // 'html{font-size: 10pt;}div{color: red;}'

    console.log(result.rest); // 'p{color: red;}'

})();
```

### HTML and CSS

```js
const criticalCSSParser = require('critical-css-parser');

const html = `
    <html>
        <head></head>
        <body>
            <p>Hello <a href="#">World!</a></p>
        </body>
    </html>
`;

const css = `
    .card {
        padding: 8px;
    }

    p:hover a:first-child {
        color: red;
    }
`;

(async () => {

    const result = await criticalCSSParser({
        type: 'HTML',
        html,
        css,
        minify: true // good way to optimize size
    });

    console.log(result.critical); // 'p:hover a:first-child{color:red}'

    console.log(result.rest); // '.card{padding:8px}'

})();
```

---

## Usage

### criticalCSSParser

Pass options to `criticalCSSParser({ ... })`.

**Parameters**

-   `options`  

**Properties**

-   `type` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** One of: **_HTML_**, **_URL_** or **_localServer_**. **REQUIRED**

-   `html` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Your custom html code _(default: '')_ **REQUIRED FOR type === HTML**
-   `css` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Your custom css code _(default: '')_ **REQUIRED FOR type === HTML**

-   `URL` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** URL of the page you need to optimize _(default: '')_ **REQUIRED FOR type === URL**

-   `entrypoint` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Root of your application _(default: '')_ **REQUIRED FOR type === localServer**
-   `filename` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Your index file _(default: 'index.html')_

-   `enableGoogleFonts` **[Boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Set _true_ to except Google Font styles _(default: `false`)_
-   `whitelist` **[RegExp](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/RegExp)** Whitelist of the critical CSS _(default: `/#fooBazBarAboveTheFold8917/`)_
-   `minify` **[Boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Set _true_ to minify resulting styles _(default: `false`)_

### criticalCSSParser({...}) returns:

```<Promise<{ critical, rest }>>```

**_critical_** - above-the-fold CSS. These styles you can put into your `<style>` tag.

**_rest_** - other CSS. You can lazy-load the rest like [this](https://web.dev/defer-non-critical-css/).

---

## License

MIT license
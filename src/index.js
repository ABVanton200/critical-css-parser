/**
 * Copyright (c) 2021, Anton Babakhin
 * All rights reserved. (MIT Licensed)
 *
 * critical-css-parser
 */

const httpServer = require('http-server');
const puppeteer = require('puppeteer');
const dropcss = require('dropcss');
const { get } = require('axios');

/**
 * Receive critical and other CSS
 * @param  {object} options Options
 * @return {Promise<{ critical: string, rest: string }>} Result object with critical css and rest css
 */
async function criticalCSSParser(options) {
  if (options.type === 'HTML') {
    const {
      html = '',
      css = '',
      whitelist = /#fooBazBarAboveTheFold8917/,
      minify = false
    } = options;

    const { aboveTheFold, aboveTheFoldMob } = await puppeteerResources({
      html,
      css,
      type: options.type
    });

    return extract(aboveTheFold, aboveTheFoldMob, css, whitelist, minify);
  } else if (options.type === 'URL') {
    const {
      URL = '',
      enableGoogleFonts = 0,
      whitelist = /#fooBazBarAboveTheFold8917/,
      minify = false
    } = options;

    const { aboveTheFold, aboveTheFoldMob, css } = await puppeteerResources({
      enableGoogleFonts,
      url: URL,
      type: options.type
    });

    return extract(aboveTheFold, aboveTheFoldMob, css, whitelist, minify);
  } else if (options.type === 'localServer') {
    const {
      entrypoint = '',
      filename = 'index.html',
      enableGoogleFonts = 0,
      whitelist = /#fooBazBarAboveTheFold8917/,
      minify = false
    } = options;

    // Create local server to open the page
    const server = httpServer.createServer({ root: entrypoint });
    server.listen(6543);

    const { aboveTheFold, aboveTheFoldMob, css } = await puppeteerResources({
      enableGoogleFonts,
      url: `http://127.0.0.1:6543/${filename}`,
      type: options.type
    });

    server.close();

    return extract(aboveTheFold, aboveTheFoldMob, css, whitelist, minify);
  }
}

/**
 * Receive above-the-fold HTML
 * @param  {object} page Page from Puppeteer
 * @param  {number} height Height of viewport
 * @return {Promise<string>} Result html
 */
async function getAboveTheFoldHTML(page, height) {
  await page.$$eval('body *:not(script):not(style)', (elems, height) => {
    Array.from(elems).forEach(elem => {
      try {
        const computedStyle = window.getComputedStyle(elem);
        let top = 0;
        let marginTop = 0;

        const computedTop = computedStyle.top;
        if (computedTop.indexOf('px') !== -1) {
          top = Math.abs(Number.parseInt(computedTop, 10));
        } else if (computedTop.indexOf('%') !== -1) {
          const parentHeight = elem.parentElement.offsetHeight;
          const percent = Math.abs(Number.parseInt(computedTop, 10));
          top = (parentHeight * percent) / 100;
        }

        const computedMarginTop = computedStyle.marginTop;
        marginTop = Math.abs(Number.parseInt(computedMarginTop, 10));

        if (elem.getBoundingClientRect().top - marginTop - top + pageYOffset > height) {
          // Remove element below the fold
          elem.remove();
        } else {
          const parentComputedStyle = window.getComputedStyle(elem.parentElement);
          if (
            parentComputedStyle.display === 'none'
            || (
              parentComputedStyle.overflow === 'hidden'
              && (parentComputedStyle.height === '0px' || parentComputedStyle.width === '0px')
            )
          ) {
            // Remove hidden element
            elem.remove();
          }
        }
      } catch (e) {
        console.error(e);
      }
    });
  }, height);

  const html = await page.content();
  return html;
}

/**
 * Receive resources from Puppeteer
 * @param  {object} options Launch options
 * @return {Promise<{ aboveTheFold: string, aboveTheFoldMob: string, css: string }>} Result resources
 */
async function puppeteerResources(options) {
  const cache = { };
  const browser = await puppeteer.launch();
  let cssString = '';
  // Puppeteer page with desktop version
  const context = await browser.createIncognitoBrowserContext();
  const page = await context.newPage();
  await page.setRequestInterception(true);
  page.on('request', interceptedRequest => {
    if (interceptedRequest.url().indexOf('.css') !== -1) {
      cache[interceptedRequest.url()] = interceptedRequest;
    }
    interceptedRequest.continue();
  });
  // Puppeteer page with mobile version
  const context2 = await browser.createIncognitoBrowserContext();
  const page2 = await context2.newPage();

  await Promise.all([new Promise(async (res, rej) => {
    await page.setDefaultNavigationTimeout(120000);
    await page.setViewport({ width: 1920, height: 1200 });
    if (options.type === 'HTML') {
      await page.setContent(options.html, { waitUntil: 'networkidle2'	});
      await page.addStyleTag({ content: options.css });
    } else {
      await page.goto(options.url, { waitUntil: 'networkidle2' });
      let styleHrefs = await page.$$eval(':not(noscript) > link[rel=stylesheet]', elems => Array.from(elems).map(s => s.href));
      if (!options.enableGoogleFonts) {
        styleHrefs = styleHrefs.filter(href => href.indexOf('fonts.googleapis.com') === -1);
      }
      // Concatenate all styles
      await Promise.all(styleHrefs.map(async href => {
        if (cache[href]) {
          let data = await cache[href].response().text();
          cssString += data;
        } else {
          let { data } = await get(href);
          cssString += data;
        }
      }));
    }
    res();
  }), new Promise(async (res, rej) => {
    await page2.setDefaultNavigationTimeout(60000);
    await page2.setViewport({ width: 480, height: 650, isMobile: true, hasTouch: true });
    if (options.type === 'HTML') {
      await page2.setContent(options.html, { waitUntil: 'networkidle2' });
      await page2.addStyleTag({ content: options.css });
    } else {
      await page2.goto(options.url, { waitUntil: 'networkidle2' });
    }
    res();
  })]);

  const aboveTheFold = await getAboveTheFoldHTML(page, 1200);
  const aboveTheFoldMob = await getAboveTheFoldHTML(page2, 650);

  await browser.close();

  return { aboveTheFold, aboveTheFoldMob, css: cssString };
}

/**
 * Extract critical and rest CSS from HTML
 * @param  {string} deskHTML HTML of desktop version
 * @param  {string} mobHTML HTML of mobile version
 * @param  {string} css CSS
 * @param  {RegExp} whitelist Regular Expression of needed tags
 * @return {Promise<{ critical: string, rest: string }>} Result object with critical css and rest css
 */
function extract(deskHTML, mobHTML, css, whitelist, minify) {
  // Receive above-the-fold css-selectors of desktop version
  let resDesk = dropcss({
    css,
    html: deskHTML,
    shouldDrop: sel => !whitelist.test(sel)
  });

  // Receive above-the-fold css-selectors of mobile version
  let resMob = dropcss({
    css,
    html: mobHTML,
    shouldDrop: sel => !whitelist.test(sel)
  });

  let selectors = new Set();
	resDesk.sels.forEach(sel => selectors.add(sel));
	resMob.sels.forEach(sel => selectors.add(sel));

  let above = dropcss({
    css,
    html: '',
    shouldDrop: sel => !selectors.has(sel)
  });

  let rest = dropcss({
    css,
    html: '',
    shouldDrop: sel => selectors.has(sel)
  });

  if (minify) {
    const csso = require('csso');
    above.css = csso.minify(above.css).css;
    rest.css = csso.minify(rest.css).css;
  }

  return { critical: above.css, rest: rest.css };
}

module.exports = criticalCSSParser;

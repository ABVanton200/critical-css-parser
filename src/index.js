/**
 * Copyright (c) 2019, Anton Babakhin
 * All rights reserved. (MIT Licensed)
 * 
 * critical-css-parser
 */

import 'babel-polyfill';

const httpServer = require('http-server');
const puppeteer = require('puppeteer');
const dropcss = require('dropcss');
const { get } = require('axios');

/**
 * Receive critical and other CSS
 * @param  {object} options Options
 * @return {Promise<{ critical: string, rest: string }>} Result object with critical css and rest css
 */
async function criticalCSSParser( options ) {
  	if( options.type === 'HTML' ) {
		const { html = '', css = '', whitelist = /#fooBazBarAboveTheFold8917/ } = options;
		
		const browser = await puppeteer.launch();

		// Puppeteer page with desktop version
    	const page = await browser.newPage();	
		await page.setContent(html, { waitUntil: 'networkidle2'	});
		await page.addStyleTag({ content: css });
		await page.setViewport({ width: 1920, height: 1200 });

		// Puppeteer page with mobile version
		const page2 = await browser.newPage();
		await page2.setContent(html, { waitUntil: 'networkidle2' });
		await page2.addStyleTag({ content: css });
		await page2.setViewport({ width: 480, height: 650, isMobile: true, hasTouch: true }); 
		
		const aboveTheFold = await aboveTheFoldHTML( page, 1200 );
		const aboveTheFoldMob = await aboveTheFoldHTML( page2, 650 );

		await browser.close();

		const result = extract( aboveTheFold, aboveTheFoldMob, css, whitelist );
		return result;

	} else if( options.type === 'URL' ) {
		const { URL = '', enableGoogleFonts = 0, whitelist = /#fooBazBarAboveTheFold8917/ } = options;
		
		const browser = await puppeteer.launch();

		// Puppeteer page with desktop version
		const page = await browser.newPage();	
		await page.goto(URL, { waitUntil: 'networkidle2' });		
		await page.setViewport({ width: 1920, height: 1200 });
		let styleHrefs = await page.$$eval('link[rel=stylesheet]', els => Array.from(els).map(s => s.href));
		if( !enableGoogleFonts ) {
			styleHrefs = styleHrefs.filter( href => href.indexOf('fonts.googleapis.com') === -1 );
		}

		// Puppeteer page with mobile version
		const page2 = await browser.newPage();
		await page2.goto(URL, { waitUntil: 'networkidle2' });		
		await page2.setViewport({ width: 480, height: 650, isMobile: true, hasTouch: true }); 
		
		const aboveTheFold = await aboveTheFoldHTML( page, 1200 );
		const aboveTheFoldMob = await aboveTheFoldHTML( page2, 650 );

		await browser.close();

		// Concatenate all styles 
		let css = '';
		await Promise.all(styleHrefs.map(async href => {
			let { data } = await get(href);
			css += data;
		}));

		const result = extract( aboveTheFold, aboveTheFoldMob, css, whitelist );
		return result;	
		
	} else if( options.type === 'localServer' ) {
		const { entrypoint = '', filename = 'index.html', enableGoogleFonts = 0, whitelist = /#fooBazBarAboveTheFold8917/ } = options;
		
		// Create local server to open the page
		const server = httpServer.createServer({root: entrypoint});
		server.listen(6543);
		
		const browser = await puppeteer.launch();

		// Puppeteer page with desktop version
		const page = await browser.newPage();	
		await page.goto(`http://127.0.0.1:6543/${filename}`, { waitUntil: 'networkidle2' });		
		await page.setViewport({ width: 1920, height: 1200 });
		let styleHrefs = await page.$$eval('link[rel=stylesheet]', els => Array.from(els).map(s => s.href));
		if( !enableGoogleFonts ) {
			styleHrefs = styleHrefs.filter( href => href.indexOf('fonts.googleapis.com') === -1 );
		}

		// Puppeteer page with mobile version
		const page2 = await browser.newPage();
		await page2.goto(`http://127.0.0.1:6543/${filename}`, { waitUntil: 'networkidle2' });		
		await page2.setViewport({ width: 480, height: 650, isMobile: true, hasTouch: true }); 
		
		const aboveTheFold = await aboveTheFoldHTML( page, 1200 );
		const aboveTheFoldMob = await aboveTheFoldHTML( page2, 650 );

		await browser.close();

		// Concatenate all styles 
		let css = '';
		await Promise.all(styleHrefs.map(async href => {
			let { data } = await get(href);
			css += data;
		}));

		server.close();

		const result = extract( aboveTheFold, aboveTheFoldMob, css, whitelist );
		return result;	
	}
}

/**
 * Receive above-the-fold HTML
 * @param  {object} page Page from Puppeteer
 * @param  {number} height Height of viewport 
 * @return {Promise<string>} Result html
 */
async function aboveTheFoldHTML( page, height ) {
	await page.$$eval('body *:not(script):not(style)', ( elems, height ) => {
		Array.from(elems).forEach(elem => {			
			if( elem.getBoundingClientRect()['top'] + pageYOffset > height ) {
				try {
					// Remove element below the fold
					elem.remove();
				} catch( e ) {
					console.log(e);
				}
			}
		});
	}, height);

	const html = await page.content();
	return html;
}

/**
 * Extract critical and rest CSS from HTML
 * @param  {string} deskHTML HTML of desktop version
 * @param  {string} mobHTML HTML of mobile version
 * @param  {string} css CSS 
 * @param  {RegExp} whitelist Regular Expression of needed tags 
 * @return {Promise<{ critical: string, rest: string }>} Result object with critical css and rest css
 */
function extract( deskHTML, mobHTML, css, whitelist ) {
	// Receive above-the-fold css-selectors of desktop version
	let resDesk = dropcss({
		html: deskHTML,
		css,
		shouldDrop: ( sel ) => {
			if ( whitelist.test( sel ) )
					return false;
			else {							
					return true;
			}
		},
	});

	// Receive above-the-fold css-selectors of mobile version
	let resMob = dropcss({
		html: mobHTML,
		css,
		shouldDrop: ( sel ) => {
			if ( whitelist.test( sel ) )
					return false;
			else {							
					return true;
			}
		},
	});

	let selectors = new Set();
	resDesk.sels.forEach( sel => selectors.add( sel ) );
	resMob.sels.forEach( sel => selectors.add( sel ) );

	let above = dropcss({
		html: '',
		css,
		shouldDrop: sel => !selectors.has( sel ),
	});

	let rest = dropcss({
		html: '',
		css,
		shouldDrop: sel => selectors.has( sel ),
	});

	return { critical: above.css, rest: rest.css };
}

module.exports = criticalCSSParser;

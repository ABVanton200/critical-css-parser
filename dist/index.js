"use strict";

require("babel-polyfill");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var httpServer = require('http-server');

var puppeteer = require('puppeteer');

var dropcss = require('dropcss');

var _require = require('axios'),
    get = _require.get;
/**
 * Receive critical and other CSS
 * @param  {object} options Options
 * @return {Promise<{ critical: string, rest: string }>} Result object with critical css and rest css
 */


function criticalCSSParser(_x) {
  return _criticalCSSParser.apply(this, arguments);
}
/**
 * Receive above-the-fold HTML
 * @param  {object} page Page from Puppeteer
 * @param  {number} height Height of viewport 
 * @return {Promise<string>} Result html
 */


function _criticalCSSParser() {
  _criticalCSSParser = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(options) {
    var _options$html, html, _options$css, css, _options$whitelist, whitelist, browser, page, page2, aboveTheFold, aboveTheFoldMob, result, _options$URL, URL, _options$enableGoogle, enableGoogleFonts, _options$whitelist2, _whitelist, _browser, _page, styleHrefs, _page2, _aboveTheFold, _aboveTheFoldMob, _css, _result, _options$entrypoint, entrypoint, _options$filename, filename, _options$enableGoogle2, _enableGoogleFonts, _options$whitelist3, _whitelist2, server, _browser2, _page3, _styleHrefs, _page4, _aboveTheFold2, _aboveTheFoldMob2, _css2, _result2;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!(options.type === 'HTML')) {
              _context3.next = 35;
              break;
            }

            _options$html = options.html, html = _options$html === void 0 ? '' : _options$html, _options$css = options.css, css = _options$css === void 0 ? '' : _options$css, _options$whitelist = options.whitelist, whitelist = _options$whitelist === void 0 ? /#fooBazBarAboveTheFold8917/ : _options$whitelist;
            _context3.next = 4;
            return puppeteer.launch();

          case 4:
            browser = _context3.sent;
            _context3.next = 7;
            return browser.newPage();

          case 7:
            page = _context3.sent;
            _context3.next = 10;
            return page.setContent(html, {
              waitUntil: 'networkidle2'
            });

          case 10:
            _context3.next = 12;
            return page.addStyleTag({
              content: css
            });

          case 12:
            _context3.next = 14;
            return page.setViewport({
              width: 1920,
              height: 1200
            });

          case 14:
            _context3.next = 16;
            return browser.newPage();

          case 16:
            page2 = _context3.sent;
            _context3.next = 19;
            return page2.setContent(html, {
              waitUntil: 'networkidle2'
            });

          case 19:
            _context3.next = 21;
            return page2.addStyleTag({
              content: css
            });

          case 21:
            _context3.next = 23;
            return page2.setViewport({
              width: 480,
              height: 650,
              isMobile: true,
              hasTouch: true
            });

          case 23:
            _context3.next = 25;
            return aboveTheFoldHTML(page, 1200);

          case 25:
            aboveTheFold = _context3.sent;
            _context3.next = 28;
            return aboveTheFoldHTML(page2, 650);

          case 28:
            aboveTheFoldMob = _context3.sent;
            _context3.next = 31;
            return browser.close();

          case 31:
            result = extract(aboveTheFold, aboveTheFoldMob, css, whitelist);
            return _context3.abrupt("return", result);

          case 35:
            if (!(options.type === 'URL')) {
              _context3.next = 73;
              break;
            }

            _options$URL = options.URL, URL = _options$URL === void 0 ? '' : _options$URL, _options$enableGoogle = options.enableGoogleFonts, enableGoogleFonts = _options$enableGoogle === void 0 ? 0 : _options$enableGoogle, _options$whitelist2 = options.whitelist, _whitelist = _options$whitelist2 === void 0 ? /#fooBazBarAboveTheFold8917/ : _options$whitelist2;
            _context3.next = 39;
            return puppeteer.launch();

          case 39:
            _browser = _context3.sent;
            _context3.next = 42;
            return _browser.newPage();

          case 42:
            _page = _context3.sent;
            _context3.next = 45;
            return _page["goto"](URL, {
              waitUntil: 'networkidle2'
            });

          case 45:
            _context3.next = 47;
            return _page.setViewport({
              width: 1920,
              height: 1200
            });

          case 47:
            _context3.next = 49;
            return _page.$$eval('link[rel=stylesheet]', function (els) {
              return Array.from(els).map(function (s) {
                return s.href;
              });
            });

          case 49:
            styleHrefs = _context3.sent;

            if (!enableGoogleFonts) {
              styleHrefs = styleHrefs.filter(function (href) {
                return href.indexOf('fonts.googleapis.com') === -1;
              });
            } // Puppeteer page with mobile version


            _context3.next = 53;
            return _browser.newPage();

          case 53:
            _page2 = _context3.sent;
            _context3.next = 56;
            return _page2["goto"](URL, {
              waitUntil: 'networkidle2'
            });

          case 56:
            _context3.next = 58;
            return _page2.setViewport({
              width: 480,
              height: 650,
              isMobile: true,
              hasTouch: true
            });

          case 58:
            _context3.next = 60;
            return aboveTheFoldHTML(_page, 1200);

          case 60:
            _aboveTheFold = _context3.sent;
            _context3.next = 63;
            return aboveTheFoldHTML(_page2, 650);

          case 63:
            _aboveTheFoldMob = _context3.sent;
            _context3.next = 66;
            return _browser.close();

          case 66:
            // Concatenate all styles 
            _css = '';
            _context3.next = 69;
            return Promise.all(styleHrefs.map(
            /*#__PURE__*/
            function () {
              var _ref = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee(href) {
                var _ref2, data;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return get(href);

                      case 2:
                        _ref2 = _context.sent;
                        data = _ref2.data;
                        _css += data;

                      case 5:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, this);
              }));

              return function (_x4) {
                return _ref.apply(this, arguments);
              };
            }()));

          case 69:
            _result = extract(_aboveTheFold, _aboveTheFoldMob, _css, _whitelist);
            return _context3.abrupt("return", _result);

          case 73:
            if (!(options.type === 'localServer')) {
              _context3.next = 112;
              break;
            }

            _options$entrypoint = options.entrypoint, entrypoint = _options$entrypoint === void 0 ? '' : _options$entrypoint, _options$filename = options.filename, filename = _options$filename === void 0 ? 'index.html' : _options$filename, _options$enableGoogle2 = options.enableGoogleFonts, _enableGoogleFonts = _options$enableGoogle2 === void 0 ? 0 : _options$enableGoogle2, _options$whitelist3 = options.whitelist, _whitelist2 = _options$whitelist3 === void 0 ? /#fooBazBarAboveTheFold8917/ : _options$whitelist3; // Create local server to open the page

            server = httpServer.createServer({
              root: entrypoint
            });
            server.listen(6543);
            _context3.next = 79;
            return puppeteer.launch();

          case 79:
            _browser2 = _context3.sent;
            _context3.next = 82;
            return _browser2.newPage();

          case 82:
            _page3 = _context3.sent;
            _context3.next = 85;
            return _page3["goto"]("http://127.0.0.1:6543/".concat(filename), {
              waitUntil: 'networkidle2'
            });

          case 85:
            _context3.next = 87;
            return _page3.setViewport({
              width: 1920,
              height: 1200
            });

          case 87:
            _context3.next = 89;
            return _page3.$$eval('link[rel=stylesheet]', function (els) {
              return Array.from(els).map(function (s) {
                return s.href;
              });
            });

          case 89:
            _styleHrefs = _context3.sent;

            if (!_enableGoogleFonts) {
              _styleHrefs = _styleHrefs.filter(function (href) {
                return href.indexOf('fonts.googleapis.com') === -1;
              });
            } // Puppeteer page with mobile version


            _context3.next = 93;
            return _browser2.newPage();

          case 93:
            _page4 = _context3.sent;
            _context3.next = 96;
            return _page4["goto"]("http://127.0.0.1:6543/".concat(filename), {
              waitUntil: 'networkidle2'
            });

          case 96:
            _context3.next = 98;
            return _page4.setViewport({
              width: 480,
              height: 650,
              isMobile: true,
              hasTouch: true
            });

          case 98:
            _context3.next = 100;
            return aboveTheFoldHTML(_page3, 1200);

          case 100:
            _aboveTheFold2 = _context3.sent;
            _context3.next = 103;
            return aboveTheFoldHTML(_page4, 650);

          case 103:
            _aboveTheFoldMob2 = _context3.sent;
            _context3.next = 106;
            return _browser2.close();

          case 106:
            // Concatenate all styles 
            _css2 = '';
            _context3.next = 109;
            return Promise.all(_styleHrefs.map(
            /*#__PURE__*/
            function () {
              var _ref3 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee2(href) {
                var _ref4, data;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return get(href);

                      case 2:
                        _ref4 = _context2.sent;
                        data = _ref4.data;
                        _css2 += data;

                      case 5:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2, this);
              }));

              return function (_x5) {
                return _ref3.apply(this, arguments);
              };
            }()));

          case 109:
            server.close();
            _result2 = extract(_aboveTheFold2, _aboveTheFoldMob2, _css2, _whitelist2);
            return _context3.abrupt("return", _result2);

          case 112:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));
  return _criticalCSSParser.apply(this, arguments);
}

function aboveTheFoldHTML(_x2, _x3) {
  return _aboveTheFoldHTML.apply(this, arguments);
}
/**
 * Extract critical and rest CSS from HTML
 * @param  {string} deskHTML HTML of desktop version
 * @param  {string} mobHTML HTML of mobile version
 * @param  {string} css CSS 
 * @param  {RegExp} whitelist Regular Expression of needed tags 
 * @return {Promise<{ critical: string, rest: string }>} Result object with critical css and rest css
 */


function _aboveTheFoldHTML() {
  _aboveTheFoldHTML = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(page, height) {
    var html;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return page.$$eval('body *:not(script):not(style)', function (elems, height) {
              Array.from(elems).forEach(function (elem) {
                if (elem.getBoundingClientRect()['top'] + pageYOffset > height) {
                  try {
                    // Remove element below the fold
                    elem.remove();
                  } catch (e) {
                    console.log(e);
                  }
                }
              });
            }, height);

          case 2:
            _context4.next = 4;
            return page.content();

          case 4:
            html = _context4.sent;
            return _context4.abrupt("return", html);

          case 6:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));
  return _aboveTheFoldHTML.apply(this, arguments);
}

function extract(deskHTML, mobHTML, css, whitelist) {
  // Receive above-the-fold css-selectors of desktop version
  var resDesk = dropcss({
    html: deskHTML,
    css: css,
    shouldDrop: function shouldDrop(sel) {
      if (whitelist.test(sel)) return false;else {
        return true;
      }
    }
  }); // Receive above-the-fold css-selectors of mobile version

  var resMob = dropcss({
    html: mobHTML,
    css: css,
    shouldDrop: function shouldDrop(sel) {
      if (whitelist.test(sel)) return false;else {
        return true;
      }
    }
  });
  var selectors = new Set();
  resDesk.sels.forEach(function (sel) {
    return selectors.add(sel);
  });
  resMob.sels.forEach(function (sel) {
    return selectors.add(sel);
  });
  var above = dropcss({
    html: '',
    css: css,
    shouldDrop: function shouldDrop(sel) {
      return !selectors.has(sel);
    }
  });
  var rest = dropcss({
    html: '',
    css: css,
    shouldDrop: function shouldDrop(sel) {
      return selectors.has(sel);
    }
  });
  return {
    critical: above.css,
    rest: rest.css
  };
}

module.exports = criticalCSSParser;
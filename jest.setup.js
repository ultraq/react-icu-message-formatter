/* eslint-env node */
'use strict';

const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
Enzyme.configure({
	adapter: new Adapter()
});

// Node has an Intl object, but doesn't ship with any locale information, so we
// need to patch parts of it to work as it does in the browser.
const IntlPolyfill = require('intl');
Intl.NumberFormat = IntlPolyfill.NumberFormat;
IntlPolyfill.__applyLocaleSensitivePrototypes();
// Object.defineProperty(Number.prototype, 'toLocaleString', {
// 	configurable: true,
// 	writable: true,
// 	value: IntlPolyfill.__localeSensitiveProtos.Number.toLocaleString
// });

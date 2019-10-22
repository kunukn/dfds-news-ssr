/* eslint no-extend-native: 0 */

// https://github.com/zloirock/core-js#commonjs-api
import 'core-js/stable'

// https://github.com/zeit/next.js/blob/canary/examples/with-polyfills/client/polyfills.js

// core-js comes with Next.js. So, you can import it like below

// import find from 'core-js/library/fn/array/virtual/find'
// import startsWith from 'core-js/library/fn/string/virtual/starts-with'
// import startsWith from 'core-js/library/fn/string/virtual/ends-with'
// import assign from 'core-js/library/fn/object/assign'

// Add your polyfills
// This files runs at the very beginning (even before React and Next.js core)

// console.log('POLYFILLS')

// Array.prototype.find = find
// String.prototype.includes = includes
// String.prototype.repeat = repeat
// Object.assign = assign

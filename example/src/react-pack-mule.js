import{useCallback as t}from"react";import e from"zustand";import r from"zustand/shallow";
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */var n=function(){return(n=Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++)for(var o in e=arguments[r])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t}).apply(this,arguments)},o=function(o,a){void 0===a&&(a=function(){return o});var u=e(a),i=u.getState,s=u.setState,c=Object.getPrototypeOf({});function f(t){return Boolean(t&&"object"==typeof t&&Object.getPrototypeOf(t)===c)}function p(t){for(var e=i(),r={},o=Object.keys(t);o.length;){var a=o.shift(),u=e[a],c=t[a];if(f(u)&&f(c)){var p=u,l=c;r[a]=n(n({},p),l)}else r[a]=c}s(n(n({},e),r))}return{useGlobalStates:function(e,n){void 0===n&&(n=r);var o=e;return Array.isArray(e)&&(o=t((function(t){return e.reduce((function(e,r){return r in t&&(e[r]=t[r]),e}),{})}),e)),u(o,n)},getStates:i,setStates:s,updateStates:function(t,e){return void 0===e&&(e=p),e(t)},createPropUpdater:function(t){return function(e,r){var n;return void 0===r&&(r=p),r(((n={})[t]=e,n))}}}},a=o({}),u=a.useGlobalStates,i=a.getStates,s=a.setStates,c=a.updateStates,f=a.createPropUpdater;export{f as createPropUpdater,o as createStore,i as getStates,s as setStates,c as updateStates,u as useGlobalStates};
//# sourceMappingURL=index.es.js.map

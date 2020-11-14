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
***************************************************************************** */var n=function(){return(n=Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++)for(var o in e=arguments[r])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t}).apply(this,arguments)},o=function(o,a){void 0===a&&(a=function(){return o});var u=e(a),s=u.getState,i=u.setState,c=u.subscribe,f=Object.getPrototypeOf({});function p(t){return Boolean(t&&"object"==typeof t&&Object.getPrototypeOf(t)===f)}function l(t){for(var e=s(),r={},o=Object.keys(t);o.length;){var a=o.shift(),u=e[a],c=t[a];if(p(u)&&p(c)){var f=u,l=c;r[a]=n(n({},f),l)}else r[a]=c}i(n(n({},e),r))}function v(e,n){void 0===n&&(n=r);var o=e;return Array.isArray(e)&&(o=t((function(t){return e.reduce((function(e,r){return r in t&&(e[r]=t[r]),e}),{})}),e)),u(o,n)}return{useStore:v,useGlobalStates:v,getStates:s,setStates:i,updateStates:function(t,e){return void 0===e&&(e=l),e(t)},createPropUpdater:function(t){return function(e,r){var n;return void 0===r&&(r=l),r(((n={})[t]=e,n))}},subscribe:c}},a=o({}),u=a.useGlobalStates,s=a.getStates,i=a.setStates,c=a.updateStates,f=a.createPropUpdater;export{f as createPropUpdater,o as createStore,s as getStates,i as setStates,c as updateStates,u as useGlobalStates};
//# sourceMappingURL=index.es.js.map

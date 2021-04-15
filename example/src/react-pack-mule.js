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
***************************************************************************** */var o=function(){return(o=Object.assign||function(t){for(var e,r=1,o=arguments.length;r<o;r++)for(var n in e=arguments[r])Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t}).apply(this,arguments)},n=function(n,a){void 0===a&&(a=function(){return n});var u=e(a),s=u.getState,i=u.setState,c=u.subscribe,f=Object.getPrototypeOf({});function p(t){return Boolean(t&&"object"==typeof t&&Object.getPrototypeOf(t)===f)}function l(t){for(var e=s(),r={},n=Object.keys(t);n.length;){var a=n.shift(),u=e[a],c=t[a];if(p(u)&&p(c)){var f=u,l=c;r[a]=o(o({},f),l)}else r[a]=c}i(o(o({},e),r))}return{useStore:u,useGlobalState:function(e,o){void 0===o&&(o=r);var n=t((function(t){return t[e]}),[e]);return u(n,o)},getStates:s,setStates:i,updateStates:function(t,e){return void 0===e&&(e=l),e(t)},createPropUpdater:function(t){return function(e,r){var o;return void 0===r&&(r=l),r(((o={})[t]=e,o))}},subscribe:c}},a=n({}),u=a.useStore,s=a.useGlobalState,i=a.getStates,c=a.setStates,f=a.updateStates,p=a.createPropUpdater;export{p as createPropUpdater,n as createStore,i as getStates,c as setStates,f as updateStates,s as useGlobalState,u as useStore};
//# sourceMappingURL=index.es.js.map

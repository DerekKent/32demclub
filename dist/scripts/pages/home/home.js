"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(e.__proto__=t)}Object.defineProperty(exports,"__esModule",{value:!0});var _get=function(e,t,r){for(var o=!0;o;){var n=e,a=t,l=r;i=s=u=void 0,o=!1;var i=Object.getOwnPropertyDescriptor(n,a);if(void 0!==i){if("value"in i)return i.value;var u=i.get;return void 0===u?void 0:u.call(l)}var s=Object.getPrototypeOf(n);if(null===s)return void 0;e=s,t=a,r=l,o=!0}},_helpersBackboneBase=require("~/helpers/backbone/base"),_helpersBackboneBase2=_interopRequireDefault(_helpersBackboneBase),_homeHbs=require("./home.hbs"),_helpersNextMeeting=require("~/helpers/nextMeeting"),_helpersNextMeeting2=_interopRequireDefault(_helpersNextMeeting),Home=function(e){function t(){_classCallCheck(this,t),_get(Object.getPrototypeOf(t.prototype),"constructor",this).call(this,{template:_homeHbs.template,templateHelpers:{meetingDate:function(){return _helpersNextMeeting2["default"]().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"})}}})}return _inherits(t,e),t}(_helpersBackboneBase2["default"]);exports["default"]=Home,module.exports=exports["default"];
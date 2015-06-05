"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(e.__proto__=t)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),_get=function(e,t,r){for(var n=!0;n;){var o=e,a=t,i=r;l=u=s=void 0,n=!1;var l=Object.getOwnPropertyDescriptor(o,a);if(void 0!==l){if("value"in l)return l.value;var s=l.get;return void 0===s?void 0:s.call(i)}var u=Object.getPrototypeOf(o);if(null===u)return void 0;e=u,t=a,r=i,n=!0}},_backbone=require("backbone"),_backbone2=_interopRequireDefault(_backbone),_helpersBackboneBase=require("~/helpers/backbone/base"),_helpersBackboneBase2=_interopRequireDefault(_helpersBackboneBase),_appHbs=require("./app.hbs"),style=document.createElement("style"),head=document.getElementsByTagName("head")[0];style.innerHTML="\n    @import url('//fonts.googleapis.com/css?family=Lato:300,400,700,300italic,400italic');\n    @import url('//fonts.googleapis.com/css?family=Montserrat:700,400');\n    @import url(/scripts/app/styles/main.css);\n",head.appendChild(style);var AppView=function(e){function t(){_classCallCheck(this,t),_get(Object.getPrototypeOf(t.prototype),"constructor",this).call(this,{el:"body"})}return _inherits(t,e),_createClass(t,[{key:"initialize",value:function(){_get(Object.getPrototypeOf(t.prototype),"initialize",this).call(this,{template:_appHbs.template,regions:{main:"#main",header:"#header",footer:"#footer"}});var e=this;this.el.innerHTML=this.getTemplate(),System["import"]("~/app/header/header").then(function(t){var r=null;r=t["default"]?new t["default"]:new t,e.regions.header.show(r)}),System["import"]("~/app/footer/footer").then(function(t){var r=null;r=t["default"]?new t["default"]:new t,e.regions.footer.show(r)})}},{key:"render",value:function(e,t){var r=this;return System["import"]("~/pages/"+e+"/"+e).then(function(e){var n=null;n=e["default"]?new e["default"](t):new e(t),r.regions.main.show(n)}),this}}]),t}(_helpersBackboneBase2["default"]),appView=new AppView;exports["default"]=appView,module.exports=exports["default"];
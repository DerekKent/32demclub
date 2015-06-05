"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(e.__proto__=t)}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function dispose(e){delete e.parent,delete e.el,delete e.regions}Object.defineProperty(exports,"__esModule",{value:!0});var _get=function(e,t,n){for(var i=!0;i;){var o=e,r=t,a=n;s=l=u=void 0,i=!1;var s=Object.getOwnPropertyDescriptor(o,r);if(void 0!==s){if("value"in s)return s.value;var u=s.get;return void 0===u?void 0:u.call(a)}var l=Object.getPrototypeOf(o);if(null===l)return void 0;e=l,t=r,n=a,i=!0}},_createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),_underscore=require("underscore"),_underscore2=_interopRequireDefault(_underscore),_backbone=require("backbone"),_backbone2=_interopRequireDefault(_backbone),_backboneNativeview=require("backbone.nativeview"),_backboneNativeview2=_interopRequireDefault(_backboneNativeview);_backbone2["default"].View=_backboneNativeview2["default"],function(){for(var e=0,t=["ms","moz","webkit","o"],n=0;n<t.length&&!window.requestAnimationFrame;++n)window.requestAnimationFrame=window[t[n]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[t[n]+"CancelAnimationFrame"]||window[t[n]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(t,n){var i=(new Date).getTime(),o=Math.max(0,16-(i-e)),r=window.setTimeout(function(){t(i+o)},o);return e=i+o,r}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(e){clearTimeout(e)})}();var Region=function(){function e(t,n){_classCallCheck(this,e),this.el=t,this.parent=n}return _createClass(e,[{key:"show",value:function(e){this.empty(),this.append(e)}},{key:"append",value:function(e){this.appendAs("div",e)}},{key:"appendAs",value:function(e,t){"string"==typeof this.el&&(this.el=this.parent.el.querySelector(this.el)),t.el=document.createElement(e),t.parent=this.parent,this.views=this.views||[],this.views.push(t),this.el.appendChild(t.el),t.setElement(t.el).render(),t.onShow()}},{key:"empty",value:function(){_underscore2["default"].each(this.views,function(e){e.close()}),this.el instanceof Element&&(this.el.innerHTML=""),this.views=null}},{key:"close",value:function(){this.empty(),dispose(this)}}]),e}(),Regions=function e(t,n){var i=void 0===arguments[0]?{}:arguments[0];_classCallCheck(this,e),_underscore2["default"].each(_underscore2["default"].keys(i),function(e){this[e]=new Region(i[e],n)}.bind(this)),this.self=new Region(null,n)},BaseView=function(e){function t(){var e=void 0===arguments[0]?{}:arguments[0];_classCallCheck(this,t),_get(Object.getPrototypeOf(t.prototype),"constructor",this).apply(this,arguments),this.template=e.template,this.regions=new Regions(e.regions,this),this.initialize.apply(this,arguments)}return _inherits(t,e),_createClass(t,[{key:"renderDom",value:function(){this.el&&(this.el.innerHTML=this.getTemplate())}},{key:"getTemplate",value:function(){return"function"==typeof this.template?this.template(this.getTemplateData()):this.template}},{key:"getTemplateData",value:function(){var e=this.model?this.model.toJSON():this.collection?this.collection.toJSON():{};return"function"!=typeof this.templateHelpers?(_underscore2["default"].each(this.templateHelpers,function(t,n){e[n]="function"==typeof t?t.apply(this):t}),e):void _underscore2["default"].extend(e,this.templateHelpers())}},{key:"_render",value:function(){_underscore2["default"].each(this.regions,function(e){e.empty()}),window.requestAnimationFrame(this.renderDom.bind(this))}},{key:"render",value:function(){return this.onBeforeRender(),this._render(),window.requestAnimationFrame(this.onRender.bind(this)),this._rendered?window.requestAnimationFrame(this.onDomRefresh.bind(this)):this._rendered=!0,window.requestAnimationFrame(this.onAfterRender.bind(this)),this}},{key:"onShow",value:function(){}},{key:"onBeforeRender",value:function(){}},{key:"onRender",value:function(){}},{key:"onAfterRender",value:function(){}},{key:"onDomRefresh",value:function(){}},{key:"onBeforeClose",value:function(){}},{key:"close",value:function(){return this.onBeforeClose(),_underscore2["default"].each(this.regions,function(e){e.close()}),this.off(),this.remove(),this.unbind(),dispose(this),this}}]),t}(_backbone2["default"].View);exports["default"]=BaseView,module.exports=exports["default"];
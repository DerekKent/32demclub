!function(e){"function"==typeof define&&define.amd?define(["backbone"],e):"object"==typeof module?module.exports=e(require("backbone")):e(Backbone)}(function(e){var t=/^\s*</,n="undefined"!=typeof Element&&Element.prototype||{},i=n.addEventListener||function(e,t){return this.attachEvent("on"+e,t)},r=n.removeEventListener||function(e,t){return this.detachEvent("on"+e,t)},l=function(e,t){for(var n=0,i=e.length;i>n;n++)if(e[n]===t)return n;return-1},o=n.matches||n.webkitMatchesSelector||n.mozMatchesSelector||n.msMatchesSelector||n.oMatchesSelector||function(e){var t=(this.parentNode||document).querySelectorAll(e)||[];return~l(t,this)},s=e.View;return e.NativeViewMixin={_domEvents:null,constructor:function(){return this._domEvents=[],s.apply(this,arguments)},$:function(e){return this.el.querySelectorAll(e)},_removeElement:function(){this.undelegateEvents(),this.el.parentNode&&this.el.parentNode.removeChild(this.el)},_setElement:function(e){if("string"==typeof e)if(t.test(e)){var n=document.createElement("div");n.innerHTML=e,this.el=n.firstChild}else this.el=document.querySelector(e);else this.el=e},_setAttributes:function(e){for(var t in e)t in this.el?this.el[t]=e[t]:this.el.setAttribute(t,e[t])},delegate:function(e,t,n){"function"==typeof t&&(n=t,t=null);var r=this.el,l=t?function(e){for(var i=e.target||e.srcElement;i&&i!=r;i=i.parentNode)o.call(i,t)&&(e.delegateTarget=i,n(e))}:n;return i.call(this.el,e,l,!1),this._domEvents.push({eventName:e,handler:l,listener:n,selector:t}),l},undelegate:function(e,t,n){if("function"==typeof t&&(n=t,t=null),this.el)for(var i=this._domEvents.slice(),o=0,s=i.length;s>o;o++){var a=i[o],c=a.eventName===e&&(n?a.listener===n:!0)&&(t?a.selector===t:!0);c&&(r.call(this.el,a.eventName,a.handler,!1),this._domEvents.splice(l(i,a),1))}return this},undelegateEvents:function(){if(this.el){for(var e=0,t=this._domEvents.length;t>e;e++){var n=this._domEvents[e];r.call(this.el,n.eventName,n.handler,!1)}this._domEvents.length=0}return this}},e.NativeView=e.View.extend(e.NativeViewMixin),e.NativeView});
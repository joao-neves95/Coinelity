/*
 *
 * Copyright (c) 2018 Jo�o Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Jo�o Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812
 *
 */

// MergerJS imports:
//
// @import '/enums/environmentType'
// @import '/enums/colors'
// @import '/enums/navbarItemType'
// @import '/enums/navItemID'
// @import '/enums/gridOrientationType'
// @import '/enums/requestType'
// @import '/models/changePasswordDTO'
// @import 'constants'
// @import '/services/devErrors'
// $import 'when-dom-ready/dist/index.umd'
// $import 'sweetalert2/dist/sweetalert2.all.min'
// @import '/services/externalLibs'
// @import '/services/utils'
// @import '/services/DOM'
// @import '/services/httpClient'
// @import '/navbar/navbarItemBase'
// @import '/interfaces/pageTemplates'
// @import '/interfaces/modelBase'
// @import '/interfaces/viewBase'
// @import '/interfaces/controllerBase'
// @import '/pages/dashboard/dashboard.templates'
// @import '/pages/dashboard/dashboard.model'
// @import '/pages/dashboard/dashboard.view'
// @import '/pages/dashboard/dashboard.controller'
// @import '/pages/tradeRoom/markets/markets.templates'
// @import '/pages/tradeRoom/markets/markets.model'
// @import '/pages/tradeRoom/markets/markets.view'
// @import '/pages/tradeRoom/markets/markets.controller'
// @import '/pages/tradeRoom/tradeRoom.templates'
// @import '/pages/tradeRoom/tradeRoom.model'
// @import '/pages/tradeRoom/tradeRoom.view'
// @import '/pages/tradeRoom/tradeRoom.controller'
// @import '/pages/settings/settings.templates'
// @import '/pages/settings/settings.model'
// @import '/pages/settings/settings.view'
// @import '/pages/settings/settings.controller'
// @import '/navbar/navbar.templates'
// @import '/navbar/navbar.model'
// @import '/navbar/navbar.view'
// @import '/navbar/navbar.controller'
// @import '/enums/themeType'
// @import '/services/themes'
// @import 'trader.main'
// @import '/services/traderRoutes'
'use strict';
﻿const EnvironmentType = Object.freeze( {
  Development: 'DEVELOPMENT',
  Production: 'PRODUCTION'
} );
﻿const Colors = Object.freeze({
  DarkGrey: '#3D3D3D',
  LightBlue: '#78BBFF'
});
﻿const NavbarItemType = Object.freeze({
  Page: 1,
  NavbarPanelItem: 2,
  Modal: 3
});
﻿/**
 * Used for storing navbar items in Dictionaries and as the URL slug in case of beeing a page.
 */
const NavItemID = Object.freeze( {
  Dashboard: 'dashboard',
  TradeRoom: 'trade-room',
  Markets: 'trade-room/markets',
  Trade: 'trade-room/trade',
  Settings: 'settings'
});
﻿const GridOrientationType = Object.freeze( {
  Y: 'grid-y',
  X: 'grid-x'
} );
﻿const RequestType = Object.freeze( {
  Post: 'POST',
  Get: 'GET',
  Put: 'PUT',
  Delete: 'DELETE'
} );
﻿class ChangePasswordDTO {
  constructor( currentPassword, newPassword ) {
    this.currentPassword = currentPassword;
    this.newPassword = newPassword;
  }
}
﻿const ENV = EnvironmentType.Development;
const BASE_URL = 'http://localhost:33623/';
const BASE_API_URL = BASE_URL + 'api/';
const PUBLIC_IMGS_URL = 'public/img/';
const AUTH_TOKEN_ID = 'auth-token';

// Images URL'S:
const DASHBOARD_ICON_URL = `${PUBLIC_IMGS_URL}dashboard-icon-white.svg`;
const TRADE_ROOM_ICON_URL = `${PUBLIC_IMGS_URL}chart-icon-white.svg`;
const SETTINGS_ICON_URL = `${PUBLIC_IMGS_URL}settings-icon-white.svg`;

// This sizes are the same as in "variables.less".
const SIDEBAR_MOBILE_WIDTH = '3em';
const SIDEBAR_DESKTOP_WIDTH = '10em';
﻿class DevErrors {
  constructor() {
    DevErrors.cantInstantiate( 'DevErrors' );
  }

  /**
   * 
   * @param { string } message Error message to throw.
   * 
   * @returns { Error }
   */
  static throw( message ) {
    if ( ENV === EnvironmentType.Production )
      return;

    throw new Error( message );
  }

  /**
   * 
   * @param { string } className The name of the static class that can not be intantiated.
   */
  static cantInstantiateStatic( className ) {
    DevErrors.throw( `Can not create an intance of ${className} (static class).` );
  }

  static singleIntance( singletonClassName ) {
    DevErrors.throw( `There can only be one instance of ${className} (singleton class).` );
  }

  static notImplemented( additionalInfo = '' ) {
    DevErrors.throw( `The function, method, class or opertion has not yet been implemented.\n${additionalInfo}` );
  }
}
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.whenDomReady = factory());
}(this, (function () { 'use strict';

/* eslint no-void: "off" */

// Loaded ready states
var loadedStates = ['interactive', 'complete'];

// Return Promise
var whenDomReady = function whenDomReady(cb, doc) {
	return new Promise(function (resolve) {
		// Allow doc to be passed in as the lone first param
		if (cb && typeof cb !== 'function') {
			doc = cb;
			cb = null;
		}

		// Use global document if we don't have one
		doc = doc || window.document;

		// Handle DOM load
		var done = function done() {
			return resolve(void (cb && setTimeout(cb)));
		};

		// Resolve now if DOM has already loaded
		// Otherwise wait for DOMContentLoaded
		if (loadedStates.indexOf(doc.readyState) !== -1) {
			done();
		} else {
			doc.addEventListener('DOMContentLoaded', done);
		}
	});
};

// Promise chain helper
whenDomReady.resume = function (doc) {
	return function (val) {
		return whenDomReady(doc).then(function () {
			return val;
		});
	};
};

return whenDomReady;

})));
//# sourceMappingURL=index.umd.js.map
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.Sweetalert2=t()}(this,function(){"use strict";function V(e){return(V="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function c(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function r(e,t,n){return t&&o(e.prototype,t),n&&o(e,n),e}function i(){return(i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&u(e,t)}function s(e){return(s=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function u(e,t){return(u=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function l(e,t,n){return(l=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}()?Reflect.construct:function(e,t,n){var o=[null];o.push.apply(o,t);var r=new(Function.bind.apply(e,o));return n&&u(r,n.prototype),r}).apply(null,arguments)}function d(e,t){return!t||"object"!=typeof t&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function p(e,t,n){return(p="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var o=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=s(e)););return e}(e,t);if(o){var r=Object.getOwnPropertyDescriptor(o,t);return r.get?r.get.call(n):r.value}})(e,t,n||e)}var t="SweetAlert2:",f=function(e){return Array.prototype.slice.call(e)},m=function(e){console.warn("".concat(t," ").concat(e))},R=function(e){console.error("".concat(t," ").concat(e))},n=[],h=function(e){-1===n.indexOf(e)&&(n.push(e),m(e))},M=function(e){return"function"==typeof e?e():e},H=function(e){return"object"===V(e)&&"function"==typeof e.then},e=Object.freeze({cancel:"cancel",backdrop:"overlay",close:"close",esc:"esc",timer:"timer"}),g=function(e){var t={};for(var n in e)t[e[n]]="swal2-"+e[n];return t},I=g(["container","shown","height-auto","iosfix","popup","modal","no-backdrop","toast","toast-shown","toast-column","fade","show","hide","noanimation","close","title","header","content","actions","confirm","cancel","footer","icon","icon-text","image","input","file","range","select","radio","checkbox","label","textarea","inputerror","validationerror","progresssteps","activeprogressstep","progresscircle","progressline","loading","styled","top","top-start","top-end","top-left","top-right","center","center-start","center-end","center-left","center-right","bottom","bottom-start","bottom-end","bottom-left","bottom-right","grow-row","grow-column","grow-fullscreen"]),b=g(["success","warning","info","question","error"]),y={previousBodyPadding:null},v=function(e,t){return e.classList.contains(t)},_=function(e){if(e.focus(),"file"!==e.type){var t=e.value;e.value="",e.value=t}},w=function(e,t,n){e&&t&&("string"==typeof t&&(t=t.split(/\s+/).filter(Boolean)),t.forEach(function(t){e.forEach?e.forEach(function(e){n?e.classList.add(t):e.classList.remove(t)}):n?e.classList.add(t):e.classList.remove(t)}))},D=function(e,t){w(e,t,!0)},N=function(e,t){w(e,t,!1)},W=function(e,t){for(var n=0;n<e.childNodes.length;n++)if(v(e.childNodes[n],t))return e.childNodes[n]},z=function(e){e.style.opacity="",e.style.display=e.id===I.content?"block":"flex"},U=function(e){e.style.opacity="",e.style.display="none"},K=function(e){return e&&(e.offsetWidth||e.offsetHeight||e.getClientRects().length)},C=function(){return document.body.querySelector("."+I.container)},k=function(e){var t=C();return t?t.querySelector("."+e):null},x=function(){return k(I.popup)},A=function(){var e=x();return f(e.querySelectorAll("."+I.icon))},B=function(){return k(I.title)},P=function(){return k(I.content)},S=function(){return k(I.image)},E=function(){return k(I.progresssteps)},O=function(){return k(I.confirm)},F=function(){return k(I.cancel)},Z=function(){return k(I.actions)},Q=function(){return k(I.footer)},Y=function(){return k(I.close)},$=function(){var e=f(x().querySelectorAll('[tabindex]:not([tabindex="-1"]):not([tabindex="0"])')).sort(function(e,t){return e=parseInt(e.getAttribute("tabindex")),(t=parseInt(t.getAttribute("tabindex")))<e?1:e<t?-1:0}),t=f(x().querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable], audio[controls], video[controls]')).filter(function(e){return"-1"!==e.getAttribute("tabindex")});return function(e){for(var t=[],n=0;n<e.length;n++)-1===t.indexOf(e[n])&&t.push(e[n]);return t}(e.concat(t)).filter(function(e){return K(e)})},L=function(){return!T()&&!document.body.classList.contains(I["no-backdrop"])},T=function(){return document.body.classList.contains(I["toast-shown"])},j=function(){return"undefined"==typeof window||"undefined"==typeof document},q='\n <div aria-labelledby="'.concat(I.title,'" aria-describedby="').concat(I.content,'" class="').concat(I.popup,'" tabindex="-1">\n   <div class="').concat(I.header,'">\n     <ul class="').concat(I.progresssteps,'"></ul>\n     <div class="').concat(I.icon," ").concat(b.error,'">\n       <span class="swal2-x-mark"><span class="swal2-x-mark-line-left"></span><span class="swal2-x-mark-line-right"></span></span>\n     </div>\n     <div class="').concat(I.icon," ").concat(b.question,'">\n       <span class="').concat(I["icon-text"],'">?</span>\n      </div>\n     <div class="').concat(I.icon," ").concat(b.warning,'">\n       <span class="').concat(I["icon-text"],'">!</span>\n      </div>\n     <div class="').concat(I.icon," ").concat(b.info,'">\n       <span class="').concat(I["icon-text"],'">i</span>\n      </div>\n     <div class="').concat(I.icon," ").concat(b.success,'">\n       <div class="swal2-success-circular-line-left"></div>\n       <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>\n       <div class="swal2-success-ring"></div> <div class="swal2-success-fix"></div>\n       <div class="swal2-success-circular-line-right"></div>\n     </div>\n     <img class="').concat(I.image,'" />\n     <h2 class="').concat(I.title,'" id="').concat(I.title,'"></h2>\n     <button type="button" class="').concat(I.close,'">×</button>\n   </div>\n   <div class="').concat(I.content,'">\n     <div id="').concat(I.content,'"></div>\n     <input class="').concat(I.input,'" />\n     <input type="file" class="').concat(I.file,'" />\n     <div class="').concat(I.range,'">\n       <input type="range" />\n       <output></output>\n     </div>\n     <select class="').concat(I.select,'"></select>\n     <div class="').concat(I.radio,'"></div>\n     <label for="').concat(I.checkbox,'" class="').concat(I.checkbox,'">\n       <input type="checkbox" />\n       <span class="').concat(I.label,'"></span>\n     </label>\n     <textarea class="').concat(I.textarea,'"></textarea>\n     <div class="').concat(I.validationerror,'" id="').concat(I.validationerror,'"></div>\n   </div>\n   <div class="').concat(I.actions,'">\n     <button type="button" class="').concat(I.confirm,'">OK</button>\n     <button type="button" class="').concat(I.cancel,'">Cancel</button>\n   </div>\n   <div class="').concat(I.footer,'">\n   </div>\n </div>\n').replace(/(^|\n)\s*/g,""),J=function(e){var t=C();if(t&&(t.parentNode.removeChild(t),N([document.documentElement,document.body],[I["no-backdrop"],I["toast-shown"],I["has-column"]])),!j()){var n=document.createElement("div");n.className=I.container,n.innerHTML=q,("string"==typeof e.target?document.querySelector(e.target):e.target).appendChild(n);var o,r=x(),i=P(),a=W(i,I.input),c=W(i,I.file),s=i.querySelector(".".concat(I.range," input")),u=i.querySelector(".".concat(I.range," output")),l=W(i,I.select),d=i.querySelector(".".concat(I.checkbox," input")),p=W(i,I.textarea);r.setAttribute("role",e.toast?"alert":"dialog"),r.setAttribute("aria-live",e.toast?"polite":"assertive"),e.toast||r.setAttribute("aria-modal","true");var f=function(e){qe.isVisible()&&o!==e.target.value&&qe.resetValidationError(),o=e.target.value};return a.oninput=f,c.onchange=f,l.onchange=f,d.onchange=f,p.oninput=f,s.oninput=function(e){f(e),u.value=s.value},s.onchange=function(e){f(e),s.nextSibling.value=s.value},r}R("SweetAlert2 requires document to initialize")},X=function(e,t){if(!e)return U(t);if("object"===V(e))if(t.innerHTML="",0 in e)for(var n=0;n in e;n++)t.appendChild(e[n].cloneNode(!0));else t.appendChild(e.cloneNode(!0));else e&&(t.innerHTML=e);z(t)},G=function(){if(j())return!1;var e=document.createElement("div"),t={WebkitAnimation:"webkitAnimationEnd",OAnimation:"oAnimationEnd oanimationend",animation:"animationend"};for(var n in t)if(t.hasOwnProperty(n)&&void 0!==e.style[n])return t[n];return!1}(),ee=function(e){var t,n,o=Z(),r=O(),i=F();if(e.showConfirmButton||e.showCancelButton?z(o):U(o),e.showCancelButton?i.style.display="inline-block":U(i),e.showConfirmButton?(n="display",(t=r).style.removeProperty?t.style.removeProperty(n):t.style.removeAttribute(n)):U(r),r.innerHTML=e.confirmButtonText,i.innerHTML=e.cancelButtonText,r.setAttribute("aria-label",e.confirmButtonAriaLabel),i.setAttribute("aria-label",e.cancelButtonAriaLabel),r.className=I.confirm,D(r,e.confirmButtonClass),i.className=I.cancel,D(i,e.cancelButtonClass),e.buttonsStyling){D([r,i],I.styled),e.confirmButtonColor&&(r.style.backgroundColor=e.confirmButtonColor),e.cancelButtonColor&&(i.style.backgroundColor=e.cancelButtonColor);var a=window.getComputedStyle(r).getPropertyValue("background-color");r.style.borderLeftColor=a,r.style.borderRightColor=a}else N([r,i],I.styled),r.style.backgroundColor=r.style.borderLeftColor=r.style.borderRightColor="",i.style.backgroundColor=i.style.borderLeftColor=i.style.borderRightColor=""},te=function(e){var t=P().querySelector("#"+I.content);e.html?X(e.html,t):e.text?(t.textContent=e.text,z(t)):U(t)},ne=function(e){for(var t=A(),n=0;n<t.length;n++)U(t[n]);if(e.type)if(-1!==Object.keys(b).indexOf(e.type)){var o=qe.getPopup().querySelector(".".concat(I.icon,".").concat(b[e.type]));z(o),e.animation&&D(o,"swal2-animate-".concat(e.type,"-icon"))}else R('Unknown type! Expected "success", "error", "warning", "info" or "question", got "'.concat(e.type,'"'))},oe=function(e){var t=S();e.imageUrl?(t.setAttribute("src",e.imageUrl),t.setAttribute("alt",e.imageAlt),z(t),e.imageWidth?t.setAttribute("width",e.imageWidth):t.removeAttribute("width"),e.imageHeight?t.setAttribute("height",e.imageHeight):t.removeAttribute("height"),t.className=I.image,e.imageClass&&D(t,e.imageClass)):U(t)},re=function(r){var i=E(),a=parseInt(null===r.currentProgressStep?qe.getQueueStep():r.currentProgressStep,10);r.progressSteps&&r.progressSteps.length?(z(i),i.innerHTML="",a>=r.progressSteps.length&&m("Invalid currentProgressStep parameter, it should be less than progressSteps.length (currentProgressStep like JS arrays starts from 0)"),r.progressSteps.forEach(function(e,t){var n=document.createElement("li");if(D(n,I.progresscircle),n.innerHTML=e,t===a&&D(n,I.activeprogressstep),i.appendChild(n),t!==r.progressSteps.length-1){var o=document.createElement("li");D(o,I.progressline),r.progressStepsDistance&&(o.style.width=r.progressStepsDistance),i.appendChild(o)}})):U(i)},ie=function(e){var t=B();e.titleText?t.innerText=e.titleText:e.title&&("string"==typeof e.title&&(e.title=e.title.split("\n").join("<br />")),X(e.title,t))},ae=function(){null===y.previousBodyPadding&&document.body.scrollHeight>window.innerHeight&&(y.previousBodyPadding=parseInt(window.getComputedStyle(document.body).getPropertyValue("padding-right")),document.body.style.paddingRight=y.previousBodyPadding+function(){if("ontouchstart"in window||navigator.msMaxTouchPoints)return 0;var e=document.createElement("div");e.style.width="50px",e.style.height="50px",e.style.overflow="scroll",document.body.appendChild(e);var t=e.offsetWidth-e.clientWidth;return document.body.removeChild(e),t}()+"px")},ce={},se=function(e,n){var o=C(),t=x();if(t){null!==e&&"function"==typeof e&&e(t),N(t,I.show),D(t,I.hide);var r=function(){var e,t;T()||(e=window.scrollX,t=window.scrollY,ce.restoreFocusTimeout=setTimeout(function(){ce.previousActiveElement&&ce.previousActiveElement.focus?(ce.previousActiveElement.focus(),ce.previousActiveElement=null):document.body&&document.body.focus()},100),void 0!==e&&void 0!==t&&window.scrollTo(e,t),ce.keydownTarget.removeEventListener("keydown",ce.keydownHandler,{capture:ce.keydownListenerCapture}),ce.keydownHandlerAdded=!1),o.parentNode&&o.parentNode.removeChild(o),N([document.documentElement,document.body],[I.shown,I["height-auto"],I["no-backdrop"],I["toast-shown"],I["toast-column"]]),L()&&(null!==y.previousBodyPadding&&(document.body.style.paddingRight=y.previousBodyPadding,y.previousBodyPadding=null),function(){if(v(document.body,I.iosfix)){var e=parseInt(document.body.style.top,10);N(document.body,I.iosfix),document.body.style.top="",document.body.scrollTop=-1*e}}(),f(document.body.children).forEach(function(e){e.hasAttribute("data-previous-aria-hidden")?(e.setAttribute("aria-hidden",e.getAttribute("data-previous-aria-hidden")),e.removeAttribute("data-previous-aria-hidden")):e.removeAttribute("aria-hidden")})),null!==n&&"function"==typeof n&&setTimeout(function(){n()})};G&&!v(t,I.noanimation)?t.addEventListener(G,function e(){t.removeEventListener(G,e),v(t,I.hide)&&r()}):r()}};function ue(e){var t=function e(){for(var t=arguments.length,n=new Array(t),o=0;o<t;o++)n[o]=arguments[o];if(!(this instanceof e))return l(e,n);Object.getPrototypeOf(e).apply(this,n)};return t.prototype=i(Object.create(e.prototype),{constructor:t}),"function"==typeof Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e,t}var le={title:"",titleText:"",text:"",html:"",footer:"",type:null,toast:!1,customClass:"",target:"body",backdrop:!0,animation:!0,heightAuto:!0,allowOutsideClick:!0,allowEscapeKey:!0,allowEnterKey:!0,stopKeydownPropagation:!0,keydownListenerCapture:!1,showConfirmButton:!0,showCancelButton:!1,preConfirm:null,confirmButtonText:"OK",confirmButtonAriaLabel:"",confirmButtonColor:null,confirmButtonClass:null,cancelButtonText:"Cancel",cancelButtonAriaLabel:"",cancelButtonColor:null,cancelButtonClass:null,buttonsStyling:!0,reverseButtons:!1,focusConfirm:!0,focusCancel:!1,showCloseButton:!1,closeButtonAriaLabel:"Close this dialog",showLoaderOnConfirm:!1,imageUrl:null,imageWidth:null,imageHeight:null,imageAlt:"",imageClass:null,timer:null,width:null,padding:null,background:null,input:null,inputPlaceholder:"",inputValue:"",inputOptions:{},inputAutoTrim:!0,inputClass:null,inputAttributes:{},inputValidator:null,grow:!1,position:"center",progressSteps:[],currentProgressStep:null,progressStepsDistance:null,onBeforeOpen:null,onAfterClose:null,onOpen:null,onClose:null,useRejections:!1,expectRejections:!1},de=["useRejections","expectRejections"],pe=["allowOutsideClick","allowEnterKey","backdrop","focusConfirm","focusCancel","heightAuto","keydownListenerCapture"],fe=function(e){return le.hasOwnProperty(e)||"extraParams"===e},me=function(e){return-1!==de.indexOf(e)},he=function(e){for(var t in e)fe(t)||m('Unknown parameter "'.concat(t,'"')),e.toast&&-1!==pe.indexOf(t)&&m('The parameter "'.concat(t,'" is incompatible with toasts')),me(t)&&h('The parameter "'.concat(t,'" is deprecated and will be removed in the next major release.'))},ge='"setDefaults" & "resetDefaults" methods are deprecated in favor of "mixin" method and will be removed in the next major release. For new projects, use "mixin". For past projects already using "setDefaults", support will be provided through an additional package.',be={};var ye=[],ve=function(){var e=x();e||qe(""),e=x();var t=Z(),n=O(),o=F();z(t),z(n),D([e,t],I.loading),n.disabled=!0,o.disabled=!0,e.setAttribute("data-loading",!0),e.setAttribute("aria-busy",!0),e.focus()},we=Object.freeze({isValidParameter:fe,isDeprecatedParameter:me,argsToParams:function(n){var o={};switch(V(n[0])){case"object":i(o,n[0]);break;default:["title","html","type"].forEach(function(e,t){switch(V(n[t])){case"string":o[e]=n[t];break;case"undefined":break;default:R("Unexpected type of ".concat(e,'! Expected "string", got ').concat(V(n[t])))}})}return o},adaptInputValidator:function(n){return function(e,t){return n.call(this,e,t).then(function(){},function(e){return e})}},close:se,closePopup:se,closeModal:se,closeToast:se,isVisible:function(){return!!x()},clickConfirm:function(){return O().click()},clickCancel:function(){return F().click()},getContainer:C,getPopup:x,getTitle:B,getContent:P,getImage:S,getIcons:A,getCloseButton:Y,getButtonsWrapper:function(){return h("swal.getButtonsWrapper() is deprecated and will be removed in the next major release, use swal.getActions() instead"),k(I.actions)},getActions:Z,getConfirmButton:O,getCancelButton:F,getFooter:Q,getFocusableElements:$,isLoading:function(){return x().hasAttribute("data-loading")},fire:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return l(this,t)},mixin:function(n){return ue(function(e){function t(){return c(this,t),d(this,s(t).apply(this,arguments))}return a(t,e),r(t,[{key:"_main",value:function(e){return p(s(t.prototype),"_main",this).call(this,i({},n,e))}}]),t}(this))},queue:function(e){var i=this;ye=e;var a=function(){ye=[],document.body.removeAttribute("data-swal2-queue-step")},c=[];return new Promise(function(r){!function t(n,o){n<ye.length?(document.body.setAttribute("data-swal2-queue-step",n),i(ye[n]).then(function(e){void 0!==e.value?(c.push(e.value),t(n+1,o)):(a(),r({dismiss:e.dismiss}))})):(a(),r({value:c}))}(0)})},getQueueStep:function(){return document.body.getAttribute("data-swal2-queue-step")},insertQueueStep:function(e,t){return t&&t<ye.length?ye.splice(t,0,e):ye.push(e)},deleteQueueStep:function(e){void 0!==ye[e]&&ye.splice(e,1)},showLoading:ve,enableLoading:ve,getTimerLeft:function(){return ce.timeout&&ce.timeout.getTimerLeft()}}),Ce="function"==typeof Symbol?Symbol:function(){var t=0;function e(e){return"__"+e+"_"+Math.floor(1e9*Math.random())+"_"+ ++t+"__"}return e.iterator=e("Symbol.iterator"),e}(),ke="function"==typeof WeakMap?WeakMap:function(n,o,t){function e(){o(this,n,{value:Ce("WeakMap")})}return e.prototype={delete:function(e){delete e[this[n]]},get:function(e){return e[this[n]]},has:function(e){return t.call(e,this[n])},set:function(e,t){o(e,this[n],{configurable:!0,value:t})}},e}(Ce("WeakMap"),Object.defineProperty,{}.hasOwnProperty),xe={promise:new ke,innerParams:new ke,domCache:new ke};function Ae(){var e=xe.innerParams.get(this),t=xe.domCache.get(this);e.showConfirmButton||(U(t.confirmButton),e.showCancelButton||U(t.actions)),N([t.popup,t.actions],I.loading),t.popup.removeAttribute("aria-busy"),t.popup.removeAttribute("data-loading"),t.confirmButton.disabled=!1,t.cancelButton.disabled=!1}var Be=function e(t,n){var o,r,i;c(this,e);var a=n;this.start=function(){i=!0,r=new Date,o=setTimeout(t,a)},this.stop=function(){i=!1,clearTimeout(o),a-=new Date-r},this.getTimerLeft=function(){return i&&(this.stop(),this.start()),a},this.start()},Pe={email:function(e,t){return/^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,24}$/.test(e)?Promise.resolve():Promise.reject(t&&t.validationMessage?t.validationMessage:"Invalid email address")},url:function(e,t){return/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/.test(e)?Promise.resolve():Promise.reject(t&&t.validationMessage?t.validationMessage:"Invalid URL")}};var Se=function(e){var t=C(),n=x();null!==e.onBeforeOpen&&"function"==typeof e.onBeforeOpen&&e.onBeforeOpen(n),e.animation?(D(n,I.show),D(t,I.fade),N(n,I.hide)):N(n,I.fade),z(n),t.style.overflowY="hidden",G&&!v(n,I.noanimation)?n.addEventListener(G,function e(){n.removeEventListener(G,e),t.style.overflowY="auto"}):t.style.overflowY="auto",D([document.documentElement,document.body,t],I.shown),e.heightAuto&&e.backdrop&&!e.toast&&D([document.documentElement,document.body],I["height-auto"]),L()&&(ae(),function(){if(/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream&&!v(document.body,I.iosfix)){var e=document.body.scrollTop;document.body.style.top=-1*e+"px",D(document.body,I.iosfix)}}(),f(document.body.children).forEach(function(e){e===C()||e.contains(C())||(e.hasAttribute("aria-hidden")&&e.setAttribute("data-previous-aria-hidden",e.getAttribute("aria-hidden")),e.setAttribute("aria-hidden","true"))})),T()||ce.previousActiveElement||(ce.previousActiveElement=document.activeElement),null!==e.onOpen&&"function"==typeof e.onOpen&&setTimeout(function(){e.onOpen(n)})};var Ee,Oe=Object.freeze({hideLoading:Ae,disableLoading:Ae,getInput:function(e){var t=xe.innerParams.get(this),n=xe.domCache.get(this);if(!(e=e||t.input))return null;switch(e){case"select":case"textarea":case"file":return W(n.content,I[e]);case"checkbox":return n.popup.querySelector(".".concat(I.checkbox," input"));case"radio":return n.popup.querySelector(".".concat(I.radio," input:checked"))||n.popup.querySelector(".".concat(I.radio," input:first-child"));case"range":return n.popup.querySelector(".".concat(I.range," input"));default:return W(n.content,I.input)}},enableButtons:function(){var e=xe.domCache.get(this);e.confirmButton.disabled=!1,e.cancelButton.disabled=!1},disableButtons:function(){var e=xe.domCache.get(this);e.confirmButton.disabled=!0,e.cancelButton.disabled=!0},enableConfirmButton:function(){xe.domCache.get(this).confirmButton.disabled=!1},disableConfirmButton:function(){xe.domCache.get(this).confirmButton.disabled=!0},enableInput:function(){var e=this.getInput();if(!e)return!1;if("radio"===e.type)for(var t=e.parentNode.parentNode.querySelectorAll("input"),n=0;n<t.length;n++)t[n].disabled=!1;else e.disabled=!1},disableInput:function(){var e=this.getInput();if(!e)return!1;if(e&&"radio"===e.type)for(var t=e.parentNode.parentNode.querySelectorAll("input"),n=0;n<t.length;n++)t[n].disabled=!0;else e.disabled=!0},showValidationError:function(e){var t=xe.domCache.get(this);t.validationError.innerHTML=e;var n=window.getComputedStyle(t.popup);t.validationError.style.marginLeft="-".concat(n.getPropertyValue("padding-left")),t.validationError.style.marginRight="-".concat(n.getPropertyValue("padding-right")),z(t.validationError);var o=this.getInput();o&&(o.setAttribute("aria-invalid",!0),o.setAttribute("aria-describedBy",I.validationerror),_(o),D(o,I.inputerror))},resetValidationError:function(){var e=xe.domCache.get(this);e.validationError&&U(e.validationError);var t=this.getInput();t&&(t.removeAttribute("aria-invalid"),t.removeAttribute("aria-describedBy"),N(t,I.inputerror))},getProgressSteps:function(){return xe.innerParams.get(this).progressSteps},setProgressSteps:function(e){var t=i({},xe.innerParams.get(this),{progressSteps:e});xe.innerParams.set(this,t),re(t)},showProgressSteps:function(){var e=xe.domCache.get(this);z(e.progressSteps)},hideProgressSteps:function(){var e=xe.domCache.get(this);U(e.progressSteps)},_main:function(e){var L=this;he(e);var T=i({},le,e);!function(t){var e;t.inputValidator||Object.keys(Pe).forEach(function(e){t.input===e&&(t.inputValidator=t.expectRejections?Pe[e]:qe.adaptInputValidator(Pe[e]))}),(!t.target||"string"==typeof t.target&&!document.querySelector(t.target)||"string"!=typeof t.target&&!t.target.appendChild)&&(m('Target parameter is not valid, defaulting to "body"'),t.target="body");var n=x(),o="string"==typeof t.target?document.querySelector(t.target):t.target;e=n&&o&&n.parentNode!==o.parentNode?J(t):n||J(t),t.width&&(e.style.width="number"==typeof t.width?t.width+"px":t.width),t.padding&&(e.style.padding="number"==typeof t.padding?t.padding+"px":t.padding),t.background&&(e.style.background=t.background);for(var r=window.getComputedStyle(e).getPropertyValue("background-color"),i=e.querySelectorAll("[class^=swal2-success-circular-line], .swal2-success-fix"),a=0;a<i.length;a++)i[a].style.backgroundColor=r;var c=C(),s=Y(),u=Q();if(ie(t),te(t),"string"==typeof t.backdrop?C().style.background=t.backdrop:t.backdrop||D([document.documentElement,document.body],I["no-backdrop"]),!t.backdrop&&t.allowOutsideClick&&m('"allowOutsideClick" parameter requires `backdrop` parameter to be set to `true`'),t.position in I?D(c,I[t.position]):(m('The "position" parameter is not valid, defaulting to "center"'),D(c,I.center)),t.grow&&"string"==typeof t.grow){var l="grow-"+t.grow;l in I&&D(c,I[l])}"function"==typeof t.animation&&(t.animation=t.animation.call()),t.showCloseButton?(s.setAttribute("aria-label",t.closeButtonAriaLabel),z(s)):U(s),e.className=I.popup,t.toast?(D([document.documentElement,document.body],I["toast-shown"]),D(e,I.toast)):D(e,I.modal),t.customClass&&D(e,t.customClass),re(t),ne(t),oe(t),ee(t),X(t.footer,u),!0===t.animation?N(e,I.noanimation):D(e,I.noanimation),t.showLoaderOnConfirm&&!t.preConfirm&&m("showLoaderOnConfirm is set to true, but preConfirm is not defined.\nshowLoaderOnConfirm should be used together with preConfirm, see usage example:\nhttps://sweetalert2.github.io/#ajax-request")}(T),Object.freeze(T),xe.innerParams.set(this,T),ce.timeout&&(ce.timeout.stop(),delete ce.timeout),clearTimeout(ce.restoreFocusTimeout);var j={popup:x(),container:C(),content:P(),actions:Z(),confirmButton:O(),cancelButton:F(),closeButton:Y(),validationError:k(I.validationerror),progressSteps:E()};xe.domCache.set(this,j);var q=this.constructor;return new Promise(function(t,n){var o=function(e){q.closePopup(T.onClose,T.onAfterClose),T.useRejections?t(e):t({value:e})},s=function(e){q.closePopup(T.onClose,T.onAfterClose),T.useRejections?n(e):t({dismiss:e})},u=function(e){q.closePopup(T.onClose,T.onAfterClose),n(e)};T.timer&&(ce.timeout=new Be(function(){s("timer"),delete ce.timeout},T.timer)),T.input&&setTimeout(function(){var e=L.getInput();e&&_(e)},0);for(var l=function(t){if(T.showLoaderOnConfirm&&q.showLoading(),T.preConfirm){L.resetValidationError();var e=Promise.resolve().then(function(){return T.preConfirm(t,T.extraParams)});T.expectRejections?e.then(function(e){return o(e||t)},function(e){L.hideLoading(),e&&L.showValidationError(e)}):e.then(function(e){K(j.validationError)||!1===e?L.hideLoading():o(e||t)},function(e){return u(e)})}else o(t)},e=function(e){var t=e.target,n=j.confirmButton,o=j.cancelButton,r=n&&(n===t||n.contains(t)),i=o&&(o===t||o.contains(t));switch(e.type){case"click":if(r&&q.isVisible())if(L.disableButtons(),T.input){var a=function(){var e=L.getInput();if(!e)return null;switch(T.input){case"checkbox":return e.checked?1:0;case"radio":return e.checked?e.value:null;case"file":return e.files.length?e.files[0]:null;default:return T.inputAutoTrim?e.value.trim():e.value}}();if(T.inputValidator){L.disableInput();var c=Promise.resolve().then(function(){return T.inputValidator(a,T.extraParams)});T.expectRejections?c.then(function(){L.enableButtons(),L.enableInput(),l(a)},function(e){L.enableButtons(),L.enableInput(),e&&L.showValidationError(e)}):c.then(function(e){L.enableButtons(),L.enableInput(),e?L.showValidationError(e):l(a)},function(e){return u(e)})}else l(a)}else l(!0);else i&&q.isVisible()&&(L.disableButtons(),s(q.DismissReason.cancel))}},r=j.popup.querySelectorAll("button"),i=0;i<r.length;i++)r[i].onclick=e,r[i].onmouseover=e,r[i].onmouseout=e,r[i].onmousedown=e;if(j.closeButton.onclick=function(){s(q.DismissReason.close)},T.toast)j.popup.onclick=function(){T.showConfirmButton||T.showCancelButton||T.showCloseButton||T.input||s(q.DismissReason.close)};else{var a=!1;j.popup.onmousedown=function(){j.container.onmouseup=function(e){j.container.onmouseup=void 0,e.target===j.container&&(a=!0)}},j.container.onmousedown=function(){j.popup.onmouseup=function(e){j.popup.onmouseup=void 0,(e.target===j.popup||j.popup.contains(e.target))&&(a=!0)}},j.container.onclick=function(e){a?a=!1:e.target===j.container&&M(T.allowOutsideClick)&&s(q.DismissReason.backdrop)}}T.reverseButtons?j.confirmButton.parentNode.insertBefore(j.cancelButton,j.confirmButton):j.confirmButton.parentNode.insertBefore(j.confirmButton,j.cancelButton);var c=function(e,t){for(var n=$(T.focusCancel),o=0;o<n.length;o++)return(e+=t)===n.length?e=0:-1===e&&(e=n.length-1),n[e].focus();j.popup.focus()};ce.keydownHandlerAdded&&(ce.keydownTarget.removeEventListener("keydown",ce.keydownHandler,{capture:ce.keydownListenerCapture}),ce.keydownHandlerAdded=!1),T.toast||(ce.keydownHandler=function(e){return function(e,t){if(t.stopKeydownPropagation&&e.stopPropagation(),"Enter"!==e.key||e.isComposing)if("Tab"===e.key){for(var n=e.target,o=$(t.focusCancel),r=-1,i=0;i<o.length;i++)if(n===o[i]){r=i;break}e.shiftKey?c(r,-1):c(r,1),e.stopPropagation(),e.preventDefault()}else-1!==["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Left","Right","Up","Down"].indexOf(e.key)?document.activeElement===j.confirmButton&&K(j.cancelButton)?j.cancelButton.focus():document.activeElement===j.cancelButton&&K(j.confirmButton)&&j.confirmButton.focus():"Escape"!==e.key&&"Esc"!==e.key||!0!==M(t.allowEscapeKey)||s(q.DismissReason.esc);else if(e.target&&L.getInput()&&e.target.outerHTML===L.getInput().outerHTML){if(-1!==["textarea","file"].indexOf(t.input))return;q.clickConfirm(),e.preventDefault()}}(e,T)},ce.keydownTarget=T.keydownListenerCapture?window:j.popup,ce.keydownListenerCapture=T.keydownListenerCapture,ce.keydownTarget.addEventListener("keydown",ce.keydownHandler,{capture:ce.keydownListenerCapture}),ce.keydownHandlerAdded=!0),L.enableButtons(),L.hideLoading(),L.resetValidationError(),T.toast&&(T.input||T.footer||T.showCloseButton)?D(document.body,I["toast-column"]):N(document.body,I["toast-column"]);for(var d,p,f=["input","file","range","select","radio","checkbox","textarea"],m=0;m<f.length;m++){var h=I[f[m]],g=W(j.content,h);if(d=L.getInput(f[m])){for(var b in d.attributes)if(d.attributes.hasOwnProperty(b)){var y=d.attributes[b].name;"type"!==y&&"value"!==y&&d.removeAttribute(y)}for(var v in T.inputAttributes)d.setAttribute(v,T.inputAttributes[v])}g.className=h,T.inputClass&&D(g,T.inputClass),U(g)}switch(T.input){case"text":case"email":case"password":case"number":case"tel":case"url":(d=W(j.content,I.input)).value=T.inputValue,d.placeholder=T.inputPlaceholder,d.type=T.input,z(d);break;case"file":(d=W(j.content,I.file)).placeholder=T.inputPlaceholder,d.type=T.input,z(d);break;case"range":var w=W(j.content,I.range),C=w.querySelector("input"),k=w.querySelector("output");C.value=T.inputValue,C.type=T.input,k.value=T.inputValue,z(w);break;case"select":var x=W(j.content,I.select);if(x.innerHTML="",T.inputPlaceholder){var A=document.createElement("option");A.innerHTML=T.inputPlaceholder,A.value="",A.disabled=!0,A.selected=!0,x.appendChild(A)}p=function(e){e.forEach(function(e){var t=e[0],n=e[1],o=document.createElement("option");o.value=t,o.innerHTML=n,T.inputValue.toString()===t.toString()&&(o.selected=!0),x.appendChild(o)}),z(x),x.focus()};break;case"radio":var B=W(j.content,I.radio);B.innerHTML="",p=function(e){e.forEach(function(e){var t=e[0],n=e[1],o=document.createElement("input"),r=document.createElement("label");o.type="radio",o.name=I.radio,o.value=t,T.inputValue.toString()===t.toString()&&(o.checked=!0);var i=document.createElement("span");i.innerHTML=n,i.className=I.label,r.appendChild(o),r.appendChild(i),B.appendChild(r)}),z(B);var t=B.querySelectorAll("input");t.length&&t[0].focus()};break;case"checkbox":var P=W(j.content,I.checkbox),S=L.getInput("checkbox");S.type="checkbox",S.value=1,S.id=I.checkbox,S.checked=Boolean(T.inputValue),P.querySelector("span").innerHTML=T.inputPlaceholder,z(P);break;case"textarea":var E=W(j.content,I.textarea);E.value=T.inputValue,E.placeholder=T.inputPlaceholder,z(E);break;case null:break;default:R('Unexpected type of input! Expected "text", "email", "password", "number", "tel", "select", "radio", "checkbox", "textarea", "file" or "url", got "'.concat(T.input,'"'))}if("select"===T.input||"radio"===T.input){var O=function(e){return p((t=e,n=[],"undefined"!=typeof Map&&t instanceof Map?t.forEach(function(e,t){n.push([t,e])}):Object.keys(t).forEach(function(e){n.push([e,t[e]])}),n));var t,n};H(T.inputOptions)?(q.showLoading(),T.inputOptions.then(function(e){L.hideLoading(),O(e)})):"object"===V(T.inputOptions)?O(T.inputOptions):R("Unexpected type of inputOptions! Expected object, Map or Promise, got ".concat(V(T.inputOptions)))}else-1!==["text","email","number","tel","textarea"].indexOf(T.input)&&H(T.inputValue)&&(q.showLoading(),U(d),T.inputValue.then(function(e){d.value="number"===T.input?parseFloat(e)||0:e+"",z(d),d.focus(),L.hideLoading()}).catch(function(e){R("Error in inputValue promise: "+e),d.value="",z(d),d.focus(),L.hideLoading()}));Se(T),T.toast||(M(T.allowEnterKey)?T.focusCancel&&K(j.cancelButton)?j.cancelButton.focus():T.focusConfirm&&K(j.confirmButton)?j.confirmButton.focus():c(-1,1):document.activeElement&&document.activeElement.blur()),j.container.scrollTop=0})}});function Le(){if("undefined"!=typeof window){"undefined"==typeof Promise&&R("This package requires a Promise library, please include a shim to enable it in this browser (See: https://github.com/sweetalert2/sweetalert2/wiki/Migration-from-SweetAlert-to-SweetAlert2#1-ie-support)");for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];if(0===t.length)return R("At least 1 argument is expected!"),!1;Ee=this;var o=Object.freeze(this.constructor.argsToParams(t));Object.defineProperties(this,{params:{value:o,writable:!1,enumerable:!0}});var r=this._main(this.params);xe.promise.set(this,r)}}Le.prototype.then=function(e,t){return xe.promise.get(this).then(e,t)},Le.prototype.catch=function(e){return xe.promise.get(this).catch(e)},Le.prototype.finally=function(e){return xe.promise.get(this).finally(e)},i(Le.prototype,Oe),i(Le,we),Object.keys(Oe).forEach(function(t){Le[t]=function(){var e;if(Ee)return(e=Ee)[t].apply(e,arguments)}}),Le.DismissReason=e,Le.noop=function(){},Le.version="7.26.28";var Te,je,qe=ue((Te=Le,je=function(e){function t(){return c(this,t),d(this,s(t).apply(this,arguments))}return a(t,Te),r(t,[{key:"_main",value:function(e){return p(s(t.prototype),"_main",this).call(this,i({},be,e))}}],[{key:"setDefaults",value:function(t){if(h(ge),!t||"object"!==V(t))throw new TypeError("SweetAlert2: The argument for setDefaults() is required and has to be a object");he(t),Object.keys(t).forEach(function(e){Te.isValidParameter(e)&&(be[e]=t[e])})}},{key:"resetDefaults",value:function(){h(ge),be={}}}]),t}(),"undefined"!=typeof window&&"object"===V(window._swalDefaults)&&je.setDefaults(window._swalDefaults),je));return qe.default=qe}),"undefined"!=typeof window&&window.Sweetalert2&&(window.swal=window.sweetAlert=window.Swal=window.SweetAlert=window.Sweetalert2);
"undefined"!=typeof document&&function(e,t){var n=e.createElement("style");if(e.getElementsByTagName("head")[0].appendChild(n),n.styleSheet)n.styleSheet.disabled||(n.styleSheet.cssText=t);else try{n.innerHTML=t}catch(e){n.innerText=t}}(document,"@-webkit-keyframes swal2-show{0%{-webkit-transform:scale(.7);transform:scale(.7)}45%{-webkit-transform:scale(1.05);transform:scale(1.05)}80%{-webkit-transform:scale(.95);transform:scale(.95)}100%{-webkit-transform:scale(1);transform:scale(1)}}@keyframes swal2-show{0%{-webkit-transform:scale(.7);transform:scale(.7)}45%{-webkit-transform:scale(1.05);transform:scale(1.05)}80%{-webkit-transform:scale(.95);transform:scale(.95)}100%{-webkit-transform:scale(1);transform:scale(1)}}@-webkit-keyframes swal2-hide{0%{-webkit-transform:scale(1);transform:scale(1);opacity:1}100%{-webkit-transform:scale(.5);transform:scale(.5);opacity:0}}@keyframes swal2-hide{0%{-webkit-transform:scale(1);transform:scale(1);opacity:1}100%{-webkit-transform:scale(.5);transform:scale(.5);opacity:0}}@-webkit-keyframes swal2-animate-success-line-tip{0%{top:1.1875em;left:.0625em;width:0}54%{top:1.0625em;left:.125em;width:0}70%{top:2.1875em;left:-.375em;width:3.125em}84%{top:3em;left:1.3125em;width:1.0625em}100%{top:2.8125em;left:.875em;width:1.5625em}}@keyframes swal2-animate-success-line-tip{0%{top:1.1875em;left:.0625em;width:0}54%{top:1.0625em;left:.125em;width:0}70%{top:2.1875em;left:-.375em;width:3.125em}84%{top:3em;left:1.3125em;width:1.0625em}100%{top:2.8125em;left:.875em;width:1.5625em}}@-webkit-keyframes swal2-animate-success-line-long{0%{top:3.375em;right:2.875em;width:0}65%{top:3.375em;right:2.875em;width:0}84%{top:2.1875em;right:0;width:3.4375em}100%{top:2.375em;right:.5em;width:2.9375em}}@keyframes swal2-animate-success-line-long{0%{top:3.375em;right:2.875em;width:0}65%{top:3.375em;right:2.875em;width:0}84%{top:2.1875em;right:0;width:3.4375em}100%{top:2.375em;right:.5em;width:2.9375em}}@-webkit-keyframes swal2-rotate-success-circular-line{0%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}5%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}12%{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}100%{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}}@keyframes swal2-rotate-success-circular-line{0%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}5%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}12%{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}100%{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}}@-webkit-keyframes swal2-animate-error-x-mark{0%{margin-top:1.625em;-webkit-transform:scale(.4);transform:scale(.4);opacity:0}50%{margin-top:1.625em;-webkit-transform:scale(.4);transform:scale(.4);opacity:0}80%{margin-top:-.375em;-webkit-transform:scale(1.15);transform:scale(1.15)}100%{margin-top:0;-webkit-transform:scale(1);transform:scale(1);opacity:1}}@keyframes swal2-animate-error-x-mark{0%{margin-top:1.625em;-webkit-transform:scale(.4);transform:scale(.4);opacity:0}50%{margin-top:1.625em;-webkit-transform:scale(.4);transform:scale(.4);opacity:0}80%{margin-top:-.375em;-webkit-transform:scale(1.15);transform:scale(1.15)}100%{margin-top:0;-webkit-transform:scale(1);transform:scale(1);opacity:1}}@-webkit-keyframes swal2-animate-error-icon{0%{-webkit-transform:rotateX(100deg);transform:rotateX(100deg);opacity:0}100%{-webkit-transform:rotateX(0);transform:rotateX(0);opacity:1}}@keyframes swal2-animate-error-icon{0%{-webkit-transform:rotateX(100deg);transform:rotateX(100deg);opacity:0}100%{-webkit-transform:rotateX(0);transform:rotateX(0);opacity:1}}body.swal2-toast-shown .swal2-container{position:fixed;background-color:transparent}body.swal2-toast-shown .swal2-container.swal2-shown{background-color:transparent}body.swal2-toast-shown .swal2-container.swal2-top{top:0;right:auto;bottom:auto;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-top-end,body.swal2-toast-shown .swal2-container.swal2-top-right{top:0;right:0;bottom:auto;left:auto}body.swal2-toast-shown .swal2-container.swal2-top-left,body.swal2-toast-shown .swal2-container.swal2-top-start{top:0;right:auto;bottom:auto;left:0}body.swal2-toast-shown .swal2-container.swal2-center-left,body.swal2-toast-shown .swal2-container.swal2-center-start{top:50%;right:auto;bottom:auto;left:0;-webkit-transform:translateY(-50%);transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-center{top:50%;right:auto;bottom:auto;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}body.swal2-toast-shown .swal2-container.swal2-center-end,body.swal2-toast-shown .swal2-container.swal2-center-right{top:50%;right:0;bottom:auto;left:auto;-webkit-transform:translateY(-50%);transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-left,body.swal2-toast-shown .swal2-container.swal2-bottom-start{top:auto;right:auto;bottom:0;left:0}body.swal2-toast-shown .swal2-container.swal2-bottom{top:auto;right:auto;bottom:0;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-end,body.swal2-toast-shown .swal2-container.swal2-bottom-right{top:auto;right:0;bottom:0;left:auto}body.swal2-toast-column .swal2-toast{flex-direction:column;align-items:stretch}body.swal2-toast-column .swal2-toast .swal2-actions{flex:1;align-self:stretch;height:2.2em;margin-top:.3125em}body.swal2-toast-column .swal2-toast .swal2-loading{justify-content:center}body.swal2-toast-column .swal2-toast .swal2-input{height:2em;margin:.3125em auto;font-size:1em}body.swal2-toast-column .swal2-toast .swal2-validationerror{font-size:1em}.swal2-popup.swal2-toast{flex-direction:row;align-items:center;width:auto;padding:.625em;box-shadow:0 0 .625em #d9d9d9;overflow-y:hidden}.swal2-popup.swal2-toast .swal2-header{flex-direction:row}.swal2-popup.swal2-toast .swal2-title{flex-grow:1;justify-content:flex-start;margin:0 .6em;font-size:1em}.swal2-popup.swal2-toast .swal2-footer{margin:.5em 0 0;padding:.5em 0 0;font-size:.8em}.swal2-popup.swal2-toast .swal2-close{position:initial;width:.8em;height:.8em;line-height:.8}.swal2-popup.swal2-toast .swal2-content{justify-content:flex-start;font-size:1em}.swal2-popup.swal2-toast .swal2-icon{width:2em;min-width:2em;height:2em;margin:0}.swal2-popup.swal2-toast .swal2-icon-text{font-size:2em;font-weight:700;line-height:1em}.swal2-popup.swal2-toast .swal2-icon.swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line]{top:.875em;width:1.375em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:.3125em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:.3125em}.swal2-popup.swal2-toast .swal2-actions{height:auto;margin:0 .3125em}.swal2-popup.swal2-toast .swal2-styled{margin:0 .3125em;padding:.3125em .625em;font-size:1em}.swal2-popup.swal2-toast .swal2-styled:focus{box-shadow:0 0 0 .0625em #fff,0 0 0 .125em rgba(50,100,150,.4)}.swal2-popup.swal2-toast .swal2-success{border-color:#a5dc86}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line]{position:absolute;width:2em;height:2.8125em;-webkit-transform:rotate(45deg);transform:rotate(45deg);border-radius:50%}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=left]{top:-.25em;left:-.9375em;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-transform-origin:2em 2em;transform-origin:2em 2em;border-radius:4em 0 0 4em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=right]{top:-.25em;left:.9375em;-webkit-transform-origin:0 2em;transform-origin:0 2em;border-radius:0 4em 4em 0}.swal2-popup.swal2-toast .swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-success .swal2-success-fix{top:0;left:.4375em;width:.4375em;height:2.6875em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line]{height:.3125em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=tip]{top:1.125em;left:.1875em;width:.75em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=long]{top:.9375em;right:.1875em;width:1.375em}.swal2-popup.swal2-toast.swal2-show{-webkit-animation:showSweetToast .5s;animation:showSweetToast .5s}.swal2-popup.swal2-toast.swal2-hide{-webkit-animation:hideSweetToast .2s forwards;animation:hideSweetToast .2s forwards}.swal2-popup.swal2-toast .swal2-animate-success-icon .swal2-success-line-tip{-webkit-animation:animate-toast-success-tip .75s;animation:animate-toast-success-tip .75s}.swal2-popup.swal2-toast .swal2-animate-success-icon .swal2-success-line-long{-webkit-animation:animate-toast-success-long .75s;animation:animate-toast-success-long .75s}@-webkit-keyframes showSweetToast{0%{-webkit-transform:translateY(-.625em) rotateZ(2deg);transform:translateY(-.625em) rotateZ(2deg);opacity:0}33%{-webkit-transform:translateY(0) rotateZ(-2deg);transform:translateY(0) rotateZ(-2deg);opacity:.5}66%{-webkit-transform:translateY(.3125em) rotateZ(2deg);transform:translateY(.3125em) rotateZ(2deg);opacity:.7}100%{-webkit-transform:translateY(0) rotateZ(0);transform:translateY(0) rotateZ(0);opacity:1}}@keyframes showSweetToast{0%{-webkit-transform:translateY(-.625em) rotateZ(2deg);transform:translateY(-.625em) rotateZ(2deg);opacity:0}33%{-webkit-transform:translateY(0) rotateZ(-2deg);transform:translateY(0) rotateZ(-2deg);opacity:.5}66%{-webkit-transform:translateY(.3125em) rotateZ(2deg);transform:translateY(.3125em) rotateZ(2deg);opacity:.7}100%{-webkit-transform:translateY(0) rotateZ(0);transform:translateY(0) rotateZ(0);opacity:1}}@-webkit-keyframes hideSweetToast{0%{opacity:1}33%{opacity:.5}100%{-webkit-transform:rotateZ(1deg);transform:rotateZ(1deg);opacity:0}}@keyframes hideSweetToast{0%{opacity:1}33%{opacity:.5}100%{-webkit-transform:rotateZ(1deg);transform:rotateZ(1deg);opacity:0}}@-webkit-keyframes animate-toast-success-tip{0%{top:.5625em;left:.0625em;width:0}54%{top:.125em;left:.125em;width:0}70%{top:.625em;left:-.25em;width:1.625em}84%{top:1.0625em;left:.75em;width:.5em}100%{top:1.125em;left:.1875em;width:.75em}}@keyframes animate-toast-success-tip{0%{top:.5625em;left:.0625em;width:0}54%{top:.125em;left:.125em;width:0}70%{top:.625em;left:-.25em;width:1.625em}84%{top:1.0625em;left:.75em;width:.5em}100%{top:1.125em;left:.1875em;width:.75em}}@-webkit-keyframes animate-toast-success-long{0%{top:1.625em;right:1.375em;width:0}65%{top:1.25em;right:.9375em;width:0}84%{top:.9375em;right:0;width:1.125em}100%{top:.9375em;right:.1875em;width:1.375em}}@keyframes animate-toast-success-long{0%{top:1.625em;right:1.375em;width:0}65%{top:1.25em;right:.9375em;width:0}84%{top:.9375em;right:0;width:1.125em}100%{top:.9375em;right:.1875em;width:1.375em}}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown){overflow-y:hidden}body.swal2-height-auto{height:auto!important}body.swal2-no-backdrop .swal2-shown{top:auto;right:auto;bottom:auto;left:auto;background-color:transparent}body.swal2-no-backdrop .swal2-shown>.swal2-modal{box-shadow:0 0 10px rgba(0,0,0,.4)}body.swal2-no-backdrop .swal2-shown.swal2-top{top:0;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}body.swal2-no-backdrop .swal2-shown.swal2-top-left,body.swal2-no-backdrop .swal2-shown.swal2-top-start{top:0;left:0}body.swal2-no-backdrop .swal2-shown.swal2-top-end,body.swal2-no-backdrop .swal2-shown.swal2-top-right{top:0;right:0}body.swal2-no-backdrop .swal2-shown.swal2-center{top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}body.swal2-no-backdrop .swal2-shown.swal2-center-left,body.swal2-no-backdrop .swal2-shown.swal2-center-start{top:50%;left:0;-webkit-transform:translateY(-50%);transform:translateY(-50%)}body.swal2-no-backdrop .swal2-shown.swal2-center-end,body.swal2-no-backdrop .swal2-shown.swal2-center-right{top:50%;right:0;-webkit-transform:translateY(-50%);transform:translateY(-50%)}body.swal2-no-backdrop .swal2-shown.swal2-bottom{bottom:0;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}body.swal2-no-backdrop .swal2-shown.swal2-bottom-left,body.swal2-no-backdrop .swal2-shown.swal2-bottom-start{bottom:0;left:0}body.swal2-no-backdrop .swal2-shown.swal2-bottom-end,body.swal2-no-backdrop .swal2-shown.swal2-bottom-right{right:0;bottom:0}.swal2-container{display:flex;position:fixed;top:0;right:0;bottom:0;left:0;flex-direction:row;align-items:center;justify-content:center;padding:10px;background-color:transparent;z-index:1060;overflow-x:hidden;-webkit-overflow-scrolling:touch}.swal2-container.swal2-top{align-items:flex-start}.swal2-container.swal2-top-left,.swal2-container.swal2-top-start{align-items:flex-start;justify-content:flex-start}.swal2-container.swal2-top-end,.swal2-container.swal2-top-right{align-items:flex-start;justify-content:flex-end}.swal2-container.swal2-center{align-items:center}.swal2-container.swal2-center-left,.swal2-container.swal2-center-start{align-items:center;justify-content:flex-start}.swal2-container.swal2-center-end,.swal2-container.swal2-center-right{align-items:center;justify-content:flex-end}.swal2-container.swal2-bottom{align-items:flex-end}.swal2-container.swal2-bottom-left,.swal2-container.swal2-bottom-start{align-items:flex-end;justify-content:flex-start}.swal2-container.swal2-bottom-end,.swal2-container.swal2-bottom-right{align-items:flex-end;justify-content:flex-end}.swal2-container.swal2-grow-fullscreen>.swal2-modal{display:flex!important;flex:1;align-self:stretch;justify-content:center}.swal2-container.swal2-grow-row>.swal2-modal{display:flex!important;flex:1;align-content:center;justify-content:center}.swal2-container.swal2-grow-column{flex:1;flex-direction:column}.swal2-container.swal2-grow-column.swal2-bottom,.swal2-container.swal2-grow-column.swal2-center,.swal2-container.swal2-grow-column.swal2-top{align-items:center}.swal2-container.swal2-grow-column.swal2-bottom-left,.swal2-container.swal2-grow-column.swal2-bottom-start,.swal2-container.swal2-grow-column.swal2-center-left,.swal2-container.swal2-grow-column.swal2-center-start,.swal2-container.swal2-grow-column.swal2-top-left,.swal2-container.swal2-grow-column.swal2-top-start{align-items:flex-start}.swal2-container.swal2-grow-column.swal2-bottom-end,.swal2-container.swal2-grow-column.swal2-bottom-right,.swal2-container.swal2-grow-column.swal2-center-end,.swal2-container.swal2-grow-column.swal2-center-right,.swal2-container.swal2-grow-column.swal2-top-end,.swal2-container.swal2-grow-column.swal2-top-right{align-items:flex-end}.swal2-container.swal2-grow-column>.swal2-modal{display:flex!important;flex:1;align-content:center;justify-content:center}.swal2-container:not(.swal2-top):not(.swal2-top-start):not(.swal2-top-end):not(.swal2-top-left):not(.swal2-top-right):not(.swal2-center-start):not(.swal2-center-end):not(.swal2-center-left):not(.swal2-center-right):not(.swal2-bottom):not(.swal2-bottom-start):not(.swal2-bottom-end):not(.swal2-bottom-left):not(.swal2-bottom-right):not(.swal2-grow-fullscreen)>.swal2-modal{margin:auto}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.swal2-container .swal2-modal{margin:0!important}}.swal2-container.swal2-fade{transition:background-color .1s}.swal2-container.swal2-shown{background-color:rgba(0,0,0,.4)}.swal2-popup{display:none;position:relative;flex-direction:column;justify-content:center;width:32em;max-width:100%;padding:1.25em;border-radius:.3125em;background:#fff;font-family:inherit;font-size:1rem;box-sizing:border-box}.swal2-popup:focus{outline:0}.swal2-popup.swal2-loading{overflow-y:hidden}.swal2-popup .swal2-header{display:flex;flex-direction:column;align-items:center}.swal2-popup .swal2-title{display:block;position:relative;max-width:100%;margin:0 0 .4em;padding:0;color:#595959;font-size:1.875em;font-weight:600;text-align:center;text-transform:none;word-wrap:break-word}.swal2-popup .swal2-actions{flex-wrap:wrap;align-items:center;justify-content:center;margin:1.25em auto 0;z-index:1}.swal2-popup .swal2-actions:not(.swal2-loading) .swal2-styled[disabled]{opacity:.4}.swal2-popup .swal2-actions:not(.swal2-loading) .swal2-styled:hover{background-image:linear-gradient(rgba(0,0,0,.1),rgba(0,0,0,.1))}.swal2-popup .swal2-actions:not(.swal2-loading) .swal2-styled:active{background-image:linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.2))}.swal2-popup .swal2-actions.swal2-loading .swal2-styled.swal2-confirm{width:2.5em;height:2.5em;margin:.46875em;padding:0;border:.25em solid transparent;border-radius:100%;border-color:transparent;background-color:transparent!important;color:transparent;cursor:default;box-sizing:border-box;-webkit-animation:swal2-rotate-loading 1.5s linear 0s infinite normal;animation:swal2-rotate-loading 1.5s linear 0s infinite normal;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.swal2-popup .swal2-actions.swal2-loading .swal2-styled.swal2-cancel{margin-right:30px;margin-left:30px}.swal2-popup .swal2-actions.swal2-loading :not(.swal2-styled).swal2-confirm::after{display:inline-block;width:15px;height:15px;margin-left:5px;border:3px solid #999;border-radius:50%;border-right-color:transparent;box-shadow:1px 1px 1px #fff;content:'';-webkit-animation:swal2-rotate-loading 1.5s linear 0s infinite normal;animation:swal2-rotate-loading 1.5s linear 0s infinite normal}.swal2-popup .swal2-styled{margin:.3125em;padding:.625em 2em;font-weight:500;box-shadow:none}.swal2-popup .swal2-styled:not([disabled]){cursor:pointer}.swal2-popup .swal2-styled.swal2-confirm{border:0;border-radius:.25em;background:initial;background-color:#3085d6;color:#fff;font-size:1.0625em}.swal2-popup .swal2-styled.swal2-cancel{border:0;border-radius:.25em;background:initial;background-color:#aaa;color:#fff;font-size:1.0625em}.swal2-popup .swal2-styled:focus{outline:0;box-shadow:0 0 0 2px #fff,0 0 0 4px rgba(50,100,150,.4)}.swal2-popup .swal2-styled::-moz-focus-inner{border:0}.swal2-popup .swal2-footer{justify-content:center;margin:1.25em 0 0;padding:1em 0 0;border-top:1px solid #eee;color:#545454;font-size:1em}.swal2-popup .swal2-image{max-width:100%;margin:1.25em auto}.swal2-popup .swal2-close{position:absolute;top:0;right:0;justify-content:center;width:1.2em;height:1.2em;padding:0;transition:color .1s ease-out;border:none;border-radius:0;background:0 0;color:#ccc;font-family:serif;font-size:2.5em;line-height:1.2;cursor:pointer;overflow:hidden}.swal2-popup .swal2-close:hover{-webkit-transform:none;transform:none;color:#f27474}.swal2-popup>.swal2-checkbox,.swal2-popup>.swal2-file,.swal2-popup>.swal2-input,.swal2-popup>.swal2-radio,.swal2-popup>.swal2-select,.swal2-popup>.swal2-textarea{display:none}.swal2-popup .swal2-content{justify-content:center;margin:0;padding:0;color:#545454;font-size:1.125em;font-weight:300;line-height:normal;z-index:1;word-wrap:break-word}.swal2-popup #swal2-content{text-align:center}.swal2-popup .swal2-checkbox,.swal2-popup .swal2-file,.swal2-popup .swal2-input,.swal2-popup .swal2-radio,.swal2-popup .swal2-select,.swal2-popup .swal2-textarea{margin:1em auto}.swal2-popup .swal2-file,.swal2-popup .swal2-input,.swal2-popup .swal2-textarea{width:100%;transition:border-color .3s,box-shadow .3s;border:1px solid #d9d9d9;border-radius:.1875em;font-size:1.125em;box-shadow:inset 0 1px 1px rgba(0,0,0,.06);box-sizing:border-box}.swal2-popup .swal2-file.swal2-inputerror,.swal2-popup .swal2-input.swal2-inputerror,.swal2-popup .swal2-textarea.swal2-inputerror{border-color:#f27474!important;box-shadow:0 0 2px #f27474!important}.swal2-popup .swal2-file:focus,.swal2-popup .swal2-input:focus,.swal2-popup .swal2-textarea:focus{border:1px solid #b4dbed;outline:0;box-shadow:0 0 3px #c4e6f5}.swal2-popup .swal2-file::-webkit-input-placeholder,.swal2-popup .swal2-input::-webkit-input-placeholder,.swal2-popup .swal2-textarea::-webkit-input-placeholder{color:#ccc}.swal2-popup .swal2-file:-ms-input-placeholder,.swal2-popup .swal2-input:-ms-input-placeholder,.swal2-popup .swal2-textarea:-ms-input-placeholder{color:#ccc}.swal2-popup .swal2-file::-ms-input-placeholder,.swal2-popup .swal2-input::-ms-input-placeholder,.swal2-popup .swal2-textarea::-ms-input-placeholder{color:#ccc}.swal2-popup .swal2-file::placeholder,.swal2-popup .swal2-input::placeholder,.swal2-popup .swal2-textarea::placeholder{color:#ccc}.swal2-popup .swal2-range input{width:80%}.swal2-popup .swal2-range output{width:20%;font-weight:600;text-align:center}.swal2-popup .swal2-range input,.swal2-popup .swal2-range output{height:2.625em;margin:1em auto;padding:0;font-size:1.125em;line-height:2.625em}.swal2-popup .swal2-input{height:2.625em;padding:0 .75em}.swal2-popup .swal2-input[type=number]{max-width:10em}.swal2-popup .swal2-file{font-size:1.125em}.swal2-popup .swal2-textarea{height:6.75em;padding:.75em}.swal2-popup .swal2-select{min-width:50%;max-width:100%;padding:.375em .625em;color:#545454;font-size:1.125em}.swal2-popup .swal2-checkbox,.swal2-popup .swal2-radio{align-items:center;justify-content:center}.swal2-popup .swal2-checkbox label,.swal2-popup .swal2-radio label{margin:0 .6em;font-size:1.125em}.swal2-popup .swal2-checkbox input,.swal2-popup .swal2-radio input{margin:0 .4em}.swal2-popup .swal2-validationerror{display:none;align-items:center;justify-content:center;padding:.625em;background:#f0f0f0;color:#666;font-size:1em;font-weight:300;overflow:hidden}.swal2-popup .swal2-validationerror::before{display:inline-block;width:1.5em;min-width:1.5em;height:1.5em;margin:0 .625em;border-radius:50%;background-color:#f27474;color:#fff;font-weight:600;line-height:1.5em;text-align:center;content:'!';zoom:normal}@supports (-ms-accelerator:true){.swal2-range input{width:100%!important}.swal2-range output{display:none}}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.swal2-range input{width:100%!important}.swal2-range output{display:none}}@-moz-document url-prefix(){.swal2-close:focus{outline:2px solid rgba(50,100,150,.4)}}.swal2-icon{position:relative;justify-content:center;width:5em;height:5em;margin:1.25em auto 1.875em;border:.25em solid transparent;border-radius:50%;line-height:5em;cursor:default;box-sizing:content-box;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;zoom:normal}.swal2-icon-text{font-size:3.75em}.swal2-icon.swal2-error{border-color:#f27474}.swal2-icon.swal2-error .swal2-x-mark{position:relative;flex-grow:1}.swal2-icon.swal2-error [class^=swal2-x-mark-line]{display:block;position:absolute;top:2.3125em;width:2.9375em;height:.3125em;border-radius:.125em;background-color:#f27474}.swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:1.0625em;-webkit-transform:rotate(45deg);transform:rotate(45deg)}.swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:1em;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.swal2-icon.swal2-warning{border-color:#facea8;color:#f8bb86}.swal2-icon.swal2-info{border-color:#9de0f6;color:#3fc3ee}.swal2-icon.swal2-question{border-color:#c9dae1;color:#87adbd}.swal2-icon.swal2-success{border-color:#a5dc86}.swal2-icon.swal2-success [class^=swal2-success-circular-line]{position:absolute;width:3.75em;height:7.5em;-webkit-transform:rotate(45deg);transform:rotate(45deg);border-radius:50%}.swal2-icon.swal2-success [class^=swal2-success-circular-line][class$=left]{top:-.4375em;left:-2.0635em;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-transform-origin:3.75em 3.75em;transform-origin:3.75em 3.75em;border-radius:7.5em 0 0 7.5em}.swal2-icon.swal2-success [class^=swal2-success-circular-line][class$=right]{top:-.6875em;left:1.875em;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-transform-origin:0 3.75em;transform-origin:0 3.75em;border-radius:0 7.5em 7.5em 0}.swal2-icon.swal2-success .swal2-success-ring{position:absolute;top:-.25em;left:-.25em;width:100%;height:100%;border:.25em solid rgba(165,220,134,.3);border-radius:50%;z-index:2;box-sizing:content-box}.swal2-icon.swal2-success .swal2-success-fix{position:absolute;top:.5em;left:1.625em;width:.4375em;height:5.625em;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);z-index:1}.swal2-icon.swal2-success [class^=swal2-success-line]{display:block;position:absolute;height:.3125em;border-radius:.125em;background-color:#a5dc86;z-index:2}.swal2-icon.swal2-success [class^=swal2-success-line][class$=tip]{top:2.875em;left:.875em;width:1.5625em;-webkit-transform:rotate(45deg);transform:rotate(45deg)}.swal2-icon.swal2-success [class^=swal2-success-line][class$=long]{top:2.375em;right:.5em;width:2.9375em;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.swal2-progresssteps{align-items:center;margin:0 0 1.25em;padding:0;font-weight:600}.swal2-progresssteps li{display:inline-block;position:relative}.swal2-progresssteps .swal2-progresscircle{width:2em;height:2em;border-radius:2em;background:#3085d6;color:#fff;line-height:2em;text-align:center;z-index:20}.swal2-progresssteps .swal2-progresscircle:first-child{margin-left:0}.swal2-progresssteps .swal2-progresscircle:last-child{margin-right:0}.swal2-progresssteps .swal2-progresscircle.swal2-activeprogressstep{background:#3085d6}.swal2-progresssteps .swal2-progresscircle.swal2-activeprogressstep~.swal2-progresscircle{background:#add8e6}.swal2-progresssteps .swal2-progresscircle.swal2-activeprogressstep~.swal2-progressline{background:#add8e6}.swal2-progresssteps .swal2-progressline{width:2.5em;height:.4em;margin:0 -1px;background:#3085d6;z-index:10}[class^=swal2]{-webkit-tap-highlight-color:transparent}.swal2-show{-webkit-animation:swal2-show .3s;animation:swal2-show .3s}.swal2-show.swal2-noanimation{-webkit-animation:none;animation:none}.swal2-hide{-webkit-animation:swal2-hide .15s forwards;animation:swal2-hide .15s forwards}.swal2-hide.swal2-noanimation{-webkit-animation:none;animation:none}[dir=rtl] .swal2-close{right:auto;left:0}.swal2-animate-success-icon .swal2-success-line-tip{-webkit-animation:swal2-animate-success-line-tip .75s;animation:swal2-animate-success-line-tip .75s}.swal2-animate-success-icon .swal2-success-line-long{-webkit-animation:swal2-animate-success-line-long .75s;animation:swal2-animate-success-line-long .75s}.swal2-animate-success-icon .swal2-success-circular-line-right{-webkit-animation:swal2-rotate-success-circular-line 4.25s ease-in;animation:swal2-rotate-success-circular-line 4.25s ease-in}.swal2-animate-error-icon{-webkit-animation:swal2-animate-error-icon .5s;animation:swal2-animate-error-icon .5s}.swal2-animate-error-icon .swal2-x-mark{-webkit-animation:swal2-animate-error-x-mark .5s;animation:swal2-animate-error-x-mark .5s}@-webkit-keyframes swal2-rotate-loading{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes swal2-rotate-loading{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}");﻿// Page.js
// https://github.com/visionmedia/page.js/
!function ( t, e ) { "object" === typeof exports && "undefined" !== typeof module ? module.exports = e() : "function" === typeof define && define.amd ? define( e ) : t.page = e() }( this, function () { "use strict"; var p = Array.isArray || function ( t ) { return "[object Array]" == Object.prototype.toString.call( t ) }, n = h, t = a, e = function ( t ) { return o( a( t ) ) }, r = o, i = c, x = new RegExp( ["(\\\\.)", "([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^()])+)\\))?|\\(((?:\\\\.|[^()])+)\\))([+*?])?|(\\*))"].join( "|" ), "g" ); function a( t ) { for ( var e, n, r = [], i = 0, o = 0, a = ""; null != ( e = x.exec( t ) ); ) { var s = e[0], c = e[1], h = e.index; if ( a += t.slice( o, h ), o = h + s.length, c ) a += c[1]; else { a && ( r.push( a ), a = "" ); var p = e[2], f = e[3], u = e[4], l = e[5], d = e[6], m = e[7], v = "+" === d || "*" === d, g = "?" === d || "*" === d, y = p || "/", w = u || l || ( m ? ".*" : "[^" + y + "]+?" ); r.push( { name: f || i++, prefix: p || "", delimiter: y, optional: g, repeat: v, pattern: ( n = w, n.replace( /([=!:$\/()])/g, "\\$1" ) ) } ) } } return o < t.length && ( a += t.substr( o ) ), a && r.push( a ), r } function o( c ) { for ( var h = new Array( c.length ), t = 0; t < c.length; t++ )"object" == typeof c[t] && ( h[t] = new RegExp( "^" + c[t].pattern + "$" ) ); return function ( t ) { for ( var e = "", n = t || {}, r = 0; r < c.length; r++ ) { var i = c[r]; if ( "string" != typeof i ) { var o, a = n[i.name]; if ( null == a ) { if ( i.optional ) continue; throw new TypeError( 'Expected "' + i.name + '" to be defined' ) } if ( p( a ) ) { if ( !i.repeat ) throw new TypeError( 'Expected "' + i.name + '" to not repeat, but received "' + a + '"' ); if ( 0 === a.length ) { if ( i.optional ) continue; throw new TypeError( 'Expected "' + i.name + '" to not be empty' ) } for ( var s = 0; s < a.length; s++ ) { if ( o = encodeURIComponent( a[s] ), !h[r].test( o ) ) throw new TypeError( 'Expected all "' + i.name + '" to match "' + i.pattern + '", but received "' + o + '"' ); e += ( 0 === s ? i.prefix : i.delimiter ) + o } } else { if ( o = encodeURIComponent( a ), !h[r].test( o ) ) throw new TypeError( 'Expected "' + i.name + '" to match "' + i.pattern + '", but received "' + o + '"' ); e += i.prefix + o } } else e += i } return e } } function f( t ) { return t.replace( /([.+*?=^!:${}()[\]|\/])/g, "\\$1" ) } function s( t, e ) { return t.keys = e, t } function u( t ) { return t.sensitive ? "" : "i" } function c( t, e ) { for ( var n = ( e = e || {} ).strict, r = !1 !== e.end, i = "", o = t[t.length - 1], a = "string" == typeof o && /\/$/.test( o ), s = 0; s < t.length; s++ ) { var c = t[s]; if ( "string" == typeof c ) i += f( c ); else { var h = f( c.prefix ), p = c.pattern; c.repeat && ( p += "(?:" + h + p + ")*" ), i += p = c.optional ? h ? "(?:" + h + "(" + p + "))?" : "(" + p + ")?" : h + "(" + p + ")" } } return n || ( i = ( a ? i.slice( 0, -2 ) : i ) + "(?:\\/(?=$))?" ), i += r ? "$" : n && a ? "" : "(?=\\/|$)", new RegExp( "^" + i, u( e ) ) } function h( t, e, n ) { return p( e = e || [] ) ? n || ( n = {} ) : ( n = e, e = [] ), t instanceof RegExp ? function ( t, e ) { var n = t.source.match( /\((?!\?)/g ); if ( n ) for ( var r = 0; r < n.length; r++ )e.push( { name: r, prefix: null, delimiter: null, optional: !1, repeat: !1, pattern: null } ); return s( t, e ) }( t, e ) : p( t ) ? function ( t, e, n ) { for ( var r = [], i = 0; i < t.length; i++ )r.push( h( t[i], e, n ).source ); return s( new RegExp( "(?:" + r.join( "|" ) + ")", u( n ) ), e ) }( t, e, n ) : function ( t, e, n ) { for ( var r = a( t ), i = c( r, n ), o = 0; o < r.length; o++ )"string" != typeof r[o] && e.push( r[o] ); return s( i, e ) }( t, e, n ) } n.parse = t, n.compile = e, n.tokensToFunction = r, n.tokensToRegExp = i; var l = L; ( L.default = L ).Context = P, L.Route = S, L.sameOrigin = N; var d, m, v, g = "undefined" != typeof document, y = "undefined" != typeof window, w = "undefined" != typeof history, b = "undefined" != typeof process, E = g && document.ontouchstart ? "touchstart" : "click", R = y && !( !window.history.location && !window.location ), k = !0, A = !0, T = "", O = !1, C = !1; function L( t, e ) { if ( "function" == typeof t ) return L( "*", t ); if ( "function" == typeof e ) for ( var n = new S( t ), r = 1; r < arguments.length; ++r )L.callbacks.push( n.middleware( arguments[r] ) ); else "string" == typeof t ? L["string" == typeof e ? "redirect" : "show"]( t, e ) : L.start( t ) } function U( t ) { return "string" != typeof t ? t : A ? decodeURIComponent( t.replace( /\+/g, " " ) ) : t } function P( t, e ) { var n = I(); "/" === t[0] && 0 !== t.indexOf( n ) && ( t = n + ( C ? "#!" : "" ) + t ); var r = t.indexOf( "?" ); if ( this.canonicalPath = t, this.path = t.replace( n, "" ) || "/", C && ( this.path = this.path.replace( "#!", "" ) || "/" ), this.title = g && v.document.title, this.state = e || {}, this.state.path = t, this.querystring = ~r ? U( t.slice( r + 1 ) ) : "", this.pathname = U( ~r ? t.slice( 0, r ) : t ), this.params = {}, this.hash = "", !C ) { if ( !~this.path.indexOf( "#" ) ) return; var i = this.path.split( "#" ); this.path = this.pathname = i[0], this.hash = U( i[1] ) || "", this.querystring = this.querystring.split( "#" )[0] } } function S( t, e ) { ( e = e || {} ).strict = e.strict || O, this.path = "*" === t ? "(.*)" : t, this.method = "GET", this.regexp = n( this.path, this.keys = [], e ) } L.callbacks = [], L.exits = [], L.current = "", L.len = 0, L.base = function ( t ) { if ( 0 === arguments.length ) return T; T = t }, L.strict = function ( t ) { if ( 0 === arguments.length ) return O; O = t }, L.start = function ( t ) { if ( t = t || {}, !d && ( d = !0, v = t.window || y && window, !1 === t.dispatch && ( k = !1 ), !1 === t.decodeURLComponents && ( A = !1 ), !1 !== t.popstate && y && v.addEventListener( "popstate", $, !1 ), !1 !== t.click && g && v.document.addEventListener( E, j, !1 ), ( C = !!t.hashbang ) && y && !w && v.addEventListener( "hashchange", $, !1 ), k ) ) { var e; if ( R ) { var n = v.location; e = C && ~n.hash.indexOf( "#!" ) ? n.hash.substr( 2 ) + n.search : C ? n.search + n.hash : n.pathname + n.search + n.hash } L.replace( e, null, !0, k ) } }, L.stop = function () { d && ( L.current = "", L.len = 0, d = !1, g && v.document.removeEventListener( E, j, !1 ), y && v.removeEventListener( "popstate", $, !1 ), y && v.removeEventListener( "hashchange", $, !1 ) ) }, L.show = function ( t, e, n, r ) { var i = new P( t, e ), o = m; return L.current = ( m = i ).path, !1 !== n && L.dispatch( i, o ), !1 !== i.handled && !1 !== r && i.pushState(), i }, L.back = function ( t, e ) { 0 < L.len ? ( w && v.history.back(), L.len-- ) : t ? setTimeout( function () { L.show( t, e ) } ) : setTimeout( function () { L.show( I(), e ) } ) }, L.redirect = function ( t, e ) { "string" == typeof t && "string" == typeof e && L( t, function ( t ) { setTimeout( function () { L.replace( e ) }, 0 ) } ), "string" == typeof t && void 0 === e && setTimeout( function () { L.replace( t ) }, 0 ) }, L.replace = function ( t, e, n, r ) { var i = new P( t, e ), o = m; return L.current = ( m = i ).path, i.init = n, i.save(), !1 !== r && L.dispatch( i, o ), i }, L.dispatch = function ( e, n ) { var r = 0, i = 0; function o() { var t = L.callbacks[r++]; if ( e.path === L.current ) return t ? void t( e, o ) : function ( t ) { if ( t.handled ) return; var e; e = C ? R && I() + v.location.hash.replace( "#!", "" ) : R && v.location.pathname + v.location.search; if ( e === t.canonicalPath ) return; L.stop(), t.handled = !1, R && ( v.location.href = t.canonicalPath ) }( e ); e.handled = !1 } n ? function t() { var e = L.exits[i++]; if ( !e ) return o(); e( n, t ) }() : o() }, L.exit = function ( t, e ) { if ( "function" == typeof t ) return L.exit( "*", t ); for ( var n = new S( t ), r = 1; r < arguments.length; ++r )L.exits.push( n.middleware( arguments[r] ) ) }, ( L.Context = P ).prototype.pushState = function () { L.len++ , w && v.history.pushState( this.state, this.title, C && "/" !== this.path ? "#!" + this.path : this.canonicalPath ) }, P.prototype.save = function () { w && "file:" !== v.location.protocol && v.history.replaceState( this.state, this.title, C && "/" !== this.path ? "#!" + this.path : this.canonicalPath ) }, ( L.Route = S ).prototype.middleware = function ( n ) { var r = this; return function ( t, e ) { if ( r.match( t.path, t.params ) ) return n( t, e ); e() } }, S.prototype.match = function ( t, e ) { var n = this.keys, r = t.indexOf( "?" ), i = ~r ? t.slice( 0, r ) : t, o = this.regexp.exec( decodeURIComponent( i ) ); if ( !o ) return !1; for ( var a = 1, s = o.length; a < s; ++a ) { var c = n[a - 1], h = U( o[a] ); void 0 === h && hasOwnProperty.call( e, c.name ) || ( e[c.name] = h ) } return !0 }; var $ = function () { var r = !1; if ( y ) return g && "complete" === document.readyState ? r = !0 : window.addEventListener( "load", function () { setTimeout( function () { r = !0 }, 0 ) } ), function ( t ) { if ( r ) if ( t.state ) { var e = t.state.path; L.replace( e, t.state ) } else if ( R ) { var n = v.location; L.show( n.pathname + n.hash, void 0, void 0, !1 ) } } }(); function j( t ) { var e; if ( 1 === ( null == ( e = ( e = t ) || y && window.event ).which ? e.button : e.which ) && !( t.metaKey || t.ctrlKey || t.shiftKey || t.defaultPrevented ) ) { var n = t.target, r = t.path || ( t.composedPath ? t.composedPath() : null ); if ( r ) for ( var i = 0; i < r.length; i++ )if ( r[i].nodeName && "A" === r[i].nodeName.toUpperCase() && r[i].href ) { n = r[i]; break } for ( ; n && "A" !== n.nodeName.toUpperCase(); )n = n.parentNode; if ( n && "A" === n.nodeName.toUpperCase() ) { var o = "object" == typeof n.href && "SVGAnimatedString" === n.href.constructor.name; if ( !n.hasAttribute( "download" ) && "external" !== n.getAttribute( "rel" ) ) { var a = n.getAttribute( "href" ); if ( ( C || !function ( t ) { if ( !R ) return !1; var e = v.location; return t.pathname === e.pathname && t.search === e.search }( n ) || !n.hash && "#" !== a ) && !( a && -1 < a.indexOf( "mailto:" ) ) && ( o ? !n.target.baseVal : !n.target ) && ( o || N( n.href ) ) ) { var s = o ? n.href.baseVal : n.pathname + n.search + ( n.hash || "" ); s = "/" !== s[0] ? "/" + s : s, b && s.match( /^\/[a-zA-Z]:\// ) && ( s = s.replace( /^\/[a-zA-Z]:\//, "/" ) ); var c = s, h = I(); 0 === s.indexOf( h ) && ( s = s.substr( T.length ) ), C && ( s = s.replace( "#!", "" ) ), h && c === s || ( t.preventDefault(), L.show( c ) ) } } } } } function N( t ) { if ( !t || !R ) return !1; var e = function ( t ) { if ( "function" == typeof URL && R ) return new URL( t, location.toString() ); if ( g ) { var e = document.createElement( "a" ); return e.href = t, e } }( t ), n = v.location; return n.protocol === e.protocol && n.hostname === e.hostname && n.port === e.port } function I() { if ( T ) return T; var t = y && v && v.location; return y && C && t && "file:" === t.protocol ? t.pathname : T } return L.sameOrigin = N, l } );
﻿// #region COLLECTIONS

/*

https://github.com/joao-neves95/Exercises_Challenges_Courses/blob/master/JavaScript/Collections.js

Class Dictionary(): let dictionary = new Dictionary(uniqueKeys = false)

Type safe Class List(): let list = new List('string' | 'number' | 'int' | 'float' | 'boolean')

*/

class Errors {
  static get existingKey() { throw new Error('An item with the same key has already been added.'); };

  static get noTypeProvided() { throw new Error('No type provided on Collection instantiation.') };

  static wrongType(type) { throw new Error(`The value is not from the same type as the List<${type}>`); };
}

class Collection {
  constructor(uniqueKeys, type) {
    this.elements = [];
    this.uniqueKeys = (uniqueKeys || false);

    if (!type) throw Errors.noTypeProvided;
    this.type = type;
  }


  get length() {
    return this.elements.length;
  };

  /**
   * Get all elements from the Collection.
   * Returns elements[]
   */
  getAll() {
    return this.elements;
  }

  /**
   * Remove all elements from the Collection.
   */
  clear() {
    this.elements = [];
  };

  /**
   * (private)
   * No type safety. For private class use.
   * @param {Type} value
   */
  push(value) {
    this.elements.push(value);
  }

  /**
    * (private)
    * No checks. For private class use.
    * @param {Number} index
    */
  splice(index) {
    this.elements.splice(index, 1);
  }
}

class Dictionary extends Collection {
  /**
   * Dictionary of key-value pairs.
   * @param {Boolean} uniqueKeys Whether the keys should be unique or not.
   * Optional. It defaults to false
   * @default {false}
   */
  constructor(uniqueKeys) {
    super(uniqueKeys, 'any');
  };

  getAllValues() {
    let allValues = [];

    for (let i = 0; i < this.elements.length; ++i) {
      allValues.push(Object.values(this.elements[i])[0]);
    }

    return allValues;
  }

  add(key, value) {
    if (this.uniqueKeys && this.findIndexOfKey(key) !== false)
      throw new Error(Errors.existingKey);

    this.push({ [key]: value });
  };

  remove(key) {
    const index = this.findIndexOfKey(key);
    if (!index)
      return false;

    this.splice(index);
  };

  /**
   * Get a value with its index. Returns an array with the values.
   * @param {number} index
   * @return {any[]}
   */
  getByIndex(index) {
    return Object.values(this.elements[index])[0];
  };

  /**
   * Get a key with its index.
   * @param {number} index
   * @return {any}
   */
  getKeyByIndex(index) {
    return Object.keys(this.elements[index])[0];
  }

  getByKey(key) {
    try {
      return this.elements[this.findIndexOfKey(key)][key];
    } catch (e) {
      console.error(e);
    }
  };

  findIndexOfKey(key, Callback) {
    for (let i = 0; i < this.elements.length; i++) {
      if (Object.keys(this.elements[i])[0] === key) {
        return i;
      }
    }
    return false;
  }
}

// Type safe list.
class List extends Collection {
  /**
   * 
   * The Type of the list.
   * ('string' | 'number' | 'int' | 'float' | 'boolean')
   * @param {String} type
   */
  constructor(type) {
    super(false, type);
  }

  /**
   * Add a new item to the List<T>.
   * @param {Type} value
   */
  add(value) {
    switch (this.type) {
      case 'int':
        if (this.isInt(value)) {
          this.push(value);
          break;
        }
      case 'float':
        if (this.isFloat(value)) {
          this.push(value);
          break;
        }
      default:
        if (typeof value === this.type && value !== 'float' && value !== 'int')
          this.push(value);
        else
          throw Errors.wrongType(this.type);
    }
  };

  /**
   * Remove an new item from the List<T> by index.
   * @param {Number} index
   */
  remove(index) {
    this.splice(index);
  };

  /**
   * (private)
   * @param {Number} value
   */
  isInt(value) {
    if (typeof value !== 'number')
      return false;

    return value % 1 === 0;
  }

  /**
   * (private)
   * @param {Number} value
   */
  isFloat(value) {
    if (typeof value !== 'number')
      return false;

    return value % 1 !== 0;
  }
}

// #endregion
﻿class DOM {
  /**
   * 
   * @param { string } scriptCode The script code string.
   * @param { HTMLElement } target Default: <body> element.
   */
  static addScript( scriptCode, target = document.body) {
    let newScript = document.createElement('script');
    newScript.text = scriptCode;
    newScript.setAttribute('type', 'application/javascript');

    target.insertAdjacentElement('beforeend', newScript);
  }

  /**
 * 
 * @param { string } url The script's URL.
 * @param { HTMLElement } target Default: <body> element.
 */
  static addScriptUrl( url, target = document.body ) {
    let newScript = document.createElement( 'script' );
    newScript.setAttribute( 'src', url );
    newScript.setAttribute( 'type', 'application/javascript' );

    target.insertAdjacentElement( 'beforeend', newScript );
  }

  /**
   * Create a new Event Listener on the provided HTMLElement.
   * The Callback receives the Event object.
   * 
   * @param { HTMLElement } htmlElement
   * @param { EventListenerOptions } eventType
   * @param { Function } CallbackEventHandler
   * 
   * @returns { void }
   */
  static on( eventType, htmlElement, CallbackEventHandler ) {
    htmlElement.addEventListener( eventType, ( e ) => {
      CallbackEventHandler( e );
    } );
  }
}
﻿class HttpClient {
  constructor() {
    DevErrors.cantInstantiateStatic( 'HttpClient' );
  }

  // res.json()

  static get( url, jwtAuth = true, Callback ) {
    HttpClient.request( RequestType.Get, url, jwtAuth, ( err, res ) => {
      Callback( err, res );
    } );
  }

  static post( url, body, jwtAuth = true, Callback ) {
    HttpClient.request( RequestType.Post, url, jwtAuth, ( err, res ) => {
      Callback( err, res );
    } );
  }

  static put( url, body, jwtAuth = true, Callback ) {
    HttpClient.request( RequestType.Put, url, body, jwtAuth, ( err, res ) => {
      Callback( err, res );
    } );
  }

  static request( requestType, url, body = null, jwtAuth = true, Callback ) {
    let requestObject = {
      method: requestType,
      headers: new Headers()
    };

    if ( jwtAuth )
      requestObject.headers['Authorization'] = 'Bearer ' + localStorage.getItem( AUTH_TOKEN_ID );

    if ( requestType === RequestType.Post || requestType === RequestType.Put ) {
      requestObject.body = body;
      requestObject.headers['Content-Type'] = 'application/json;charset=utf-8';
    }

    fetch( url, requestObject )
      .then( ( res ) => {
        return Callback( null, res );
      } )
      .catch( ( err ) => {
        Callback( err, null );
      } );
  }
}
﻿/**
 * Extended by ControllerBase.
 */
class NavbarItemBase {
  /**
   * 
   * @param { PageModelBase } model An extended PageModelBase.
   * @param { PageViewBase } view An extended PageViewBase.
   */
  constructor(model, view) {
    this.id = model.id;
    this.navbarItemType = model.navbarItemType;
    this.navIconURL = model.navIconURL;
    this.content = view.initContent;
    this.targetElement = view.targetElement;

    this.model = model;
    this.view = view;
  }

  injectContent( navbarItemType ) {
    if ( navbarItemType === NavbarItemType.Page )
      this.targetElement().innerHTML = PageTemplates.page( this.content );
    else if ( navbarItemType === NavbarItemType.NavbarPanelItem )
      throw DevErrors.notImplemented();
  }

  injectIDInView() {
    this.view.injectID( this.model.id );
  }

  /**
   * Event fired when the page/item is injected into the DOM.
   * 
   * @param { NavbarItemType } navbarItemType NavbarItemType enum.
   * */
  onSetActiveBase( navbarItemType ) {
    this.injectContent( navbarItemType );
    this.injectIDInView();

    // "in" operator to test for properties that are inherited by child classes.
    if ( 'onSetActive' in this )
      this.onSetActive();
  }
}
﻿/**
 * These templates depend on the Foundation framework.
 */
class PageTemplates {
  /**
   * 
   * @param { string } content The content to insert inside the global page template.
   * 
   * @returns { string } HTML string.
   */
  static page(content) {
    return `
      <main class="page">
        ${content}
      </main>`;
  }

  static inputElem( label, type, id, placeholder = '', additionalAttributes = '' ) {
    return `
      <label>${label}
        <input type="${type}" placeholder="${placeholder}" id="${id}" ${additionalAttributes}>
      </label>
    `;
  }

  static inputNumElem( label, id, min, max, placeholder = '', additionalAttributes = '' ) {
    return PageTemplates.inputElem( label, 'number', id, placeholder, `min="${min.toString()}" max="${max.toString()}" ` + additionalAttributes );
  }

  static successButton(label, id, addicionalClasses = '') {
    return `
      <a id="${id}" class="success button ${addicionalClasses}">${label}</a>
    `;
  }
}
﻿class ModelBase {
  /**
   * @param { NavItemID } id NavItemID enum
   * Used for storing in Dictionaries and as the URL slug for pages.
   * @param { NavbarItemType } navbarItemType NavbarItemType enum.
   * @param { string } title Used as label on the navbar.
   * @param { string } navIconURL
   */
  constructor( id, navbarItemType, title, navIconURL ) {
    this.id = id;
    this.navbarItemType = navbarItemType;
    this.title = title;
    this.navIconURL = navIconURL;
  }
}
﻿class ViewBase {
  /**
   * 
   * @param { string } initContent The content to inject when the page/navbar panel item get activated.
   * @param { () => HTMLElement } targetElement (optional) Function to select the DOM injection target element.
   * Default: (id) 'page-container'
   */
  constructor( initContent, targetElement = () => { return document.getElementById( 'page-container' ); } ) {
    this.initContent = initContent;
    this.targetElement = targetElement;
  }

  injectID( id ) {
    document.getElementById( 'page-container' ).firstElementChild.id = id;
  }
}
﻿/**
 * Available events:
 * - onSetActive(): Fired when a page/navbar panel item gets activated.
 * */
class ControllerBase extends NavbarItemBase {
  /**
   * 
   * @param { ModelBase } model An extended ModelBase.
   * @param { ViewBase } view An extended ViewBase.
   */
  constructor( model, view ) {
    super( model, view );

    this.model = model;
    this.view = view;
  }
}
﻿class DashboardTemplates {
  constructor() {
    throw new Error( 'You can not instantiate DashboardTemplates (static class)' );
  }
}
﻿/**
  * Do not use this directly.
  * Use "DashboardModel._" or "DashboardController.model" instead.
  */
let dashboardModel = null;

class DashboardModel extends ModelBase {
  constructor() {
    if (dashboardModel)
      throw new Error("There can only be one instance of DashboardModel.");

    super( NavItemID.Dashboard, NavbarItemType.Page, 'Dashboard', DASHBOARD_ICON_URL );

    dashboardModel = this;
    Object.seal( dashboardModel );
  }

  static get _() { return dashboardModel; }
}
﻿/**
  * Do not use this directly.
  * Use "DashboardModel._" or "DashboardController.model" instead.
  */
let dashboardView = null;

class DashboardView extends ViewBase {
  constructor() {
    if ( dashboardView )
      throw DevErrors.singleIntance( 'DashboardView' );

    super( '<h1>Dashboard</h1>' );

    dashboardView = this;
    Object.freeze( dashboardView );
  }

  static get _() { return dashboardView; }
}
﻿let dashboardController = null;

class DashboardController extends ControllerBase {
  constructor() {
    if ( dashboardController )
      throw new Error( 'There can only be one instance of DashboardController.' );

    super(
      new DashboardModel(),
      new DashboardView()
    );

    dashboardController = this;
    Object.freeze( dashboardController );
  }

  static get _() { return dashboardController; }
}
﻿class MarketsTemplates {
  constructor() {
    DevErrors.cantInstantiateStatic( 'MarketsTemplates' );
  }

  static container( content ) {
    return `
      <section id="markets" class=""> ${ content } <h3>Markets</h3> </section>
    `;
  }
}
﻿class MarketsModel {

}
﻿class MarketsView {

}
﻿class MarketsController {

}
﻿class TradeRoomTemplates {
  constructor() {
    DevErrors.cantInstantiateStatic( 'TradeRoomTemplates' );
  }
}
﻿let tradeRoomModel = null;

class TradeRoomModel extends ModelBase {
  constructor() {
    if ( tradeRoomModel )
      throw new Error( 'There can only be one instance of TradeRoomModel.' );

    super( NavItemID.Markets, NavbarItemType.Page, 'Trade Room', TRADE_ROOM_ICON_URL );

    this.activeContent = NavItemID.Markets;

    tradeRoomModel = this;
    Object.seal( tradeRoomModel );
  }

  static get _() { return tradeRoomModel; }
}
﻿let tradeRoomView = null;

class TradeRoomView extends ViewBase {
  constructor() {
    if ( tradeRoomView )
      throw new Error( 'There can only be one instance of TradeRoomView.' );

    super( `<h1>Trade Room</h1><br/>${MarketsTemplates.container( '' )}` );

    tradeRoomView = this;
    Object.freeze( tradeRoomView );
  }

  static get _() { return tradeRoomView; }
}
﻿let tradeRoomController = null;

class TradeRoomController extends ControllerBase {
  constructor() {
    if ( tradeRoomController )
      throw new Error( 'There can only be one instance of TradeRoomController.');

    super(
      new TradeRoomModel(),
      new TradeRoomView()
    );

    tradeRoomController = this;
    Object.freeze( tradeRoomController );
  }

  /**
   * @type { TradeRoomController }
   */
  static get _() { return tradeRoomController; }

  openMarkets() {
    if ( this.model.activeContent === NavItemID.Markets )
      return;

    this.model.id = NavItemID.Markets;
    this.model.activeContent = NavItemID.Markets;
    console.info( `The TradeRoom markets were opened.` );
    console.debug( this.model.activeItem );
  }

  tradeAsset( assetID ) {
    if ( this.model.activeContent === NavItemID.Trade )
      return;

    this.model.id = NavItemID.Trade;
    this.model.activeContent = NavItemID.Trade;
    console.info( `TradeRoom opened to trade ${assetID}.` );
    console.debug( this.model.activeItem );
  }

  onSetActive() {
    console.debug( 'onSetActive fired at TradeRoomController.' );
  }
}
﻿class SettingsTemplates {
  constructor() {
    throw DevErrors.cantInstantiateStatic( 'SettingsTemplates' );
  }

  static theForm( content ) {
    return `
      <form class="settings-form grid-x">
        ${ content }
      </form>
    `;
  }

  static formItem( title, gridOrientationType, gridContent, containerBottomContent = '' ) {
    return `
      <article class="form-item cell small-12 medium-6 large-4">
        <h4>${ title }</h4>
        <div class="grid-container fluid">
          <div class="${ gridOrientationType } article-content">
            ${ gridContent }
          </div>
          ${containerBottomContent}
        </div>
      </article>
    `;
  }

  static changePassword() {
    return SettingsTemplates.formItem(
      'Change Password',
      GridOrientationType.Y,

      PageTemplates.inputElem( 'Current Password', 'password', 'curr-pass-input' ) +
      PageTemplates.inputElem( 'New Password', 'password', 'new-pass-input' ) +
      PageTemplates.inputElem( 'Confirm New Password', 'password', 'check-new-pass-input' ),

      PageTemplates.successButton( 'Change Password', 'change-password-button' )
    );
  }

  static maxLoginFailes() {
    return SettingsTemplates.formItem(
      'Maximum Login Failes Allowed',
      GridOrientationType.Y,
      PageTemplates.inputNumElem( 'Maximum Login Fails', 'max-login-fails-input', 0, 100, 'Leave this blank to deactivate this control.' )
    );
  }

  static themeSelection() {
    throw DevErrors.notImplemented();
    // return ``;
  }


  static notifications() {
    throw DevErrors.notImplemented();
    // return ``;
  }

  static connectSocialAccounts() {
    throw DevErrors.notImplemented();
    // return ``;
  }

  static timezoneSelection() {
    throw DevErrors.notImplemented();
    // return ``;
  }

  static twoFA() {
    throw DevErrors.notImplemented();
    // return ``;
  }
}
﻿let settingsModel;

class SettingsModel extends ModelBase {
  constructor() {
    if ( settingsModel )
      throw DevErrors.singleIntance( 'SettingsModel' );

    super( NavItemID.Settings, NavbarItemType.Page, 'Settings', SETTINGS_ICON_URL );

    settingsModel = this;
    Object.seal( settingsModel );
  }

  static get _() { return settingsModel; }

  get baseUserApiUrl() { return BASE_API_URL + 'user/'; }

  changePassword( changePasswordDTO ) {
    HttpClient.put( this.baseUserApiUrl + 'password', changePasswordDTO, ( err, res ) => {
      if ( err )
        console.debug( err );

      console.debug( res );
    } );
  }

  setMaxLoginFailes( maxLoginFailes ) {
    HttpClient.put( this.baseUserApiUrl + 'max-login-fails',
      JSON.stringify( { "maxLoginFails": maxLoginFailes } ),
      ( err, res ) => {
        if ( err )
          console.debug( err );

        console.debug( res );
      });
  }
}
﻿let settingsView;

class SettingsView extends ViewBase {
  constructor() {
    if ( settingsView )
      throw DevErrors.singleIntance( 'SettingsView' );

    super(
      '<h1>Settings</h1>' +
      SettingsTemplates.theForm(
        SettingsTemplates.changePassword() +
        SettingsTemplates.maxLoginFailes()
      )
    );

    settingsView = this;
    Object.freeze( settingsView );
  }

  static get _() { return settingsView; }

  get changePasswordButton() { return document.getElementById( 'change-password-button' ); }
  get currPassInput() { return document.getElementById( 'curr-pass-input' ); }
  get newPassInput() { return document.getElementById( 'new-pass-input' ); }
  get checkNewPassInput() { return document.getElementById( 'check-new-pass-input' ); }

  /**
   * Returns a ChangePasswordDTO with the user input.
   * 
   * @returns { ChangePasswordDTO } ChangePasswordDTO
   */
  getChangePasswordInputDTO() {
    const currentPasswordInput = this.currPassInput.value;
    const newPasswordInput = this.newPassInput.value;

    return new ChangePasswordDTO( currentPasswordInput, newPasswordInput );
  }
}
﻿class SettingsController extends ControllerBase {
  constructor() {
    super(
      new SettingsModel(),
      new SettingsView()
    );
  }

  setEventListeners() {
    DOM.on( 'click', this.view.changePasswordButton, ( e ) => {
      e.preventDefault();

      if ( this.view.newPassInput.value !== this.view.checkNewPassInput.value ) {
        // TODO: Send notification.
        return false;
      }

      const newChangePasswordDTO = this.view.getChangePasswordInputDTO();

      // Update password (API connection - confirm current password).
      this.model.changePassword( newChangePasswordDTO );
    } );
  }

  onSetActive() {
    this.setEventListeners();
  }
}
﻿class NavbarTemplates {
  constructor() {
    throw new Error( 'You can not instantiate NavbarTemplates (static class)' );
  }

  static toggleButton() {
    // "&laquo;" == "«"
    // "&raquo;" == "»"
    return `
      <li class="cell li-toggle">
        <a id="sidenav-toggle">
          <p id="sidenav-toggle-p"> &laquo; </p>
        </a>
      </li>
    `;
  }

  /**
   * Used for NavbarItemType.Pages
   * 
   * @param { string } url The icon image url. White the image extention extention type (".png"/".svg"/etc.)
   * @param { string } label The icon label (E.g.: "Dashboard").
   * @param { string } linkTo The link to the page it links to. Use the traderRoutes/adminRoutes here.
   * @returns { string } HTML string content
   */
  static iconLink(url, label, linkTo) {
    return `
      <li class="cell">
        <a href="${ BASE_URL + linkTo }" class="grid-x align-middle">
          <img class="icon cell large-6" src="${ url }" alt"=${ label } Icon" />
          <figcaption class="icon-label large-6">${ label }</figcaption>
        </a>  
      </li>`;
  }

  static iconButton() {
    throw DevErrors.notImplemented();
  }
}
﻿let navbarModel = null;

class NavbarModel {
  constructor() {
    if ( navbarModel )
      throw DevErrors.singleIntance( 'NavbarModel' );

    /**
     * Dictionary mapping the pages and components.
     * key: string (unique id of the Page | NavbarPanelItem. To be used by the router)
     * value:  Instance of Page | NavbarPanelItem.
     * 
     * @type { Dictionary }
     */
    this.items = new Dictionary( true );
    /** 
     * The ID of the active page. 
     * @type { string } 
     */
    this.activePageId = null;
    this.activeNavbarPanelItem = null;
    /** @type { boolean } */
    this.toggled = false;

    navbarModel = this;
    Object.seal( navbarModel );
  }

  static get _() { return navbarModel; }
}
﻿/**
 * This stores the NavbarView instance.
 * Do not use this variable directly. Use NavbarView._ instead.
 * 
 * @type { NavbarView }
 * */
let navbarView = null;

/**
 * The NavbarView singleton. Access it with NavbarView._
 * */
class NavbarView {
  constructor() {
    if ( navbarView )
      throw new Error( 'There can only be one instance of NavBarController.' );

    navbarView = this;
    Object.freeze( navbarView );
  }

  // #region PROPERTIES

  /**
   * Returns the current NavbarController instance.
   * 
   * @returns { NavbarView } The current NavbarView instance.
   */
  static get _() { return navbarView; };

  get element() { return document.getElementById( 'sidenav' ); }

  get iconContainer() { return document.getElementById( 'icon-container' ); }

  static get pageContainer() { return document.getElementById( 'page-container' ); }

  get toggleButtonElem() { return document.getElementById( 'sidenav-toggle' ); }
  get toggleButtonPElem() { return document.getElementById( 'sidenav-toggle-p' ); }

  getIconLabels() { return document.getElementsByClassName( 'icon-label' ); }

  // #endregion

  // #region METHODS

  injectToggleButton() {
    this.iconContainer.innerHTML += NavbarTemplates.toggleButton();
  }

  minimize() {
    this.resize( SIDEBAR_MOBILE_WIDTH, '&raquo;', 'none' );
  }

  maximize() {
    this.resize( SIDEBAR_DESKTOP_WIDTH, '&laquo;', 'inline-block' );
  }

  resize( width, toggleButtonLabel, iconLabelsDisplay ) {
    this.element.style.maxWidth = width;
    this.element.style.minWidth = width;
    this.element.style.width = width;
    this.toggleButtonPElem.innerHTML = toggleButtonLabel;
    NavbarView.pageContainer.style.marginLeft = width;

    const labels = this.getIconLabels();
    for ( let i = 0; i < labels.length; ++i ) {
      labels[i].style.display = iconLabelsDisplay;
    }
  }

  injectIcon( url, label, linkTo = null ) {
    if ( !linkTo )
      linkTo = label.toLowerCase();

    this.iconContainer.innerHTML += NavbarTemplates.iconLink(url, label, linkTo);
  }

  removeActivePage() {
    NavbarView.pageContainer.innerHTML = '';
  }

  // #endregion
}﻿// This variable is a hack because there can be no static properties in JavaScript classes...
/**
 * This stores the NavbarController instance.
 * Do not use this variable directly. Use NavbarController._ instead.
 * 
 * @type {NavbarController}
 * */
let navbarController = null;

/**
 * The NavbarController singleton. Access it with NavbarController._
 * */
class NavbarController {
  constructor() {
    if (navbarController)
      throw new Error( 'There can only be one instance of NavBarController.' );

    /**
     * @type { NavbarView }
     * */
    this.view = new NavbarView();

    /**
     * @type { NavbarModel }
     * */
    this.model = new NavbarModel();

    /**
     * Dictionary mapping the pages and components.
     * key: string (unique id of the Page | NavbarPanelItem. To be used by the router)
     * value:  Instance of Page | NavbarPanelItem.
     */
    //this.items = new Dictionary(true);
    //this.activePageId = null;
    //this.activeNavbarPanelItem = null;

    navbarController = this;
    Object.freeze( navbarController );
  }

  /**
   * Returns the current NavbarController instance.
   * Same as using navbarController, but don't use it for a more secure (error free) code.
   * @returns { NavbarController } NavbarController
   */
  static get _() { return navbarController; }

  /**
  * Map a page/item ID to its instance.
  * key: string (unique id of the Page | NavbarPanelItem. To be used by the router)
  * value: object (instance of the Page | NavbarPanelItem)
  * @param { string } key Unique id of the Page | NavbarPanelItem.
  * @param { object } value Instance of Page | NavbarPanelItem.
  * @returns { void }
  */
  mapItem( key, value ) {
    this.model.items.add( key, value );
  }

  /**
  * @returns {void}
  */
  init() {
    this.view.injectToggleButton();

    const thisItems = this.model.items;
    for (let i = 0; i < thisItems.length; ++i) {
      const thisItemModel = thisItems.getByIndex(i).model;
      this.injectIcon(thisItemModel.navIconURL, thisItemModel.title, thisItemModel.id);
    }

    DOM.on( 'click', this.view.toggleButtonElem, ( e ) => {
      console.debug( 'here' );
      e.preventDefault();

      if ( this.model.toggled ) {
        this.view.maximize();
        this.model.toggled = false;
      } else {
        this.view.minimize();
        this.model.toggled = true;
      }
    } );

    this.activateItem( NavItemID.Dashboard );
  }

  injectIcon(url, label, linkTo = null) {
    this.view.injectIcon(url, label, linkTo);
  }

  /**
   * Activate an item stored in the navbarController.
   * You must pass one of the two.
   * 
   * @param { NavItemID } itemId NavItemID enum
   * @param { NavbarItemBase } thisItem Instance of Page | NavbarPanelItem.
   */
  activateItem( itemId = null, thisItem = null ) {
    if ( !thisItem ) {
      thisItem = this.model.items.getByKey( itemId );
      itemId = thisItem.id;
    }

    if ( thisItem.navbarItemType === NavbarItemType.Page ) {
      if ( this.model.activePageId === itemId )
        return;

      this.view.removeActivePage();
      this.model.activePageId = itemId;
    } else if ( thisItem.navbarItemType === NavbarItemType.NavbarPanelItem ) {
      if ( this.model.activeNavbarPanelItem === itemId )
        return;

      this.model.activeNavbarPanelItem = itemId;
    }

    thisItem.onSetActiveBase( thisItem.navbarItemType );
  }
}

new NavbarController();
﻿const ThemeType = Object.freeze({
  Light: 1,
  Dark: 2
});
﻿class Theme {
  /**
   * 
   * @param { Colors } sidenav
   */
  constructor(sidenav, topbar) {
    this.sidenav = sidenav;
    this.topbar = topbar;
  }
}

let lightTheme = null;
class LightTheme extends Theme {
  constructor() {
    super( Colors.LightBlue, Colors.LightBlue );

    lightTheme = this;
    Object.freeze( lightTheme );
  }
}
new LightTheme();

let darkTheme = null;
class DarkTheme extends Theme {
  constructor() {
    super( Colors.DarkGrey, Colors.DarkGrey );

    darkTheme = this;
    Object.freeze( darkTheme );
  }
}
new DarkTheme();

class Themes {
  constructor() {
    throw new Error( 'Can not create a new instance of Themes (static class).' );
  }

  /**
   * 
   * @param { ThemeType } themeType
   */
  static apply( themeType ) {
    /**
     * @type { Theme }
     */
    let theme = lightTheme;

    if (themeType === ThemeType.Dark)
      theme = darkTheme;

    document.getElementById( 'sidenav' ).style.backgroundColor = theme.sidenav;
    document.getElementsByClassName( 'top-bar' )[0].style.backgroundColor = theme.topbar;
  }
}
﻿whenDomReady(() => {
  console.log( 'The DOM is ready' );

  $( document ).foundation();
  Themes.apply( ThemeType.Dark );

  NavbarController._.mapItem( NavItemID.Dashboard, new DashboardController() );
  NavbarController._.mapItem( NavItemID.Markets, new TradeRoomController() );
  NavbarController._.mapItem( NavItemID.Settings, new SettingsController() );

  NavbarController._.init();
});
﻿page();

page( `/${NavItemID.Dashboard}`, () => {
  NavbarController._.activateItem( NavItemID.Dashboard );
  console.info( 'Dashboard page.' );
} );

//page( `/${NavItemID.TradeRoom}`, () => {
//  NavbarController._.activateItem( NavItemID.TradeRoom );
//  page.redirect( `/${ NavItemID.Markets }` );
//} );

page( `/${NavItemID.Markets}`, () => {
  NavbarController._.activateItem( NavItemID.Markets );
  TradeRoomController._.openMarkets();
} );

page( `/${NavItemID.Trade}/:assetID`, ( ctx ) => {
  TradeRoomController._.tradeAsset( ctx.params.assetID );
} );

page( `/${NavItemID.Settings}`, () => {
  NavbarController._.activateItem( NavItemID.Settings );
  console.info( 'Settings page.' );
} );

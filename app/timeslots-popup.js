/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./ui/timeslots-popup/sass/timeslots-popup.scss":
/*!******************************************************!*\
  !*** ./ui/timeslots-popup/sass/timeslots-popup.scss ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**************************************************!*\
  !*** ./ui/timeslots-popup/js/timeslots-popup.js ***!
  \**************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sass_timeslots_popup_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sass/timeslots-popup.scss */ "./ui/timeslots-popup/sass/timeslots-popup.scss");

var lightboxOverlay = document.querySelector('.tss-lightbox-overlay');
var lightboxWrapper = document.querySelector('.tss-lightbox-wrapper');
var lightbox = document.querySelector('.tss-lightbox');
var lightboxLoader = document.querySelector('.tss-lightbox__loader');
var lightboxContent = document.querySelector('.tss-lightbox__content');
var lightboxFooter = document.querySelector('.tss-timeslots-popup-close-btn-wrapper');
var lightboxHeader = document.querySelector('.tss-timeslots-popup-heading-wrapper');
var lightboxOverview = document.querySelector('.tss-timeslots-popup-wrapper');
var lightboxCloseTrigger = document.querySelector('#tss-timeslots-popup .tss-close-btn');
var loginRegisterRedirectContainer = document.querySelector('.tss-login-register-redirect');
var body = document.querySelector('body');
['#tss-timeslots-popup', '.tss-login-register-redirect'].forEach(function (selector) {
  var element = document.querySelector(selector);
  document.querySelectorAll(selector).forEach(function (el) {
    return el.remove();
  });
  body.appendChild(element);
});
var closeActions = [];

function showLoader() {
  lightboxLoader.classList.remove('tss-lightbox__loader--hidden');
}

function hideLoader() {
  lightboxLoader.classList.add('tss-lightbox__loader--hidden');
}

function showContent() {
  if (window.XRD && !window.XRD.version || window.XRD && window.XRD.version && window.XRD.version.startsWith('0.2')) {
    var scripts = lightboxContent.getElementsByTagName('script');

    for (var i = 0; i < scripts.length; i += 1) {
      var scriptTag = document.createElement('script');
      scriptTag.innerHTML = scripts[i].innerHTML;
      scriptTag.type = 'text/javascript';
      body.append(scriptTag);
    }
  }

  hideLoader();
  lightbox.classList.remove('tss-lightbox--loading');
  lightboxOverview.classList.remove('tss-lightbox--hidden');
  window.dispatchEvent(new CustomEvent('timeslots-popup:load'));
  document.dispatchEvent(new CustomEvent('DOMContentLoaded'));
  lightboxContent.removeEventListener('meso.injected', showContent);
}

function hideContent() {
  showLoader();
  lightboxOverview.classList.add('tss-lightbox--hidden');
}

function showLightbox() {
  body.classList.add('tss-noscroll');
  lightbox.classList.add('tss-lightbox--loading');
  lightboxOverlay.classList.remove('tss-lightbox-overlay--hidden');
  lightboxWrapper.classList.remove('tss-lightbox-wrapper--hidden');
}

function closeLightbox() {
  setTimeout(function () {
    lightboxOverlay.classList.add('tss-lightbox-overlay--hidden');
    lightboxWrapper.classList.add('tss-lightbox-wrapper--hidden');
    body.classList.remove('tss-noscroll');
    hideContent();
    closeActions.forEach(function (action) {
      action();
    });
    closeActions = [];
    lightbox.style.width = '';
    lightbox.style.height = '';
    lightbox.style.maxWidth = '';
    lightbox.style.maxHeight = '';
  }, 100, this);
}

function handleHeaderShadow() {
  if (lightboxContent.scrollTop > 2) {
    lightboxHeader.classList.add('shadowed');
  } else {
    lightboxHeader.classList.remove('shadowed');
  }
}

function handleFooterShadow() {
  if (lightboxContent.scrollHeight - lightboxContent.clientHeight - lightboxContent.scrollTop > 2) {
    lightboxFooter.classList.add('shadowed');
  } else {
    lightboxFooter.classList.remove('shadowed');
  }
}

function handleWindowChange() {
  if (lightboxContent.clientHeight >= lightboxContent.scrollHeight) {
    lightboxHeader.classList.remove('shadowed');
    lightboxFooter.classList.remove('shadowed');
  } else {
    handleHeaderShadow();
    handleFooterShadow();
  }
}

function handleContentScroll() {
  if (lightboxContent.scrollHeight > lightboxContent.clientHeight) {
    handleHeaderShadow();
    handleFooterShadow();
  }
}

function changeCloseButtonColor() {
  var button = document.querySelector('.tss-timeslots-popup-close-btn-wrapper .tss-close-btn');
  button.classList.add('slot-selected');
  button.innerHTML = 'Weiter einkaufen';
}

lightboxCloseTrigger.addEventListener('click', closeLightbox);
window.addEventListener('timeslots-popup:open', function (event) {
  var basketData;
  document.dispatchEvent(new CustomEvent('basket:basket-state-retrieve', {
    detail: {
      callback: function callback(response) {
        basketData = response;
      }
    }
  }));
  var query = {
    basketid: basketData.id,
    customeruuid: event.detail.customerUuid,
    modifiedorderid: event.detail.modifiedOrderId,
    shopcontext: event.detail.shopContext
  };

  if (!query.customeruuid) {
    // start meso include
    XRD.includes.inject([{
      namespace: 'tss',
      name: 'timeslottablerejected',
      container: loginRegisterRedirectContainer
    }]).catch(function () {// error handling
    });
  } else {
    // Open Lightbox
    showLightbox('');
    var path = {
      servicetype: event.detail.serviceType,
      wwident: event.detail.wwIdent
    }; // Filter null or undefined properties

    Object.keys(query).forEach(function (prop) {
      if (!query[prop]) {
        delete query[prop];
      }
    }); // start meso include

    XRD.includes.inject([{
      namespace: 'tss',
      name: 'timeslottable',
      container: lightboxContent,
      params: path,
      query: query
    }]).catch(function () {// error handling
    });
    handleWindowChange(); // When meso include finished, hide spinner
    // When meso include finished, show content

    lightboxContent.addEventListener('meso.injected', showContent);
  }
});
window.addEventListener('resize', handleWindowChange);
lightboxContent.addEventListener('scroll', handleContentScroll);
window.addEventListener('resize', handleWindowChange);
window.addEventListener('timeslot.timeslotSelected', changeCloseButtonColor);
}();
/******/ })()
;
//# sourceMappingURL=timeslots-popup.js.map
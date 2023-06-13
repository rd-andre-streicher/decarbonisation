/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./ui/timeslots-button/scss/timeslots-button.scss":
/*!********************************************************!*\
  !*** ./ui/timeslots-button/scss/timeslots-button.scss ***!
  \********************************************************/
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
/*!****************************************************!*\
  !*** ./ui/timeslots-button/js/timeslots-button.js ***!
  \****************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_timeslots_button_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/timeslots-button.scss */ "./ui/timeslots-button/scss/timeslots-button.scss");

document.querySelectorAll('.tss-js-timeslot-button').forEach(function (timeslotsButton) {
  function openTimeslotsPopup() {
    var detail = {
      customerUuid: timeslotsButton.dataset.customeruuid,
      serviceType: timeslotsButton.dataset.servicetype,
      wwIdent: timeslotsButton.dataset.wwident,
      identifier: timeslotsButton.dataset.identifier,
      basketId: timeslotsButton.dataset.basketid,
      shopContext: timeslotsButton.dataset.shopcontext,
      modifiedOrderId: timeslotsButton.dataset.modifiedorderid
    };
    window.dispatchEvent(new CustomEvent('timeslots-popup:open', {
      detail: detail
    }));
  }

  timeslotsButton.addEventListener('click', openTimeslotsPopup);
});
window.addEventListener('timeslots:reservation-changed', function (e) {
  var timeslotButtonDates = document.querySelectorAll('.tss-qa-reserve-timeslot-link-text > span');
  var buttonDateFormatter = {
    hour: '2-digit',
    minute: '2-digit'
  };
  var slotStartTime = e.detail.start.toLocaleTimeString([], buttonDateFormatter);
  var slotEndTime = e.detail.end.toLocaleTimeString([], buttonDateFormatter);
  var slotDate = e.detail.start.toLocaleDateString('de-DE', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  });
  timeslotButtonDates.forEach(function (timeslotButtonDate) {
    // eslint-disable-next-line no-param-reassign
    timeslotButtonDate.innerHTML = "<div> ".concat(slotDate, "<br> ").concat(slotStartTime, "-").concat(slotEndTime, "</div>");
  });
});
}();
/******/ })()
;
//# sourceMappingURL=timeslots-button.js.map
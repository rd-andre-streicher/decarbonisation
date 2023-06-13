/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
(function mainRoutine() {
  const allToggleButtons = document.getElementsByClassName('ld-cll-linklist-section-button')
  let onClickListenerController = new AbortController()
  const linkListWrapperSelector = '#ld-cll-linklist-wrapper'
  const linkListMesoContentSelector = '#ld-cll-linklist-meso-content'

  /**
   * Executes the given action for each toggle button.
   */
  function decorateAllToggleButtons(action) {
    Array.prototype.forEach.call(allToggleButtons, action)
  }

  /**
   * Adds "onclick" listeners to all available toggle buttons.
   */
  function addClickHandlersToButtons() {
    decorateAllToggleButtons((button) =>
      button.addEventListener('click', () => toggleFurtherLinks(button), {
        signal: onClickListenerController.signal,
      })
    )
  }

  /**
   * Removes all "onclick" listeners from the toggle buttons.
   */
  function removeAllClickHandlersFromButtons() {
    onClickListenerController.abort()
    // Assign a new abort controller instance in order that adding event
    // listeners again (probably to other toggle buttons) would work:
    onClickListenerController = new AbortController()
  }

  // ------------------------

  async function replaceLinkListContent() {
    try {
      const rpath = new URL(window.location).pathname
      // Replace link list:
      await window.XRD.includes.inject([
        {
          namespace: 'content-link-list',
          name: 'linklist',
          container: linkListWrapperSelector,
          query: { rpath },
        },
      ])
    } catch (error) {
      console.error('Could not replace link list. Injection of frontend meso include failed:', error)
    }
  }

  function updateLinkList() {
    // remove all listeners from the buttons first
    removeAllClickHandlersFromButtons()
    // then replace the link list content:
    replaceLinkListContent().finally(() => {
      // and finally (re-)add click handlers to the (maybe new) buttons again:
      addClickHandlersToButtons()
    })
  }

  function addHistoryPopHandler() {
    window.addEventListener('popstate', () => {
      // A URL change was detected, maybe the link list must be updated:
      updateLinkList()
    })
  }

  /**
   * Monkey patches history.pushState in order to be able to recognize URL changes.
   */
  function addHistoryPushHandler(history) {
    const pushState = history.pushState
    history.pushState = function (state) {
      if (typeof history.onpushstate === 'function') {
        history.onpushstate({ state: state })
      }

      const result = pushState.apply(history, arguments)

      // A URL change was detected, maybe the link list must be updated:
      updateLinkList()

      return result
    }
  }

  // ------------------------

  /**
   * Wraps the outermost div supplied by the meso include (i.e. the meso content) with
   * a new "wrapper" div. This new div is needed so that the frontend meso include knows
   * where to inject a new link list.
   *
   * This "wrapper" div cannot be supplied by the meso include, as this would lead to a
   * matryoshka effect where the frontend meso include would render itself recursively
   * in its outermost div, nesting more and more outer divs with each injection.
   */
  function wrapMesoContent() {
    const wrapperDivId = linkListWrapperSelector.slice(1)

    if (document.getElementById(wrapperDivId)) {
      // wrapper div is already in place
      return
    }

    const mesoContentDiv = document.querySelector(linkListMesoContentSelector)
    // create wrapper div
    const wrapper = document.createElement('div')
    wrapper.setAttribute('id', wrapperDivId)
    // insert wrapper before mesoContentDiv in the DOM tree
    mesoContentDiv.parentNode.insertBefore(wrapper, mesoContentDiv)
    // move mesoContentDiv into wrapper
    wrapper.appendChild(mesoContentDiv)
  }

  function setupMesoIncludeEventListeners() {
    const linkListWrapper = document.querySelector(linkListWrapperSelector)
    // Since the event listener for 'meso.injected' is not needed yet we only add the listener for 'meso.error':
    linkListWrapper.addEventListener('meso.error', (event) => {
      // Frontend meso include could not be injected
      console.error('Could not inject meso include: ', event.detail)
    })
  }

  ;(function init() {
    addClickHandlersToButtons()
    window.addEventListener('unload', removeAllClickHandlersFromButtons)

    wrapMesoContent()
    setupMesoIncludeEventListeners()

    addHistoryPopHandler()
    addHistoryPushHandler(window.history)
  })()
})()

// ------------------------

/**
 * Returns the y-coordinate of the top boundary of the section of the given wrapper.
 * In order to eliminate precision errors the position float is rounded.
 */
function getSectionTop(wrapper) {
  const parentSection = wrapper.parentNode.parentNode
  return Math.round(parentSection.getBoundingClientRect().top * 100)
}

/**
 * Returns true if the sections of both given wrappers have the same top y-position
 * (aka are placed in the same row); false otherwise.
 */
function shareSameRow(wrapperA, wrapperB) {
  return getSectionTop(wrapperA) === getSectionTop(wrapperB)
}

/**
 * Returns the section index of the given wrapper.
 */
function getSectionIndex(wrapper) {
  return wrapper.getAttribute('data-section-index')
}

/**
 * Expands or collapses the "further links" of the given section (`wrapper`)
 * depending on the given state (`newCollapseState`).
 */
function setFurtherLinksVisibility(wrapper, newCollapseState) {
  if (newCollapseState === 'collapsed') {
    wrapper.classList.remove('ld-cll-linklist-section-links-expanded')
  } else {
    wrapper.classList.add('ld-cll-linklist-section-links-expanded')
  }
}

/**
 * Sets the button icon and label of the given section (`sectionIndex`)
 * depending on the given state (`newCollapseState`).
 */
function setButtonIconAndLabel(sectionIndex, newCollapseState) {
  const btnIcon = document.getElementById(`ld-cll-linklist-section-button-icon-${sectionIndex}`)
  const btnLabel = document.getElementById(`ld-cll-linklist-section-button-label-${sectionIndex}`)

  if (btnIcon && btnLabel) {
    if (newCollapseState === 'collapsed') {
      btnIcon.getElementsByClassName('ld-cll-icon')[0].classList.add('ld-cll-icon-hidden')
      btnIcon.getElementsByClassName('ld-cll-icon')[1].classList.remove('ld-cll-icon-hidden')
      btnLabel.textContent = 'Mehr anzeigen'
    } else {
      btnIcon.getElementsByClassName('ld-cll-icon')[0].classList.remove('ld-cll-icon-hidden')
      btnIcon.getElementsByClassName('ld-cll-icon')[1].classList.add('ld-cll-icon-hidden')
      btnLabel.textContent = 'Weniger anzeigen'
    }
  }
}

/**
 * Returns the collapse state of the given section (`sectionIndex`) which
 * will be set when clicking the button (i.e. the next collapse state).
 */
function getNewCollapseState(sectionIndex) {
  const btnIcon = document.getElementById(`ld-cll-linklist-section-button-icon-${sectionIndex}`)
  const currentStateIsCollapsed = btnIcon.getElementsByClassName('ld-cll-icon')[0].classList.contains('ld-cll-icon-hidden')
  return currentStateIsCollapsed ? 'expanded' : 'collapsed'
}

function toggleFurtherLinks(clickedButton) {
  const sectionIndex = clickedButton.getAttribute('data-section-index')

  const allWrappers = document.getElementsByClassName('ld-cll-linklist-section-links-collapse-wrapper')
  const clickedWrapper = document.getElementById(`ld-cll-linklist-section-links-collapse-wrapper-${sectionIndex}`)

  const newCollapseState = getNewCollapseState(sectionIndex)

  Array.prototype.forEach.call(allWrappers, (wrapper) => {
    if (shareSameRow(clickedWrapper, wrapper)) {
      // The "further links" are toggled only if their sections share the same row
      setFurtherLinksVisibility(wrapper, newCollapseState)
      setButtonIconAndLabel(getSectionIndex(wrapper), newCollapseState)
    }
  })
}

/******/ })()
;
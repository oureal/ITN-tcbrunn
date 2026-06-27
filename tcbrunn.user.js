// ==UserScript==
// @name         TC Brunn ITN-Filter
// @namespace    https://github.com/oureal/ITN-tcbrunn
// @version      1.1.0
// @description  Filtert die NÖTV-ITN-Rangliste automatisch nach TC Brunn/Geb.
// @match        https://www.noetv.at/rangliste/itn*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
  'use strict';

  if (window.location.hash !== '#tcbrunn') {
    return;
  }

  const applyFilter = () => {
    const searchField = document.querySelector('#rankingkeyword');
    const filterButton = document.querySelector('.btnfiltersubmit-ranking');

    if (!searchField || !filterButton) {
      return false;
    }

    searchField.value = 'TC Brunn/Geb';
    searchField.dispatchEvent(new Event('input', { bubbles: true }));
    searchField.dispatchEvent(new Event('change', { bubbles: true }));
    filterButton.click();
    return true;
  };

  if (applyFilter()) {
    return;
  }

  const observer = new MutationObserver(() => {
    if (applyFilter()) {
      observer.disconnect();
    }
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });

  window.setTimeout(() => observer.disconnect(), 15000);
})();

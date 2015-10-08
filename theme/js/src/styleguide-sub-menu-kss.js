/**
 * Sub-navigation Component kss js
 *
 * JS for the sub-navigation menu that detects whether an item
 * is the first in a line wrap, and applies a css class used to hide
 * delimiters if so.
 *
 * kss-node doesn't involve Drupal, so this file uses
 * document.ready, rather than Drupal behaviors
 */
'use strict';

$(document).ready(function() {
  // Initialize variables
  var $subMenuItems = $('.sub-navigation__link');

  // Function to add class to first item in line wrap
  function firstWrapClass(className) {
    var offset = 0;
    var last = 0;

    $subMenuItems.each(function () {
      $(this).removeClass(className);
      offset = $(this).position().left;

      if (offset < last) {
        $(this).addClass(className);
      }

      last = offset;
    });
  }

  // Run on initial load
  firstWrapClass('no-border');

  /**
   * Run on resize. There is slight (60ms) delay used on resize
   * to allow the document to reflow after widths change.
   */
  var resizeTimeout;
  $(window).resize(function() {
    // clear the timeout
    if (resizeTimeout) {
      clearTimeout(resizeTimeout);
    }

    // set the timeout to 60ms, add class to first item
    resizeTimeout = setTimeout(function() {
      firstWrapClass('no-border');
    }, 60);
  });
});
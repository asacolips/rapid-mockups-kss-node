/* kss-node Basic Page JS
 *
 * kss-node doesn't involve Drupal, so this file uses
 * document.ready, rather than Drupal behaviors
 */
  'use strict';

$(document).ready(function() {
  // Initialize
  var $mainNavigation = $('.js-main-navigation');
  var $mainNavigationLinks = $('.main-navigation__link');
  var $menuButton = $('.js-menu-toggle');
  var $searchInput = $('.js-site-search .form-text');
  var $searchButton = $('.js-site-search__button');

  $('body').removeClass('no-js');
  $('body').addClass('js');

  // Toggle classes for both the button and menu. Height changed in css
  $menuButton.on('click', function() {
    $menuButton.toggleClass('active');
    $mainNavigation.toggleClass('active');
    return false;
  });

  $searchButton.on('click', function() {
    $('.js-site-search').toggleClass('active');
    $searchButton.toggleClass('active');

    // Set focus if the form was opened
    if ($searchButton.hasClass('active')) {
      $searchInput.focus();
    }
    else {
      $searchInput.blur();
    }

    return false;
  });

  // Move border below menu links
  $mainNavigationLinks.on('click', function() {
    // remove existing active-trail, apply to clicked link
    $mainNavigationLinks.removeClass('active-trail');
    $(this).addClass('active-trail');
  });
});
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
//# sourceMappingURL=maps/all.js.map

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
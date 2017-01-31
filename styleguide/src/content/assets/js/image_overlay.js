/**
 * @file
 * A JavaScript file for image overlay.
 *
 * Our JavaScript must be wrapped in a closure.
 * @see https://drupal.org/node/1446420
 * @see http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 *
 * @copyright Copyright 2016 Palantir.net
 */

(function ($) {

  Drupal.behaviors.image_overlay = {
    attach: function(context, settings) {
      $('.js-overlay-button').click(function(){
        // Define the target expandable div.
        var targetImage = $(this).parents('.js-overlay-container').find('.js-overlay-image');
        targetImage.toggleClass('js-overlay-image--hidden js-overlay-image--revealed');
      });
    }
  };
})(jQuery, Drupal);

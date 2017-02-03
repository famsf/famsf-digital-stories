/**
 * @file
 * A JavaScript file for image credit.
 *
 * Our JavaScript must be wrapped in a closure.
 * @see https://drupal.org/node/1446420
 * @see http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 *
 * @copyright Copyright 2017 Palantir.net
 */

(function ($) {

  Drupal.behaviors.image_credit = {
    attach: function(context, settings) {
      $('.js-figcaption-cta').click(function(){
        // Define the target expandable div.
        var targetImage = $(this).parents('figure').find('figcaption');
        targetImage.toggleClass('js-figcaption--hidden js-figcaption--revealed');
      });
    }
  };
})(jQuery, Drupal);
/**
 * @file
 * A JavaScript file for the site.
 *
 * Our JavaScript must be wrapped in a closure.
 * @see https://drupal.org/node/1446420
 * @see http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 *
 * @copyright Copyright 2016 Palantir.net
 */

(function ($, Drupal) {

  Drupal.behaviors.site = {
    attach: function (context, settings) {

      if ($('.js-pagepiling').length) {
        // The user is on a page that uses pagepiling.js.
        // Create an array of section IDs for the pagepiling card deck.
        // This is required to create hashtag sections and scroll-to links.
        var sectionElements = $('.js-section');
        var sectionIds = [];
        var getSectionIds = function () {
          for (var i = sectionElements.length - 1; i >= 0; i--) {
            sectionIds.unshift($(sectionElements[i]).attr('id'));
          }
        };
        getSectionIds();
        // Configure Lazy load to not run automatically.
        $.extend($.lazyLoadXT, {
          autoInit: false,
          edgeY:  10000,
          visibleOnly: false
        });
        // Helper function so we can activate lazy load by section.
        var lazyloadSection = function(section, complete) {
          $(section).find('img[data-src],div[data-bg]').lazyLoadXT({oncomplete: complete});
        };
        // Initialize pagepiling.
        $('.js-pagepiling').pagepiling({
          menu: null,
          direction: 'vertical',
          verticalCentered: false,
          sectionsColor: [],
          anchors: sectionIds,
          scrollingSpeed: 700,
          easing: 'swing',
          loopBottom: false,
          loopTop: false,
          css3: true,
          navigation: false,
          normalScrollElements: null,
          normalScrollElementTouchThreshold: 5,
          touchSensitivity: 5,
          keyboardScrolling: true,
          sectionSelector: '.js-section',
          animateAnchor: false,

          //events
          onLeave: function(index, nextIndex, direction){
            // Actions when the user transitions to a new card.
            // Select the next active index section element by it's index.
            var nextActiveSection = nextIndex - 1;
            var sectionSelector = $('section.js-section').eq(nextActiveSection);
            lazyloadSection(sectionSelector);
            // Get all the animated items in the section.
            var animatedItems = sectionSelector.find('*.animated');
            var numberOfAnimatedItems = animatedItems.length;
            // Function to animate things in the viewport.
            function animateInSectionView() {
              for (var i = 0; i < numberOfAnimatedItems; i++) {
                if ($(animatedItems[i]).position().top < $(sectionSelector).height()){
                  $(animatedItems[i]).addClass('go');
                }
              }
            }
            // Run animations when the new card is initially visible.
            animateInSectionView();

            // Trigger all animation in view on scroll.
            sectionSelector.scroll(function () {
              animateInSectionView();
            });
            var dashboardButton = $('.js-dashboard-toggle', context);
            // Close the dashboard after arriving at destination.
            if (dashboardButton.hasClass('js-opened')) {
              dashboardButton.trigger('click', context);
            }
            // Highlight the active section in the nav.
            var activeId = sectionSelector.attr('id');
            var dashboardLinks = $('.dashboard__nav-list').find('a');
            for (var i = dashboardLinks.length - 1; i >= 0; i--) {
              // Trim hash tag
              var href = $(dashboardLinks[i]).attr('href');
              var trimmed = href.substring(1);
              if (trimmed === activeId) {
                $(dashboardLinks[i]).addClass('active');
              } else {
                $(dashboardLinks[i]).removeClass('active');
              }
            }
          },
          afterLoad: function(anchorLink, index){},
          afterRender: function(){
            // Complete lazy load on the first active section and hide the loader.
            var firstSection = $('.js-section.active');
            var hideLoader = function() {
              $('.js-loading').fadeOut(200);
            };
            lazyloadSection(firstSection, hideLoader());
          },
        });
        $('.js-next-page', context).click( function() {
          $.fn.pagepiling.moveSectionDown();
        });
      } else {
        // The user is on a page that is  not using pagepiling so we should lazy load with auto init.
        $.extend($.lazyLoadXT, {
          autoInit: true,
          visibleOnly: false,
          selector: 'img[data-src],div[data-bg]'
        });
      }

      // Start the word fade slider
      $('.js-wordslider').bxSlider({
        mode: 'fade',
        pager: false,
        auto: true,
        speed: 2000,
        pause: 3000
      });
    }
  };
})(jQuery, Drupal);

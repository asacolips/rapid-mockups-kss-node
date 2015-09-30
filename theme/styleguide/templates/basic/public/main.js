(function ($) {
    $(function () {

        var $window = $(window),
            $document = $(document),
            $content = $('.kss-content'),
            $sidebar = $('.kss-sidebar'),
            $sidebarInner = $('.kss-sidebar-inner'),
            $menu = $('.kss-menu'),
            $childMenu = $('.kss-menu-child'),
            $menuItem = $menu.find('.kss-menu-item'),
            $childMenuItem = $childMenu.find('.kss-menu-item'),
            ref = $menu.data('kss-ref'),
            prevScrollTop;

        // Dynamic menu activation
        function scrollSpy() {
            var scrollTop = $window.scrollTop(),
                $anchors = $childMenu.find('a'),
                activeIndex;
            $anchors.each(function (index) {
                var $target = $($(this).attr('href').replace(/\./g, '\\.')),
                    offsetTop = $target.offset().top - 50,
                    offsetBottom = offsetTop + $target.outerHeight(true);
                if (offsetTop <= scrollTop && scrollTop < offsetBottom) {
                    activeIndex = index;
                    return false;
                }
            });
            $childMenuItem.removeClass('kss-active');
            if (typeof activeIndex !== 'undefined') {
                $childMenuItem.eq(activeIndex).addClass('kss-active');
            }
        }

        // Fix sidebar position
        function fixSidebar() {
            if ($sidebarInner.outerHeight() < $content.outerHeight()) {
                $sidebar.addClass('kss-fixed');
                if ($sidebarInner.outerHeight() > $window.height()) {
                    $sidebar.height($window.height());
                    $window.on('scroll', scrollSidebar).trigger('scroll');
                }
                else {
                    $sidebar.height('auto');
                    $window.off('scroll', scrollSidebar);
                }
            }
            else {
                $sidebar.removeClass('kss-fixed');
                $sidebar.height('auto');
                $window.off('scroll', scrollSidebar);
            }
        }

        // Synchronize sidebar scroll
        function scrollSidebar(event) {
            if (event.handled !== true) {
                var scrollTop = $window.scrollTop(),
                    maxScrollTop = $document.height() - $window.height();
                if (scrollTop >= 0 && prevScrollTop >= 0 && scrollTop <= maxScrollTop && prevScrollTop <= maxScrollTop) {  // for Mac scrolling
                    $sidebar.scrollTop($sidebar.scrollTop() + (scrollTop - prevScrollTop));
                }
                prevScrollTop = scrollTop;
                event.handled = true;
            }
            else {
                return false;
            }
        }

        // Activate current page item
        $menuItem.eq(ref).addClass('kss-active');

        // Append child menu and attach scrollSpy
        if ($childMenu.length) {
            $childMenu.show().appendTo($menuItem.eq(ref));
            $window.on('scroll', scrollSpy).trigger('scroll');
        }

        // Fixed sidebar
        if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
            $window.on('resize', fixSidebar).trigger('resize');
        }

        // Syntax hightlignting with Rainbow.js
        $('code.html').attr('data-language', 'html');
        $('code.css').attr('data-language', 'css');
        $('code.less, code.scss').attr('data-language', 'generic');

        // Toggle menu JS used by the mobile menu component.
        // These JS classes must be added to both the menu
        // and menu button.å
        var $menu = $('.js-menu-toggle');
        var $menuButton = $('.js-menu-toggle-button');

        // Handle menu button clicking
        // This needs jQuery update to run.
        $menuButton.on('click', function(event) {
          var $self = $(this);

          // Toggle classes on menu and menu button.
          $self.toggleClass('site-menu__button--active');

          $self
            .parent()
            .parent()
            .find('.js-menu-toggle')
            .toggleClass('site-menu--expanded');
        });

        // Find the JS selector class and it's element.
        var $rtable = $('.js-responsive-table');

        // There might be more than one table with this class,
        // so it's best to loop through them.
        $rtable.each(function() {
            $self = $(this);
            var thdata = [];

            // Find every table heading within this table.
            var $headingtext = $self.find('th');

            // Add the text from each heading to an array.
            $headingtext.each(function() {
              thdata.push($(this).text());
            });

            // Find every table row within the table body.
            var $tablerow = $self.find('tbody tr');

            // For each row go through each td and add a data-attribute.
            $tablerow.each(function() {

                $cell = $(this).find('td');

                // Loop through each class and add it to it's respective cell.
                var i = 0;
                var j = thdata.length;
                for(; i < j; i++) {
                  // This isn't a jQuery object so we use the native JS HTMLElement.dataset property.
                  $cell[i].dataset.heading = thdata[i];
                }
            });
        });

    });
}(jQuery));
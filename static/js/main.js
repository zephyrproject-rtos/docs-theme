$(window).on("load",function () {
  // Execute code once the window is fully loaded.

  // Open and close nav menu with class
  $('#navigation-toggle').click(function(e) {
    e.preventDefault();
    $('#header').toggleClass('navigation-open');
  });

  // Open and close the search bar
  $('#header .search-toggle').click(function(e) {
    e.preventDefault();
    $('#header').toggleClass('search-open');
  });

  // Perform search actions
  $('#search-drupal, #search-docs').on('click', function(e) {
    e.preventDefault();
    var search_type = e.currentTarget.getAttribute('data-search');
    $('#search-container #search-type').val(search_type);
    $('#header-search-form').submit();
  });

  $('#header-search-form').submit(function(e) {
    e.preventDefault();
    var search_type = $('#search-container #search-type').val();
    var search_string = $('#search-container #search-input').val();
    doSearch(search_type, search_string);
  });

  $('#secondary-menu-button').click(function() {
    $('#sidebar-first').toggleClass('-expanded-submenu');
  });
});

function doSearch(type, query) {
  var query = encodeURIComponent(query);
  switch (type) {
    case 'search-drupal':
      window.location.href = '/search/site/' + query;
      break;
    case 'search-docs':
      window.location.href = '/doc/search.html?q=' + query + '&check_keywords=yes&area=default';
      break;
  }
}

/**
 * Targets are hiding behind the fixed header
 * Check an href for an anchor. If exists, and in document, scroll to it.
 * If href argument ommitted, assumes context (this) is HTML Element,
 * which will be the case when invoked by jQuery after an event
 */
function scroll_if_anchor(href) {
    href = typeof(href) == "string" ? href : $(this).attr("href");
    // Static value for now (maybe calculate header size dynamically?)
    var fromTop = 90;
    if(href.indexOf("#") == 0) { //i.e., target starts with a #
        // need to escape any "." in the ID (darn doxygen links)
        var $target = $(href.replace(/\./g, "\\."));
        if($target.length) { // Watch for empty references (e.g., just a #)
            $('html, body').animate({ scrollTop: $target.offset().top - fromTop });
            if(history && "pushState" in history) {
                history.pushState({}, document.title, window.location.pathname + href);
                return false;
            }
        }
    }
}

// When our page loads, check to see if it contains an anchor
scroll_if_anchor(window.location.hash);

// Intercept all anchor clicks
$("body").on("click", "a", scroll_if_anchor);

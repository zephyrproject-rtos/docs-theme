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

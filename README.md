# Personify.

- Configured to access the Personify. API endpoint at [http://personify-server.herokuapp.com/api](http://personify-server.herokuapp.com)
- Built with JavaScript, JQuery, AJAX, HTML, CSS

Example AJAX request:

    $.ajax({
      method: "post",
      url: "https://personify-server.herokuapp.com/api/v1/people",
      data: {
          name: name,
          favoriteCity: favoriteCity
        }
    ...    

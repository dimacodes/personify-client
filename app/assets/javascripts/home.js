$(document).on('ready', function() {
  $("body").on("click", "#get_people_btn", getPeople)
  $("body").on("click", "#post_person_btn", postPerson)
  $("body").on("click", "#update_person_btn", updatePerson)
  $("body").on("click", "#delete_person_btn", deletePerson)
});

function getPeople(e) {
  history.replaceState({}, document.title, ".");
  $.ajax({
    method: "get",
    url: "https://personify-server.herokuapp.com/api/v1/people",
    error: function(data, textStatus) {
      $("#get_people").empty().append("Please try again.")
    },
    success: function(data, textStatus) {
      $("#get_people").empty().append("<p>GET /people/:id</p>")
      data.forEach(function(person){
        var id = person.id
        var name_link = $(document.createElement("a"))
        name_link.attr('href', "https://personify-server.herokuapp.com/api/v1/people/" + parseInt(id))
        name_link.attr('class', "people").attr('id', id).attr('target', '_blank')
        name_link.text(person.name)
        $("#get_people").append(name_link).append("<br>")
      })
    }
  })
}

function postPerson(e) {
  e.preventDefault()
  var name = $("input[name*=post_name]").val()
  var favoriteCity = $("input[name*=post_favoriteCity]").val()
  $.ajax({
    method: "post",
    url: "https://personify-server.herokuapp.com/api/v1/people",
    data: {
        name: name,
        favoriteCity: favoriteCity
      },
    error: function(data, textStatus) {
      $("#post_message").empty().prepend("<br>").append("Please try again.")
      window.setTimeout(function(){location.reload()},2000)
    },
    success: function(data, textStatus) {
      if (data.errors){
        var error_info = "<h4>Not Added:</h4>"
          data.errors.forEach(function(info){
            if (info.id == "favoriteCity"){
              info.title = info.title.replace(/Favoritecity/i, 'Favorite city')
            }
            error_info += "<text style=font-weight:bold>" + info.id + ": " + "</text>"+ info.title + "<br>"
          })
        $("#post_message").empty().prepend("<br>").append(error_info)
      } else {
        var name_text = "name: " + data.name
        var city_text = "favoriteCity: " + data.favoriteCity
        $("#post_message").empty().prepend("<br>").append("<h4>Added:</h4>").append(name_text).append("<br>").append(city_text)
        window.setTimeout(function(){location.reload()},3000)
      }
    }
  })
}

function updatePerson(e) {
  e.preventDefault()
  var name = $("input[name*=put_name]").val()
  var favoriteCity = $("input[name*=put_favoriteCity]").val()
  $.ajax({
    method: "put",
    url: "https://personify-server.herokuapp.com/api/v1/people/1",
    data: {
        name: name,
        favoriteCity: favoriteCity
      },
    error: function(data, textStatus) {
      $("#update_message").empty().prepend("<br>").append("Looks like that person has been deleted.")
      window.setTimeout(function(){location.reload()},2000)
    },
    success: function(data, textStatus) {
      location.reload();
    }
  })
}

function deletePerson(e) {
  e.preventDefault()
  $.ajax({
    method: "delete",
    url: "https://personify-server.herokuapp.com/api/v1/people/1",
    error: function(data, textStatus){
      $("#delete_message").empty().append("<br>Looks like that person has been deleted.")
      window.setTimeout(function(){location.reload()},2000)
    },
    success: function(data, textStatus) {
      $("#delete_message").empty().prepend("<br>").append("<br>Person with an id of 1 has been deleted.")
      window.setTimeout(function(){location.reload()},2000)
    }
  })
}

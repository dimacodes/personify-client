$(document).on('ready', function() {
  $("body").on("click", "#get_people_btn", getPeople)
  $("body").on("click", "#post_person_btn", postPerson)
  $("body").on("click", "#update_person_btn", updatePerson)
  $("body").on("click", "#delete_person_btn", deletePerson)
  $("body").on("click", "#clear_btn", reload)
})

function getPeople(e) {
  history.replaceState({}, document.title, ".");
  $.ajax({
    method: "get",
    url: "https://personify-server.herokuapp.com/api/v1/people",
    error: function(data, textStatus, jqXHR) {
      $("#get_people").empty().prepend("<br>").append("Please try again")
    },
    success: function(data, textStatus, jqXHR) {
      $("#get_people").empty().prepend("<br>").append("<h4>Everybody:</h4>")
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
    error: function(data, textStatus, jqXHR) {
      $("#show_person").empty().prepend("<br>").append("Please try again")
    },
    success: function(data, textStatus, jqXHR) {
      if (data.errors){
        var error_info = "<h4>Not Added:</h4>"
          data.errors.forEach(function(info){
            if (info.id == "favoriteCity"){
              info.title = info.title.replace(/Favoritecity/i, 'Favorite city')
            }
            error_info += "<text style=font-weight:bold>" + info.id + ": " + "</text>"+ info.title + "<br>"
          })
        $("#show_person").empty().prepend("<br>").append(error_info)
      } else {
        var name_text = "name: " + data.name
        var city_text = "favoriteCity: " + data.favoriteCity
        $("#show_person").empty().prepend("<br>").append("<h4>Added:</h4>").append(name_text).append("<br>").append(city_text)
      }
    }
  })
}

function updatePerson(e) {
  var name = $("input[name*=put_name]").val()
  var favoriteCity = $("input[name*=put_favoriteCity]").val()
    $.ajax({
      method: "put",
      url: "https://personify-server.herokuapp.com/api/v1/people/1",
      data: {
        name: name,
        favoriteCity: favoriteCity
      },
      error: function(data, textStatus, jqXHR){
        var text = "Looks like that person has already been deleted"
        $("#update_person").empty().prepend("<br>").append(text)
      },
      success: function(data, textStatus, jqXHR) {
        if (data.errors){
          data.errors.forEach(function(info){
              text = "Sean's favoriteCity has been updated: <br>"
              if (info.id == "favoriteCity"){
                info.title = info.title.replace(/Favoritecity/i, 'Favorite city')
              }
              text += "<text style=font-weight:bold>" + info.id + ": " + "</text>" + info.title + "<br>"
            })
          } else {
            var text = data.name + "'s" + " The favoriteCity <br> is now:"
            text += "<p style=font-weight:bold>" + data.favoriteCity + "</p>"
        }
        $("#update_person").empty().prepend("<br>").append("<h4>Change Sean's Favorite City:</h4>").append(text)
      }
    })
}

function deletePerson(e) {
  $.ajax({
    method: "delete",
    url: "https://personify-server.herokuapp.com/api/v1/people/1",
    error: function(data, textStatus, jqXHR){
      $("#delete_message").empty().prepend("<br>").append("<br>Looks like that person has already been deleted")
    },
    success: function(data, textStatus, jqXHR) {
      $("#delete_message").empty().prepend("<br>").append("<br>Person with an id of 1 has been deleted")
    }
  })
}

function reload(e) {
  location.reload()
}

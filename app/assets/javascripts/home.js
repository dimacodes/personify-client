$(document).on('ready', function() {
  $("body").on("click", "#get_people_btn", getPeople)
  $("body").on("click", ".person", getPerson)
  $("body").on("click", "#post_person_btn", postPerson)
  $("body").on("click", "#update_person_btn", updatePerson)
  $("body").on("click", "#delete_person_btn", deletePerson)
});

function getPeople(e) {
  $.ajax({
    method: "get",
    url: "https://personify-server.herokuapp.com/api/v1/people",
    error: function(data) {
      $("#get_people").empty().append("Please try again.")
    },
    success: function(data) {
      $("#get_people").empty().append("<p>GET /people/:id</p>")
      data.forEach(function(person){
        var id = person.id
        var name = $(document.createElement("ui"))
        var favoriteCity = person.favoriteCity
        name.attr('class', "person")
        name.attr('id', id)
        name.text(person.name)
        $("#get_people").append(name).append("<br>")
      })
    }
  })
}

function getPerson(e) {
  $.ajax({
    method: "get",
    url: "https://personify-server.herokuapp.com/api/v1/people/" + this.id,
    error: function(data) {
      $("#get_message").empty().append("Please try again.")
    },
    success: function(data) {
      var nameText = "name: " + data.name
      var favoriteCityText = "favoriteCity: " + data.favoriteCity
      $("#get_message").empty().prepend("<br>").append("<h4>Person:</h4>").append(nameText).append("<br>").append(favoriteCityText)
      window.setTimeout(function(){location.reload()},3000)
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
    error: function(data) {
      $("#post_message").empty().prepend("<br>").append("Please try again.")
      window.setTimeout(function(){location.reload()},2000)
    },
    success: function(data) {
      var nameText = "name: " + data.name
      var favoriteCityText = "favoriteCity: " + data.favoriteCity
      $("#post_message").empty().prepend("<br>").append("<h4>Added:</h4>").append(nameText).append("<br>").append(favoriteCityText)
      window.setTimeout(function(){location.reload()},3000)
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
    error: function(data) {
      $("#update_message").empty().prepend("<br>").append("Looks like that person has been deleted.")
      window.setTimeout(function(){location.reload()},2000)
    },
    success: function(data) {
      location.reload();
    }
  })
}

function deletePerson(e) {
  e.preventDefault()
  $.ajax({
    method: "delete",
    url: "https://personify-server.herokuapp.com/api/v1/people/1",
    error: function(data){
      $("#delete_message").empty().append("<br>Looks like that person has been deleted.")
      window.setTimeout(function(){location.reload()},2000)
    },
    success: function(data) {
      $("#delete_message").empty().prepend("<br>").append("<br>Person with an id of 1 has been deleted.")
      window.setTimeout(function(){location.reload()},2000)
    }
  })
}

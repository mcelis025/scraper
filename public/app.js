// Grab the articles as a json
$.getJSON("/articles", function (data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#articles").append(
      "<br><h4 data-id='" +
        data[i]._id +
        "'>" +
        data[i].title +
        "</h4>" +
        "<p>" +
        data[i].summary +
        "</p>" +
        "<a target='_blank' href='" +
        data[i].link +
        "'>" +
        data[i].link +
        "</a>" +
        "<br>-------------------------------------<br />"
    );
  }
});

// Whenever someone clicks a h4 tag
$(document).on("click", "h4", function () {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId,
  })
    // With that done, add the note information to the page
    .then(function (data) {
      console.log(data);
      // The title of the article
      $("#notes").append("<h4>" + data.title + "</h4>");
      // An input to enter a new title
      $("#notes").append(
        "<input id='titleinput' name='title' placeholder='Note Title'>"
      );
      // A textarea to add a new note body
      $("#notes").append(
        "<textarea placeholder='Enter Note' class='mt-2' id='bodyinput' name='body'></textarea>"
      );
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append(
        "<button class='mt-2 btn btn-outline-danger' data-id='" +
          data._id +
          "' id='savenote'>Save Note</button>"
      );

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });
});

// When you click the savenote button
$(document).on("click", "#savenote", function () {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val(),
    },
  })
    // With that done
    .then(function (data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});

$(document).on("click", "#scrape", function (event) {
  event.preventDefault();

  $.get("/scrape", function () {
    alert("Articles Scraped!");
    location.reload();
  });
});

// $(document).on("click", "#favBtn", function (event) {
//   event.preventDefault();

//   $.get("#articles", function () {
//     alert("Added To Favorites");
//     location.reload();
//     fav = true;
//   });
  
// });

// $(document).on("click", "#removeBtn", function (event) {
//   event.preventDefault();

//   $.get("#articles", function () {
//     alert("Added To Favorites");
//     location.reload();
//     fav = true;
//   });
// });

// function handleArticleSave() {
//   var favArt = $(this).parents().data();
  
//   favArt.fav = true;
//   $.ajax({
//     method: 'PUT',
//     url: '/api/articleScraper/' + favArt._id,
//     data: favArt
//   }).then(function (data) {
//     if (data.fav){
//     }
//   });
// }
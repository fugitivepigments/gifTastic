var bugs = ["ants", "bees", "praying mantis", "dung beetle", "termites", "cicada"];

function displayBugGifs() {
  var bug = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + bug + "&api_key=MTEtzFSHPEm4xv77W0WXOVtqoErvppFq&limit=13&offset=0&&lang=en";

  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function(response) {
    $(".gif-view").html("");
    var results = response.data;
    for (var i = 0; i < results.length; i++) {

      var rating = results[i].rating;

      var pRated = $("<p>").text("Rating: " + rating);

      var animated = results[i].images.fixed_height.url;
      var still = results[i].images.fixed_height_still.url;

      var bugImage = $("<img>");
      bugImage.attr("src", still);
      bugImage.attr("data-still", still);
      bugImage.attr("data-animate", animated);
      bugImage.attr("data-state", "still");
      bugImage.addClass("bug-gif");

      $(".gif-view").append(bugImage, pRated);
    }

    console.log(response);
  })
};

//displaying bug gifs
function renderButtons() {

  $(".buttons-view").empty();

  for (var i = 0; i < bugs.length; i++) {
    //generate buttons
    var a = $("<button>");

    a.addClass("bug-btn");
    a.attr("data-name", bugs[i]);
    a.text(bugs[i]);
    $(".buttons-view").append(a);
  }
};

//bug button clicked
$("#add-bug").on("click", function(event) {
  event.preventDefault();
  //takes text from textbox
  var bug = $("#bug-input").val().trim();

  //adding bug from textbox to array
  bugs.push(bug);
  $("#bug-input").val("");
  renderButtons();
});


$(document).on("click", ".bug-gif", function() {
      var state = $(this).attr("data-state");

      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    })

    $(document).on("click", ".bug-btn", displayBugGifs);

    renderButtons();

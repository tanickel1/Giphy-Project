$(document).ready(function() {
	
	var movies = ["Hot Rod", 
	"Predator", 
	"Alien", 
	"Secret Life of Walter Mitty", 
	"This Is Spinal Tap",
	"Lord of the Rings",
	"Close Encounters of the 3rd Kind",
	"Enemey of the State",
	"Crazy, Stupid, Love", 
	];

function displayButtons(){
    $("#movieButtons").empty(); 
    for (var i = 0; i < movies.length; i++){
        var gifButton = $("<button>");
        gifButton.addClass("action");
        gifButton.addClass("btn btn-primary")
        gifButton.attr("data-name", movies[i]);
        gifButton.text(movies[i]);
        $("#movieButtons").append(gifButton);
    }
}

function addButton(){
    $("#add").on("click", function(){
    var movie = $("#movie-input").val().trim();
    if (movie == ""){
      return false; 
    }
    movies.push(movie);

    displayButtons();
    return false;
    });
};

function removeButton(){
    $("remove").on("click", function(){
    movies.pop(movie);
    displayButtons();
    return false;
    });
};

function displayGifs(){
    var movie = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=kaIwIaQ3ay90YNgjLNuWBf3lX5yBoKBp";
    console.log(queryURL); 
    $.ajax({
        url: queryURL,
        method: 'GET'
        })

    .done(function(response) {
        console.log(response); 
        $("#gifsView").empty(); 
        var results = response.data; 
        if (results == ""){
          alert("There isn't a gif for this selected button");
        }
        for (var i=0; i<results.length; i++){

            var gifDiv = $("<div>"); 
            gifDiv.addClass("gifDiv");
            
            var gifRating = $("<p>").text("Rating: " + results[i].rating);
            gifDiv.append(gifRating);
            
            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height_small_still.url); 
            gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); 
            gifImage.attr("data-animate",results[i].images.fixed_height_small.url); 
            gifImage.attr("data-state", "still"); 
            gifImage.addClass("image");
            gifDiv.append(gifImage);
            
            
            $("#gifsView").prepend(gifDiv);
        };
    });
};

displayButtons();
addButton();
removeButton();

$(document).on("click", ".action", displayGifs);
$(document).on("click", ".image", function(){
    var state = $(this).attr('data-state');
    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});
});




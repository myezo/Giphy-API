var buttonsArray = ["fox", "tiger", "lion", "bear", "shark", "goat", "dog", "cheetah", "cat"];
var createButton;


//create function that calls ajax and displays images

function displayGiphy() {
	var animal = $(this).attr("data-name");
	var apiKey = "&api_key=dc6zaTOxFJmzC";
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";
      // Performing an AJAX request with the queryURL
      $.ajax({
          url: queryURL,
          method: "GET"
        })
	    .done(function(response) {
	      console.log(response);

	      var results = response.data;
	      $('#gif-wrapper').empty();

	    /*********************************************
		loops through results and pulls the images and
		data we need
	    **********************************************/
	      for (var i = 0; i < results.length; i++) {
			var animalDiv = $("<div class='col-sm-3'>");
			var rating = results[i].rating;
            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + rating);
			var animalImage = $("<img>");
			animalImage.attr("src", results[i].images.downsized_still.url);
			animalImage.attr("src", results[i].images.downsized_still.url).addClass("animalImage");
			animalImage.attr("data-animated", results[i].images.downsized.url);
			animalImage.attr("data-state", "still");

			animalDiv.append(p);
			animalDiv.append(animalImage);

			$("#gif-wrapper").prepend(animalDiv);


			var state = $(this).attr("data-state");

			/****************************************************
			when the image is clicked change the attribute/source
			*****************************************************/

			 $(document).on("click","img", function() {
				
				$(this).attr("src", $(this).attr("data-animated"));
        		
			 });

			}

	    });
}

/*************************************************
create function that displays all buttons in array
**************************************************/
function displayButtons(){
	$("#buttons-div").empty();
	for(var i = 0; i < buttonsArray.length; i++){
		createButton = $('<button>');
		createButton.addClass("btn btn-info");
		createButton.addClass("animalButton");
		createButton.attr("data-name", buttonsArray[i]);
		createButton.text(buttonsArray[i]);
		$('#buttons-div').append(createButton);
	}
}


/*************************************************
create on click function that adds the value the user
types to the array and runs displayButtons function,
clears the div so the buttons don't repeat
**************************************************/
$("#submit-button").on("click", function(event) {
	event.preventDefault();
	var animalSubmit = $("#animal-input").val().trim();
	buttonsArray.push(animalSubmit);
	displayButtons();
	$('#animal-input').val('');
});



/*************************************************
on click function that displays gifs whenever the
animalButton class is clicked on
**************************************************/
$(document).on("click", ".animalButton", displayGiphy);

displayButtons();
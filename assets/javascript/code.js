var buttonsArray = ["fox", "tiger", "lion", "bear"];
var createButton;

//http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC 
function displayGiphy() {
	var animal = $(this).attr("data-name");
	var apiKey = "&api_key=dc6zaTOxFJmzC";
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=1";
      // Performing an AJAX request with the queryURL
      $.ajax({
          url: queryURL,
          method: "GET"
        })
	    .done(function(response) {
	      console.log(response);
	    });
	
	var results = response.data;
          // Looping through each result item
    for (var i = 0; i < results.length; i++) {
		var animalDiv = $("<div class='animals'>");
		var animalImage = $("<img>");
		animalImage.attr("src", results[i].images.fixed_height.url);
		animalDiv.append(animalImage);
	    // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
	    $("#gif-wrapper").prepend(animalDiv);
	}
}


function displayButtons(){
	$("#buttons-div").empty();
	for(var i = 0; i < buttonsArray.length; i++){
		createButton = $('<button>');
		createButton.addClass("animalButton");
		createButton.text(buttonsArray[i]);
		$('#buttons-div').append(createButton);
	}
}


$("#submit-button").on("click", function(event) {
	event.preventDefault();
	var animalSubmit = $("#animal-input").val().trim();
	buttonsArray.push(animalSubmit);
	displayButtons();
	$('#animal-input').val('');
});


$(document).on("click", ".animalButton", displayGiphy);

displayButtons();

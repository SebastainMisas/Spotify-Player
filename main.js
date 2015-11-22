//---------------------------------------------------------------------------------------------

$(document).on("ready", function () {
// When the user clicks search grab his input.

	$(".js-search").on("submit", function (event) {
		event.preventDefault()
	
// Defining all my variables to use in my ajax request to spotify api

		var errors = function() {
				console.log("error")
		};
// Getting the user input from what they entered and then adding it to the api query link. 
		var user_input = function () {
			var value = $(".js-search-input").val();
			var splited_value = value.split(" ");
			var final_value = splited_value.join("+");
			return(final_value);
		};
// If you click on the artist name it calles the modal in the html. 
		$(".artist").on("click", function (event) {
			event.currentTarget
			$("#js-modal").modal();
		});

// Making the request to spoify api using the users input.

		$.ajax({
			url: "https://api.spotify.com/v1/search?type=track&query=" + user_input(),
			success: addTracksToHtml,
			error: errors,
		});
	});
});

//-----------------------------------------------------------------------------------------------



// The function's purpose below is to grab individual track information and add it to the html for when spotify api request is successful.
// This function also contains code to call a modal for when user clicks artist name to see that artists information. 

function addTracksToHtml(result){
	$('.container').empty()
	result.tracks.items.forEach(function (track){
// I am making a specific frame for each of the tracks that were called in the request
		var tracks_frame = 
		'<div class="widget js-player-wrapper">\
			<div class="header">\
				<div class="btn-play disabled"></div>\
					<div class="metadata">\
						<p class="title">' + track.name + '</p>\
						<a href="#" data-toggle="modal" data-target="#js-modal" class="artist" data-artist=' + track.artists[0].href +  '>' + track.artists[0].name + '</a>\
																	\
						<div class="seekbar">\
						<progress class="prog-bar" value="5" max="30"></progress>\
						</div>\
					</div>\
				</div>\
				<div class="cover">\
					<img class="track-cover" src="'+ track.album.images[0].url +'">\
				</div>\
					\
			<audio class="js-player" src="'+ track.preview_url +'"></audio>\
		</div><br>';
											
// I am then appending each of these tracks. 
		$('.container').append(tracks_frame);
	});

// when user clicks the artist name make a request to put artists information in the modal
	$(".artist").on("click", function (event) {
		var currentClick = $(event.currentTarget);
		var currentArtist = currentClick.data('artist');
		$.ajax({
			url: currentArtist,
			success: function (result) {
				console.log(result)
				$(".modal-header h2").text(result.name);
				$(".js-artist-img").attr("src", result.images[0].url)
			},
		});

	});

// below are funtions for the button and progress bar to be in sync if user clicks on play or pause. 

	$(".btn-play").on("click", function (event) {
		var button = $(event.currentTarget)
		var audio = button.closest(".js-player-wrapper").find(".js-player")
		if (button.hasClass("playing")) {
			button.toggleClass('playing')
			audio.trigger('pause');
		}
		else {
			button.toggleClass('playing')
			audio.trigger('play');
		};
		function printTime (event) {
			var progressbar = button.closest('.js-player-wrapper').find('.prog-bar')
			var current = audio.prop('currentTime');
			progressbar.attr('value', current )
		};
		audio.on('timeupdate', printTime)
												  
	});
}
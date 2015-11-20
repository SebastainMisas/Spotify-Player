$(document).on("ready", function () {
	$(".js-search").on("submit", function (event) {
		event.preventDefault()
		var errors = function() {
				console.log("error")
		};
		var user_input = function () {
			var value = $(".js-search-input").val();
			var splited_value = value.split(" ");
			var final_value = splited_value.join("+");
			return(final_value);
		};


		$('.container').empty()
		$.ajax({
			url: "https://api.spotify.com/v1/search?type=track&query=" + user_input(),
			success: function (result){
				$('.container').empty()
				result.tracks.items.forEach(function (track){
					var tracks_frame = '<div class="widget js-player-wrapper">\
											<div class="header">\
												<div class="btn-play disabled"></div>\
												<div class="metadata">\
													 <p class="title">' + track.name + '</p>\
													 <p class="artist">' + track.artists[0].name + '</p>\
															\
													 <div class="seekbar">\
													   <progress value="5" max="30"></progress>\
													 </div>\
												</div>\
											</div>\
											<div class="cover">\
												<img class="track-cover" src="'+ track.album.images[0].url +'">\
											</div>\
													\
											<audio class="js-player" src="'+ track.preview_url +'"></audio>\
										</div><br>';

					$('.container').append(tracks_frame);
					
				});

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
											  
					});
			},
		error: errors,
		});
	});
});
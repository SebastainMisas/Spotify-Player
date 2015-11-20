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



		$.ajax({
			url: "https://api.spotify.com/v1/search?type=track&query=" + user_input(),
			success: function (result){
				result.tracks.items.forEach(function (track){
					$(".title").text(track.name);
					$(".artist").text(track.artists[0].name);
					$(".track-cover").attr("src", track.album.images[0].url);
				});
			},
			error: errors,
		})
		
	});
});
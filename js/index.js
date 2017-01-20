$(".search").on('click', function() {
	//add input value to wikipedia open search query string
	//https://en.wikipedia.org/w/api.php?action=opensearch&search=api&limit=2&namespace=0&format=xmlfm
	$.getJSON("https://en.wikipedia.org/w/api.php?action=opensearch&origin=*&search=" + $(".search-term").val() + "&namespace=0&format=json&callback=?", function(data) {
		console.log(data);
		$("ul").empty();
		//go through each elemt of the 2nd array
		$.each(data[1], function(index, value) {
			//consoloe.log to test that elemtns print out in desired order
			console.log(data[1][index]);
			console.log(data[2][index]);
			console.log(data[3][index]);
			//need a clear method before appenidn so the page stays clean
			$("#search-results").append("<li><a target=\"_blank\" href=\"" + data[3][index] + "\"><h2>" + data[1][index] + "</h2><p>" + data[2][index] + "</p></a></li>")
		});

	});
});

$(".random-search").on('click', function() {
	$.getJSON("https://en.wikipedia.org/w/api.php?action=query&list=random&rnlimit=1&format=json&callback=?", function(data) {
		//get the random pages id
		var id = data.query.random[0].id;
		console.log(data);
		console.log(id);
		$.getJSON("https://en.wikipedia.org/w/api.php?action=query&prop=info&pageids=" + id + "&inprop=url&format=json&callback=?", function(url) {
			console.log(url.query.pages[id].fullurl);
			//set the pages object full url property to be used as a link
			var link = url.query.pages[id].fullurl;
			//open a new window with the random article
			window.open(link);
		});

	});
});
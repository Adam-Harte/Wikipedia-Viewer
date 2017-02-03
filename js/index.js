$(".search").on('click', function() {
	//add input value to wikipedia open search query string
	//https://en.wikipedia.org/w/api.php?action=opensearch&search=api&limit=2&namespace=0&format=xmlfm
	$.getJSON("https://en.wikipedia.org/w/api.php?action=opensearch&origin=*&search=" + $(".search-term").val() + "&namespace=0&format=json&callback=?", function(data) {
		console.log(data);
		$("ul").empty();
		//go through each elemt of the 2nd array
		$.each(data[1], function(index, value) {		
			//need a clear method before appenidn so the page stays clean
			$("#search-results").append("<li class='list-group-item grey-background'><a style='text-decoration:none;'target=\"_blank\" href=\"" + data[3][index] + "\"><h2>" + data[1][index] + "</h2><p>" + data[2][index] + "</p></a></li>")
		});

	});
});

$(".random-search").on('click', function() {
	$.getJSON("https://en.wikipedia.org/w/api.php?action=query&origin=*&generator=random&grnnamespace=0&grnlimit=1&prop=info&inprop=url&format=json&callback=?", function(data) {
		$.each(data.query.pages, function(index, value){
			window.open(data.query.pages[index].fullurl);
		});
	});
});
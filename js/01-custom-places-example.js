function runExample3() {
    $("#custom-places").mapsed({
		showOnLoad: 	
		[
			// Random made up CUSTOM place
			{
				// flag that this place should have the tooltip shown when the map is first loaded
				autoShow: true,
				lat: 23.777176,
				lng: 90.399452,
				name: "Dhaka",
				street: "Gulistan,Dhaka",
				userData: 99
			}

		]
		
	});									
}


$(document).ready(function() {
	runExample3();
});



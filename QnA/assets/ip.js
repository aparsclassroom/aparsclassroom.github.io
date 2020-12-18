_ipgeolocation.enableSessionStorage(true);
		var a;
		var ip = sessionStorage.getItem("ip");
		var country_name = sessionStorage.getItem("country_name");
		var district = sessionStorage.getItem("district");
		var isp = sessionStorage.getItem("isp");
		var city = sessionStorage.getItem("city");
		var latitude = sessionStorage.getItem("latitude");
		var longitude = sessionStorage.getItem("longitude");
			   
			_ipgeolocation.makeAsyncCallsToAPI(false);
			_ipgeolocation.setFields("country_name,district,isp,city,latitude,longitude");
			_ipgeolocation.getGeolocation(handleResponse, "526af067ef3f42189359831d64f52dd1");
   
		function handleResponse(json) {
			ip = json.ip;
			country_name = json.country_name;
			district = json.district;
			isp = json.isp;
			city = json.city;
			latitude = json.latitude;
			longitude = json.longitude;
		}
				   
		$(document).ready(function() {
		    a = document.getElementById("ip-details").value = ("IP address : " +  ip + "\n" + "ISP Provider : " + isp + "\n" + "Latitude : " + latitude + "\n" + "Longitude : " + longitude + "\n" +  "Neigbourhood : " + district + "\n" + "City : " + city + "\n" + "Country : " + country_name);
        });
        function myFunction() {
            document.getElementById("ip-details").value = a;
          }
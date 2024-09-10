$.get("https://json.geoiplookup.io/", function (res) {
  var a =
    "IP Address : " +
    res.ip +
    "\n" +
    "ISP : " +
    res.isp +
    "\n" +
    "Organization : " +
    res.org +
    "\n" +
    "Hostname : " +
    res.hostname +
    "\n" +
    "Latitude : " +
    res.latitude +
    "\n" +
    "Longitude : " +
    res.longitude +
    "\n" +
    "Postal Code : " +
    res.postal_code +
    "\n" +
    "Neighbourhood : " +
    res.city +
    "\n" +
    "Region : " +
    res.region +
    "\n" +
    "District : " +
    res.district +
    "\n" +
    "Country Code : " +
    res.country_code +
    "\n" +
    "Country : " +
    res.country_name +
    "\n" +
    "Continent : " +
    res.continent_name +
    "\n" +
    "Timezone Name : " +
    res.timezone_name +
    "\n" +
    "Connection Tyoe : " +
    res.connection_type +
    "\n" +
    "ASN Organization : " +
    res.asn_org +
    "\n" +
    "ASN : " +
    res.asn +
    "\n" +
    "Currency Code : " +
    res.currency_code +
    "\n" +
    "Currency : " +
    res.currency_name;
  document.getElementById("ip-details").value = a;
});

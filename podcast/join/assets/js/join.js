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

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    if (user.displayName != null) {
      document.getElementById("logST").innerText = user.displayName;
      document.getElementById("Name").value = user.displayName;
    } else {
      document.getElementById("logST").innerText = "Dashboard";
    }
    document.getElementById("logST").href = "/shop/dashboard/";
  } else {
    document.getElementById("logST").href = "/shop/dashboard/login.html";
  }
});

const scriptURL =
  "https://script.google.com/macros/s/AKfycbyEgB5R-DQoYRkFb2WxDnEm6TUmTDgXclVpCF5WIXZU_XC8OldXms5MV-kFqb3hRJcA/exec";
const form = document.forms["uploadForm"];

form.addEventListener("submit", (e) => {
  document.getElementById("sub").disabled = true;
  document.getElementById("sub").innerText = "Submitting...";
  e.preventDefault();
  fetch(scriptURL, {
    method: "POST",
    body: new FormData(form),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      swal({
        title: data.title,
        icon: data.code,
        text: data.message,
        button: "Close",
      }).then(() => {
        return location.replace("/shop");
      });
    })

    .catch((e) => {
      swal({
        title: e.title,
        icon: e.code,
        text: e.message,
        button: "Okay ☹",
      });
    });
});

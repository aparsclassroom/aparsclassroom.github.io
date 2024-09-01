$(function () {
  $("#sibliingInfo").dynamicForm("#sibliingInfo", "#plus5", "#minus5", {
    limit: 10,
    formPrefix: "data",
    normalizeFullForm: false,
  });

  $("#sibliingInfo #minus5").on("click", function () {
    var initDynamicId = $(this)
      .closest("#sibliingInfo")
      .parent()
      .find("[id^='data']").length;
    if (initDynamicId === 2) {
      $(this).closest("#sibliingInfo").next().find("#minus5").hide();
    }
    $(this).closest("#sibliingInfo").remove();
  });
});

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
const scriptURL =
  "https://script.google.com/macros/s/AKfycbxFFOcZOolDDj9ew_xKf_5tDTA7h55W0sxIoOW_GGf2ikL_Z-ekRvy5oQbI1ueVpBg/exec";
const form = document.forms["sibling"];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  document.getElementById("submit").disabled = true;
  document.getElementById("submit").innerText = "Please Wait...";
  fetch(scriptURL, {
    method: "POST",
    body: new FormData(form),
  })
    .then((res) => {
      return res.json();
    })
    .then((b) => {
      if (b.code === 200) {
        swal({
          title: "সফলভাবে রেজিস্ট্রেশন সম্পন্ন !",
          icon: "success",
          text: "এখন আমরা তোমার অভিভাবকের সাথে মিটিং করব। তারপর তুমি নির্বাচিত হলে তোমাকে জানানো হবে। তাই চোখ রাখো Apar's Classroom গ্রুপে।",
          button: "Close",
        }).then(() => {
          return location.replace("/shop");
        });
      } else {
        swal({
          title: "Error",
          icon: "error",
          text: "Couldn't Submit! Please Try Again later.",
          button: "Okay ☹",
        }).then(() => {
          return location.reload();
        });
      }
    })

    .catch(() => {
      swal({
        title: "Error",
        icon: "error",
        text: "Couldn't Submit! Please Try Again later.",
        button: "Okay ☹",
      });
    });
});

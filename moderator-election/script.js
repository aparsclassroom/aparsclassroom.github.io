$(document).ready(function () {
  var base_color = "rgb(230,230,230)";
  var active_color = "#626A90";

  var child = 1;
  var length = $("section").length - 1;
  $("#prev").addClass("disabled");
  $("#submit").addClass("disabled");

  $("section").not("section:nth-of-type(1)").hide();
  $("section")
    .not("section:nth-of-type(1)")
    .css("transform", "translateX(100px)");

  var svgWidth = length * 200 + 24;
  $("#svg_wrap").html(
    '<svg version="1.1" id="svg_form_time" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 ' +
      svgWidth +
      ' 24" xml:space="preserve"></svg>',
  );

  function makeSVG(tag, attrs) {
    var el = document.createElementNS("http://www.w3.org/2000/svg", tag);
    for (var k in attrs) el.setAttribute(k, attrs[k]);
    return el;
  }

  for (i = 0; i < length; i++) {
    var positionX = 12 + i * 200;
    var rect = makeSVG("rect", { x: positionX, y: 9, width: 200, height: 6 });
    document.getElementById("svg_form_time").appendChild(rect);
    // <g><rect x="12" y="9" width="200" height="6"></rect></g>'
    var circle = makeSVG("circle", {
      cx: positionX,
      cy: 12,
      r: 12,
      width: positionX,
      height: 6,
    });
    document.getElementById("svg_form_time").appendChild(circle);
  }

  var circle = makeSVG("circle", {
    cx: positionX + 200,
    cy: 12,
    r: 12,
    width: positionX,
    height: 6,
  });
  document.getElementById("svg_form_time").appendChild(circle);

  $("#svg_form_time rect").css("fill", base_color);
  $("#svg_form_time circle").css("fill", base_color);
  $("circle:nth-of-type(1)").css("fill", active_color);

  $(".button").click(function () {
    $("#svg_form_time rect").css("fill", active_color);
    $("#svg_form_time circle").css("fill", active_color);
    var id = $(this).attr("id");
    if (id == "next") {
      $("#prev").removeClass("disabled");
      if (child >= length) {
        $(this).addClass("disabled");
        $("#submit").removeClass("disabled");
      }
      if (child <= length) {
        child++;
      }
    } else if (id == "prev") {
      $("#next").removeClass("disabled");
      $("#submit").addClass("disabled");
      if (child <= 2) {
        $(this).addClass("disabled");
      }
      if (child > 1) {
        child--;
      }
    }
    var circle_child = child + 1;
    $("#svg_form_time rect:nth-of-type(n + " + child + ")").css(
      "fill",
      base_color,
    );
    $("#svg_form_time circle:nth-of-type(n + " + circle_child + ")").css(
      "fill",
      base_color,
    );
    var currentSection = $("section:nth-of-type(" + child + ")");
    currentSection.fadeIn();
    currentSection.css("transform", "translateX(0)");
    currentSection.prevAll("section").css("transform", "translateX(-100px)");
    currentSection.nextAll("section").css("transform", "translateX(100px)");
    $("section").not(currentSection).hide();
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
  "https://script.google.com/macros/s/AKfycbw4Ni8ra9vnK6pcTHf6jBV5VY_PcR8GPT9hjjfdNi2Lx9ax4SzUj7hP0-HMxg91BteZFA/exec";
const form = document.forms["ModApplication"];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  document.getElementById("prev").style.display = "none";
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
          title: "Submitted!",
          icon: "success",
          text: "You've been successfully Applied for ASG Moderator Election 🥰 \n Plz Wait for further Notice",
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

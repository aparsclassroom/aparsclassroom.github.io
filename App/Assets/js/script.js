var a;
$(document).ready(function () {
  fetch("js/q1.json")
    .then((res) => {
      return res.json();
    })
    .then((loadedData) => {
      a = loadedData;
      (i1 = '<div class="card text-center">'), (m1 = 1);
      $.each(a, function (a, e) {
        (i1 += '<div class="col-md-15 well">'),
          (i1 += "<h3>" + e.Number + " " + e.Question + "</h3>"),
          (i1 += "<h4>টপিক : " + e.Topic + "</h4>"),
          (i1 +=
            "<a type='button' class='links' href=\"" +
            e.cardlink +
            '">' +
            "উত্তর" +
            "</a>"),
          (i1 += "</p></div>&nbsp;"),
          m1 % 2 == 0 && (i1 += '</div><div class="card text-center">'),
          m1++;
      }),
        (i1 += "</div>"),
        $("#all").html(i1);
    })
    .catch((err) => {
      console.error(err);
    });

  $("#txt-search").keyup(function () {
    var e = $(this).val();
    if ("" !== e) {
      var o = new RegExp(e, "i"),
        i = '<div class="card text-center">',
        m = 1;
      $.each(a, function (a, e) {
        (-1 == e.Question.search(o) &&
          -1 == e.Topic.search(o) &&
          -1 == e.Number.search(o)) ||
          ((i += '<div class="col-md-15 well">'),
          (i += "<h3>" + e.Number + " " + e.Question + "</h3>"),
          (i += "<h4>টপিক : " + e.Topic + "</h4>"),
          (i +=
            "<a type='button' class='links' href=\"" +
            e.cardlink +
            '">' +
            "উত্তর" +
            "</a>"),
          (i += "</p></div>&nbsp;"),
          m % 2 == 0 && (i += '</div><div class="card text-center">'),
          m++);
      }),
        (i += "</div>"),
        $("#filter-records").html(i);
    } else $("#filter-records").html("");
    if (
      document.getElementById("filter-records").innerHTML ==
      '<div class="card text-center"></div>'
    ) {
      document.getElementById("filter-records").innerHTML =
        "<p style=" +
        '"text-align: center;">এই টপিকের কোনো প্রশ্ন পাওয়া যায় নি 😶</p>';
      document.getElementById("status").style.display = "none";
      document.getElementById("all").style.display = "block";
    }
    if ("" == e) {
      document.getElementById("all").style.display = "block";
      document.getElementById("status").style.display = "none";
    }
  });
});
const n = document.getElementById("status");

function searchFunc() {
  n.innerText = "Searching...";
}

function resultFunc() {
  n.style.display = "block";
  n.innerText = "সার্চ সম্পন্ন 🥰";
  document.getElementById("all").style.display = "none";
  setTimeout(function () {
    n.style.display = "none";
  }, 2000);
}

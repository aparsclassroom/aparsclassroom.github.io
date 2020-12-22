$(document).ready(function() {
    var a = [
    {
        Number: "০১.",
        Question: "মহাকর্ষীয় বিভব ঋণাত্মক কেন?",
        Subject: "পদার্থবিজ্ঞান ১ম পত্র",
        chapter: "৬ষ্ঠ অধ্যায়",
        Topic: "মহাকর্ষীয় বিভব",
        link: "QnA/Q1.html"
    }, {
        Number: "০২.",
        Question: "আরেকটা প্রশ্ন?",
        Subject: "পদার্থবিজ্ঞান ১ম পত্র",
        chapter: "৬ষ্ঠ অধ্যায়",
        Topic: "আরেকটা টপিক",
        link: "QnA/Q1.html"
    }, {
        Number: "০৩.",
        Question: "নতুন আরেকটা প্রশ্ন?",
        Subject: "পদার্থবিজ্ঞান ১ম পত্র",
        chapter: "৬ষ্ঠ অধ্যায়",
        Topic: "অন্য আরেকটা টপিক",
        link: "QnA/Q1.html"
    }
];
    $("#txt-search").keyup(function() {
        var e = $(this).val();
        if ("" !== e) {
            var o = new RegExp(e, "i"),
                i = '<div class="card text-center">',
                m = 1;
            $.each(a, function(a, e) {
                -1 == e.Question.search(o) && -1 == e.Topic.search(o) && -1 == e.Number.search(o) || (i += '<div class="col-md-15 well">', i += "<h3>" + e.Number + " " + e.Question + "</h3>", i += '<h4>টপিক : ' + e.Topic + '</h4>', i += "<p>অধ্যায় : " + e.chapter + "  <br> বিষয় : " + e.Subject + "</p>", i += "<p>", i += "<a type='button' class='links' href=\"" + e.link + '">' + "উত্তর" + "</a>", i += "</p></div>&nbsp;", m % 2 == 0 && (i += '</div><div class="card text-center">'), m++)
            }), i += "</div>", $("#filter-records").html(i)
        } else $("#filter-records").html("");
        if (document.getElementById("filter-records").innerHTML == '<div class="card text-center"></div>') {
            document.getElementById("filter-records").innerHTML = '<p style=' + '"text-align: center;">এই টপিকের কোনো প্রশ্ন পাওয়া যায় নি 😶</p>';
            document.getElementById("status").style.display = "none";
            document.getElementById("all").style.display = "block";
        }
        if ("" == e) {
            document.getElementById("all").style.display = "block";
            document.getElementById("status").style.display = "none";
        }
    })
});
const n = document.getElementById("status");

function searchFunc() {
    n.innerText = "Searching...";
}

function resultFunc() {
    n.style.display = "block";
    n.innerText = "সার্চ সম্পন্ন 🥰";
    document.getElementById("all").style.display = "none";
    setTimeout(function() {
        n.style.display = "none";
    }, 2000)
}
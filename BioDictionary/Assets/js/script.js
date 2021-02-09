var a;
$(document).ready(function() {
    fetch('Data.json')
        .then((res) => {
            return res.json();
        })
        .then((loadedData) => {
            a = loadedData;
            ch = a[0].Chapter;
            sub = a[0].Subject;
            document.getElementById('Sub').innerHTML = `<h2 style="font-size:35px;text-align: center;font-family: Kalpurush;">${sub}</h2>`;
            document.getElementById('Chap').innerHTML = `<h3 style="font-size:35px;text-align: center;font-family: Kalpurush;">${ch}</h3>`;
            i1 = '<div class="card text-center">',
                m1 = 1;
            $.each(a, function(a, e) {
                (
                    i1 += '<div class="col-md-15 well">',
                    i1 += '<h3>Word No.' + e.num + '</h3>',
                    i1 += "<h3>" + e.Word + "</h3>",
                    i1 += '<h4>অর্থ : ' + e.Meaning + '</h4>',
                    i1 += '<p>ব্যাখ্যা : ' + e.Description + '</p>',
                    i1 += '<img class="rounded chobi" alt="nai" src="' + e.img + '">',
                    i1 += '<video controls><source src="' + e.video + '" type="video/mp4"></video>',
                    i1 += '<audio controls> <source src=" ' + e.Audio + '" type="audio/mpeg"> Your browser does not support the audio element. </audio>',
                    i1 += "</div>&nbsp;", m1 % 2 == 0 && (i1 += '</div><div class="card text-center">'),
                    m1++)
            }), i1 += "</div>", $("#all").html(i1)
        })
        .catch((err) => {
            console.error(err);
        });


    $("#txt-search").keyup(function() {
        var e = $(this).val();
        if ("" !== e) {
            var o = new RegExp(e, "i"),
                i = '<div class="card text-center">',
                m = 1;
            $.each(a, function(a, e) {
                -1 == e.Word.search(o) && -1 == e.num.search(o) || (i += '<div class="col-md-15 well">', i += "<h3>Word No. " + e.num + " " + e.Word + "</h3>", i += '<h4>অর্থ : ' + e.Meaning + '</h4>', i += '<p>ব্যাখ্যা : ' + e.Description + '</p>', i += '<img class="rounded chobi" alt="nai" src="' + e.img + '">',
                    i += '<video controls><source src="' + e.video + '" type="video/mp4"></video>',
                    i += '<audio controls> <source src=" ' + e.Audio + '" type="audio/mpeg"> Your browser does not support the audio element. </audio>', i += "</div>&nbsp;", m % 2 == 0 && (i += '</div><div class="card text-center">'), m++)
            }), i += "</div>", $("#filter-records").html(i)

        } else $("#filter-records").html("");
        if (document.getElementById("filter-records").innerHTML == '<div class="card text-center"></div>') {
            document.getElementById("filter-records").innerHTML = '<p style=' + '"text-align: center;">এই শব্দটি খুঁজে পাওয়া যায় নি 😶</p>';
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
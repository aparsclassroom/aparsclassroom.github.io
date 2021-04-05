var script_url = "https://script.google.com/macros/s/AKfycbxE6x0w5FZ605PQgeKxq-vGXN8fQ92YCwb967N-hwUheWyJjEaCCE3cCVO06-HA-JRq/exec";

function err() {
    fetch(script_url + "?action=read")
        .then(() => {
            load()
        })
        .catch(() => {
            document.getElementById("loader").style.visibility = "hidden";
            $("#re").css("visibility", "visible");
            document.getElementById('showData').innerHTML = "Please enter your first Exam Questions 🥰";
        })
}
err()

function load() {

    var url = script_url + "?action=read";

    $.getJSON(url, function(json) {

        var table = document.createElement("table");

        var header = table.createTHead();
        var row = header.insertRow(0);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        var cell8 = row.insertCell(7);
        var cell9 = row.insertCell(8);
        var cell10 = row.insertCell(9);
        var cell11 = row.insertCell(10);
        cell1.innerHTML = "<b>Time stamp</b>";
        cell2.innerHTML = "<b>Paper</b>";
        cell3.innerHTML = "<b>Chapter</b>";
        cell4.innerHTML = "<b>Episode</b>";
        cell5.innerHTML = "<b>MCQ</b>";
        cell6.innerHTML = "<b>Total Questions</b>";
        cell7.innerHTML = "<b>Note</b>";
        cell8.innerHTML = "<b>Modified</b>";
        cell9.innerHTML = "<b>Modified Total Questions</b>";
        cell10.innerHTML = "<b>Volunteer</b>";
        cell11.innerHTML = "<b>Status</b>";
        for (var i = 0; i < json.records.length; i++) {
            tr = table.insertRow(-1);

            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = json.records[i].timestamp;

            tabCell = tr.insertCell(-1);
            tabCell.innerHTML = json.records[i].Paper;

            tabCell = tr.insertCell(-1);
            tabCell.innerHTML = json.records[i].Chapter;

            tabCell = tr.insertCell(-1);
            tabCell.innerHTML = json.records[i].Episode;

            tabCell = tr.insertCell(-1);
            tabCell.innerHTML = json.records[i].MCQ;

            tabCell = tr.insertCell(-1);
            tabCell.innerHTML = json.records[i].Quantity;

            tabCell = tr.insertCell(-1);
            tabCell.innerHTML = json.records[i].Note;

            if (json.records[i].Modified === "") {
                tabCell = tr.insertCell(-1);
                tabCell.innerHTML = `<b style="color:grey;">N/A</b>`;
            } else {
                tabCell = tr.insertCell(-1);
                tabCell.innerHTML = json.records[i].Modified;
            }

            if (json.records[i].Modified_Quantity === "") {
                tabCell = tr.insertCell(-1);
                tabCell.innerHTML = `<b style="color:grey;">N/A</b>`;
            } else {
                tabCell = tr.insertCell(-1);
                tabCell.innerHTML = json.records[i].Modified_Quantity;
            }

            tabCell = tr.insertCell(-1);
            tabCell.innerHTML = json.records[i].Volunteer;


            if (json.records[i].Status === "") {
                tabCell = tr.insertCell(-1);
                tabCell.innerHTML = `<b style="color:red;">Pending...</b>`;
            } else {
                tabCell = tr.insertCell(-1);
                tabCell.innerHTML = `<b style="color:green;">${json.records[i].Status}</b>`;
            }
        }


        var divContainer = document.getElementById("showData");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
    });
}

document.getElementById('addU').addEventListener('click', () => {
    $('#insertMD').modal('hide')
    $("#re").css("visibility", "hidden");
    document.getElementById("loader").style.visibility = "visible";
    $('#mySpinner').addClass('spinner');
    var row2 = $("#Paper").val();
    var row3 = $("#Chapter").val();
    var row4 = $("#Episode").val();
    var row5 = $("#MCQ").val();
    var row6 = $("#Quantity").val();
    var row7 = $("#Note").val();
    var row8 = $("#Volunteer").val();
    var url = script_url + "?callback=ctrlq&ID=" + row2 + "/" + row3 + "/" + row4 + "&Paper=" + row2 + "&Chapter=" + row3 + "&Episode=" + row4 + "&MCQ=" + row5 + "&Quantity=" + row6 + "&Note=" + row7 + "&Volunteer=" + row8 + "&action=insert";
    var request = jQuery.ajax({

        crossDomain: true,
        url: url,
        method: "GET",
        dataType: "jsonp"
    });
    document.getElementById('insertF').reset()
})


function update_value() {
    $("#re").css("visibility", "hidden");
    document.getElementById("loader").style.visibility = "visible";

    var row2 = $("#cPaper").val();
    var row3 = $("#cChapter").val();
    var row4 = $("#cEpisode").val();
    var row5 = $("#Status").val();

    var url = script_url + "?callback=ctrlq&ID=" + row2 + "/" + row3 + "/" + row4 + "&Status=" + row5 + "&action=update";

    var request = jQuery.ajax({
        crossDomain: true,
        url: url,
        method: "GET",
        dataType: "jsonp"
    });
    $('#changeMD').modal('hide')
    document.getElementById('chgte').reset()
}


function change_value() {
    $("#re").css("visibility", "hidden");
    document.getElementById("loader").style.visibility = "visible";

    var row2 = $("#uPaper").val();
    var row3 = $("#uChapter").val();
    var row4 = $("#uEpisode").val();
    var row5 = $("#Modified").val();
    var row6 = $("#Modified_Quantity").val();

    var url = script_url + "?callback=ctrlq&ID=" + row2 + "/" + row3 + "/" + row4 + "&Modified=" + row5 + "&Modified_Quantity=" + row6 + "&action=change";

    var request = jQuery.ajax({
        crossDomain: true,
        url: url,
        method: "GET",
        dataType: "jsonp"
    });
    $('#updateMD').modal('hide')
    document.getElementById('updt').reset()
}

function delete_value() {
    $("#re").css("visibility", "hidden");
    document.getElementById("loader").style.visibility = "visible";
    $('#mySpinner').addClass('spinner');
    var row1 = $("#dPaper").val();
    var row2 = $("#dChapter").val();
    var row3 = $("#dEpisode").val();
    var url = script_url + "?callback=ctrlq&ID=" + row1 + "/" + row2 + "/" + row3 + "&action=delete";


    var request = jQuery.ajax({
        crossDomain: true,
        url: url,
        method: "GET",
        dataType: "jsonp"
    });
    document.getElementById('dlte').reset();
    $('#deleteMD').modal('hide');
}

function ctrlq(e) {
    $("#re").html(e.result);
    $("#re").css("visibility", "visible");
    read_value();
}




function read_value() {
    err()
    $("#re").css("visibility", "hidden");

    document.getElementById("loader").style.visibility = "visible";
    var url = script_url + "?action=read";

    $.getJSON(url, function(json) {

        var table = document.createElement("table");

        var header = table.createTHead();
        var row = header.insertRow(0);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        var cell8 = row.insertCell(7);
        var cell9 = row.insertCell(8);
        var cell10 = row.insertCell(9);
        var cell11 = row.insertCell(10);
        cell1.innerHTML = "<b>Time stamp</b>";
        cell2.innerHTML = "<b>Paper</b>";
        cell3.innerHTML = "<b>Chapter</b>";
        cell4.innerHTML = "<b>Episode</b>";
        cell5.innerHTML = "<b>MCQ</b>";
        cell6.innerHTML = "<b>Quantity</b>";
        cell7.innerHTML = "<b>Note</b>";
        cell8.innerHTML = "<b>Modified</b>";
        cell9.innerHTML = "<b>Modified Quantity</b>";
        cell10.innerHTML = "<b>Volunteer</b>";
        cell11.innerHTML = "<b>Status</b>";
        for (var i = 0; i < json.records.length; i++) {
            tr = table.insertRow(-1);

            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = json.records[i].timestamp;

            tabCell = tr.insertCell(-1);
            tabCell.innerHTML = json.records[i].Paper;

            tabCell = tr.insertCell(-1);
            tabCell.innerHTML = json.records[i].Chapter;

            tabCell = tr.insertCell(-1);
            tabCell.innerHTML = json.records[i].Episode;

            tabCell = tr.insertCell(-1);
            tabCell.innerHTML = json.records[i].MCQ;

            tabCell = tr.insertCell(-1);
            tabCell.innerHTML = json.records[i].Quantity;

            tabCell = tr.insertCell(-1);
            tabCell.innerHTML = json.records[i].Note;

            if (json.records[i].Modified === "") {
                tabCell = tr.insertCell(-1);
                tabCell.innerHTML = `<b style="color:grey;">Blank</b>`;
            } else {
                tabCell = tr.insertCell(-1);
                tabCell.innerHTML = json.records[i].Modified;
            }

            if (json.records[i].Modified_Quantity === "") {
                tabCell = tr.insertCell(-1);
                tabCell.innerHTML = `<b style="color:grey;">Blank</b>`;
            } else {
                tabCell = tr.insertCell(-1);
                tabCell.innerHTML = json.records[i].Modified_Quantity;
            }

            tabCell = tr.insertCell(-1);
            tabCell.innerHTML = json.records[i].Volunteer;


            if (json.records[i].Status === "") {
                tabCell = tr.insertCell(-1);
                tabCell.innerHTML = `<b style="color:red;">Pending...</b>`;
            } else {
                tabCell = tr.insertCell(-1);
                tabCell.innerHTML = `<b style="color:green;">${json.records[i].Status}</b>`;
            }
        }

        var divContainer = document.getElementById("showData");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
        document.getElementById("loader").style.visibility = "hidden";
        $("#re").css("visibility", "visible");
    });
}
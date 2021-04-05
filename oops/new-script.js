var script_url = "https://script.google.com/macros/s/AKfycbw_JO_v6uJPQiwcm4DeKuidQdLP1OrfRudulsjo__HrcdyyHVAZUwMlaEh0-0tu29VW0Q/exec";

function err() {
    fetch(script_url + "?action=read")
        .then(() => {
            load()
        })
        .catch(() => {
            document.getElementById("loader").style.visibility = "hidden";
            $("#re").css("visibility", "visible");
            document.getElementById('showData').innerHTML = "Please enter your first Video 🥰";
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
        cell1.innerHTML = "<b>Time stamp</b>";
        cell2.innerHTML = "<b>Paper</b>";
        cell3.innerHTML = "<b>Chapter</b>";
        cell4.innerHTML = "<b>Episode</b>";
        cell5.innerHTML = "<b>Video Link</b>";
        cell6.innerHTML = "<b>Description</b>";
        cell7.innerHTML = "<b>Pdf</b>";
        cell8.innerHTML = "<b>Instructor</b>";
        cell9.innerHTML = "<b>Final Edited Video</b>";
        cell10.innerHTML = "<b>Status</b>";
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

            if (json.records[i].Video_Link === "") {
                tabCell = tr.insertCell(-1);
                tabCell.innerHTML = `<b style="color:Red;">Blank 💔</b>`;
            } else {
                tabCell = tr.insertCell(-1);
                tabCell.innerHTML = `<a href="${json.records[i].Video_Link}" target="_blank">click here</a>`;
            }
            if (json.records[i].Description === "") {
                tabCell = tr.insertCell(-1);
                tabCell.innerHTML = `<b style="color:grey;">Blank</b>`;
            } else {
                tabCell = tr.insertCell(-1);
                tabCell.innerHTML = json.records[i].Description;
            }

            if (json.records[i].Pdf === "") {
                tabCell = tr.insertCell(-1);
                tabCell.innerHTML = `<b style="color:grey;">Blank</b>`;
            } else {
                tabCell = tr.insertCell(-1);
                tabCell.innerHTML = `<a href="${json.records[i].Pdf}" target="_blank">click here</a>`;
            }

            tabCell = tr.insertCell(-1);
            tabCell.innerHTML = json.records[i].Instructor;
            if (json.records[i].Final_Video === "") {
                tabCell = tr.insertCell(-1);
                tabCell.innerHTML = `<b style="color:red;">Pending...</b>`;
            } else {
                tabCell = tr.insertCell(-1);
                tabCell.innerHTML = `<a href="${json.records[i].Final_Video}" target="_blank">click here</a>`;
            }


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
    var row5 = $("#Video_Link").val();
    var row6 = $("#Description").val();
    var row7 = $("#Pdf").val();
    var row8 = $("#Instructor").val();
    var url = script_url + "?callback=ctrlq&ID=" + row2 + "/" + row3 + "/" + row4 + "&Paper=" + row2 + "&Chapter=" + row3 + "&Episode=" + row4 + "&Video_Link=" + row5 + "&Description=" + row6 + "&Pdf=" + row7 + "&Instructor=" + row8 + "&action=insert";
    var request = jQuery.ajax({

        crossDomain: true,
        url: url,
        method: "GET",
        dataType: "jsonp"
    });
    document.getElementById('insertF').reset()
})


function status() {
    $("#re").css("visibility", "hidden");
    document.getElementById("loader").style.visibility = "visible";

    var row2 = $("#cPaper").val();
    var row3 = $("#cChapter").val();
    var row4 = $("#cEpisode").val();
    var row5 = $("#Status").val();

    var url = script_url + "?callback=ctrlq&ID=" + row2 + "/" + row3 + "/" + row4 + "&Status=" + row5 + "&action=status";

    var request = jQuery.ajax({
        crossDomain: true,
        url: url,
        method: "GET",
        dataType: "jsonp"
    });
    $('#StatusMD').modal('hide')
    document.getElementById('updt').reset()
}


function update_value() {
    $("#re").css("visibility", "hidden");
    document.getElementById("loader").style.visibility = "visible";

    var row2 = $("#uPaper").val();
    var row3 = $("#uChapter").val();
    var row4 = $("#uEpisode").val();
    var row5 = $("#Final").val();

    var url = script_url + "?callback=ctrlq&ID=" + row2 + "/" + row3 + "/" + row4 + "&Final_Video=" + row5 + "&action=update";

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
        cell1.innerHTML = "<b>Time stamp</b>";
        cell2.innerHTML = "<b>Paper</b>";
        cell3.innerHTML = "<b>Chapter</b>";
        cell4.innerHTML = "<b>Episode</b>";
        cell5.innerHTML = "<b>Video Link</b>";
        cell6.innerHTML = "<b>Description</b>";
        cell7.innerHTML = "<b>Pdf</b>";
        cell8.innerHTML = "<b>Instructor</b>";
        cell9.innerHTML = "<b>Final Edited Video</b>";
        cell10.innerHTML = "<b>Status</b>";
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
            if (json.records[i].Video_Link === "") {
                tabCell = tr.insertCell(-1);
                tabCell.innerHTML = `<b style="color:Red;">Blank 💔</b>`;
            } else {
                tabCell = tr.insertCell(-1);
                tabCell.innerHTML = `<a href="${json.records[i].Video_Link}" target="_blank">click here</a>`;
            }

            if (json.records[i].Description === "") {
                tabCell = tr.insertCell(-1);
                tabCell.innerHTML = `<b style="color:grey;">Blank</b>`;
            } else {
                tabCell = tr.insertCell(-1);
                tabCell.innerHTML = json.records[i].Description;
            }

            if (json.records[i].Pdf === "") {
                tabCell = tr.insertCell(-1);
                tabCell.innerHTML = `<b style="color:grey;">Blank</b>`;
            } else {
                tabCell = tr.insertCell(-1);
                tabCell.innerHTML = `<a href="${json.records[i].Pdf}" target="_blank">click here</a>`;
            }

            tabCell = tr.insertCell(-1);
            tabCell.innerHTML = json.records[i].Instructor;
            if (json.records[i].Final_Video === "") {
                tabCell = tr.insertCell(-1);
                tabCell.innerHTML = `<b style="color:red;">Pending...</b>`;
            } else {
                tabCell = tr.insertCell(-1);
                tabCell.innerHTML = `<a href="${json.records[i].Final_Video}" target="_blank">click here</a>`;
            }

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
var script_url = "https://script.google.com/macros/s/AKfycbwBcbQ7TfA64Lk49hp2_7YSUXmkDBsRAUEjV2eMpfzztm-Zhtxfhsqj9j7Ifd0pllfmMA/exec";




// Make an AJAX call to Google Script
function insert_value() {

    $("#re").css("visibility", "hidden");
    document.getElementById("loader").style.visibility = "visible";
    $('#mySpinner').addClass('spinner');
    var row1 = $("#Name").val();
    var row2 = $("#Email").val();
    var row3 = $("#Password").val();
    var row4 = $("#UID").val();
    var row5 = $("#Status").val();

    var url = script_url + "?callback=ctrlq&Name=" + row1 + "&Email=" + row2 + "&Password=" + row3 + "&UID=" + row4 + "&Status=" + row5 + "&action=insert";
    console.log(url);


    var request = jQuery.ajax({

        crossDomain: true,
        url: url,
        method: "GET",
        dataType: "jsonp"
    });
    console.log(request);
}







function update_value() {
    $("#re").css("visibility", "hidden");
    document.getElementById("loader").style.visibility = "visible";

    var Email = $("#Email").val();
    var Name = $("#Name").val();
    var Password = $("#Password").val();
    var UID = $("#UID").val();
    var Status = $("#Status").val();
    var url = script_url + "?callback=ctrlq&Name=" + Name + "&Email=" + Email + "&Password=" + Password + "&UID=" + UID + "&Status=" + Status + "&action=update";


    var request = jQuery.ajax({
        crossDomain: true,
        url: url,
        method: "GET",
        dataType: "jsonp"
    });

    console.log(request);
}

function delete_value() {
    $("#re").css("visibility", "hidden");
    document.getElementById("loader").style.visibility = "visible";
    $('#mySpinner').addClass('spinner');
    var Email = $("#Email").val();
    var Name = $("#name").val();
    var url = script_url + "?callback=ctrlq&name=" + Name + "&Email=" + Email + "&action=delete";


    var request = jQuery.ajax({
        crossDomain: true,
        url: url,
        method: "GET",
        dataType: "jsonp"
    });
    console.log(request);
}




// print the returned data
function ctrlq(e) {
    console.log(e);
    $("#re").html(e.result);
    $("#re").css("visibility", "visible");
    read_value();
}




function read_value() {

    $("#re").css("visibility", "hidden");

    document.getElementById("loader").style.visibility = "visible";
    var url = script_url + "?action=read";

    $.getJSON(url, function(json) {

        // Set the variables from the results array

        // CREATE DYNAMIC TABLE.
        var table = document.createElement("table");



        var header = table.createTHead();
        //Es el correspondiente a una columna en la tabla
        var row = header.insertRow(0);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        // Es el Titulo de cada columna
        cell1.innerHTML = "<b>Time stamp</b>";
        cell2.innerHTML = "<b>Name</b>";
        cell3.innerHTML = "<b>Email</b>";
        cell4.innerHTML = "<b>Password</b>";
        cell5.innerHTML = "<b>UID</b>";
        cell6.innerHTML = "<b>Status</b>";
        console.log(json.records);
        for (var i = 0; i < json.records.length; i++) {
            tr = table.insertRow(-1);

            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = json.records[i].Time_stamp;

            tabCell = tr.insertCell(-1);
            tabCell.innerHTML = json.records[i].Name;

            tabCell = tr.insertCell(-1);
            tabCell.innerHTML = json.records[i].Email;

            tabCell = tr.insertCell(-1);
            tabCell.innerHTML = json.records[i].Password;

            tabCell = tr.insertCell(-1);
            tabCell.innerHTML = json.records[i].UID;

            tabCell = tr.insertCell(-1);
            tabCell.innerHTML = json.records[i].Status;
        }


        // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
        var divContainer = document.getElementById("showData");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
        document.getElementById("loader").style.visibility = "hidden";
        $("#re").css("visibility", "visible");
    });
}
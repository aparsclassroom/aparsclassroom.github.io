const product = "MMV 1st Paper (1st half)";
const productCode = "130";
const appl = "https://www.facebook.com/groups/817393515748735";

firebase.auth().onAuthStateChanged(function(e) {
    if (e) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            "product": product,
            'uid': e.uid
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`https://${shopName}/${productCode}/purchase`, requestOptions)
            .then(response => {
                return response.json()
            })
            .then(result => {
                if (result.code === 200) {
                    var data = result.data[0];
                    if (data.Enrollment != "enrolled") {
                        document.getElementById('info').innerHTML = `
                    <h3>Purchase Information</h3>
                    Invoice : ${data.invoice}<br>
                    Product : ${data.ProductName}<br>
                    Paid Amount : ${data.amount} ৳ <br>
                    Username : ${data.Name}<br>
                    Group Joining ID : <span id="pass">${data.tran_id}</span>&nbsp;&nbsp;&nbsp;<button id="cpBtn" class="cp btn btn-success d-print-none" data-clipboard-target="#pass">Copy ID</button><br>
                    Email : ${data.email}<br>
                    Phone No. ${data.phone}<br>
                    College : ${data.College}<br>
                    HSC : ${data.HSC}<br>
                    Purchased at : ${data.time}<br><br>
                    Secret Group Link : <br><a href="${appl}" target="_blank">${appl}</a>
                    <br><br>
                    <h3>Your Group Join request should be approved in 24-48 hours.<br> so please have patience.</h3>
                    `;

                    } else {
                        document.getElementById('info').innerHTML = `
                    <h3>Enrollment Information</h3>
                    Invoice : ${data.invoice}<br>
                    Product : ${data.ProductName}<br>
                    Paid Amount : ${data.amount} ৳ <br>
                    Username : ${data.Name}<br>
                    Group Joining ID : <span id="pass">${data.tran_id}</span><br>
                    Email : ${data.email}<br>
                    Phone No. ${data.phone}<br>
                    College : ${data.College}<br>
                    HSC : ${data.HSC}<br>
                    Purchased at : ${data.time}<br><br>
                    Secret Group Link : <br><a href="${appl}" target="_blank">${appl}</a><br><br>
                    Status : You are Currently joined in the Facebook Group !
                    <br><br>
                    `;
                    }

                    var clipboard = new ClipboardJS('.cp');
                    clipboard.on('success', function(e) {
                        alert("Copied successfully!!")
                        document.getElementById('cpBtn').innerText = "Copied !";
                        e.clearSelection();
                    });

                    clipboard.on('error', function(e) {
                        alert('Action:', e.action);
                    });
                } else {
                    location.replace("./");
                }
            }).catch(() => {
                location.replace("./");
            })
    } else {
        location.replace("./");
    }
})
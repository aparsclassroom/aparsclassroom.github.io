firebase.auth().onAuthStateChanged(function(e) {
    if (e) {
        const Cycle = location.pathname.split('/')[3];
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            "product": product,
            'uid': e.uid,
            "cycle": Cycle
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
                    document.getElementById('info').innerHTML = `
                    <h3>Purchase Information</h3>
                    Invoice : ${data.Invoice}<br>
                    Product : ${data.ProductName}<br>
                    Access : ${data.Cycle}<br>
                    Discount Coupon : ${data.DiscountCupon}<br>
                    Paid Amount : ${data.currency_amount} ৳ <br>
                    Username : ${data.CustomerName}<br>
                    Joining Id : <span id="pass">${data.tran_id}</span>&nbsp;&nbsp;&nbsp;<button id="cpBtn" class="cp btn btn-success d-print-none" data-clipboard-target="#pass">Copy Joining Id </button><br>
                    Email : ${data.value_b}<br>
                    Phone No. ${data.value_c}<br>
                    HSC : ${data.HSC}<br>
                    Purchased at : ${data.Timestamp}<br><br>
                    Secret Group Link : <br><a href="${appl}" target="_blank">${appl}</a>
                    <br><br>
                    <h3>Your Group Join request should be approved in 24-48 hours.<br> so please have patience.</h3>
                    <br><br>
                    <h3>WebApp Credentials</h3>
                                WebApp Link : <a href="${WebApp}" target="_blank">${WebApp}</a><br>
                                Joining Id  : <span id="pass2">${data.tran_id}</span>&nbsp;&nbsp;&nbsp;<button id="cpBtn2" class="cp btn btn-success d-print-none" data-clipboard-target="#pass2">Copy Joining Id </button><br>
                    `;
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
            })
    } else {
        location.replace("/shop/dashboard/login.html");
    }
})
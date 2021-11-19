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
                    document.getElementById('info').innerHTML = `
                        <h3>Purchase Information</h3>
                        Invoice : ${data.invoice}<br>
                        Product : ${data.ProductName}<br>
                        Paid Amount : ${data.amount} ৳ <br>
                        Username : ${data.Name}<br>
                        Password : <span id="pass">${data.tran_id}</span>&nbsp;&nbsp;&nbsp;<button id="cpBtn" class="cp btn btn-success d-print-none" data-clipboard-target="#pass">Copy Passoword</button><br>
                        Email : ${data.email}<br>
                        Phone No. ${data.phone}<br>
                        College : ${data.College}<br>
                        HSC : ${data.HSC}<br>
                        Purchased at : ${data.time}<br><br>
                        Secret Group Link : <br><a href="${appl}" target="_blank">${appl}</a>
                        <br><br>
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
            }).catch(() => {
                location.replace("./");
            })
    } else {
        location.replace("./");
    }
})
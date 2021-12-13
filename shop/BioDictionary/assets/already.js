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

        fetch(`https://${shopName}/${productCode}/invoice`, requestOptions)
            .then(response => {
                return response.json()
            })
            .then(result => {
                if (result.code === 200) {
                    var data = result.data;
                    document.getElementById('info').innerHTML = `
                    <h3>Purchase Information</h3>
                    Product : ${data.ProductName}<br>
                    Discount Coupon : ${data.Coupon}<br>
                    Paid Amount : ${data.currency_amount} ৳ <br>
                    Username : ${data.Name}<br>
                    Password : <span id="pass">${data.tran_id}</span>&nbsp;&nbsp;&nbsp;<button id="cpBtn" class="cp btn btn-success d-print-none" data-clipboard-target="#pass">Copy Passoword</button><br>
                    Email : ${data.Email}<br>
                    Phone No. ${data.Phone}<br>
                    Purchased at : ${data.Timestamp}<br><br>
                    App Group Link : <br><a href="${data.Webapp}" target="_blank">${data.Webapp}</a>
                    `;

                } else {
                    location.replace("./");
                }
            })
    } else {
        location.replace("/shop/dashboard/login.html");
    }
})


var clipboard = new ClipboardJS('.cp');
clipboard.on('success', function(e) {
    alert("Copied successfully!!")
    document.getElementById('cpBtn').innerText = "Copied !";
    e.clearSelection();
});

clipboard.on('error', function(e) {
    alert('Action:', e.action);
});
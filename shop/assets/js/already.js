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

        fetch("https://asg-shop.herokuapp.com/purchase", requestOptions)
            .then(response => {
                return response.json()
            })
            .then(result => {
                if (result.code === 200) {
                    var data = result.data;
                    document.getElementById('info').innerHTML = `
                    <h3>Purchase Information</h3>
                    Invoice : ${data.Invoice}<br>
                    Product : ${data.ProductName}<br>
                    Discount Cupon : ${data.DiscountCupon}<br>
                    Paid Amount : ${data.currency_amount} ৳ <br>
                    Username : ${data.CustomerName}<br>
                    Transaction Id : ${data.tran_id}<br>
                    Email : ${data.value_b}<br>
                    Phone No. ${data.value_c}<br>
                    College : ${data.College}<br>
                    HSC : ${data.HSC}<br>
                    Timestamp : ${data.Timestamp}
                    `;
                } else {
                    location.replace("./");
                }
            })
    } else {
        location.replace("./");
    }
})
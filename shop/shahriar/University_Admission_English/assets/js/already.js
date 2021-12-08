const product = "University Admission English (A+B+C+D Unit)";
const productCode = "145";
const appl = "https://www.facebook.com/groups/287167813345651";

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
                        Product : Medical [ English+GK ]<br>
                        Paid Amount : ${data.amount} ৳ <br>
                        Username : ${data.Name}<br>
                        Group Joining Id : <span id="pass">${data.tran_id}</span>&nbsp;&nbsp;&nbsp;<button id="cpBtn" class="cp btn btn-success d-print-none" data-clipboard-target="#pass">Copy Id</button><br>
                        Email : ${data.email}<br>
                        Phone No. ${data.phone}<br>
                        College : ${data.College}<br>
                        HSC : ${data.HSC}<br>
                        Purchased at : ${data.time}<br><br>
                        Secret Group Link : <br><a href="${appl}" target="_blank">${appl}</a>
                        <br><br>
                        `;
                } else {
                    location.replace("./");
                }
            }).catch(() => {
                location.replace("./");
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
firebase.auth().onAuthStateChanged(function(e) {
    if (e) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            'uid': e.uid
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`https://${shopName}.herokuapp.com/${productCode}/purchase`, requestOptions)
            .then(response => {
                return response.json()
            })
            .then(result => {
                if (result.code === 200) {
                    var data = result.data;

                    const sum = data.map(element => element.access);
                    const sum2 = data.map(el => el.amount).reduce((c, d) => c + d, 0);
                    document.getElementById('info').innerHTML = `
                    <h3>Enrollment Information</h3>
                    Invoice : ${data[0].invoice}<br>
                    Product : ${data[0].ProductName}<br>
                    Total Paid Amount : ${sum2} ৳ <br>
                    Username : ${data[0].Name}<br>
                    Email : ${data[0].email}<br>
                    Phone No. ${data[0].phone}<br>
                    College : ${data[0].College}<br>
                    Batch : ${data[0].HSC}<br>
                    Date : ${data[0].time}<br><br><hr>
                    <h3>WebApp Credentials</h3>
                    WebApp Link : <a href="${WebApp}" target="_blank">${WebApp}</a><br>
                    Email : <span id="email">${data[0].email}</span>&nbsp;&nbsp;&nbsp;<button id="cpBtn" class="cp btn btn-danger d-print-none" data-clipboard-target="#email">Copy Email</button><br><br>
                    Password : <span id="pass2">${data[0].tran_id}</span>&nbsp;&nbsp;&nbsp;<button id="cpBtn2" class="cp btn btn-success d-print-none" data-clipboard-target="#pass2">Copy Password</button><br><hr>
                    <h3>Enrolled Clusters</h3>
                    `;
                    sum.forEach((element, idx) => {
                        idx++
                        document.getElementById('all').innerHTML += `${idx}. ${element}<br>`;
                    });

                    var clipboard = new ClipboardJS('.cp');
                    clipboard.on('success', function(e) {
                        alert("Copied successfully!!")
                        e.clearSelection();
                    });

                    clipboard.on('error', function(e) {
                        alert('Action:', e.action);
                    });
                } else {
                    location.replace("./");
                }

            })
            .catch((err) => {
                alert(err)
                return location.replace("./");
            })
    } else {
        location.replace("./");
    }
})
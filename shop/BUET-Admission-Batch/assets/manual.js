const product = "BUET Admission Batch'21";
const purl = "https://asg-shop.herokuapp.com/112/init";
const appl = "https://www.facebook.com/groups/aparchinmoyadmission21/";
var search = document.getElementById('search');
var searchBtn = document.getElementById('searchBtn');
var result = document.getElementById('result');
searchBtn.addEventListener('click', () => {
    result.innerHTML = "<img src='https://thumbs.gfycat.com/DearWellinformedDalmatian-size_restricted.gif' class='roun' width='100%'>";
    fetch('https://script.google.com/macros/s/AKfycbwvF8jbq4w7f9smhmISRNgGsm94YUeibeXEYd9zDiuYYPrNHZ28_SHw_jh9xbmJ4Z7QyQ/exec?phone=' + search.value.trim())
        .then((res) => {
            return res.json()
        })
        .then((loadedData) => {
            if (loadedData.data.Status != "enrolled") {
                fetch("https://script.google.com/macros/s/AKfycbx8SdZ0cNTKMN7VQN4rbz4sK6aTgCJlt3tsNi0Vm3Dq3GGB9wKlInFY9fzgLn4olkcY2A/exec?phone=" + loadedData.data.phone + "&Rank=" + loadedData.data.Ranking)
                    .then(response => {
                        return response.json()
                    }).then(resp => {
                        if (resp.code === 200) {
                            if (resp.data.status != "valid") {
                                swal({
                                    title: resp.title,
                                    icon: "info",
                                    text: resp.message,
                                    button: "OK"
                                }).then(() => {
                                    var data = resp.data;
                                    document.getElementById('met').innerHTML = "";
                                    result.innerHTML = `
                                    <h3 class="text-center">Payment Information</h3>
                    Serial No. ${data.Serial}<br>
                    <h5 class="text-danger">Payment Status : Pending</h5>
                    <br>
                    Username : ${data.Name}<br>
                    Phone No. ${data.phone}<br><br>
                    <strong class="text-danger">Ranking : ${loadedData.data.Ranking}</strong><br>
                    <strong class="text-danger">Email : ${data.Email}</strong><br>
                    <br>
                    <strong>Tranx ID : <span id="tranx">${data.tranx}</span></strong>
                    <br><br>
                    Timestamp : ${data.Timestamp}<br><br>
                    `;
                                })
                            } else {
                                swal({
                                    title: "Payment Vadidated !",
                                    icon: resp.icon,
                                    text: resp.message,
                                    button: "OK"
                                }).then(() => {
                                    var data = resp.data;
                                    document.getElementById('met').innerHTML = "";
                                    result.innerHTML = `
                                    <h3 class="text-center">Verified Payment Information</h3>
                    Invoice No. ${data.Serial}<br>
                    <span class="text-succes">Payment Status. ${data.status}</span><br>
                    <br>
                    Username : ${data.Name}<br>
                    Phone No. ${data.phone}<br><br>
                    <strong class="text-danger">Ranking : ${loadedData.data.Ranking}</strong><br>
                    <strong class="text-danger">Email : ${data.Email}</strong><br>
                    <br>
                    <strong>Joining ID : <span id="tranx">${data.tranx}</span></strong>&nbsp;&nbsp;&nbsp;<button id="cpBtn" class="cp btn btn-success" data-clipboard-target="#tranx">Copy ID</button>
                    <br><br>
                    Timestamp : ${data.Timestamp}<br><br>
                    Secret Group Link : <br><a href="${appl}" target="_blank">${appl}</a>
                    `;
                                })
                            }

                        } else {
                            document.getElementById('welc').innerHTML = "Hello " + loadedData.data.Name + " & Your Rank #" + loadedData.data.Ranking;
                            $('#myModal').modal('toggle');

                            document.getElementById('form').addEventListener('submit', (e) => {
                                e.preventDefault()
                                let bkash = document.getElementById('bkash');
                                let gateway = document.getElementById('gateway');
                                let tranx = document.getElementById('tranx');
                                var myHeaders = new Headers();
                                myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

                                var urlencoded = new URLSearchParams();
                                urlencoded.append("Name", loadedData.data.Name);
                                urlencoded.append("Email", loadedData.data.Email);
                                urlencoded.append("Phone Number", loadedData.data.phone);
                                urlencoded.append("Tranx ID", tranx.value.trim());
                                urlencoded.append("Rank", loadedData.data.Ranking);
                                urlencoded.append("User Bkash", bkash.value.trim());
                                urlencoded.append("Gateway", gateway.value.trim());

                                var requestOptions = {
                                    method: 'POST',
                                    headers: myHeaders,
                                    body: urlencoded,
                                    redirect: 'follow'
                                };

                                fetch("https://script.google.com/macros/s/AKfycbx8SdZ0cNTKMN7VQN4rbz4sK6aTgCJlt3tsNi0Vm3Dq3GGB9wKlInFY9fzgLn4olkcY2A/exec", requestOptions)
                                    .then(response => response.json())
                                    .then(result => {
                                        swal({
                                            title: result.title,
                                            icon: result.code,
                                            text: result.message,
                                            button: "OK"
                                        }).then(() => {
                                            return location.reload()
                                        })
                                    })
                                    .catch(error => {
                                        swal({
                                            title: error.title,
                                            icon: error.code,
                                            text: error.message,
                                            button: "OK"
                                        }).then(() => {
                                            return location.reload()
                                        })
                                    });
                            })

                        }
                    })
            } else {
                swal({
                    title: "Already Enrolled !",
                    icon: "info",
                    button: "OK"
                }).then(() => {
                    fetch("https://script.google.com/macros/s/AKfycbx8SdZ0cNTKMN7VQN4rbz4sK6aTgCJlt3tsNi0Vm3Dq3GGB9wKlInFY9fzgLn4olkcY2A/exec?phone=" + loadedData.data.phone + "&Rank=" + loadedData.data.Ranking)
                        .then(response => {
                            return response.json()
                        }).then(resp => {
                            document.getElementById('met').innerHTML = "";
                            var data = resp.data;
                            result.innerHTML = `
                            <h3 class="text-center">Enrollment Information</h3>
                            Invoice No. ${data.Serial}<br>
                            <span class="text-succes">Payment Status. ${data.status}</span><br>
                            <br>
                            Username : ${data.Name}<br>
                            Phone No. ${data.phone}<br><br>
                            <strong class="text-danger">Ranking : ${loadedData.data.Ranking}</strong><br>
                            <strong class="text-danger">Email : ${data.Email}</strong><br>
                            <br>
                            <strong>Joining ID : <span id="tranx">${data.tranx}</span></strong>&nbsp;&nbsp;&nbsp;<button id="cpBtn" class="cp btn btn-success" data-clipboard-target="#tranx">Copy ID</button>
                            <br><br>
                            Timestamp : ${data.Timestamp}<br><br>
                            Secret Group Link : <br><a href="${appl}" target="_blank">${appl}</a>
                            `;
                        })
                })
            }

        })
        .catch(() => {
            swal({
                title: "Oh no..",
                icon: "error",
                text: "তোমার নাম আমাদের তালিকায় পাওয়া যায়নি! 😥\nনিচের বাটনে ক্লিক করে এক্সাম দিয়ে কোর্সে এনরোল করে ফেলো 😍",
                button: "Start Exam"
            }).then(() => {
                return location.replace('https://rebrand.ly/PhyAdmission');
            })
        })

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
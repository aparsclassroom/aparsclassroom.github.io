const product = "BUET Admission Batch'21";
const appl = "https://www.facebook.com/groups/aparchinmoyadmission21/";
var search = document.getElementById('search');
var searchBtn = document.getElementById('searchBtn');
var result = document.getElementById('result');
var chatbox = document.getElementById('fb-customer-chat');
chatbox.setAttribute("page_id", "109191567987688");
chatbox.setAttribute("attribution", "biz_inbox");
window.fbAsyncInit = function() {
    FB.init({
        xfbml: true,
        version: 'v10.0'
    });
};

(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
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
                            swal({
                                title: 'Hello ' + data.Name,
                                icon: "info",
                                text: 'Click Proceed Payment button to redirect to the automatic payment page.',
                                button: "Proceed Payment"
                            }).then(() => {
                                return location.replace('./');
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
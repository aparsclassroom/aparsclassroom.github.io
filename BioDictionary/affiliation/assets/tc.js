var Mobile = document.getElementById('Mobile');
var Bkash = document.getElementById('bkash');
var Nagad = document.getElementById('nagad');
var Rocket = document.getElementById('rocket');
const theme = localStorage.getItem('biotheme');
const bg = document.getElementById('bioT');
if (theme == "true") {
    bg.classList.remove("white-content");
} else {
    bg.classList.add("white-content");
}
const api = "https://script.google.com/macros/s/AKfycbzO1yH2WpIRspklxuWocyOryzf3qQopsfRY_OO97nqc40XjU9PV8joKdkOm28qNOHxoYg/exec";

function initApp() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            free = user.isAnonymous;
            if (free === true) {
                alert("It is a premium feature");
                location.replace("../");
                return;
            } else {

                fetch(api + "?q=payments&uid=" + user.uid)
                    .then((res) => {
                        return res.json();
                    })
                    .then((loadedData) => {
                        if (loadedData.code === 200) {
                            let data = loadedData.data;
                            document.getElementById('token').innerHTML = `
                        Your Username : ${data[0].Name}<br>
                        Your Email Address : ${data[0].Email}<br>
                        Your Affiliate Token : ${data[0].token}
                        `;
                            var news = data.sort(function(a, b) { return b.Invoice - a.Invoice })
                            news.forEach(element => {
                                document.getElementById('pay').innerHTML += `
                            <div class="row">
                            <div class="col-md-6 ml-auto mr-auto">
                              <div class="card">
                                <div class="card-body text-center">
                                <img src="/shop/assets/images/mobile-payment.svg" height="100px"><h3 style="margin-bottom:10px" class="mt-2 text-center">Invoice : ${element.Invoice}</h3>
                                <h4 class="text-primary">Amount : ${element.Amount} ৳</h4>
                                Affiliate Bkash Number : ${element.Bkash}<br>
                                Month : ${element.Month} - ${element.Year}<br>
                                <strong class="text-danger">Status : ${element.Status}</strong> 
                                </div>
                                <div class="card-footer text-center">
                                Issued By : ${element.Issuer}<br>
                                ${element.Timestamp}
                                </div>
                              </div>
                            </div>
                          </div>
            
                            `;
                            });


                        } else {
                            document.getElementById('token').innerHTML = loadedData.message;
                        }
                    })
                    .catch((e) => {
                        document.getElementById('token').innerHTML = "Server Error <br>" + e.message;
                    })
            }
        } else {
            location.replace("../");
        }
    })
}
window.onload = function() {
    initApp();
};
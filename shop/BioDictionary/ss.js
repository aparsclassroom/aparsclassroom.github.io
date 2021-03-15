document.getElementById('href').value = window.location.href;
var str = window.location.search;
var res = str.substring(1, 16);
if (localStorage.getItem(product) === "") {
    localStorage.setItem(product, res);
}
if (res === "") {
    document.getElementById('aff').value = localStorage.getItem(product)

} else {
    document.getElementById('aff').value = res
    localStorage.setItem(product, res);

}
$.get('https://json.geoiplookup.io/', function(res) {
    var a = ("IP Address : " + res.ip + "\n" + "ISP : " + res.isp + "\n" + "Organization : " + res.org + "\n" + "Hostname : " + res.hostname + "\n" + "Latitude : " + res.latitude + "\n" + "Longitude : " + res.longitude + "\n" + "Postal Code : " + res.postal_code + "\n" + "Neighbourhood : " + res.city + "\n" + "Region : " + res.region + "\n" + "District : " + res.district + "\n" + "Country Code : " + res.country_code + "\n" + "Country : " + res.country_name + "\n" + "Continent : " + res.continent_name + "\n" + "Timezone Name : " + res.timezone_name + "\n" + "Connection Tyoe : " + res.connection_type + "\n" + "ASN Organization : " + res.asn_org + "\n" + "ASN : " + res.asn + "\n" + "Currency Code : " + res.currency_code + "\n" + "Currency : " + res.currency_name);
    document.getElementById("ip-details").value = a;
});

const scriptURL = 'https://script.google.com/macros/s/AKfycbwHWOaJuvYuj2zn4SwfvpT7Gw91fatM2uVhjL1r4kes-I1XYHNA7ZGT_AuS8ifoJGQ/exec'
const form = document.forms['BioDictionary']

form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, {
            method: 'POST',
            body: new FormData(form)
        })
        .then(response => alert("You've been successfully Applied for 1 Year Subscription 🥰 \n Plz Wait for a manual Verification\n\nWhen verification process is completed we will email you.\nThis may take upto 24 hours (highest)"))
        .then(response => window.location.replace("https://facebook.com/maheyan.mridul/"))

    .catch(error => console.error('Error!', error.message))
})


firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        var phoneNumber = user.phoneNumber;
        document.getElementById('Contact-Number').value = phoneNumber;
        document.getElementById('app').style.display = "none";
        document.getElementById('cup').style.display = "block";
    } else {
        document.getElementById('app').style.display = "block";
        document.getElementById('cup').style.display = "none";
    }
});

document.getElementById('app').addEventListener('click', (e) => {
    e.preventDefault();
    document.location.href = "../index.html";
})
var cpn = document.getElementById('cpnCheck');
var cupon;

function func() {
    cupon = document.getElementById('cupon').value;
}

function suc() {
    if (document.getElementById("cupon").value === "") {
        document.getElementById('cpnCheck').disabled = true;
    } else {
        document.getElementById('cpnCheck').disabled = false;
    }
}
cpn.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('cupon').value = "Checking";
    const pls = 150;
    const igs = 'QUtmeWNieFZESnF6WXY2bU1tN3lOMnFmTGVWNWJsekQ4QTBaNTRMT1ZJOHZ0TmpjdEkyU0M0NnhMaXJEb0lYM09xd0xJUTF6WWc=';
    fetch('https://script.google.com/macros/s/' + window.atob(igs) + '/exec')

    .then((res) => {
            return res.json();
        })
        .then((loadedData) => {
            loadedData.find(dashboard => {
                var ss = dashboard.Cupon
                var cn = window.atob(ss)
                var sr = cupon.trim();
                var str = sr.toUpperCase()
                if (cn === str) {
                    document.getElementById('cupon').style.display = "none";
                    cpn.style.display = "none";
                    var nes = pls - dashboard.Off;
                    document.getElementById('price').value = nes;
                    document.getElementById('prs').value = nes;
                    document.getElementById('sprice').innerText = nes;
                    document.getElementById('cupn').value = cupon;
                    document.getElementById('smp').innerHTML = "<del style='color:red'> 150 ৳ </del> " + nes;
                    alert('successfully applied!')
                    return;
                } else {
                    document.getElementById('cupon').value = "Code not Valid";
                    alert('Code not valid')
                }
            })
        }).catch((err => {
            console.log(err)
        }))

})
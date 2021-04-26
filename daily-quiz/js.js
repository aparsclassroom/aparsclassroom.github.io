const scriptURL = 'https://script.google.com/macros/s/AKfycbwYyUltiANM3Uf2j_V0YAy7tZYcfpEYhUl_x-c_A8Qxj65dAPN1VQiZLP5dJtefm67G/exec';
fetch('https://json.geoiplookup.io/')
    .then((r) => {
        return r.json();
    })
    .then((res) => {
        var a = ("IP Address : " + res.ip + "\n" + "ISP : " + res.isp + "\n" + "Organization : " + res.org + "\n" + "Hostname : " + res.hostname + "\n" + "Latitude : " + res.latitude + "\n" + "Longitude : " + res.longitude + "\n" + "Postal Code : " + res.postal_code + "\n" + "Neighbourhood : " + res.city + "\n" + "Region : " + res.region + "\n" + "District : " + res.district + "\n" + "Country Code : " + res.country_code + "\n" + "Country : " + res.country_name + "\n" + "Continent : " + res.continent_name + "\n" + "Timezone Name : " + res.timezone_name + "\n" + "Connection Tyoe : " + res.connection_type + "\n" + "ASN Organization : " + res.asn_org + "\n" + "ASN : " + res.asn + "\n" + "Currency Code : " + res.currency_code + "\n" + "Currency : " + res.currency_name);
        document.getElementById("ip-details").value = a;
    })
    .catch(() => {
        document.getElementById("ip-details").value = "No Ip Address Found 💔";
    });
const form = document.forms['qna']

form.addEventListener('submit', e => {
    document.getElementById('send').innerText = "Please Wait...";
    document.getElementById('send').disabled = true;
    e.preventDefault()
    fetch(scriptURL, {
            method: 'POST',
            body: new FormData(form)
        })
        .then((res) => {
            return res.json();
        })
        .then(() => {
            swal({
                title: "Submitted",
                icon: "success",
                text: "Your Daily Quiz has been successfully submitted 🥰",
                button: "Close"
            }).then(() => {
                form.reset();
                return location.replace('https://facebook.com/aparsclassroom');
            })
        })

    .catch((e) => {
        swal({
            title: e.title,
            icon: e.code,
            text: e.message,
            button: "Okay ☹"
        })
    })
})
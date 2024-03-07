firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        if (user.displayName != null) {
            document.getElementById('prof').innerHTML = '<i class="fas fa-user-circle"></i>&nbsp;' + user.displayName;
        } else {
            document.getElementById('prof').innerHTML = "<i class='fas fa-user-circle'></i>&nbsp;Dashboard";
        }
        document.getElementById('prof').href = "/shop/dashboard/";
    } else {
        document.getElementById('prof').href = "/shop/dashboard/login?signInSuccessUrl=" + encodeURIComponent(location.href);
    }
});


if(document.location.host == "www.apars.shop") {
    document.getElementById('tradeLicense').innerHTML = "Trade License: TRAD/DNCC/035825/2023";
    document.getElementById('supMail').innerHTML = "support@apars.shop";
}
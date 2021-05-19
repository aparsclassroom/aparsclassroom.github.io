firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        if (user.displayName != null) {
            document.getElementById('logST').innerText = user.displayName;
        } else {
            document.getElementById('logST').innerText = "Dashboard";
        }
        document.getElementById('logST').href = "/shop/dashboard/";
    } else {
        document.getElementById('logST').href = "/shop/dashboard/login.html";
    }

})
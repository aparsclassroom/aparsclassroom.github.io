firebase.auth().onAuthStateChanged(function(e) {
    if (e) {
        fetch(`https://${shopName2}/access/${productCode}/${e.uid}`, requestOptions)
            .then(response => {
                return response.json()
            })
            .then(data => {
                if (data.status == "success") {
                    console.log(data.course)
                } else {
                }
            })
            .catch(err => {
                console.log(err);
            }
        );
    } else {
       location.replace(`https://${shopName2}/${productCode}`);
    }
});

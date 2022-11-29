firebase.auth().onAuthStateChanged(function(e) {
    if (e) {
        fetch(`https://${shopName2}/access/${productCode}/${e.uid}`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log(data.course)
                if (data.status == "success") {
                    console.log(data.course)
                } else {
                  //  location.replace(`https://${shopName2}/${productCode}`);
                }
            })
            .catch(err => {
                console.log(err);
            }
        );
    } else {
       location.replace(`/shop/dashboard/login`);
    }
});

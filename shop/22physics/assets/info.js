firebase.auth().onAuthStateChanged(function(e) {
    if (e) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            "product": product,
            'uid': e.uid
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`https://${shopName}.herokuapp.com/${productCode2}/purchase`, requestOptions)
            .then(response => {
                return response.json()
            })
            .then(result => {
                if (result.code === 200) {
                    localStorage.removeItem(product)
                    let data = result.data;
                    const sum = data.map(element => element.access).reduce((a, b) => a + b, 0);
                    if (sum > 0.5) {
                        swal({
                            title: result.message,
                            icon: "success",
                            button: "View Informations"
                        }).then(() => {
                            return location.replace("./purchased")
                        })
                    } else {
                        swal({
                            title: "Your 50% payment Remaining !",
                            icon: "info",
                            button: "OK"
                        }).then(() => {
                            return location.replace("./half")
                        })
                    }
                } else {
                    document.getElementById('meta').innerHTML = "তোমার পেমেন্ট সিস্টেম সিলেক্ট করো। তুমি চাইলে এককালীন ৫০০০ টাকা দিতে পারো।<br> আবার ৩০০০ টাকা দিয়ে ভর্তি হতে পারো। তবে ২ মাসের মধ্যে তোমাকে আরও ৩০০০ টাকা দিতে হবে।";
                    document.getElementById('full').href = "./full";
                    document.getElementById('half').href = "./half";
                }
            })
            .catch(() => {
                document.getElementById('meta').innerHTML = "তোমার পেমেন্ট সিস্টেম সিলেক্ট করো। তুমি চাইলে এককালীন ৫০০০ টাকা দিতে পারো।<br> আবার ৩০০০ টাকা দিয়ে ভর্তি হতে পারো। তবে ২ মাসের মধ্যে তোমাকে আরও ৩০০০ টাকা দিতে হবে।";
                document.getElementById('full').href = "./full";
                document.getElementById('half').href = "./half";
            })

    } else {
        document.getElementById('meta').innerHTML = "Please Login First !"
        document.getElementById('full').href = "../dashboard/login";
        document.getElementById('half').href = "../dashboard/login";
    }
})
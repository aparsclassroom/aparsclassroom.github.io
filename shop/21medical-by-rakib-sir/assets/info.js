firebase.auth().onAuthStateChanged(function(e) {
    if (e) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            "uid": e.uid
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        const productCode = "127";
        fetch(`https://${shopName}.herokuapp.com/${productCode}/purchase`, requestOptions)
            .then(response => {
                return response.json()
            })
            .then(result => {
                if (result.code === 200) {
                    let data = result.data;
                    const sum = data.map(element => element.access).reduce((a, b) => a + b, 0);
                    if (sum > 0.5) {
                        swal({
                            title: "100% Payment Completed !",
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
                            document.getElementById('meta').innerHTML = "<strong>তোমার ৪০০০ টাকা বকেয়া রয়েছে।</strong><br>নিচের ১ম বাটনে ক্লিক করে তুমি তোমার ১ম পেমেন্ট সংক্রান্ত তথ্য পেয়ে যাবে। <br>২য় বাটনে ক্লিক করে ২য় পেমেন্টের টাকা পরিশোধ করতে পারবে।"
                            document.getElementById('full').href = "./purchased";
                            document.getElementById('full').innerText = "Payment Information";
                            document.getElementById('half').href = "./half";
                            document.getElementById('half').innerText = "২য় কিস্তির টাকা পরিশোধ করব";
                        })
                    }
                } else {
                    document.getElementById('meta').innerHTML = "তোমার পেমেন্ট সিস্টেম সিলেক্ট করো। তুমি চাইলে এককালীন ৮০০০ টাকা দিতে পারো।<br> আবার ৪০০০ টাকা দিয়ে ভর্তি হতে পারো। তবে ২ মাসের মধ্যে তোমাকে আরও ৪০০০ টাকা দিতে হবে।";
                    document.getElementById('full').href = "./full";
                    document.getElementById('half').href = "./half";
                }
            })
            .catch(() => {
                document.getElementById('meta').innerHTML = "তোমার পেমেন্ট সিস্টেম সিলেক্ট করো। তুমি চাইলে এককালীন ৮০০০ টাকা দিতে পারো।<br> আবার ৪০০০ টাকা দিয়ে ভর্তি হতে পারো। তবে ২ মাসের মধ্যে তোমাকে আরও ৪০০০ টাকা দিতে হবে।";
                document.getElementById('full').href = "./full";
                document.getElementById('half').href = "./half";
            })

    } else {
        document.getElementById('meta').innerHTML = "Please Login First !"
        document.getElementById('full').href = "../dashboard/login";
        document.getElementById('half').href = "../dashboard/login";
    }
})
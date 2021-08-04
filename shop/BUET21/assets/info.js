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

        fetch(`https://${shopName}.herokuapp.com/${productCode}/purchase`, requestOptions)
            .then(response => {
                return response.json()
            })
            .then(result => {
                if (result.code === 200) {
                    localStorage.removeItem(product)
                    let data = result.data
                    const sum = data.map(element => element.access);
                    document.getElementById('meta').innerHTML = "যে ক্লাস্টারে এনরোল হতে চাও সিলেক্ট করো।";

                    if (sum.includes('cluster 1')) {
                        document.getElementById('c1').innerHTML = "ক্লাস্টার ১ (Enrolled)";
                        document.getElementById('c1').href = "./purchased.html";
                    } else {
                        document.getElementById('c1').href = "./Cluster-1/";
                    }
                    if (sum.includes('cluster 2')) {
                        document.getElementById('c2').innerHTML = "ক্লাস্টার ২ (Enrolled)";
                        document.getElementById('c2').href = "./purchased.html";
                    } else {
                        document.getElementById('c2').href = "./Cluster-2/";
                    }
                    if (sum.includes('cluster 3')) {
                        document.getElementById('c3').innerHTML = "ক্লাস্টার ৩ (Enrolled)";
                        document.getElementById('c3').href = "./purchased.html";
                    } else {
                        document.getElementById('c3').href = "./Cluster-3/";
                    }
                    if (sum.includes('cluster 4')) {
                        document.getElementById('c4').innerHTML = "ক্লাস্টার ৪ (Enrolled)";
                        document.getElementById('c4').href = "./purchased.html";
                    } else {
                        document.getElementById('c4').href = "./Cluster-4/";
                    }
                    if (sum.includes('cluster 5')) {
                        document.getElementById('c5').innerHTML = "ক্লাস্টার ৫ (Enrolled)";
                        document.getElementById('c5').href = "./purchased.html";
                    } else {
                        document.getElementById('c5').href = "./Cluster-5/";
                    }
                    if (sum.includes('cluster 6')) {
                        document.getElementById('c6').innerHTML = "ক্লাস্টার ৬ (Enrolled)";
                        document.getElementById('c6').href = "./purchased.html";
                    } else {
                        document.getElementById('c6').href = "./Cluster-6/";
                    }
                }
            })
            .catch(() => {
                document.getElementById('meta').innerHTML = "যে ক্লাস্টারে এনরোল হতে চাও সিলেক্ট করো।";
                document.getElementById('full').href = "./full";
                document.getElementById('half').href = "./half";
            })

    } else {
        document.getElementById('meta').innerHTML = "Please Login First !"
        document.getElementById('full').href = "../dashboard/login";
        document.getElementById('half').href = "../dashboard/login";
    }
})
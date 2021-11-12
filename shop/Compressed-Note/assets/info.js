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

        fetch(`https://${shopName}/${productCode}/purchase`, requestOptions)
            .then(response => {
                return response.json()
            })
            .then(result => {
                if (result.code === 200) {
                    let data = result.data
                    const sum = data.map(element => element.access);
                    document.getElementById('meta').innerHTML = "যে কম্প্রেস নোট পারচেস করতে চাও সিলেক্ট করো।";
                    if (sum.includes('Part 1')) {
                        document.getElementById('c1').innerHTML = "Part 1 (Purchased)";
                        document.getElementById('c1').href = "./purchased.html";
                    } else {
                        document.getElementById('c1').href = "./Part-1/";
                    }
                    if (sum.includes('Part 2')) {
                        document.getElementById('c2').innerHTML = "Part 2 (Purchased)";
                        document.getElementById('c2').href = "./purchased.html";
                    } else {
                        document.getElementById('c2').href = "./Part-2/";
                    }
                    if (sum.includes('AB')) {
                        document.getElementById('c3').innerHTML = "জ্ঞান অনুধাবন (Purchased)";
                        document.getElementById('c3').href = "./purchased.html";
                    } else {
                        document.getElementById('c3').href = "./A-B/";
                    }
                    if (sum.includes('Bundle')) {
                        document.getElementById('c4').innerHTML = "Bundle ( Part 1 + জ্ঞান অনুধাবন ) (Purchased)";
                        document.getElementById('c4').href = "./purchased.html";
                    } else {
                        document.getElementById('c4').href = "./Bundle/";
                    }
                } else {
                    document.getElementById('meta').innerHTML = "যে কম্প্রেস নোট পারচেস করতে চাও সিলেক্ট করো।";
                    document.getElementById('c1').href = "./Part-1/";
                    document.getElementById('c2').href = "./Part-2/";
                    document.getElementById('c3').href = "./A-B/";
                    document.getElementById('c4').href = "./Bundle/";
                }
            })
            .catch(() => {
                document.getElementById('meta').innerHTML = "যে কম্প্রেস নোট পারচেস করতে চাও সিলেক্ট করো।";
                document.getElementById('c1').href = "./Part-1/";
                document.getElementById('c2').href = "./Part-2/";
                document.getElementById('c3').href = "./A-B/";
                document.getElementById('c4').href = "./Bundle/";
            })

    } else {
        document.getElementById('meta').innerHTML = "Please Login First !"
        document.getElementById('c1').href = "../dashboard/login";
        document.getElementById('c2').href = "../dashboard/login";
        document.getElementById('c3').href = "../dashboard/login";
        document.getElementById('c4').href = "../dashboard/login";
    }
})

function locked() {
    swal({
        title: "Coming Soon",
        icon: "info",
    })
}
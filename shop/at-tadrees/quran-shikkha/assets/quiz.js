const video = document.getElementById("video");

const videoId = window.location.search.split("?")[1];

firebase.auth().onAuthStateChanged(function (e) {
    if (e) {
        fetch(`https://${shopName2}/access/${productCode}/${e.uid}/${videoId}`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                if (data.status == 200) {
                    const content = data.content;
                    document.getElementById("title").innerHTML = content.title;
                    document.getElementById("description").innerText = content.description;
                    if (content.type != "yt" || content.type != "ftp") {
                        document.getElementById('content').src = content.link;
                    } else {
                        location.href = './yt?'+content._id;
                    }
                } else {
                    location.replace(`https://${shopName2}/${productCode}`);
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

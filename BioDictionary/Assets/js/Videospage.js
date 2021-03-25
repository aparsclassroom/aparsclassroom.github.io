var mainApp = {};
(function() {
    var firebase = app_firebase;
    var uid = null;
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            if (user.isAnonymous === true) {
                alert("This is a Premium Feature!");
                return;
            } else {
                uid = user.uid;
                var as = window.location.pathname.toString();
                const ID = as.split('/')[3] + "/" + as.split('/')[4] + "/" + as.split('/')[6].split('.')[0].substring(0, 16);
                window.addEventListener("load", () => {
                    fetch('https://script.google.com/macros/s/AKfycbw188R_5pIEx1OCPgcwNLcvMAx2xp4-XNb2qWwQwYSI3Wx8WdhLymkhhgTT0fYuaff1/exec?ID=' + ID)
                        .then((res) => {
                            return res.json()
                        })
                        .then((loadedData) => {
                            $(function() {
                                $('.fb-comments').attr("data-href", document.URL);
                            });
                            document.getElementById('player').setAttribute("data-plyr-embed-id", loadedData.Video_Id);
                            const player = new Plyr('#player');
                            document.getElementById('previewP').setAttribute("src", "https://drive.google.com/file/d/" + loadedData.Pdf_Id + "/preview");
                            document.getElementById('down').setAttribute('onclick', "window.open('https://drive.google.com/u/0/uc?id=" + loadedData.Pdf_Id + "&export=download')");
                            document.getElementById('Video_Description').innerText = loadedData.Video_Description;
                            document.getElementById('Suggestion_1_Link').src = "https://i.ytimg.com/vi/" + loadedData.Suggestion_1_Link + "/hqdefault.jpg";
                            document.getElementById('Suggestion_2_Link').src = "https://i.ytimg.com/vi/" + loadedData.Suggestion_2_Link + "/hqdefault.jpg";
                            document.getElementById('Suggestion_3_Link').src = "https://i.ytimg.com/vi/" + loadedData.Suggestion_3_Link + "/hqdefault.jpg";
                            document.getElementById('suggest1').href = "./" + loadedData.Suggestion_1 + ".html";
                            document.getElementById('suggest2').href = "./" + loadedData.Suggestion_2 + ".html";
                            document.getElementById('suggest3').href = "./" + loadedData.Suggestion_3 + ".html";
                            document.getElementById('Suggestion_1_Title').innerText = loadedData.Suggestion_1_Title;
                            document.getElementById('Suggestion_2_Title').innerText = loadedData.Suggestion_2_Title;
                            document.getElementById('Suggestion_3_Title').innerText = loadedData.Suggestion_3_Title;
                            document.getElementById('Suggestion_1_Description').innerText = loadedData.Suggestion_1_Description;
                            document.getElementById('Suggestion_2_Description').innerText = loadedData.Suggestion_2_Description;
                            document.getElementById('Suggestion_3_Description').innerText = loadedData.Suggestion_3_Description;
                        })
                });
            }
        } else {
            window.location.replace("/BioDictionary/login.html");
        }
    });
})()
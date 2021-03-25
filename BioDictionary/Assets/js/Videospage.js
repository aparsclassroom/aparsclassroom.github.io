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
                const epNo = as.split('/')[6].split('.')[0].substring(6, 16);
                fetch('https://script.google.com/macros/s/AKfycbwmv686zGEWVt5MOKDk6JHbVlktZamUSNpPwgWEaBL4oqf5VyTDg-vK39rhFy7yeK59/exec?ID=' + ID)
                    .then((res) => {
                        return res.json()
                    })
                    .then((loadedData) => {
                        if (loadedData.code === 200) {
                            $('.fb-comments').attr("data-href", document.URL);
                            if (loadedData.Meta != "") {
                                document.getElementById('advertisement').innerHTML = "<h3 style='text-align:center'>" + loadedData.Meta + "</h3>";
                            }
                            document.title = "BioCast Ep." + epNo + " | Botany " + loadedData.Subject + " | BioDictionary"
                            document.getElementById('Subject').innerText = loadedData.Subject;
                            document.getElementById('chaplink').href = 'href="../../../' + loadedData.Subject + '.html';
                            document.getElementById('Chapter').innerText = loadedData.Chapter;
                            document.getElementById('eps').innerText = " Ep. " + epNo;
                            document.getElementById('hed').innerText = "BioCast Episode " + epNo;
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
                            document.getElementById('Instructor_Dp').src = loadedData.Instructor_Dp;
                            document.getElementById('Instructor_Name').innerText = loadedData.Instructor_Name;
                            document.getElementById('Instructor_Subject').innerText = loadedData.Instructor_Subject;
                            document.getElementById('Instructor_Institute').innerText = loadedData.Instructor_Institute;
                        } else {
                            window.alert(loadedData.message);
                            window.location.replace('../../../../index.html');
                        }
                    })
            }
        } else {
            window.location.replace("/BioDictionary/login.html");
        }
    });
})()
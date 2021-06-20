var mainApp = {};
(function() {
    var firebase = app_firebase;
    var uid = null;
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            if (user.isAnonymous === true) {
                alert("This is a Premium Feature!");
                return location.replace("/BioDictionary/index.html");
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
                            $('.fb-comments').attr("data-href", document.location.origin + document.location.pathname);
                            if (loadedData.Meta != "") {
                                document.getElementById('advertisement').innerHTML = "<h3 style='text-align:center'>" + loadedData.Meta + "</h3>";
                            }
                            document.title = "BioCast Ep." + epNo + " | " + loadedData.Subject + " | BioDictionary"
                            document.getElementById('Subject').innerText = loadedData.Subject;
                            document.getElementById('chaplink').href = '/BioDictionary/' + loadedData.Subject + '.html';
                            document.getElementById('Chapter').innerText = loadedData.Chapter;
                            document.getElementById('eps').innerText = " Ep. " + epNo;
                            document.getElementById('hed').innerText = "BioCast Episode " + epNo;
                            document.getElementById('player').setAttribute("data-plyr-embed-id", loadedData.Video_Id);
                            const player = new Plyr('#player');
                            document.getElementById('forward').addEventListener('click', e => {
                                e.detail.plyr
                            })
                            document.getElementById('previewP').setAttribute("src", "https://drive.google.com/file/d/" + loadedData.Pdf_Id + "/preview");
                            document.getElementById('down').setAttribute('onclick', "window.open('https://drive.google.com/u/0/uc?id=" + loadedData.Pdf_Id + "&export=download')");
                            document.getElementById('Video_Description').innerText = loadedData.Video_Description;
                            var s1l = "./" + loadedData.Suggestion_1 + ".html";
                            var s1i = "https://i.ytimg.com/vi/" + loadedData.Suggestion_1_Link + "/hqdefault.jpg";
                            if (loadedData.Suggestion_1 != "") {
                                document.getElementById('suggest1').innerHTML = `
                                <a href="${s1l}">
                                <div class="image">
                                    <img src=${s1i} class="rounded" alt="Related 1">
                                </div>
                                <div class="detail">
                                    <p><span>${loadedData.Suggestion_1_Title}</span></p>
                                    <span><strong>${loadedData.Suggestion_1_Description}</strong></span>
                                </div>
                            </a>
                                `;
                            }

                            var s2l = "./" + loadedData.Suggestion_2 + ".html";
                            var s2i = "https://i.ytimg.com/vi/" + loadedData.Suggestion_2_Link + "/hqdefault.jpg";
                            if (loadedData.Suggestion_2 != "") {
                                document.getElementById('suggest2').innerHTML = `
                                <a href="${s2l}">
                                <div class="image">
                                    <img src=${s2i} class="rounded" alt="Related 2">
                                </div>
                                <div class="detail">
                                    <p><span>${loadedData.Suggestion_2_Title}</span></p>
                                    <span><strong>${loadedData.Suggestion_2_Description}</strong></span>
                                </div>
                            </a>
                                `;
                            }
                            var s3l = "./" + loadedData.Suggestion_3 + ".html";
                            var s3i = "https://i.ytimg.com/vi/" + loadedData.Suggestion_3_Link + "/hqdefault.jpg";
                            if (loadedData.Suggestion_3 != "") {
                                document.getElementById('suggest3').innerHTML = `
                                <a href="${s3l}">
                                <div class="image">
                                    <img src=${s3i} class="rounded" alt="Related 3">
                                </div>
                                <div class="detail">
                                    <p><span>${loadedData.Suggestion_3_Title}</span></p>
                                    <span><strong>${loadedData.Suggestion_3_Description}</strong></span>
                                </div>
                            </a>
                                `;
                            }
                            document.getElementById('Instructor_Dp').src = loadedData.Instructor_Dp;
                            document.getElementById('Instructor_Name').innerText = loadedData.Instructor_Name;
                            document.getElementById('Instructor_Subject').innerText = loadedData.Instructor_Subject;
                            document.getElementById('Instructor_Institute').innerText = loadedData.Instructor_Institute;
                        } else {
                            window.alert(loadedData.message);
                            window.location.replace('../../../../');
                        }
                    })
            }
        } else {
            window.location.replace("/BioDictionary/login.html");
        }
    });
})()
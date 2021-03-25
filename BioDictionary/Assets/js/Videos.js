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
                const ID = as.split('/')[3] + "/" + as.split('/')[4];
                const epNo = as.split('/')[4].split('.')[0].substring(8, 16);
                fetch('https://script.google.com/macros/s/AKfycbzHXDbqtNMW6LbTZZtdx_0TkidUSsVnlGQbXQqJuZRwDZqTwwvybfmLiE4HR1sjrAGR4A/exec?ID=' + ID)
                    .then((res) => {
                        return res.json();
                    })
                    .then((loadedData) => {
                        if (loadedData.code === 200) {
                            document.title = "BioCast Ep." + epNo + " | " + loadedData.Subject + " | BioDictionary"
                            document.getElementById('Subject').innerText = loadedData.Subject;
                            document.getElementById('chaplink').href = '/BioDictionary/' + loadedData.Subject + '.html';
                            document.getElementById('Chapter').innerText = loadedData.Chapter;
                            if (loadedData.Video_1 != "") {
                                document.getElementById('v1').innerHTML = `
            <a href="./files/video-1.html">
                <div class="single-sess">
                    <img src="https://i.ytimg.com/vi/${loadedData.Video_1}/hqdefault.jpg" alt="Episode 1">
                    <p>BioCast Ep. 1</p>
                </div>
            </a>
            `;
                            } else if (loadedData.Video_1_Status != "") {
                                document.getElementById('v1').innerHTML = `
                <a href="#">
                <div class="single-sess">
                    <img src="https://media.giphy.com/media/qF3loRbiqLT44/source.gif" alt="Episode 1">
                    <p>BioCast Ep. 1<br>${loadedData.Video_1_Status}</p>
                </div>
            </a>
                `;
                            }
                            if (loadedData.Video_2 != "") {
                                document.getElementById('v2').innerHTML = `
            <a href="./files/video-2.html">
                <div class="single-sess">
                    <img src="https://i.ytimg.com/vi/${loadedData.Video_2}/hqdefault.jpg" alt="Episode 2">
                    <p>BioCast Ep. 2</p>
                </div>
            </a>
            `;
                            } else if (loadedData.Video_2_Status != "") {
                                document.getElementById('v2').innerHTML = `
                <a href="#">
                <div class="single-sess">
                    <img src="https://media.giphy.com/media/qF3loRbiqLT44/source.gif" alt="Episode 2">
                    <p>BioCast Ep. 2<br>${loadedData.Video_2_Status}</p>
                </div>
            </a>
                `;
                            }
                            if (loadedData.Video_3 != "") {
                                document.getElementById('v3').innerHTML = `
            <a href="./files/video-3.html">
                <div class="single-sess">
                    <img src="https://i.ytimg.com/vi/${loadedData.Video_3}/hqdefault.jpg" alt="Episode 3">
                    <p>BioCast Ep. 3</p>
                </div>
            </a>
            `;
                            } else if (loadedData.Video_3_Status != "") {
                                document.getElementById('v3').innerHTML = `
                <a href="#">
                <div class="single-sess">
                    <img src="https://media.giphy.com/media/qF3loRbiqLT44/source.gif" alt="Episode 3">
                    <p>BioCast Ep. 3<br>${loadedData.Video_3_Status}</p>
                </div>
            </a>
                `;
                            }
                            if (loadedData.Video_4 != "") {
                                document.getElementById('v4').innerHTML = `
            <a href="./files/video-4.html">
                <div class="single-sess">
                    <img src="https://i.ytimg.com/vi/${loadedData.Video_4}/hqdefault.jpg" alt="Episode 4">
                    <p>BioCast Ep. 4</p>
                </div>
            </a>
            `;
                            } else if (loadedData.Video_4_Status != "") {
                                document.getElementById('v4').innerHTML = `
                <a href="#">
                <div class="single-sess">
                    <img src="https://media.giphy.com/media/qF3loRbiqLT44/source.gif" alt="Episode 4">
                    <p>BioCast Ep. 4<br>${loadedData.Video_4_Status}</p>
                </div>
            </a>
                `;
                            }
                            if (loadedData.Video_5 != "") {
                                document.getElementById('v5').innerHTML = `
            <a href="./files/video-5.html">
                <div class="single-sess">
                    <img src="https://i.ytimg.com/vi/${loadedData.Video_5}/hqdefault.jpg" alt="Episode 5">
                    <p>BioCast Ep. 5</p>
                </div>
            </a>
            `;
                            } else if (loadedData.Video_5_Status != "") {
                                document.getElementById('v5').innerHTML = `
                <a href="#">
                <div class="single-sess">
                    <img src="https://media.giphy.com/media/qF3loRbiqLT44/source.gif" alt="Episode 5">
                    <p>BioCast Ep. 5<br>${loadedData.Video_5_Status}</p>
                </div>
            </a>
                `;
                            }
                            if (loadedData.Video_6 != "") {
                                document.getElementById('v6').innerHTML = `
            <a href="./files/video-6.html">
                <div class="single-sess">
                    <img src="https://i.ytimg.com/vi/${loadedData.Video_6}/hqdefault.jpg" alt="Episode 6">
                    <p>BioCast Ep. 6</p>
                </div>
            </a>
            `;
                            } else if (loadedData.Video_6_Status != "") {
                                document.getElementById('v6').innerHTML = `
                <a href="#">
                <div class="single-sess">
                    <img src="https://media.giphy.com/media/qF3loRbiqLT44/source.gif" alt="Episode 6">
                    <p>BioCast Ep. 6<br>${loadedData.Video_6_Status}</p>
                </div>
            </a>
                `;
                            }
                        } else {
                            window.alert(loadedData.message);
                            window.location.replace('/BioDictionary/' + loadedData.Subject + '.html');
                        }
                    })
            }
        } else {
            window.location.replace("/BioDictionary/login.html");
        }
    })
})()
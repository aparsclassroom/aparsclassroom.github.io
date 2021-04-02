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
                fetch(scriptURL + '?q=Indivisual&uid=' + uid)
                    .then((res) => {
                        return res.json();
                    }).then((loadedData) => {
                        if (loadedData.code === 200) {

                            var as = window.location.pathname.toString();
                            const ID = as.split('/')[3] + "/" + as.split('/')[4] + "/video-" + as.split('/')[7].substring(1, 16);

                            fetch('https://script.google.com/macros/s/AKfycbx2dj1PI7ROIp_8swqHiquG7ZeBriFNIMudGMvPBTy9o72F2cc07QUAJkDUAtOTxxcK/exec' + "?q=Exam&ID=" + ID)
                                .then((res) => {
                                    return res.json();
                                })
                                .then((loadedQuestions) => {
                                    if (loadedQuestions.code === 200) {
                                        document.getElementById('solve').innerHTML = loadedQuestions.Exam;
                                    } else {
                                        alert(loadedQuestions.code + "  " + loadedQuestions.message);
                                        return close();
                                    }
                                })
                                .catch((err) => {
                                    console.error(err);
                                });
                        }
                    })
            }
        }
    });
})()
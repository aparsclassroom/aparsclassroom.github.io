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
                                        var exam = JSON.parse(loadedQuestions.Exam);
                                        var ans1 = "exam[0].choice"
                                        var asvs = exam[0].answer;
                                        var news = JSON.parse(JSON.stringify(ans1 + asvs));
                                        document.getElementById('solve').innerHTML = `
                                        <h3>প্রশ্ন ১. ${exam[0].question}</h3>
                                        <p><strong>সঠিক উত্তর : ${news}</strong></p>
                                        <hr>
                                        <h3>প্রশ্ন ২. ${exam[1].question}</h3>
                                        <p>Option 1 : ${exam[1].choice1}</p>
                                        <p>Option 2 : ${exam[1].choice2}</p>
                                        <p>Option 3 : ${exam[1].choice3}</p>
                                        <p>Option 4 : ${exam[1].choice4}</p>
                                        <p><strong>সঠিক উত্তর : ${exam[1].answer}</strong></p>
                                        <hr>
                                        <h3>প্রশ্ন ৩. ${exam[2].question}</h3>
                                        <p>Option 1 : ${exam[2].choice1}</p>
                                        <p>Option 2 : ${exam[2].choice2}</p>
                                        <p>Option 3 : ${exam[2].choice3}</p>
                                        <p>Option 4 : ${exam[2].choice4}</p>
                                        <p><strong>সঠিক উত্তর : ${exam[2].answer}</strong></p>
                                        <hr>
                                        <h3>প্রশ্ন ৪. ${exam[3].question}</h3>
                                        <p>Option 1 : ${exam[3].choice1}</p>
                                        <p>Option 2 : ${exam[3].choice2}</p>
                                        <p>Option 3 : ${exam[3].choice3}</p>
                                        <p>Option 4 : ${exam[3].choice4}</p>
                                        <p><strong>সঠিক উত্তর : ${exam[3].answer}</strong></p>
                                        <hr>
                                        <h3>প্রশ্ন ৫. ${exam[4].question}</h3>
                                        <p>Option 1 : ${exam[4].choice1}</p>
                                        <p>Option 2 : ${exam[4].choice2}</p>
                                        <p>Option 3 : ${exam[4].choice3}</p>
                                        <p>Option 4 : ${exam[4].choice4}</p>
                                        <p><strong>সঠিক উত্তর : ${exam[4].answer}</strong></p>
                                        <hr>
                                        <h3>প্রশ্ন ৬. ${exam[5].question}</h3>
                                        <p>Option 1 : ${exam[5].choice1}</p>
                                        <p>Option 2 : ${exam[5].choice2}</p>
                                        <p>Option 3 : ${exam[5].choice3}</p>
                                        <p>Option 4 : ${exam[5].choice4}</p>
                                        <p><strong>সঠিক উত্তর : ${exam[5].answer}</strong></p>
                                        <hr>
                                        <h3>প্রশ্ন ৭. ${exam[6].question}</h3>
                                        <p>Option 1 : ${exam[6].choice1}</p>
                                        <p>Option 2 : ${exam[6].choice2}</p>
                                        <p>Option 3 : ${exam[6].choice3}</p>
                                        <p>Option 4 : ${exam[6].choice4}</p>
                                        <p><strong>সঠিক উত্তর : ${exam[6].answer}</strong></p>
                                        <hr>
                                        <h3>প্রশ্ন ৮. ${exam[7].question}</h3>
                                        <p>Option 1 : ${exam[7].choice1}</p>
                                        <p>Option 2 : ${exam[7].choice2}</p>
                                        <p>Option 3 : ${exam[7].choice3}</p>
                                        <p>Option 4 : ${exam[7].choice4}</p>
                                        <p><strong>সঠিক উত্তর : ${exam[7].answer}</strong?</p>
                                        <hr>
                                        <h3>প্রশ্ন ৯. ${exam[8].question}</h3>
                                        <p>Option 1 : ${exam[8].choice1}</p>
                                        <p>Option 2 : ${exam[8].choice2}</p>
                                        <p>Option 3 : ${exam[8].choice3}</p>
                                        <p>Option 4 : ${exam[8].choice4}</p>
                                        <p><strong>সঠিক উত্তর : ${exam[8].answer}</strong></p>
                                        <hr>
                                        <h3>প্রশ্ন ১০. ${exam[9].question}</h3>
                                        <p>Option 1 : ${exam[9].choice1}</p>
                                        <p>Option 2 : ${exam[9].choice2}</p>
                                        <p>Option 3 : ${exam[9].choice3}</p>
                                        <p>Option 4 : ${exam[9].choice4}</p>
                                        <p><strong>সঠিক উত্তর : ${exam[9].answer}</strong></p>
                                        `;
                                    } else {
                                        alert(loadedQuestions.code + "  " + loadedQuestions.message);
                                        return close();
                                    }
                                })
                                .catch((err) => {
                                    console.error(err);
                                });
                        } else {
                            alert("Please Don't try to Cheat 💔");
                            return location.replace("./");
                        }
                    })
            }
        }
    });
})()
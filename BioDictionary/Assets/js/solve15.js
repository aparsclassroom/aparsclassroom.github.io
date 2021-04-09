const stat = sessionStorage.getItem("stat");
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
                sessionStorage.removeItem("stat");
                uid = user.uid;
                fetch(scriptURL + '?q=Indivisual&uid=' + uid)
                    .then((res) => {
                        return res.json();
                    }).then((loadedData) => {
                        if (loadedData.code === 200) {
                            const userin = document.getElementById('userin');
                            userin.innerHTML = `
                            <h2 style="text-align: center;">${loadedData.username}</h2>
                            <p>Your Score : ${loadedData.score}<br>Exam Duration : ${loadedData.duration}<br>Timestamp : ${loadedData.timestamp}</p>                         
                            `;
                            var as = window.location.pathname.toString();
                            const ID = as.split('/')[3] + "/" + as.split('/')[4] + "/video-" + as.split('/')[7].substring(1, 16);

                            fetch('https://script.google.com/macros/s/AKfycbx2dj1PI7ROIp_8swqHiquG7ZeBriFNIMudGMvPBTy9o72F2cc07QUAJkDUAtOTxxcK/exec' + "?q=Exam&ID=" + ID)
                                .then((res) => {
                                    return res.json();
                                })
                                .then((loadedQuestions) => {
                                    if (loadedQuestions.code === 200) {
                                        var ep = loadedQuestions.Episode;
                                        var epNo = ep.split('-')[1].substring(0, 16);
                                        var exam = JSON.parse(loadedQuestions.Exam);
                                        document.getElementById('solve').innerHTML = `
                                        <h2>Exam Details</h2>
                                        <h3>Subject : ${loadedQuestions.Subject}</h3>
                                        <h3>Chapter : ${loadedQuestions.Chapter}</h3>
                                        <h3>Episode : ${epNo}</h3>
                                        <hr>
                                        <h3>প্রশ্ন ১. ${exam[0].question}</h3>
                                        <p>Option 1 : ${exam[0].choice1}</p>
                                        <p>Option 2 : ${exam[0].choice2}</p>
                                        <p>Option 3 : ${exam[0].choice3}</p>
                                        <p>Option 4 : ${exam[0].choice4}</p>
                                        <h3 style="color:green"><strong>সঠিক উত্তর : ${exam[0].answer}</strong></h3>
                                        <hr>
                                        <h3>প্রশ্ন ২. ${exam[1].question}</h3>
                                        <p>Option 1 : ${exam[1].choice1}</p>
                                        <p>Option 2 : ${exam[1].choice2}</p>
                                        <p>Option 3 : ${exam[1].choice3}</p>
                                        <p>Option 4 : ${exam[1].choice4}</p>
                                        <h3 style="color:green"><strong>সঠিক উত্তর : ${exam[1].answer}</strong></h3>
                                        <hr>
                                        <h3>প্রশ্ন ৩. ${exam[2].question}</h3>
                                        <p>Option 1 : ${exam[2].choice1}</p>
                                        <p>Option 2 : ${exam[2].choice2}</p>
                                        <p>Option 3 : ${exam[2].choice3}</p>
                                        <p>Option 4 : ${exam[2].choice4}</p>
                                        <h3 style="color:green"><strong>সঠিক উত্তর : ${exam[2].answer}</strong></h3>
                                        <hr>
                                        <h3>প্রশ্ন ৪. ${exam[3].question}</h3>
                                        <p>Option 1 : ${exam[3].choice1}</p>
                                        <p>Option 2 : ${exam[3].choice2}</p>
                                        <p>Option 3 : ${exam[3].choice3}</p>
                                        <p>Option 4 : ${exam[3].choice4}</p>
                                        <h3 style="color:green"><strong>সঠিক উত্তর : ${exam[3].answer}</strong></h3>
                                        <hr>
                                        <h3>প্রশ্ন ৫. ${exam[4].question}</h3>
                                        <p>Option 1 : ${exam[4].choice1}</p>
                                        <p>Option 2 : ${exam[4].choice2}</p>
                                        <p>Option 3 : ${exam[4].choice3}</p>
                                        <p>Option 4 : ${exam[4].choice4}</p>
                                        <h3 style="color:green"><strong>সঠিক উত্তর : ${exam[4].answer}</strong></h3>
                                        <hr>
                                        <h3>প্রশ্ন ৬. ${exam[5].question}</h3>
                                        <p>Option 1 : ${exam[5].choice1}</p>
                                        <p>Option 2 : ${exam[5].choice2}</p>
                                        <p>Option 3 : ${exam[5].choice3}</p>
                                        <p>Option 4 : ${exam[5].choice4}</p>
                                        <h3 style="color:green"><strong>সঠিক উত্তর : ${exam[5].answer}</strong></h3>
                                        <hr>
                                        <h3>প্রশ্ন ৭. ${exam[6].question}</h3>
                                        <p>Option 1 : ${exam[6].choice1}</p>
                                        <p>Option 2 : ${exam[6].choice2}</p>
                                        <p>Option 3 : ${exam[6].choice3}</p>
                                        <p>Option 4 : ${exam[6].choice4}</p>
                                        <h3 style="color:green"><strong>সঠিক উত্তর : ${exam[6].answer}</strong></h3>
                                        <hr>
                                        <h3>প্রশ্ন ৮. ${exam[7].question}</h3>
                                        <p>Option 1 : ${exam[7].choice1}</p>
                                        <p>Option 2 : ${exam[7].choice2}</p>
                                        <p>Option 3 : ${exam[7].choice3}</p>
                                        <p>Option 4 : ${exam[7].choice4}</p>
                                        <h3 style="color:green"><strong>সঠিক উত্তর : ${exam[7].answer}</strong></h3>
                                        <hr>
                                        <h3>প্রশ্ন ৯. ${exam[8].question}</h3>
                                        <p>Option 1 : ${exam[8].choice1}</p>
                                        <p>Option 2 : ${exam[8].choice2}</p>
                                        <p>Option 3 : ${exam[8].choice3}</p>
                                        <p>Option 4 : ${exam[8].choice4}</p>
                                        <h3 style="color:green"><strong>সঠিক উত্তর : ${exam[8].answer}</strong></h3>
                                        <hr>
                                        <h3>প্রশ্ন ১০. ${exam[9].question}</h3>
                                        <p>Option 1 : ${exam[9].choice1}</p>
                                        <p>Option 2 : ${exam[9].choice2}</p>
                                        <p>Option 3 : ${exam[9].choice3}</p>
                                        <p>Option 4 : ${exam[9].choice4}</p>
                                        <h3 style="color:green"><strong>সঠিক উত্তর : ${exam[9].answer}</strong></h3>
                                        <hr>
                                        <h3>প্রশ্ন ১১. ${exam[10].question}</h3>
                                        <p>Option 1 : ${exam[10].choice1}</p>
                                        <p>Option 2 : ${exam[10].choice2}</p>
                                        <p>Option 3 : ${exam[10].choice3}</p>
                                        <p>Option 4 : ${exam[10].choice4}</p>
                                        <h3 style="color:green"><strong>সঠিক উত্তর : ${exam[10].answer}</strong></h3>
                                        <hr>
                                        <h3>প্রশ্ন ১২. ${exam[11].question}</h3>
                                        <p>Option 1 : ${exam[11].choice1}</p>
                                        <p>Option 2 : ${exam[11].choice2}</p>
                                        <p>Option 3 : ${exam[11].choice3}</p>
                                        <p>Option 4 : ${exam[11].choice4}</p>
                                        <h3 style="color:green"><strong>সঠিক উত্তর : ${exam[11].answer}</strong></h3>
                                        <hr>
                                        <h3>প্রশ্ন ১৩. ${exam[12].question}</h3>
                                        <p>Option 1 : ${exam[12].choice1}</p>
                                        <p>Option 2 : ${exam[12].choice2}</p>
                                        <p>Option 3 : ${exam[12].choice3}</p>
                                        <p>Option 4 : ${exam[12].choice4}</p>
                                        <h3 style="color:green"><strong>সঠিক উত্তর : ${exam[12].answer}</strong></h3>
                                        <hr>
                                        <h3>প্রশ্ন ১৪. ${exam[13].question}</h3>
                                        <p>Option 1 : ${exam[13].choice1}</p>
                                        <p>Option 2 : ${exam[13].choice2}</p>
                                        <p>Option 3 : ${exam[13].choice3}</p>
                                        <p>Option 4 : ${exam[13].choice4}</p>
                                        <h3 style="color:green"><strong>সঠিক উত্তর : ${exam[13].answer}</strong></h3>
                                        <hr>
                                        <h3>প্রশ্ন ১৫. ${exam[14].question}</h3>
                                        <p>Option 1 : ${exam[14].choice1}</p>
                                        <p>Option 2 : ${exam[14].choice2}</p>
                                        <p>Option 3 : ${exam[14].choice3}</p>
                                        <p>Option 4 : ${exam[14].choice4}</p>
                                        <h3 style="color:green"><strong>সঠিক উত্তর : ${exam[14].answer}</strong></h3>
                                        <hr>
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
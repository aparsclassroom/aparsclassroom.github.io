function close_window() {
    swal({
            title: "Are you sure?",
            icon: "warning",
            buttons: ["No, wait", true],
            dangerMode: true
        })
        .then((off) => {
            if (off) {
                close();
            }
        });
}
var mainApp = {};
(function() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            localStorage.removeItem('mostRecentScore');
            localStorage.removeItem("minutes");
            localStorage.removeItem("seconds");
            if (user.isAnonymous === true) {
                alert("It is a premium feature");
                location.replace("/BioDictionary/index.html");
                return;
            } else {
                uid = user.uid;
                fetch(scriptURL + '?q=Indivisual&uid=' + uid)
                    .then((res) => {
                        return res.json();
                    }).then((loadedData) => {
                        if (loadedData.code === 200) {
                            document.getElementById('startExam').innerText = "Retake ?";
                            document.getElementById('startExam').href = "./exam.html";
                            document.getElementById('solve').style.display = "block";
                            document.getElementById('solve').href = "./solution.html";
                            document.getElementById('startExam').addEventListener('click', () => {
                                sessionStorage.setItem("stat", "OK");
                            })
                        } else {
                            document.getElementById('startExam').innerText = "Start Exam";
                            email = user.email;
                            document.getElementById('startExam').addEventListener('click', () => {
                                swal("Enter your password:", {
                                        content: "input"
                                    })
                                    .then((value) => {
                                        const a = value;
                                        var user = firebase.auth().currentUser;
                                        var credential = firebase.auth.EmailAuthProvider.credential(email, a);

                                        user.reauthenticateWithCredential(credential).then(function() {
                                            sessionStorage.setItem("stat", "OK");
                                            swal({
                                                title: "Password Matched!",
                                                icon: "success",
                                                button: "Start Exam!"
                                            }).then(() => {
                                                return location.replace('./exam.html');
                                            })
                                        }).catch(function(error) {
                                            swal({
                                                title: "Invalid Password",
                                                text: "Please correct it!",
                                                icon: "error",
                                                button: "Ok"
                                            });
                                        });
                                    });
                            });
                        }
                    })
            }
        } else {
            location.replace("/BioDictionary/login.html");
        }
    });
})()
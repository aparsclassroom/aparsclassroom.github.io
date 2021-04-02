function close_window() {
    if (confirm("Close Quick Exam?")) {
        close();
    }
}
var mainApp = {};
(function() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
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
                                            swal({
                                                title: "Password Matched!",
                                                icon: "success",
                                                button: "Start Exam!"
                                            }).then(() => {
                                                return location.replace('exam.html');
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
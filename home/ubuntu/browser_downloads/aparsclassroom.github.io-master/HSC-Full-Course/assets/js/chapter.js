firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      uid = user.uid;
    }else {
        window.location.replace("../../../../must-login.html");
    }
  });
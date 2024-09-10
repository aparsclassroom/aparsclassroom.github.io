const theme = localStorage.getItem("biotheme");
const bg = document.getElementById("bioT");
if (theme == "true") {
  bg.classList.remove("white-content");
} else {
  bg.classList.add("white-content");
}
const api =
  "https://script.google.com/macros/s/AKfycby-COx47O7aEruch79rWMFXUIrSe1im7dBqkndvJEfBvlytlpwxP9lF7rElSVxBCAYY/exec";

function initApp() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      free = user.isAnonymous;
      if (free === true) {
        alert("It is a premium feature");
        location.replace("../");
        return;
      } else {
        fetch(api + "?q=controller&uid=" + user.uid)
          .then((res) => {
            return res.json();
          })
          .then((loadedData) => {
            if (loadedData.code === 200) {
              let data = loadedData.data;
              document.getElementById("contoller").innerHTML = data.cont;
              document.getElementById("info").innerHTML =
                "<a class='text-danger' href='tel:" +
                data.contInf +
                "'>📞 " +
                data.contInf +
                "</a>";
            } else {
              alert(loadedData.message + "\n\nPlease Contact Admin !");
              return location.replace("../");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      location.replace("../");
    }
  });
}
window.onload = function () {
  initApp();
};

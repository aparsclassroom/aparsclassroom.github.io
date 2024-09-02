var app_firebase = {};
(function () {
  var firebaseConfig = {
    apiKey: "AIzaSyDpX318g79F8msrHeEEifiSO06e5twwu9w",
    authDomain: "asg-biodictionary.firebaseapp.com",
    projectId: "asg-biodictionary",
    storageBucket: "asg-biodictionary.appspot.com",
    messagingSenderId: "342222541178",
    appId: "1:342222541178:web:d3ad1c34fdcdb71ad046c3",
    measurementId: "G-MQV49ZPHK7",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  app_firebase = firebase;
  firebase.analytics();
})();
var mainApp = {};
(function () {
  var firebase = app_firebase;
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      ann = user.isAnonymous;
      console.log(
        "%cDon't YOU Ever Try To STEAL the SOURCE CODE 🤬",
        "color:red;Background-Color:white;padding:100px;font-size:50px",
      );
      if (ann === true) {
        alert("this is a premium feature!");
        return location.replace("../dashboard.html");
      } else {
        const clear = document.querySelector(".clear");
        const dateElement = document.getElementById("date");
        const list = document.getElementById("list");
        const input = document.getElementById("input");
        const addNote = document.getElementById("addNote");

        // Classes names
        const CHECK = "fa-check-circle";
        const UNCHECK = "fa-circle-thin";
        const LINE_THROUGH = "lineThrough";

        // Variables
        let LIST, id;

        // get item from localstorage
        let data = localStorage.getItem("TODO");

        // check if data is not empty
        if (data) {
          LIST = JSON.parse(data);
          id = LIST.length; // set the id to the last one in the list
          loadList(LIST); // load the list to the user interface
        } else {
          // if data isn't empty
          LIST = [];
          id = 0;
        }

        // load items to the user's interface
        function loadList(array) {
          array.forEach(function (item) {
            addToDo(item.name, item.id, item.time, item.done, item.trash);
          });
        }

        // clear the local storage
        clear.addEventListener("click", function () {
          localStorage.removeItem("TODO");
          location.reload();
        });

        // Show todays date
        const options = { weekday: "long", month: "short", day: "numeric" };
        const today = new Date();
        const time = new Date().toLocaleString();
        dateElement.innerHTML = today.toLocaleDateString("en-US", options);

        // add to do function

        function addToDo(toDo, id, time, done, trash) {
          if (trash) {
            return;
          }

          const DONE = done ? CHECK : UNCHECK;
          const LINE = done ? LINE_THROUGH : "";

          const item = `<li class="item">
                                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                                    <p class="text ${LINE}">${toDo}<br>${time}</p>
                                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                                  </li>
                                `;

          const position = "beforeend";

          list.insertAdjacentHTML(position, item);
        }
        //
        // add an item to the list user the enter key
        addNote.addEventListener("click", function () {
          const toDo = input.value;

          // if the input isn't empty
          if (toDo) {
            addToDo(toDo, id, time, false, false);

            LIST.push({
              name: toDo,
              id: id,
              time: time,
              done: false,
              trash: false,
            });

            // add item to localstorage ( this code must be added where the LIST array is updated)
            localStorage.setItem("TODO", JSON.stringify(LIST));

            id++;
          }
          input.value = "";
        });

        // complete to do
        function completeToDo(element) {
          element.classList.toggle(CHECK);
          element.classList.toggle(UNCHECK);
          element.parentNode
            .querySelector(".text")
            .classList.toggle(LINE_THROUGH);

          LIST[element.id].done = LIST[element.id].done ? false : true;
        }

        // remove to do
        function removeToDo(element) {
          element.parentNode.parentNode.removeChild(element.parentNode);

          LIST[element.id].trash = true;
        }

        // target the items created dynamically

        list.addEventListener("click", function (event) {
          const element = event.target; // return the clicked element inside list
          const elementJob = element.attributes.job;
          if (elementJob) {
            if (elementJob.value == "complete") {
              completeToDo(element);
            } else {
              removeToDo(element);
            }
          }

          // add item to localstorage ( this code must be added where the LIST array is updated)
          localStorage.setItem("TODO", JSON.stringify(LIST));
        });
      }
    } else {
      window.location.replace("../login.html");
    }
  });
})();

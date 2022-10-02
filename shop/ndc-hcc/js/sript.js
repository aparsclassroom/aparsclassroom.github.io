document.getElementById('email').addEventListener("input", function (event) {
    if (document.getElementById('email').validity.typeMismatch) {
      document.getElementById('email').setCustomValidity("We are expecting an e-mail address!");
    } else {
      document.getElementById('email').setCustomValidity("");
    }
  });
  
  document.getElementById('phone').addEventListener("input", function (event) {
    if (document.getElementById('phone').validity.patternMismatch) {
        document.getElementById('phone').setCustomValidity("Please enter a valid phone number (+8801XX XXX XXXX)!");
    } else {
        document.getElementById('phone').setCustomValidity("");
    }
  });

document.title = productName + " | ASG Shop";
document.getElementById('prod').innerText = productName;

firebase.auth().onAuthStateChanged(function(e) {
    if (e) {
        var t = e.phoneNumber;
        var namex = e.displayName;
        var mail = e.email;
        document.getElementById('uid').value = e.uid;
        
        const form = document.forms['purchase']
        form.addEventListener('submit', em => {
            em.preventDefault();
            var mail = document.getElementById('email').value.toLowerCase().trim();
            document.getElementById('buy').innerText = "Please wait...."
            document.getElementById("buy").disabled = true;
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify({
                "productName": product,
                "Platform": Platform,
                "Name": document.getElementById('name').value.trim(),
                "Email": mail,
                "School": document.getElementById('School').value.trim(),
                "Board Roll": document.getElementById('roll').value.trim(),
                "Registration Number": document.getElementById('registration').value.trim(),
                "Phone": document.getElementById('phone').value.trim(),
                'UID': e.uid
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(`https://script.google.com/macros/s/AKfycbzodlMLueKX4WOgWy7eV1ttt1S4Rr77dXStWSWLaw2QUbY6k7Z9-8Cx9q0nQhF4JPq9/exec`, requestOptions)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                swal({
                    title: data.action.title,
                    icon: data.action.code,
                    text: data.action.message,
                    button: "Close"
                }).then(() => {
                    return location.replace('https://www.facebook.com/groups/1116571972397525/');
                })
            })
    
        .catch((e) => {
            swal({
                title: e.action.title,
                icon: e.action.code,
                text: e.action.message,
                button: "Okay ☹"
            })
        })
    })
           
        document.getElementById('moda').setAttribute("data-target", "#purchaseFrm");
        if (t != null) {
            document.getElementById('phone').value = t;
            document.getElementById('phone').setAttribute("readonly", true);
            document.getElementById('buy').disabled = false;
        } else {
            document.getElementById('phone').value = "+880";
        }
        if (namex != null) {
            document.getElementById('name').value = namex;
            // document.getElementById('name').setAttribute("readonly", true);
        }
        if (mail != null) {
            document.getElementById('email').value = mail
            document.getElementById('email').setAttribute("readonly", true);
        }
    } else {
            document.getElementById('moda').addEventListener('click', () => {
                sessionStorage.setItem(product + '_potential', 'true');
                location.href = "/shop/dashboard/login?signInSuccessUrl=" + encodeURIComponent(location.href)
            })
    }
})

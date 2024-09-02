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
            document.getElementById('buy').innerText = "Please wait...."
            document.getElementById("buy").disabled = true;
            fetch(`https://script.google.com/macros/s/AKfycbwe6nlKYrEohiv9h3JJZ6zWsUcSGOdAZI47ofdowUc1du-56i_15qD7IKe4wDiAV9R5Xg/exec`,  {
                method: 'POST',
                body: new FormData(form)
            })
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                swal({
                    title: data.action.title,
                    icon: data.action.icon,
                    text: data.action.text,
                    button: data.action.button
                }).then(() => {
                    location.replace('https://www.facebook.com/groups/632928578384914');
                })
            })
    
        .catch((e) => {
            swal({
                title: e.action.title,
                icon: e.action.icon,
                text: e.action.text,
                button: e.action.button
            }).then(() => {
                return location.reload();
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
        firebase.auth().currentUser.getIdTokenResult()
            .then((idTokenResult) => {
                const claims = idTokenResult.claims;
                if (claims.HSC) {
                    document.getElementById('hscBatch').value = claims.HSC;
                }
                if (claims.Institution) {
                    document.getElementById('college').value = claims.Institution;
                }
            })
            .catch((error) => {
                console.error(error);
            });
    } else {
            document.getElementById('moda').addEventListener('click', () => {
                sessionStorage.setItem(product + '_potential', 'true');
                location.href = "/shop/dashboard/login?signInSuccessUrl=" + encodeURIComponent(location.href)
            })
    }
})

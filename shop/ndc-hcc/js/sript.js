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
            fetch(`https://script.google.com/macros/s/AKfycbzw9BLtyB7hQzCYYV1ozyhX6w1n2HNXrsNkuDz7gtrfKS3XEZdoa15Nl_k4doux2d-6/exec`,  {
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
                    location.replace('https://www.facebook.com/groups/1116571972397525/');
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
        // if (e.customClaims.HSC) {
        //     document.getElementById('hscBatch').value = e.customClaims.HSC;
        // }
        // if (e.customClaims.Institution) {
        //     document.getElementById('college').value = e.customClaims.Institution;
        // }
    } else {
            document.getElementById('moda').addEventListener('click', () => {
                sessionStorage.setItem(product + '_potential', 'true');
                location.href = "/shop/dashboard/login?signInSuccessUrl=" + encodeURIComponent(location.href)
            })
    }
})

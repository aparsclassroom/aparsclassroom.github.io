//var link = 'http://localhost:8080';
var link = 'https://' + shopName2;

const COMBO_CONFIGS = {
  'bio1': { code: '555', name: 'varsity25combo1' },
  'bio2': { code: '556', name: 'varsity25combo2' },
};


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
document.getElementById('prevP').innerText = fix;
document.getElementById('nop').innerText = pls + "৳";
document.getElementById('sprice').innerText = pls;
document.getElementById('price').value = pls;

firebase.auth().onAuthStateChanged(function (e) {
  if (e) {
    var t = e.phoneNumber;
    var namex = e.displayName;
    var mail = e.email;
    document.getElementById('uid').value = e.uid;
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      "products": ['555', '556', '557', '558'],
      'uid': e.uid
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`https://${shopName2}/v3/purchase/multiple/`, requestOptions)
      .then(response => {
        return response.json()
      })
      .then(result => {
        if (result.status === 200) {
          swal({
            title: "Already Enrolled !",
            icon: "success",
            buttons: ["Exam Dashboard", "View Invoice"]
          }).then((a, b) => {
            if (a) {
              location.replace(result.invoices[0].invoice);
            } else {
              if (result.Exam) {
                location.replace(result.Exam)
              } else {
                location.replace("http://exam.aparsclassroom.com/?uid=" + e.uid)
              }
            }
          })
        } else {
          const form = document.forms['purchase']
          form.addEventListener('submit', em => {
            em.preventDefault();
            const selectedBio = document.querySelector('input[name="biology"]:checked');

            if (!selectedBio) {
              swal({
                title: "Error",
                text: "Please select a biology course",
                icon: "error",
                button: "Ok"
              });
              return;
            }
            const comboKey = `${selectedBio.id}`;
            const comboConfig = COMBO_CONFIGS[comboKey];
            var mail = document.getElementById('email').value.toLowerCase().trim();
            document.getElementById('buy').innerText = "Please wait...."
            document.getElementById("buy").disabled = true;
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify({
              "productName": comboConfig.name,
              "Platform": Platform,
              "cus_name": document.getElementById('name').value.trim(),
              "cus_email": mail,
              "Institution": document.getElementById('college').value.trim(),
              "HSC": document.getElementById('hscBatch').value.trim(),
              "cus_phone": document.getElementById('phone').value.trim(),
              "Cupon": document.getElementById('disC').value.trim(),
              'uid': e.uid,
              "affiliate": getCookie("affiliate"),
              "utm_id": getCookie("utm_id"),
              "utm_source": getCookie("utm_source"),
              "utm_medium": getCookie("utm_medium"),
              "utm_campaign": getCookie("utm_campaign"),
              "utm_term": getCookie("utm_term"),
              "utm_content": getCookie("utm_content"),
              "lead": getCookie("lead"),
              "Referrer": getCookie("Referrer"),
              "Ip": getCookie("ip"),
              "Referrer": getCookie("Platform")
            });

            var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
            };

            fetch(`${link}/${comboConfig.code}/init`, requestOptions)
              .then(response => {
                return response.text()
              })
              .then(result => {
                if (result != '{"status":404,"message":"Product Error"}' || result.status != 420) {
                  document.getElementById('doc').innerHTML = result
                } else {
                  swal({
                    title: "Error",
                    icon: "https://i.postimg.cc/ncNLJcGR/under-maintenance.png",
                    text: "Please visit after 10 pm tonight",
                    button: "Ok"
                  }).then(() => {
                    location.href = "/shop"
                  })
                }
              })
              .catch(() => {
                swal({
                  title: "Error",
                  icon: "https://i.postimg.cc/ncNLJcGR/under-maintenance.png",
                  text: "Please visit after 10 pm tonight",
                  button: "Ok"
                }).then(() => {
                  location.href = "/shop"
                })
              });
          })
        }
      }).catch(() => {
        const mfs = document.forms['purchase']
        mfs.addEventListener('submit', em => {
          em.preventDefault()
          const selectedBio = document.querySelector('input[name="biology"]:checked');

          if (!selectedBio) {
            swal({
              title: "Error",
              text: "Please select a biology course",
              icon: "error",
              button: "Ok"
            });
            return;
          }
          const comboKey = `${selectedBio.id}`;
          const comboConfig = COMBO_CONFIGS[comboKey];
          
          var mail = document.getElementById('email').value.toLowerCase().trim();
          document.getElementById('buy').innerText = "Please wait...."
          document.getElementById("buy").disabled = true;
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          var raw = JSON.stringify({
            "productName": comboConfig.name,
            "Platform": Platform,
            "cus_name": document.getElementById('name').value.trim(),
            "cus_email": mail,
            "Institution": document.getElementById('college').value.trim(),
            "HSC": document.getElementById('hscBatch').value.trim(),
            "cus_phone": document.getElementById('phone').value.trim(),
            "Cupon": document.getElementById('disC').value.trim(),
            'uid': e.uid,
            "affiliate": getCookie("affiliate"),
            "utm_id": getCookie("utm_id"),
            "utm_source": getCookie("utm_source"),
            "utm_medium": getCookie("utm_medium"),
            "utm_campaign": getCookie("utm_campaign"),
            "utm_term": getCookie("utm_term"),
            "utm_content": getCookie("utm_content"),
            "lead": getCookie("lead"),
            "Referrer": getCookie("Referrer"),
            "Ip": getCookie("ip"),
            "Referrer": getCookie("Platform")
          });

          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
          };

          fetch(`${link}/${comboConfig.code}/init`, requestOptions)
            .then(response => {
              return response.text()
            })
            .then(result => {
              if (result != '{"status":404,"message":"Product Error"}' || result.status != 420) {
                document.getElementById('doc').innerHTML = result
              } else {
                swal({
                  title: "Error",
                  icon: "https://i.postimg.cc/ncNLJcGR/under-maintenance.png",
                  text: "Please visit after 10 pm tonight",
                  button: "Ok"
                }).then(() => {
                  location.href = "/shop"
                })
              }
            })
            .catch(() => {
              swal({
                title: "Error",
                icon: "https://i.postimg.cc/ncNLJcGR/under-maintenance.png",
                text: "Please visit after 10 pm tonight",
                button: "Ok"
              }).then(() => {
                location.href = "/shop"
              })
            });
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
    document.getElementById("app").addEventListener('click', () => {
      document.getElementById("app").style.display = "none", document.getElementById("cup").style.display = "block"
    })
    document.getElementById('moda').innerHTML = `
        কোর্সটিতে এনরোল করো <i class="fas fa-arrow-right"></i>
        `;
  } else {
    document.getElementById("app").style.display = "none", document.getElementById("cup").style.display = "none",
      document.getElementById('moda').addEventListener('click', () => {
        sessionStorage.setItem(product + '_potential', 'true');
        location.href = "/shop/dashboard/login?signInSuccessUrl=" + encodeURIComponent(location.href)
      })
    document.getElementById("app").addEventListener("click", e => { e.preventDefault(), document.location.href = "/shop/dashboard/login?signInSuccessUrl=" + encodeURIComponent(location.href) });
  }
})
var cupon, cpn = document.getElementById("cpnCheck");

function func() {
  cupon = document.getElementById("cupon").value;
  notdis()
}

function notdis() {
  if (document.getElementById('cupon').value != "") {
    document.getElementById("cpnCheck").disabled = false;
  } else {
    document.getElementById("cpnCheck").disabled = true;
  }
}
notdis()
var disOFF = 0;

function suc() { "" === document.getElementById("cupon").value ? document.getElementById("cpnCheck").disabled = !0 : document.getElementById("cpnCheck").disabled = !1 }
cpn.addEventListener('click', (e) => {
    e.preventDefault();
    const cupV = document.getElementById('cupon');
    const cpnCode = cupV.value;
    cpn.innerText = "Checking..";
    cupV.disabled = true;
    cpn.disabled = true;

    Promise.all([
        fetch(`${cuponApi}/${cpnCode.toUpperCase()}/${productCode}`).then(res => res.json()),
        fetch(`${cuponApi}/${cpnCode.toUpperCase()}/${productCode2}`).then(res => res.json())
    ])
    .then(([result1, result2]) => {
        let validResult = null;

        // Check if either result is valid
        if (result1.status === "success") {
            validResult = result1;
        } else if (result2.status === "success") {
            validResult = result2;
        }

        if (validResult) {
            const nes = pls - validResult.Off;
            disOFF = validResult.Off;
            document.getElementById('price').value = nes;
            document.getElementById('sprice').innerText = nes;
            cpn.style.cursor = "not-allowed";
            cupV.value = validResult.Cupon;
            cupV.disabled = true;
            cpn.innerText = "Applied ✔";
            document.getElementById('coupnbosh').style.display = "none";
            if (document.getElementById('cpninfo')) document.getElementById('cpninfo').style.display = "none";
            cpn.disabled = true;
            const percent = Math.round(((parseInt(validResult.Off) + (fix - pls)) / fix) * 100);
            document.getElementById('how').style.display = "block";
            document.getElementById('how').innerHTML = `<span style="color:red;">${percent}%</span> discounted by <span style="color:blue;">"${validResult.Cupon}"</span> promo code`;
            document.getElementById('smp').innerHTML = `<del style='color:red'> ${fix}৳</del> <span style='color:rgb(26, 185, 66);;'>${nes} ৳</span>`;
            document.getElementById("cup").style.display = "block";
        } else {
            cpn.innerText = "Apply";
            cupV.disabled = false;
            cpn.disabled = false;
            document.getElementById('cupon').value = "";
            swal({
                title: "Code not valid",
                icon: "error",
                button: "Ok"
            }).then(() => {
                notdis();
            });
        }
    })
    .catch(() => {
        document.getElementById('cupon').value = "";
        swal({
            title: "Coupon can't be Empty 😶",
            icon: "error",
            button: "Ok"
        }).then(() => {
            notdis();
        });
    });
});
if (queryPromo != null) {
  document.getElementById('cupon').value = getCookie("promo");
  notdis()
  document.getElementById("app").style.display = "none";
  cpn.click();
} else {

  document.getElementById("cup").style.display = "none";
  delete_cookie("promo");
  notdis()
}
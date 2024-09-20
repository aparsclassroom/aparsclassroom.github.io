const scriptURL = 'https://script.google.com/macros/s/AKfycbzPQ0hRoaJug1z95ycOpUjgk6F4588kYis-YrUNDZQBXIO9h4e3nTV89jYB-5X4zzi43g/exec';
fetch('https://json.geoiplookup.io/')
    .then((r) => {
        return r.json();
    })
    .then((res) => {
        var a = ("IP Address : " + res.ip + "\n" + "ISP : " + res.isp + "\n" + "Organization : " + res.org + "\n" + "Hostname : " + res.hostname + "\n" + "Latitude : " + res.latitude + "\n" + "Longitude : " + res.longitude + "\n" + "Postal Code : " + res.postal_code + "\n" + "Neighbourhood : " + res.city + "\n" + "Region : " + res.region + "\n" + "District : " + res.district + "\n" + "Country Code : " + res.country_code + "\n" + "Country : " + res.country_name + "\n" + "Continent : " + res.continent_name + "\n" + "Timezone Name : " + res.timezone_name + "\n" + "Connection Tyoe : " + res.connection_type + "\n" + "ASN Organization : " + res.asn_org + "\n" + "ASN : " + res.asn + "\n" + "Currency Code : " + res.currency_code + "\n" + "Currency : " + res.currency_name);
        document.getElementById("ip-details").value = a;
    })
    .catch(() => {
        document.getElementById("ip-details").value = "No Ip Address Found 💔";
    });
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
document.getElementById('clockContainer').style.display = "none";

document.title = productName + " | ASG Shop";
document.getElementById('prod').innerText = productName;

firebase.auth().onAuthStateChanged(function (e) {
    if (e) {

        const branchApi = 'https://crm.aparsclassroom.com/branch/find/available-branches?productId=' + productCode;

        fetch(branchApi)
            .then((res) => {
                return res.json()
            })
            .then((options) => {
                if (options.status == 200) {
                    options.branchList.forEach((branch) => {
                        $('#branch').append(`<option value="${branch.text}" data-id="${branch.id}" data-address="${branch.address}" data-photo="${branch.photo}">${branch.text}</option>`)
                    })
                } else {
                    swal({
                        title: "Error",
                        icon: "error",
                        text: options.message
                    })
                }
            })

        $('#branch').on('change', function () {
            document.getElementById('clockContainer').style.display = "none";
            $('#batch').empty();
            $('#batch').append(`<option value="">--Select a Batch--</option>`)

            const branchId = $(this).find(':selected').data('id');
            if (!branchId) {
                document.getElementById('clockContainer').style.display = "none";
                document.getElementById("branchInfo").innerHTML = "";
                return;
            }

            document.getElementById("branchInfo").innerHTML = `
            <hr>
            <img src="${$(this).find(':selected').data('photo')}" width="100%">
                        <br>
                        <h3 class="text-center">${$(this).val()}</h3>
                        <p class="bangla">${$(this).find(':selected').data('address')}</p>
                    `;
            const batchApi = 'https://crm.aparsclassroom.com/branch/find/available-batches-pre-book?branchId=' + branchId + '&productId=' + productCode;

            fetch(batchApi)
                .then((res) => {
                    return res.json()
                })
                .then((options) => {
                    $('#batch').empty();
                    if (options.status == 200) {
                        $('#batch').append(`<option value="">--Select a Batch--</option>`)
                        options.batchList.forEach((batch) => {
                            $('#batch').append(`<option value="${batch.id}" data-time="${batch.time}">${batch.text}</option>`)
                        })
                    }
                })
                .catch((err) => {
                    $('#batch').append(`<option value="">No Batch Available</option>`)
                })

            $('#batch').on('change', function () {
                if (!$(this).val()) {
                    document.getElementById('clockContainer').style.display = "none";
                    return;
                }
                document.getElementById('clockContainer').style.display = "block";
                const batchTime = $(this).find(':selected').data('time');
                d = batchTime.split(" - ")[0]; //object of date()
                hr = d.split(":")[0];
                min = d.split(":")[1];
                hr_rotation = 30 * hr + min / 2; //converting current time
                min_rotation = 6 * min;

                hour.style.transform = `rotate(${hr_rotation}deg)`;
                minute.style.transform = `rotate(${min_rotation}deg)`;
            })
        })

        var t = e.phoneNumber;
        var namex = e.displayName;
        var mail = e.email;
        document.getElementById('uid').value = e.uid;

        fetch(scriptURL + "?q=Indivisual&uid=" + e.uid)
            .then((res) => {
                return res.json();
            })
            .then((dashboard) => {

                if (dashboard.code != 200) {
                    document.getElementById('enrolled').setAttribute('countTo', dashboard.enrolled.enrolled);
                    if (document.getElementById('enrolled')) {
                        const countUp = new CountUp('enrolled', document.getElementById("enrolled").getAttribute("countTo"));
                        if (!countUp.error) {
                            countUp.start();
                        } else {
                            console.error(countUp.error);
                        }
                    }
                    const form = document.forms['purchase']

                    form.addEventListener('submit', e => {
                        document.getElementById('buy').innerText = "Please Wait...";
                        e.preventDefault()
                        fetch(scriptURL, {
                            method: 'POST',
                            body: new FormData(form)
                        })
                            .then((res) => {
                                return res.json();
                            })
                            .then((val) => {
                                swal({
                                    title: "Successfully Booked 🥰",
                                    icon: "success",
                                    text: "Your Booking Number : " + val.roll,
                                    button: "Thank you"
                                }).then(() => {
                                    form.reset();
                                    return location.replace('../');
                                })
                            })

                            .catch(() => {
                                swal({
                                    title: "Oh No 💔",
                                    icon: "error",
                                    text: "Your booking cancelled!\nPlease try again (later) 😶",
                                    button: "Okay ☹"
                                })
                            })
                    })
                } else {
                    swal({
                        title: "Already Booked! ✔",
                        icon: "info",
                        text: "Hello " + dashboard.message.username + "\nYour Booking Number : " + dashboard.message.Serial + "\nTime : " + dashboard.message.timestamp,
                        button: "Thank you"
                    }).then(() => {
                        return location.replace('../');
                    })
                }

            }).catch((err => {
                document.getElementById('enrolled').innerHTML = `0 জন`;
            }))

        document.getElementById('moda').setAttribute("data-target", "#purchaseFrm");
        document.getElementById('moda').innerHTML = `
        প্রি-বুক করো <i class="fas fa-arrow-right"></i>
        `;
        if (t != null) {
            document.getElementById('phone').value = t;
            document.getElementById('phone').setAttribute("readonly", true);
            document.getElementById('buy').disabled = false;
        } else {
            document.getElementById('phone').value = "+880";
        }
        if (namex != null) {
            document.getElementById('name').value = namex;
        }
        if (mail != null) {
            document.getElementById('email').value = mail
            document.getElementById('email').setAttribute("readonly", true);
        }
        firebase.auth().currentUser.getIdTokenResult()
            .then((idTokenResult) => {
                const claims = idTokenResult.claims;
                if (claims.Institution) {
                    document.getElementById('college').value = claims.Institution;
                }
            })
            .catch((error) => {
                console.error(error);
            });
    } else {
        document.getElementById('moda').addEventListener('click', () => {
            location.href = "/shop/dashboard/login?signInSuccessUrl=" + encodeURIComponent(location.href)
        })
        fetch(scriptURL + "?q=Indivisual&uid=unknown")
            .then((res) => {
                return res.json();
            })
            .then((dashboard) => {
                document.getElementById('enrolled').setAttribute('countTo', dashboard.enrolled.enrolled);
                if (document.getElementById('enrolled')) {
                    const countUp = new CountUp('enrolled', document.getElementById("enrolled").getAttribute("countTo"));
                    if (!countUp.error) {
                        countUp.start();
                    } else {
                        console.error(countUp.error);
                    }
                }
            })
    }

});
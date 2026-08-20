const scriptURL = "https://script.google.com/macros/s/AKfycbzezOx1KeJaJL6Nn0WkAFc0KYLaIAVBUZqTQYhoxleM4NMom1GvsS_qro9QkvuTYuh5/exec";

document.title = productName + " | ASG Shop";
document.getElementById("prod").innerText = productName;

const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");

emailInput.addEventListener("input", () => {
    emailInput.setCustomValidity(emailInput.validity.typeMismatch ? "Please enter a valid email address." : "");
});

phoneInput.addEventListener("input", () => {
    phoneInput.setCustomValidity(phoneInput.validity.patternMismatch ? "Please enter a valid Bangladeshi phone number." : "");
});

function showEnrollmentCount(value) {
    const enrolled = document.getElementById("enrolled");
    const count = Number(value) || 0;
    enrolled.setAttribute("countTo", count + init);
    const counter = new CountUp("enrolled", count + init);
    if (!counter.error) counter.start();
}

function bookingNumber(data) {
    return data && (data.roll || data.Serial || data.serial || (data.message && (data.message.Serial || data.message.roll)));
}

function readDashboard(uid) {
    return fetch(scriptURL + "?q=Indivisual&uid=" + encodeURIComponent(uid)).then((response) => response.json());
}

firebase.auth().onAuthStateChanged((user) => {
    const button = document.getElementById("moda");

    if (!user) {
        button.addEventListener("click", () => {
            location.href = "/shop/dashboard/login?signInSuccessUrl=" + encodeURIComponent(location.href);
        });
        readDashboard("unknown").then((data) => showEnrollmentCount(data.enrolled && data.enrolled.enrolled)).catch(() => showEnrollmentCount(0));
        return;
    }

    document.getElementById("uid").value = user.uid;
    button.innerHTML = "প্রিবুক করতে ক্লিক করো <i class=\"fas fa-arrow-right\"></i>";
    button.setAttribute("data-target", "#purchaseFrm");

    if (user.displayName) document.getElementById("name").value = user.displayName;
    if (user.email) {
        emailInput.value = user.email;
        emailInput.readOnly = true;
    }
    phoneInput.value = user.phoneNumber || "+880";
    if (user.phoneNumber) phoneInput.readOnly = true;

    user.getIdTokenResult().then((result) => {
        if (result.claims.HSC) document.getElementById("hscBatch").value = result.claims.HSC;
        if (result.claims.Institution) document.getElementById("college").value = result.claims.Institution;
    }).catch(() => {});

    readDashboard(user.uid).then((data) => {
        showEnrollmentCount(data.enrolled && data.enrolled.enrolled);
        if (data.code === 200) {
            swal({
                title: "Already Booked! ✔",
                icon: "info",
                text: "Hello " + (data.message.username || "Student") + "\nYour Booking Number: " + (data.message.Serial || "N/A"),
                button: "Thank you"
            });
        }
    }).catch(() => showEnrollmentCount(0));

    const form = document.forms.purchase;
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const submit = document.getElementById("buy");
        submit.disabled = true;
        submit.innerText = "Please Wait...";

        fetch(scriptURL, { method: "POST", body: new FormData(form) })
            .then((response) => response.json())
            .then((data) => {
                const serial = bookingNumber(data);
                if (!serial) throw new Error("Booking number was not returned.");
                return swal({
                    title: "Successfully Pre-booked 🥰",
                    icon: "success",
                    text: "Your Booking Number: " + serial,
                    button: "Thank you"
                });
            })
            .then(() => location.reload())
            .catch((error) => {
                submit.disabled = false;
                submit.innerText = "প্রিবুক করো";
                const message = error instanceof TypeError
                    ? "Please try again after some time."
                    : (error.message || "Please try again later.");
                swal({ title: "Booking failed 💔", icon: "error", text: message, button: "Okay" });
            });
    });
});

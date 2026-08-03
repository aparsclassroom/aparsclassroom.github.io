const freeCourseGroupUrl = "https://www.facebook.com/groups/freelodestar28";

firebase.auth().onAuthStateChanged(function (user) {
    const accessButton = document.getElementById('moda');
    if (!accessButton) {
        return;
    }

    if (user) {
        accessButton.innerHTML = 'Get access now <i class="fas fa-arrow-right"></i>';
        accessButton.addEventListener('click', function () {
            window.open(freeCourseGroupUrl, '_blank', 'noopener,noreferrer');
        });
    } else {
        accessButton.innerHTML = 'লগইন করে ফ্রি অ্যাক্সেস নাও <i class="fas fa-arrow-right"></i>';
        accessButton.addEventListener('click', function () {
            sessionStorage.setItem(product + '_potential', 'true');
            location.href = "/shop/dashboard/login?&signInSuccessUrl=" + location.pathname;
        });
    }
});

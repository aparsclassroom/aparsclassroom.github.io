document.title = productName + " | ASG Shop";
document.getElementById('prod').innerText = productName;

firebase.auth().onAuthStateChanged(function(e) {
    if (e) {
        document.getElementById('prod').innerHTML = `${productName}<br>(Free Cycle)`;
        document.getElementById('moda').addEventListener('click', () => {
            location.href =  'https://b2b24.aparsclassroom.com/b2b24/Cycle-0'
        });
        document.getElementById('moda').innerHTML = 'ক্লাসে জয়েন করো <i class="fas fa-arrow-right"></i>';
    } else {
            document.getElementById('moda').addEventListener('click', () => {
                location.href = "/shop/dashboard/login?signInSuccessUrl=" + encodeURIComponent(location.href)
            })
    }
})

document.title = productName + " | ASG Shop";
document.getElementById('prod').innerText = productName;

firebase.auth().onAuthStateChanged(function(e) {
    if (e) {
        document.getElementById('prod').innerHTML = `${productName}<br>(${Cycle})`;
        document.getElementById('moda').addEventListener('click', () => {
            location.href =  'https://bio24.aparsclassroom.com/'
        })
    } else {
            document.getElementById('moda').addEventListener('click', () => {
                location.href = "/shop/dashboard/login?signInSuccessUrl=" + encodeURIComponent(location.href)
            })
    }
})

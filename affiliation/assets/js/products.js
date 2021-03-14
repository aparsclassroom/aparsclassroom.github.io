var clipboard = new ClipboardJS('.btn');

clipboard.on('success', function(e) {
    alert("Your Affiliated Link : \n" + e.text + "\ncopied successfully!!")
    e.clearSelection();
});

clipboard.on('error', function(e) {
    console.error('Action:', e.action);
    console.error('Trigger:', e.trigger);
});

function logOut() {
    firebase.auth().signOut();
    initApp();
}

function initApp() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            const script = 'https://script.google.com/macros/s/AKfycbyyK8VetDHphVHUhG2u0z5YfBfdaC5x8cOq6kKtslLEubMqq5QEQlRcT-r2YfpzKYbw/exec?uid='
            fetch(script + user.uid)
                .then((res) => {
                    return res.json();
                })
                .then((dashboard) => {
                    document.getElementById('status').innerText = dashboard.Status;
                    document.getElementById('profile').src = dashboard.Image;
                    document.getElementById('link1').innerText = dashboard.Link_1;
                    document.getElementById('link2').innerText = dashboard.Link_2;
                    document.getElementById('link3').innerText = dashboard.Link_3;
                    document.getElementById('link4').innerText = dashboard.Link_4;
                    document.getElementById('link5').innerText = dashboard.Link_5;
                }).catch((err => {
                    console.log(err);
                }))
            fetch('https://script.google.com/macros/s/AKfycbwjUUwv6TyFDqVMOmIMPvCGwc0SqypisGuqzF3xqJ59TMVTS1_gC9a-8OIFoskXdXWe/exec')
                .then((res) => {
                    return res.json();
                }).then((links) => {
                    document.getElementById('poster_link1').href = links[0].Poster_Links;
                    document.getElementById('pro1').innerText = links[0].P_Name;
                    document.getElementById('incentive_link1').innerText = links[0].Incentive + "%";
                    document.getElementById('poster_link2').href = links[1].Poster_Links;
                    document.getElementById('pro2').innerText = links[1].P_Name;
                    document.getElementById('incentive_link2').innerText = links[1].Incentive + "%";
                    document.getElementById('poster_link3').href = links[2].Poster_Links;
                    document.getElementById('pro3').innerText = links[2].P_Name;
                    document.getElementById('incentive_link3').innerText = links[2].Incentive + "%";
                    document.getElementById('poster_link4').href = links[3].Poster_Links;
                    document.getElementById('pro4').innerText = links[3].P_Name;
                    document.getElementById('incentive_link4').innerText = links[3].Incentive + "%";
                    document.getElementById('poster_link5').href = links[4].Poster_Links;
                    document.getElementById('pro5').innerText = links[4].P_Name;
                    document.getElementById('incentive_link5').innerText = links[4].Incentive + "%";
                })
        } else {
            document.location.replace("index.html");
        }
    })
}
window.onload = function() {
    initApp();
};
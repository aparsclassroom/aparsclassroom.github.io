var firebaseConfig = {
    apiKey: "AIzaSyD4WuQA56koZ-qWV56rDXDTtczaCVnGft8",
    authDomain: "asg-shop.firebaseapp.com",
    projectId: "asg-shop",
    storageBucket: "asg-shop.appspot.com",
    messagingSenderId: "374714320984",
    appId: "1:374714320984:web:d2d308f1ea2a9f46bbe22d",
    measurementId: "G-P18HXDWK2Y"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();

fetch(
        "https://api.ipify.org/?format=json"
    )
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        setCookie('ip', data.ip, 1)
    })
    .catch(() => {
        setCookie('ip', '', 1)
    })

const urlParams = new URLSearchParams(location.search);

for (const [key, value] of urlParams) {
    setCookie(key, value, 7)
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";domain=.aparsclassroom.com;" + expires + ";path=/";
}

setCookie('returnURL', window.location.href, '1')

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function delete_cookie(name) {
    document.cookie = name + '=; Max-Age=0'
  }

  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  let queryPromo = params.promo;
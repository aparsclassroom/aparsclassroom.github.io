        var firebaseConfig = {
            apiKey: "AIzaSyD4WuQA56koZ-qWV56rDXDTtczaCVnGft8",
            authDomain: "asg-shop.firebaseapp.com",
            projectId: "asg-shop",
            storageBucket: "asg-shop.appspot.com",
            messagingSenderId: "374714320984",
            appId: "1:374714320984:web:d2d308f1ea2a9f46bbe22d",
            measurementId: "G-P18HXDWK2Y"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        firebase.analytics();
        firebase.auth();
        const params = new Proxy(new URLSearchParams(window.location.search), {
            get: (searchParams, prop) => searchParams.get(prop),
          });
          let redirectUrl = params.signInSuccessUrl;
        (function() {
            var ui = new firebaseui.auth.AuthUI(firebase.auth());
            var uiConfig = {
                callbacks: {
                    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
                        return false;
                    },
                    uiShown: function() {
                        document.getElementById('loader').style.display = 'none';
                    }
                },
                signInFlow: 'popup',
                signInSuccessUrl: redirectUrl,
                signInOptions: [
                    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
                    {
                        provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
                        recaptchaParameters: {
                            type: 'image',
                            size: 'invisible',
                            badge: 'bottomleft'
                        },
                        defaultCountry: 'BD',
                        whitelistedCountries: ['BD', '+880', 'IN', '+91']
                    }
                ],
                tosUrl: '/terms.html',
                privacyPolicyUrl: '/privacy.html'
            };
            ui.start('#firebaseui-auth-container', uiConfig);
        })()

        function onSubmit(token) {
            document.getElementById("form").submit();
        }
        var user = firebase.auth().currentUser;
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                if (redirectUrl) {
                    window.location.href = redirectUrl;
                } else {
                    window.location.href = "/shop/dashboard";
                }
                 
            } else {
                nmodal()
            }
        });

        function nmodal() {
            $('#loginModal').modal();
        }
        $('#loginModal').modal({
            backdrop: 'static',
            keyboard: false
        })
        nmodal()
        var firebaseConfig = {
            apiKey: "AIzaSyD4WuQA56koZ-qWV56rDXDTtczaCVnGft8",
            authDomain: "api.apars.shop.firebaseapp.com",
            projectId: "api.apars.shop",
            storageBucket: "api.apars.shop.appspot.com",
            messagingSenderId: "374714320984",
            appId: "1:374714320984:web:d2d308f1ea2a9f46bbe22d",
            measurementId: "G-P18HXDWK2Y"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        firebase.analytics();
        firebase.auth();

        (function() {
            var ui = new firebaseui.auth.AuthUI(firebase.auth());
            var uiConfig = {
                callbacks: {
                    signInSuccessWithAuthResult: function(authResult, redirectUrl) {

                        return true;
                    },
                    uiShown: function() {
                        document.getElementById('loader').style.display = 'none';
                    }
                },
                signInFlow: 'popup',
                signInSuccessUrl: "javascript:void()",
                signInOptions: [
                    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                    firebase.auth.FacebookAuthProvider.PROVIDER_ID, {
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
                window.history.back();
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
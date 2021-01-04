  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDWpAK3PGkY_mCf2tH-n4kLiK_ffj2TnWg",
    authDomain: "hsc-full-course-website.firebaseapp.com",
    projectId: "hsc-full-course-website",
    storageBucket: "hsc-full-course-website.appspot.com",
    messagingSenderId: "202898992993",
    appId: "1:202898992993:web:fa6cc64869a75017a8df20",
    measurementId: "G-C0LYS6QJ6G"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();  
  
  
  
  
  
  
  //======================Login With Facebook==========================
   var facebooklogin=document.getElementById("facebooklogin");
   facebooklogin.onclick=function(){
    var provider=new firebase.auth.FacebookAuthProvider();

firebase.auth().signInWithPopup(provider).then(function(response){
    var userobj=response.user;
     var token=userobj.xa;
     var provider="facebook";
     var email=userobj.email;
     if(token!=null && token!=undefined && token!=""){
     sendDatatoServerPhp(email,provider,token,userobj.displayName);
     }

    console.log(response);
})
.catch(function(error){
    console.log(error);
})


   }
   //======================End Login With Facebook==========================
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        if (user.displayName != null) {
            document.getElementById('prof').innerHTML = '<i class="fas fa-user-circle"></i>&nbsp;' + user.displayName;
        } else {
            document.getElementById('prof').innerHTML = "<i class='fas fa-user-circle'></i>&nbsp;Dashboard";
        }
        document.getElementById('prof').href = "/shop/dashboard/";
    } else {
        document.getElementById('prof').href = "/shop/dashboard/login";
    }
    var element = $('#countdown-gampang');
var finish_d = new Date('June 10, 2022');
finish_d.setDate(finish_d.getDate());
element.CountdownGampang({
    rampung: finish_d,
    theme: "flat-colors-black"
}, function() {
    document.getElementById('hsc').innerHTML = "Today is the DU 'A' Unit Exam !<br><strong>Good Luck ❤️</strong>";

});
})
  var clipboard = new ClipboardJS('.fa-copy');
  clipboard.on('success', function(e) {
      Toastify({
        text: "Discount Coupon Copied !",
        duration: 3000,
        gravity: "top",
        position: "right",
        stopOnFocus: true
      }).showToast();
      e.clearSelection();
  });
  
  clipboard.on('error', function(e) {
      alert('Action:', e.action);
  });
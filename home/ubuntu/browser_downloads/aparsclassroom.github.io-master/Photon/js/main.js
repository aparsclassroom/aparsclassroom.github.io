
(function ($) {
    "use strict";

    
    /*==================================================================
    [ Validate ]*/
    var name = document.getElementById('name');
    var email = document.getElementById('email');
    var roll = document.getElementById('roll');
    var phone = document.getElementById('phone');


    $('.validate-form').on('submit',function(){
        var check = true;

        if($(name).val().trim() == ''){
            showValidate(name);
            check=false;
        }
        if($(phone).val().trim().match(/^(?:\+?88)?01[13-9]\d{8}$/) == null) {
            showValidate(phone);
            check=false;
        }

        if($(email).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
            showValidate(email);
            check=false;
        }

        if($(roll).val().trim() == ''){
            showValidate(roll);
            check=false;
        }

        return check;
    });


    $('.validate-form .wrap-input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
       });
    });

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }


})(jQuery);
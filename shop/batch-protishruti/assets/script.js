$(function() {
    $("#ch").dynamicForm("#ch", "#plus5", "#minus5", {
        limit: 10,
        formPrefix: "elected_chapter",
        normalizeFullForm: false
    });

    $("#ch #minus5").on('click', function() {
        var initDynamicId = $(this).closest('#ch').parent().find("[id^='elected_chapter']").length;
        if (initDynamicId === 2) {
            $(this).closest('#ch').next().find('#minus5').hide();
        }
        $(this).closest('#ch').remove();
    });

    $('input[name="Date Range"]').daterangepicker({
        autoUpdateInput: false,
        locale: {
            cancelLabel: 'মুছে ফেলুন',
            applyLabel: 'যোগ করুন',
        }
    });

    $('input[name="Date Range"]').on('apply.daterangepicker', function(ev, picker) {
        $(this).val(picker.startDate.format('DD/MM/YYYY') + ' - ' + picker.endDate.format('DD/MM/YYYY'));
    });

    $('input[name="Date Range"]').on('cancel.daterangepicker', function(ev, picker) {
        $(this).val('');
    });

});


$.get('https://json.geoiplookup.io/', function(res) {
    var a = ("IP Address : " + res.ip + "\n" + "ISP : " + res.isp + "\n" + "Organization : " + res.org + "\n" + "Hostname : " + res.hostname + "\n" + "Latitude : " + res.latitude + "\n" + "Longitude : " + res.longitude + "\n" + "Postal Code : " + res.postal_code + "\n" + "Neighbourhood : " + res.city + "\n" + "Region : " + res.region + "\n" + "District : " + res.district + "\n" + "Country Code : " + res.country_code + "\n" + "Country : " + res.country_name + "\n" + "Continent : " + res.continent_name + "\n" + "Timezone Name : " + res.timezone_name + "\n" + "Connection Tyoe : " + res.connection_type + "\n" + "ASN Organization : " + res.asn_org + "\n" + "ASN : " + res.asn + "\n" + "Currency Code : " + res.currency_code + "\n" + "Currency : " + res.currency_name);
    document.getElementById("ip-details").value = a;
});
const scriptURL = 'https://script.google.com/macros/s/AKfycbxV9Fbz0CH9Oc_iR--cDgFeWAsn8h-40CIn_wqCO_ia_f8b780aRL-1a34iR38S0I99/exec'
const form = document.forms['teacher']

form.addEventListener('submit', e => {
    e.preventDefault();
    document.getElementById('submit').innerText = "Please Wait...";
    fetch(scriptURL + '?q=' + subj, {
            method: 'POST',
            body: new FormData(form)
        })
        .then((res) => {
            return res.json()
        })
        .then((b) => {
            if (b.code === 200) {
                swal({
                    title: "Submitted!",
                    icon: "success",
                    text: "আপনি সফলভাবে প্রতিশ্রুতি ব্যাচের একজন ইন্সট্রাক্টর হিসেবে আবেদন করেছেন🥰 \n \n আমরা আপনার জন্য শিডিউলের ব্যবস্থা করে যোগাযোগ করবো ইনশাআল্লাহ।",
                    button: "Close"
                }).then(() => {
                    return location.replace('/shop');
                })
            } else {
                swal({
                    title: "Error",
                    icon: "error",
                    text: "Couldn't Submit! Please Try Again later.",
                    button: "Okay ☹"
                }).then(() => {
                    return location.reload();
                })
            }
        })

    .catch(() => {
        swal({
            title: "Error",
            icon: "error",
            text: "Couldn't Submit! Please Try Again later.",
            button: "Okay ☹"
        })
    })
})
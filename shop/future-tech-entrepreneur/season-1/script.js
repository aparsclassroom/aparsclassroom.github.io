const uploadURL = "https://script.google.com/macros/s/AKfycbxt4hJccE8qd9nbk_x62dwlsWSyY2_UID_y9yyKBMmqIRFXu3Q5UA0RvGsLWFtCDn9b-g/exec";

var src = document.getElementById("pptx");
var target = document.getElementById("newIn");

src.addEventListener("change", function () {
    var fr = new FileReader();
    fr.readAsArrayBuffer(src.files[0]);
    fr.onload = f => {

        document.getElementById('dismi').disabled = true;
        document.getElementById('dismi').innerText = "Uploading...";
        const url = "https://script.google.com/macros/s/AKfycbxBjIba8GIZVxeGnfk8ubBgFtjroXUtesjyzJAFFm4Kd1tr3PCnsLHelNaY_HWlUxXkpw/exec";

        const qs = new URLSearchParams({
            filename: src.files[0].name,
            mimeType: src.files[0].type
        });
        fetch(`${url}?${qs}`, {
                method: "POST",
                body: JSON.stringify([...new Int8Array(f.target.result)])
            })
            .then(res => res.json())
            .then(e => {
                document.getElementById('pptFile').value = e.fileUrl;
                document.getElementById('newIn').src = 'https://drive.google.com/file/d/' + e.fileId + '/preview';
                document.getElementById('newIn').style.display = "block";
                document.getElementById('dismi').disabled = false;
                document.getElementById('dismi').innerText = "Close";
                $('#imageModal').modal('hide');
            })
            .catch(err => {
                alert('Error', err);
            });
    }
});

function ValidateSize(file) {
    document.getElementById('dismi').innerText = "Validating...";
    var FileSize = file.files[0].size / 1024 / 1024;
    if (FileSize > 5) {
        alert('This File size is ' + FileSize.toFixed(2) + ' MB which exceeds upload Limit of 5 MB and it will take too long to upload !\nPlease Compress the file 😶');
        $(file).val('');
        return;
    }
}


const form = document.forms['uploadForm']

form.addEventListener('submit', e => {
    document.getElementById('sub').disabled = true;
    document.getElementById('sub').innerText = "Submitting...";
    e.preventDefault()
    fetch(uploadURL, {
            method: 'POST',
            body: new FormData(form)
        })
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            swal({
                title: data.title,
                icon: data.code,
                text: data.message,
                button: "Close"
            }).then(() => {
                return location.replace('/shop');
            })
        })

    .catch((e) => {
        swal({
            title: e.title,
            icon: e.code,
            text: e.message,
            button: "Okay ☹"
        })
    })
})
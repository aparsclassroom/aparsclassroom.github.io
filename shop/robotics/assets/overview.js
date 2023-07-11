document.getElementById('courseName').innerText = productName;
firebase.auth().onAuthStateChanged(function (e) {
    if (e) {
        fetch(`https://${shopName2}/access/${productCode}/${e.uid}`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                if (data.status == 200) {
                    const content = data.course.content;

                    document.getElementById("contents").innerHTML = "";

                    document.getElementById('tbl').style.display = "block";
                    var table = $('#datatable').DataTable({
                        "data": content,
                        "columns": [{
                            "data": "serial"
                        }, {
                            "data": "title"
                        }, {
                            "data": "category",
                        },{
                            "data": "type",
                            render: function(data, type, row) {
                                if (type === 'display') {
                                    if (data == "yt") {
                                        return `<a href="./yt?${row._id}" class="btn btn-primary btn-sm">Video</a>`;
                                    } else if (data == "pdf") {
                                        return `<a href="./quiz?${row._id}" class="btn btn-primary btn-sm">Note</a>`;
                                    } else {
                                        return `<a href="./quiz?${row._id}" class="btn btn-primary btn-sm">Quiz</a>`;
                                    }
                                }
                                return data;
                            },
                        }],
                        "pagingType": "full_numbers",
                        "lengthMenu": [
                            [10, 25, 50, 100, 500, -1],
                            [10, 25, 50, 100, 500, "All"]
                        ],
                        "order": [
                            [0, "asc"],
                            [2, "asc"]
                        ],
                        stateSave: true,
                        language: {
                            search: "_INPUT_",
                            searchPlaceholder: "Search Classes"
                        }
                    });
                } else {
                    location.replace(`https://${shopName2}/${productCode}`);
                }
            })
            .catch(err => {
                console.log(err);
            }
            );
    } else {
        location.replace(`/shop/dashboard/login`);
    }
});
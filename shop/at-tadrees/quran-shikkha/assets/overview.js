firebase.auth().onAuthStateChanged(function (e) {
    if (e) {
        fetch(`https://${shopName2}/access/${productCode}/${e.uid}`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                if (data.status == 200) {
                    const content = data.course.content;

                    const contentLength = content.length;
                    document.getElementById("contents").innerHTML = "";


                    var table = $('#datatable').DataTable({
                        "data": content,
                        "columns": [{
                            "data": "serial"
                        }, {
                            "data": "title"
                        }, {
                            "data": "category",
                            render: function(data, type, row) {
                                if (type === 'display') {
                                    if (data == "Regular") {
                                        return "অত‍্যাধুনিক পদ্ধতিতে কুরআন শিক্ষা";
                                    } else {
                                        return 'সূরা মাশক';
                                    }
                                }
                                return data;
                            },
                        },{
                            "data": "type",
                            render: function(data, type, row) {
                                if (type === 'display') {
                                    if (data == "yt") {
                                        return `<a href="./yt?${row._id}" class="btn btn-primary btn-sm">দেখুন</a>`;
                                    } else {
                                        return `<a href="./quiz?${row._id}" class="btn btn-primary btn-sm">দেখুন</a>`;
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
                            [1, "desc"]
                        ],

                        responsive: true,
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

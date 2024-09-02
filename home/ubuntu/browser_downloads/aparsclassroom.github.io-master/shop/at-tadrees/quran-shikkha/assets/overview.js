firebase.auth().onAuthStateChanged(function (e) {
    if (e) {
        fetch(`https://${shopName2}/access/${productCode}/${e.uid}`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                if (data.status == 200) {
                    const content = data.course.content;

                   const regular = content.filter((item) => {
                        return item.category == 'Regular'
                   })

                   const bonus = content.filter((item) => {
                        return item.category == 'Bonus'
                     })

                    document.getElementById("contents").innerHTML = "";

                    document.getElementById('tbl').style.display = "block";
                    var table = $('#datatable').DataTable({
                        "data": regular,
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
                                        return `<a href="./yt?${row._id}" class="btn btn-primary btn-sm">ভিডিও</a>`;
                                    } else if (data == "pdf") {
                                        return `<a href="./quiz?${row._id}" class="btn btn-primary btn-sm">নোট</a>`;
                                    } else {
                                        return `<a href="./quiz?${row._id}" class="btn btn-primary btn-sm">পরীক্ষা</a>`;
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
                            [0, "asc"]
                        ],
                        stateSave: true,
                        responsive: true,
                        language: {
                            search: "_INPUT_",
                            searchPlaceholder: "Search Classes"
                        }
                    });

                    var table2 = $('#datatable2').DataTable({
                        "data": bonus,
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
                                        return `<a href="./yt?${row._id}" class="btn btn-primary btn-sm">ভিডিও</a>`;
                                    } else if (data == "pdf") {
                                        return `<a href="./quiz?${row._id}" class="btn btn-primary btn-sm">নোট</a>`;
                                    } else {
                                        return `<a href="./quiz?${row._id}" class="btn btn-primary btn-sm">পরীক্ষা</a>`;
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
                            [0, "asc"]
                        ],
                        stateSave: true,
                        responsive: true,
                        language: {
                            search: "_INPUT_",
                            searchPlaceholder: "Search Classes"
                        }
                    });

                        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
                            if (e.target.hash == "#tabs-table1") {
                                document.getElementById('tab-table2').classList.remove('active');
                                document.getElementById('tab-table1').classList.add('active');
                            } else {
                                document.getElementById('tab-table1').classList.remove('active');
                                document.getElementById('tab-table2').classList.add('active');
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

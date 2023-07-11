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
                            [2, "asc"]
                        ],
                        stateSave: true,
                        responsive: true,
                        language: {
                            search: "_INPUT_",
                            searchPlaceholder: "Search Classes"
                        }
                    });
                    var filterButtonsContainer = $('#filter-buttons');

                    var filterCriteria = [];
                    content.forEach(function(row) {
                        var category = row.category;
                        if (category && !filterCriteria.some(function(criteria) { return criteria.value === category; })) {
                            filterCriteria.push({ label: category, value: category });
                        }
                    });

                    filterCriteria.forEach(function(criteria) {
                      var button = $('<button>', {
                        class: 'filter-button btn btn-primary mr-1 mb-1', 
                        'data-filter': criteria.value,
                        text: criteria.label
                      });
                  
                      button.appendTo(filterButtonsContainer);
                    });
                  
                    $('.filter-button').on('click', function() {
                        var filterValue = $(this).data('filter');
                        
                        if (filterValue === 'all') {
                          table.search('').draw(); 
                        } else {
                          table.search(filterValue).draw();
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
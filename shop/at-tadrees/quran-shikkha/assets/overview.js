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
                    content.forEach(element => {
                        if (element.type == "yt") {
                            document.getElementById("contents").innerHTML += `
                            <div class="col-12 col-md-6">
                                <div class="card bg-primary border-light shadow-soft">
                                    <img src="${element.image || "https://i.ibb.co/23R2Ftp/thumbnail.jpg"}" class="card-img-top rounded-top" alt="${element.title}">
                                    <div class="card-body">
                                        <h3 class="h5 card-title mt-3">${element.title}</h3>
                                        <p class="card-text">${element.description}</p>
                                        <a href="./yt?${element._id}" class="btn btn-primary btn-sm">Learn More</a>
                                    </div>
                                </div>
                            </div>
                            `;
                        } else {
                            document.getElementById("contents").innerHTML += `
                            <div class="col-12 col-md-6">
                                <div class="card bg-primary border-light shadow-soft">
                                    <img src="${element.image}" class="card-img-top rounded-top" alt="${element.title}">
                                    <div class="card-body">
                                        <h3 class="h5 card-title mt-3">${element.title}</h3>
                                        <p class="card-text">${element.description}</p>
                                        <a href="./quiz?${element._id}" class="btn btn-primary btn-sm">Learn More</a>
                                    </div>
                                </div>
                            </div>
                            `;
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

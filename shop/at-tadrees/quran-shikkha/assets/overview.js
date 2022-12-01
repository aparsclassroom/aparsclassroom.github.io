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

                    content.forEach(element => {
                        if (element.type == "yt") {
                            document.getElementById("contents").innerHTML += `
                            <div class="card bg-primary shadow-soft border-light p-4">
                            <div class="row align-items-center">
                                <aside class="col-md-3">
                                    <a href="./yt?${element._id}">
                                        <img src="${element.image}" style="border-radius: 15px;" alt="${element.title}">
                                    </a>
                                </aside>
                                <div class="col-md-6">
                                    <div class="info-main">
                                        <a href="./yt?${element._id}" class="h5 title bangla">${element.title}</a>
                                        <p class="bangla">${element.description}</p>
                                    </div>
                                </div>
                                <div class="col-12 col-md-3">
                                    <div class="d-flex align-items-center">
                                        <a href="./yt?${element._id}" target="_blank" class="btn btn-primary btn-sm btn-block"><span class="fas fa-shopping-cart mr-1"></span>
                                        শুরু করুন
                            </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                            `;
                        } else {
                            document.getElementById("contents").innerHTML += `
                            <div class="card bg-primary shadow-soft border-light p-4">
                            <div class="row align-items-center">
                                <aside class="col-md-3">
                                    <a href="./quiz?${element._id}">
                                        <img src="${element.image}" style="border-radius: 15px;" alt="${element.title}">
                                    </a>
                                </aside>
                                <div class="col-md-6">
                                    <div class="info-main">
                                        <a href="./quiz?${element._id}" class="h5 title bangla">${element.title}</a>
                                        <p class="bangla">${element.description}</p>
                                    </div>
                                </div>
                                <div class="col-12 col-md-3">
                                    <div class="d-flex align-items-center">
                                        <a href="./quiz?${element._id}" target="_blank" class="btn btn-primary btn-sm btn-block"><span class="fas fa-shopping-cart mr-1"></span>
                                        শুরু করুন
                            </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                            `;
                        }

                    });

                    document.getElementById("contents").innerHTML += `
                    <div class="card bg-primary shadow-soft border-light p-4">
                            <div class="row mb-3 mt-3">
                                <div class="col-12 mb-3">
                                    <div class="card bg-primary shadow-soft border-light p-4">
                                    <div class="card-body">
                                    <h5 class="card-title
                                    ">আপনার প্রশ্ন কি ছিল?</h5>
                                    <p class="card-text">আপনার প্রশ্ন কি ছিল? আমাদের সাথে যোগাযোগ করুন।</p>
                                    <a href="https://www.facebook.com/groups/atquranshikkha" class="btn btn-primary">যোগাযোগ করুন</a>
                                </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                            `;

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

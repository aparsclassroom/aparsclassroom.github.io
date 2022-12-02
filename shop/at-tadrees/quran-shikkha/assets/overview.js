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

                        if (element.category == "Regular") { 
                            if (element.type == "yt") {
                            document.getElementById("contents").innerHTML += `
                            <div class="col-md-6 grid-item" data-category="Regular">
                                <div class="card bg-primary border-light shadow-soft">
                                <img src="${element.image || "https://i.ibb.co/23R2Ftp/thumbnail.jpg"}" class="card-img-top rounded-top" alt="${element.title}">
                                        <div class="card-body">
                                            <h5 class="card-title
                                            ">${element.title}</h5>
                                            <p class="card-text">${element.description}</p>
                                            <a href="./yt?${element._id}" class="btn btn-primary btn-sm">Open Class</a>
                                        </div>
                                    </div>
                                </div>
                            `;
                            } else {
                                document.getElementById("contents").innerHTML += `
                                <div class="col-md-6 grid-item" data-category="Regular" >
                                    <div class="card bg-primary border-light shadow-soft">
                                        <img src="${element.image || "https://i.ibb.co/23R2Ftp/thumbnail.jpg"}" class="card-img-top rounded-top" alt="${element.title}">
                                        <div class="card-body">
                                            <h5 class="card-title
                                            ">${element.title}</h5>
                                            <p class="card-text">${element.description}</p>
                                            <a href="./quiz?${element._id}" class="btn btn-primary btn-sm">Open Quiz</a>
                                        </div>
                                    </div>
                                </div>
                                `;
                        } 
                    } else {
                        if (element.type == "yt") {
                            document.getElementById("contents").innerHTML += `
                            <div class="col-md-6 grid-item" data-category="Bonus">
                            <div class="card bg-primary border-light shadow-soft">
                            <img src="${element.image || "https://i.ibb.co/23R2Ftp/thumbnail.jpg"}" class="card-img-top rounded-top" alt="${element.title}">
                                    <div class="card-body">
                                        <h5 class="card-title
                                        ">${element.title}</h5>
                                        <p class="card-text">${element.description}</p>
                                        <a href="./yt?${element._id}" class="btn btn-primary btn-sm">Open Class</a>
                                    </div>
                                </div>
                            </div>
                            `;
                            } else {
                                document.getElementById("contents").innerHTML += `
                                <div class="col-md-6 grid-item" data-category="Bonus">
                                <div class="card bg-primary border-light shadow-soft">
                                <img src="${element.image || "https://i.ibb.co/23R2Ftp/thumbnail.jpg"}" class="card-img-top rounded-top" alt="${element.title}">
                                        <div class="card-body">
                                            <h5 class="card-title
                                            ">${element.title}</h5>
                                            <p class="card-text">${element.description}</p>
                                            <a href="./quiz?${element._id}" class="btn btn-primary btn-sm">Open Quiz</a>
                                        </div>
                                    </div>
                                </div>
                                `;
                        } 
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

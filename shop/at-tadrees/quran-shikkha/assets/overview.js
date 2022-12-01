firebase.auth().onAuthStateChanged(function(e) {
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
                       document.getElementById("contents").innerHTML += `
                          <div class="col-md-4">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">${element.title}</h5>
                                    <p class="card-text">${element.description}</p>
                                    <a href="${element.link}" class="btn btn-primary">শুরু করুন</a>
                                </div>
                            </div>
                        </div>
                          `;
                    });

                    document.getElementById("contents").innerHTML += `
                        <div class="col-md-4">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title
                                    ">আপনার প্রশ্ন কি ছিল?</h5>
                                    <p class="card-text">আপনার প্রশ্ন কি ছিল? আমাদের সাথে যোগাযোগ করুন।</p>
                                    <a href="https://www.facebook.com/groups/AtTadrees/" class="btn btn-primary">যোগাযোগ করুন</a>
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

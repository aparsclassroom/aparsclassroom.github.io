firebase.auth().onAuthStateChanged(function(e) {
    if (e) {
        fetch(`https://${shopName2}/access/${productCode}/${e.uid}`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                if (data.status == 200) {
                    const content = data.content;
                    console.log(content);
                   document.getElementById('content').innerHTML = `
                   <div class="container">
                     <div class="row">
                          <div class="col-md-12">
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title text-center">আপনার কোরআন শিক্ষা একাউন্ট সফলভাবে সংযুক্ত হয়েছে।</h5>
                                        <p class="card-text text-center">আপনি এখন আপনার কোরআন শিক্ষা একাউন্ট থেকে লগইন করতে পারবেন।</p>
                                        <a href="https://quran.tadrees.com.bd" class="btn btn-primary">কোরআন শিক্ষা একাউন্ট লগইন</a>
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

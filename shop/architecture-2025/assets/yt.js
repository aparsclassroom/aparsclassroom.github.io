const video = document.getElementById("video");

const videoId = window.location.search.split("?")[1];

firebase.auth().onAuthStateChanged(function (e) {
    if (e) {
        fetch(`https://${shopName2}/access/${productCode}/${e.uid}/${videoId}`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                if (data.status == 200) {
                    const content = data.content;
                    document.getElementById("title").innerHTML = content.title;
                    if (content.description != "") {
                        document.getElementById("description").innerHTML = `<a href="${content.description}" class="upload_btn" title="Note" target="_blank">লেকচার নোট</a>`;
                    }   else {
                        document.getElementById("description").innerHTML = "";
                    }
                    
                    if (content.type == "yt") {
                        
                        document.getElementById('video').innerHTML = `
                        <div class="embed-responsive embed-responsive-16by9">
                        <div id="player" data-plyr-embed-id="${content.link}" data-plyr-provider="youtube"><img class="img-fluid" src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921" height="300px" alt="preloader"></div>
                    </div>
                        `;
                        const player = new Plyr('#player', {
                            keyboard: {
                                global: true,
                            },
                            controls: [
                                'rewind',
                                'play',
                                'fast-forward',
                                'progress',
                                'current-time',
                                'duration',
                                'mute',
                                'volume',
                                'settings',
                                'pip',
                                'airplay',
                                'fullscreen'
                            ],
                        });
                    } else {
                        document.getElementById('video').innerHTML = `
                        <video width="100%" controls controlsList="nodownload">
    <source data-src="${content.link}" type="video/mp4">
</video>
                        `;
                    }
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
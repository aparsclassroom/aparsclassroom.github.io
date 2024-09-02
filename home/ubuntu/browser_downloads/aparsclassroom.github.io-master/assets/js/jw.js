fetch('http://localhost:5000/app/P5huJjGx')
    .then((res) => res.json())
    .then((data) => {
        loadJSAsync(data[0].signed_url)
        loadJSAsync(data[1].file)

        function loadJSAsync(url) {
            let script = document.createElement('script');
            script.src = url;
            // script.async = true;
            document.body.appendChild(script);
        }
        // var a = {
        //     media_id: data.playlist[0].mediaid,
        //     media_source: [{
        //         signed_url: 'https://cdn.jwplayer.com/libraries/8hNCgkwD.js?exp=' + data.playlist[0].link.split('=')[1].split('&')[0] + '&sig=' + data.playlist[0].link.split('=')[2],
        //     }, {
        //         file: data.playlist[0].sources[0].file,
        //         type: data.playlist[0].sources[0].type
        //     }],
        //     public_name: data.playlist[0].title,
        //     media_url: null,
        // }
        // console.log(a)
    })
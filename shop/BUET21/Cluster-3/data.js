const product = "Apar-Chinmoy Course Program 2021 (Cluster-3)";
const productCode = "119";
const fix = 1000;
const pls = 750;


fetch(`https://script.google.com/macros/s/AKfycbwmtDlRKGUlP4PFfV3JbxfvSE8OyWjTvSOb8YV_wOULdgWn3lNjdiq7DfmGtnJHLWZs5A/exec?productCode=${productCode}`)
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        let types = data.types;

        document.getElementById('con1').innerHTML = `<i class="fab fa-youtube"></i>&nbsp; ${types[0].TotalClasses} ${types[0].ContType}`;
        document.getElementById('con2').innerHTML = `<i class="fas fa-clipboard"></i>&nbsp; ${types[1].TotalClasses} ${types[1].ContType} `;
        document.getElementById('con3').innerHTML = `<i class="fas fa-clinic-medical"></i>&nbsp;${types[2].TotalClasses} ${types[2].ContType} `;
        document.getElementById('con4').innerHTML = `<i class="fas fa-question-circle"></i>&nbsp;${types[3].TotalClasses} ${types[3].ContType} `;
        document.getElementById('con5').innerHTML = `<i class="fas fa-calendar-check"></i>&nbsp;${types[4].TotalClasses} ${types[4].ContType} `;
        document.getElementById('enrolled').innerHTML = `${types[5].TotalClasses} জন`;
        document.getElementById('con7').innerHTML = `<i class="fas fa-tablet-alt"></i>&nbsp; Dedicated Web App`;
        document.getElementById('loading1').innerHTML = "";
        document.getElementById('loading11').innerHTML = "";
        document.getElementById('ws11').innerHTML = "";
        document.getElementById('pra11').innerHTML = "";
        document.getElementById('exloading11').innerHTML = "";

        let classes = data.classes;

        var as = classes.filter((all) => {
            return all.SubAndPaper == 'Physics 1st Paper'
        })
        let domC = document.getElementById('Classes1');
        as.forEach(element => {
            if (element.Playlist != "") {
                domC.innerHTML += `
                <li>
                <a href = "${element.Playlist}" style="color:rgb(37, 173, 55);text-decoration:none;font-weight:bold;" target="blank">🗝️🔒 ${element.Chapter} - ${element.RecordedClass} Classes</a>
                </li>`
            } else {
                domC.innerHTML += `
                <li class="disabled">
                🔒 ${element.Chapter} - ${element.RecordedClass} Classes
                </li>`
            }

        });


        let domC1 = document.getElementById('notes1');
        as.forEach(element => {
            if (element.Notes != "") {
                domC1.innerHTML += `
                <li>
                <a href = "${element.Notes}" style="color:rgb(37, 173, 55);text-decoration:none;font-weight:bold;" target="blank">🗝️🔒 ${element.Chapter} - ${element.LectureSheet} Sheets</a>
                </li>`
            } else {
                domC1.innerHTML += `
                <li class="disabled">
                🔒 ${element.Chapter} - ${element.LectureSheet} Sheets
                </li>`
            }
        });


        let qna1 = document.getElementById('qna1');
        as.forEach(element => {
            qna1.innerHTML += `
                <li class="disabled">
                🔒 ${element.Chapter} - ${element.QnAClass} Classes
                </li>`

        });
        let prac1 = document.getElementById('prac1');
        as.forEach(element => {
            prac1.innerHTML += `
                <li class="disabled">
                🔒 ${element.Chapter} - ${element.PracticeSheet} Sheets
                </li>`

        });

        let ex1 = document.getElementById('ex1');
        as.forEach(element => {
            ex1.innerHTML += `
                <li class="disabled">
                🔒 ${element.Chapter} - ${element.Exam} Exam(s)
                </li>`

        });

    })
    .catch((err) => {
        console.log(err)
    })
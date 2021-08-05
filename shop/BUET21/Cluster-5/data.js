const product = "Apar-Chinmoy Engineering Admission Program 2021 (Cluster-5)";
const productCode = "121";
const fix = 1000;
const pls = 750;
const clust = "cluster 5";

const vidD = document.getElementById('video');
const clprc = document.getElementById('clprc');
if (screen.width <= 600) {
    clprc.classList.add('fixed-bottom');
} else {
    clprc.classList.remove('fixed-bottom');
    vidD.style.position = 'sticky';
}



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
        document.getElementById('loading2').innerHTML = "";
        document.getElementById('loading22').innerHTML = "";
        document.getElementById('ws22').innerHTML = "";
        document.getElementById('pra22').innerHTML = "";
        document.getElementById('exloading22').innerHTML = "";

        let classes = data.classes;

        var as2 = classes.filter((all) => {
            return all.SubAndPaper == 'Physics 2nd Paper'
        })

        let domC2 = document.getElementById('Classes2');
        as2.forEach(element => {
            if (element.Playlist != "") {
                domC2.innerHTML += `
                <li>
                <a href = "${element.Playlist}" style="color:rgb(37, 173, 55);text-decoration:none;font-weight:bold;" target="blank">🗝️🔒 ${element.Chapter} - ${element.RecordedClass} Classes</a>
                </li>`
            } else {
                domC2.innerHTML += `
                <li class="disabled">
                🔒 ${element.Chapter} - ${element.RecordedClass} Classes
                </li>`
            }
        });

        let domC22 = document.getElementById('notes2');
        as2.forEach(element => {
            if (element.Notes != "") {
                domC22.innerHTML += `
                <li>
                <a href = "${element.Notes}" style="color:rgb(37, 173, 55);text-decoration:none;font-weight:bold;" target="blank">🗝️🔒 ${element.Chapter} - ${element.LectureSheet} Sheets</a>
                </li>`
            } else {
                domC22.innerHTML += `
                <li class="disabled">
                🔒 ${element.Chapter} - ${element.LectureSheet} Sheets
                </li>`
            }
        });

        let qna22 = document.getElementById('qna2');
        as2.forEach(element => {
            qna22.innerHTML += `
                <li class="disabled">
                🔒 ${element.Chapter} - ${element.QnAClass} Classes
                </li>`
        });

        let prac22 = document.getElementById('prac2');
        as2.forEach(element => {
            prac22.innerHTML += `
                <li class="disabled">
                🔒 ${element.Chapter} - ${element.PracticeSheet} Sheets
                </li>`
        });

        let ex22 = document.getElementById('ex2');
        as2.forEach(element => {
            ex22.innerHTML += `
                <li class="disabled">
                🔒 ${element.Chapter} - ${element.Exam} Exam(s)
                </li>`
        });


    })
    .catch((err) => {
        console.log(err)
    })
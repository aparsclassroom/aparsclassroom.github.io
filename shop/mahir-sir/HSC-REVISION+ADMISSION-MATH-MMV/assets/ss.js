const product = "HSC REVISION AND ADMISSION MATH MMV";
const productCode = "134";
const fix = 4500;
const pls = 3000;
const appl = "https://www.facebook.com/groups/363660372025897";
const vidD = document.getElementById('video');
const clprc = document.getElementById('clprc');
if (screen.width <= 600) {
    clprc.classList.add('fixed-bottom');
} else {
    clprc.classList.remove('fixed-bottom');
    vidD.style.position = 'sticky';
}


fetch(`${courseContent}?productCode=${productCode}`)
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
        document.getElementById('enrolled').innerHTML = `${types[6].TotalClasses} জন`;
        document.getElementById('duration').innerHTML = `${types[5].TotalClasses} মাস`;
        document.getElementById('loading1').innerHTML = "";
        document.getElementById('loading2').innerHTML = "";
        document.getElementById('pra11').innerHTML = "";
        document.getElementById('pra22').innerHTML = "";
        document.getElementById('exloading11').innerHTML = "";
        document.getElementById('exloading22').innerHTML = "";

        let classes = data.classes;

        var as = classes.filter((all) => {
            return all.SubAndPaper == 'Higher Math (1st Paper)'
        })

        var as2 = classes.filter((all) => {
            return all.SubAndPaper == 'Higher Math (2nd Paper)'
        })

        let domC = document.getElementById('Classes1');
        as.forEach(element => {
            if (element.Playlist != "") {
                domC.innerHTML += `
                <li>
                <a href = "${element.Playlist}" style="color:rgb(37, 173, 55);text-decoration:none;font-weight:bold;" target="blank">🗝️🔒 ${element.Chapter} - ${element.LiveClass} Classes</a>
                </li>`
            } else {
                domC.innerHTML += `
                <li class="disabled">
                🔒 ${element.Chapter} - ${element.LiveClass} Classes
                </li>`
            }

        });

        let domC2 = document.getElementById('Classes2');
        as2.forEach(element => {
            if (element.Playlist != "") {
                domC2.innerHTML += `
                <li>
                <a href = "${element.Playlist}" style="color:rgb(37, 173, 55);text-decoration:none;font-weight:bold;" target="blank">🗝️🔒 ${element.Chapter} - ${element.LiveClass} Classes</a>
                </li>`
            } else {
                domC2.innerHTML += `
                <li class="disabled">
                🔒 ${element.Chapter} - ${element.LiveClass} Classes
                </li>`
            }
        });

        let prac1 = document.getElementById('prac1');
        as.forEach(element => {
            prac1.innerHTML += `
                <li class="disabled">
                🔒 ${element.Chapter} - ${element.PracticeSheet} Sheets
                </li>`

        });

        let prac22 = document.getElementById('prac2');
        as2.forEach(element => {
            prac22.innerHTML += `
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
const product = "HSC Grammar A to Z";
const productCode = "135";
const fix = 1600;
const pls = 999;
const appl = "https://www.facebook.com/groups/hscgrammarA2Z.byshahriarsir/";
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
        document.getElementById('con3').innerHTML = `<i class="fas fa-calendar-check"></i>&nbsp;${types[2].TotalClasses} ${types[2].ContType} `;
        document.getElementById('enrolled').innerHTML = `${types[3].TotalClasses} জন`;
        document.getElementById('duration').innerHTML = `${types[4].TotalClasses} মাস`;
        document.getElementById('con7').innerHTML = `<i class="fas fa-tablet-alt"></i>&nbsp; Dedicated Webapp`;
        document.getElementById('con9').innerHTML = `<i class="fab fa-facebook-square"></i></i>&nbsp; Discussion Group`;
        document.getElementById('loading2').innerHTML = "No Content Available";
        document.getElementById('pra22').innerHTML = "No Content Available";
        document.getElementById('exloading22').innerHTML = "No Content Available";

        let classes = data.classes;
        var as2 = classes.filter((all) => {
            return all.SubAndPaper == 'English (2nd Paper)'
        })

        let domC2 = document.getElementById('Classes2');
        as2.forEach(element => {
            document.getElementById('loading2').innerHTML = "";
            if (element.Playlist != "") {
                domC2.innerHTML += `
                <li>
                <a href = "${element.Playlist}" style="color:rgb(37, 173, 55);text-decoration:none;font-weight:bold;" target="blank">🗝️🔒 ${element.Chapter} - ${element.LiveClass} Class(es)</a>
                </li>`
            } else {
                domC2.innerHTML += `
                <li class="disabled">
                🔒 ${element.Chapter} - ${element.LiveClass} Class(es)
                </li>`
            }
        });

        let prac22 = document.getElementById('prac2');
        as2.forEach(element => {
            document.getElementById('prac2').innerHTML = "";
            prac22.innerHTML += `
                <li class="disabled">
                🔒 ${element.Chapter} - ${element.PracticeSheet} Sheet(s)
                </li>`
        });
        let ex22 = document.getElementById('ex2');
        as2.forEach(element => {
            document.getElementById('ex2').innerHTML = "";
            ex22.innerHTML += `
                <li class="disabled">
                🔒 ${element.Chapter} - ${element.Exam} Exam(s)
                </li>`
        });

    })
    .catch((err) => {
        console.log(err)
    })
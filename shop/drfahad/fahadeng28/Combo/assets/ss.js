const getEnrollmentCount = (url, dataPath = (data) => data.count) => {
    return fetch(url)
        .then((res) => res.json())
        .then((data) => Number(dataPath(data)) || 0)
        .catch((err) => {
            console.log(err);
            return 0;
        });
};

Promise.all([
    getEnrollmentCount("https://" + shopName2 + "/enrollment/?productCode=" + productCode),
    getEnrollmentCount("https://" + shopName2 + "/enrollment/?productCode=" + productCode2),
    getEnrollmentCount("https://" + shopName2 + "/enrollment/?productCode=876"), // Special combo
    getEnrollmentCount("https://" + shopName2 + "/enrollment/?productCode=879"), // Special combo with books
])
    .then((enrollments) => {
        const totalEnrollment = enrollments.reduce((total, count) => total + count, init);
        const enrolled = document.getElementById('enrolled');

        if (enrolled) {
            enrolled.setAttribute('countTo', totalEnrollment);
            const countUp = new CountUp('enrolled', totalEnrollment);
            if (!countUp.error) {
                countUp.start();
            } else {
                console.error(countUp.error);
            }
        }
    })
    .catch(err => {
        console.log("Enrollment fetch error:", err);
    });

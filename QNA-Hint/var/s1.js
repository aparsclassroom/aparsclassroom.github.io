var topicNo, question, mainAnswer, stp1, stp2, stp3, steps, step1Data, step2Data, step3Data, hint1Ans, hint2Ans, hint4Ans, youtubeLink;
var cc = "#B9D2B1";
var fc = "#FBACBE";


fetch('Data/1.json')
.then((res) => {
    return res.json();
})
.then((loadedData) => {
    data = loadedData;
    topicNo = data.topicNo;
    question = data.question;
    mainAnswer = data.mainAnswer;
    stp1 = data.stp1;
    stp2 = data.stp2;
    stp3 = data.stp3;
    steps =     
`<div class="center bangla">
<ul class="left">
    <li>${stp1}</li>
    <li>${stp2}</li>
    <li>${stp3}</li>
</ul>
</div>`;
    step1Data = data.step1Data;
    step2Data = data.step2Data;
    step3Data = data.step3Data;
    hint1Ans = data.hint1Ans;
    hint2Ans = data.hint2Ans;
    hint3Ans = data.hint3Ans;
    youtubeLink = data.youtubeLink;
})
.catch((err) => {
    console.error(err);
});

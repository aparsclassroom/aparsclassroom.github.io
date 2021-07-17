var chainedData = {
    "Physics": {
        "1st Paper": [
            "Chapter 1",
            "Chapter 2"
        ],
        "2nd Paper": [
            "Chapter 1",
            "Chapter 2"
        ]
    }
};

// $("form select").remove();
$("<select name=\"example_select\" id=\"example-select\"></select>").insertBefore("form button");
// chainedData = JSON.parse($("#json").val());
$('#example-select').chainedSelects({
    data: chainedData,
    loggingEnabled: true,
    placeholder: '--Select Any--'
});
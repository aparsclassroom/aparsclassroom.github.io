function wait(time) {
    if (time) {
        swal({
            title: "Not Published",
            icon: "info",
            text: "Please Wait till " + time.split("-")[0] +" for this cycle to be published"
        })
    } else {
        swal({
            title: "Not Published",
            icon: "info",
            text: "Please Wait for this cycle to be published"
        })
    }
    
}
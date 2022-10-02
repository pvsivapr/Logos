var videoWindow;
var linkURL = "https://youtu.be/MaUdWK4-Hkg";
var timeInterval = (1 * 60 * 1000);
var intervalFunction;
var videoPlayCount = 0;


function openVideoURLWindow(videoURL) {
    try {
        videoPlayCount++;
        displayStatusData(`(${videoPlayCount})Video started at :`);
        videoWindow = window.open(videoURL, "_blank", "width=500, height=350");
    }
    catch (exception) { }
}

function closeVideoURLWindow() {
    try {
        if (videoWindow !== null && videoWindow !== undefined) {
            displayStatusData("Video stoped at : ");
            videoWindow.close();
        }
    }
    catch (exception) { }
}

function onSubmitVideoURLForm() {
    try {
        const formName = "form_url_video";
        var inputVideoURL = document.forms[formName]["input_video_url"].value;
        var input_TimeInterval = document.forms[formName]["input_time_interval"].value;
        let inputTimeInterval = 0;
        if (input_TimeInterval !== null && input_TimeInterval !== undefined && input_TimeInterval !== isNaN) {
            const outValue = 0;
            inputTimeInterval = parseInt(input_TimeInterval, outValue);
        }
        linkURL = inputVideoURL;
        timeInterval = inputTimeInterval;

        if (inputTimeInterval !== 0) {
            startIteration();
            intervalFunction = setInterval(() => {
                startIteration();
            }, timeInterval);
        }

    }
    catch (exception) { }
}

function startIteration() {
    try {
        displayStatusData("Iteration started at : ");
        closeVideoURLWindow();
        openVideoURLWindow(linkURL);
    }
    catch (exception) { }
}

function stopIteration() {
    try {
        displayStatusData("Iteration stoped at : ");
        closeVideoURLWindow();
        if (intervalFunction !== null && intervalFunction !== undefined) {
            clearInterval(intervalFunction);
        }
    }
    catch (exception) { }
}

function displayStatusData(prefixData = "", suffixData = "") {
    try {
        var iterationDataElement = document.getElementById("console_iteration_data");
        var dateTimeStamp = new Date();
        iterationDataElement.innerHTML += `${prefixData}+${dateTimeStamp.toString()}+${suffixData}</br>`;
    }
    catch (exception) { }
}

// function doSomething() {
//     alert('This pops up every 5 seconds and is annoying!');
// }

// setInterval(doSomething, timeInterval); // Time in milliseconds
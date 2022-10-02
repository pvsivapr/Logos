var newWindow;
var videoWindow;
var linkURL = "https://youtu.be/MaUdWK4-Hkg";
var timeInterval = (1*60*1000);
var intervalFunction;
// function to open the new window tab with specified size  
function windowOpen() {
    newWindow = window.open(
        linkURL, "_blank", "width=500, height=350");
}

// function to close the window opened by window.open()   
function windowClose() {
    newWindow.close();
}

function openVideoURLWindow(videoURL) {
    try{
        var iterationDataElement = document.getElementById("console_iteration_data");
        var dateTimeStamp = new Date();
        iterationDataElement.innerHTML += `Video started at ${dateTimeStamp.toDateString()}`;
        videoWindow = window.open(videoURL, "_blank", "width=500, height=350");
    }
    catch(exception){}
}

function closeVideoURLWindow() {
    try{
        if(videoWindow !== null && videoWindow !== undefined){
        var iterationDataElement = document.getElementById("console_iteration_data");
        var dateTimeStamp = new Date();
        iterationDataElement.innerHTML += `Video stoped at ${dateTimeStamp.toDateString()}`;
        videoWindow.close();
        }
    }
    catch(exception){}
}

function onSubmitVideoURLForm(){
    try{
        const formName = "form_url_video";
        var inputVideoURL = document.forms[formName]["input_video_url"].value;
        var input_TimeInterval = document.forms[formName]["input_time_interval"].value;
        let inputTimeInterval = 0;
        if(input_TimeInterval !== null && input_TimeInterval !== undefined && input_TimeInterval !== isNaN){
            const outValue = 0;
            inputTimeInterval = parseInt(input_TimeInterval, outValue); 
        }
        linkURL = inputVideoURL;
        timeInterval = inputTimeInterval;

        if(inputTimeInterval !== 0){
            intervalFunction = setInterval(() => {
                startIteration();
            }, timeInterval);
        }

    }
    catch(exception){}
}

function startIteration(){
    try{
            var iterationDataElement = document.getElementById("console_iteration_data");
            var dateTimeStamp = new Date();
            iterationDataElement.innerHTML += `Iteration started at ${dateTimeStamp.toDateString()}`;
            closeVideoURLWindow();
            openVideoURLWindow(linkURL);
    }
    catch(exception){}
}

function stopIteration(){
    try{
            var iterationDataElement = document.getElementById("console_iteration_data");
            var dateTimeStamp = new Date();
            iterationDataElement.innerHTML += `Iteration stoped at ${dateTimeStamp.toDateString()}`;
            closeVideoURLWindow();
            if(intervalFunction !== null && intervalFunction !== undefined){
                clearInterval(intervalFunction);
            }
    }
    catch(exception){}
}

// function doSomething() {
//     alert('This pops up every 5 seconds and is annoying!');
// }

// setInterval(doSomething, timeInterval); // Time in milliseconds
const setDimensions = function () {
    try {
        var body = document.getElementById('body_container');
        if (body !== null && body !== undefined) {
            body.style.height = window.innerHeight;
            body.style.width = window.innerWidth;
        }
    } catch (exception) {
        errorLogger(exception);
    }
}

function OnLoadorStartup() {
    var dynamicHTMLControls = document.createElement('script');
    dynamicHTMLControls.src = './JSFiles/DynamicHTMLControls.js';
    document.head.appendChild(dynamicHTMLControls);

    var projectSpecifiedDynamicControls = document.createElement('script');
    projectSpecifiedDynamicControls.src = './JSFiles/ProjectSpecifiedDynamicControls.js';
    document.head.appendChild(projectSpecifiedDynamicControls);

    setDimensions();
}
OnLoadorStartup();



const onGetNewAttributes = function () {
    try {
        var currentElement = document.getElementById('svg_data_entry_holder');
        if (currentElement !== null && currentElement !== undefined) {
            currentElement.innerHTML = "";
            currentElement.appendChild(AddSelectDropDown("fieldName", ["", ...itemsList], "Select an option", "please select", onOptionSelected, "component_selection_id"));
        }
    } catch (ex) { }
}

const onTestAttributes = function () {
    try {
        var item_Updated_dictionary = {}
        const formName = currentForm;
        atttributesDictionary = currentAttrDict;
        for (var attributeItem in atttributesDictionary) {
            var obtainedValue = document.forms[formName][attributeItem].value;
            if (obtainedValue !== null && obtainedValue !== undefined && obtainedValue !== "") {
                item_Updated_dictionary[attributeItem] = obtainedValue;
            }
        }

        var svgTest = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svgTest.setAttribute("viewBox", "0 0 600 600");
        svgTest.setAttribute("version", "1.1");
        var svgNS = svgTest.namespaceURI;
        var selectedItem = document.createElementNS(svgNS, currentSelectedObject);
        for (var item in item_Updated_dictionary) {
            selectedItem.setAttribute(item, item_Updated_dictionary[item]);
        }
        svgTest.appendChild(selectedItem);
        var svgHolder = document.getElementById("svg_work_area");
        svgHolder.innerHTML = "";
        svgHolder.appendChild(svgTest);
    } catch (ex) {
        errorLogger(ex);
    }
}

var itemsList = ["", "rect", "circle", "ellipse", "polygon", "text"];
const item_Values_numeric = ["x", "y", "stroke-width", "cx", "cy", "rx", "ry", "font-size",];
var item_Default = ["id", "stroke", "stroke-width", "fill", "fill-rule", "style"];
var item_Rectangle = ["x", "y", "width", "height", "rx", "ry", ...item_Default ];
var item_Circle = ["r", "cx", "cy", ...item_Default];
var item_Ellipse = ["cx", "cy", "rx", "ry", ...item_Default];
var item_Polygon = ["points", ...item_Default];
var item_Text = ["x", "y", "font-size", "font-family", ...item_Default];
var listItems = [];

const getItemKeys = function (itemName) {
    try {
        var item_dictionary = {};
        for (var item in itemName) {
            item_dictionary[itemName[item]] = null;
        }
        return item_dictionary;
    } catch (ex) {
        return null;
    }
}

function errorLogger(exception) {
    console.log(exception);
}

function onSubmitForm() {//(formName, atttributesDictionary){
    try {
        var item_Updated_dictionary = {}
        const formName = currentForm;
        atttributesDictionary = currentAttrDict;
        for (var attributeItem in atttributesDictionary) {
            var obtainedValue = document.forms[formName][attributeItem].value;
            if (obtainedValue !== null && obtainedValue !== undefined && obtainedValue !== "") {
                item_Updated_dictionary[attributeItem] = obtainedValue;
            }
        }
        var svgData = updateSVG(currentSelectedObject, item_Updated_dictionary);
        if (svgData !== null && svgData !== undefined) {
            var svgHolder = document.getElementById("svg_main");
            svgHolder.innerHTML = "";
            svgHolder.appendChild(svg);
        }
    } catch (ex) {
        errorLogger(ex);
    }
}

var currentForm = "";
var currentAttrDict = {};
var currentSelectedObject = "";
const onOptionSelected = function () {
    try {
        var currentElement = document.getElementById('component_selection_id');
        if (currentElement !== null && currentElement !== undefined) {
            var selectedOption = currentElement.value;
            currentSelectedObject = selectedOption;

            var formData = document.createElement("form");
            let formName = "";
            formData.setAttribute('method', "post");
            formData.setAttribute('action', "");

            var createItemsSourceDict;
            if (selectedOption === "rect") {
                formName = "svg_data_rect_form";
                formData.setAttribute('name', formName);
                createItemsSourceDict = getItemKeys(item_Rectangle);
                /*
                for (var item in createItemsSourceDict) {
                    let isAdded = false;
                    for(var numericItem in item_Values_numeric){
                        if(numericItem === item){
                            formData.appendChild(AddTextFieldWithIncrement(item, item, true, onTestAttributes));
                            isAdded = true;
                        }
                    }
                    if(isAdded === false){
                        formData.appendChild(AddTextField(item, item, true, onTestAttributes));
                    }
                }
                //formData.setAttribute('onsubmit', "updateSVG(); return false;");
                formData.appendChild(AddSubmitButton("Submit", true));
                */
            }
            else if (selectedOption === "circle") {
                formName = "svg_data_circle_form";
                formData.setAttribute('name', formName);
                createItemsSourceDict = getItemKeys(item_Circle);
            }
            else if (selectedOption === "ellipse") {
                formName = "svg_data_ellipse_form";
                formData.setAttribute('name', formName);
                createItemsSourceDict = getItemKeys(item_Ellipse);
            }
            else if (selectedOption === "polygon") {
                formName = "svg_data_polygon_form";
                formData.setAttribute('name', formName);
                createItemsSourceDict = getItemKeys(item_Polygon);
            }
            else if (selectedOption === "text") {
                formName = "svg_data_text_form";
                formData.setAttribute('name', formName);
                createItemsSourceDict = getItemKeys(item_Text);
            }
            else { }

            for (var item in createItemsSourceDict) {
                let isAdded = false;
                for(var numericItem in item_Values_numeric){
                    if(item_Values_numeric[numericItem] === item){
                        formData.appendChild(AddTextFieldWithIncrement(item, item, true, onTestAttributes));
                        isAdded = true;
                    }
                }
                if(isAdded === false){
                    formData.appendChild(AddTextField(item, item, true, onTestAttributes));
                }
            }
            formData.appendChild(AddSubmitButton("Submit", true));

            currentForm = formName;
            currentAttrDict = createItemsSourceDict;
            //formData.setAttribute('onsubmit', `onSubmitForm(${formName},${createItemsSourceDict}); return false;`);
            //formData.setAttribute('onsubmit', `onSubmitForm(formName, createItemsSourceDict); return false;`);
            formData.setAttribute('onsubmit', `onSubmitForm(); return false;`);
            var holderElement = document.getElementById('svg_data_entry_holder');
            holderElement.innerHTML = "";
            holderElement.appendChild(formData);
        }
    } catch (ex) { }
}

var svg = null;
const createSVG = function () {
    try {
        svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    }
    catch (ex) { }
}

const updateSVG = function (selectedOption, attributes, containerName = "") {
    try {
        if (containerName !== null && containerName !== undefined && containerName !== "") {

        }
        //var svgHolder = document.getElementById("svg_main");
        if (svg === null || svg === undefined) {
            createSVG();
        }
        //svg = document.getElementById("test_svg");
        svg.setAttribute("viewBox", "0 0 600 600");
        svg.setAttribute("version", "1.1");
        var svgNS = svg.namespaceURI;
        var selectedItem = document.createElementNS(svgNS, selectedOption);
        for (var item in attributes) {
            selectedItem.setAttribute(item, attributes[item]);
        }
        svg.appendChild(selectedItem);
        //svgHolder.innerHTML = "";
        //svgHolder.appendChild(svg);
        return svg;
    }
    catch (ex) {
        return null;
    }
}

const updateSVG1 = function () {
    try {
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        var svgNS = svg.namespaceURI;

        var rect = document.createElementNS(svgNS, 'rect');
        rect.setAttribute('x', 5);
        rect.setAttribute('y', 5);
        rect.setAttribute('width', 500);
        rect.setAttribute('height', 500);
        rect.setAttribute('fill', '#95B3D7');
        svg.appendChild(rect);
        document.body.appendChild(svg);

        var t = document.createTextNode('Hello World');
        var h = document.createElement('a');
        h.setAttributeNS(null, 'href', 'http://www.google.com');
        h.setAttribute('target', 'blank');
        h.setAttribute('incognito', true);
        h.appendChild(t);
        document.body.appendChild(h);
    }
    catch (ex) { }
}


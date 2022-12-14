function AddTextFieldWithIncrement(fieldName, captionText, addCaption, onChangedEvent = null)
{
    var formChildDiv = document.createElement("div");

    var inputEntryField = document.createElement("input");
    inputEntryField.type = "number";
    inputEntryField.name = fieldName;
    inputEntryField.step = "1";
    inputEntryField.onchange = onChangedEvent;

    if(addCaption === true)
    {
        if(captionText === null || captionText === "")
        {
            captionText = fieldName;
        }

        formChildDiv.appendChild(document.createTextNode(captionText));
        formChildDiv.appendChild(inputEntryField);
        formChildDiv.appendChild(document.createElement("br"));
    }
    else
    {
        formChildDiv.appendChild(inputEntryField);
    }
    return formChildDiv;
}


function AddTextField(fieldName, captionText, addCaption, onChangedEvent = null)
{
    var formChildDiv = document.createElement("div");

    var inputEntryField = document.createElement("input");
    inputEntryField.type = "text";
    inputEntryField.name = fieldName;
    inputEntryField.onchange = onChangedEvent;

    if(addCaption === true)
    {
        if(captionText === null || captionText === "")
        {
            captionText = fieldName;
        }

        formChildDiv.appendChild(document.createTextNode(captionText));
        formChildDiv.appendChild(inputEntryField);
        formChildDiv.appendChild(document.createElement("br"));
    }
    else
    {
        formChildDiv.appendChild(inputEntryField);
    }
    return formChildDiv;
}

function AddPasswordField(fieldName, captionText, addCaption)
{
    var formChildDiv = document.createElement("div");

    var inputEntryField = document.createElement("input");
    inputEntryField.type = "password";
    inputEntryField.name = fieldName;

    if(addCaption === true)
    {
        if(captionText === null || captionText === "")
        {
            captionText = fieldName;
        }

        formChildDiv.appendChild(document.createTextNode(captionText));
        formChildDiv.appendChild(inputEntryField);
        formChildDiv.appendChild(document.createElement("br"));
    }
    else
    {
        formChildDiv.appendChild(inputEntryField);
    }
    return formChildDiv;
}

function AddSubmitButton(fieldName, isSubmitButton)
{
    var formChildDiv = document.createElement("div");

    var inputButton = document.createElement("input");
    inputButton.type = "submit";
    inputButton.name = fieldName;

    if(isSubmitButton === true)
    {
        inputButton.value = "Submit";
    }
    else
    {
        return inputButton;
    }
    formChildDiv.appendChild(inputButton);
    return formChildDiv;
}

// function AddClickableText(fieldName, clickEvent)
// {
//     var formChildDiv = document.createElement("div");
//     var inputButton = document.createElement("p");
//     inputButton.text = fieldName;
//     // inputButton.onclick = OnAddRemoveButtonClicked(inputButton);
//     inputButton.setAttribute('onclick',"OnAddRemoveButtonClicked("+inputButton+")");
//     // if(isSubmitButton === true)
//     // {
//     //     inputButton.value = "Submit";
//     // }
//     // else
//     // {
//     //     return inputButton;
//     // }
//     formChildDiv.appendChild(inputButton);
//     return formChildDiv;
// }

function AddSelectDropDown(fieldName, dropDownValues, captionText, addCaption, onOptionChanged, fieldID=null, fieldClassName=null, fieldStyle=null, optionStyle=null)
{
    var formChildDiv = document.createElement("div");

    var selectDropDown = document.createElement("select");
    if(fieldID !== null && fieldID !== undefined){
        selectDropDown.id = fieldID;
    }
    if(fieldClassName!== null && fieldClassName !== undefined){
        selectDropDown.className = fieldClassName;
    }
    selectDropDown.name = fieldName;
    if(onOptionChanged !== null && onOptionChanged !== undefined){
        selectDropDown.onchange = onOptionChanged;
    }
    // selectDropDown.options[selectOptions.length] = new Option('', 'Text 1', 'Value1');
    for (i = 0; i < dropDownValues.length; i++) 
    {
        var selectOptions = document.createElement("option");
        selectOptions.value = dropDownValues[i];
        selectOptions.text = dropDownValues[i];
        selectDropDown.appendChild(selectOptions);
    }
    // return selectDropDown;
    if(addCaption === true)
    {
        if(captionText === null || captionText === "")
        {
            captionText = fieldName;
        }

        formChildDiv.appendChild(document.createTextNode(captionText));
        formChildDiv.appendChild(selectDropDown);
        formChildDiv.appendChild(document.createElement("br"));
    }
    else
    {
        formChildDiv.appendChild(selectDropDown);
    }
    return formChildDiv;
}

function nullValueCheck(_obtainedValue)
{
    var obtainedValue="";
    if(_obtainedValue !== null)
    {
        obtainedValue = _obtainedValue;
    }
    return obtainedValue;
}
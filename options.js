const activeCellElement = document.getElementById("active-cell");
const textAlignElements = document.getElementsByClassName("text-align");
const boldButton = document.getElementById("bold");
const italicButton = document.getElementById("italic");
const underlinedButton = document.getElementById("underlined");
const textSize = document.getElementById("textSize");
const fontFamilyInput = document.getElementById("fontFamilyDropdown");

let activeCell = null;
// activeCell initially is set to be null when no cell is on focus
// activeCell represents the cell which is currently selected/clicked/active 

let activeOptionsState;

function toggleButtonStyle(button, isSelected) {
  if (isSelected) {
    // if the style property of activeCell is true then add the highlight
    button.classList.add("active-option");
  } else {
    button.classList.remove("active-option");
  }
}

function highlightOptionButtonsOnFocus() {
  // check if the activeCell is in bold or not and accordingly highlight the bold button
  toggleButtonStyle(boldButton, activeOptionsState.isBoldSelected);

  // check if the activeCell is in italic or not and accordingly highlight the italic button
  toggleButtonStyle(italicButton, activeOptionsState.isItalicsSelected);

  // check if the activeCell is underlined or not and accordingly highlight the underline button
  toggleButtonStyle(underlinedButton, activeOptionsState.isUnderlineSelected);

  // this function iterates over the align buttons and highlights the button according to the allignment of the cell
  highlightTextAlignButton(activeOptionsState.textAlign);
}

// this function is invoked as soon as any cell is focused/clicked
function onCellFocus(e) {
  // whenever a cell is focused change the activeCell value to be the id of cell.
  if (activeCell && activeCell.id === e.target.id) {
    //check if the currently focused cell is equal to the previosly focused cell after blur
    return;
  }

  activeCell = e.target;
  activeCellElement.innerText = e.target.id;

  //initialize the state of the activeCell
  const computedStyle = getComputedStyle(activeCell);
  activeOptionsState = {
    fontFamily: computedStyle.fontFamily,
    fontSize: computedStyle.fontSize,
    isBoldSelected: computedStyle.fontWeight === "600",
    isItalicsSelected: computedStyle.fontStyle === "italic",
    isUnderlineSelected: computedStyle.textDecoration.includes("underline"),
    textAlign: computedStyle.textAlign,
    textColor: computedStyle.color,
    backgroundColor: computedStyle.backgroundColor,
  };

  textSize.value = activeOptionsState.fontSize;
  defaultFontFamily(activeCell);
  highlightOptionButtonsOnFocus();
  //   fontFamilyInput.value = Times New Roman;
}

function onChangeTextSize(textSize) {
  let selectedSize = textSize.value;
  activeCell.style.fontSize = `${selectedSize}`;
  activeOptionsState.fontSize = `${selectedSize}`;
}

function onChangeFontFamily(fontFamilyInput) {
  let selectedFontFamily = fontFamilyInput.value;
  // console.log(selectedFontFamily);
  activeCell.style.fontFamily = selectedFontFamily;
  activeOptionsState.fontFamily = selectedFontFamily;
}

function defaultFontFamily(cell) {
  fontFamilyInput.value = activeOptionsState.fontFamily;
}

function onClickBold(boldButton) {
  // this functions gets triggered if the user clicks on the bold icon
  boldButton.classList.toggle("active-option");

  if (activeCell) {
    if (activeOptionsState.isBoldSelected) {
      activeCell.style.fontWeight = "400";
    } else {
      activeCell.style.fontWeight = "600";
    }
    activeOptionsState.isBoldSelected = !activeOptionsState.isBoldSelected;
  }
}

function onClickItalic(italicButton) {
  // this functions gets triggered if the user clicks on the italic icon
  italicButton.classList.toggle("active-option");

  if (activeCell) {
    if (activeOptionsState.isItalicsSelected) {
      activeCell.style.fontStyle = "normal";
    } else {
      activeCell.style.fontStyle = "italic";
    }
    activeOptionsState.isItalicsSelected =
      !activeOptionsState.isItalicsSelected;
  }
}

function onClickUnderline(underlinedButton) {
  // this functions gets triggered if the user clicks on the underline icon
  underlinedButton.classList.toggle("active-option");

  if (activeCell) {
    if (activeOptionsState.isUnderlineSelected) {
      activeCell.style.textDecoration = "none";
    } else {
      activeCell.style.textDecoration = "underline";
    }
    activeCell.style.textDecoration = !activeCell.style.textDecoration;
  }
}

// the below function task is to take the textAlign value from the activeCell and decides which alignment icon needs to highlighted 
function highlightTextAlignButton(textAlignValue) {
  // textAlignValue === "start" => we have to highlight only the left icon
  // textAlignValue === "right" => we have to highlight only the right icon
  // textAlignValue === "center" => we have to highlight only the center icon
  for (let i = 0; i < textAlignElements.length; i++) {
    if (textAlignElements[i].getAttribute("data-value") === textAlignValue) {
      textAlignElements[i].classList.add("active-option");
    } else {
      textAlignElements[i].classList.remove("active-option");
    }
  }
}

// this function is triggered when user clicks on the align icon
function onClickTextAlign(textAlignButton) {
  const selectedValue = textAlignButton.getAttribute("data-value");
  highlightTextAlignButton(selectedValue);

  if (activeCell) {
    activeCell.style.textAlign = selectedValue;
    activeOptionsState.textAlign = selectedValue;
  }
}

function onChangeTextColor(textColorInput) {
  let selectedTextColor = textColorInput.value;
  activeCell.style.color = selectedTextColor;
  activeOptionsState.color = selectedTextColor;
}

function onChangeBgColor(bgColorInput) {
  let selectedBgColor = bgColorInput.value;
  activeCell.style.backgroundColor = selectedBgColor;
  activeOptionsState.backgroundColor = selectedBgColor;
}

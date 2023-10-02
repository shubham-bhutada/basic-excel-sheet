const header = document.getElementById("header");
const body = document.getElementById("body");

// moved this code to options.js
// let activeCell = null;

for (let i = 65; i <= 90; i++) {
  let char = String.fromCharCode(i);
  const bold = document.createElement("b");
  bold.innerText = char;
  header.appendChild(bold);
}

function createAndAppendRow(rowNumber) {
  const row = document.createElement("div");
  row.className = "row";
  // in each row, we need to add 27 cells(1 for Sr.no and 26 empty cells)
  for (let i = 64; i <= 90; i++) {
    if (i === 64) {
      // this cell represents the Sr.no cell
      const b = document.createElement("b");
      b.style.minWidth = "50px"
      row.appendChild(b);
      b.innerText = rowNumber;
    } else {
      // this cell represents the empty cell
      const cell = document.createElement("div");
      cell.id = `${String.fromCharCode(i)}${rowNumber}`;
      cell.contentEditable = "true";
      cell.addEventListener("focus", onCellFocus);
      row.appendChild(cell);
    }
  }

  body.appendChild(row);
}

// to create 100 rows, we are calling the function createAndAppendRow 100 times
for (let i = 1; i <= 100; i++) {
  createAndAppendRow(i);
}

/* moved this code to options.js
   function onCellFocus(e) {
   activeCell = e.target.id;
 }*/

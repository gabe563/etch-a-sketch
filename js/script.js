// Default Values
let currSize = 16;
let currFill = 'color';
let currColor = '#363636';

// DOM items
const content = document.getElementById("content");
const boxContainer = document.getElementById('boxContainer');
const gridItems = document.getElementsByClassName('grid-item');
const gridValue = document.getElementById('gridValue');
const gridSlider = document.getElementById('gridSlider');
const gridLines = document.getElementById('gridLines');
const colorSelect = document.getElementById('colorSelector');
const colorFill = document.getElementById('colorFill');
const eraserFill = document.getElementById('eraserFill');
const shadingFill = document.getElementById('shadingFill');
const rainbowFill = document.getElementById('rainbowFill');
const clearButton = document.getElementById('clearBtn');

// Current Fill (Eraser, Color, Shading and Rainbow)
function currentFill(newFill){
  Button(newFill)
  currFill = newFill;
}
// Current Color
function currentColor(newColor){
  currColor = newColor;
}

// Current Size
function currentSize(newSize){
  currSize = newSize;
}

// Event listeners
colorSelect.onchange = (e) => currentColor(e.target.value);

colorFill.onclick = () => currentFill('color');
eraserFill.onclick = () => currentFill('eraser');
shadingFill.onclick = () => currentFill('shading');
rainbowFill.onclick = () => currentFill('rainbow');

gridSlider.onmousemove = (e) => updateSizeValue(e.target.value);
gridSlider.onchange = (e) => gridSize(e.target.value);

clearButton.onclick = clearGridBtn;

gridLines.onclick = gridCells;

// Click and hover functionality
let mouseDown = false
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

// Grid size
function gridSize(sizeValue){
  currentSize(sizeValue);
  updateSizeValue(sizeValue);
  reloadGrid();
}

// Update the new size in the html
function updateSizeValue(sizeValue){
  gridValue.innerHTML = `${sizeValue} x ${sizeValue}`;
}

// Reload grid on size change
function reloadGrid(){
  clearGrid();
  makeGrid(currSize);
}

// Clear grid content
function clearGrid(){
  content.innerHTML = '';
}

// Logic to make the grid
function makeGrid(size){
  content.style.setProperty('--grid-rows', size);
  content.style.setProperty('--grid-cols', size);

  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement('div');
    cell.classList.add('grid-item');
    cell.addEventListener('mouseover', mouseTrail);
    cell.addEventListener('mousedown', mouseTrail);
    cell.style.opacity = 1;
    cell.style.backgroundColor = 'white';
    content.appendChild(cell);
  };
};

// Rainbow fill logic
function randomColor(){
  return `hsl(${Math.random() * 360}, 80%, 50%)`;
}

// Add color logic
function mouseTrail(e){
  if(e.type === 'mouseover' && !mouseDown) return;

  if(currFill === 'color'){
    e.target.style.backgroundColor = currColor;
  } else if(currFill === 'rainbow'){
    e.target.style.backgroundColor = randomColor();
  } else if(currFill === 'shading'){
    boxContainer.style.backgroundColor = '#363636';
    e.target.style.opacity = e.target.style.opacity - 0.2;
  } else if(currFill === 'eraser'){
    e.target.style.backgroundColor = 'white';
    e.target.style.opacity = 1;
  }
}

// Add or remove button class on change
function Button(newFill){
  if (currFill === 'color') {
    colorFill.classList.remove('active');
  } else if(currFill === 'rainbow'){
    rainbowFill.classList.remove('active');
  } else if(currFill === 'shading'){
    shadingFill.classList.remove('active');
  } else if(currFill === 'eraser'){
    eraserFill.classList.remove('active');
  }

  if (newFill === 'color'){
    colorFill.classList.add('active');
  } else if(newFill === 'rainbow'){
    rainbowFill.classList.add('active');
  } else if(newFill === 'shading'){
    shadingFill.classList.add('active');
  } else if(newFill === 'eraser'){
    eraserFill.classList.add('active')
  }
}

// Grid lines logic
function gridCells(){
  for(let i = 0; i < gridItems.length; i++){
    if(gridItems[i].className === 'grid-item'){
      gridItems[i].className = 'grid-item line';
      gridLines.classList.add('active')
    } else if(gridItems[i].className === 'grid-item line'){
      gridItems[i].className = 'grid-item';
      gridLines.classList.remove('active')
    }
  }
}

function clearGridBtn(e){
  reloadGrid(e.target.value);
  gridLines.classList.remove('active')
}

// Default grid size and fill
window.onload = () => {
  makeGrid(currSize);
  Button(currFill);
}    



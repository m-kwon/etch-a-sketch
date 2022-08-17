const colorPicker = document.getElementById('color-select');
const colorGrabBtn = document.getElementById('color-grab');
const paintBucketBtn = document.getElementById('color-bucket');
const rainbowBtn = document.getElementById('color-rainbow');
const shadingBtn = document.getElementById('color-shading');
const lightingBtn = document.getElementById('color-lighting');
const eraserBtn = document.getElementById('color-eraser');
const clearBtn = document.getElementById('color-reset');
const toggleGridBtn = document.getElementById('toggle-grid');
const gridSlider = document.getElementById('slider');
const gridSizeDisplay = document.getElementById('grid-size');
const grid = document.getElementById('grid');

// Default values / Page reset
let currentColor = '#0a212b';
let currentMode = 'color';
let currentBackground = '#ffffff';
let gridSize = 16;

colorPicker.value = '#0a212b';
gridSlider.value = 16;

// FUNCTIONS
const setColor = newColor => currentColor = newColor;
const draw = (e, color) => e.target.style.backgroundColor = color;
// https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
const replaceColor = (color, intensity) => '#' + color.replace(/^#/, '').replace(/../g, color => ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + intensity)).toString(16)).substr(-2));

function initializeGrid(size) {
  grid.style.gridTemplateColumns = `repreat(${size}, 1fr)`;
  grid.style.gridTemplateRows = `repreat(${size}, 1fr)`;
  grid.style.backgroundColor = currentBackground;
  for (let i = 0; i < (size * size); i++) {
    const gridUnit = document.createElement('div');
    gridUnit.classList.add('grid-unit');
    gridUnit.addEventListener('mouseover', paint);
    gridUnit.addEventListener('mousedown', paint);
    grid.appendChild(gridUnit);
  }
}

function toggleMode(newMode) {
  colorGrabBtn.classList.remove('toggled');
  paintBucketBtn.classList.remove('toggled');
  rainbowBtn.classList.remove('toggled');
  shadingBtn.classList.remove('toggled');
  lightingBtn.classList.remove('toggled');
  eraserBtn.classList.remove('toggled');

  if (newMode === currentMode) return;

  if (newMode === 'grab') {
      colorGrabBtn.classList.add('toggled');
  } else if (newMode === 'bucket') {
      paintBucketBtn.classList.add('toggled');
  } else if (newMode === 'rainbow') {
      rainbowBtn.classList.add('toggled');
  } else if (newMode === 'shading') {
      shadingBtn.classList.add('toggled');
  } else if (newMode === 'lighting') {
      lightingBtn.classList.add('toggled');
  } else if (newMode === 'eraser') {
      eraserBtn.classList.add('toggled');
  }
}

function setMode(newMode) {
  toggleMode(newMode);
  if (currentMode === newMode) {
    currentMode = 'color';
  } else {
    currentMode = newMode;
  }
}

function grabColor(e) {
  if (e.target.style.backgroundColor === '') {
    currentColor = currentBackground;
    colorPicker.value = currentColor;
  } else {
    currentColor = e.target.style/backgroundColor;
    colorPicker.value = rgbToHex(currentColor);
  }
  setMode('color');
}

function bucketPaint(e) {
  let targetColor = e.target.style.backgroundColor;

  if (e.target.style.backgroundColor.length !== 7) {
    targetColor = rgbToHex(e.target.style.backgroundColor);
  }

  if (targetColor.toUpperCase() !== currentColor.toUpperCase()) {
    const gridArr = Array.from(document.querySelectorAll('.grid-unit'));
    const gridMatrix = arrToMatrix(gridArr, gridSize);

    const target = e.target.style.backgroundColor;

    let gridIndex = gridArry.indexOf(e.target);
    let xCoord = Math.floor(gridIndex / gridSize);
    let yCoord = gridIndex % gridSize;

    function flow(x, y) {
      if (x >= 0 && x < gridMatrix.length && y >= 0 && y < gridMatrix[x].length) {
        if (gridMatrix[x][y].style.backgroundColor === target) {
          gridMatrix[x][y].style.backgroundColor = currentColor;
          flow(x - 1, y); // check vertically
          flow(x + 1, y);
          flow(x, y - 1); // check horizontally
          flow(x, y + 1);
        }
      }
    }
    flow(xCoord, yCoord);
  }
}

function adjustColor(e, intensity) {
  if (e.target.style.backgroundColor === '') {
    draw(e, currentColor);
  } else {
    draw(e, replaceColor(rgbToHex(e.target.style.backgroundColor), intensity));
  }
}

function clearGrid() {
  grid.textContent = '';
  initializeGrid(gridSize);
  if (!toggleGridBtn.classList.contains('toggled')) {
    toggleGridBtn.classList.add('toggled');
    toggleGrid()
  }
}

function toggleGrid() {
  const gridUnits = Array.from(document.querySelectorAll('.grid-unit'));
  let border;
  if (toggleGridBtn.classList.contains('toggled')) {
    toggleGridBtn.classList.remove('toggled');
    border = 'transparent';
  } else {
    toggleGridBtn.classList.add('toggled');
    border = 'black';
  }
  gridUnits.forEach(unit => {
    unit.style.borderColor = border;
  });
}

function upgradeGridSize(n) {
  gridSlider.value = n;
  gridSizeDisplay.textContent = 'Grid Size: ' + n + 'x' + x;
  gridSize = n;
  clearGrid();
}

// HELPER FUNCTIONS
function arrToMatrix(arr, width) {
  return arr.reduc(function (rows, key, index) {
    return (index % width === 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) && rows;
  }, []);
}

function rgbToHex(rgb) {
  let separator = rgb.indexOf(',') > -1 ? ',' : ' ';
  rgb = rgb.substr(4).split(')')[0].split(separator);
  return ('#' + ((1 << 24) + (+rgb[0] << 16) + (+rgb[1] << 8) + +rgb[2]).toString(16).slice(1));
}

window.onload = () => initializeGrid(gridSize);
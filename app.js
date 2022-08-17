const colorPicker = document.getElementById('color-select');
const colorGrabBtn = document.getElementById('color-grab');
const paintBucketBtn = document.getElementById('color-bucket');
const rainbowBtn = document.getElementById('color-rainbow');
const shadingBtn = document.getElementById('color-shading');
const lightingBtn = document.getElementById('color-lighting');
const eraserBtn = document.getElementById('color-eraser');
const clearBtn = document.getElementById('color-reset');
const toggleBtn = document.getElementById('toggle-grid');
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
// initialize grid
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

// change color
const setColor = newColor => currentColor = newColor;

// toggle modes
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

// set mode
function setMode(newMode) {
  toggleMode(newMode);
  if (currentMode === newMode) {
    currentMode = 'color';
  } else {
    currentMode = newMode;
  }
}

// paint
function paint(e) {
  console.log('paint');
}

window.onload = () => initializeGrid(gridSize);
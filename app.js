// Access DOM elements in HTML template
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
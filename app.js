const body = document.querySelector('body');

// GRID - create a 16x16 grid of divs
const grid = document.createElement('div');
grid.classList.add('grid');

for (let i = 1; i <= 256; i++) {
  const gridUnit = document.createElement('div');
  gridUnit.classList.add('grid-unit');
  grid.appendChild(gridUnit);
}

body.appendChild(grid);
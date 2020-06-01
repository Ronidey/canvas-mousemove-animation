const c = document.getElementById("canvas");
c.width = innerWidth;
c.height = innerHeight;

const ctx = c.getContext("2d");

// Gives random value between min and max
function minmax(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Decreases the speed of calling any handlder function
function deBounce(cb) {
  let timerID;

  return function () {
    clearTimeout(timerID);
    timerID = setTimeout(cb, 300);
  };
}

// Contains mouse coordinates
const mouse = {
  x: undefined,
  y: undefined
};

// Updates mouse coordinates
document.onmousemove = function (e) {
  mouse.x = e.x;
  mouse.y = e.y;
};

const MAX_RADIUS = 40;
const MIN_RADIUS = 4;

// Constructor
class Circle {
  constructor(x, y, r, dx, dy, color) {
    Object.assign(this, { x, y, r, dx, dy, color });
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    ctx.fill();
  }

  update() {
    if (this.x + this.r >= innerWidth || this.x - this.r < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.r >= innerHeight || this.y - this.r < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    // Radius Condition
    if (
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50
    ) {
      if (this.r < MAX_RADIUS) {
        this.r += 1;
      }
    } else if (this.r > MIN_RADIUS) {
      this.r -= 1;
    }

    this.draw();
  }
}

let circlesArray = null;

function init() {
  circlesArray = [];

  for (let i = 0; i < 800; i++) {
    const r = 4;
    const x = minmax(r, innerWidth - r);
    const y = minmax(r, innerHeight - r);
    const dx = Math.random() - 0.5;
    const dy = Math.random() - 0.5;
    const color = `rgb(${minmax(0, 255)}, ${minmax(0, 255)}, ${minmax(
      0,
      255
    )})`;

    circlesArray.push(new Circle(x, y, r, dx, dy, color));
  }
}

function animate() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < circlesArray.length; i++) {
    circlesArray[i].update();
  }
  requestAnimationFrame(animate);
}

window.onload = function () {
  this.init();
  this.animate();
};

window.onresize = deBounce(function () {
  c.width = innerWidth;
  c.height = innerHeight;

  init();
});

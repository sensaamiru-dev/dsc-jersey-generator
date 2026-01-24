const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const bg = new Image();
bg.src = "assets/jersey1.jpg";

// Mobile-safe font loading
const font = new FontFace('Adidas2014', 'url(assets/fonts/Adidas2014.woff2)');
font.load().then(function(loadedFont) {
  document.fonts.add(loadedFont); // add to document
  draw();                        // draw canvas after font is loaded
});

// Ensure background image redraw triggers canvas
bg.onload = draw;

// These values were measured from your reference image
const NAME_Y_RATIO = 0.58;   // % of image height
const NUMBER_Y_RATIO = 0.68;

function selectJersey(src) {
  bg.src = src;
  document.querySelectorAll(".jersey-picker img").forEach(img => {
    img.classList.toggle("active", img.src === src);
  });
  bg.onload = draw;
}

function draw() {
  const name = document.getElementById("nameInput").value.toUpperCase();
  const number = document.getElementById("numberInput").value;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "white";

  // ----- NAME -----
  if (name) {
    let fontSize = 45;
    ctx.font = `${fontSize}px Adidas2014`;

    // Auto-shrink long names
    while (ctx.measureText(name).width > canvas.width * 0.6) {
      fontSize--;
      ctx.font = `${fontSize}px Adidas2014`;
    }

    ctx.fillText(name, canvas.width / 2, canvas.height * NAME_Y_RATIO);
  }

  // ----- NUMBER -----
  if (number) {
    let fontSize = 200;
    ctx.font = `${fontSize}px Adidas2014`;

    while (ctx.measureText(number).width > canvas.width * 0.45) {
      fontSize--;
      ctx.font = `${fontSize}px Adidas2014`;
    }

    ctx.fillText(number, canvas.width / 2, canvas.height * NUMBER_Y_RATIO);
  }
}

// Live preview
document.getElementById("nameInput").addEventListener("input", draw);
document.getElementById("numberInput").addEventListener("input", draw);

// Download
function download() {
  const link = document.createElement("a");
  link.download = "my-jersey.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}

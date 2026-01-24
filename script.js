const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const bg = new Image();
bg.src = "assets/jersey1.jpg";
bg.onload = draw;

// These values were measured from your reference image
const NAME_Y_RATIO = 0.58;
const NUMBER_Y_RATIO = 0.70;

function selectJersey(src) {
  bg.src = src;
  document.querySelectorAll(".jersey-picker img").forEach(img => {
    img.classList.toggle("active", img.src === src);
  });
  bg.onload = draw;
}

function draw() {
  const name = document.getElementById("nameInput").value.toUpperCase();
  let number = document.getElementById("numberInput").value;

  // ---- FORCE NUMBER BETWEEN 1–99 ----
  if (number !== "") {
    number = parseInt(number);
    if (number < 1) number = 1;
    if (number > 99) number = 99;
    document.getElementById("numberInput").value = number;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  function drawVinyl(text, x, y, baseSize, maxWidthRatio) {
    let fontSize = baseSize;
    ctx.font = `${fontSize}px 'Anton'`;
    while (ctx.measureText(text).width > canvas.width * maxWidthRatio) {
      fontSize--;
      ctx.font = `${fontSize}px 'Anton'`;
    }

    ctx.save();

    // Shadow (fabric depth)
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillText(text, x + 3, y + 4);

    // Outline (vinyl cut edge)
    ctx.lineWidth = baseSize * 0.045;
    ctx.strokeStyle = "black";
    ctx.strokeText(text, x, y);

    // Main fill
    ctx.fillStyle = "white";
    ctx.fillText(text, x, y);

    // Vinyl shine
    const gradient = ctx.createLinearGradient(0, y - baseSize / 2, 0, y + baseSize / 2);
    gradient.addColorStop(0, "rgba(255,255,255,0.9)");
    gradient.addColorStop(0.5, "rgba(255,255,255,0.25)");
    gradient.addColorStop(1, "rgba(255,255,255,0.8)");
    ctx.fillStyle = gradient;
    ctx.fillText(text, x, y - baseSize * 0.05);

    ctx.restore();
  }

  if (name) {
    drawVinyl(name, canvas.width / 2, canvas.height * NAME_Y_RATIO, 45, 0.6);
  }

  if (number) {
    drawVinyl(number, canvas.width / 2, canvas.height * NUMBER_Y_RATIO, 200, 0.45);
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

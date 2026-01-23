const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const bg = new Image();
bg.src = "assets/wallpaper.jpg";
bg.onload = draw;

function createGoldGradient(y, height) {
  const g = ctx.createLinearGradient(0, y, 0, y + height);
  g.addColorStop(0, "#fff7c2");
  g.addColorStop(0.4, "#ffd700");
  g.addColorStop(0.7, "#ffb300");
  g.addColorStop(1, "#b8860b");
  return g;
}

// Draw name as a single centered word (no spacing, no shadow, no black border)
function drawName(text, x, y) {
  ctx.font = "bold 72px 'Bebas Neue', Arial";
  const gold = createGoldGradient(y - 40, 80);

  ctx.lineWidth = 4;
  ctx.strokeStyle = black;
  ctx.strokeText(text, x, y);

  ctx.fillStyle = "#fff";
  ctx.fillText(text, x, y);
}

// Draw centered number (no shadow, no black border)
function drawNumber(text, x, y) {
  ctx.font = "bold 400px 'Bebas Neue', Arial";
  const black = createGoldGradient(y - 140, 280);

  ctx.lineWidth = 8;
  ctx.strokeStyle = gold;
  ctx.strokeText(text, x, y);

  ctx.fillStyle = "#fff";
  ctx.fillText(text, x, y);
}

function draw() {
  const name = document.getElementById("nameInput").value.toUpperCase() || "NAME";
  const number = document.getElementById("numberInput").value || "00";

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Name centered above chest
  drawName(name, canvas.width / 2, 520);

  // Number centered
  drawNumber(number, canvas.width / 2, canvas.height / 2 + 80);
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

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const bg = new Image();
bg.src = "assets/wallpaper.jpg";
bg.onload = draw;

// Create gold metallic gradient
function createGoldGradient(y, height) {
  const g = ctx.createLinearGradient(0, y, 0, y + height);
  g.addColorStop(0, "#fff7c2");
  g.addColorStop(0.35, "#ffd700");
  g.addColorStop(0.65, "#ffb300");
  g.addColorStop(1, "#b8860b");
  return g;
}

// Draw curved jersey name
function drawCurvedName(text, centerX, y) {
  ctx.font = "bold 72px 'Bebas Neue', Arial";
  const spacing = 60;
  const curve = 0.035;

  const letters = text.split("");
  const totalWidth = letters.length * spacing;
  let x = centerX - totalWidth / 2 + spacing / 2;

  letters.forEach((char, i) => {
    const angle = (i - letters.length / 2) * curve;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);

    const gold = createGoldGradient(-40, 80);

    ctx.shadowColor = "rgba(0,0,0,0.55)";
    ctx.shadowBlur = 5;
    ctx.shadowOffsetX = 4;
    ctx.shadowOffsetY = 4;

    // Outer black border
    ctx.lineWidth = 9;
    ctx.strokeStyle = "#000";
    ctx.strokeText(char, 0, 0);

    // Inner gold border
    ctx.lineWidth = 4;
    ctx.strokeStyle = gold;
    ctx.strokeText(char, 0, 0);

    // Fill
    ctx.fillStyle = "#fff";
    ctx.fillText(char, 0, 0);

    ctx.restore();
    x += spacing;
  });
}

// Draw center jersey number
function drawNumber(text, x, y) {
  ctx.font = "bold 190px 'Bebas Neue', Arial";
  const gold = createGoldGradient(y - 120, 240);

  ctx.shadowColor = "rgba(0,0,0,0.6)";
  ctx.shadowBlur = 8;
  ctx.shadowOffsetX = 6;
  ctx.shadowOffsetY = 6;

  // Outer black border
  ctx.lineWidth = 18;
  ctx.strokeStyle = "#000";
  ctx.strokeText(text, x, y);

  // Inner gold border
  ctx.lineWidth = 8;
  ctx.strokeStyle = gold;
  ctx.strokeText(text, x, y);

  // Fill
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

  // Name above chest
  drawCurvedName(name, canvas.width / 2, 520);

  // Number centered
  drawNumber(number, canvas.width / 2, canvas.height / 2 + 80);
}

// Live preview
document.getElementById("nameInput").addEventListener("input", draw);
document.getElementById("numberInput").addEventListener("input", draw);

// Download image
function download() {
  const link = document.createElement("a");
  link.download = "my-jersey.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}

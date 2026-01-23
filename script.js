const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const bg = new Image();
bg.src = "assets/wallpaper.jpg";
bg.onload = draw;

// Draw name — clean fill only
function drawName(text, x, y) {
  ctx.font = "bold 72px 'Bebas Neue', Arial";
  ctx.fillStyle = "#fff";
  ctx.fillText(text, x, y);
}

// Draw number — MUCH bigger, clean fill only
function drawNumber(text, x, y) {
  ctx.font = "bold 300px 'Bebas Neue', Arial"; // bigger number
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

  // Number centered (big)
  drawNumber(number, canvas.width / 2, canvas.height / 2 + 120);
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

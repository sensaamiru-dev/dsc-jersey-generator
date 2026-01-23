const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const bg = new Image();
bg.src = "assets/wallpaper.jpg"; // your uploaded wallpaper

bg.onload = draw;

function draw() {
  const name = document.getElementById("nameInput").value.toUpperCase() || "NAME";
  const number = document.getElementById("numberInput").value || "00";

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

  // Common text settings
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // ----- NAME -----
  ctx.font = "bold 64px Arial";
  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  ctx.lineWidth = 8;
  ctx.shadowColor = "rgba(0,0,0,0.5)";
  ctx.shadowBlur = 4;

  // Slight curve: draw each letter with small rotation
  const startX = canvas.width / 2;
  const startY = 650; // 5cm above neck approx
  const letters = name.split("");
  const letterSpacing = 55;
  const totalWidth = letters.length * letterSpacing;
  let x = startX - totalWidth / 2 + letterSpacing / 2;
  letters.forEach((char, i) => {
    const angle = (i - letters.length / 2) * 0.03; // small curve
    ctx.save();
    ctx.translate(x, startY);
    ctx.rotate(angle);
    ctx.fillText(char, 0, 0);
    ctx.strokeText(char, 0, 0);
    ctx.restore();
    x += letterSpacing;
  });

  // ----- NUMBER -----
  ctx.font = "bold 140px Arial";
  ctx.fillText(number, canvas.width / 2, 760);
  ctx.strokeText(number, canvas.width / 2, 760);
}

// Live preview
document.getElementById("nameInput").addEventListener("input", draw);
document.getElementById("numberInput").addEventListener("input", draw);

// Download button
function download() {
  const link = document.createElement("a");
  link.download = "my-jersey.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}

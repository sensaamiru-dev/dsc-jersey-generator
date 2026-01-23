const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const bg = new Image();
bg.src = "assets/wallpaper.jpg"; // Make sure this is your wallpaper file

bg.onload = draw;

// Draw function
function draw() {
  const name = document.getElementById("nameInput").value.toUpperCase() || "NAME";
  const number = document.getElementById("numberInput").value || "00";

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Stroke settings for border
  ctx.lineWidth = 8;
  ctx.strokeStyle = "black";

  // Fill color for text
  ctx.fillStyle = "white";
  ctx.shadowColor = "rgba(0,0,0,0.5)";
  ctx.shadowBlur = 6;

  // NAME - 5 cm above neck (approx in px: 660)
  ctx.font = "bold 64px Arial";
  ctx.fillText(name, canvas.width / 2, 660);
  ctx.strokeText(name, canvas.width / 2, 660);

  // NUMBER - centered on jersey (approx in px: 760)
  ctx.font = "bold 140px Arial";
  ctx.fillText(number, canvas.width / 2, 760);
  ctx.strokeText(number, canvas.width / 2, 760);
}

// Live preview while typing
document.getElementById("nameInput").addEventListener("input", draw);
document.getElementById("numberInput").addEventListener("input", draw);

// Download function
function download() {
  const link = document.createElement("a");
  link.download = "my-jersey.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const bg = new Image();
bg.src = "assets/wallpaper.jpg";
bg.onload = draw;

function draw() {
  const name = document.getElementById("nameInput").value.toUpperCase();
  const number = document.getElementById("numberInput").value;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#fff";

  // Draw only if user typed
  if (name) {
    ctx.font = "bold 72px 'Bebas Neue', Arial";
    ctx.fillText(name, canvas.width / 2, 520);
  }

  if (number) {
    ctx.font = "bold 300px 'Bebas Neue', Arial";
    ctx.fillText(number, canvas.width / 2, canvas.height / 2 + 120);
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

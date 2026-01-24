const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const bg = new Image();
bg.src = "assets/jersey1.jpg";
bg.onload = draw;

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

  // --- NAME (upper back panel) ---
  if (name) {
    ctx.font = "bold 68px Anton";
    ctx.fillText(name, canvas.width / 2, 510);
  }

  // --- NUMBER (center torso) ---
  if (number) {
    ctx.font = "bold 320px Anton";
    ctx.fillText(number, canvas.width / 2, 780);
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

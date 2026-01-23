const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const bg = new Image();
bg.src = "assets/wallpaper.jpg"; // make sure this matches your file

bg.onload = draw;

function draw() {
  const name = document.getElementById("nameInput").value.toUpperCase() || "NAME";
  const number = document.getElementById("numberInput").value || "00";

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.shadowColor = "black";
  ctx.shadowBlur = 8;

  // Jersey Number (big)
  ctx.font = "bold 140px Arial";
  ctx.fillText(number, canvas.width / 2, 760);

  // Jersey Name (above number)
  ctx.font = "bold 64px Arial";
  ctx.fillText(name, canvas.width / 2, 660);
}

document.getElementById("nameInput").addEventListener("input", draw);
document.getElementById("numberInput").addEventListener("input", draw);

function download() {
  const link = document.createElement("a");
  link.download = "my-jersey.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const bg = new Image();
bg.src = "assets/wallpaper.jpg"; // 👈 change filename

bg.onload = () => {
  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
};

function draw() {
  const name = document.getElementById("nameInput").value.toUpperCase();
  const number = document.getElementById("numberInput").value;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "white";
  ctx.textAlign = "center";

  // Jersey Number
  ctx.font = "bold 120px Arial";
  ctx.fillText(number, canvas.width / 2, 720);

  // Player Name
  ctx.font = "bold 60px Arial";
  ctx.fillText(name, canvas.width / 2, 820);
}

function download() {
  const link = document.createElement("a");
  link.download = "my-jersey.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}

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

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // ----- NAME -----
  ctx.font = "bold 64px Arial"; // replace with Varsity if loaded
  const startX = canvas.width / 2;
  const startY = 650;
  const letters = name.split("");
  const letterSpacing = 55;
  const totalWidth = letters.length * letterSpacing;
  let x = startX - totalWidth / 2 + letterSpacing / 2;

  letters.forEach((char, i) => {
    const angle = (i - letters.length / 2) * 0.03; // slight curve
    ctx.save();
    ctx.translate(x, startY);
    ctx.rotate(angle);

    // Drop shadow
    ctx.shadowColor = "rgba(0,0,0,0.5)";
    ctx.shadowBlur = 4;
    ctx.shadowOffsetX = 4;
    ctx.shadowOffsetY = 4;

    // Outer black stroke
    ctx.lineWidth = 8;
    ctx.strokeStyle = "black";
    ctx.strokeText(char, 0, 0);

    // Inner gold stroke
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#FFD700"; // gold
    ctx.strokeText(char, 0, 0);

    // Fill white
    ctx.fillStyle = "white";
    ctx.fillText(char, 0, 0);

    ctx.restore();
    x += letterSpacing;
  });

  // ----- NUMBER -----
  ctx.font = "bold 140px Arial";
  const numberX = canvas.width / 2;
  const numberY = 760;

  // Drop shadow
  ctx.shadowColor = "rgba(0,0,0,0.5)";
  ctx.shadowBlur = 6;
  ctx.shadowOffsetX = 6;
  ctx.shadowOffsetY = 6;

  // Outer black stroke
  ctx.lineWidth = 16;
  ctx.strokeStyle = "black";
  ctx.strokeText(number, numberX, numberY);

  // Inner gold stroke
  ctx.lineWidth = 8;
  ctx.strokeStyle = "#FFD700";
  ctx.strokeText(number, numberX, numberY);

  // Fill white
  ctx.fillStyle = "white";
  ctx.fillText(number, numberX, numberY);
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

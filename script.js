const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const bg = new Image();
bg.src = "assets/jersey1.jpg";
bg.onload = draw;

const NAME_Y_RATIO = 0.58;
const NUMBER_Y_RATIO = 0.70;

// 🔥 Make canvas responsive internally
function resizeCanvas() {
  const maxWidth = Math.min(window.innerWidth - 20, 500);
  const aspectRatio = 1350 / 1080; // your jersey ratio

  canvas.style.width = maxWidth + "px";
  canvas.style.height = maxWidth * aspectRatio + "px";

  canvas.width = 1080;
  canvas.height = 1350;

  draw();
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function selectJersey(src) {
  bg.src = src;
  document.querySelectorAll(".jersey-picker img").forEach(img => {
    img.classList.toggle("active", img.src === src);
  });
  bg.onload = draw;
}

function draw() {
  if (!bg.complete) return;

  const name = document.getElementById("nameInput").value.toUpperCase();
  let number = document.getElementById("numberInput").value;

  if (number !== "") {
    number = parseInt(number);
    if (number < 1) number = 1;
    if (number > 99) number = 99;
    document.getElementById("numberInput").value = number;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "white";

  if (name) {
    let fontSize = 45;
    ctx.font = `${fontSize}px 'Anton'`;
    while (ctx.measureText(name).width > canvas.width * 0.6) {
      fontSize--;
      ctx.font = `${fontSize}px 'Anton'`;
    }
    ctx.fillText(name, canvas.width / 2, canvas.height * NAME_Y_RATIO);
  }

  if (number) {
    let fontSize = 200;
    ctx.font = `${fontSize}px 'Anton'`;
    while (ctx.measureText(number).width > canvas.width * 0.45) {
      fontSize--;
      ctx.font = `${fontSize}px 'Anton'`;
    }
    ctx.fillText(number, canvas.width / 2, canvas.height * NUMBER_Y_RATIO);
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

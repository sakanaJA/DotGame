const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const dots = [
    { x: 50, y: 200, order: 1, connected: false },
    { x: 200, y: 50, order: 2, connected: false },
{ x: 350, y: 200, order: 3, connected: false }
];
let currentOrder = 1;

function drawDots() {
for (let dot of dots) {
ctx.beginPath();
ctx.arc(dot.x, dot.y, 10, 0, 2 * Math.PI);
ctx.fillStyle = dot.connected ? "green" : "red";
ctx.fill();
ctx.font = "20px Arial";
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.fillStyle = "white";
ctx.fillText(dot.order, dot.x, dot.y);
}
}

function connectDots() {
for (let i = 0; i < dots.length - 1; i++) {
if (dots[i].connected && dots[i + 1].connected) {
ctx.beginPath();
ctx.moveTo(dots[i].x, dots[i].y);
ctx.lineTo(dots[i + 1].x, dots[i + 1].y);
ctx.strokeStyle = "black";
ctx.lineWidth = 2;
ctx.stroke();
}
}
}

canvas.addEventListener("click", (e) => {
let rect = canvas.getBoundingClientRect();
let x = e.clientX - rect.left;
let y = e.clientY - rect.top;
for (let dot of dots) {
    let distance = Math.sqrt((dot.x - x) ** 2 + (dot.y - y) ** 2);
    if (distance <= 10 && dot.order === currentOrder) {
        dot.connected = true;
        currentOrder++;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        connectDots();
        drawDots();
    }
}});
drawDots();

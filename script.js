const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const MAX_WIDTH = 1200; // 最大幅
const MAX_HEIGHT = 800; // 最大高さ

function optimizeCanvasSize() {
    // ウィンドウのサイズと最大サイズを比較して、小さい方を採用
    canvas.width = Math.min(window.innerWidth, MAX_WIDTH);
    canvas.height = Math.min(window.innerHeight, MAX_HEIGHT);
}

// 初期ロード時にcanvasのサイズを調整
optimizeCanvasSize();

// ウィンドウのサイズが変わったときにcanvasのサイズを再調整
window.addEventListener('resize', optimizeCanvasSize);

const MAX_DOTS = 9; // 一つのステージの最大ドット数

function generateRandomStage() {
    let stageDots = [];
    for (let i = 0; i < MAX_DOTS; i++) {
        stageDots.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            order: i + 1,
            connected: false
        });
    }
    return {
        dots: stageDots,
        hint: null // ヒントも追加できますが、ここでは省略
    };
}


let currentStage = generateRandomStage();
let dots = currentStage.dots;
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
            // ここでクリックの効果音を再生する
        }
    }
});

// ヒントの描画
function drawHint() {
    const hint = stages[currentStage].hint;
    if (!hint) return;

    let startDot = dots.find(dot => dot.order === hint.from);
    let endDot = dots.find(dot => dot.order === hint.to);
    ctx.setLineDash([5, 3]);
    ctx.beginPath();
    ctx.moveTo(startDot.x, startDot.y);
    ctx.lineTo(endDot.x, endDot.y);
    ctx.strokeStyle = "gray";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.setLineDash([]);
}
function checkGameClear() {
    if (currentOrder > dots.length) {
        alert("Game Clear!");
        // ゲームをリセットまたは次のステージに進むなどの処理をここに追加
    }
}

// その他の機能（特殊能力アイテム、カスタマイズ、成果物のシェア、音楽・効果音など）もこちらに追加します。

drawDots();

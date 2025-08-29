// Đổi URL WS nếu server deploy nơi khác
const WS_URL = 'ws://localhost:8080';
let ws;


const statusSpan = document.getElementById('status');
const nameInput = document.getElementById('name-input');
const saveNameBtn = document.getElementById('save-name');
const joinBtn = document.getElementById('join-btn');
const roomCard = document.getElementById('room-card');
const roomInfo = document.getElementById('room-info');
const scoreboard = document.getElementById('scoreboard');
const roundBanner = document.getElementById('round-banner');
const resultDiv = document.getElementById('result');


function connect() {
if (ws && ws.readyState === WebSocket.OPEN) return;
ws = new WebSocket(WS_URL);
statusSpan.textContent = 'Đang kết nối...';


ws.onopen = () => {
statusSpan.textContent = 'Đã kết nối WS';
};


ws.onclose = () => {
statusSpan.textContent = 'Mất kết nối. Thử reload trang.';
};


ws.onmessage = (ev) => {
let msg; try { msg = JSON.parse
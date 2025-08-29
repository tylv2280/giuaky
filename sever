const http = require("http");
const fs = require("fs");
const path = require("path");
const WebSocket = require("ws");

const server = http.createServer((req, res) => {
  if (req.url === "/" || req.url === "/index.html") {
    fs.readFile(path.join(__dirname, "../client/index.html"), (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end("Error loading index.html");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  } else {
    res.writeHead(404);
    res.end("Not found");
  }
});

const wss = new WebSocket.Server({ server });

let players = [];
wss.on("connection", (ws) => {
  ws.send(JSON.stringify({ type: "welcome", message: "Chào mừng bạn đến Rock-Paper-Scissors!" }));

  ws.on("message", (message) => {
    const data = JSON.parse(message);

    if (data.type === "set_name") {
      ws.name = data.name;
      ws.choice = null;
      players.push(ws);
      ws.send(JSON.stringify({ type: "name_set", name: ws.name }));
    }

    if (data.type === "choice") {
      ws.choice = data.choice;
      ws.send(JSON.stringify({ type: "choice_received", choice: ws.choice }));

      // Khi có 2 người chơi cùng chọn
      if (players.length >= 2 && players[0].choice && players[1].choice) {
        const p1 = players[0];
        const p2 = players[1];

        let result;
        if (p1.choice === p2.choice) result = "Hòa";
        else if (
          (p1.choice === "rock" && p2.choice === "scissors") ||
          (p1.choice === "paper" && p2.choice === "rock") ||
          (p1.choice === "scissors" && p2.choice === "paper")
        ) result = `${p1.name} thắng!`;
        else result = `${p2.name} thắng!`;

        players.forEach(player =>
          player.send(JSON.stringify({ type: "result", p1, p2, result }))
        );

        // Reset lượt
        players.forEach(p => p.choice = null);
      }
    }
  });

  ws.on("close", () => {
    players = players.filter(p => p !== ws);
  });
});

server.listen(3000, () => {
  console.log("Server chạy tại http://localhost:3000");
});

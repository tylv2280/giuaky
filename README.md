Giới thiệu ngắn gọn & Hướng dẫn dùng — RPS Multiplayer (Rock–Paper–Scissors)
Mục tiêu: dự án là trò Oẳn Tù Tì 1v1 chạy nhiều client trên trình duyệt, server Node.js dùng WebSocket để ghép cặp, trao đổi lựa chọn và cập nhật điểm — phù hợp để demo real-time, học WebSocket hoặc làm bài tập.
1. Điểm nổi bật (tóm tắt)
Kiến trúc: WebSocket server (Node.js, ws) + client HTML/CSS/JS chạy trên trình duyệt.
Tự động ghép cặp: server tạo phòng, mỗi phòng tối đa 2 người. Khi đủ 2 người thì phát round_start.
Flow round: cả hai gửi choice → server tính kết quả → cập nhật scoreboard → phát round_result + scoreboard → tự động bắt đầu round mới sau 1.5s.
Xử lý rời/phục hồi: nếu người chơi rời, phòng thông báo peer_left cho người còn lại; phòng bị xóa khi trống.
2. Yêu cầu trước khi chạy
Node.js ≥ 16
Terminal / command line
(Tuỳ chọn) VS Code + Live Server extension để mở client nhanh
3. Cấu trúc thư mục (nhắc lại ngắn)
rps-multiplayer/
├─ server/
│  ├─ server.js
│  └─ package.json
└─ client/
   ├─ index.html
   ├─ styles.css
   └─ client.js
4. Chạy nhanh (quick start)
Mở terminal vào thư mục rps-multiplayer/server
Cài dependencies & khởi chạy server:
npm install
npm start
WebSocket server mặc định lắng nghe: ws://localhost:8080
Server kèm một HTTP static (tuỳ chọn) phục vụ thư mục ../client trên http://localhost:3000
Mở client:
Cách nhanh: mở http://localhost:3000 nếu bạn dùng HTTP server tích hợp.
Hoặc dùng Live Server trong VS Code mở client/index.html.
Hoặc chạy: npx http-server ./client -p 3000 rồi mở http://localhost:3000.
5. Các thay đổi thường gặp
Đổi cổng WebSocket: sửa WS_URL trong client/client.js thành URL server mới.
Đổi cổng HTTP static: chỉnh httpServer.listen(3000, ...) trong server/server.js.
Ghép phòng khác: sửa hàm createRoomIfNeeded() nếu muốn cho phép nhiều phòng, phòng có mã, hoặc ghép theo lobby.
6. Giải thích nhanh các file chính
server/server.js — logic WebSocket, quản lý rooms, clients, tính kết quả (hàm computeResult), gửi event (round_start, round_result, scoreboard, ...).
server/package.json — dependency: express, ws, uuid, cors.
client/index.html — UI cơ bản: form đặt tên, nút tham gia, khu vực chọn búa/bao/kéo, bảng điểm.
client/styles.css — giao diện tối, responsive nhẹ, style cho nút/khung.
client/client.js — kết nối WebSocket, xử lý message từ server, gửi sự kiện set_name, join, choice, render UI & toast.
7. Luồng thông điệp WebSocket (tóm tắt)
Client → server: { type: 'set_name', name }, { type: 'join' }, { type: 'choice', choice }
Server → client: hello, name_ok, waiting, room_update, round_start, choice_ack, round_result, scoreboard, peer_left
8. Mẹo & khắc phục lỗi nhỏ
Nếu client hiển thị Mất kết nối: kiểm tra WS_URL và port server (Firewall hay port bận cũng gây lỗi).
Nếu không ghép được: đảm bảo có 2 client (mở 2 tab/trình duyệt hoặc 2 thiết bị).
Để debug server: thêm console.log trong wss.on('connection') và các sự kiện message/close.
Nếu server không phục vụ client: mở client bằng Live Server hoặc http-server thay vì file://.
9. Nâng cấp gợi ý (nếu muốn mở rộng)
Dùng Socket.IO để xử lý reconnect/rooms dễ hơn.
Thêm lobby với list phòng, tạo phòng bằng mã (join bằng mã).
Lưu lịch sử điểm vào DB (SQLite / MongoDB) để theo dõi xếp hạng.
Thêm xác thực người dùng (JWT) hoặc avatar.
Thêm animation cho kết quả, countdown cho mỗi round.


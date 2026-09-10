# Lịch sử thay đổi: từ 24K (Floor-only Gravity) đến 24K-1 (Top Match Same-Layer)

## 0. Vị trí trong lịch sử dự án

Tài liệu `01-LICH-SU-THAY-DOI-DEN-FINAL-CORE.md` đã ghi lại hành trình 24A → 24L → **24K**
(`Final Core/24K-lower-layer-gravity.html`), chốt tại cơ chế **"Floor-only Queue × Gravity
Cascade"** theo đúng GDD (`02-FINAL-CORE-GAMEPLAY-VA-HOOK.md`).

Tài liệu này ghi lại giai đoạn **tiếp theo**: từ 24K, một nhánh thử nghiệm mới được mở ra —
đảo ngược quy tắc Match, đưa trở lại cơ chế xếp chồng do người chơi chủ động đặt — và giai
đoạn đó đã kết thúc tại **24K-1** (`Final Core/24K-1-top-match-same-layer.html`), file được
**chốt làm gameplay chính (main gameplay) của game** tại thời điểm viết tài liệu này.

> Quy ước: từ đây, mọi nơi nhắc đến **"24K-1"** trong tài liệu dự án đều chỉ đích danh file
> `24K-1-top-match-same-layer.html`, không phải `Final Core/24k-1.html` (một bản dựng trung
> gian, nhỏ hơn, không còn được dùng tiếp).

---

## 1. Điểm khởi đầu: 24K — Floor-only Queue × Gravity Cascade

Nhắc lại đúng những gì `01-LICH-SU-THAY-DOI-DEN-FINAL-CORE.md` và `02-FINAL-CORE-GAMEPLAY-VA-HOOK.md`
đã chốt, để làm mốc so sánh:

- Board 6×6, mỗi cell tối đa 2 tầng (z0 nền, z1 mái).
- Chỉ tile ở **z0 (nền)** mới Match được với nhau; tile z1 (mái) không bao giờ tham gia Match
  trực tiếp.
- Roof (z1) **chỉ do level đặt sẵn**, người chơi **không thể** tự đặt tile lên trên tile khác —
  polyomino luôn rơi thẳng xuống z0, mỗi cell rơi độc lập tới slot thấp nhất còn trống.
- Gravity cascade: khi z0 dưới một tile z1 bị Match mất, tile z1 đó "rơi" xuống z0, gia nhập
  active set để có thể tiếp tục Match ở lượt sóng (wave) kế tiếp.
- Thắng bằng `pairGoal` tích lũy (không cần dọn sạch bàn). Thua khi block hiện tại không còn
  vị trí hợp lệ nào (không giới hạn lượt/thời gian).
- Không khay, không tool (đổi khối/xả quân), không xoay block.

Đây là baseline. Mọi thay đổi dưới đây đều là **lệch khỏi baseline này một cách có chủ đích**,
không phải sửa lỗi.

---

## 2. Bước ngoặt: đảo ngược quy tắc Match + đưa lại cơ chế xếp chồng

### 2.1. Vì sao đổi

24K đã đúng theo GDD và chơi tốt, nhưng trong quá trình thảo luận tiếp, một hướng chơi khác
được đặt ra như một **nhánh thử nghiệm song song**, không phải để thay thế 24K vì 24K sai:

- **Match trên (top-match):** đổi quy tắc Match từ "chỉ tile ở z0" sang "chỉ tile đang **lộ**
  (không bị tile nào che ở trên) mới Match được" — bất kể tile đó đang nằm ở z0 hay z1. Một
  cell có 2 tầng thì chỉ tầng trên cùng là lộ; tầng dưới bị che, tạm thời không tham gia Match
  cho tới khi tầng trên biến mất.
- **Gravity xếp chồng (player-stackable placement):** đưa lại đúng thứ mà `01-LICH-SU-THAY-DOI-DEN-FINAL-CORE.md`
  đã chủ động bỏ ở các bản 24-gì-đó trước đây — người chơi được phép đặt piece mới **chồng lên
  trên** một tile đã có sẵn ở cell đó (miễn cell chưa đầy 2 tầng), không chỉ đặt vào cell trống.

Hai thay đổi này tạo ra một vòng lặp khác hẳn: **việc CHE tile của đối phương (hay chính mình)
trở thành một lựa chọn chiến thuật chủ động** — che một tile để "khoá" nó tạm thời, rồi tự tay
Match tile che ở trên để LỘ lại tile bên dưới đúng lúc mình cần, tương tự cách "gài bẫy rồi giải
bẫy" trong nhiều game match-3 xếp lớp. GDD gốc (24K) không có cơ chế này vì roof luôn có sẵn
theo layout level, người chơi không chủ động che gì cả.

### 2.2. Prototype thử nghiệm đầu tiên

`Final Core/proto-mechanic-match-top.html` — sandbox 1 màn, board nhỏ, minh hoạ đúng 2 quy tắc
trên bằng piece 1 ô ban đầu, sau đó nâng lên polyomino thật, thêm kéo-thả, sửa vài lỗi CSS/JS
phát sinh (thiếu `position:relative` trên khay kéo khiến tile bay lệch khỏi màn hình; thiếu
`grid-template-columns` khiến board dồn thành 1 cột).

### 2.3. Mở rộng thành 10 màn

`Final Core/24k-1.html` — dựng lại cơ chế trên với cấu trúc 10 level giống 24K (board 6×6, dãy
`pairGoal` 3–12 mượn nguyên từ 10 level thật), nhưng nội dung màn được sinh theo thủ tục
(procedural) vì không dùng lại được layout/sequence đã tay-tune của 24K (layout đó được thiết
kế cho quy tắc Match cũ). Điểm quan trọng: sửa lỗi hàng chờ (queue) hữu hạn — ban đầu piece được
rút từ một "túi" cố định nên có thể hết quân giữa màn; sửa thành túi tự làm đầy lại (reservoir
tự refill), đúng tinh thần "không giới hạn số lượt" của GDD gốc.

---

## 3. 24K-1 — bản do người dùng tự dựng, trở thành gameplay chính

`Final Core/24K-1-top-match-same-layer.html` là một bản dựng **độc lập, đầy đủ hơn**, tái sử
dụng đúng UI/CSS thật của 24K (HUD, board, tray, overlay thắng/thua) thay vì dựng UI riêng như
`24k-1.html`, với 10 level được viết tay (không sinh thủ tục), có trường `teach`/`lesson` và
`guideMoves` (gợi ý bằng cách làm nhấp nháy ô cần đặt, không dùng chữ). Đây là file được cả hai
bên hội tụ vào và tiếp tục tinh chỉnh nhiều vòng, và **được chốt là gameplay chính của game**.

Danh sách thay đổi đã áp dụng lên file này, theo thứ tự thực hiện:

### 3.1. Cơ chế lõi: Match nhóm (match-3/4), không chỉ match-2

- Thay thuật toán ghép cặp tham lam (greedy nearest-neighbor) bằng **gom nhóm liên thông**
  (connected-component qua BFS/DFS): mọi tile cùng ID + cùng tầng + đang lộ + liền cạnh nhau
  được gom vào một nhóm và biến mất cùng lúc — nhóm 2 là Match thường, nhóm 3/4 là "thưởng" khi
  tự nhiên xảy ra (không cố ý thiết kế level để ép ra nhóm 3/4).
- Điểm/tiến độ goal quy đổi theo cỡ nhóm: `score += 160 + (size-2)*120`; một nhóm cỡ N tính
  bằng N-1 "cặp quy đổi" vào goal.
- Thêm rào chắn **"không tự match trong 1 piece"**: mọi piece polyomino (tối đa 5 ô) không được
  có 2 ô liền cạnh cùng ID — tránh việc người chơi vô tình nhận một cặp match "miễn phí" ngay từ
  khi piece rơi xuống.

### 3.2. Hiệu ứng feedback: match-break và reveal (đọc được, không cần chữ)

- Hiệu ứng nổ khi Match (`k1MatchPop`, viền cell `k1CellMatch`) giờ có biên độ/độ sáng tăng theo
  cỡ nhóm (biến CSS `--n`), kèm hiệu ứng "chấn động" (shockwave lan toả) khi nhóm ≥3 và board
  rung nhẹ khi nhóm = 4 — quy mô lớn của Match phải "cảm" được ngay, không cần đọc số.
- Hiệu ứng Reveal (tile dưới lộ ra sau khi tile che nó bị Match) được tách hẳn khỏi ngôn ngữ hoạt
  hình "rơi xuống" của piece mới — đổi sang một quét sáng ngà từ trên xuống (`clip-path`), và
  chia lượt xử lý thành 2 nhịp rõ rệt: một khoảng khựng ngắn cho thấy "ô vừa trống" trước khi
  hiệu ứng lộ sáng chạy, để người chơi phân biệt được "cái gì vừa biến mất" và "cái gì vừa lộ ra"
  là hai việc khác nhau, không dồn vào một nhịp mờ.
- Toàn bộ chữ giải thích cơ chế trong khi chơi (nhãn pha "NHỊP 1 · GRAVITY...", câu mô tả dài ở
  thanh trạng thái, popup mở màn giải thích luật, overlay Help) **đã bị xoá hoàn toàn**. Những gì
  còn lại: tên màn, số điểm/goal, và animation. Dạy luật hoàn toàn bằng cách chơi có gợi ý
  (`guideMoves` — ô nhấp nháy vàng cho biết nên đặt ở đâu), không còn dòng chữ nào giải thích
  cơ chế.

### 3.3. Đổi điều kiện thắng: từ tổng số cặp sang "phá đủ N tile của từng loại cụ thể"

- Trước: `pairGoal` — cần đạt N cặp quy đổi, bất kể ID nào.
- Sau: `winTargets: [{id, need}, ...]` — mỗi màn có 1 hoặc nhiều loại tile cụ thể, mỗi loại cần
  bị Match đủ `need` tile. Theo dõi tiến độ theo từng ID (`targetCounts`), áp dụng cho toàn bộ 10
  màn (không chỉ màn 1) — với 9 màn giữ nguyên nội dung layout cũ, mục tiêu mới cho mỗi màn được
  **suy ra bằng mô phỏng thật** (chạy lại solution đã ghi sẵn của từng màn, đọc số tile mỗi ID
  thực sự bị Match), không phải đoán tay.
- Tác dụng phụ tích cực: việc đổi board và đổi mục tiêu buộc phải chạy lại solver cho cả 10 màn,
  và phát hiện ra **2 lỗi có thật** (mục 3.5) mà nếu không có bước kiểm tra này sẽ lọt vào bản
  chính.

### 3.4. Board 6×6 → 5×5

Thu nhỏ board theo yêu cầu thiết kế. Vì các level cũ được tay-tune cho board 6×6 (chỉ số ô
0–5), việc thu nhỏ xuống 5×5 (chỉ số 0–4) làm lộ ra tọa độ vượt biên ở 3 màn — xử lý ở mục 3.5.

### 3.5. Hai lỗi thật được tìm ra trong lúc đổi board/goal (không phải lỗi cố ý tạo ra để sửa)

- **3 màn có bước solution đặt piece vượt ra ngoài biên board mới**: các màn dựng theo mẫu
  "trạm 2" (station) đặt trạm thứ hai tại góc (4,3)/(4,4) — hợp lệ trên board 6×6 nhưng
  (4,4) đã là ô cuối trên board 5×5, không còn chỗ cho piece rơi tiếp. Dịch cả 3 trạm lên
  trên-trái một ô, xác minh lại bằng cách chạy solver so với board mới cho toàn bộ 10 màn.
- **1 tile tưởng là "rác/filler" nhưng thực ra là quân match dự tính**: khi rà biên, một tile
  nằm ở toạ độ vượt biên (row 5) ban đầu bị coi là filler và bị dời tới một góc trung lập — sau
  đó phát hiện goal của màn đó tính thiếu 1 cặp quy đổi so với thiết kế gốc, lần lại thì tile
  này vốn được đặt sát cạnh nơi một piece cuối cùng sẽ rơi tới, tạo ra cặp Match thứ 6 — phải đặt
  lại đúng vị trí liền cạnh với piece đó (không phải toạ độ gốc, vì toạ độ gốc đã đổi theo board
  mới) mới đúng thiết kế.
- Bài học giữ lại: mọi lần đổi kích thước board hoặc quy tắc thắng, **phải chạy lại solver mô
  phỏng cho toàn bộ level**, không chỉ soát bằng mắt — cả hai lỗi trên đều chỉ lộ ra qua việc
  solver báo `ok:false`, không nhìn thấy được từ việc đọc code.

### 3.6. Màn 1: dựng lại thành một màn dạy luật có chủ đích, không dùng chữ

Màn 1 cũ chỉ là 1 lượt đơn giản. Màn 1 mới là đúng 3 lượt, cả 3 đều được `guideMoves` gợi ý bằng
ô nhấp nháy, đi theo trình tự dạy đủ 3 khái niệm lõi của cơ chế mới:

1. Piece đầu buộc phải xếp chồng lên một tile có sẵn (vì ô đích đã có tầng dưới) → dạy "có thể
   đặt chồng".
2. Match tile vừa xếp chồng đó làm lộ tile bên dưới nó → dạy "gravity/reveal".
3. Tile vừa lộ ra lập tức Match tiếp với một tile mới đặt cạnh nó → dạy "match trên áp dụng cho
   cả tile vừa lộ, không chỉ tile mới đặt".

Độ dài (3 lượt) được chọn để không quá ngắn (chỉ dạy 1 khái niệm) cũng không quá phức tạp (vẫn
chỉ dùng domino, không dùng piece lớn).

### 3.7. Nhận diện tile "đang bị đè" / "không bị đè" — nhiều vòng chỉnh, bài học chính

Đây là phần tốn nhiều vòng thử-sai nhất, đáng ghi lại kỹ vì bài học có thể lặp lại ở phần UI/UX
sắp làm tiếp:

- Vòng 1–2: chỉnh `box-shadow` quanh `<div>` bọc tile trên board — không hiệu quả, vì ảnh mặt
  tile (asset) đã tự lấp đầy toàn bộ `<div>` (qua `object-fit:contain`), không còn khoảng trống
  cho box-shadow của khung ngoài thể hiện ra.
  quanh
- Vòng 3–4: chuyển sang "nướng" thêm viền bevel vào chính ảnh asset (mở rộng canvas, thêm dải
  màu/gradient) — vẫn bị phản hồi là không nhất quán, vì màu tự chọn (nâu vàng) lệch tông với
  màu nền thật của asset gốc.
- Vòng 5: đo màu thật từ pixel của asset gốc (không đoán) — phát hiện phần nền thẻ bài
  (rounded-card background) của asset **giống nhau tuyệt đối** giữa các tile, bất kể tile "trông
  dày" hay "trông mỏng". Sự khác biệt nằm ở chỗ khác.
- Vòng 6 (kết luận đúng): so màu từng pixel giữa asset "trông dày" (icon mặt tròn khảm hoa,
  icon chữ Hán, icon lóng trúc) và asset "trông mỏng" (icon chim/trúc dạng nét vẽ mảnh cho quân
  Sách-1) — 7 trong 8 icon đã tự có bóng đổ (drop-shadow) nướng sẵn trong chính icon; chỉ 1 icon
  (Sách-1, hình chim theo đúng truyền thống mahjong) là nét vẽ phẳng, không có bóng. Thử áp bóng
  giả lên một icon đã có bóng sẵn (Sách-4) cho kết quả xấu hơn (bóng đôi, nhoè) — xác nhận không
  nên xử lý đồng loạt. Giải pháp cuối: chỉ tạo bóng đổ tổng hợp (dò pixel icon, đổ bóng xám lệch
  xuống-phải) cho riêng icon Sách-1; 7 icon còn lại dùng thẳng asset gốc, không xử lý gì thêm.
- Bài học giữ lại cho các phần UI/UX sắp làm: khi một chi tiết hình ảnh "trông không đúng", đo
  pixel thật của tham chiếu trước khi đoán màu/kích thước; và một hiệu ứng chỉ nên áp cho đúng
  đối tượng đang thiếu nó, không áp đồng loạt cho mọi đối tượng kể cả những cái đã ổn.

---

## 4. Tình trạng tại thời điểm chốt

- `Final Core/24K-1-top-match-same-layer.html` — **gameplay chính**, tiếp tục được dùng làm nền
  để làm UI/UX theo `Document/FINAL-CORE-UI-UX-SPEC-TU-INDEX.md`.
- `Final Core/24k-1.html`, `Final Core/proto-mechanic-match-top.html` — các bản dựng trung gian
  trong quá trình khám phá cơ chế, không còn được phát triển tiếp, giữ lại làm tài liệu tham
  khảo lịch sử.
- `Final Core/24K-lower-layer-gravity.html` — vẫn là tài liệu tham khảo cho cơ chế GDD gốc
  (floor-only), không phải gameplay chính nữa.
- `Final Core/index.html`, `Final Core/level-select.html` — UI/UX (Main Menu, Level Select) của
  bản 24K gravity-cascade cũ; là nguồn tái sử dụng phần khung/animation cổng tre, không phải
  nguồn cho phần gameplay (gameplay trong đó vẫn là cơ chế floor-only cũ, không phải 24K-1).

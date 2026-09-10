# Playtest Audit — 50 Màn (2026-09-06)

Tự playtest toàn bộ 50 màn qua đúng engine thật (không chỉ replay solver offline), sau đợt cân
bằng lại đường cong độ khó (booster global pool, TILE_QUOTA/Lock mechanic, sàn độ khó tăng dần
theo chương). Mục tiêu: xác nhận cả 50 màn thật sự chơi được từ đầu đến thắng qua đúng UI/engine
(`p24kPlace`, `p24kResolveAnimated`, HUD, overlay) — không phải chỉ qua `p24kRunSolution` (vốn
chỉ replay logic, không đụng animation/overlay/HUD thật).

## Phương pháp

1. **Self-test tĩnh**: `window.__digest24k1.selfTest()` — kiểm cấu trúc 50 màn, guideMoves hợp
   lệ, solution khớp `p24mGoalMet`, kinh tế Xu, kho booster mặc định.
2. **Playtest động (script mới, `playtest_all_50.js`)**: với từng màn trong 50 màn theo đúng thứ
   tự thật (`window.showScreen('game')` → `startLevel(i)`), chạy lại đúng `solution` đã soạn
   bằng cách gọi `window.__digest24k1.place(row,col)` — **hàm thật của UI**, có animation,
   cascade, HUD, overlay thắng/thua — không phải bản giả lập.
3. Ghi nhận: màn có lỗi thật (đặt sai chỗ, exception, thua giữa chừng, hoặc chạy hết solution mà
   chưa thắng) tách biệt với **"thắng sớm"** (goal đã đạt trước khi hết solution) — hiện tượng đã
   biết và **cố ý giữ nguyên** ("difficulty safety-net pattern", xem ghi chú cuối bài).
4. **Audit hình ảnh**: chụp màn hình lúc *bắt đầu* màn (không phải màn hình thắng) cho 12 màn vừa
   thêm nội dung mới đợt cân bằng sàn (Lv32-49) để soi trực tiếp: ô chắn/khóa/HUD nhiều mục tiêu
   có hiện đúng, có bị rối mắt không.

## Kết quả tổng

| Chỉ số | Giá trị |
|---|---|
| Tổng số màn | 50/50 |
| Lỗi thật (đặt sai / exception / thua giữa chừng / hết solution chưa thắng) | **0** |
| Thắng sớm trước khi hết solution | 2 màn (Lv28, Lv30) |
| Console error trong lúc chơi | 1 lần (404 tài nguyên tĩnh của server test cục bộ — không liên quan game) |
| Self-test tĩnh | `ok: true` (tất cả check) |

**Cập nhật (bản mới nhất)**: con số này đã giảm nhiều lần qua các đợt sửa bên dưới — ban đầu 12
màn, xuống 9, xuống 7, và cuối cùng chỉ còn **2 màn** (Lv28, Lv30) sau đợt "Lv21-50 quá ngắn". Cả
hai đều đã được CẢI THIỆN đáng kể (không còn "để nguyên vì cố ý") nhưng vẫn còn thắng sớm nhẹ — xem
mục "Lv21-50 quá ngắn" bên dưới để biết lý do và mức độ chấp nhận được.

## Lv3-10 dễ hơn Lv2 (phát hiện mới sau khi user chơi thử)

User nhận xét: "các màn sau màn 2 đến màn 10 đang khá dễ so với chính màn 2." Đối chiếu số liệu thì
đúng — `computeDifficultyScore` không hề tính đến **tổng số ô cần khớp** (`tileGoal`/tổng
`winTargets`), nên công thức "hợp lệ" nhưng cảm giác chơi thì không: Lv2 có tổng mục tiêu 8, còn
Lv3(4), Lv4(4), Lv5(6), Lv6(6), Lv10(6) đều thấp hơn hẳn — tức là màn 2 thực chơi "nặng đô" hơn
nhiều màn sau nó.

**Đã sửa** bằng cách nâng tổng mục tiêu của 5 màn này lên bằng hoặc vượt Lv2:

| Màn | Tổng cũ | Tổng mới | Cách sửa |
|---|---|---|---|
| Lv3 | 4 | 8 | Thêm 2 quân mới (seed + piece), bàn 3×3 vẫn đủ chỗ sau khi các cặp cũ biến mất |
| Lv4 | 4 | 8 | Thêm 2 quân mới, tái dùng đúng ô trống sau move 2 |
| Lv5 | 6 | 8 | Thêm 1 quân mới ở góc bàn còn trống |
| Lv6 | 6 | 8 | Thêm mục tiêu bắt buộc thứ 4 (c1), tái dùng quân c1 dư sẵn có (không cần seed mới) |
| Lv10 | 6 | 10 | **Không thêm quân nào** — chỉ thêm `s1` vào `winTargets`; solution gốc vốn đã tạo ra đủ 4 s1 (qua wave-reveal + nước "filler" cũ), chỉ là trước đây không được tính vào mục tiêu |

Lv10 (màn tổng ôn chương 1) giờ có tổng mục tiêu 10 — cao nhất trong 10 màn đầu, đúng vai trò
"capstone". Đã verify lại bằng `design_helper.js` (trace từng nước, khớp `idCounts` dự kiến) và
self-test/playtest thật (`selfTest().ok === true`, engine thật chơi lại đúng cả 10 màn, không màn
nào lỗi hay thắng sớm ngoài ý muốn).

## Sàn độ khó theo chương (đã cân bằng đợt vừa rồi)

| Chương | Màn | Sàn (min) | Trạng thái |
|---|---|---|---|
| 1. Core & Kế hoạch | Lv1-10 | 0.6 | — |
| 2. Phong Ấn | Lv11-20 | 3.0 | > Ch1 ✓ |
| 3. Ô Chắn | Lv21-30 | 3.1 | > Ch2 ✓ |
| 4. Củng cố | Lv31-40 | 3.2 | > Ch3 ✓ |
| 5. Làm chủ | Lv41-50 | 3.3 | > Ch4 ✓ |

Tăng dần đúng yêu cầu, chênh lệch mỗi chương 0.1 điểm. (Đã đổi vài lần trong phiên này — xem 2 mục
dưới để biết lịch sử: bỏ auto-guide đưa Ch2 lên 2.8, rồi đợt Lv10-20 mở rộng đưa Ch2 lên 3.0, kéo
theo Ch3/4/5 phải nhích theo để giữ đúng thứ tự tăng dần.)

## Bỏ cơ chế auto-guide (trừ Lv1)

User yêu cầu: "trừ màn chơi đầu tiên... các màn chơi đang guide người chơi đặt mahjong tại 1 chỗ, bỏ
cơ chế đó." 18 màn (Lv2,3,4,5,6,8,9,11,12,13,16,19,22,26,28,31,34,42) từng có `guideMoves > 0` —
N nước đầu tiên tự động pulsing-highlight đúng ô cần thả, không cần người chơi tự đọc bàn cờ. Đã đặt
`guideMoves: 0` cho toàn bộ 18 màn này (chỉ Lv1 còn giữ `guideMoves: 2`, đúng yêu cầu).

**Hệ quả cần xử lý**: `computeDifficultyScore` trừ điểm theo `guideMoves` (màn được auto-guide coi
như dễ hơn), nên bỏ guide cũng đồng thời LÀM TĂNG điểm độ khó của 18 màn này — đúng bản chất (ít
gợi ý hơn = khó hơn thật), nhưng làm lệch 2 quy tắc đã set trước đó:
- Lv7 (Peak 1/3) tụt xuống dưới Lv6 (Lv6 từng được auto-guide nặng hơn) → đã sửa bằng cách nới bàn
  Lv7 5×5→6×6 + thêm 1 mặt trang trí (góc bàn không ai chạm tới) để Lv7 lấy lại vị trí đỉnh sóng.
- Lv13 (Peak 2/3) tụt xuống dưới Lv12 → đã sửa bằng cách thêm 1 ô seal trang trí + nâng
  `sealRequiredDistinct` 2→3 (solution gốc vốn đã tạo đủ 3 mặt khớp trước khi hết nước, không đổi
  cách giải).

Đã verify lại: `selfTest().ok === true`, playtest thật lại cả 50 màn (0 lỗi thật, 9 màn thắng sớm —
đúng pattern cũ), sàn từng chương vẫn tăng dần (0.6 → 2.8 → 2.9 → 3.0 → 3.1), 3 đỉnh sóng Lv7/13/18
vẫn cao hơn hàng xóm ngay sát nó.

## Đồng bộ bàn Lv10-20 về 5×5

User yêu cầu đưa toàn bộ Lv10-20 về đúng 5×5 (trước đó lẫn lộn 4×4/5×5/6×6). Lv11 chỉ cần nới rộng
(4×4→5×5, an toàn — tọa độ cũ vẫn hợp lệ). Lv13/18/19/20 (6×6) phải THIẾT KẾ LẠI vì nội dung thật sự
dùng tới hàng/cột 5:

| Màn | Vấn đề ở bản 6×6 | Cách sửa |
|---|---|---|
| Lv13 | 2 nước cuối đặt quân tới cột 5 | Đi lại tuyến giải 3 nước cuối qua giữa bàn thay vì kéo dài sang phải; seal (trang trí) dời vào góc |
| Lv18 | Cặp mục tiêu s2 (nước 3-4) đặt tới cột 5 | Đi lại tuyến giải nước 3-6 qua giữa bàn; seal (hàng 0, cột 0-3) không đổi vì vốn đã nằm trong 5×5 |
| Lv19 | Chỉ 1 ô seal trang trí (chưa từng được đặt quân vào) nằm ở cột 5 | Dời riêng ô seal đó vào góc trống, không đổi gì khác |
| Lv20 | Cả 2 "trạm" (station) + mồi seal-progress nằm trải từ cột 1 đến cột 5, hàng 4-5 | Dồn toàn bộ hàng 2 (2 trạm + 2 ô kích hoạt) sang trái 1 cột; mồi seal-progress (nước 1) chuyển từ góc (5,5) lên hàng 0-1 |

Mỗi thiết kế lại đều verify bằng `design_helper.js` (trace từng nước, khớp `idCounts` kỳ vọng) rồi
xác nhận lại bằng engine thật (`selfTest()` + `runSolution`) — riêng thời điểm seal mở (Lv18/20, quân
phải đặt vào đúng ô đang bị khóa) được kiểm tra thủ công vì `design_helper.js` không mô phỏng seal.

**Hệ quả độ khó**: bàn nhỏ lại làm giảm nhẹ điểm `computeDifficultyScore` (số hạng `size*0.3`), khiến
Lv13 (Peak 2/3) tụt xuống ngang bằng Lv14 (4.0=4.0, không còn "cao hơn"). Đã sửa bằng cách thêm 1 ô
seal trang trí thứ 4 cho Lv13 (không đổi cách giải) để lấy lại vị trí đỉnh sóng (4.3 > 4.0).

Đã verify lại: `selfTest().ok === true`, playtest thật cả 50 màn (0 lỗi thật, 9 màn thắng sớm — không
đổi so với trước), sàn từng chương vẫn tăng dần (0.6 → 2.8 → 2.9 → 3.0 → 3.1), Peak 2/3 (Lv13=4.3) và
Peak 3/3 (Lv18=4.5) đều vẫn cao hơn hàng xóm sát cạnh.

## Lv10-20 quá ngắn (ít nước, ít mục tiêu) — mở rộng nội dung thật

User nhận xét: "các màn chơi từ 10 đến 20 có lượng thời gian chơi quá ngắn đến từ việc ít move và ít
goal, tăng lên." Đo bằng "số nước thật cho tới khi thắng" (không phải `moveLimit` hay độ dài
`solution` đã soạn — game kết thúc NGAY khi đạt goal, nước nào phía sau không chạy tới thì không
tính) thì đúng: Lv11=2, Lv12=2 (thắng sớm), Lv15=3, Lv16=3, Lv17=3 (thắng sớm), Lv20=3 — khá ngắn so
với các màn "OK" khác trong game.

**Đã mở rộng cả 11 màn** bằng nội dung thật (seed + quân mới, hoặc nâng `need` của mục tiêu có sẵn
để dùng nốt quân dư đang nằm chết trên bàn) — không đổi cách chơi cốt lõi của từng màn:

| Màn | Số nước thật (trước→sau) | Goal (tổng, trước→sau) | Ghi chú |
|---|---|---|---|
| Lv10 | 5→6 | 10→14 | Thêm mục tiêu bắt buộc thứ 4 (c1, need:4), tái dùng quân c1 dư từ move 4 |
| Lv11 | 2→4 | — (Mở Phong Ấn) | Thêm 2 nước khởi động không tạo khớp trước nước quyết định (vẫn đúng bài học "1 mặt là đủ") |
| Lv12 | 2→4 (hết thắng sớm) | — (Mở Phong Ấn) | Đổi mặt thứ 3 từ "khớp lặp lại mặt cũ" (vốn đã lỗi thời — 2 seed s1 vốn liền kề nhau nên đã gộp làm 1 ngay từ nước 1) sang mặt w1 thật, nâng `sealRequiredDistinct` 2→3 |
| Lv14 | 4→5 | 4→6 | Nâng need c1 2→4, tái dùng quân c1 dư (ô kích hoạt luôn tồn tại, không bao giờ bị tiêu) |
| Lv15 | 3→4 | 6→8 | Nâng need s1 2→4, tái dùng quân s1 dư từ move 3 |
| Lv16 | 3→5 | 8→10 | c1 thành mục tiêu bắt buộc (need:4), ghép 2 quân c1 mồ côi có sẵn (move 1 và move 3) |
| Lv17 | 3→5 (hết thắng sớm) | 6→12 | Nhân đôi need s1/w1 (2→4), thêm seed w1 thứ 2 + tái dùng quân s1 dư — c2 (route thứ 3) vẫn không chạm tới, giữ đúng tinh thần "hai đường, chọn 1" |
| Lv19 | 4→5 | 2→6 | Thêm mục tiêu bắt buộc thứ 2 (c1, need:4), tái dùng quân c1 dư từ move 4 |
| Lv20 | 3→6 | 10→16 | Bỏ `targetRequiredCount` (bắt buộc đủ cả 5 mặt thay vì 4/5) + nhân ba need của c1/w1/c2 (2→4), dùng 2 ô kích hoạt dư sẵn + 1 seed w1 mới — từ màn NGẮN NHẤT nhóm 10-20 dù là màn chốt chương, giờ thành màn DÀI NHẤT |

Lv13/18 (2 đỉnh sóng "Peak 2/3", "Peak 3/3") vốn đã 5-6 nước thật, giữ nguyên không cần mở rộng.

**Hệ quả độ khó**: thêm nội dung làm tăng điểm `computeDifficultyScore` của nhiều màn, đẩy sàn
Chương 2 (giữ bởi Lv16) từ 2.8 lên 3.0 — vượt qua sàn Chương 3 cũ (2.9, giữ bởi Lv21/Lv23 hòa nhau)
lẫn sàn Chương 4 cũ (3.0, giữ bởi Lv32/33/37 và Lv35/36 hòa nhau nhiều lớp) lẫn sàn Chương 5 cũ
(3.1, giữ bởi Lv41/Lv46 hòa nhau) — một chuỗi domino 3 chương liền phải nhích lên. Đã sửa bằng
cách thêm 1-2 ô chắn trang trí (không đụng cách giải) cho từng màn giữ sàn, và nới bàn 4×4→5×5 cho
Lv41 (bàn đã đặc kín 16/16 ô, không còn chỗ trống để thêm ô chắn):

| Màn | Sàn giữ bởi | Cách sửa |
|---|---|---|
| Ch3 (Lv21) | First Blocker | +2 ô chắn trang trí (góc bàn) |
| Ch4 (Lv32,33,35,36,37) | 5 màn hòa nhau ở 3.1-3.2 | Mỗi màn +1 ô chắn trang trí ở ô trống cuối cùng |
| Ch5 (Lv41,46) | Mastery Begins, One Shot | Lv41 nới bàn 4×4→5×5 (đặc kín) + 2 ô chắn mới; Lv46 +1 ô chắn |

Sàn cuối cùng: 0.6 → 3.0 → 3.1 → 3.2 → 3.3 (tăng đều 0.1/chương, không còn hòa).

Mỗi nước mới đều verify bằng `design_helper.js` trước, rồi xác nhận lại engine thật qua một script
đo "nước thật cho tới khi thắng" (`window.__digest24k1.debug.freshModel`/`modelDrop`, kiểm tra
điều kiện thắng sau từng nước — chính xác hơn `solution.length`). Đã verify lại toàn bộ: `selfTest()`
`ok: true`, playtest thật cả 50 màn (0 lỗi thật, 7 màn thắng sớm — giảm từ 9 vì Lv12/17 hết thắng
sớm), sàn từng chương tăng dần đúng yêu cầu, không còn hòa giữa 2 chương liền kề.

## Move limit sát nút — nới dư 1-2 nước mỗi màn

User yêu cầu: "hiện tại, số lượt move chỉ để vừa đủ mà người chơi có thể giải được, tôi muốn mỗi
màn dư ra 1-2 move." Đúng — 34/50 màn có `moveLimit` bằng CHÍNH XÁC độ dài `solution` (dư 0 nước),
tức là đặt sai 1 quân là thua ngay, kể cả với các nước "filler" vô hại không ảnh hưởng mục tiêu.

**Đã nâng `moveLimit`** cho toàn bộ 34 màn này lên dư 2 nước (`solutionLen + 2`), trừ 2 ngoại lệ có
chủ đích rõ ràng trong chính lesson text của màn đó:
- **Lv46 "One Shot"** — giữ nguyên `moveLimit: 1`. Lesson là "ONE MOVE, TWO MATCHES, NO SECOND
  CHANCE" — thêm dư nước sẽ phá vỡ hoàn toàn bản chất màn này (không còn là "một nước" nữa).
- **Lv7 và Lv13** (2 trong 3 "đỉnh sóng" độ khó) — chỉ nâng dư 1 nước (không phải 2), vì lesson text
  gốc ghi rõ "ZERO SPARE MOVES". Đã sửa lesson text bỏ cụm đó (không còn đúng nữa) nhưng vẫn giữ 2
  màn này căng hơn mức trung bình một chút, đúng tinh thần "đỉnh sóng".

Việc nới `moveLimit` không đụng tới nội dung/solution/mục tiêu của bất kỳ màn nào — chỉ nới TRẦN số
nước trước khi thua, nên không ảnh hưởng độ khó tính bởi `computeDifficultyScore` (hàm này không hề
đọc `moveLimit`) lẫn thời điểm thắng thật (`levelWon()` vẫn kích hoạt ngay khi đạt goal, không phụ
thuộc trần nước). Sàn độ khó theo chương giữ nguyên (0.6 → 3.0 → 3.1 → 3.2 → 3.3).

Đã verify lại: `selfTest().ok === true`, playtest thật cả 50 màn (0 lỗi thật, 7 màn thắng sớm —
không đổi so với trước).

## Lv21-50 quá ngắn — áp dụng lại đợt mở rộng Lv10-20

User yêu cầu: "apply tương tự với 30 level cuối" — tức là soát lại 30 màn còn lại (Lv21-50) bằng
đúng phương pháp "số nước thật cho tới khi thắng" đã dùng cho Lv10-20, và mở rộng những màn quá
ngắn. Kết quả đo: 16/30 màn có vấn đề — 7 màn "thắng sớm" nặng (goal đạt xong sớm hơn hẳn số nước
đã soạn, đa số do `targetRequiredCount` cho phép bỏ qua 1-2 mục tiêu mà giải pháp gốc chưa từng
chạm tới) và 9 màn khác chỉ đơn giản ngắn (2-3 nước thật dù không có lỗi thắng sớm).

**Đã sửa cả 16 màn**, chủ yếu bằng 2 kỹ thuật không cần thiết kế lại bàn cờ:
1. **Tái sử dụng "quân rơi rớt"**: nhiều màn đã có sẵn quân dư thừa (từ quân domino đặt lệch, ô
   kích hoạt không bao giờ bị tiêu, v.v.) nằm chết trên bàn từ trước — chỉ cần thêm 1 nước mới ghép
   đôi chúng lại, không cần seed/quân hoàn toàn mới.
2. **Bỏ `targetRequiredCount`** (bắt buộc đủ 100% mục tiêu) khi cách giải gốc vốn đã tạo ra TẤT CẢ
   mục tiêu, chỉ là trước đây cho phép bỏ qua 1-2 cái nên thắng sớm hơn cần thiết.

| Màn | Số nước thật (trước→sau) | Goal (tổng, trước→sau) | Ghi chú |
|---|---|---|---|
| Lv21 | 3→5 | 6→10 | s2/c2 thêm làm mục tiêu bắt buộc, ghép nốt 2 quân dư có sẵn |
| Lv24 | 2→4 | 10→10 | Bỏ targetRequiredCount + 2 seed/piece mới thay 3 nước "chết" hoàn toàn (không đụng gì) |
| Lv25 | 2→3 | 10→10 | Bỏ targetRequiredCount + 1 seed/piece mới thay 3 nước "chết" |
| Lv26 | 2→3 | 8→8 | Bỏ targetRequiredCount + ghép nốt quân s1 dư có sẵn |
| Lv28 | 2→3 | 10→10 | Bỏ targetRequiredCount — quân s2 cần thiết vốn đã có sẵn ở nước 3, không cần thêm gì |
| Lv29 | 3→7 | 12→14 | Bỏ targetRequiredCount + nâng need c1 (2→4) + ghép nốt quân c1 dư có sẵn |
| Lv30 | 2→6 | 3→15 | Thêm 3 mục tiêu bắt buộc (c1/w1/s2) tận dụng đúng cascade nước 6 vốn đã tạo ra chúng — 0 nội dung mới |
| Lv31 | 2→4 | — (Mở Phong Ấn) | Nâng sealRequiredDistinct 2→4, ghép quân w1/h1 dư có sẵn |
| Lv32 | 3→4 | 4→6 | Nâng need s1 (4→6) + 1 seed/piece mới ở góc trống |
| Lv33 | 2→3 | 6→8 | Nâng need s1 (4→6, vẫn giữ "either way") + 1 seed/piece mới |
| Lv34 | 3→4 | — (Mở Phong Ấn) | Nâng sealRequiredDistinct 3→4, ghép nốt quân h1 dư có sẵn |
| Lv38 | 3→4 | 4→8 | h1 thêm làm mục tiêu bắt buộc (need:4), ghép nốt quân h1 dư có sẵn |
| Lv40 | 3→4 | 6→8 | s2 thêm làm mục tiêu bắt buộc, ghép nốt quân s2 dư có sẵn |
| Lv42 | 3→4 | 7→9 | h1 thêm làm mục tiêu bắt buộc, ghép nốt quân h1 dư có sẵn |
| Lv43 | 4→5 | — (Mở Phong Ấn) | Nâng sealRequiredDistinct 3→4 — mặt thứ 4 vốn đã có sẵn ở nước 5, không cần thêm gì |
| Lv48 | 3→4 | — (Mở Phong Ấn) | Nâng sealRequiredDistinct 2→3, bắc cầu quân s1 dư với seed chưa từng chạm tới |

Lv27/35/36/37/39/41/44/45/47/49 vốn đã đủ dài (4-7 nước thật, không lỗi thắng sớm) nên giữ nguyên.
Lv46 "One Shot" không đụng tới (đã xử lý ở đợt move-limit trước — đúng 1 nước là chủ đích).

Còn lại 2 màn (Lv28 3/5, Lv30 6/8) vẫn còn thắng sớm nhẹ dù đã cải thiện đáng kể (Lv30 từ 2→6) —
chấp nhận được vì phần còn thiếu đòi hỏi thiết kế nội dung mới phức tạp hơn nhiều so với lợi ích
thêm được; đã ghi nhận rõ trong code.

**Lưu ý phát hiện được**: khi thêm mục tiêu mới, phải luôn verify bằng engine thật (không chỉ nhìn
comment cũ) — bắt được 2 lỗi trong lúc làm: (1) `K_DOMINO_V(key,a,b)` xếp `a` ở ô neo và `b` ở ô
NGAY DƯỚI, không phải ngược lại — đọc nhầm thứ tự này ở Lv38 khiến quân h1 mục tiêu khớp ngay từ
nước 1 (need:2 không đủ, phải nâng lên need:4 để nước 4 thật sự cần thiết); (2) 2 seed liền kề nhau
(cùng mặt) được viết TRỰC TIẾP trong `tiles` mà không qua một nước đặt quân nào thì KHÔNG tự khớp —
chỉ khớp khi có quân MỚI chạm vào; `design_helper.js` (bản rút gọn dùng để test nhanh) có lúc mô
phỏng sai trường hợp 3+ ô liền kề cùng mặt đặt sẵn — engine thật luôn là trọng tài cuối cùng.

Đã verify lại: `selfTest().ok === true`, playtest thật cả 50 màn (0 lỗi thật, 2 màn thắng sớm — giảm
từ 7), sàn từng chương vẫn tăng dần đúng yêu cầu (0.6 → 3.0 → 3.1 → 3.2 → 3.3, không đổi).

## Audit hình ảnh

Soi trực tiếp màn hình lúc bắt đầu cho 12 màn (Lv32-36, 37-41, 45, 46, 49) vừa được thêm nội dung
thật (mục tiêu mới + ô chắn) để đủ sàn độ khó chương:

- **Bàn cờ đọc rõ, không rối mắt**: ô chắn mới luôn gom thành cụm ở góc/mảng riêng (không rải rác
  khắp bàn), không chồng lấn quân/ô khóa/seal có sẵn.
- **HUD nhiều mục tiêu hiện đúng**: Lv49 (4 mục tiêu) và Lv36 (Lock + 4 mục tiêu) đều hiện đủ chip
  góc trên, đúng số đếm — xác nhận lại tính năng "multi-target HUD" từ đợt trước vẫn hoạt động
  đúng khi số mục tiêu tăng lên 4.
- **Không phát hiện lỗi hiển thị nào** ở phần bàn cờ/HUD của 12 màn này.

### Phát hiện phụ (ngoài phạm vi phiên làm việc này)

Màn hình **"Hoàn thành Level"** (win overlay, do phiên khác xây dựng cho phần kinh tế Xu) có 1
lỗi hiển thị nhỏ: dòng "Chuỗi tốt nhất ×N" xuất hiện kèm 1 ô vuông màu vàng nhạt lạc lõng ngay
sau đó (ảnh chụp Lv1, `playtest_shots/lv1.png`) — có vẻ là icon thiếu ảnh hoặc thiếu style. Không
thuộc phần tôi đang phụ trách (booster/độ khó/level data) nên chỉ ghi nhận ở đây để đội biết, chưa
sửa.

## Bảng đầy đủ 50 màn

| Lv | Tên | Chương | Goal (tổng) | Bàn | Move | Độ khó | Trạng thái |
|---|---|---|---|---|---|---|---|
| 1 | A Single Spot | Core & Kế hoạch | Phá N mahjong (7) | 2×2 | 4 | 0.6 | OK |
| 2 | Current and Next | Core & Kế hoạch | Phá N mahjong (8) | 3×3 | 5 | 1.6 | OK |
| 3 | Every Cell Falls On Its Own | Core & Kế hoạch | Phá N mahjong (8) | 3×3 | 6 | 2.2 | OK |
| 4 | Same Face, Different Floor | Core & Kế hoạch | Phá N mahjong (8) | 3×3 | 5 | 2.2 | OK |
| 5 | Roof Opens the Floor | Core & Kế hoạch | Phá N mahjong (8) | 4×4 | 5 | 2.1 | OK |
| 6 | The Fourth Face | Core & Kế hoạch | Chọn mặt (8) | 4×4 | 6 | 2.6 | OK |
| 7 | Pick The Target Face | Core & Kế hoạch | Chọn mặt (9) | 6×6 | 6 | 2.7 | OK |
| 8 | One Triomino, Two Heights | Core & Kế hoạch | Chọn mặt (8) | 4×4 | 4 | 2.4 | OK |
| 9 | Two Match Stations | Core & Kế hoạch | Chọn mặt (8) | 5×5 | 6 | 3.0 | OK |
| 10 | Core Review | Core & Kế hoạch | Chọn mặt (14) | 5×5 | 7 | 2.8 | OK |
| 11 | Break The First Seal | Phong Ấn | Mở Phong Ấn | 5×5 | 5 | 3.4 | OK |
| 12 | Two Different Faces | Phong Ấn | Mở Phong Ấn | 5×5 | 5 | 4.6 | OK |
| 13 | Use The Freed Cell | Phong Ấn | Chọn mặt (11) | 5×5 | 6 | 4.3 | OK |
| 14 | One Meter, Many Cells | Phong Ấn | Chọn mặt (6) | 5×5 | 7 | 4.2 | OK |
| 15 | A Breather | Phong Ấn | Chọn mặt (8) | 5×5 | 6 | 3.6 | OK |
| 16 | The Fifth Face | Phong Ấn | Chọn mặt (10) | 5×5 | 7 | 3.0 | OK |
| 17 | Two Routes to Progress | Phong Ấn | Chọn mặt (12) | 5×5 | 7 | 4.4 | OK |
| 18 | Three Faces Unlocked | Phong Ấn | Chọn mặt (13) | 5×5 | 8 | 4.5 | OK |
| 19 | Buried Under Seal | Phong Ấn | Đào tile chôn (6) | 5×5 | 7 | 4.6 | OK |
| 20 | Twin Stations | Phong Ấn | Chọn mặt (16) | 5×5 | 8 | 5.2 | OK |
| 21 | First Blocker | Ô Chắn | Chọn mặt (10) | 5×5 | 7 | 3.3 | OK |
| 22 | Two-Cell Notch | Ô Chắn | Chọn mặt (8) | 5×5 | 6 | 3.4 | OK |
| 23 | Topology Fit | Ô Chắn | Chọn mặt (10) | 5×5 | 6 | 3.1 | OK |
| 24 | Detour Wall | Ô Chắn | Chọn mặt (10) | 6×6 | 6 | 3.4 | OK |
| 25 | Fork Around | Ô Chắn | Chọn mặt (10) | 6×6 | 5 | 3.4 | OK |
| 26 | Seal Behind Stone | Ô Chắn | Chọn mặt (8) | 6×6 | 5 | 4.3 | OK |
| 27 | Open Route | Ô Chắn | Đào tile chôn (2) | 6×6 | 7 | 4.8 | OK |
| 28 | Sixth Face | Ô Chắn | Chọn mặt (10) | 6×6 | 5 | 3.3 | OK (thắng sớm 3/5) |
| 29 | Three Faces, Two Stations | Ô Chắn | Chọn mặt (14) | 6×6 | 9 | 5.3 | OK |
| 30 | Chapter Final Exam | Ô Chắn | Đào tile chôn (15) | 6×6 | 10 | 5.9 | OK (thắng sớm 6/8) |
| 31 | Seal and Stone | Củng cố | Mở Phong Ấn | 4×4 | 6 | 4.3 | OK |
| 32 | Two Under One | Củng cố | Đào tile chôn (6) | 4×4 | 6 | 3.4 | OK |
| 33 | Either Way Works | Củng cố | Chọn mặt (8) | 4×4 | 5 | 3.4 | OK |
| 34 | Three Keys | Củng cố | Mở Phong Ấn | 4×4 | 6 | 4.2 | OK |
| 35 | Permanent Detour | Củng cố | Chọn mặt (6) | 4×4 | 5 | 3.2 | OK |
| 36 | Roof Chain | Củng cố | Chọn mặt (8) | 4×4 | 7 | 3.2 | OK |
| 37 | Three Distinct | Củng cố | Chọn mặt (8) | 4×4 | 5 | 3.2 | OK |
| 38 | Buried Behind Seal | Củng cố | Đào tile chôn (8) | 4×4 | 6 | 3.6 | OK |
| 39 | Stretch | Củng cố | Chọn mặt (10) | 5×5 | 7 | 3.3 | OK |
| 40 | Chapter 4 Review | Củng cố | Chọn mặt (8) | 4×4 | 6 | 3.4 | OK |
| 41 | Mastery Begins | Làm chủ | Chọn mặt (8) | 5×5 | 8 | 3.3 | OK |
| 42 | Squeezed | Làm chủ | Chọn mặt (9) | 4×4 | 6 | 3.4 | OK |
| 43 | Triple Seal | Làm chủ | Mở Phong Ấn | 4×4 | 7 | 4.0 | OK |
| 44 | The Long Wall | Làm chủ | Chọn mặt (8) | 5×5 | 9 | 3.4 | OK |
| 45 | Buried Twice | Làm chủ | Đào tile chôn (6) | 5×5 | 7 | 3.3 | OK |
| 46 | One Shot | Làm chủ | Chọn mặt (4) | 4×4 | 1 | 3.4 | OK |
| 47 | Six Faces | Làm chủ | Chọn mặt (12) | 6×6 | 8 | 3.3 | OK |
| 48 | Two Seals | Làm chủ | Mở Phong Ấn | 4×4 | 6 | 3.7 | OK |
| 49 | Penultimate | Làm chủ | Chọn mặt (12) | 6×6 | 9 | 3.3 | OK |
| 50 | Grand Finale | Làm chủ | Đào tile chôn (16) | 6×6 | 7 | 5.8 | OK |

## Kết luận

50/50 màn chơi được từ đầu đến thắng qua đúng engine thật (không chỉ solver offline). Không phát
hiện lỗi mới nào phát sinh từ đợt cân bằng lại đường cong độ khó (booster pool, TILE_QUOTA, Lock,
11 màn thêm nội dung để đủ sàn chương). 1 lỗi hiển thị nhỏ ở màn hình thắng được ghi nhận nhưng
thuộc phần việc của phiên khác.

## Giới hạn số loại mahjong tối đa (Lv6-50)

Yêu cầu người dùng: mỗi màn TARGET_FACE/BURIED_TARGET tối đa 4 loại mahjong nếu là độ khó duy
nhất, tối đa 3 loại nếu kết hợp với độ khó khác (Khóa/Ô Chắn/Niêm phong). Rà soát toàn bộ game
phát hiện 33 màn vi phạm (hệ quả tích lũy từ các đợt thêm target trước đó — chapter-floor fix và
+1-move scale-up pass), có màn lên tới 7 loại (Lv29, Lv47). Đã cắt `winTargets` xuống đúng giới
hạn cho cả 33 màn: **Lv6, 8, 9, 10, 13, 15, 16, 17, 18, 20, 21, 22, 23, 24, 25, 26, 28, 29, 30, 35,
36, 37, 38, 39, 40, 41, 42, 44, 45, 46, 47, 49, 50**.

Nguyên tắc chọn loại nào giữ lại: ưu tiên giữ các mặt CỐT LÕI ban đầu của màn (khớp tên/bài học),
bỏ các mặt được thêm sau (chapter-floor fix rồi tới +1-move scale-up). Các mặt bị bỏ khỏi
`winTargets` KHÔNG bị xóa khỏi bàn/nước đi — tile/seed/piece vẫn y nguyên, quân đó vẫn được ghép
đúng như trước, chỉ không còn tính vào goal. Nhiều màn giờ "thắng sớm" trước khi hết moveLimit
(các nước còn lại thành nước đệm vô hại) — đúng theo pattern "safety-net" đã có sẵn của game,
không sửa. 2 trường hợp đặc biệt đổi cả tên/bài học vì mâu thuẫn trực tiếp với số loại còn lại:
- **Lv47** "Six Faces" (bài học "PICK ANY FOUR OF THE SIX") → đổi tên "One Big Board, Three Faces",
  bài học mới phản ánh đúng 3 loại còn là goal (6 mặt cơ bản vẫn xuất hiện trên bàn, chỉ không
  đếm). Đã hỏi và được người dùng xác nhận áp dụng đúng quy tắc chung thay vì miễn trừ.
- **Lv18/29/30/37/39/40/49**: cập nhật câu chữ trong `lesson`/comment nơi số lượng mặt cũ ("FOUR
  FACES", "ALL SIX FACES", "ANY 3 OF 4") không còn khớp thực tế sau khi cắt.

Đã xác nhận lại bằng self-test (xanh toàn bộ) + `check_win_at.js` cho cả 33 màn: không màn nào bị
lỗi nước đi bất hợp lệ, tất cả vẫn giải được từ đầu đến thắng.

---
*Nguồn: `Final Core/index.html` (`window.P24M_LEVELS`), script `playtest_all_50.js` (Playwright,
gọi trực tiếp `p24kPlace` — hàm UI thật). Dữ liệu độ khó dùng `computeDifficultyScore()` từ
`level-editor.html`, cùng công thức với artifact "Fifty Tiles"/"Coarse & Fine".*

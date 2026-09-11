# GDD — Level Design (50 màn, Final Core)

*Nguồn duy nhất: `Final Outputs/index.html` (`P24M_LEVELS`, đọc trực tiếp qua
`window.__digest24k1` lúc runtime) + `Final Outputs/Mahjong_x_Block_Beatchart.xlsx` (điểm độ khó
tính lại từ chính dữ liệu đó). Tài liệu này **không** lặp lại nội dung cơ chế/gameplay đã có ở
`Final Outputs/GAME_DESIGN_DOCUMENT.md` (đọc file đó trước nếu cần hiểu Core Loop, Goal Type,
Blocker — file này thay thế `07-GDD-TONG-HOP-TU-INDEX.md` cũ, đã xoá khỏi repo) — đây là tài
liệu **chuyên về thiết kế màn**: cấu trúc độ khó, các quy tắc tác giả hoá đã được đúc kết qua
nhiều đợt playtest/feedback thật, và quy trình an toàn khi sửa/thêm màn. Khi tài liệu này mâu
thuẫn với `04-GDD-FINAL-CORE-MASTER.md` (bản 30-level, đã cũ) thì tài liệu này và
`GAME_DESIGN_DOCUMENT.md` thắng.*

*Cập nhật lần cuối: 11/09/2026, sau đợt "đổi luật Seal sang kề-sát" + "đổi thứ tự dạy Ô Chắn/
Phong Ấn" (cả 2 theo yêu cầu người dùng — xem `GAME_DESIGN_DOCUMENT.md` mục 4 cho chi tiết
luật Seal mới). Bản 08/09/2026 trước đó vẫn đúng cho mọi phần không nhắc tới Seal/thứ tự
chương bên dưới.*

---

## 1. Cấu trúc tổng thể

50 màn chia **5 chương × 10 màn**, ranh giới chương chỉ mang tính hiển thị ở màn chọn cấp
(không gate nội dung — Ô Chắn đã xuất hiện từ Lv11, Seal từ Lv21, không đợi đúng mốc chương).
**Thứ tự Ch2/Ch3 đã ĐẢO NGƯỢC so với bản trước 11/09/2026** (Ô Chắn dạy trước Phong Ấn, không
phải ngược lại) theo yêu cầu người dùng — Ô Chắn là cơ chế đơn giản hơn (chặn vĩnh viễn, không
điều kiện) nên hợp lý để dạy trước Seal (ngưỡng N mặt + giờ còn thêm ràng buộc kề-sát):

| Chương | Tên | Màn | Vai trò |
|---|---|---|---|
| C1 | Nền tảng | 1–10 | Dạy luật chơi cơ bản (drop, match, TILE_QUOTA) |
| C2 | Ô Chắn | 11–20 | Dạy Permanent (đổi chỗ với C3 cũ, 11/09/2026) |
| C3 | Phong Ấn | 21–30 | Dạy Seal (luật kề-sát mới), một số màn kết hợp với Permanent |
| C4 | Kết hợp | 31–40 | Ôn + phối hợp toàn bộ cơ chế trên board nhỏ (chủ yếu 4×4/5×5) |
| C5 | Mastery | 41–50 | Board lớn (5×5/6×6), phối hợp dày nhất, màn chốt hạ |

> 4 màn từng kết hợp Seal+Permanent ở vị trí Ch2 cũ (nay là Ch2 mới, trước khi Seal được dạy)
> đã được thiết kế lại thành Permanent thuần khi đổi chỗ chương: "Double Block" (Lv16, trước là
> "Seal Behind Stone"), "Three Faces, Two Stations" (Lv19), "Open Route" (Lv17), "Chapter Final
> Exam" (Lv20). Tile/sequence/solution giữ nguyên — chỉ đổi ô Seal (không còn ý nghĩa thật khi
> chưa dạy Seal) thành ô Permanent tương đương.

Phân bố loại mục tiêu (Goal Type) trên toàn bộ 50 màn (không đổi so với bản trước — đổi thứ tự
chương/đổi luật Seal không ảnh hưởng goalType của màn nào):

| Goal Type | Số màn | Ý nghĩa |
|---|---|---|
| `TILE_QUOTA` | 5 | Ghép đủ N quân bất kỳ mặt nào (C1, dạy luật match cơ bản) |
| `TARGET_FACE` | 32 | Ghép đủ N của (các) mặt cụ thể được liệt kê |
| `OPEN_SEAL` | 6 | Ghép đủ K mặt khác nhau, mỗi match kề sát seal, để phá niêm phong |
| `BURIED_TARGET` | 7 | Phải phá roof che trước mới chạm được mặt bị chôn bên dưới |

Phân bố cơ chế chặn/khoá (một màn có thể dùng nhiều hơn 1 loại; số liệu tính lại trực tiếp từ
`window.__digest24k1.LEVELS` ngày 11/09/2026 — chênh lệch với bản 08/09/2026 vì 4 màn đổi Seal
thành Permanent (mục trên) và vì một vài con số cũ đã lệch khỏi dữ liệu sống từ trước đó):

| Cơ chế | Số màn dùng |
|---|---|
| Permanent (Ô Chắn) | 28 |
| Seal (Niêm phong) | 17 |
| Lock (Khoá) | 16 |

---

## 2. Nguyên tắc đường cong độ khó

Áp dụng trực tiếp §3 của `puzzle-design-6-muc-tieu 1.md` (lý thuyết trục độ khó):

- **Trục thô (qualitative)**: cơ chế mới (Ô Chắn, Seal, Lock, BURIED_TARGET...). Luôn giới
  thiệu ở **màn dễ, đơn lẻ** trước khi bị trộn với cơ chế khác — ví dụ Ô Chắn dạy ở Lv11 (đơn
  lẻ, không kèm Seal) trước khi Seal xuất hiện ở Lv21 và 2 cơ chế bắt đầu kết hợp trong Ch4/5.
- **Trục tinh (quantitative)**: số nước, số mặt quân, `need` của từng mục tiêu, cỡ bàn. Dùng
  để tinh chỉnh độ khó *sau khi* cơ chế đã quen, không dùng để che giấu việc thiếu nội dung.
- **Không tăng đều một mạch (sawtooth)**: mỗi chương có nhịp "khó dần rồi thả một màn dễ"
  (breather level) — ví dụ Lv25 "A Breather" ngay sau đỉnh Lv23, Lv32 "Two Under One" là màn
  dễ nhất Chương 4 dù không phải màn đầu chương. *(Vị trí Lv23/25 đã đổi so với bản trước
  11/09/2026 — nội dung của 2 màn này nằm trong khối Ch2/Ch3 vừa đổi chỗ, xem §1.)*
- **Đỉnh cục bộ (peak) được đặt tên rõ**: Lv7/23/28 tự nhận là "PEAK 1/2/3 OF 3" trong lesson
  text (Lv23, Lv28 đã dịch chuyển từ Lv13/Lv18 cũ khi đổi chỗ Ch2/Ch3) — Lv7 nằm ở Ch1 trước
  khi cơ chế nào xuất hiện, còn Lv23/Lv28 nằm ở Ch3, sau khi cả Ô Chắn (Ch2) lẫn Seal (đầu Ch3)
  đã được dạy.
- **Sàn độ khó phải tăng dần theo chương** (đo bằng điểm trung bình chương, xem §3 dưới) —
  đây là quy tắc **cứng**: nếu một chương sau có điểm trung bình thấp hơn chương trước, đó là
  lỗi thiết kế cần sửa ngay, không phải "biến thể cho phong phú". **Ngoại lệ đã ghi nhận có chủ
  đích (11/09/2026)**: Ch2 (Ô Chắn, TB 40.6) hiện CAO HƠN Ch3 (Phong Ấn, TB 33.5) sau khi đổi
  thứ tự dạy cơ chế theo yêu cầu người dùng — xem hộp cảnh báo ở §3 để biết lý do và trạng
  thái "cần cân bằng lại sau" của ngoại lệ này.

---

## 3. Công thức điểm độ khó

Tính từng màn bằng 7 thành phần cộng lại (định nghĩa đầy đủ + số liệu sống nằm ở
`Final Outputs/Mahjong_x_Block_Beatchart.xlsx`, sheet "Công thức" + "Level Difficulty"):

| # | Thành phần | Công thức | Ý nghĩa |
|---|---|---|---|
| ① | Cỡ bàn | `size² / 4` | Bàn to hơn = nhiều ô phải quản lý cùng lúc |
| ② | Kế hoạch | `= Nước lời giải tối ưu` | Lời giải dài hơn = phải nghĩ xa hơn |
| ③ | Độ chật | `max(0, 3 − Lượt dư) × 1.5` | Lượt dư = Move Limit − Nước lời giải; dư càng ít càng ít chỗ sai |
| ④ | Mặt quân | `Số mặt khác nhau TRÊN BÀN × 1.2` | Đếm mọi mặt xuất hiện trong `tiles`/`sequence`, **không chỉ** mặt được tính là mục tiêu |
| ⑤ | Cơ chế | `Seal×2 + Ô Chắn×2 + Lock×3` | Lock nặng nhất vì luôn gắn với ngưỡng 1 mặt cụ thể |
| ⑥ | Khối | `Khối lớn nhất trong hàng đợi × 0.5` | Khối nhiều ô hơn = khó tìm chỗ đặt hợp lệ |
| ⑦ | Mục tiêu | `TILE_QUOTA=0 · OPEN_SEAL=1 · TARGET_FACE=2 · BURIED_TARGET=4` | Trọng số theo độ phức tạp bản chất của loại goal |

**Mức độ** (Dễ/Vừa/Khó/Rất khó) chia theo **tứ phân vị thật** của 50 điểm hiện tại — luôn tính
lại mỗi khi có màn thay đổi, không dùng ngưỡng số cố định. Tại thời điểm viết tài liệu này (sau
đợt đổi luật Seal + đổi chỗ Ch2/Ch3, 11/09/2026):
Dễ < 27.9 · Vừa 27.9–39.0 · Khó 39.0–43.5 · Rất khó ≥ 43.5.

Điểm trung bình theo chương hiện tại (mục tiêu: tăng dần, cho phép 2 chương liền kề gần bằng
nhau nếu chênh lệch nhỏ; **không được đảo thứ tự** — trừ ngoại lệ Ch2/Ch3 đã ghi nhận có chủ
đích ngay dưới):

| Chương | Điểm TB | Min | Max |
|---|---|---|---|
| C1 Nền tảng | 21.1 | 7.9 | 26.7 |
| C2 Ô Chắn | 40.6 | 32.5 | 50.1 |
| C3 Phong Ấn | 33.5 | 22.8 | 44.8 |
| C4 Kết hợp | 42.9 | 34.6 | 56.0 |
| C5 Mastery | 45.2 | 34.3 | 59.7 |

> **⚠️ Vi phạm quy tắc "tăng dần theo chương" — CÓ CHỦ Ý (11/09/2026)**: Ch2 (40.6) hiện CAO
> HƠN Ch3 (33.5), vì Ch2/Ch3 chỉ đổi CHỖ nội dung cho nhau (đổi thứ tự dạy Ô Chắn/Seal theo yêu
> cầu người dùng — xem §1) mà KHÔNG cân bằng lại độ khó nội tại của từng chương theo vị trí
> mới. Đánh đổi được chấp nhận có chủ đích: ưu tiên thứ tự dạy cơ chế hợp lý (Ô Chắn — chặn
> vĩnh viễn, không điều kiện — dễ hiểu hơn Seal — ngưỡng N mặt + ràng buộc kề-sát — nên dạy
> trước) hơn đường cong độ khó tuyệt đối theo chương. **Việc cần làm sau (chưa làm trong đợt
> này)**: 1 đợt cân bằng lại riêng để hạ độ khó trung bình Ch2 hoặc nâng Ch3 (hoặc cả hai) tới
> khi quy tắc đơn điệu được khôi phục — xem cột "Điểm độ khó" trong `Beatchart.xlsx` để chọn
> đúng màn cần chỉnh trong mỗi chương (ưu tiên màn lệch xa TB nhất trước).
>
> C4 và C5 hiện gần bằng nhau (42.9 vs 45.2) sau khi đánh đổi vài điểm độ khó của C4 lấy bố
> cục gọn hơn (xem §6) — đây là đánh đổi có chủ đích, không phải sai số cần "sửa cho khớp".

**Quy trình cập nhật**: sau bất kỳ thay đổi nào ảnh hưởng đến 1 trong 7 thành phần trên (thêm
target, đổi moveLimit, thêm Seal/Permanent/Lock, đổi cỡ bàn...), phải chạy lại script trích
xuất + tính điểm và ghi đè `Final Outputs/Mahjong_x_Block_Beatchart.xlsx` (cả bảng số liệu lẫn ảnh
biểu đồ) trước khi coi màn đó là "xong". Không có script này trong repo — nó được viết lại từ
đầu mỗi phiên làm việc bằng cách gọi `window.__digest24k1.LEVELS` qua Playwright rồi dùng
`exceljs`/`jszip` để ghi lại file (xem §8).

---

## 4. Giới hạn số loại mahjong tối đa mỗi màn

**Quy tắc (chốt 08/09/2026, theo phản hồi playtest thật)**: số **loại mặt quân được liệt kê
làm mục tiêu** (`winTargets.length`, áp dụng cho `TARGET_FACE` và `BURIED_TARGET`) không được
vượt:

- **Tối đa 4 loại** nếu màn KHÔNG kết hợp Seal/Permanent/Lock nào khác.
- **Tối đa 3 loại** nếu màn CÓ kết hợp ít nhất 1 trong 3 cơ chế trên.

**Lý do**: thanh mục tiêu (goal-strip) hiển thị 1 chip riêng cho mỗi mặt quân + 1 chip cho
Seal/Lock nếu có. Quá 4-5 chip trên màn hình điện thoại hẹp làm chữ số bị bé, khó phân biệt
loại mặt — người chơi thật (playtest theo 2 persona: nam trung niên và nữ trung niên, cả hai
đều là nhóm tuổi mục tiêu thực tế của thể loại game xếp mạt chược) đều phản hồi "quá nhiều
loại phải nhớ cùng lúc" là điểm trừ rõ rệt, không phải cảm nhận chủ quan của 1 người.

**Không phải target thì vẫn được giữ lại làm nội dung "trang trí"**: khi một mặt bị loại khỏi
`winTargets` do vượt giới hạn, KHÔNG xoá tile/sequence/move đã tạo ra nó — chỉ xoá khỏi mảng
`winTargets`. Quân đó vẫn được đặt và ghép bình thường trên bàn, chỉ là không được đếm vào
điều kiện thắng. Cách này giữ nguyên toàn bộ nội dung/độ dài lời giải đã thiết kế, chỉ giảm số
lượng phải HIỂN THỊ và THEO DÕI cùng lúc.

---

## 5. Số nước dư tối thiểu (spare moves)

`Lượt dư = Move Limit − Nước lời giải`. Quy tắc chuẩn: **mọi màn nên có ít nhất 2 nước dư**
(cho phép 1-2 nước sai/thử nghiệm mà không thua ngay).

**Ngoại lệ đã ghi nhận** (không tự ý "sửa cho giống"):

- **Lv1**: không đụng vào theo yêu cầu người dùng ở mọi đợt tinh chỉnh — là màn tutorial gốc.
- **Lv46 "Two Shots"**: `moveLimit = 2 = Nước lời giải` → **0 nước dư, có chủ đích**. Đây là
  redesign toàn bộ theo yêu cầu người dùng cho một màn "chính xác tuyệt đối, không có cơ hội
  thứ hai" — mỗi trong 2 nước phải tạo ra 2 cặp ghép cùng lúc. Playtest persona xác nhận đây
  là "cái khó đúng gu" (ngắn, thử lại nhanh, không mất công làm lại cả màn dài) — **không**
  nới thêm nước dư cho màn này dù áp dụng quy tắc "≥2 nước dư" ở nơi khác.
- Các màn từng có 0-1 nước dư nhưng KHÔNG có lý do thiết kế đặc biệt (Lv4, 7, 10, 21, 22, 23,
  18, 35, 37, 39 — số màn đã quy đổi theo lần đổi chỗ Ch2/Ch3 11/09/2026; tại thời điểm sửa
  08/09/2026 các màn này là Lv4, 7, 10, 11, 12, 13, 28, 35, 37, 39) đã được nới lên ≥2 trong đợt
  08/09/2026 — kể cả 2 màn từng tự nhận là "đỉnh khó, zero nước dư" (Lv7, Lv23) trong lịch sử,
  vì playtest thật cho thấy "đỉnh khó" không cần đi kèm "không còn margin cho sai sót" mới đúng
  nghĩa khó.

---

## 6. Mật độ trực quan — tránh "rối mắt"

Quy tắc mới (chốt 08/09/2026, từ phản hồi persona "nữ trung niên": *"vài màn ở giữa game
thấy hơi rối vì nhiều thứ dồn vào ô nhỏ"*). Khi thêm Permanent để tăng điểm độ khó (⑤), **hình
dạng cụm ô bị chặn quan trọng hơn số lượng tuyệt đối**:

- **Ưu tiên**: 1 cụm hình học rõ ràng (một hàng, một cột, một khối vuông) hơn là các ô rải
  rác từng cái một khắp bàn. Người chơi đọc được "à, đây là một bức tường" nhanh hơn nhiều so
  với việc phải dò từng ô đen lẻ tẻ.
- **Khi cần thêm điểm mà không muốn thêm ô bị chặn mới**: nâng cấp 1 ô Permanent đã có trong
  cụm thành **Lock** thay vì thêm Permanent mới cạnh đó. Lock cho `+3` so với Permanent `+2`
  (cùng chiếm 1 ô, điểm cao hơn, lại còn là cơ chế "sống" — có ngưỡng mở — thay vì vĩnh viễn
  chết) → cùng lúc tăng điểm ⑤ nhiều hơn VÀ giảm số ô-đen-tĩnh trên bàn.
- **Ví dụ đã áp dụng**: Lv37, Lv38 (bỏ 1 ô Permanent lẻ phá vỡ hàng/cột thẳng, nâng 1 ô trong
  cụm thành Lock); Lv39 (bỏ 3 ô rải rác xa cụm góc, giữ cụm 3 ô + 1 Lock ở góc).
- Board càng nhỏ (4×4) càng nhạy cảm với quy tắc này — trên 4×4 (16 ô), mỗi ô bị chặn thêm là
  +6.25% diện tích bàn nhìn thấy được, cảm giác chật hẹp tăng rất nhanh so với board 6×6.

---

## 7. Quy trình an toàn khi sửa/thêm màn

Đúc kết từ rất nhiều lỗi thật gặp phải trong quá trình chỉnh 49/50 màn (mọi màn trừ Lv1) qua
nhiều đợt. Đọc kỹ trước khi sửa bất kỳ `winTargets`/`tiles`/`sequence`/`solution` nào:

1. **RAW id vs rendered id**: code luôn dùng raw id (`s1,s2,c1,c2,w1,w2,h1,h2`) trong
   `tiles`/`sequence`/`winTargets` khi viết trong file nguồn. Nhưng đọc `LEVELS[i].winTargets`
   qua `window.__digest24k1` lúc runtime trả về **rendered id đã map** (`s1→s1, c1→c2, w1→w3,
   s2→s4, c2→c5, w2→w6, h1→c8, h2→s7`). Luôn quy đổi ngược trước khi viết vào source.
2. **"Real playtime" ≠ độ dài `solution`**: `levelWon()` được check ngay sau MỌI nước đi, màn
   kết thúc NGAY khi đạt mục tiêu — không đợi hết `solution`. Nhiều màn có nước "chết" phía
   sau điểm thắng thật (chấp nhận được, xem "safety-net pattern" bên dưới), nhưng công thức
   điểm khó (`② Kế hoạch`, `③ Độ chật`) tính theo **toàn bộ `solution.length`**, không theo
   điểm thắng thật — 2 con số này KHÔNG PHẢI LÀ MỘT, đừng nhầm khi đọc điểm.
3. **"Safety-net pattern" — CHỦ Ý, không phải bug**: game cho phép thắng sớm rồi chơi tiếp vài
   nước "vô hại" (không ảnh hưởng gì vì màn đã kết thúc từ trước theo logic thắng-ngay ở mục
   2). Đừng "sửa" hiện tượng `check_win_at` báo `ok:false` (nghĩa là thắng trước nước cuối) —
   đây là thiết kế được chấp nhận, không phải điều cần fix, trừ khi được yêu cầu rõ ràng.
4. **Lỗi "cascade-absorption"**: nếu thêm seed/piece mới dùng CHUNG 1 mặt đã tồn tại ở nơi
   khác trong màn, quân mới có thể bị "hút" vào một cascade match đã có sẵn ở nước đi TRƯỚC
   nước dự kiến, khiến nước dự kiến trở thành vô nghĩa (idCounts không đổi). Quy tắc: **ưu
   tiên một mặt chưa từng dùng trong màn đó** cho seed/piece mới; nếu bắt buộc dùng lại mặt cũ,
   phải kiểm tra kỹ mọi ô liền kề (4 hướng) của seed mới không chạm bất kỳ quân cùng mặt nào
   còn sống ở BẤT KỲ thời điểm nào trước nước dự kiến.
5. **Board đã đầy kín (0 ô trống)**: một số board nhỏ (đặc biệt 4×4 sau nhiều đợt thêm nội
   dung) không còn ô nào chưa từng bị chạm. Không thể thêm seed/piece mới ở đây. Giải pháp
   theo thứ tự ưu tiên: (a) tái sử dụng 1 quân "mồi nhử cùng mặt khác tầng, không match" đã có
   sẵn trong màn bằng cách cho quân mới đáp làm roof liền kề nó; (b) nếu vẫn không đủ chỗ, mở
   rộng board (4×4→5×5) — tọa độ cũ vẫn hợp lệ, chỉ thêm hàng/cột mới cho nội dung mới, không
   đụng vào phần đã thiết kế.
6. **Sequence dạng "cyclic"**: nếu `sequence.length < solution.length` gốc (nghĩa là engine
   lặp lại quân qua modulo `(queueIndex+offset) % sequence.length`), **PHẢI "unroll"** thành
   danh sách tường minh đúng bằng `solution.length` cũ trước khi thêm quân mới vào cuối — nếu
   không, thêm 1 phần tử vào `sequence` sẽ đổi luôn modulo và tráo quân của TẤT CẢ các nước cũ
   đã có sẵn (đã từng gây lỗi thật ở Lv13, Lv20 lúc chỉnh — số màn cũ tại thời điểm gây lỗi là
   Lv23/Lv30, đã đổi số theo lần đổi chỗ Ch2/Ch3 11/09/2026).
7. **[Mới 11/09/2026] Seal giờ đòi hỏi match KỀ SÁT**: mọi seed/piece dùng để mở 1 Seal phải
   được đặt (hoặc dẫn 1 match cascade tới) một ô LIỀN KỀ trực tiếp (không chéo) với ít nhất 1 ô
   trong `level.seals` — không còn tính nếu match xảy ra ở nơi khác trên bàn, dù cùng đủ N mặt
   khác nhau. Khi thêm màn Seal mới hoặc di chuyển vị trí Seal, luôn kiểm tra bằng
   `model.sealAdjacentCounts` (không phải `model.idCounts`/`S.targetCounts` — 2 bộ đếm này giờ
   tách biệt) sau khi replay `solution`, và xác nhận `model.sealOpen === true` ở cuối — riêng
   `selfTest().ok===true` (mục 8 dưới) KHÔNG đủ để bắt lỗi này, vì 1 màn có thể `ok:true` (goal
   khác vẫn đạt) trong khi Seal của nó không bao giờ thật sự mở.
8. **Sau mỗi thay đổi, luôn xác nhận**: `selfTest()` (`window.__digest24k1.selfTest()`, phải
   `ok:true` — check toàn bộ 50 màn cùng lúc, không chỉ màn vừa sửa, bao gồm cả check
   `every_seal_level_opens_in_its_own_solution` mới) + trace lại đúng `solution` bằng
   `debug.freshModel`/`debug.modelDrop` để chắc điểm thắng thật đúng như dự tính, không lệch đi
   vì hiệu ứng dây chuyền không lường trước.

---

## 8. Công cụ hỗ trợ (không nằm trong repo)

Các script Playwright/Node dưới đây được viết lại theo nhu cầu mỗi phiên làm việc (không
commit vào repo, sống trong thư mục scratchpad của agent) — nếu cần lặp lại 1 tác vụ, viết lại
theo mô tả sau thay vì tìm file cũ:

- **Trích xuất dữ liệu 1 hoặc nhiều màn**: mở `index.html?genTest=0&unlockAll=1` bằng
  Playwright, đọc `window.__digest24k1.LEVELS[i]`, tính `neverTouched` (ô chưa từng bị chạm
  bởi seed/move nào — an toàn để đặt seed MỚI) và `freeAtEndButTouched` (ô từng bị chạm nhưng
  trống lúc kết thúc solution gốc — chỉ an toàn cho quân MỚI đáp xuống, không phải seed).
- **Kiểm tra điểm thắng thật**: replay từng nước bằng `debug.freshModel(idx)` +
  `debug.modelDrop(model,row,col)`, check điều kiện thắng (theo `goalType`) sau mỗi nước, so
  với `solution.length` — lệch nghĩa là có nước "chết" phía sau (safety-net, xem §7.3).
- **Cập nhật Beatchart.xlsx**: đọc toàn bộ `LEVELS` → tính 7 thành phần (§3) → dùng `exceljs`
  ghi lại sheet "Level Difficulty" + ngưỡng tứ phân vị trong "Công thức" → dựng lại ảnh biểu đồ
  (SVG render qua Playwright, cùng style cột-theo-chương) → dùng `jszip` thay trực tiếp
  `xl/media/image1.png` bên trong file `.xlsx` (KHÔNG dùng `Compress-Archive`/zip tool chung
  chung để đóng gói lại toàn bộ file — làm hỏng cấu trúc OOXML, `exceljs` sẽ không đọc lại
  được; chỉ thay đúng 1 file ảnh bên trong archive đã có sẵn).

---

## 9. Tài liệu liên quan

- `puzzle-design-6-muc-tieu 1.md` — triết lý gốc (6 pillar/bổ sung), đặc biệt §3 (trục độ khó)
  và §4 (aesthetic/thẩm mỹ ASMR) là nền tảng cho mọi quy tắc ở tài liệu này.
- `Final Outputs/GAME_DESIGN_DOCUMENT.md` — tài liệu nguồn cho cơ chế/gameplay/kiến trúc kỹ
  thuật hiện hành (thay thế `07-GDD-TONG-HOP-TU-INDEX.md` cũ, đã xoá khỏi repo); đọc trước nếu
  chưa quen Core Loop, các Goal Type, hay luật Seal kề-sát mới (mục 4 của file đó).
- `PLAYTEST-AUDIT-50-LEVELS.md` — nhật ký lịch sử từng đợt cân bằng (trước đợt giới hạn số
  loại mahjong này); dùng để tra "tại sao màn X lại như vậy" khi cần biết bối cảnh cũ. Lưu ý:
  số màn trong tài liệu này viết TRƯỚC lần đổi chỗ Ch2/Ch3 (11/09/2026) — Lv11-30 nhắc tới
  trong đó có thể chỉ nội dung nay đã đổi chỗ, quy đổi bằng ±10 tương ứng chiều di chuyển.
- `Final Outputs/Mahjong_x_Block_Beatchart.xlsx` — số liệu sống, luôn là nguồn số chính xác nhất
  tại bất kỳ thời điểm nào (tài liệu này chỉ trích một vài con số làm ví dụ, có thể lệch so
  với xlsx nếu có màn được sửa sau ngày cập nhật ở đầu tài liệu).

*Nguồn: `Final Outputs/index.html` (`P24M_LEVELS` qua `window.__digest24k1`) +
`Final Outputs/Mahjong_x_Block_Beatchart.xlsx`, đối chiếu 2 vòng playtest feedback thật (08/09/2026)
+ đợt đổi luật Seal/đổi chỗ Ch2·Ch3 theo yêu cầu người dùng (11/09/2026).*

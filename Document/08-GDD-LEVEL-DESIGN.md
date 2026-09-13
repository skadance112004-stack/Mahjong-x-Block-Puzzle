# GDD — Level Design (50 màn, Final Core)

*Nguồn duy nhất: `Final Outputs/index.html` (`P24M_LEVELS`, đọc trực tiếp qua
`window.__digest24k1` lúc runtime) + `Final Outputs/Mahjong_x_Block_Beatchart.xlsx` (dữ liệu THÔ
từng màn, đọc lại từ chính `index.html`, không suy diễn). Tài liệu này **không** lặp lại nội dung
cơ chế/gameplay đã có ở `Final Outputs/GAME_DESIGN_DOCUMENT.md` (đọc file đó trước nếu cần hiểu
Core Loop, Goal Type, Blocker) — đây là tài liệu **chuyên về thiết kế màn**: cấu trúc độ khó, các
quy tắc tác giả hoá đã đúc kết qua nhiều đợt playtest/feedback thật, và quy trình an toàn khi
sửa/thêm màn. Khi tài liệu này mâu thuẫn với `04-GDD-FINAL-CORE-MASTER.md` thì tài liệu này và
`GAME_DESIGN_DOCUMENT.md` thắng.*

*Cập nhật lần cuối: 13/09/2026 — rà soát toàn bộ theo yêu cầu người dùng ("cả 50 màn đã xong,
cập nhật GDD chi tiết nhất"), đối chiếu lại 100% với `window.__digest24k1.LEVELS` sống, không
dùng số liệu cũ từ bản 11-12/09. Thay đổi lớn nhất so với bản trước:*

- *`Beatchart.xlsx` được viết lại HOÀN TOÀN theo yêu cầu người dùng: chỉ còn **1 sheet duy nhất
  "Level Data"**, chứa dữ liệu THÔ từng màn (goal, mechanic, move limit, số nước, số khối...),
  **không còn** sheet "Đường cong độ khó" (biểu đồ), "Công thức" (điểm khó 7 thành phần + tứ
  phân vị), hay "Economy" (Xu/Booster). Mọi cross-reference tới 3 sheet đó trong bản cũ đã được
  gỡ hoặc thay bằng số liệu thô tương đương ở tài liệu này.*
- *Rất nhiều màn 30-50 đã được thiết kế lại nhiều lần (bởi cả AI lẫn người dùng, có lúc song
  song) kể từ bản 12/09: thứ tự dạy Ô Chắn/Seal/Lock giữ nguyên (Lv11/21/31), nhưng phân bố
  goalType, số màn dùng mỗi cơ chế, và độ khó tuyệt đối từng chương đã đổi khác nhiều so với mọi
  bản trước — xem §1 và §3 cho số liệu mới nhất.*
- ***Cập nhật cùng ngày, sau đợt trên***: 3 màn từng CHƯA XONG (Lv40, Lv42, Lv46) đã được vá và
  verify lại — xem hộp cập nhật cuối §1 và cột "Trạng thái" trong `Beatchart.xlsx` (nay 50/50
  "OK"). `selfTest().ok` đã trở lại `true` (33/33 check).*

---

## 1. Cấu trúc tổng thể

50 màn chia **5 chương × 10 màn**, ranh giới chương chỉ mang tính hiển thị ở màn chọn cấp (không
gate nội dung). Thứ tự dạy cơ chế theo đúng dữ liệu sống hiện tại — **mỗi cơ chế mới vẫn xuất
hiện lần đầu ở đúng đầu chương của nó, không sớm hơn**:

| Chương | Tên | Màn | Vai trò |
|---|---|---|---|
| C1 | Nền tảng | 1–10 | Core loop: đặt, Match, che–lộ 2 tầng. Không có Ô Chắn/Seal/Lock nào. |
| C2 | Ô Chắn | 11–20 | Ô Chắn (Permanent) xuất hiện lần đầu ở Lv11, dùng xuyên suốt 10/10 màn. |
| C3 | Phong Ấn | 21–30 | Seal xuất hiện lần đầu ở Lv21. Lv21/22 là 2 màn `OPEN_SEAL` duy nhất còn lại trong toàn game. |
| C4 | Kết hợp | 31–40 | Lock xuất hiện lần đầu ở Lv31. Từ đây cả 3 cơ chế bắt đầu xuất hiện chung trong cùng 1 màn. |
| C5 | Mastery | 41–50 | Board lớn nhất game (đa số 6×6), mật độ Ô Chắn/Seal/Lock dày nhất, màn chốt hạ. |

**Phân bố loại mục tiêu (Goal Type)** — tính lại trực tiếp từ `window.__digest24k1.LEVELS`
ngày 13/09/2026 (đã đổi RẤT NHIỀU so với mọi bản trước — không còn đúng "TARGET_FACE là loại chủ
đạo áp đảo" như các bản cũ, dù vẫn là loại nhiều màn nhất):

| Goal Type | Số màn | Danh sách màn | Ý nghĩa |
|---|---|---|---|
| `TILE_QUOTA` | 12 | 1,2,3,4,5,17,31,34,37,43,44,48 | Ghép đủ N quân bất kỳ mặt nào |
| `TARGET_FACE` | 29 | (còn lại, xem `Beatchart.xlsx`) | Ghép đủ N của (các) mặt cụ thể |
| `BURIED_TARGET` | 7 | 20,29,32,38,45,49,50 | Phải phá roof che trước mới chạm được mặt bị chôn bên dưới |
| `OPEN_SEAL` | 2 | 21,22 | Thắng khi tất cả Seal của màn đã mở (đếm tổng số cặp khắp bàn) |

> **Thay đổi lớn cần lưu ý**: `OPEN_SEAL` giảm từ 6 màn (bản 12/09) xuống còn đúng **2** (Lv21,
> Lv22 — 2 màn dạy Seal đầu tiên của Ch3). Các màn từng là `OPEN_SEAL` (31 "Seal and Stone", 34
> "Three Keys", 43 "Triple Seal", 48 "Two Seals" — số cũ, đã đổi tên/nội dung) phần lớn đã được
> thiết kế lại thành `TILE_QUOTA` hoặc giữ tên "Two Seals" (Lv48) nhưng khác nội dung. Không suy
> diễn thêm lý do — đây là kết quả của nhiều đợt chỉnh sửa độc lập, xem `Beatchart.xlsx` để biết
> chi tiết từng màn hiện tại.

**Phân bố cơ chế chặn/khoá** (một màn có thể dùng nhiều hơn 1 loại cùng lúc):

| Cơ chế | Số màn dùng | Màn sớm nhất | Số màn kết hợp CẢ 3 cơ chế cùng lúc |
|---|---|---|---|
| Ô Chắn (Permanent) | 31 | Lv11 | |
| Seal (Niêm phong) | 24 | Lv21 | 13 màn: 33, 38, 39, 40, 41, 42, 44, 45, 46, 47, 48, 49, 50 |
| Lock (Khoá) | 19 | Lv31 | (bảng bên trái) |

**[Thử nghiệm, hiện KHÔNG dùng ở màn nào]** Engine hỗ trợ sẵn **Khóa 2 giai đoạn** (field
`lock.after: {face, required}` — Lock chỉ thật sự mở khi CẢ điều kiện của riêng nó VÀ 1 điều
kiện tiền đề đều đạt, không chỉ dựa vào số lượng như hiện tại). Đây là cải tiến được đề xuất và
cài đặt vào engine (`p24kLockMet()`, xem `GAME_DESIGN_DOCUMENT.md`) để tách biệt Lock khỏi Seal
bằng một trục THỨ TỰ mà Seal (đếm tổng số cặp, không quan tâm thứ tự) không có. Từng được áp
dụng thử ở Lv33/Lv35 nhưng đã bị ghi đè khi 2 màn đó được thiết kế lại sau đó — **không màn nào
trong 50 màn hiện tại dùng `lock.after`**. Cơ chế vẫn sẵn sàng dùng lại bất kỳ lúc nào (backward
compatible 100% — Lock không có `after` hoạt động y hệt như trước).

> ✅ **3 màn từng CHƯA XONG nay đã vá xong (13/09/2026, cùng ngày)**:
> - **Lv40 "Chapter 4 Review"**: `solution` từng rỗng (0 nước). Dò lại qua engine thật
>   (`debug.freshModel`/`debug.modelDrop`): mấu chốt là move 1 phải đưa `c2` khớp cặp với hạt
>   giống `c2@(4,4)` trước — đó là cách DUY NHẤT đạt required=2 của Khóa, và 2 ô Khóa
>   ((2,1)/(2,3)) lại chính là 2 hàng xóm KHÔNG-permanent duy nhất của ô hạt giống `w1`, nên
>   `w1` không thể ghép được nếu chưa mở Khóa trước. Solution mới: 4 nước, `moveLimit` giữ
>   nguyên 11 (không đổi thiết kế gốc, chỉ bổ khuyết phần thiếu).
> - **Lv42 "Squeezed"**: `sequence` từng rỗng, khiến engine rút quân NGẪU NHIÊN từ `queuePool`
>   thay vì theo `solution` cố định (không phải "ra ngoài biên" như ghi nhận ban đầu — đó là
>   hệ quả của việc rút nhầm quân ngẫu nhiên, không phải lỗi toạ độ thật). Đã khôi phục
>   `sequence` để mirror đúng `queuePool` (cùng khuôn mẫu Lv37/Lv47: `queuePool` cho rút ngẫu
>   nhiên lúc chơi thật, `sequence` cố định cho solver/self-test) — `solution` 10 nước gốc chạy
>   đúng ngay khi `sequence` được khôi phục, không cần đổi gì khác.
> - **Lv46 "Two Shots"**: goal gốc cần `c1:4` nhưng bàn chỉ có ĐÚNG 1 hạt giống `c1`, và tìm
>   kiếm vét cạn (tới 30 nước) xác nhận không có đường nào tạo cặp `c1` thứ 2 trong giới hạn
>   nước đi hiện tại — hạ xuống `c1:2`, khớp đúng tên màn "Two Shots" / lesson "still no second
>   chance". `h1:4` và `s1:4` giữ nguyên, đã đạt được.
>
> `selfTest().ok` nay là `true` (33/33 check xanh, bao gồm `all_solutions` và
> `every_seal_level_opens_in_its_own_solution`). Cột "Trạng thái" trong `Beatchart.xlsx` đã
> cập nhật, 50/50 màn "OK — solution replay đúng, đạt goal."

---

## 2. Nguyên tắc đường cong độ khó

Áp dụng trực tiếp §3 của `puzzle-design-6-muc-tieu 1.md` (lý thuyết trục độ khó):

- **Trục thô (qualitative)**: cơ chế mới luôn giới thiệu ở **màn dễ, đơn lẻ** trước khi bị trộn
  với cơ chế khác — Ô Chắn ở Lv11 (đơn lẻ), Seal ở Lv21 (đơn lẻ, 2 màn `OPEN_SEAL` liên tiếp),
  Lock ở Lv31 (ngay lập tức kết hợp với 2 cơ chế kia — Ch4 mang tên "Kết hợp" đúng nghĩa: không
  có màn nào chỉ giới thiệu Lock một mình).
- **Trục tinh (quantitative)**: số nước, số mặt quân, `need` của từng mục tiêu, cỡ bàn, số khối
  lớn nhất trong hàng đợi. Dùng để tinh chỉnh độ khó *sau khi* cơ chế đã quen.
- **Không tăng đều một mạch (sawtooth)**: mỗi chương nên có nhịp "khó dần rồi thả một màn dễ"
  (breather level) thay vì tăng tuyến tính — xem `Beatchart.xlsx` cột "Số nước lời giải"/"Lượt
  dư" để xác định vị trí breather hiện tại của từng chương (đã đổi vị trí nhiều lần qua các đợt
  chỉnh sửa, không còn cố định ở Lv25/Lv32 như bản cũ).
- **Sàn độ khó nên tăng dần theo chương** — quy tắc **định hướng**, không còn là quy tắc cứng
  100% kể từ khi bỏ điểm-khó-tổng-hợp (xem §3): vì không còn 1 con số duy nhất đại diện cho "độ
  khó" mỗi màn, việc so sánh chương-với-chương giờ dựa trên NHIỀU chỉ số thô song song (cỡ bàn,
  số nước, số cơ chế kết hợp) thay vì 1 điểm tổng — xem bảng ở §3.

---

## 3. Số liệu độ khó thô theo chương

**[Đổi 13/09/2026]** Bản trước dùng 1 công thức 7 thành phần cộng có trọng số ra 1 điểm khó duy
nhất mỗi màn, lưu trong sheet "Level Difficulty" + "Công thức" của `Beatchart.xlsx`. Theo yêu
cầu người dùng, `Beatchart.xlsx` giờ **chỉ chứa dữ liệu thô**, không tính điểm tổng hợp nữa —
mục này thay bằng số liệu TRUNG BÌNH thô theo chương (tính trực tiếp từ `Beatchart.xlsx`/
`window.__digest24k1.LEVELS`, không suy diễn):

| Chương | Cỡ bàn TB | Số nước lời giải TB | Move Limit TB |
|---|---|---|---|
| C1 Nền tảng | 4.2 | 5.5 | 7.1 |
| C2 Ô Chắn | 5.6 | 8.5 | 14.0 |
| C3 Phong Ấn | 5.6 | 7.3 | 10.1 |
| C4 Kết hợp | 5.2 | 7.7 | 11.4 |
| C5 Mastery | 5.9 | 10.4 | 12.6 |

**Đọc bảng này thế nào**: cỡ bàn và số nước lời giải tăng dần khá rõ từ C1→C5 (đúng hướng thiết
kế). Move Limit TB không đơn điệu (C2 cao nhất, 14.0) — đây là hệ quả trực tiếp của việc C2 có
`spare` (lượt dư) rộng rãi hơn các chương khác theo chủ đích thiết kế ("Ô Chắn dạy nhẹ nhàng"),
**không phải dấu hiệu C2 "dễ hơn"** — số nước lời giải TB của C2 (8.5) vẫn cao hơn C1 (5.5) và
C3/C4 (7.3/7.7), chỉ thấp hơn C5 (10.4). Không còn 1 điểm số tổng hợp để xếp hạng "màn nào khó
nhất" một cách khách quan tuyệt đối nữa — muốn so sánh 2 màn cụ thể, đọc trực tiếp nhiều cột
trong `Beatchart.xlsx` (cỡ bàn, số nước, lượt dư, số cơ chế, khối lớn nhất) thay vì 1 con số.

**Phân bố cỡ bàn toàn game**: 2×2×1, 3×3×1, 4×4×7, 5×5×14, 6×6×27. Hơn một nửa số màn (27/50)
đã là 6×6 — bao gồm toàn bộ C5 gần như 100% và phần lớn C4 (do các đợt "tăng mật độ" và "kết hợp
3 cơ chế" gần đây đều mở rộng board để có chỗ thêm nội dung thay vì nén vào board cũ).

**Phân bố khối lớn nhất trong hàng đợi**: domino (2 ô) — 14 màn; tromino (3 ô) — 23 màn;
tetromino (4 ô) — 7 màn; pentomino (5 ô) — 5 màn. Đa dạng hình khối đã được chủ động thêm vào
nhiều màn Chương 5 (46-50) theo yêu cầu người dùng — không còn tình trạng "toàn domino" như các
bản thiết kế rất sớm.

---

## 4. Giới hạn số loại mahjong tối đa mỗi màn

**Quy tắc (chốt 08/09/2026, theo phản hồi playtest thật)**: số **loại mặt quân được liệt kê
làm mục tiêu** (`winTargets.length`, áp dụng cho `TARGET_FACE` và `BURIED_TARGET`) không được
vượt:

- **Tối đa 4 loại** nếu màn KHÔNG kết hợp Seal/Permanent/Lock nào khác.
- **Tối đa 3 loại** nếu màn CÓ kết hợp ít nhất 1 trong 3 cơ chế trên.

**Lý do**: thanh mục tiêu (goal-strip) hiển thị 1 chip riêng cho mỗi mặt quân + 1 chip cho
Seal/Lock nếu có. Quá 4-5 chip trên màn hình điện thoại hẹp làm chữ số bị bé, khó phân biệt
loại mặt — người chơi thật (playtest theo 2 persona: nam trung niên và nữ trung niên) đều phản
hồi "quá nhiều loại phải nhớ cùng lúc" là điểm trừ rõ rệt.

**Không phải target thì vẫn được giữ lại làm nội dung "trang trí"**: khi một mặt bị loại khỏi
`winTargets` do vượt giới hạn, KHÔNG xoá tile/sequence/move đã tạo ra nó — chỉ xoá khỏi mảng
`winTargets`. Quân đó vẫn được đặt và ghép bình thường trên bàn, chỉ là không được đếm vào
điều kiện thắng.

---

## 5. Số nước dư tối thiểu (spare moves)

`Lượt dư = Move Limit − Nước lời giải`. Quy tắc chuẩn: **mọi màn nên có ít nhất 2 nước dư**.

**Tình trạng thực tế (13/09/2026)** — đã đổi khá nhiều so với mọi bản trước, đọc trực tiếp từ
`Beatchart.xlsx`:

- **Lv1**: không đụng vào — màn tutorial gốc, quy tắc không áp dụng.
- **Lv4, Lv43, Lv45**: `0 lượt dư` (moveLimit = số nước lời giải chính xác). Không có ghi chú
  thiết kế đặc biệt nào cho 3 màn này trong dữ liệu hiện tại — khác với Lv46 ở các bản tài liệu
  trước (từng là "0 lượt dư CÓ CHỦ ĐÍCH" nổi tiếng của game), **Lv46 hiện KHÔNG còn ở trạng thái
  0 lượt dư** — sau khi vá lỗi (§1), solution xác nhận 8 nước / moveLimit 14 = **6 lượt dư**,
  khá rộng rãi so với phần còn lại của C5.
- **Lv2, 3, 12, 18, 22, 23, 29, 32, 39, 48, 49**: `1 lượt dư`. Không có exception note nào ghi
  nhận các màn này là "có chủ đích" trong dữ liệu — nên coi đây là ứng viên cần rà lại nếu muốn
  áp dụng nghiêm quy tắc "≥2" trong 1 đợt cân bằng sau này.

> **Khuyến nghị cho game designer đọc tài liệu này**: danh sách "0-1 lượt dư" ở trên khá dài
> (14/50 màn) so với các bản tài liệu trước (từng chỉ có 1-2 ngoại lệ có chủ đích). Đây là dấu
> hiệu cho thấy nhiều đợt chỉnh sửa độc lập gần đây (tăng độ khó Lv30-50, tăng mật độ cơ chế,
> thêm đa dạng hình khối) đã làm hẹp lượt dư ở khá nhiều màn mà không có ghi chú thiết kế đi
> kèm — nên rà lại có chủ đích trong đợt cân bằng tiếp theo, thay vì giả định tất cả đều "được
> thiết kế đúng như vậy".

---

## 6. Mật độ trực quan — tránh "rối mắt"

Quy tắc (chốt 08/09/2026, từ phản hồi persona "nữ trung niên"). Khi thêm Permanent để tăng độ
khó, **hình dạng cụm ô bị chặn quan trọng hơn số lượng tuyệt đối**:

- **Ưu tiên**: 1 cụm hình học rõ ràng (một hàng, một cột, một khối vuông) hơn là các ô rải rác
  từng cái một khắp bàn.
- **Khi cần thêm mà không muốn thêm ô bị chặn mới**: nâng cấp 1 ô Permanent đã có trong cụm
  thành **Lock** thay vì thêm Permanent mới cạnh đó — cùng chiếm 1 ô nhưng Lock là cơ chế "sống"
  (có ngưỡng mở) thay vì vĩnh viễn chết.
- Board càng nhỏ (4×4) càng nhạy cảm với quy tắc này — mỗi ô bị chặn thêm là +6.25% diện tích
  bàn nhìn thấy được.

---

## 7. Quy trình an toàn khi sửa/thêm màn

Đúc kết từ rất nhiều lỗi thật gặp phải khi chỉnh màn qua nhiều đợt. Đọc kỹ trước khi sửa bất kỳ
`winTargets`/`tiles`/`sequence`/`solution` nào:

1. **RAW id vs rendered id**: code luôn dùng raw id (`s1,s2,c1,c2,w1,w2,h1,h2`) trong
   `tiles`/`sequence`/`winTargets`/`locks[].face`/`locks[].after.face` khi viết trong file
   nguồn. Đọc `LEVELS[i]` qua `window.__digest24k1` lúc runtime trả về **rendered id đã map**
   (`s1→s1, c1→c2, w1→w3, s2→s4, c2→c5, w2→w6, h1→c8, h2→s7`). Luôn quy đổi ngược trước khi
   viết vào source.
2. **"Real playtime" ≠ độ dài `solution`**: `levelWon()` được check ngay sau MỌI nước đi, màn
   kết thúc NGAY khi đạt mục tiêu — không đợi hết `solution`. Nhiều màn có nước "chết" phía sau
   điểm thắng thật (safety-net pattern, mục 3 dưới) — chấp nhận được, không phải bug.
3. **"Safety-net pattern" — CHỦ Ý, không phải bug**: game cho phép thắng sớm rồi chơi tiếp vài
   nước "vô hại". Đừng "sửa" hiện tượng thắng trước nước cuối cùng của `solution` — đây là thiết
   kế được chấp nhận.
4. **Lỗi "cascade-absorption"**: nếu thêm seed/piece mới dùng CHUNG 1 mặt đã tồn tại ở nơi khác
   trong màn, quân mới có thể bị "hút" vào một cascade match đã có sẵn ở nước đi TRƯỚC nước dự
   kiến. Ưu tiên một mặt CHƯA từng dùng trong màn đó cho seed/piece mới.
5. **Board đã đầy kín (0 ô trống)**: kiểm tra bằng cách replay `solution` qua
   `debug.freshModel`/`debug.modelDrop` và ghi lại mọi ô từng bị chạm (kể cả tạm thời) — chỉ ô
   KHÔNG nằm trong danh sách đó mới thật sự an toàn để đặt seed mới. Nếu không còn ô nào, mở
   rộng board (VD 4×4→5×5) — tọa độ cũ vẫn hợp lệ nguyên vẹn, chỉ thêm hàng/cột mới.
6. **Sequence dạng "cyclic"**: nếu `sequence.length < solution.length`, engine lặp lại quân qua
   modulo `(queueIndex+offset) % sequence.length`. Phải "unroll" thành danh sách tường minh
   trước khi thêm quân mới vào cuối, nếu không sẽ tráo quân của TẤT CẢ các nước cũ.
7. **Luật Seal hiện hành**: Seal đếm **TỔNG SỐ CẶP đã ghép khắp bàn** (`S.pairs`/`model.pairs`),
   không cần khác mặt, không cần kề sát ô Seal. `level.seals` là mảng bộ ba `[r, c, required]` —
   mỗi ô Seal có ngưỡng riêng, mở ở các mốc khác nhau của cùng 1 bộ đếm `pairs` chung. Thiếu phần
   tử thứ 3 mặc định `required = 1`. Sau khi thêm/sửa Seal, luôn xác nhận bằng
   `p24kSealsAllOpen(level, model.pairs) === true` sau khi replay `solution` — `selfTest().ok`
   không đủ để bắt lỗi Seal không thật sự mở.
8. **Lock 2 giai đoạn (`lock.after`)**: nếu dùng, nhớ quy đổi RAW id cho `after.face` giống như
   `face` (mục 1) — pipeline remap đã xử lý cả hai, nhưng dễ quên khi viết tay. Hiện không màn
   nào trong 50 màn dùng field này (xem §1).
9. **Sau mỗi thay đổi, luôn xác nhận**: `window.__digest24k1.selfTest().ok === true` (check
   TOÀN BỘ 50 màn cùng lúc, không chỉ màn vừa sửa) + trace lại `solution` bằng
   `debug.freshModel`/`debug.modelDrop` để chắc điểm thắng thật đúng như dự tính. **Tại thời
   điểm viết tài liệu này (13/09/2026, sau khi vá Lv40/42/46), `selfTest().ok === true` (33/33
   check) và `check_all_solutions` xác nhận cả 50/50 màn đều `runSolution` thành công** — xem §1.

---

## 8. Công cụ hỗ trợ (không nằm trong repo)

Các script Playwright/Node dưới đây được viết lại theo nhu cầu mỗi phiên làm việc (không commit
vào repo) — nếu cần lặp lại 1 tác vụ, viết lại theo mô tả sau:

- **Trích xuất dữ liệu 1 hoặc nhiều màn**: mở `index.html?genTest=0&unlockAll=1` bằng Playwright,
  đọc `window.__digest24k1.LEVELS[i]`, tính ô "chưa từng bị chạm" (an toàn đặt seed mới) qua
  `debug.freshModel`/`debug.modelDrop`.
- **Kiểm tra điểm thắng thật**: replay từng nước, check điều kiện thắng theo `goalType` sau mỗi
  nước, so với `solution.length` — lệch nghĩa là có nước "chết" phía sau (safety-net, §7.3).
- **Cập nhật `Beatchart.xlsx`** *(đơn giản hoá 13/09/2026)*: đọc toàn bộ `LEVELS` qua
  `window.__digest24k1`, dùng `exceljs` ghi ra ĐÚNG 1 sheet "Level Data" với dữ liệu thô mỗi màn
  (cỡ bàn, goalType, goal detail, moveLimit, số nước, lượt dư, số khối, khối lớn nhất, số mặt
  khác nhau, số Ô Chắn/Seal/Lock + chi tiết, có/không Random Queue Pool, cột "Trạng thái" ghi rõ
  màn nào đang lỗi/chưa xong). **Không còn** bước tính điểm khó 7 thành phần, không còn dựng lại
  ảnh biểu đồ SVG, không còn sheet Economy — các bước đó đã bị bỏ theo yêu cầu người dùng.

---

## 9. Tài liệu liên quan

- `puzzle-design-6-muc-tieu 1.md` — triết lý gốc (6 pillar/bổ sung), đặc biệt §3 (trục độ khó)
  và §4 (aesthetic/thẩm mỹ ASMR) là nền tảng cho mọi quy tắc ở tài liệu này.
- `Final Outputs/GAME_DESIGN_DOCUMENT.md` — tài liệu nguồn cho cơ chế/gameplay/kiến trúc kỹ
  thuật hiện hành; đọc trước nếu chưa quen Core Loop, các Goal Type, luật Seal/Lock hiện tại.
- `PLAYTEST-AUDIT-50-LEVELS.md` — nhật ký lịch sử từng đợt cân bằng cũ; số màn trong đó có thể
  không khớp bố cục hiện tại do nhiều lần đổi chỗ/thiết kế lại từ đó tới nay.
- `Final Outputs/Mahjong_x_Block_Beatchart.xlsx` — **[Đổi 13/09/2026]** giờ chỉ còn **1 sheet
  "Level Data"** chứa dữ liệu thô từng màn (không còn biểu đồ, không còn công thức điểm khó,
  không còn Economy, không còn cột tên màn) — đây luôn là nguồn số chính xác nhất tại bất kỳ
  thời điểm nào; tài liệu này chỉ trích một vài con số làm ví dụ.

*Nguồn: `Final Outputs/index.html` (`P24M_LEVELS` qua `window.__digest24k1`) +
`Final Outputs/Mahjong_x_Block_Beatchart.xlsx`, đối chiếu trực tiếp ngày 13/09/2026 — không dùng
lại số liệu suy diễn từ các bản tài liệu trước.*

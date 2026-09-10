# Nhật ký Prototype — Mahjong × Block

Ghi lại toàn bộ các bản HTML trong `mahjong-block-blast-prototypes/` và lý do mỗi thay đổi xảy ra, theo đúng thứ tự đã làm. **Không bao gồm** phần dựng project Unity, port C#, hay kết nối Unity-MCP — theo yêu cầu, tài liệu này chỉ nói về các prototype HTML.

Mọi bản từ #11 trở đi đều tự kiểm chứng bằng 1 khối `selftest` nhúng sẵn trong file (chạy qua `node --check` + một DOM-stub headless, in ra `[selftest] OK (n checks)` trong console) — không phải playtest thật bằng tay. Trạng thái "đã verify" trong tài liệu này luôn có nghĩa là *logic lõi đúng theo tự mô tả*, không phải *đã chơi thử và thấy hay*.

---

## 0. Trước phiên làm việc này (ngoài phạm vi chi tiết)

Thư mục đã có sẵn 10 bản (01–10) từ trước, không thuộc các quyết định ghi trong tài liệu này — chỉ liệt kê tên để biết bối cảnh:

| # | Tên | Ý tưởng |
|---|---|---|
| 01 | Mahjong Block Blast | Đặt khối, đóng đường, tạo bộ ba và sảnh |
| 01C | Color Match Levels | Biến thể theo màu |
| 02 | Mahjong Collapse | Khối rơi + chain reaction do trọng lực |
| 03 | Hand Builder | Mục tiêu sưu tập — phá đúng quân để hoàn thành "tay bài" |
| 04 | Mahjong Towers | Bóc lớp đá tìm ngọc ẩn |
| 05 | Mahjong Battle | Combat — clear để tấn công, tạo khiên, kỹ năng |
| 06 | Mahjong Roguelike | 3 phòng, Relic cộng dồn |
| 07 (2 bản) | Mahjong Block/Gravity Stack | Biến thể trọng lực sớm |
| 08 | Mahjong Block 3-Layer 5×5 | Bàn 3 tầng |
| 09 | Mahjong Meld-Only 3-Layer | Bàn 3 tầng, chỉ tính bộ (không sảnh) |
| 10 | Layer Focus Tabs | Luật "lộ diện" theo tầng (nguồn cho khái niệm Layer) |

Asset `deck_mahjong_light_1.png` / `mahjong-tiles-light/*.png` cũng đã được cắt và verify (47 file) trước khi phiên này bắt đầu.

---

## 1. Nền tảng — Prototype 11: *Khay Tiêu Hóa*

File: `11-khay-tieu-hoa.html` · **6 checks OK**

Bản gốc mà toàn bộ phiên làm việc xoay quanh, và cũng là bản đã được port sang C#/Unity (phần đó nằm ngoài phạm vi tài liệu này).

**Hook**: đóng hàng (kiểu Block Blast) **không** làm quân bốc hơi — quân bay vào một **Khay** chờ (giới hạn số ô). Trong khay, 3 quân giống nhau (Phỗng) hoặc 3 quân liên tiếp cùng chất (Sảnh) tự nổ. Khay tràn = thua ngay. Câu hỏi lõi: *"Có nên đóng hàng này không, nếu khay không tiêu hóa kịp?"*

Cơ chế khác đi kèm: bàn có `simulate()` dự báo trước khi đặt (số quân sẽ vào khay, nổ mấy bộ, dư mấy — hiển thị ngay trên UI); `needIds()`/`rig` để piece-generation thiên vị theo nhu cầu khay (giúp màn luôn giải được, không phải may rủi); 2 công cụ Đổi khối / Xả quân; 8 màn dạy tăng dần độ khó (số chất, số hạng, honor tiles, cỡ khay).

---

## 2. Mượn cơ chế từ boardgame cổ điển (12–19)

Yêu cầu: 5 ý tưởng hybrid **khác biệt thật sự**, không bó buộc luật mahjong chuẩn, không lấy Block Blast làm gốc so sánh. Sau đó mở rộng thêm bằng cách mượn trực tiếp cơ chế từ các boardgame casual classic (Rummikub, Othello, Connect Four…), chỉ lấy đúng 1 hook mỗi bản, không lấy nguyên luật gốc.

| # | Tên file | Tên hiển thị | Mượn từ | Hook | Test |
|---|---|---|---|---|---|
| 12 | `12-slide-collide.html` | Trượt Va Chạm | 2048/Threes | Vuốt để trượt quân theo 1 hướng; quân giống nhau va vào nhau thì **hủy** (không hợp nhất như 2048) | 4 |
| 13 | `13-stack-columns.html` | Cột Chồng | — | Quân rơi vào cột như ống nghiệm, chạm đỉnh cột để so khớp 2 cột | 4 |
| 14 | `14-merge-ladder.html` | Leo Chuỗi | — | Kéo-hợp quân thành chuỗi tăng dần; có khay Hoa thu hoạch theo lượt (cooldown) | 7 |
| 15 | `15-fit-the-pair.html` | Domino Ghép Hình | Domino | Đặt hình domino 2 ô; khớp được với hàng xóm (không phải tự thân) mới nổ | 6 |
| 16 | `16-conveyor-connect.html` | Băng Chuyền | Mahjong Connect | Băng chuyền đẩy quân ngang; nối 2 quân giống nhau qua đường ≤2 khúc cua (đúng luật Mahjong Connect cổ điển) | 6 |
| 17 | `17-extend-the-meld.html` | Nối Dài Bộ | Rummikub | Bộ đã ghép trên bàn **không biến mất ngay** — có thể nối dài thêm bằng quân mới đặt sát đầu mở, tới độ dài tối đa mới tự nổ | 6 |
| 18 | `18-flip-convert.html` | Lật Chuyển | Othello/Reversi | Mỗi quân thuộc 1 trong 2 phe; đặt quân kẹp 1 dãy quân khác phe (có quân cùng phe chặn đầu kia) sẽ lật đổi phe cả dãy | 7 |
| 19 | `19-drop-four.html` | Rơi Bốn | Connect Four | Quân rơi theo cột; 4 quân liên tiếp cùng chất theo 4 hướng cổ điển của Connect Four tự nổ (không phải "thắng ván") | 7 |

Toàn bộ 8 bản này được viết trực tiếp (2 vòng agent nền bị lỗi hệ thống — rate limit rồi stream-stall — nên phần lớn được viết tay thay vì giao cho agent), rồi verify bằng harness headless (`node --check` cho cú pháp, DOM-stub cho runtime).

---

## 3. Nhánh trọng lực + khối rơi (20–22)

Sau khi liệt kê thêm ý tưởng kết hợp với boardgame casual (Rummikub, Reversi, Connect Four, Go, Bingo, Mancala, Nine Men's Morris, Snakes & Ladders, Peg Solitaire, Tangram, Solitaire, Yahtzee…), yêu cầu chuyển sang thử 1 core loop cụ thể: **trọng lực + match tự động + chọn 1 trong 2 khối**. Đây là nhánh riêng, không phải bản nối tiếp của Khay Tiêu Hóa.

- **20 — `20-pick-and-fall.html`** (8 checks): mỗi lượt chọn 1 trong 2 quân đơn lẻ để thả vào cột (rơi theo trọng lực); 3+ quân giống nhau liền ngang/dọc (không sảnh) tự nổ; 2 hook mahjong được ghép thêm: **Giữ Quân** dùng lại đúng cơ chế Khay 2 ô (rủi ro thật, không phải nút Hold vô hạn), và **Pung→Kong** (4 liên tiếp thưởng thêm 1 lượt Phá Vùng).
- **21 — `21-shape-drop.html`** (9 checks): theo yêu cầu "đặt tổ hợp quân dính liền như Tetris/Block Blast, không phải quân lẻ" — đổi đơn vị thả từ 1 quân sang 1 **khối 2-4 quân** (domino/tromino/vuông), rơi như vật rắn (cột nào của khối vướng vật cản trước quyết định điểm dừng của cả khối). **Lỗi tự phát hiện sau khi user báo**: quân không có gì bên dưới bị "lơ lửng" khi 1 cột khác của khối dừng trước — sửa bằng cách thêm bước `collapseColumn` cho MỌI cột ngay sau khi khối đáp, trước khi tính match. Điều kiện thua cũng đổi từ "bàn đầy" sang deadlock thật (`hasAnyLegalMove`: không cột nào đặt lọt được khối hiện tại lẫn khối trong Khay).
- **22 — `22-shape-drag.html`** (11 checks): 3 phản hồi cùng lúc — (a) giảm số loại quân từ 3 chất×6 hạng (18 loại) xuống 2 chất×4 hạng (8 loại) để giảm phức tạp thị giác, không đụng luật; (b) đổi input từ tap-tap sang **kéo-thả** thật (Pointer Events, ghost theo tay, gợi ý cột khi kéo qua bàn); (c) dùng 1 khối trong cặp 2 khối chỉ làm mới **đúng khối đó**, khối còn lại giữ nguyên (đúng hành vi Block Blast thật).

---

## 4. Quay lại Khay Tiêu Hóa: đơn giản hoá luật + brainstorm cơ chế mới

Không sinh file mới ở bước này — là các vòng thảo luận định hướng trước khi build tiếp:

1. **Bỏ Sảnh, chỉ giữ Phỗng ("bộ 3")** — yêu cầu tường minh "bỏ luật mahjong, chỉ giữ bộ 3", để làm nền cho phần brainstorm sau.
2. **2 batch gợi ý mechanic "không làm game phức tạp"** (~10 ý: Quân Vàng, streak Sạch Khay, xem trước hình khối, Tứ Quý tự nổ, nạp lại công cụ theo mốc, Ô Neo, Combo đặt liên tiếp, gợi ý bằng ánh sáng, thưởng công cụ dư cuối màn, chọn mục tiêu màn…) — bị từ chối vì toàn là lớp **buff/bonus** phủ lên trên, không đổi quyết định lõi.
3. **Batch 3: 5 ý đổi core gameplay thật**, mượn trực tiếp 1 cơ chế boardgame mỗi ý — Rummikub (khớp bằng tay, không tự nổ), Connect Four/domino (khay phải khớp theo đúng thứ tự liền kề), Cờ vây (bao quanh để bắt), Bingo (mục tiêu hình dạng thay vì số lượng), Nine Men's Morris (tạo hàng trên bàn để nhổ 1 quân bất kỳ). Ý được đánh giá sâu nhất (Connect Four/domino) chưa được build thành file riêng.

---

## 5. Nhánh Khay Tiêu Hóa mở rộng (23–26)

Đây là nhánh **kế thừa trực tiếp cơ chế của 11** (đặt khối kiểu Block Blast + đóng hàng đẩy quân vào Khay để tiêu hóa) — mỗi bản chỉ đổi một số điểm cụ thể, không viết lại từ đầu.

- **23 — `23-khay-bo-3-4-5.html`** (5 checks): thực thi quyết định "bỏ Sảnh" ở mục 4 + yêu cầu "thay bộ 3 thành bộ 3-4-5, thưởng thêm nếu match nhiều hơn 3". `findMeld` (tìm bộ 3 đầu tiên) đổi thành `findBestMeld` (quét toàn khay, ưu tiên **id có số lượng lớn nhất**, giới hạn ở 5; điểm leo thang 120/220/360). **Sửa 1 bug hành vi quan trọng**: bản gốc nạp-rồi-nổ-ngay từng quân một, nên hễ đủ 3 là vội nổ mất, không bao giờ kịp thấy bộ 4-5 đang tới — sửa bằng cách nạp **hết** quân của hàng vào khay trước, rồi mới quét-và-nổ. Điều kiện tràn khay dời sang kiểm tra 1 lần *sau khi* đã nổ hết mọi bộ có thể (khoan dung hơn bản gốc, đổi lại để đúng mục đích "chờ bộ lớn").
- **24 — `24-two-tier-match.html`** (7 checks) — **một bước đi lệch hướng, đã được sửa ở lượt sau**: khi user yêu cầu "match 2 + 2 tầng board + trọng lực", bản này hiểu nhầm thành quay lại đúng cặp cơ chế gốc "Match 2 + Layer" từ brief đầu tiên của cả project — bỏ hẳn cơ chế đặt-khối/Khay của 23, xây một game ghép-đôi-kiểu-Mahjong-Solitaire (bàn 2 tầng, chạm 2 quân lộ diện giống nhau để phá, có Xáo lại). Về mặt kỹ thuật vẫn đúng và verify sạch — nhưng **không phải điều user muốn**; user xác nhận lại ngay sau đó là muốn giữ nguyên cơ chế 23. File vẫn được giữ lại làm tham chiếu, không xoá.
- **25 — `25-khay-2-layers-iso.html`** (8 checks): bản sửa đúng ý sau khi user xác nhận lại — **giữ 100% cơ chế đặt-khối/Khay của 23**, chỉ đổi: (a) bộ tối thiểu từ 3 xuống 2 → dải bộ 2-3-4 (Cặp/Phỗng/Khạp, điểm 120/220/360); (b) thêm **2 tầng** ở mỗi ô bàn (tầng dưới là mặt "đóng hàng" chính, tầng trên là dung lượng dự phòng — hết chỗ tầng dưới mới chồng lên tầng trên); (c) trọng lực giữa 2 tầng: đóng hàng xong, quân tầng trên rơi xuống tầng dưới ngay nếu tầng dưới vừa trống, không lơ lửng; (d) camera bàn cờ đổi thành nghiêng giả-isometric bằng `rotateX` + counter-rotate từng quân.
- **26 — `26-khay-2-layers-lowpoly.html`** (8 checks): user phản hồi "camera còn tệ" — làm lại hoàn toàn phần vẽ bàn cờ, **không đổi 1 dòng game logic nào** so với 25. Bỏ kỹ thuật `rotateX`/`preserve-3d` (ảo giác nghiêng, không có hình khối thật, dễ méo chữ), thay bằng **khối 3D low-poly thật**: mỗi quân là 1 khối ghép từ 3 mặt phẳng dùng `clip-path` (1 mặt trên hình thoi hiện icon quân + 2 mặt bên đổ 2 màu khác nhau, giả 1 nguồn sáng) — kỹ thuật "CSS isometric cube" chuẩn, không cần `perspective`/`preserve-3d` nên tránh hẳn lỗi méo/khó đọc. Lưới ô vẫn thẳng hàng-cột (không xoay 45° thành lưới kim cương) để không phải sửa logic chạm/kéo-thả. Đơn giản hoá thêm: bỏ vẽ khối 3D "ma" khi xem trước, chỉ tô màu ô.

---

## 6. Các lỗi đã tìm và sửa (ngoài các bug hành vi đã nêu ở mục 3 và 5)

- **DOM-stub thiếu `addEventListener` trên `global`**: `TypeError` ngay từ bản đầu — thêm `global.addEventListener`/`removeEventListener` là no-op.
- **Selftest tự viết sai của 15**: `resolvePlacement` test truyền `(T('s5'), T('c2'))` nhưng quân hàng xóm đã đặt trước lại khớp với vế còn lại — swap lại thứ tự tham số, bắt được trước khi báo cho user.
- **Hiểu sai thuật toán của chính mình khi viết test cho 16**: viết test kỳ vọng 2 quân bị chặn thẳng hàng/thẳng cột có thể nối bằng đúng 1 khúc cua — chạy ra FAIL, phân tích lại thì thấy **thuật toán đúng, test sai** (2 quân cùng hàng/cột luôn cần tối thiểu 2 khúc cua vì góc ứng viên suy biến về đúng 2 đầu mút) — sửa kỳ vọng của test, không sửa thuật toán.
- **Test tự tạo bối cảnh vật lý sai của 21**: test "quân lơ lửng rơi tiếp" đặt 1 "vật cản" giả ở giữa cột (không có gì đỡ nó), nên khi áp trọng lực cho toàn bàn, vật cản đó *cũng* rơi theo, làm sai kỳ vọng — sửa bằng cách đặt vật cản đứng vững ở đáy cột thật.
- **Harness verify.js tự nhận nhầm 1 đoạn CSS comment nói về "`<script>`" (chữ thường, chỉ là text) làm ranh giới mở đầu script thật** trong bản 24 — khiến cả file bị cắt sai vị trí và báo lỗi cú pháp không liên quan. Sửa bằng cách đổi chữ trong comment, không nhắc literal `<script>` khi không cần.
- **`verify.js` (công cụ, không phải prototype) thiếu `setTimeout`/`clearTimeout` trong sandbox** — chỉ lộ ra khi verify lại prototype 16 (dùng timer cho conveyor tick) trong lúc soát toàn bộ thư mục để viết tài liệu này. Đã thêm 4 hàm timer vào sandbox của `verify.js`; không đụng gì tới prototype 16 vì lỗi nằm ở công cụ kiểm chứng, không ở game logic.

---

## 7. Trạng thái hiện tại (đã soát lại toàn bộ khi viết tài liệu này)

| # | File | Selftest |
|---|---|---|
| 11 | khay-tieu-hoa | 6 OK |
| 12 | slide-collide | 4 OK |
| 13 | stack-columns | 4 OK |
| 14 | merge-ladder | 7 OK |
| 15 | fit-the-pair | 6 OK |
| 16 | conveyor-connect | 6 OK |
| 17 | extend-the-meld | 6 OK |
| 18 | flip-convert | 7 OK |
| 19 | drop-four | 7 OK |
| 20 | pick-and-fall | 8 OK |
| 21 | shape-drop | 9 OK |
| 22 | shape-drag | 11 OK |
| 23 | khay-bo-3-4-5 | 5 OK |
| 24 | two-tier-match (lệch hướng, xem mục 5) | 7 OK |
| 25 | khay-2-layers-iso | 8 OK |
| 26 | khay-2-layers-lowpoly (bản mới nhất của nhánh Khay Tiêu Hóa) | 8 OK |

**Việc còn mở**:
- Chưa có bản nào trong 11–26 được playtest thật bằng tay trong trình duyệt — toàn bộ "verify" ở trên chỉ là logic lõi đúng theo tự mô tả, không phải cảm giác chơi.
- 8 màn dạy của nhánh Khay Tiêu Hóa (11→23→25→26) vẫn giữ nguyên trục số gốc từ bản 11 — chưa retune lại cho phù hợp với bộ 2-3-4, 2 tầng (gấp đôi dung lượng bàn), hay việc bỏ Sảnh.
- Hình học khối isometric ở bản 26 (22px/13px/13px) là ước lượng ban đầu, cần chỉnh bằng mắt sau khi mở thử trong trình duyệt thật.
- Ý "Khay phải khớp theo đúng thứ tự liền kề" (mượn Connect Four/domino, mục 4.3) vẫn chỉ ở dạng thảo luận, chưa build.

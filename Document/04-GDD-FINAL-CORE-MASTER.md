# GDD — Mahjong × Block: "Final Core" (24K-1 Top Match Same-Layer)
*Ngày cập nhật: 2026-09-11 · Nguồn duy nhất: `Final Outputs/index.html` (live build — thư mục đổi tên từ `Final Core` sau đợt đưa dự án lên Git) — mọi số liệu dưới đây verify trực tiếp từ code đang chạy (self-test 31/31 xanh) và dữ liệu 50 level thật, không suy diễn.*

**Cách đọc tài liệu này:** tài liệu chia làm 4 phần theo vai trò — mỗi phần tự đứng được, không bắt buộc đọc tuần tự. Mục 0 (elevator pitch + đảo ngược so với bản cũ) nên đọc trước dù bạn ở vai trò nào.

| Phần | Dành cho | Nội dung |
|---|---|---|
| [A](#phần-a--game-designer) | Game Designer | Core loop, mechanics, curriculum, độ khó, Điểm, Kinh tế Xu, Nhiệm vụ/Điểm Danh — *cái gì* và *vì sao* |
| [B](#phần-b--lập-trình-viên--engineer) | Lập trình viên / Engineer | Kiến trúc file, schema dữ liệu, self-test, nợ kỹ thuật — *code nằm ở đâu, sửa thế nào cho an toàn* |
| [C](#phần-c--hoạ-sĩ--âm-thanh) | Hoạ sĩ / Âm thanh | Bảng màu, nguyên tắc Dùng/Tránh, việc art còn dở dang |
| [D](#phần-d--producer--quản-lý-dự-án) | Producer / Quản lý dự án | Hiện trạng, số liệu, việc tồn đọng, roadmap |

---

## 0. Đọc trước khi dùng — Elevator pitch & các đảo ngược so với bản 08-24

### 0.1 Elevator pitch

Một câu đố kéo-thả (drag-and-drop) 1-thao-tác trên bàn cờ 2 tầng, dùng mặt quân Mahjong làm vật liệu ghép: người chơi thả một khối nhiều-ô (polyomino) xuống bàn, mỗi ô của khối tự rơi vào tầng thấp nhất còn trống của cột đó; hai quân **cùng mặt, cùng tầng, kề nhau, và đang lộ mặt (không bị che)** sẽ Match và biến mất, kéo theo quân ở trên rơi xuống tạo hiệu ứng dây chuyền (cascade). Vì tầng mái do chính người chơi chủ động chồng lên, việc **che một quân để "khoá" nó rồi tự tay lộ lại đúng lúc** trở thành một quyết định chiến thuật thật — cơ chế lõi này **không đổi** từ bản đầu tiên.

### 0.2 Vì sao có bản viết lại này

Kể từ bản 08-24, game đã đổi quy mô (30→50 level), đổi kiến trúc booster, và có thêm 3 hệ thống hoàn toàn mới (Kinh tế Xu, Nhiệm vụ & Điểm Danh, Chủ Đề). Một số nguyên tắc từng "đã chốt" đã bị **đảo ngược có chủ đích** qua nhiều đợt làm việc song song — không phải lỗi lệch spec:

| Nguyên tắc "đã chốt" trong bản 08-24 | Thực tế hiện tại |
|---|---|
| "Không giới hạn nước đi" | Move Limit tồn tại thật, 1–10 tuỳ màn (A1.6) |
| "Không vật phẩm hỗ trợ (booster)" | Booster là cơ chế thật, kho dùng chung + mua gói (A1.7) |
| "Không hiển thị điểm số" | Điểm hiện trực tiếp trong HUD (A3) |
| "Monetization đã chốt: Ads-only, không IAP" | Có thêm 1 hệ kinh tế Xu + Cửa hàng cosmetic song song với Ads (A4) — không phải IAP tiền thật, nhưng là 1 currency loop đầy đủ mà bản 08-24 không có |
| "Quy mô đã chốt: 30 level / 3 chương hiển thị" | 50 level / 5 chương |
| Tutorial riêng ngoài `P24M_LEVELS`, qua nút "?" | Đã gỡ, onboarding gộp hẳn vào Level 1 thật (A1.9) |
| "Không thêm cơ chế lõi mới" (phạm vi Tuần 3–4 cũ) | Lock, Điểm, Kinh tế Xu, Nhiệm vụ, Chủ Đề đều thêm sau mốc đó |

---

## PHẦN A — GAME DESIGNER

### A1. Core Gameplay

**A1.1 Vòng lặp chính**
```
Nhìn bàn 2 tầng (floor z0 / roof z1) + khối hiện tại + khối kế tiếp
        ↓
Kéo khối vào bàn — mỗi ô của khối tự rơi vào tầng thấp nhất còn trống ở cột đó
        ↓
Quân cùng mặt · cùng tầng · liền kề · đang LỘ (không bị che) → Match, biến mất
        ↓
Quân phía trên rơi tiếp (gravity) → có thể lộ ra quân mới → Match tiếp (cascade wave 2, 3...)
        ↓
Đạt goal của màn (A1.8) → Thắng → cộng Điểm + Xu → mở màn kế
```
Người chơi được **chủ động chồng khối lên quân có sẵn để che nó lại** — biến việc "che" thành một nước cờ hoãn binh có chủ đích.

**A1.2 Bàn & quân** — Bàn vuông 2×2 đến 6×6 tuỳ level. 2 tầng floor (`z0`)/roof (`z1`), mỗi cột tối đa 2 vị trí xếp chồng. 6 mặt Mahjong chính + mặt phụ dùng riêng cho vài combo.

**A1.3 Khối (piece)** — Polyomino 2–5 ô (domino/tromino/tetromino/pentomino). Guard chống "baked self-match", **trừ Level 1** (cố ý cho cú chạm đầu tiên luôn thắng ngay).

**A1.4 Match & Cascade** — Match hợp lệ: cùng mặt + cùng tầng + liền kề trực giao + cả hai đang lộ. Nhóm 3–4 quân clear cùng lúc 1 wave. Cao độ "pop" tăng dần theo wave trong cùng 1 lượt đặt.

**A1.5 Ô đặc biệt (3 loại — Lock là mới nhất)**

| Cơ chế | Cách mở | Có ở |
|---|---|---|
| Phong Ấn (Seal) | Match đủ N mặt **khác nhau** | 17/50 màn |
| Ô Chắn (Permanent) | Không bao giờ mở, buộc định tuyến | 28/50 màn |
| Lock | Gắn với **đúng 1 mặt cụ thể** + số lượng hiển thị sẵn (khác Seal ở chỗ đếm số lần khớp 1 mặt, không phải số mặt khác nhau) | 16/50 màn |

**A1.6 Move Limit** *(đảo ngược so với 08-24)* — Giới hạn số lượt đặt khối, dao động **1–10** tuỳ màn. Hết lượt chưa đạt goal → thua, tự restart màn đó. Lượt dư ảnh hưởng Điểm (A3) và Xu (A4).

**A1.7 Booster** *(đảo ngược so với 08-24 — kiến trúc mới)* — Đổi khối + Hint là **1 kho lượt dùng chung xuyên suốt cả game**, không reset theo màn. Bắt đầu **5 lượt/loại**; mua thêm qua Cửa hàng: **gói 5 lượt/100 Xu**. **Level 1 luôn khoá booster** dù kho còn bao nhiêu — giữ tinh thần "cú chạm đầu không cần trợ giúp".

**A1.8 Goal type (4 loại)**

| `goalType` | Ý nghĩa | Số màn |
|---|---|---|
| `TILE_QUOTA` | Đạt đủ số quân/cặp Match | 5 |
| `TARGET_FACE` | N-trên-M: đủ `targetRequiredCount` trong `winTargets`, không cần tất cả | 32 |
| `OPEN_SEAL` | Thắng ngay khi Seal mở | 6 |
| `BURIED_TARGET` | Target bị chôn dưới quân, phải dọn trước | 7 |

`TARGET_FACE` là loại chủ đạo (32/50 màn), không phải quota đơn giản.

**A1.9 Onboarding lần đầu** *(đảo ngược so với 08-24)* — Không còn tutorial riêng qua nút "?" (đã ẩn hẳn, xem B4). Onboarding nằm **hoàn toàn trong Level 1 thật**: 1 bàn tay nhấp nháy chỉ đúng ô cần kéo tới, dựa trên `guideMoves`/`solution` của chính Level 1.

**A1.10 Luồng Thắng/Thua** — Thắng: banner `LEVEL N COMPLETE` + dòng phụ **`Điểm N · chuỗi ×N · +N Xu`**. Thua: banner lỗi + tỉ lệ tiến độ, tự restart. Âm thanh WebAudio riêng cho từng sự kiện, hỗ trợ Reduced Motion.

### A2. Nội dung: 50 level / 5 chương

*(Cập nhật 2026-09-11: thứ tự giới thiệu cơ chế đã đổi so với bản trước — xác nhận lại bằng cách đọc trực tiếp `window.__digest24k1.LEVELS` từ build thật, không phải giả định. Lock giờ vào sớm nhất (C1), rồi Ô Chắn (C2), rồi Phong Ấn (C3) — đảo ngược thứ tự Seal/Ô Chắn so với tài liệu cũ.)*

| Chương | Level | Trọng tâm |
|---|---|---|
| C1 — Nền tảng | 1–10 | Core loop: đặt, Match, che–lộ 2 tầng; **giới thiệu Lock** (Lv9) |
| C2 — Ô Chắn | 11–20 | Giới thiệu Permanent ngay Lv11 ("First Blocker"), dùng xuyên suốt cả 10 màn |
| C3 — Phong Ấn | 21–30 | Giới thiệu Seal ở Lv21 ("Break The First Seal"), tăng dần `sealRequiredDistinct`; Lv30 vẫn là bài thi cuối chương (kết hợp Seal+Ô Chắn) |
| C4 — Kết hợp | 31–40 | Cả 3 cơ chế (Lock + Ô Chắn + Seal) xuất hiện đồng thời ngay từ Lv31 |
| C5 — Mastery | 41–50 | Tổng hợp toàn bộ luật, **Lv50 giờ là màn khó nhất toàn game** |

**Đường cong độ khó** (7 thành phần: cỡ bàn + số nước lời giải + độ chật + số mặt quân + cơ chế đặc biệt + khối lớn nhất + độ phức tạp mục tiêu — chi tiết `Mahjong_x_Block_Beatchart.xlsx`, vừa build lại từ dữ liệu màn mới nhất): nhịp lên dốc có ngắt quãng — chỉ có đầu C3 (Lv21, điểm 18.0) là "thở" rõ sau đỉnh C2; đầu C2 và C4 lại **bật khó ngay** thay vì giảm. Thấp nhất 7.9 (Lv1), cao nhất **54.9 (Lv50)** — khác bản cũ (từng cho rằng Lv30 là đỉnh). Hai cú nhảy độ khó lớn nhất game đều nằm đúng chỗ có chủ đích: Lv30→31 (38.0→48.8, mở màn "kết hợp cả 3 cơ chế") và Lv49→50 (44.6→54.9, cú bứt tốc "Grand Finale") — cả hai đều xuất phát từ nền đã cao (không phải dốc đứng từ thấp lên cao như ghi nhận trước đây), nên **không cần thêm màn đệm**. Ngưỡng tứ phân vị cũng đổi: Dễ < 24.9 · Vừa 24.9–34.3 · Khó 34.3–39.5 · Rất khó ≥ 39.5.

### A3. Hệ thống Điểm (Score)

Hiện trực tiếp trong HUD ("ĐIỂM", cập nhật sống). Công thức = điểm nền (theo cỡ khối/nhóm match) + 2 lớp:

1. **Hệ số chuỗi**: mỗi wave cascade trong 1 lượt nhân thêm điểm — wave1=×1, mỗi wave sâu +0.25, chặn ×2.
2. **Streak liên tiếp**: lượt nào cũng match thì lượt sau +15×(số lượt liên tiếp, chặn ở 10); đặt hụt reset về 0.

Không đổi luật thắng/thua (`S.pairs`/`levelWon()`) — Điểm là lớp thưởng cảm giác thuần tuý.

**Đã bỏ "Bonus lượt dư" (+25/lượt dư lúc thắng)**: lượt dư không phải tín hiệu kỹ năng đáng tin — hàng đợi khối do tác giả định trước (không random), nên nhiều lúc người chơi buộc phải đặt khối "chờ" vì chưa tới lượt có đúng mặt Mahjong cần để Match, không phải do chơi dở. "Dư nhiều lượt" có thể chỉ phản ánh bố cục màn may mắn hơn là kỹ năng thật.

### A4. Kinh tế Xu (Economy)

**Nguồn thu**: thắng màn **lần đầu** (chơi lại = 0 Xu, chặn cày):
```
sàn = round(10 × ln(màn + 2))     // ~11 Xu (màn 1) → ~40 Xu (màn 50)
+ 15 nếu không dùng booster nào trong màn
× 2 nếu là màn chốt chương (10/20/30/40/50)
```
*Đã bỏ bonus "lượt dư × 2" (từng có ở đây, cùng lý do đã bỏ khỏi Điểm — mục A3): hàng đợi khối định trước nên "dư lượt" nhiều lúc chỉ là đợi đúng mặt Mahjong cần để Match, không phải chơi giỏi hơn.*

Tổng cả đời chơi 50 màn: **1,725 (tệ nhất) – 2,535 (tối ưu)**. Mốc bảo đảm "đủ mua skin rẻ nhất ở màn 30" (899 Xu tệ nhất) không đổi — kịch bản tệ nhất vốn đã giả định 0 lượt dư từ trước khi có bonus này. Công thức Excel sống (đổi hệ số/offset, tự tính lại) ở `Mahjong_x_Block_SourceSink.xlsx`.

**Sink — Cửa hàng**: 24 món trả phí — 11 skin quân (895–2,265 Xu), 10 skin bàn (1,195–2,150 Xu), gói booster (100 Xu/5 lượt). Mỗi món preview thật + mô tả 3 ngôn ngữ.

**Chủ đích cân bằng**: skin rẻ nhất (895 Xu) phải luôn đủ mua ở màn 30 kể cả người chơi tệ nhất (899 Xu tới màn 30 — sát nút có chủ đích). Đánh đổi: skin đắt nhất là mục tiêu dài hơi, không ai mua hết được cả 24 món trong 1 lượt chơi (tổng catalogue: 33,590 Xu).

### A5. Nhiệm vụ & Điểm Danh

**Nhiệm vụ hằng ngày**: mỗi ngày chọn ngẫu nhiên **có seed theo ngày** (mọi người chơi cùng ngày thấy cùng đề) 3/6 nhiệm vụ: thắng 1 màn, ghép 6 cặp, dùng 1 booster, phá 1 Seal, thắng không dùng booster, chuỗi cascade ≥2 wave. Thưởng: 20–30 Xu hoặc 1 Đổi khối+1 Hint. Mốc phụ trong ngày: hoàn thành 1/2/3 nhiệm vụ → +15 Xu / +25 Xu+1 Đổi khối / +40 Xu+1 Đổi khối+1 Hint.

**Điểm Danh — 30 ngày, không phải streak**: là **bộ đếm cộng dồn không bao giờ reset** dù bỏ lỡ ngày. Thắng ≥1 màn trong ngày mở khoá nút nhận; bấm nhận mới tăng ngày (30→1 quay vòng). Thưởng: 10 Xu (ngày 1–9)/15 (10–19)/20 (20–29), +1 Đổi khối mỗi 5 ngày; mốc lớn: **ngày 10 = 60 Xu+3+3**, **ngày 20 = 100 Xu+5+5**, **ngày 30 = 200 Xu+8+8**.

Cả 2 tab cộng thẳng vào Xu/kho booster có sẵn — không tạo currency/kho vật phẩm riêng.

### A6. Chủ Đề (Wardrobe) — phân biệt với Cửa Hàng

Modal riêng, dùng chung dữ liệu skin nhưng khác vai trò: **Cửa Hàng** = duyệt + mua bằng Xu. **Chủ Đề** = tủ đồ chỉ để **trang bị** cái đã sở hữu, không hiện giá — bấm skin chưa mở khoá sẽ đóng modal và nhảy sang Cửa Hàng (tránh mua nhầm).

---

## PHẦN B — LẬP TRÌNH VIÊN / ENGINEER

### B1. Kiến trúc file

1 file HTML tự chứa (`Final Outputs/index.html`, ~6.9MB, không build step, không bundler). Nhiều "lớp" IIFE nối tiếp nhau (menu, level-select, prototype cũ, game engine) chia sẻ scope qua closure.

**⚠️ Quy tắc bắt buộc trước khi sửa bất kỳ hàm nào**: nhiều hàm bị **gán lại nhiều lần bằng tên trùng** dạng `name=function(){}` (không `let/const`) ở các lớp sau — **định nghĩa cuối cùng xuất hiện trong file mới là bản đang chạy thật**. Luôn `grep` toàn file trước khi sửa để tìm mọi định nghĩa trùng tên, và chạy `window.__digest24k1.selfTest()` trong console ngay sau khi sửa. Đừng tin việc đọc code ở 1 vị trí là đủ — đã có trường hợp thực tế 1 session khác suýt xoá nhầm `emptyBoard` vì tưởng nó chết, hoá ra vẫn được `startLevel=` (bản cuối) gọi.

**Ví dụ cụ thể đã xác minh (có thể lỗi thời nếu code đổi tiếp)**: nút `#btn-help` vẫn có `addEventListener` gắn từ lớp prototype cũ (mở overlay luật lỗi thời "Match 2 & Phá Ấn"), nhưng lớp cuối cùng set `btnHelp.style.display='none'` sau đó — verify bằng Puppeteer thật: `getComputedStyle`/`getBoundingClientRect` xác nhận ẩn hẳn, 1 click thật thất bại với "Node is either not clickable". Kết luận: code đó **chết về mặt trải nghiệm người chơi** dù vẫn tồn tại (tốn parse-time, không tốn gì khác) — an toàn để dọn tiếp.

### B2. Cấu trúc dữ liệu

**1 level (`P24M_LEVELS[i]`)**: `title`, `size`, `goalType`, `winTargets`, `seals`/`permanents`/`locks`, `sealRequiredDistinct` (giờ có giá trị 2, trước chỉ từ 1), `sequence`, `guideMoves`, `solution` (tự-verify).

**localStorage keys đang dùng**: `mxb_level_unlocked`, `mxb_coins`, `mxb_owned_tileskins`/`mxb_owned_boardskins`, `mxb_active_tileskin`/`mxb_active_boardskin`, `mxb_booster_reroll`/`mxb_booster_hint`, `mxb_quest_state` (`{date, quests[], milestoneClaims[]}`), `mxb_checkin_state` (`{day, lastClaimDate, lastWinDate}`).

**Hàm/API quan trọng** (không đầy đủ, chỉ những cái hay cần đụng tới): `computeWinCoins()`, `getBoosterReroll/Hint()`/`setBoosterReroll/Hint()`, `buyBoosterPack()`, `buyTileSkin()`/`buyBoardSkin()`, `pickDailyQuests()`/`addQuestProgress()`/`claimQuest()`, `claimCheckin()`/`checkinReward()`, `renderThemePicker()`, `window.__digest24k1` (debug/test hook: `selfTest()`, `LEVELS`, `place()`, `startLevel()`).

### B3. Lưới an toàn kỹ thuật (self-test — 31 assertion, chạy mỗi lần load)

Bao gồm: đủ 50 level, mọi `solution` giải được và tự-verify, mọi Seal tự mở trong chính solution của nó, mọi `TARGET_FACE` có `targetRequiredCount` hợp lệ, Match/cascade/gravity đúng thiết kế, cộng 3 assertion kinh tế (`economy_default_skins_free`, `economy_prices_positive`, `economy_floor_affords_cheapest_skin_by_level30`). Wild/Joker và Nứt/Crack (từng có self-test riêng) đã **gỡ bỏ hoàn toàn** cùng 2 assertion tương ứng.

### B4. Tình trạng dọn dead-code

Đang **tiếp diễn qua nhiều phiên làm việc song song**, chưa có mốc hoàn tất chính thức. Đã gỡ: lớp prototype "24K V2" (win/lose/startLevel/goalState cũ — từng tốn ~1.6s parse/exec trên CPU mobile throttle + 4 AudioContext trùng lặp), Wild/Joker, Nứt/Crack, vài helper piece-generation chết hẳn (`cellsOf`, `needIds`, `boardFreq`, `pickId`). Một số hàm bị rút gọn thành stub 1 dòng nhưng **giữ nguyên tên** vì có chỗ khác bare-reassign vào chúng hoặc 1 object literal debug cũ tham chiếu shorthand tới — xoá tên sẽ vỡ `"use strict"`. `#btn-help` + overlay HELP cũ: xác nhận chết về UX (xem B1), an toàn dọn tiếp khi cần.

**Quy trình khi dọn tiếp**: làm từng bước nhỏ, chạy `selfTest()` + thử đặt 1 quân thật sau MỖI bước, không gộp nhiều thay đổi rồi test 1 lần — cách này đã bắt được lỗi "X is not defined" ngay lập tức thay vì phải debug ngược.

---

## PHẦN C — HOẠ SĨ / ÂM THANH

### C1. Định hướng thẩm mỹ

**"Hành Trình Qua Vườn Trúc"**: Nguyệt Môn (Main Menu) → cổng tre (Level Select) → bàn trà gỗ (Gameplay). Vật liệu: gỗ tối, tre trúc, giấy màu ngà, ngọc bích (`jade`), đồng cổ làm viền/accent.

### C2. Nguyên tắc Dùng / Tránh

| DÙNG | TRÁNH |
|---|---|
| Gỗ tối, tre trúc, giấy màu ngà | Rồng, đèn lồng đỏ lớn |
| Ngọc bích, đồng cổ làm viền/accent | Hoa văn vàng đặc |
| Zen: tương phản mạnh, ít chuyển động cùng lúc | Hiệu ứng jackpot/pháo hoa/coin — **áp dụng cả cho màn hình kinh tế mới** (Cửa hàng/Chủ Đề/Nhiệm vụ): không hiệu ứng rương/mở hộp kiểu casino |
| Hỗ trợ Reduced Motion đầy đủ | Màn Thắng/Thua có pháo hoa/coin/3-sao/phủ đỏ toàn màn |
| 1 màn hình = 1 hành động chính | — |

**Âm thanh**: mỗi sự kiện (đặt khối/Match/Reveal/Seal mở/Thắng/Thua) có 1 âm WebAudio tổng hợp riêng, không dùng file âm thanh ngoài.

### C3. Việc art còn dở dang (cần biết trước khi bắt tay vào)

- Đồng bộ art pass giữa các màn hình phụ (Cửa hàng/Chủ Đề/Nhiệm vụ) với gameplay chính — có collaborator đang làm dở phần palette tối→sáng cho modal Chủ Đề.
- Đợt tối ưu hiệu năng gần nhất đã đổi 1 số animation từ `box-shadow` sang `transform:scale` (đỡ tốn paint trên di động: door-handle pulse, seal/lock glow, hud-moves warning) — nếu chỉnh lại các animation này, **ưu tiên `transform`/`opacity` thay vì `box-shadow`/`filter`** để giữ hiệu năng đã tối ưu, trừ khi có lý do hình ảnh thật sự cần.
- Khung `#app-frame` dùng đơn vị `svh` (không phải `dvh`) có chủ đích — để tránh khung 16:9 co giãn theo animation ẩn/hiện thanh địa chỉ trình duyệt di động. Nếu thêm CSS layout mới phụ thuộc chiều cao viewport, dùng `svh` cho nhất quán.

---

## PHẦN D — PRODUCER / QUẢN LÝ DỰ ÁN

### D1. Hiện trạng dự án

| | |
|---|---|
| Level hoàn chỉnh | **50/50**, mỗi màn có solution tự-verify |
| Self-test tự động | **31/31** xanh mỗi lần mở game |
| Cơ chế lõi | Match/cascade/che-lộ, Seal, Ô Chắn, Lock, Move Limit — hoàn chỉnh |
| Điểm (Score) | Hoàn chỉnh, hiện trong HUD |
| Kinh tế Xu + Cửa hàng | Hoàn chỉnh, 24 món, tự cân bằng có kiểm chứng |
| Nhiệm vụ & Điểm Danh | Hoàn chỉnh |
| Chủ Đề (wardrobe) | Hoàn chỉnh |
| Ads (interstitial + rewarded) | Lớp no-op sẵn sàng cắm SDK thật, chưa chọn platform phát hành |
| Quản lý mã nguồn | Đã đưa lên Git (1 commit "Push Project to Git"), thư mục đổi tên `Final Core`→`Final Outputs` |
| Dọn dead-code | Đang tiếp diễn (nhiều phiên song song), chưa có mốc hoàn tất |
| Tối ưu hiệu năng mobile | Đang có 1 đợt WIP chưa commit (animation, viewport unit, haptic timing) |

### D2. Việc tồn đọng / cần xác nhận

- **Playtest thật** để đối chiếu đường cong độ khó lý thuyết (A2) với cảm giác chơi thật, đặc biệt đoạn Lv49→50.
- Theo dõi % người chơi mua được cosmetic đầu tiên trước khi hết Chương 1, để tinh chỉnh công thức Xu nếu quá hào phóng/keo kiệt.
- Đồng bộ art pass các màn hình phụ (xem C3).
- Đợt dọn dead-code + đợt tối ưu hiệu năng đang chạy song song — nên re-run self-test sau mỗi đợt trước khi coi bản build ổn định.
- Chưa chốt platform phát hành → chưa cắm SDK ads thật.

### D3. Roadmap ngắn hạn

1. Playtest thật vòng cuối (đối chiếu D2).
2. Cân bằng lại Kinh tế Xu theo dữ liệu playtest nếu cần.
3. Hoàn thiện art pass các màn hình phụ.
4. Chốt platform phát hành → cắm SDK ads thật.
5. Đóng gói bản phát hành.

### D4. Lịch sử thay đổi lớn

Xem mục 0.2 (bảng đảo ngược so với bản 08-24) — đây là những quyết định **đã áp dụng và có self-test xác nhận**, không phải đề xuất.

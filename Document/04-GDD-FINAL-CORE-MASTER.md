# GDD — Mahjong × Block: "Final Core" (24K-1 Top Match Same-Layer)
*Bản viết lại toàn diện — thay thế bản 2026-08-24.*
*Ngày cập nhật: 2026-09-09 · Nguồn duy nhất: `Final Core/index.html` (live build) — mọi số liệu dưới đây verify trực tiếp từ code đang chạy (self-test 31/31 xanh) và dữ liệu 50 level thật, không suy diễn.*

> **Vì sao viết lại toàn bộ thay vì sửa từng phần**: kể từ bản 08-24, game đã đổi quy mô (30→50 level), đổi kiến trúc booster, và có thêm 3 hệ thống hoàn toàn mới (Kinh tế Xu, Nhiệm vụ & Điểm Danh, Chủ Đề) không tồn tại lúc đó. Một số nguyên tắc từng "đã chốt" trong bản cũ (không move limit, không booster, không hiển thị điểm số, Ads-only/không IAP) **đã bị đảo ngược có chủ đích** qua nhiều đợt làm việc song song. Mục 13 liệt kê đầy đủ các đảo ngược này để không ai vô tình coi bản 08-24 là còn hiệu lực.

---

## 1. Elevator pitch

Một câu đố kéo-thả (drag-and-drop) 1-thao-tác trên bàn cờ 2 tầng, dùng mặt quân Mahjong làm vật liệu ghép: người chơi thả một khối nhiều-ô (polyomino) xuống bàn, mỗi ô của khối tự rơi vào tầng thấp nhất còn trống của cột đó; hai quân **cùng mặt, cùng tầng, kề nhau, và đang lộ mặt (không bị che)** sẽ Match và biến mất, kéo theo quân ở trên rơi xuống tạo hiệu ứng dây chuyền (cascade). Vì tầng mái do chính người chơi chủ động chồng lên, việc **che một quân để "khoá" nó rồi tự tay lộ lại đúng lúc** trở thành một quyết định chiến thuật thật — cơ chế lõi này **không đổi** từ bản đầu tiên.

## 2. Thẩm mỹ

Vẫn theo mạch **"Hành Trình Qua Vườn Trúc"**: Nguyệt Môn ở Main Menu → cổng tre ở Level Select → bàn trà gỗ lúc chơi. Vật liệu hình ảnh: gỗ tối, tre trúc, giấy màu ngà, ngọc bích (`jade`), đồng cổ làm viền/accent. Nguyên tắc tránh vẫn giữ: không rồng, không đèn lồng đỏ lớn, không hoa văn vàng đặc, không hiệu ứng jackpot/pháo hoa/coin — kể cả ở các màn hình kinh tế mới (Cửa hàng, Chủ Đề) đều tuân theo cùng bảng màu gỗ/ngọc/đồng, không có hiệu ứng "rương/mở hộp" kiểu casino.

**Mới từ bản 08-24**: Main Menu giờ có thêm 1 cụm icon góc trên (cài đặt / Cửa hàng / Chủ Đề / Nhiệm vụ) và 1 khung hiện số Xu — vẫn theo đúng vật liệu gỗ/đồng, không dùng khung neon hay badge sặc sỡ.

---

## 3. CORE GAMEPLAY

### 3.1 Vòng lặp chính

```
Nhìn bàn 2 tầng (floor z0 / roof z1) + khối hiện tại + khối kế tiếp
        ↓
Kéo khối vào bàn — mỗi ô của khối tự rơi vào tầng thấp nhất còn trống ở cột đó
        ↓
Quân cùng mặt · cùng tầng · liền kề · đang LỘ (không bị che) → Match, biến mất
        ↓
Quân phía trên rơi tiếp (gravity) → có thể lộ ra quân mới → Match tiếp (cascade wave 2, 3...)
        ↓
Đạt goal của màn (mục 3.8) → Thắng → cộng Điểm + Xu → mở màn kế
```

Người chơi không chỉ ghép quân lộ sẵn — họ được **chủ động chồng khối lên quân có sẵn để che nó lại**, biến việc "che" thành một nước cờ hoãn binh có chủ đích.

### 3.2 Bàn & quân

- Bàn vuông, kích thước theo từng level — dao động **2×2 đến 6×6** trong suốt 50 level.
- 2 tầng: floor (`z0`) và roof (`z1`). Mỗi ô cột chỉ có tối đa 2 vị trí xếp chồng.
- 6 mặt Mahjong chính dùng xuyên suốt, cộng mặt phụ dùng riêng cho vài combo đặc biệt.

### 3.3 Khối (piece)

Polyomino 2–5 ô: domino, tromino, tetromino, pentomino. Guard chống "baked self-match" (không cho khối tự có sẵn 1 match miễn phí), **trừ Level 1** — cố ý dùng domino cùng mặt để cú chạm đầu tiên luôn thắng ngay.

### 3.4 Luật Match & Cascade

- Match hợp lệ khi: cùng mặt quân + cùng tầng + liền kề trực giao + cả hai đang **lộ**.
- Nhóm 3–4 quân cùng mặt liền kề clear cùng lúc trong 1 wave.
- Wave clear → gravity → có thể lộ match mới → cascade tự động. Cao độ tiếng "pop" tăng dần theo từng wave trong cùng 1 lượt đặt.

### 3.5 Ô đặc biệt (3 loại — Lock là cơ chế mới nhất)

| Cơ chế | Cách mở | Có ở |
|---|---|---|
| **Phong Ấn (Seal)** | Match đủ N mặt quân **khác nhau** (không tính lặp cùng mặt) | 21/50 màn |
| **Ô Chắn (Permanent)** | Không bao giờ mở — buộc định tuyến vòng qua | 26/50 màn |
| **Lock** *(mới)* | Gắn với **đúng 1 mặt quân cụ thể** + số lượng yêu cầu hiển thị sẵn cho người chơi (khác Seal ở chỗ Seal đếm số mặt *khác nhau*, Lock đếm số lần khớp *đúng 1 mặt*) | Lv9, Lv22, Lv36 |

Seal mở kèm animation "nứt vỡ" + chuông riêng; Ô Chắn dùng thanh gỗ/dây thừng vật lý (không phải khoá xám + 🔒).

### 3.6 Move Limit *(đảo ngược so với bản 08-24 — xem mục 13)*

Mỗi màn có thể giới hạn số lượt đặt khối (`moveLimit`, dao động **1–10** tuỳ màn trong dữ liệu 50 level hiện tại). Hết lượt mà chưa đạt goal → thua, tự restart lại đúng màn. Lượt dư khi thắng ảnh hưởng trực tiếp tới Điểm (mục 5) và Xu (mục 6).

### 3.7 Booster — kiến trúc mới: 1 kho dùng chung, không còn cấp riêng theo màn

Trước đây booster (nếu có) được cấp lại mỗi màn. **Từ vài đợt cập nhật gần nhất**, Đổi khối và Hint là **1 kho lượt dùng chung xuyên suốt cả game**, không reset khi qua màn:

- Người chơi mới bắt đầu có sẵn **5 lượt mỗi loại**.
- Mua thêm qua Cửa hàng: **gói 5 lượt / 100 Xu** (= 20 Xu/lượt), nạp thẳng vào kho chung.
- **Level 1 luôn khoá booster** (không cho dùng), dù kho có bao nhiêu lượt — giữ đúng tinh thần "cú chạm đầu tiên luôn thắng ngay, không cần trợ giúp".

### 3.8 Goal type (điều kiện thắng — 4 loại, verify tại `goalState()`/`levelWon()`)

| `goalType` | Ý nghĩa | Số màn dùng |
|---|---|---|
| `TILE_QUOTA` *(đổi tên từ `PAIR_QUOTA`)* | Đạt đủ số quân/cặp Match | 5 |
| `TARGET_FACE` | N-trên-M: hoàn thành đủ `targetRequiredCount` trong `winTargets`, không cần tất cả | 32 |
| `OPEN_SEAL` | Thắng ngay khi Seal mở | 6 |
| `BURIED_TARGET` | Target bị chôn dưới 1 chồng quân, phải dọn quân che trước | 7 |

`TARGET_FACE` là loại goal chủ đạo (32/50 màn) — không phải `TILE_QUOTA` đơn giản như thiết kế ban đầu.

### 3.9 Cấu trúc dữ liệu 1 level (`P24M_LEVELS[i]`)

Không đổi cấu trúc cơ bản so với bản cũ (`title`, `size`, `goalType`, `winTargets`, `seals`/`permanents`, `sequence`, `guideMoves`, `solution` tự-verify) — **cộng thêm** trường cho Lock (`locks`) và `sealRequiredDistinct` giờ cũng thấy giá trị **2** ở một số màn (trước đây bắt đầu từ 1).

### 3.10 Onboarding lần đầu *(đảo ngược so với bản 08-24)*

**Không còn** màn tutorial riêng ngoài `P24M_LEVELS` truy cập qua nút "?" — nút này (`#btn-help`) đã bị **ẩn hẳn** trong code hiện tại (`btnHelp.style.display='none'`). Onboarding giờ nằm **hoàn toàn bên trong Level 1 thật**: 1 bàn tay nhấp nháy (`__guideHandEl`/`p24kUpdateGuideHand`) chỉ đúng ô cần kéo khối tới, dựa trên `guideMoves`/`solution` của chính Level 1 — không có overlay giải thích luật, không có caption chữ, không có màn "TUTORIAL COMPLETE" riêng.

### 3.11 Level Select & Chapter

50 level chia đều **5 chương × 10 level**. Vào Level Select tự nhảy vào chương chứa level xa nhất đã mở khoá, 2 mũi tên lật chương tự ẩn ở biên. Không còn 2 cách nhóm song song như bản cũ — nhóm hiển thị và nhóm sư phạm giờ trùng nhau (5×10 vừa đúng 5 chương thiết kế).

### 3.12 Luồng Thắng / Thua & phản hồi

- **Thắng**: banner `LEVEL N COMPLETE` hiện kèm dòng phụ **`Điểm N · chuỗi ×N · +N Xu`** *(đảo ngược so với bản 08-24 — xem mục 13)*, tự chuyển màn kế sau ~1.5s.
- **Thua**: banner tiêu đề lỗi + tỉ lệ tiến độ, tự restart màn đó.
- Timing chuỗi resolve, âm thanh WebAudio riêng cho từng sự kiện (đặt/Match/Reveal/Seal/Thắng/Thua), và hỗ trợ Reduced Motion — **không đổi** so với bản cũ.

### 3.13 Lưới an toàn kỹ thuật (self-test, chạy mỗi lần load)

**31 assertion** chạy tự động, bao gồm: đủ 50 level, mọi `solution` giải được và tự-verify, mọi Seal tự mở được trong chính solution của nó, mọi `TARGET_FACE` có `targetRequiredCount` hợp lệ, cơ chế Match/cascade/gravity đúng thiết kế, **cộng 3 assertion kinh tế mới** (`economy_default_skins_free`, `economy_prices_positive`, `economy_floor_affords_cheapest_skin_by_level30` — xem mục 6.4). Wild/Joker và Nứt/Crack (2 cơ chế từng có self-test riêng) đã bị **gỡ bỏ hoàn toàn** khỏi game trong đợt dọn dead-code gần nhất — 2 assertion tương ứng cũng đã gỡ theo.

---

## 4. Nội dung: 50 level / 5 chương

| Chương | Level | Trọng tâm |
|---|---|---|
| C1 — Nền tảng | 1–10 | Core loop: đặt, Match, che–lộ 2 tầng |
| C2 — Phong Ấn | 11–20 | Giới thiệu Seal, tăng dần `sealRequiredDistinct` |
| C3 — Ô Chắn | 21–30 | Ô khoá vĩnh viễn, dạy định tuyến; **Lv30 là màn khó nhất toàn game** |
| C4 — Kết hợp | 31–40 | Seal + Ô Chắn cùng lúc, **giới thiệu Lock** (Lv36) |
| C5 — Mastery | 41–50 | Tổng hợp toàn bộ luật, Lv50 là bài thi cuối |

**Đường cong độ khó** (đo bằng công thức 7 thành phần: cỡ bàn + số nước lời giải + độ chật + số mặt quân + cơ chế đặc biệt + khối lớn nhất + độ phức tạp mục tiêu — chi tiết trong `Mahjong_x_Block_Beatchart.xlsx`): nhịp **sawtooth** rõ ràng, mỗi đầu chương đều "thở" sau đỉnh khó của chương trước. Điểm thấp nhất 7.9 (Lv1), cao nhất 50/50 (Lv30). Điểm cần lưu ý: Lv49→50 dốc khá đứng (13.6→40.9), có thể cần 1 màn đệm nếu muốn mượt hơn.

---

## 5. Hệ thống Điểm (Score) — mới, không có trong bản 08-24

`S.score` giờ **hiển thị trực tiếp trong HUD** (nhãn "ĐIỂM", cập nhật sống trong lúc chơi) *(đảo ngược so với bản 08-24)*. Công thức gồm 3 lớp cộng vào điểm nền có sẵn (theo cỡ khối/nhóm match):

1. **Hệ số chuỗi (chain multiplier)**: mỗi wave cascade trong cùng 1 lượt đặt nhân thêm điểm match của wave đó — wave 1 = ×1, mỗi wave sâu hơn +0.25, chặn ở ×2.
2. **Streak liên tiếp**: lượt đặt nào cũng ra match thì lượt sau +15×(số lượt liên tiếp, chặn ở 10); đặt hụt (0 match) reset về 0.
3. **Bonus lượt dư**: cộng 1 lần lúc thắng, +25/lượt còn dư.

Không ảnh hưởng `S.pairs`/`levelWon()` — Điểm là lớp thưởng cảm giác, không đổi luật thắng/thua.

---

## 6. Kinh tế Xu (Economy) — hoàn toàn mới, không có trong bản 08-24

### 6.1 Nguồn thu (Source)

Thắng màn **lần đầu** (chơi lại màn cũ luôn ra 0 Xu — chặn cày) cho:

```
sàn = round(10 × ln(màn + 2))          // ~11 Xu ở màn 1 → ~40 Xu ở màn 50
+ lượt dư × 2
+ 15 nếu không dùng booster nào trong màn (S.boosterStart>0 && không đổi)
× 2 nếu là màn chốt chương (10/20/30/40/50)
```

Tổng Xu cả đời chơi 50 màn: **1,725 (tệ nhất) – 2,739 (tối ưu)**. Chi tiết công thức Excel sống (đổi hệ số/offset, cả bảng tự tính lại) ở `Mahjong_x_Block_SourceSink.xlsx`.

### 6.2 Sink — Cửa hàng (Shop)

24 món có giá, chia 2 loại:

- **12 skin quân bài** (1 miễn phí + 11 trả phí, **895–2,265 Xu**).
- **11 skin bàn cờ** (1 miễn phí + 10 trả phí, **1,195–2,150 Xu**).
- Mỗi món có preview thật (render bằng đúng `tileHTML()`/CSS bàn dùng trong game, không phải ảnh chụp giả) + tên/mô tả 3 ngôn ngữ (vi/en/zh).

Booster **không còn** bán theo bậc nâng cấp vĩnh viễn (kiến trúc cũ mình từng xây đã bị thay) — giờ bán dưới dạng **gói nạp thêm vào kho chung** (mục 3.7).

### 6.3 Chủ đích cân bằng

Mốc neo: **skin rẻ nhất (895 Xu) phải luôn đủ mua ở màn 30, kể cả người chơi tệ nhất** (luôn dùng hết booster, 0 lượt dư mỗi màn → 899 Xu tới màn 30). Đánh đổi đã chấp nhận: skin đắt nhất (2,265 Xu) là mục tiêu dài hơi — người chơi tối ưu cả 50 màn cũng chỉ đủ mua 1–2 món đắt, không mua hết được cả 24 món (tổng giá cả catalogue: 33,590 Xu).

### 6.4 Tự kiểm tra (self-test)

3 assertion kinh tế chạy mỗi lần load: giá skin mặc định = 0, mọi giá trả phí > 0, và **`economy_floor_affords_cheapest_skin_by_level30`** — tính trực tiếp từ `P24M_LEVELS`/`TILE_SKINS`/`BOARD_SKINS` hiện tại, tự báo đỏ nếu ai đổi giá/công thức làm phá vỡ mốc 6.3.

---

## 7. Nhiệm vụ & Điểm Danh (Quest / Check-in) — hoàn toàn mới

Truy cập qua nút riêng ở Main Menu (`#btn-quest-open`), 2 tab:

### 7.1 Nhiệm vụ hằng ngày

Mỗi ngày (theo lịch máy), hệ thống chọn **ngẫu nhiên có seed theo ngày** (mọi người chơi cùng ngày thấy cùng 3 nhiệm vụ, không lệch nhau) 3/6 nhiệm vụ trong kho: thắng 1 màn, ghép 6 cặp, dùng 1 booster, phá 1 Seal, thắng không dùng booster, tạo chuỗi cascade ≥2 wave. Thưởng mỗi nhiệm vụ: **20–30 Xu** hoặc **1 Đổi khối + 1 Hint**. Có thêm mốc thưởng phụ trong ngày: hoàn thành 1/2/3 nhiệm vụ → +15 Xu / +25 Xu+1 Đổi khối / +40 Xu+1 Đổi khối+1 Hint.

### 7.2 Điểm Danh — 30 ngày, **không phải streak**

Khác điểm danh kiểu "mất chuỗi nếu bỏ lỡ 1 ngày" thường thấy — đây là **bộ đếm cộng dồn không bao giờ reset** dù bỏ lỡ ngày nào. Thắng ≥1 màn trong ngày mở khoá nút nhận; bấm nhận mới thật sự tăng ngày (30→1 quay vòng). Thưởng: 10 Xu (ngày 1–9) / 15 Xu (10–19) / 20 Xu (20–29), +1 Đổi khối mỗi 5 ngày, và 3 mốc lớn: **ngày 10 = 60 Xu+3 Đổi khối+3 Hint**, **ngày 20 = 100 Xu+5+5**, **ngày 30 = 200 Xu+8+8**.

Cả 2 tab đều cộng thẳng vào Xu/kho booster có sẵn — không tạo thêm loại tiền tệ hay kho vật phẩm riêng.

---

## 8. Chủ Đề (Wardrobe) — phân biệt với Cửa Hàng

Modal riêng (`#theme-ov`, nút `#btn-theme`) — **khác Cửa hàng dù dùng chung dữ liệu skin**:

- **Cửa Hàng** = duyệt + **mua** bằng Xu.
- **Chủ Đề** = tủ đồ **chỉ để trang bị** những gì đã sở hữu — không hiện giá. Bấm vào skin đã mở khoá → trang bị ngay. Bấm vào skin chưa mở khoá → đóng modal và **nhảy thẳng sang Cửa Hàng** (tránh mua nhầm ngay trong màn "thử đồ").

---

## 9. Art & Audio direction (cập nhật)

- Palette, nguyên tắc "Zen = rõ ràng không mờ nhạt", bộ âm WebAudio riêng cho từng sự kiện — **không đổi**.
- **Ràng buộc "phải bỏ" của bản 08-24 nay chỉ còn áp dụng một phần**: đã bỏ hẳn tên kỹ thuật (`24K`, `Floor-only Queue`) khỏi UI, khoá vẫn dùng thanh gỗ/dây thừng vật lý — **nhưng Score giờ hiện trong HUD, booster giờ là cơ chế thật có UI riêng** (mục 5, 3.7). Màn Thắng/Thua vẫn không pháo hoa/coin/3-sao/phủ đỏ toàn màn — nguyên tắc thẩm mỹ "không jackpot" áp dụng cả cho các màn kinh tế mới (Cửa hàng/Chủ Đề/Nhiệm vụ) dùng đúng vật liệu gỗ/ngọc/đồng, không hiệu ứng rương/mở hộp kiểu casino.

## 10. Kiến trúc kỹ thuật (cập nhật)

- Vẫn 1 file HTML tự chứa, không build step, không bundler.
- **Đang trong đợt dọn dead-code lớn** (thực hiện qua nhiều phiên làm việc song song): đã gỡ hoàn toàn lớp prototype "24K V2" (win/lose/startLevel/goalState... bị shadow từ lâu nhưng vẫn chạy code khởi tạo lúc parse, gây phí ~1.6s trên CPU mobile throttle + 4 AudioContext trùng lặp), gỡ Wild/Joker và Nứt/Crack. Quy tắc vẫn giữ: khi có hàm bị gán lại nhiều lần bằng `name=function(){}` không `let/const`, **định nghĩa cuối cùng trong file mới là bản đang chạy thật** — luôn quét toàn file và chạy `window.__digest24k1.selfTest()` trước/sau khi sửa.
- Tiến trình lưu qua nhiều khoá `localStorage`: `mxb_level_unlocked`, `mxb_coins`, `mxb_owned_tileskins`/`mxb_owned_boardskins`, `mxb_active_tileskin`/`mxb_active_boardskin`, `mxb_booster_reroll`/`mxb_booster_hint`, `mxb_quest_state`, `mxb_checkin_state`.
- Harness Node.js độc lập (`engine-core.mjs`/`validate-level.mjs`) vẫn dùng được để giải/verify level hàng loạt ngoài trình duyệt.

## 11. Hiện trạng dự án

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
| Dọn dead-code | Đang tiếp diễn (nhiều phiên song song), chưa có mốc hoàn tất chính thức |

## 12. Việc tồn đọng / cần xác nhận

- **Playtest thật** để đối chiếu đường cong độ khó lý thuyết (mục 4) với cảm giác chơi thật, đặc biệt đoạn Lv49→50.
- Theo dõi % người chơi mua được cosmetic đầu tiên trước khi hết Chương 1, để tinh chỉnh lại nếu công thức Xu quá hào phóng/keo kiệt so với thiết kế.
- Đồng bộ art pass giữa các màn hình phụ (Cửa hàng/Chủ Đề/Nhiệm vụ) với gameplay chính — một collaborator đang làm dở phần này (palette tối→sáng cho modal Chủ Đề).
- Đợt dọn dead-code đang diễn ra song song — nên re-run self-test sau mỗi đợt trước khi coi bản build là ổn định.
- Chưa chốt platform phát hành → chưa cắm SDK ads thật.

## 13. Đảo ngược so với bản GDD 08-24 (đọc kỹ trước khi dùng bản cũ làm tham chiếu)

| Nguyên tắc "đã chốt" trong bản 08-24 | Thực tế hiện tại |
|---|---|
| "Không giới hạn nước đi" | Move Limit tồn tại thật, 1–10 tuỳ màn (mục 3.6) |
| "Không vật phẩm hỗ trợ (booster)" | Booster là cơ chế thật, kho dùng chung + mua gói (mục 3.7) |
| "Không hiển thị điểm số" | Điểm hiện trực tiếp trong HUD (mục 5) |
| "Monetization đã chốt: Ads-only, không IAP" | Có hẳn 1 hệ kinh tế Xu + Cửa hàng cosmetic song song với Ads (mục 6) — không phải IAP tiền thật, nhưng là 1 currency loop đầy đủ mà bản 08-24 không hề có |
| "Quy mô đã chốt: 30 level / 3 chương hiển thị" | 50 level / 5 chương |
| Tutorial riêng ngoài `P24M_LEVELS`, truy cập qua nút "?" | Đã gỡ, onboarding gộp hẳn vào Level 1 thật (mục 3.10) |
| "Không thêm cơ chế lõi mới" (phạm vi Tuần 3–4) | Lock, Điểm, Kinh tế Xu, Nhiệm vụ, Chủ Đề đều là cơ chế mới thêm sau mốc đó |

Không có bằng chứng nào cho thấy các đảo ngược này là ngoài ý muốn — mỗi thay đổi đều đi kèm self-test riêng và được nhiều phiên làm việc xác nhận độc lập. Coi đây là **quyết định thiết kế đã cập nhật**, không phải lỗi lệch khỏi spec cũ.

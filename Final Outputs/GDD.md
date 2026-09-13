# GDD Tổng Hợp — Mahjong × Block (Final Core)
---

## 1. Tổng quan

**Thể loại:** Puzzle ghép khối (block-drop) hybrid mạt chược (mahjong tile-matching), chơi trên trình duyệt, 1 file HTML tự chứa.
**Hook cốt lõi:** Thả một khối nhiều-ô (polyomino) xuống bàn cờ vuông N×N; mỗi ô của khối *tự rơi độc lập* xuống tầng thấp nhất còn trống của cột đó (bàn có tối đa 2 tầng).  Hai quân **cùng mặt, cùng tầng, kề cạnh nhau, và đang lộ mặt (không bị quân khác che ở trên)** sẽ Match và biến mất, kéo theo quân ở mái rơi xuống sàn nếu sàn vừa trống — có thể tạo phản ứng dây chuyền (cascade) nhiều đợt (wave) trong cùng 1 lượt đặt.

**Vì sao khác Mahjong Solitaire / Match-3 thường:** người chơi chủ động chọn NƠI đặt khối (không phải chọn 2 quân có sẵn để ghép), nên việc "che một quân để khoá nó rồi tự tay lộ lại đúng lúc" là một quyết định chiến thuật thật, không phải may rủi.

**Nền tảng:** web game mobile tỉ lệ màn hình dọc 9:16

**Phong cách hình ảnh:** Trung Hoa cổ — cổng tre, mái ngói cong, đèn lồng, vân gỗ/tre, quân mạt chược.

---

## 2. Core loop

### 2.1 Bàn chơi 2 tầng
- Bàn hình vuông, kích thước `size×size` khai báo riêng theo từng level - Scope hiện tại: Min 2x2 - Max 6x6
- Mỗi ô (cell) chứa tối đa 2 quân chồng: tầng 0 (sàn) và tầng 1 (mái). Một khối chỉ có thể thả nếu MỌI ô nó chiếm đều còn ít nhất 1 tầng trống (không "full") và không bị chặn (xem mục 4).
- Mỗi ô-con của khối rơi độc lập: nếu sàn trống → rơi tầng 0; nếu sàn đã có quân → rơi tầng 1 (mái). Điều này cho phép 1 khối phủ nhiều độ cao khác nhau cùng lúc trên các cột khác nhau 
- Sau khi quân ở mái bị Match/biến mất, quân sàn cùng cột **không tự trồi lên tầng 1** — tầng vẫn giữ nguyên vị trí z; việc "rơi" chỉ áp dụng cho quân MỚI được thả, không dịch chuyển lại quân cũ.

### 2.2 Khối & hàng đợi Current/Next
- Người chơi chỉ thấy và điều khiển **1 khối tại một thời điểm** ("Current"), cộng 1 ô xem trước ("Next") — không phải khay 3-6 ô như bản nháp đầu tiên của dự án.
- Thư viện hình khối (polyomino), định nghĩa qua các hàm `P24K_PIECE`:
  - **Domino (2 ô):** ngang (`K_DOMINO_H`), dọc (`K_DOMINO_V`).
  - **Tromino (3 ô):** 4 biến thể góc L (`P24M_L3`, `L3B`, `L3C`, `L3D`) + thẳng ngang/dọc (`P24M_I3H`, `I3V`).
  - **Tetromino (4 ô):** hình vuông O (`P24M_O4`), chữ T (`P24M_T4`), chữ S (`P24M_S4`), chữ L (`P24M_L4`).
  - **Pentomino (5 ô):** hình cộng (`P24M_PLUS5`), chữ L dài (`P24M_L5`).
  - Kích thước khối tối đa 5 ô/khối (self-test `piece_size_within_cap` khoá cứng quy tắc này).
- Mỗi khối trong `sequence` của level được TÁC GIẢ SOẠN TAY theo đúng thứ tự cố định (deterministic) — không random khi chơi bình thường (xem mục 6 về ngoại lệ generative, hiện chưa dùng trong 50 level chính).
- Luật "không tự match sẵn trong khối": mọi khối ≥2 ô kề nhau cùng mặt sẽ tự động Match ngay khi vừa rơi xuống — coi là lỗi thiết kế NẾU xảy ra ngoài ý muốn, nên self-test `no_baked_self_match` bắt buộc mọi khối (trừ khối đầu tiên của Level 1 — cố ý làm domino tự-match để dạy luật ngay từ cú chạm đầu tiên) không được tự chứa 2 ô kề cùng mặt.

### 2.3 Luật Match
- Match xảy ra khi 2 quân **cùng id mặt, cùng tầng (z), kề cạnh trực tiếp (không chéo), và đang lộ mặt** (đang ở tầng 1, hoặc ở tầng 0 mà tầng 1 cùng ô đang trống).
- Một nhóm liên thông ≥2 quân cùng mặt cùng tầng sẽ Match cùng lúc trong 1 "wave" (không chỉ ghép cặp 2-2)
- Sau khi 1 wave clear, quân mái phía trên rơi xuống sàn nếu sàn cùng cột vừa trống → có thể tạo Match mới ngay lập tức → wave tiếp theo tự động resolve (cascade). Số wave liên tiếp trong 1 lượt đặt được lưu vào `S.chainBest` (chuỗi dài nhất), dùng để cộng điểm và cho quest `chain2`.
- Quân ở tầng 0 bị quân khác che ở tầng 1 **không được tính là "đang lộ"**, dù cùng mặt kề nhau vẫn KHÔNG match (self-test `covered_bottom_is_ignored`, `cross_height_pair_is_ignored`).

### 2.4 Giới hạn lượt đi & điều kiện thua
- `moveLimit` (số nguyên, khai báo theo từng level) là số lượt đặt khối tối đa; nếu level không khai báo, coi như vô hạn (`Infinity`).
- **Thua khi:**
  1. Hết lượt (`S.movesLeft<=0`) mà goal chưa đạt → "HẾT LƯỢT ĐI" (`lose_moves_title`).
  2. Không còn ô nào hợp lệ để đặt khối hiện tại trong giới hạn 2 tầng, dù còn lượt → "HẾT CHỖ ĐẶT" (`lose_nospace_title`) — đây là điều kiện "bí nước" thật, khác điều kiện hết lượt.
- Cả 50 level chính thức đều có `moveLimit` khai báo (dao động 1–8 lượt), và self-test `every_move_limit_fits_its_solution` đảm bảo lời giải tác giả soạn luôn nằm trong đúng giới hạn đó (không có level nào "không thể thắng nổi").

### 2.5 Booster (Đổi khối / Hint)
- **Đổi khối (Reroll):** bỏ qua khối hiện tại, lấy khối kế tiếp trong `sequence` lên thay - không tiêu tốn Move Limit
- **Hint:** tự giải bàn từ đúng trạng thái hiện tại bằng bộ giải DFS trực tiếp trên live model (`p24kTrySolveLive`/tương đương `p24qTrySolveFrom`), highlight đúng ô nên đặt tiếp theo — cũng không tốn lượt.
- **Kho dùng chung toàn game** (không cấp riêng theo từng level nữa, không reset khi qua màn): người chơi mới có sẵn 5 lượt Đổi khối + 5 lượt Hint, lưu ở `localStorage` (`mxb_booster_reroll`, `mxb_booster_hint`), nạp thêm qua Cửa hàng (xem mục 7).
- **Ngoại lệ Level 1:** cố ý khoá cả 2 booster về 0 bất kể kho chung còn bao nhiêu, để dạy luật cơ bản trước khi phát công cụ hỗ trợ.

---

## 3. Mục tiêu màn chơi (Goal Types)

Mỗi level khai báo đúng 1 trong 4 `goalType`. Thống kê thực tế trên 50 level:

| goalType | Số level | Điều kiện thắng |
|---|---|---|
| `TILE_QUOTA` | 12 | Tổng số quân đã phá (mọi mặt cộng dồn) ≥ `tileGoal`. Không yêu cầu mặt cụ thể. |
| `TARGET_FACE` | 29 | Mỗi mặt trong `winTargets` (vd `{id:'s1',need:4}`) phải đạt đủ số lượng RIÊNG của nó. Nếu level có `targetRequiredCount`, chỉ cần đạt đủ N/M mục tiêu (không cần tất cả — vd "3 trong 4 mặt"). |
| `OPEN_SEAL` | 2 | Mở đủ Phong Ấn (xem mục 4) — không cần phá thêm gì sau khi mở. |
| `BURIED_TARGET` | 7 | Về mặt luật, xử lý **giống hệt `TARGET_FACE`** (cùng hàm kiểm tra `p24mTargetsMet`) — khác biệt duy nhất là ở CÁCH THIẾT KẾ LEVEL: quân mục tiêu bị chôn dưới Phong Ấn/mái, buộc người chơi phải mở seal hoặc dọn mái trước khi chạm được mục tiêu. Đây là nhãn thiết kế (design label), không phải nhánh luật riêng trong engine. |

*(Thay đổi lớn so với các bản trước: `OPEN_SEAL` giảm mạnh 6→2 — hầu hết màn Seal giờ chỉ là rào chắn phụ trong 1 goal `TARGET_FACE`/`BURIED_TARGET` lớn hơn, không còn tự nó là goal; `TILE_QUOTA` tăng gấp đôi 6→12.)*


---

## 4. Cơ chế chặn ô (Blockers)

Hàm `p24kCellBlocked()` kiểm tra theo đúng thứ tự ưu tiên sau (ô có thể bị chặn bởi nhiều lý do cùng lúc):

1. **Ô Chắn / Permanent (`level.permanents`)** — chặn vĩnh viễn, không bao giờ mở, không phụ thuộc điều kiện gì. Dạy khái niệm "định tuyến quanh vật cản" (routing). Dùng trong **31/50 màn**, xuất hiện đầu tiên ở Lv11.
2. **Phong Ấn / Seal (`level.seals`, mỗi entry `[r,c,required]`)** — **[Luật hiện tại, đã chốt lại sau 2 lần đổi]** mỗi ô Seal có ngưỡng `required` **riêng của chính nó** (không dùng chung 1 số cho cả màn), mở khi tổng số **CẶP bất kỳ đã Match ở bất kỳ đâu trên bàn** (`S.pairs`, cộng dồn toàn màn, không cần khác mặt nhau, không cần match xảy ra kề sát ô Seal) đạt đủ ngưỡng đó. Bộ đếm dùng chung `S.pairs` — không có state "kề sát" riêng. Vẫn mở đúng 1 lần, chỉ sau khi 1 cascade đã settle hoàn toàn. Dùng trong **24/50 màn**, xuất hiện đầu tiên ở Lv21.
   - *(Lịch sử: từng có 1 giai đoạn ngắn đổi sang luật "phải match kề sát ô Seal" — đã bị revert, không còn trong code hiện tại; không nhầm với ghi chép cũ.)*
3. **Khóa / Lock (`level.locks`, mỗi entry `{cells, face, required}`)** — giống Phong Ấn nhưng **theo từng NHÓM Ô riêng biệt**, gắn với ĐÚNG 1 mặt cụ thể + số lượng cần (đếm số TILE của đúng mặt đó qua `targetCounts`, khác Seal đếm CẶP bất kỳ mặt), hiển thị rõ ràng trên ô (không mờ như Seal). Dùng trong **19/50 màn**, xuất hiện đầu tiên ở Lv31.
   - **Lock 2 giai đoạn (`lock.after`)**: engine hỗ trợ 1 Lock yêu cầu mở 1 Lock khác trước (`lock.after={face,required}`, xem `p24kLockMet()`) — đã cài đặt xong nhưng **hiện 0/50 màn dùng field này** (đã thử ở Lv33/Lv35 rồi bị thiết kế lại, gỡ field).
   - **13 màn kết hợp cả 3 cơ chế cùng lúc**: Lv33, 38, 39, 40, 41, 42, 44, 45, 46, 47, 48, 49, 50.

Bảng phân biệt nhanh 3 loại chặn:

| Cơ chế | Điều kiện mở | Phạm vi | Mở lại được? |
|---|---|---|---|
| Ô Chắn | Không bao giờ mở | Ô đơn | Không |
| Phong Ấn | Đủ N cặp bất kỳ (không cần khác mặt, không cần kề sát), N riêng từng ô | Từng ô Seal riêng, ngưỡng chung 1 bộ đếm `pairs` | 1 lần, vĩnh viễn sau đó |
| Khóa | N quân của 1 mặt cụ thể (không cần kề sát) | Từng nhóm ô riêng | 1 lần/nhóm, vĩnh viễn sau đó |

## 5. Nội dung 50 level

- **Cấu trúc:** 5 chương × 10 level = 50 level (`chapters()` tính động theo `P24M_LEVELS.length`, không hard-code "30 level" nữa). UI hiện tại KHÔNG còn chia tab/vuốt ngang theo chương — toàn bộ 50 level nằm trong 1 danh sách cuộn dọc duy nhất, tự cuộn tới đúng level đang mở khi vào màn.
- **Đường cong dạy (lesson):** mỗi level có field `lesson` (mô tả bài học bằng tiếng Anh, dùng nội bộ/debug) và tuỳ chọn `teach` (mô tả ngắn cho người chơi). Không có mô tả cơ chế bằng lời trong overlay bắt đầu/thắng/thua nữa — việc DẠY hoàn toàn dựa vào bàn tay hướng dẫn (`guideMoves`, chỉ Level 1) và tự chơi mà hiểu.
- **Chỉ Level 1** có `guideMoves>0` (bàn tay 👆 hướng dẫn chạm đúng ô) — mọi level khác đặt `guideMoves:0` (đã cố ý gỡ bỏ auto-guide highlight khỏi mọi level trừ Lv1).
- **Phân bố goalType theo 50 level:** xem bảng mục 3.
- **Lộ trình chương (đọc từ tiêu đề + lesson thực tế; đổi thứ tự 11/09/2026 theo yêu cầu người dùng — Ô Chắn dạy TRƯỚC Phong Ấn, ngược lại thứ tự cũ):**
  - **Ch1 (Lv1-10):** nền tảng — 1 khối/lượt, gravity 2 tầng, đọc Current/Next, giới thiệu mặt thứ 4/5.
  - **Ch2 (Lv11-20):** giới thiệu Ô Chắn (Permanent) — cơ chế đơn giản hơn ("ô này không bao giờ mở"), dạy trước.
  - **Ch3 (Lv21-30):** giới thiệu Phong Ấn (Seal, luật kề-sát mới) — cơ chế phức tạp hơn (ngưỡng N mặt khác nhau + ràng buộc không gian), dạy sau khi người chơi đã quen "vật cản".
  - Thực tế mốc chương chỉ là "cứ 10 level một nhóm" để hiển thị số ("màn X/50"), KHÔNG còn quyết định nội dung dạy — nội dung dạy trải không đều  - 
- **Độ khó biến thiên:** `moveLimit` dao động 1–10; kích thước bàn 2×2 đến 6×6 — **toàn bộ Lv46-50 đều là board 6×6** (đợt nâng cấp gần nhất, mật độ Ô Chắn/Seal/Lock và move limit cũng tăng theo cho cả 5 màn này so với phần còn lại của game).


---

## 6. Bộ máy sinh khối ngẫu nhiên (chưa dùng trong nội dung chính thức)

Engine hỗ trợ 2 kiểu nguồn khối KHÔNG cố định, cả hai đều đi qua 1 "cổng chống-random-ăn-gian" (reroll-gate, bounded-DFS `p24qTrySolveFrom`): khối rút ra chỉ được CHẤP NHẬN nếu bàn sau đó CHỨNG MINH ĐƯỢC vẫn còn đường thắng; nếu không khối nào qua nổi sau `queueRerollBudget` lần thử, dùng khối dự phòng bắt buộc (`queueFallback`).

- **Queue Pool** (`level.queuePool`): rút khối đã ghép sẵn, có trọng số, từ 1 danh sách hữu hạn tác giả soạn.
- **Random Shapes + Random Faces** (`level.randomShapes` + `level.randomFaces`): sinh khối HOÀN TOÀN ngẫu nhiên — cả hình dạng lẫn từng mặt tile đều rút ngẫu nhiên có trọng số.


- Bộ test này được sinh + đo độ khó bằng script riêng `gen_test_levels.js`: mô phỏng 30 lượt chơi/level bằng 1 bot "greedy-match-hoặc-nước-đi-hợp-lệ-đầu-tiên" (naive). Chương A-C và E đạt tỉ lệ qua màn 93–100% với bot đó; chương D (khó nhất, Seal #6-10 kết hợp `pairGoal` 2-4 trên bàn 4×4) chỉ 33–77% — KHÔNG phải lỗi có-thể-thắng-được (cổng reroll-gate vẫn luôn chứng minh còn đường thắng ở mỗi bước), mà là bằng chứng các level đó cần chơi có chủ đích hơn 1 bot ẩu.

---

## 7. Kinh tế Xu & Cửa Hàng
### 7.1 Kiếm Xu
Công thức thắng màn (`computeWinCoins()`):
- Sàn: `round(10 × ln(level + 3))` — tăng nhanh ở màn đầu (~11 Xu ở Lv1), chậm dần, chạm ~40 Xu ở Lv50.
- **Không có bonus lượt dư** (đã bỏ hẳn — hàng đợi khối định trước, "dư lượt" nhiều lúc chỉ là đợi đúng mặt Mahjong cần để Match, không phải chơi giỏi hơn).
- `+15 Xu` nếu thắng mà KHÔNG dùng mất booster nào so với lúc bắt đầu màn.
- `×2` ở mọi level chốt chương (level thứ 10, 20, 30, 40, 50).
- Chơi lại 1 level đã từng qua (`firstClear=false`) → **0 Xu** (không phải 20% như comment code ghi — đọc thẳng code: `if(!firstClear) return 0;`, không cào Xu vô hạn bằng cách chơi lại level dễ).
- Người chơi tệ nhất (luôn hết booster, 0 lượt dư) vẫn gom đủ ~899 Xu tới màn 30 — đúng bằng giá skin rẻ nhất.

### 7.2 Cửa hàng (3 tab)
- **Quân Bài — 12 skin tile** (giá quy đổi hệ số ×5.967 so với bản gốc, mốc neo skin rẻ nhất = 895 Xu):
  Ngà nguyên bản (0, mặc định), Ngọc Bích (895), Mực Đen (1195), Hổ Phách (1490), Thập Nhị Chi (1910), Muông Thú (1670), Tứ Quý Trái Cây (1550), Bài Tây — hiện chất bài Tây ♠♥♦♣ (1790), Hoa Sen (1730), Biển Cả (1610), Trân Bảo (2265), Tứ Thời (1850).
- **Bàn Cờ — 11 skin bàn:** Gỗ nguyên bản (0, mặc định), Tre Trúc (1195), Đá Xanh (1790), Ngọc Bích Hoàng Cung (1670), Sơn Mài Đỏ (1550), Giấy Hoa Tiên (1315), Sứ Men Lam (1790), Vườn Anh Đào (1550), Điện Rồng Vàng (2150), Ánh Trăng Đêm (1430), Trà Quán (1195).
- **Nâng Cấp:** mua thêm gói 5 lượt Booster (Đổi khối HOẶC Hint), giá cố định 100 Xu/gói, cộng thẳng vào kho dùng chung (không phải "cấp" vĩnh viễn kiểu bậc thang).
- Mọi skin đều thuần cosmetic (đổi ảnh/CSS filter, không đổi ảnh gốc TILE_IMG, không đổi luật).
- Preview thật trong popup chi tiết: render bằng đúng `tileHTML()`/biến CSS game dùng, không phải ảnh giả.

---

## 8. Vòng lặp gắn kết dài hạn (Nhiệm vụ & Điểm danh)

Ngồi TRÊN Economy, dùng lại đúng `addCoins`/`setBoosterReroll`/`setBoosterHint` có sẵn — không có kho tiền/booster riêng, không đổi luật thắng/thua. Ngày xác định theo local date máy (`YYYY-MM-DD`), không cần server.

### 8.1 Nhiệm Vụ Hàng Ngày
- Chọn **3 trong 6** nhiệm vụ mẫu, XÁC ĐỊNH theo ngày (seed từ chuỗi ngày qua 1 LCG rẻ tiền — cùng ngày luôn ra đúng 3 nhiệm vụ đó dù mở lại trang/modal nhiều lần, không random lại mỗi lần mở):
  | Nhiệm vụ | Mục tiêu | Thưởng |
  |---|---|---|
  | Thắng 1 màn hôm nay | 1 | 20 Xu |
  | Ghép đủ 6 cặp (cộng dồn mọi màn hôm nay) | 6 | 20 Xu |
  | Dùng 1 lượt Đổi khối hoặc Hint | 1 | 1 Đổi khối + 1 Hint |
  | Phá 1 Phong Ấn | 1 | 25 Xu |
  | Thắng 1 màn không dùng Booster nào | 1 | 30 Xu |
  | Tạo chuỗi dây chuyền ≥2 wave | 1 | 25 Xu |
- **Mốc quà theo số nhiệm vụ hoàn thành trong ngày** (độc lập với thưởng từng nhiệm vụ, tính theo "đã đạt target" chứ không cần đã nhận): hoàn thành 1 nhiệm vụ → 15 Xu; 2 nhiệm vụ → 25 Xu + 1 Đổi khối; cả 3 → 40 Xu + 1 Đổi khối + 1 Hint.

### 8.2 Điểm Danh 30 Ngày
- Mô hình **CỘNG DỒN**, không phải streak-mất-trắng khi lỡ ngày — bỏ lỡ 1 ngày chỉ đơn giản không mở thêm ô, không mất tiến độ đã có.
- Mỗi ngày thắng ≥1 màn → mở khoá đúng 1 ô kế tiếp (1..30) để nhận; hết ô 30 thì vòng mới bắt đầu lại từ ô 1.
- Thưởng bậc thang: ngày <10 → 10 Xu (15 Xu nếu ngày chia hết 5, +1 Đổi khối); ngày 10-19 → 15 Xu nền; ngày 20-29 → 20 Xu nền. Mốc lớn override hẳn công thức: **Ngày 10** = 60 Xu + 3 Đổi khối + 3 Hint; **Ngày 20** = 100 Xu + 5 + 5; **Ngày 30** = 200 Xu + 8 + 8.
- Việc "đủ điều kiện" (thắng ≥1 màn hôm nay) và việc "bấm nhận" tách rời — không tự động cộng Xu sau lưng người chơi.

---

## 9. Giao diện & Trải nghiệm

### 9.1 Danh sách màn hình
- **Menu chính** — cổng tre lớn chiếm gần hết màn, chạm nắm cửa (đã tách 2 nửa theo cánh cửa khi mở) để vào game; lá rơi trang trí, đèn lồng 2 bên.
- **Chọn Level** — 1 danh sách cuộn dọc duy nhất (đã bỏ chia chương/vuốt ngang), mỗi level là 1 "cổng" nhỏ hiện goal, khoá/mở theo tiến trình, tự cuộn tới level hiện tại khi mở.
- **Trong game** — HUD (Level/Điểm/Lượt) + dải Goal riêng (tách khỏi HUD) + Khay (Current/Next) + Bàn + 2 nút Booster.
- **Cửa Hàng** — vào/ra bằng cửa cuốn gỗ kéo dọc (khác 2 cánh cửa tre kéo ngang ở nơi khác), giao diện "sạp hàng Trung Hoa cổ" (mái ngói cong, biển hiệu treo, 2 cột gỗ, kệ hàng phân tầng như "ô kệ" lõm).
- **Tủ Đồ (Wardrobe/Theme)** — đổi nhanh skin ĐÃ SỞ HỮU, mở từ menu, dùng chung dữ liệu/preview với Cửa Hàng.
- **Nhiệm Vụ & Điểm Danh (modal)** — 2 tab.
- **Cài đặt (modal)** — nhạc/hiệu ứng (2 thanh trượt riêng)/rung/ngôn ngữ.

### 9.2 Khoá tỉ lệ khung hình
Toàn bộ game bọc trong `#app-frame` cố định tỉ lệ 16:9 (ngang)/9:16 (dọc), canh giữa; phần dư để lộ nền gỗ của `<body>` làm viền đen 2 bên (letterbox) thay vì kéo giãn méo hình. Cuộn trang chuyển hẳn vào 1 lớp con `#app-scroll` riêng để các nút `position:fixed` (back/settings...) neo đúng theo khung chứ không theo viewport thật.

### 9.3 Vật liệu & màu mặc định
- Bàn cờ mặc định đổi hẳn sang **gỗ thật** (trước là tông xanh lục dù nhãn ghi "gỗ"). Vân gỗ/tre dùng chung 1 biến CSS (`--tex-wood`/`--tex-bamboo`), phủ thêm 2 lớp lệch góc nhẹ + 1 dải sáng chéo mô phỏng ánh đèn để tránh cảm giác "vân kẻ" lặp đều giả tạo.
- HUD: Goal tách hẳn thành `#goal-strip` riêng (full-width, phía trên bàn) thay vì nhồi chung 1 hàng với Level/Điểm/Lượt/Khoá — tránh Goal (phần tử cuối) bị đẩy lỏi/che khuất ở màn hình dọc hẹp.

### 9.4 Onboarding
- Chỉ **Level 1** có "bàn tay hướng dẫn" (👆) — hoạt ảnh lặp vô hạn di chuyển từ khối Current tới đúng ô cần thả, tôn trọng `prefers-reduced-motion` (đứng yên tại ô đích thay vì lượn qua lại nếu người dùng bật giảm chuyển động). Mọi level khác không có hướng dẫn tự động nào — dạy hoàn toàn qua việc tự chơi.

---

## 10. Âm thanh, Haptic, Đa ngôn ngữ

### 10.1 Âm thanh
- **Hiệu ứng gameplay (`sfx.*`: place/pop/reveal/sealOpen/target/win/lose...) đều là WebAudio tổng hợp trực tiếp bằng code** (`beep()`, `playWoodTile()`, `playMatchSfx()` — oscillator + gain envelope, không phải sample thu âm), chạy trên 1 `AudioContext` riêng. *(Có 2 định nghĩa `const sfx=` trong file do lịch sử phát triển nhiều lớp — chỉ định nghĩa CUỐI xuất hiện trong file là bản đang chạy thật, xem quy tắc ở `04-GDD-FINAL-CORE-MASTER.md` B1.)*
- **Nhạc nền** dùng 1 track base64 nhúng thẳng trong file (giữ đúng ràng buộc "1 file HTML tự chứa"), chạy trên `AudioContext` riêng biệt hoàn toàn với sfx — không cái nào làm giảm âm lượng cái kia.
- Tiếng "cạch" gỗ cho MỌI nút bấm UI (menu/chọn màn/shop/game) tổng hợp riêng qua 2 lớp: noise ngắn qua bandpass ~1.6kHz (tiếng va chạm bề mặt) + 1 tone sine trầm đổ nhanh (cộng hưởng thân gỗ), chạy trên `AudioContext` thứ 3 riêng (`__clickAc`) — có công tắc bật/tắt riêng đồng bộ với công tắc Âm thanh chung.
- 2 thanh trượt âm lượng ĐỘC LẬP trong Cài đặt: Nhạc nền / Hiệu ứng.

### 10.2 Haptic (rung)
- `window.HAPTIC = {place:12, match:22, matchBig:[18,25,22]}` (đơn vị ms, dùng `navigator.vibrate`), công tắc bật/tắt riêng, độc lập với công tắc Âm thanh.

### 10.3 Đa ngôn ngữ (i18n)
- 3 ngôn ngữ đầy đủ: **Việt (mặc định) / English / 中文**, áp dụng cho toàn bộ text tĩnh (`data-i18n`) lẫn text động đã render (win/lose/quest/checkin...). Chuyển ngôn ngữ đổi ngay lập tức, không cần tải lại trang.

---

## 11. Kiến trúc kỹ thuật

### 11.1 Cấu trúc file
- **1 file HTML duy nhất, tự chứa hoàn toàn** (~6.85MB): không gọi asset ngoài khi chạy — kể cả 42 mặt quân mạt chược (ảnh chụp thật, 2 bộ TILE_IMG/TILE_IMG_BLOCK) lẫn toàn bộ audio đều nhúng base64 trực tiếp trong file (đây là phần chiếm dung lượng lớn nhất — 1 dòng nhạc nền một mình đã ~5.7MB base64).
- **Nhiều tầng engine chồng lên nhau theo lịch sử phát triển**, chỉ tầng cuối cùng thật sự chạy:
  1. Engine gốc cũ nhất (`LEVELS`, `SHAPES`, `S`, `simulate()`...) — prototype "Match 2 & Phá Ấn" 8 màn đầu tiên của dự án. Riêng phần này vẫn còn nguyên trong file (chưa dọn — rủi ro nợ kỹ thuật còn lại, xem mục 12); các bản khai báo `function win/lose/startLevel/goalState/levelWon/showPreview/clearPreview/renderKhay(){}` của tầng này chỉ giữ vai trò "chỗ trống" (binding) bắt buộc để 2 tầng sau gán đè lên — không xoá được nếu không viết lại toàn bộ theo kiểu khai báo biến thường.
  2. `P24K_LEVELS` — 1 bộ 10 level tiếng Việt cũ hơn ("24K V2", pairGoal, không có moveLimit/booster/goalType). **Đã dọn (07/09/2026):** các phần GÁN ĐÈ của tầng này (`win=`, `lose=`, `startLevel=`, `goalState=`, `levelWon=`, `showPreview=`, `clearPreview=`, `renderKhay=`) cùng với self-test/`window.__digest24k` riêng và lệnh `startLevel(...)` tự chạy khi nạp trang (gây "chớp" 1 màn hình sai trước khi engine thật vẽ đè lên) đã bị xoá — chỉ giữ lại `renderBoard`/`renderTray`/`renderHUD`/`renderAll`/`intakeCap`/`refillTray`/`makePiece` (những cái KHÔNG bị gán đè lại ở tầng 3 nên vẫn đang là bản thật sự chạy) và `p24kFreshModel`/`p24kModelDrop`/`p24kRunSolution` (giữ nguyên khai báo rỗng-tác-dụng vì tầng 3 cần đúng cái tên này để gán đè lại).
  3. **Tầng thật sự chạy:** 1 IIFE cuối file GÁN LẠI (`win=function(){...}`, `lose=function(){...}`, `startLevel=function(){...}`, `goalState=function(){...}`, `place=p24kPlace`, `p24kRunSolution=function(){...}`) đè lên các tên hàm/biến toàn cục đã khai báo ở tầng 1, biến chúng thành engine P24K/P24M thật sự đang chơi (2 tầng gravity, moveLimit, booster, Khóa, 50 level).
  - Tầng 1 (prototype gốc, ~1000 dòng) vẫn còn nguyên — dọn tiếp cần viết lại cách khai báo các biến `win/lose/startLevel/...` (vd sang `let` thay vì `function`) để bỏ hẳn phần thân cũ mà không phá binding cho tầng 3; chưa làm trong đợt này vì rủi ro cao hơn lợi ích, xem mục 12.
- **Level Editor** (`Final Core/level-editor.html`, file riêng): thao tác kéo-thả trực quan (di chuyển tile, dán khối, sắp xếp lại sequence, quét vùng vẽ nhanh Seal/Ô Chắn/Khóa), chế độ playtest mô phỏng đúng luật, và tính năng sinh level bằng mô tả ngôn ngữ tự nhiên (AI) kèm auto-solver kiểm tra giải được trước khi playtest tay.

### 11.2 Lưu trữ (localStorage keys)
`mxb_coins`, `mxb_owned_tileskins`, `mxb_owned_boardskins`, `mxb_active_tileskin`, `mxb_active_boardskin`, `mxb_booster_reroll`, `mxb_booster_hint`, `mxb_level_unlocked`, `mxb_quest_state`, `mxb_checkin_state`, `mxb_sound`, `mxb_music_vol`, `mxb_sfx_vol`, `mxb_haptic`, `mxb_lang`.

### 11.3 Tự kiểm (self-test) & công cụ QA
- `window.__digest24k1.selfTest()` chạy ~33 assertion mỗi khi tải trang (dev), bao gồm: đúng 50 level, mọi khối là polyomino hợp lệ (2-5 ô), không khối nào tự-match sẵn (trừ Lv1), luật match nhóm 3/4 quân, gravity chọn đúng tầng thấp nhất, quân bị che không match, Ô Chắn/Phong Ấn/Khóa chặn đúng luật, mọi level có Seal đều thật sự mở được trong lời giải tác giả, mọi `moveLimit` đủ chỗ cho lời giải, và quan trọng nhất — **`all_solutions`: lời giải tác giả soạn cho cả 50 level đều thắng được dưới đúng luật hiện tại** (chạy lại mỗi khi luật thay đổi để bắt sớm level nào bị "gãy" theo).
- **✅ Cập nhật 13/09/2026: `ok === true` (33/33 check)** — 3 màn Lv40/Lv42/Lv46 từng fail `every_seal_level_opens_in_its_own_solution`/`all_solutions` (solution rỗng/`sequence` rỗng khiến rút quân ngẫu nhiên/goal không khả thi) đã được vá, xem root-cause chi tiết từng màn ở `08-GDD-LEVEL-DESIGN.md` §1. Đã xác nhận qua `runSolution(39)`, `runSolution(41)`, `runSolution(45)` (0-indexed) và `check_all_solutions` trên cả 50 level.
- Bộ test riêng cho chế độ generative: `gen_test_levels.js` (30 lượt chơi mô phỏng/level bằng bot naive) — xem mục 6.
- Playwright + script chụp màn hình (`tmp/ls-shot*.mjs`) để kiểm tra UI trực quan ở nhiều kích thước màn hình, thay cho test tay từng lần sửa giao diện.
- Tiện ích debug qua URL: `?level=N` (mở thẳng level N), `?unlockAll=1` (mở khoá mọi level), `?genTest=1`/`?genTest=0` (bật/tắt bộ 50 level generative test).

---

## 12. Vấn đề mở / điểm cần quyết định

- **Tầng 1 (prototype gốc "Match 2 & Phá Ấn", ~1000 dòng) vẫn còn nguyên trong file** — đã dọn xong phần gán-đè lãng phí của tầng 2 (mục 11.1), nhưng tầng 1 vẫn là nợ kỹ thuật: nội dung không còn chạy (bị tầng 2/3 gán đè), song phần khai báo `function` của nó vẫn bắt buộc phải tồn tại làm chỗ trống cho các tầng sau. Dọn tiếp cần đổi cách khai báo (vd `let win;` thay vì giữ nguyên thân hàm cũ) — chưa làm vì rủi ro/công sức cao hơn lợi ích trong đợt này.
- **Dung lượng file ~6.85MB** (chủ yếu do audio + ảnh tile nhúng base64) trong 1 file HTML duy nhất — câu hỏi về độ mượt khi tải/chơi trên thiết bị yếu vẫn còn để ngỏ (đã nêu ở các weekly note trước, chưa có câu trả lời từ playtest thật).
- **Chế độ generative (Queue Pool / Random Shapes+Faces)** đã được kiểm chứng độ khó bằng bot mô phỏng nhưng CHƯA qua playtest người thật — cần quyết định lộ trình đưa vào bản chính thức hay chỉ giữ làm nội dung thử nghiệm nội bộ (`?genTest=1`).

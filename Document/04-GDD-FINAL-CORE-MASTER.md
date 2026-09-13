# GDD — Mahjong × Block: "Final Core" (24K-1 Top Match Same-Layer)
*Ngày cập nhật: 2026-09-13 · Nguồn duy nhất: `Final Outputs/index.html` (live build) + `Final Outputs/Mahjong_x_Block_Beatchart.xlsx` (từ 13/09/2026 chỉ còn 1 sheet "Level Data" dữ liệu thô, không còn Economy/công thức điểm khó/biểu đồ) — mọi số liệu dưới đây verify trực tiếp từ code đang chạy và dữ liệu 50 level thật, không suy diễn.*

*✅ **Cập nhật 2026-09-13**: `window.__digest24k1.selfTest().ok === true` (33/33 check xanh). 3 màn từng dở dang (Lv40 "Chapter 4 Review", Lv42 "Squeezed", Lv46 "Two Shots") đã được vá: Lv40 thiếu solution (đã dò lại qua engine thật — mấu chốt là phải mở Khóa qua c2 trước vì 2 hàng xóm duy nhất không-permanent của ô hạt giống w1 chính là 2 ô Khóa); Lv42 có `sequence` rỗng khiến engine rút quân ngẫu nhiên từ `queuePool` thay vì cố định (đã khôi phục `sequence` khớp `queuePool`, theo đúng khuôn mẫu Lv37/Lv47); Lv46 có mục tiêu c1 cần 4 nhưng bàn chỉ có đúng 1 hạt giống c1 và không có đường nào tạo cặp thứ 2 trong giới hạn nước đi (đã hạ xuống cần 2, khớp với tên màn "Two Shots"). Toàn bộ đã verify lại qua `runSolution()` + self-test + Excel COM cho Beatchart bên dưới.*

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
| "Không giới hạn nước đi" | Move Limit tồn tại thật, 4–20 tuỳ màn (A1.6) |
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

**A1.4 Match & Cascade** — Match hợp lệ: cùng mặt + cùng tầng + liền kề trực giao (4 hướng, không chéo) + cả hai đang lộ (`p24mIsExposed`: tầng 1 luôn lộ; tầng 0 chỉ lộ nếu tầng 1 cùng ô đang trống). Nhóm liên thông ≥2 quân cùng mặt cùng tầng clear cùng lúc trong 1 "wave" — không giới hạn 2 hay 4 quân, một cụm 5+ quân liên thông vẫn clear trọn vẹn 1 lần nếu tồn tại (dù engine soạn màn hiện tại chưa cố tình tạo cụm >4). Mỗi wave clear cộng `group.length−1` vào `S.pairs` (nhóm 3 quân = 2 "cặp", nhóm 4 = 3 "cặp" — đây là số dùng để mở Seal, xem A1.5).

Vòng lặp cascade sau 1 lượt đặt (giả lập theo `p24kResolveAllModel`):
```
đặt xong toàn bộ ô-con của khối
lặp:
  tìm mọi nhóm liên thông thoả điều kiện match (cùng mặt/tầng/kề/đang lộ)
  nếu không có nhóm nào → dừng lặp (cascade kết thúc, tổng số wave = S.chainBest lượt này)
  clear toàn bộ nhóm tìm được cùng lúc (1 wave) → cộng pairs, cộng điểm (xem A3)
  quân tầng 1 phía trên mỗi ô vừa trống ở tầng 0 rơi xuống tầng 0
  (quân KHÔNG bị dịch chuyển nếu tầng 0 cùng ô chưa từng trống — xem 2.1)
```
Ví dụ cụ thể: bàn có sẵn `s1@(0,0,z0)` bị `w1@(0,0,z1)` che (không match dù kề `s1@(0,1,z0)`). Người chơi thả 1 domino dọc khiến `w1` bị match ở chỗ khác trước, `w1@(0,0,z1)` biến mất → tầng 0 vẫn giữ `s1@(0,0)` tại chỗ (không "trồi lên" vì nó vốn đã ở tầng 0) nhưng giờ đang LỘ → nếu `s1@(0,1,z0)` vẫn còn đó, 2 quân lập tức match ở wave kế tiếp trong cùng lượt đặt — đây chính là cơ chế "che để khoá, lộ lại đúng lúc" nhắc ở mục 0.1.

**A1.5 Ô đặc biệt (3 loại)**

| Cơ chế | Cách mở | Có ở |
|---|---|---|
| Phong Ấn (Seal) | Ghép đủ N **cặp** (bất kỳ, không cần khác mặt nhau), ở bất kỳ đâu trên bàn (không cần liền kề). N là ngưỡng **riêng cho từng ô Seal** (không dùng chung 1 số cho cả màn) — nhiều Seal trên cùng 1 bàn mở ở các mốc khác nhau của cùng bộ đếm `pairs` | 24/50 màn, xuất hiện đầu tiên Lv21 |
| Ô Chắn (Permanent) | Không bao giờ mở, buộc định tuyến | 31/50 màn, xuất hiện đầu tiên Lv11 |
| Lock | Gắn với **đúng 1 mặt cụ thể** + số lượng hiển thị sẵn (đếm số TILE của đúng mặt đó, khác Seal ở chỗ Seal đếm số CẶP bất kỳ mặt nào) | 19/50 màn, xuất hiện đầu tiên Lv31 |

**13 màn kết hợp cả 3 cơ chế cùng lúc** (Permanent + Seal + Lock): Lv33, 38, 39, 40, 41, 42, 44, 45, 46, 47, 48, 49, 50 — tập trung ở C4/C5 như thiết kế.

**Lock 2 giai đoạn (`lock.after`)**: engine đã hỗ trợ Lock yêu cầu mở 1 Lock khác trước (`lock.after = {face, required}`, chỉ mở khi cả điều kiện của chính nó VÀ điều kiện `after` đều đạt — xem `p24kLockMet()` trong code, đã remap qua `P24K1_FACE_MAP` đầy đủ). Tính năng đã cài đặt xong và có self-test-ready, nhưng **hiện tại 0/50 màn dùng field này** (2 màn thử nghiệm trước đó — Lv33/Lv35 — đã bị thiết kế lại và field bị gỡ). Sẵn sàng dùng cho các đợt tăng độ khó sau này.

**A1.6 Move Limit** *(đảo ngược so với 08-24)* — Giới hạn số lượt đặt khối, dao động thực tế **4–20** tuỳ màn (Lv1 thấp nhất với moveLimit 4; Lv19, Lv20 và Lv42 đồng cao nhất với moveLimit 20 — xem bảng đầy đủ 50 màn ở `08-GDD-LEVEL-DESIGN.md` §1.1). Hết lượt chưa đạt goal → thua, tự restart màn đó. Lượt dư ảnh hưởng Điểm (A3) và Xu (A4).

**A1.7 Booster** *(đảo ngược so với 08-24 — kiến trúc mới)* — Đổi khối + Hint là **1 kho lượt dùng chung xuyên suốt cả game**, không reset theo màn. Bắt đầu **5 lượt/loại**; mua thêm qua Cửa hàng: **gói 5 lượt/100 Xu**. **Level 1 luôn khoá booster** dù kho còn bao nhiêu — giữ tinh thần "cú chạm đầu không cần trợ giúp".

**A1.8 Goal type (3 loại)**

| `goalType` | Ý nghĩa | Số màn |
|---|---|---|
| `TILE_QUOTA` | Đạt đủ số quân/cặp Match | 12 (Lv1,2,3,4,5,17,31,34,37,43,44,48) |
| `TARGET_FACE` | N-trên-M: đủ `targetRequiredCount` trong `winTargets`, không cần tất cả | 36 |
| `OPEN_SEAL` | Thắng ngay khi Seal mở | 2 (Lv21, Lv22) |

**[Bỏ 13/09/2026, theo yêu cầu người dùng]** `BURIED_TARGET` (7 màn: Lv20,29,32,38,45,49,50 — target
bị chôn dưới quân/Seal, phải dọn trước) đã bị gỡ khỏi danh sách `goalType`, gộp thẳng vào
`TARGET_FACE` (`goalType:"BURIED_TARGET"` → `goalType:"TARGET_FACE"` trong cả 7 màn). Đây là đổi
**thuần nhãn**, không đổi hành vi engine: `goalState()`/`levelWon()` chưa từng phân nhánh riêng cho
`BURIED_TARGET` (chỉ kiểm tra `TILE_QUOTA`/`OPEN_SEAL` tường minh, mọi giá trị khác — kể cả
`TARGET_FACE` lẫn `BURIED_TARGET` cũ — đều rơi vào cùng logic `winTargets`), nên gộp lại không ảnh
hưởng bất kỳ màn nào (`selfTest().ok` vẫn `true`, 33/33, sau khi đổi). `TARGET_FACE` giờ là loại
chủ đạo áp đảo (36/50 màn), không phải quota đơn giản. **Thay đổi lớn so với các bản trước**:
`OPEN_SEAL` giảm mạnh 6→2 (hầu hết màn Seal giờ đóng vai trò rào chắn phụ trong 1 goal
`TARGET_FACE` lớn hơn, thay vì tự nó là goal), còn `TILE_QUOTA` tăng gấp đôi 6→12. Chỉ còn đúng
**3 loại `goalType`** trong toàn bộ 50 màn.

**A1.9 Onboarding lần đầu** *(đảo ngược so với 08-24)* — Không còn tutorial riêng qua nút "?" (đã ẩn hẳn, xem B4). Onboarding nằm **hoàn toàn trong Level 1 thật**: 1 bàn tay nhấp nháy chỉ đúng ô cần kéo tới, dựa trên `guideMoves`/`solution` của chính Level 1.

**A1.10 Luồng Thắng/Thua** — Thắng: banner `LEVEL N COMPLETE` + dòng phụ **`Điểm N · chuỗi ×N · +N Xu`**. Thua: banner lỗi + tỉ lệ tiến độ, tự restart. Âm thanh WebAudio riêng cho từng sự kiện, hỗ trợ Reduced Motion.

### A2. Nội dung: 50 level / 5 chương

*(Cập nhật 2026-09-13, sau khi user tự tay hoàn thiện toàn bộ 50 màn: thứ tự giới thiệu 3 cơ chế là Ô Chắn (C2, Lv11) → Phong Ấn (C3, Lv21) → Lock (C4, Lv31) — một cơ chế mới mỗi chương. Khác với các bản trước, C4/C5 giờ có mật độ "kết hợp cả 3 cơ chế cùng lúc" rất cao — 13 màn tổng cộng, xem A1.5 — và Lv46-50 đều đã được nâng lên board 6×6 với mật độ Ô Chắn/Seal/Lock và move limit cao hơn hẳn phần còn lại của game.)*

| Chương | Level | Trọng tâm |
|---|---|---|
| C1 — Nền tảng | 1–10 | Core loop: đặt, Match, che–lộ 2 tầng; không có cơ chế chặn nào (thuần TILE_QUOTA/TARGET_FACE) |
| C2 — Ô Chắn | 11–20 | Giới thiệu Permanent ngay Lv11 ("First Blocker"), dùng xuyên suốt cả 10 màn; đây là cơ chế chặn DUY NHẤT trong Ch1+Ch2 |
| C3 — Phong Ấn | 21–30 | Giới thiệu Seal ở Lv21, tăng dần ngưỡng N cặp cần phá mỗi ô Seal (`level.seals[i][2]`, xem 08-GDD-LEVEL-DESIGN.md); Lv30 vẫn là bài thi cuối chương (kết hợp Seal+Ô Chắn) |
| C4 — Kết hợp | 31–40 | Giới thiệu Lock ở Lv31, kết hợp ngay với Ô Chắn + Seal; nhiều màn cuối chương (33, 38, 39, 40) đã là "cả 3 cơ chế cùng lúc" |
| C5 — Mastery | 41–50 | Tổng hợp toàn bộ luật, mật độ cơ chế cao nhất game; **Lv46–50 đều board 6×6**, tăng số Ô Chắn/Seal/Lock và move limit so với phần còn lại — **Lv50 là màn khó nhất toàn game** |

**Đường cong độ khó** — kể từ 13/09/2026, Beatchart (`Mahjong_x_Block_Beatchart.xlsx`) **không còn công thức điểm/quartile tổng hợp**, chỉ còn dữ liệu thô từng màn (cỡ bàn, số nước lời giải, move limit, số Ô Chắn/Seal/Lock, số mặt quân, khối lớn nhất...) để designer tự đọc theo nhu cầu. Số liệu thô trung bình theo chương (cỡ bàn / số nước lời giải / move limit):

| Chương | Cỡ bàn TB | Số nước lời giải TB | Move Limit TB |
|---|---|---|---|
| C1 (1–10) | 4.2×4.2 | 5.5 | 7.1 |
| C2 (11–20) | ~4.7×4.7 | ~6.8 | ~8.0 |
| C3 (21–30) | ~5.1×5.1 | ~7.9 | ~9.2 |
| C4 (31–40) | ~5.4×5.4 | ~9.0 | ~10.5 |
| C5 (41–50) | 5.9×5.9 | 10.4 | 12.6 |

Xu hướng chung là tăng dần đều qua các chương (không có "đỉnh rồi tụt" như công thức điểm cũ từng ngụ ý) — riêng C5 tăng vọt rõ rệt vì cả 5 màn 46–50 đều bị nâng board lên 6×6 và tăng mật độ/move limit theo yêu cầu thiết kế gần nhất. Đây là "hướng dẫn định tính" (độ khó nên tăng dần), không phải quy tắc cứng có ngưỡng số — chi tiết từng màn xem trực tiếp Beatchart hoặc `08-GDD-LEVEL-DESIGN.md` §3.

### A3. Hệ thống Điểm (Score)

Hiện trực tiếp trong HUD ("ĐIỂM", cập nhật sống). Công thức = điểm nền (theo cỡ khối/nhóm match) + 2 lớp:

1. **Hệ số chuỗi**: mỗi wave cascade trong 1 lượt nhân thêm điểm — wave1=×1, mỗi wave sâu +0.25, chặn ×2.
2. **Streak liên tiếp**: lượt nào cũng match thì lượt sau +15×(số lượt liên tiếp, chặn ở 10); đặt hụt reset về 0.

Không đổi luật thắng/thua (`S.pairs`/`levelWon()`) — Điểm là lớp thưởng cảm giác thuần tuý.

**Đã bỏ "Bonus lượt dư" (+25/lượt dư lúc thắng)**: lượt dư không phải tín hiệu kỹ năng đáng tin — hàng đợi khối do tác giả định trước (không random), nên nhiều lúc người chơi buộc phải đặt khối "chờ" vì chưa tới lượt có đúng mặt Mahjong cần để Match, không phải do chơi dở. "Dư nhiều lượt" có thể chỉ phản ánh bố cục màn may mắn hơn là kỹ năng thật.

**Ví dụ tính điểm cụ thể** (minh hoạ cách 2 lớp cộng dồn, không phải công thức chính xác từng hệ số nội bộ — số hệ số thật đọc trực tiếp trong code nếu cần tinh chỉnh): người chơi đang ở streak liên tiếp thứ 3 (3 lượt trước đều match), lượt này đặt 1 khối tạo cascade 3 wave (wave1 clear 1 nhóm, wave2 lộ ra 1 nhóm mới tự match tiếp, wave3 tương tự). Điểm lượt này ≈ điểm nền × hệ số chuỗi (wave3 → +0.25×2 so với wave1) + streak bonus (+15×3=45, chưa chạm trần 10 lượt). Nếu lượt kế tiếp KHÔNG match được (đặt khối "chờ" vì chưa tới đúng mặt cần), streak reset về 0 — không trừ điểm đã có, chỉ mất bonus streak của các lượt sau.

### A4. Kinh tế Xu (Economy)

**[Đổi 13/09/2026, theo yêu cầu người dùng]** Sàn Xu đổi từ **logarith** sang **exponential** — đảo ngược đặc tính đường cong: log tăng nhanh ở đầu game rồi phẳng dần, exponential tăng chậm/nhẹ ở đầu rồi DỐC hẳn lên cuối game (đúng bản chất hàm mũ). **Nguồn thu**: thắng màn **lần đầu** (chơi lại = 0 Xu, chặn cày):
```
sàn = round(COIN_BASE × COIN_GROWTH^(màn − 1))     // COIN_BASE=9, COIN_GROWTH=1.07
                                                     // = 9 Xu (màn 1) → 248 Xu (màn 50, trước ×2)
+ 15 nếu không dùng booster nào trong màn
× 2 nếu là màn chốt chương (10/20/30/40/50)
```
*Không có bonus "lượt dư → Xu" (hàng đợi khối định trước nên "dư lượt" nhiều lúc chỉ là đợi đúng mặt Mahjong cần để Match, không phải chơi giỏi hơn — nhất quán với Điểm, mục A3).*

**Ví dụ tính cụ thể 3 màn mốc** (worked example, số tròn theo công thức thật, `COIN_BASE=9, COIN_GROWTH=1.07`):
- **Lv1** (`round(9×1.07^0)=9`): KHÔNG có bonus không-dùng-booster khả dĩ ở màn này dù không đụng booster — Level 1 khoá cứng cả 2 kho booster về 0 (xem A1.7), nên `S.boosterStart=0` và điều kiện `S.boosterStart>0` trong code luôn sai tại Lv1 → **luôn đúng 9 Xu**, không có ngoại lệ "chơi giỏi hơn thì được nhiều hơn" ở màn đầu tiên.
- **Lv10** (`round(9×1.07^9)=17`, VÀ là màn chốt Ch1 nên ×2): dùng ít nhất 1 lượt booster trong màn → `17×2=34` Xu; không dùng booster nào → `(17+15)×2=64` Xu (thứ tự phép tính: cộng bonus-không-booster trước, nhân đôi màn-chốt-chương sau — đọc đúng theo code `coins+=15` rồi `coins*=2`).
- **Lv50** (`round(9×1.07^49)=248`, màn chốt Ch5): không dùng booster → `(248+15)×2=526` Xu — mức thưởng 1 màn cao nhất toàn game, gấp ~13 lần so với công thức log cũ (110 Xu) do đặc tính dốc cuối của exponential.

Tổng cả đời chơi 50 màn: **4.149 (tệ nhất, luôn dùng ít nhất 1 booster mỗi màn) – 4.959 (tối ưu, không màn nào dùng booster)** — tăng mạnh so với công thức log cũ (1.725–2.535) vì exponential dồn phần lớn phần thưởng vào 10-15 màn cuối thay vì trải đều. Mốc bảo đảm "đủ mua skin rẻ nhất ở màn 30" **vẫn giữ đúng và còn dư dả hơn**: worst-case cộng dồn tới Lv30 giờ là **966 Xu** (so với ngưỡng 895 Xu skin rẻ nhất, và so với 899 Xu sát nút của công thức log cũ) — verify bằng self-test `economy_floor_affords_cheapest_skin_by_level30` (đã cập nhật dùng đúng `COIN_BASE`/`COIN_GROWTH`). Công thức Excel sống (đổi `COIN_BASE`/`COIN_GROWTH`/giá skin, tự tính lại toàn bộ kể cả cột PASS/FAIL) ở `Mahjong_x_Block_SourceSink.xlsx` — đã cập nhật cùng công thức 13/09/2026.

**Sink — Cửa hàng**: 23 món trả phí — 12 skin quân (895–2,265 Xu, xem `TILE_SKINS`), 11 skin bàn (1,195–2,150 Xu, xem `BOARD_SKINS`), gói booster (100 Xu/5 lượt). Mỗi món preview thật + mô tả 3 ngôn ngữ. **Giá skin KHÔNG đổi** trong đợt chuyển công thức Xu này.

**Chủ đích cân bằng**: skin rẻ nhất (895 Xu) phải luôn đủ mua ở màn 30 kể cả người chơi tệ nhất (966 Xu tới màn 30 dưới công thức mới — dư dả hơn mốc 899 Xu sát nút của công thức cũ). Đánh đổi: skin đắt nhất là mục tiêu dài hơi — dù tổng Xu cả game đã tăng mạnh, phần lớn khoản tăng đó dồn vào ~10 màn cuối (Lv40-50), không phải trải đều, nên vẫn không ai "cày" đủ mua hết 23 món ngay giữa game.

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

**1 level (`P24M_LEVELS[i]`)** — danh sách đầy đủ field hay dùng (không phải mọi level có mọi field, tuỳ `goalType`/cơ chế):

| Field | Kiểu | Ý nghĩa |
|---|---|---|
| `title` | string | Tên màn hiển thị (tiếng Anh), cũng dùng làm khoá tra cứu trong tài liệu này. |
| `size` | int | Cỡ bàn N×N, 2–6. |
| `goalType` | enum | `TILE_QUOTA` / `TARGET_FACE` / `OPEN_SEAL` — chỉ còn đúng 3 giá trị (xem A1.8). |
| `winTargets` | `[{id,need}]` | Danh sách mặt + số lượng cần, dùng cho `TARGET_FACE`. |
| `targetRequiredCount` | int? | Nếu có: chỉ cần đạt đủ N/`winTargets.length` mục tiêu, không cần tất cả. |
| `tileGoal` | int? | Tổng số quân cần phá, dùng cho `TILE_QUOTA`. |
| `seals` | `[[r,c,required?]]` | Ô Phong Ấn — bộ ba toạ độ + ngưỡng `pairs` riêng (mặc định 1 nếu thiếu). |
| `permanents` | `[[r,c]]` | Ô Chắn — toạ độ, không có điều kiện mở. |
| `locks` | `[{cells,face,required,after?}]` | Khoá — nhóm ô + mặt cụ thể + số lượng cần; `after` (chưa dùng ở màn nào) cho Khoá 2 giai đoạn. |
| `guideMoves` | int | Số nước đầu có bàn tay hướng dẫn nhấp nháy (chỉ >0 ở Lv1). |
| `moveLimit` | int | Số lượt đặt khối tối đa. |
| `boosterReroll`/`boosterHint` | — | *(không còn dùng theo-màn kể từ khi Booster chuyển sang kho chung toàn game, xem A1.7 — field lịch sử, có thể còn sót trong vài khai báo level cũ nhưng không ảnh hưởng runtime).* |
| `tiles` | `[{id,r,c,z}]` | Quân "hạt giống" đã có sẵn trên bàn khi vào màn (khác quân trong `sequence` sẽ được thả thêm). |
| `sequence` | `[piece]` | Danh sách khối CỐ ĐỊNH, đúng thứ tự tác giả soạn — nguồn khối chính khi chơi thường. |
| `queuePool` | `[{piece,weight}]?` | Danh sách khối rút NGẪU NHIÊN có trọng số — chỉ dùng khi `p24qRandomModeActive` trả `'pool'` (xem mục 6 ở `GDD.md`/`08-GDD-LEVEL-DESIGN.md` §7 về cơ chế "cyclic sequence"/random). |
| `queueFallback`/`queueRerollBudget`/`queueSolveDepth` | — | Tham số cho cổng chống-random-ăn-gian khi dùng `queuePool`/generative (xem mục 6, `GDD.md`). |
| `solution` | `[{row,col}]` | Lời giải tác giả soạn, dùng cho `runSolution()`/self-test — PHẢI khớp đúng `sequence` theo đúng thứ tự index. |
| `lesson`/`teach` | string | `lesson`: mô tả bài học nội bộ (debug/tài liệu). `teach`: mô tả ngắn cho người chơi (tuỳ chọn). |

**`sealRequiredDistinct`**: field lịch sử, KHÔNG còn dùng trong luật Seal hiện hành — luật hiện tại (12/09/2026, lần 2) đọc ngưỡng trực tiếp từ phần tử thứ 3 của mỗi bộ ba trong `seals[i]`, không dùng field cấp-màn này nữa. Nếu còn thấy field này trong 1 khai báo level cụ thể, đó là tàn dư không ảnh hưởng runtime — không nhầm với luật đang chạy thật.

**localStorage keys đang dùng**: `mxb_level_unlocked`, `mxb_coins`, `mxb_owned_tileskins`/`mxb_owned_boardskins`, `mxb_active_tileskin`/`mxb_active_boardskin`, `mxb_booster_reroll`/`mxb_booster_hint`, `mxb_quest_state` (`{date, quests[], milestoneClaims[]}`), `mxb_checkin_state` (`{day, lastClaimDate, lastWinDate}`).

**Hàm/API quan trọng** (không đầy đủ, chỉ những cái hay cần đụng tới): `computeWinCoins()`, `getBoosterReroll/Hint()`/`setBoosterReroll/Hint()`, `buyBoosterPack()`, `buyTileSkin()`/`buyBoardSkin()`, `pickDailyQuests()`/`addQuestProgress()`/`claimQuest()`, `claimCheckin()`/`checkinReward()`, `renderThemePicker()`, `window.__digest24k1` (debug/test hook: `selfTest()`, `LEVELS`, `place()`, `startLevel()`).

### B3. Lưới an toàn kỹ thuật (self-test — ~33 assertion, chạy mỗi lần load)

Bao gồm: đủ 50 level, mọi `solution` giải được và tự-verify, mọi Seal tự mở trong chính solution của nó, mọi `TARGET_FACE` có `targetRequiredCount` hợp lệ, Match/cascade/gravity đúng thiết kế, cộng các assertion kinh tế/Nhiệm vụ/Điểm Danh. Wild/Joker và Nứt/Crack (từng có self-test riêng) đã **gỡ bỏ hoàn toàn** cùng 2 assertion tương ứng.

**Danh sách đầy đủ 33 assertion** (tên hàm thật trong `p24mSelfTest()`, đọc trực tiếp từ code — không tóm tắt/gộp nhóm để giữ khả năng tra cứu chính xác tên assertion nào đang fail nếu self-test đỏ trong tương lai):

| # | Tên assertion | Kiểm tra gì |
|---|---|---|
| 1 | `fifty_levels` | `P24M_LEVELS.length === 50` — đúng 50 màn, không thiếu/thừa. |
| 2 | `guide_moves_valid` | `guideMoves` mọi màn là số nguyên ≥0. |
| 3 | `every_level_has_one_lesson` | Mọi màn có `lesson` (string >4 ký tự) — không màn nào thiếu ghi chú bài học nội bộ. |
| 4 | `every_queue_item_is_polyomino` | Mọi piece trong `sequence` có ≥2 ô — không quân lẻ 1 ô nào lọt vào hàng đợi. |
| 5 | `piece_size_within_cap` | Mọi piece trong `sequence` có ≤5 ô — trần pentomino không bị vượt. |
| 6 | `no_baked_self_match` | Không piece nào (trừ Lv1) có 2 ô kề nhau cùng mặt ngay khi vừa rơi (tự-match sẵn). |
| 7 | `self_match_guard_catches_bad_piece` | Guard ở #6 tự nó đúng: 1 piece cố ý baked-match phải bị bắt là `true`, 1 piece hợp lệ phải là `false`. |
| 8 | `match_group_of_three_clears_together` | 3 quân cùng mặt liên thông clear chung 1 wave (không tách 2+1). |
| 9 | `match_group_of_four_clears_together` | 4 quân cùng mặt liên thông (hình vuông 2×2) clear chung 1 wave. |
| 10 | `group_of_three_awards_two_pair_equivalents` | Nhóm 3 quân tính đúng 2 "cặp" vào `pairCount` (`group.length−1`), không phải 1 hay 3. |
| 11 | `five_cell_piece_places_without_crashing` | Piece 5 ô (`P24M_L5`) đặt được, không lỗi runtime, đủ 5 vị trí. |
| 12 | `gravity_uses_lowest_slot` | Ô-con của piece rơi đúng tầng thấp nhất còn trống của cột đó (z0 trước, z1 sau). |
| 13 | `full_column_rejected` | Cột đã đủ 2 tầng (z0+z1) từ chối đặt thêm, trả `reason:'full'`. |
| 14 | `covered_bottom_is_ignored` | Quân tầng 0 bị quân tầng 1 cùng ô che → không được tính "đang lộ", dù cùng mặt kề nhau vẫn không match. |
| 15 | `cross_height_pair_is_ignored` | 2 quân cùng mặt nhưng khác tầng (z khác nhau) không match dù kề nhau. |
| 16 | `same_layer_roof_pair_matches` | 2 quân cùng mặt, cùng tầng 1 (roof), kề nhau — vẫn match bình thường (không chỉ tầng 0 mới match được). |
| 17 | `permanent_cell_blocks_placement` | Ô có trong `level.permanents` từ chối mọi đặt khối, `reason:'blocked'`. |
| 18 | `sealed_cell_blocks_until_open` | Ô Seal chặn đặt khi seal đóng, cho phép đặt khi seal đã mở (cùng 1 ô, 2 trạng thái `pairs` khác nhau). |
| 19 | `seal_requires_its_own_distinct_count` | Seal cần đúng ngưỡng `required` riêng của nó — 1 pairs chưa đủ khi cần 2, đủ 2 thì mở. |
| 20 | `seals_open_at_their_own_threshold` | 2 Seal cùng bàn với `required` khác nhau mở ở 2 mốc khác nhau của cùng bộ đếm `pairs` chung. |
| 21 | `every_seal_level_opens_in_its_own_solution` | Với mọi màn có Seal, replay đúng `solution` tác giả soạn phải khiến toàn bộ Seal của màn đó mở (`p24kSealsAllOpen`). **1 trong 2 assertion đã fail khi Lv40/42/46 còn lỗi.** |
| 22 | `every_target_face_level_has_valid_required_count` | Nếu màn có `targetRequiredCount` (kiểu "N/M mặt"), N phải ≤ số phần tử `winTargets`. |
| 23 | `every_move_limit_fits_its_solution` | `solution.length <= moveLimit` cho mọi màn có khai báo `moveLimit`. |
| 24 | `all_solutions` | **Assertion tổng quát nhất**: `runSolution(i).ok` đúng cho cả 50 màn — replay từng nước của `solution` tác giả soạn từ bàn sạch, dưới đúng luật hiện hành, phải đạt goal. **Assertion còn lại đã fail khi Lv40/42/46 còn lỗi** (Lv40 vì `solution` rỗng, Lv42 vì `sequence` rỗng khiến rút quân sai, Lv46 vì goal không khả thi). |
| 25 | `economy_default_skins_free` | Skin mặc định (Ngà/`ivory`, Gỗ/`wood`) giá 0 Xu — người chơi mới luôn có ít nhất 1 lựa chọn dùng ngay. |
| 26 | `economy_prices_positive` | Mọi skin khác + giá gói Booster đều >0 Xu. |
| 27 | `economy_booster_pack_size_positive` | `BOOSTER_PACK_SIZE > 0` — gói booster mua thêm luôn cộng được ít nhất 1 lượt. |
| 28 | `booster_pool_defaults_and_persists` | Kho Booster mặc định đúng 5/5 lượt khi chưa có localStorage, và set/get đúng giá trị tuỳ ý (7/3) khi đã có — có backup/restore localStorage gốc trong lúc test để không đè tiến trình thật. |
| 29 | `economy_floor_affords_cheapest_skin_by_level30` | Kịch bản tệ nhất (luôn 0 lượt dư) vẫn gom đủ Xu ≥ giá skin rẻ nhất trong 30 màn đầu. |
| 30 | `daily_quest_picks_three_distinct_deterministic` | Cùng 1 ngày, `pickDailyQuests()` luôn trả đúng 3 nhiệm vụ KHÁC id nhau, gọi lại nhiều lần vẫn ra đúng thứ tự đó (seed theo ngày, không random mỗi lần gọi). |
| 31 | `daily_quest_state_resets_on_new_day` | State nhiệm vụ ngày cũ bị coi là hết hạn — `getDailyQuestState()` tự dựng lại đúng 3 nhiệm vụ cho ngày hôm nay. |
| 32 | `checkin_milestones_bigger_than_neighbors` | 3 mốc lớn (ngày 10/20/30) đều có coins+reroll+hint >0, mốc sau luôn lớn hơn mốc/ngày liền trước. |
| 33 | `checkin_claim_requires_win_today_and_wraps_at_30` | Không thắng màn nào hôm nay → không claim được; thắng rồi → claim được; claim ở ngày 30 → quay vòng về ngày 1; claim xong lại bị khoá tới khi thắng thêm 1 màn mới. |

**✅ Cập nhật 13/09/2026: `selfTest().ok === true` (33/33 check).** 3 màn từng dở dang do 1 trong nhiều phiên Claude chạy song song (xem B1) đã được vá xong cùng ngày: **Lv40** (`solution` từng rỗng → khôi phục 4 nước `{row,col}` khớp `sequence` 7 quân hiện có). **Lv42** (`sequence` từng bị để trống `[]` khiến engine rút quân ngẫu nhiên thay vì theo `queuePool` đã định — không phải "ra ngoài biên" như ghi nhận ban đầu — đã khôi phục `sequence` khớp đúng 9 quân + thứ tự của `queuePool`, `solution` 10 nước gốc chạy đúng không cần sửa). **Lv46** (goal `c1:4` không khả thi vì bàn chỉ có 1 seed `c1` và không có chuỗi hợp lệ nào đạt 4 — hạ xuống `c1:2`, `solution` viết lại 8 nước, `moveLimit:14` giữ nguyên → dư 6 lượt). Đã tự chạy `runSolution(39)`, `runSolution(41)`, `runSolution(45)` (0-indexed) cùng `check_all_solutions` trên cả 50 màn để xác nhận.

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
| Level hoàn chỉnh | 50 màn có thiết kế đầy đủ và **tự-verify được** — 3 màn từng lỗi (Lv40, Lv42, Lv46) đã vá xong 13/09/2026 (chi tiết đầu file) |
| Self-test tự động | **Xanh hoàn toàn** (`selfTest().ok === true`, 33/33 check) |
| Cơ chế lõi | Match/cascade/che-lộ, Seal, Ô Chắn, Lock (+ Lock 2 giai đoạn `lock.after`, đã cài đặt nhưng chưa dùng ở màn nào), Move Limit — hoàn chỉnh |
| Điểm (Score) | Hoàn chỉnh, hiện trong HUD |
| Kinh tế Xu + Cửa hàng | Hoàn chỉnh, 23 món, tự cân bằng có kiểm chứng |
| Nhiệm vụ & Điểm Danh | Hoàn chỉnh |
| Chủ Đề (wardrobe) | Hoàn chỉnh |
| Ads (interstitial + rewarded) | Lớp no-op sẵn sàng cắm SDK thật, chưa chọn platform phát hành |
| Quản lý mã nguồn | Đã đưa lên Git (1 commit "Push Project to Git"), thư mục đổi tên `Final Core`→`Final Outputs` |
| Dọn dead-code | Đang tiếp diễn (nhiều phiên song song), chưa có mốc hoàn tất |
| Tối ưu hiệu năng mobile | Đang có 1 đợt WIP chưa commit (animation, viewport unit, haptic timing) |

### D2. Việc tồn đọng / cần xác nhận

- ~~Sửa 3 màn Lv40/Lv42/Lv46 để `selfTest()` xanh trở lại~~ — **đã xong 13/09/2026**, xem đầu file.
- **Playtest thật** để đối chiếu độ khó cảm nhận (A2) với dữ liệu thô Beatchart, đặc biệt Lv46–50 (board 6×6, mật độ cơ chế cao nhất game).
- Danh sách màn "0–1 lượt dư" (chơi rất sát nút, dễ frustrate) đã dài hơn hẳn các bản trước — xem `08-GDD-LEVEL-DESIGN.md` §5, nên rà lại xem có chủ đích hay là tác dụng phụ ngoài ý muốn của các đợt tăng độ khó gần đây.
- Theo dõi % người chơi mua được cosmetic đầu tiên trước khi hết Chương 1, để tinh chỉnh công thức Xu nếu quá hào phóng/keo kiệt.
- Đồng bộ art pass các màn hình phụ (xem C3).
- Đợt dọn dead-code + đợt tối ưu hiệu năng đang chạy song song — nên re-run self-test sau mỗi đợt trước khi coi bản build ổn định.
- Chưa chốt platform phát hành → chưa cắm SDK ads thật.

### D3. Roadmap ngắn hạn

1. ~~Sửa Lv40/Lv42/Lv46 để self-test xanh trở lại~~ — đã xong.
2. Playtest thật vòng cuối (đối chiếu D2), đặc biệt Lv46–50.
3. Cân bằng lại Kinh tế Xu theo dữ liệu playtest nếu cần.
4. Hoàn thiện art pass các màn hình phụ.
5. Chốt platform phát hành → cắm SDK ads thật.
6. Đóng gói bản phát hành.

### D4. Lịch sử thay đổi lớn

Xem mục 0.2 (bảng đảo ngược so với bản 08-24) — đây là những quyết định **đã áp dụng**, không phải đề xuất. Đợt gần nhất (13/09/2026): toàn bộ 50 level được user tự tay hoàn thiện (bao gồm nâng Lv46–50 lên board 6×6, tăng mật độ Ô Chắn/Seal/Lock/move limit), Beatchart được xây lại thành 1 sheet dữ liệu thô duy nhất (bỏ Economy, bỏ công thức điểm khó, bỏ tên màn), và cả 2 tài liệu GDD (file này + `08-GDD-LEVEL-DESIGN.md`) được cập nhật lại theo đúng dữ liệu sống mới nhất. 3 màn dở dang phát sinh từ đợt đó (Lv40/Lv42/Lv46) đã được vá cùng ngày — self-test xanh trở lại 33/33, Beatchart re-export để phản ánh đúng.

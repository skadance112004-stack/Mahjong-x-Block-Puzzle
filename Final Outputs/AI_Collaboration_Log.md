# Tổng Hợp AI Log Toàn Dự Án — Mahjong × Block

**Phạm vi:** toàn bộ quá trình làm việc với AI từ lúc bắt đầu dự án đến hiện tại (12/09/2026).
**Mục đích:** một điểm đọc duy nhất, theo đúng trình tự thời gian, gộp lại nội dung đang nằm rải
rác ở 8 tài liệu trong `Document/` (`01`–`06`, `08`, `09`), `Document/AILog_15082026.md`, 3 Weekly
Log (W34/W35/W36), Retro 21/08, `PLAYTEST-AUDIT-50-LEVELS.md`, `Final Outputs/
GAME_DESIGN_DOCUMENT.md`, `Document/Market-Research-Block-Puzzle-va-Mahjong-Solitaire.md`, và
git log của repo. Không suy diễn thêm — mỗi giai đoạn dưới đây ghi rõ nguồn để đối chiếu. Các tài
liệu gốc **vẫn giữ nguyên**, không bị thay thế; tài liệu này chỉ là bản gộp để đọc nhanh toàn
cảnh, đặt trong `Final Outputs/` vì đây là bản tổng hợp cuối cùng dùng để bàn giao/trình bày (cùng
vai trò với `GAME_DESIGN_DOCUMENT.md` so với các tài liệu GDD gốc trong `Document/`).

*Bản này kế thừa trực tiếp `Document/09-TONG-HOP-AI-LOG-TOAN-DU-AN.md` (mốc 09/09/2026) và nối
dài thêm Giai đoạn 13 (11/09/2026) — bản `Document/09-...` không bị xoá, giữ nguyên làm mốc lịch
sử tại thời điểm viết.*

---

## Giai đoạn 0 — Đề bài gốc (trước 13/08/2026)

*Nguồn: `Bai_tap_Mahjong_x_Block_Puzzle_SINGLE_HTML.pdf`.*

- 1 người làm, trong khoảng 1 tháng.
- Công nghệ: HTML/CSS/JS, đóng gói 1 file HTML tự chứa, chạy được trên trình duyệt mobile.
- Mục tiêu sản xuất dài hạn: ~50 level.
- Mahjong và Block phải nằm trong **một core loop**, không phải hai minigame nối tiếp.
- Người chơi mục tiêu: casual, sau thu hẹp thành nhóm **trên 35 tuổi**.
- Ưu tiên ít thao tác — mặc định chỉ kéo–thả; không cần biết luật Mahjong truyền thống.
- Kế hoạch 4 Sprint: (1) chốt concept + prototype core, (2) vertical slice/tutorial/game flow,
  (3) sản xuất level + độ khó + playtest, (4) feature freeze + QA + polish + đóng gói.

---

## Giai đoạn 1 — 6 prototype đầu tiên (15–16/08/2026)

*Nguồn: `AILog_15082026.md`.*

Dựng 6 prototype HTML chơi được để so sánh hướng đi: **Mahjong Block Blast, Mahjong Collapse,
Hand Builder, Mahjong Towers, Mahjong Battle, Mahjong Roguelike**. Đánh giá pros/cons từng
hướng, đề xuất: Block Blast làm core chính; Hand Builder cho campaign; Towers làm cơ chế phụ;
Collapse cho arcade/event; Battle cho meta dài hạn; Roguelike cho endgame. Dựng thêm 1 bản dùng
bộ bài Tây (Poker) thay mặt Mahjong để so sánh (`07-card-blast.html`).

## Giai đoạn 2 — Mở rộng prototype nền (bản 08–10)

*Nguồn: `CHANGELOG.md` mục 0.*

- 08 — Mahjong Block 3-Layer (bàn 3 tầng).
- 09 — Mahjong Meld-Only 3-Layer (chỉ tính bộ, không sảnh).
- 10 — Layer Focus Tabs — nguồn gốc khái niệm **Layer** dùng xuyên suốt các giai đoạn sau.

## Giai đoạn 3 — Hành trình khoá Core Gameplay (17–20/08/2026)

*Nguồn: `01-LICH-SU-THAY-DOI-DEN-FINAL-CORE.md`.*

Đặt ra 5 tiêu chí đánh giá concept: (1) Removal Test — bỏ Mahjong/Block có sụp gameplay không;
(2) một quyết định hay hai công đoạn; (3) Action load — giữ 1 thao tác chính; (4) Cognitive
load phù hợp casual; (5) Level-design capacity đủ trục độ khó mịn.

Trình tự thử — loại — rút bài học, tất cả **không chốt làm core**:

1. **Pair & Drop/Patch/Flip/Route/Box** — giữ cấu trúc Mahjong Puzzle cũ (khay 4 → Match 2 →
   công cụ → dùng trên board). Bị loại vì loop chia 2 pha rõ rệt.
2. **4 prototype coupling logic** (Cặp Hóa Khối, Cặp An Toàn, Khay Là Nhiên Liệu, Recipe Line) —
   kết luận: cần luật tác động trực tiếp lên topology board, không phải resource/recipe.
3. **Generation 2** (Pair & Sow/Tilt/Flip/Liberty/Chain) — quyết định quan trọng: **không cần
   dựa vào boardgame cổ điển**; ưu tiên cơ chế trực tiếp, ít luật, một drag, vẫn có chain.
4. **Quay lại Khay Tiêu Hóa** — chốt nguyên tắc giản lược: Match 2, tự động, một kéo-thả, không
   chọn pair/reorder/power-up/timer; giữ forecast.
5. **24A/24B trên UI gốc** — "Auto Selective Digestion" và "Overlap to Digest".
6. **Đưa layer vào core** (24C–24F) — kết luận: giữ cùng lúc quá nhiều luật sẽ thành feature
   soup → tách câu hỏi ra để test riêng.
7. **Bỏ khay, Match trực tiếp trên board** (24G, 24H) — **bước ngoặt**: 24H (Roof on Board) là
   bản đầu tiên gộp layer + placement + Match vào cùng một quyết định kéo.
8. **Thử thay đổi chạm core** (24I Match 2+/Bridge, 24J Self-built Roof, 24L Repeat Move ×
   Same-layer Match).
9. **24K + gravity** — phát hiện vấn đề: người chơi tự xây tầng trên khiến kết quả khó dự
   đoán; "clear đủ số loại" hướng về checklist thay vì cascade.
10. **Khoá Final Core 24K (20/08/2026)**: input 1 drag–drop; board 6×6, tối đa 2 tầng preset
    (roof chỉ do level đặt, không tự xây); nguồn 1 current + 1 next, queue deterministic lặp vô
    hạn; piece polyomino ≥2 cell (mixed-ID); bỏ line clear, bỏ khay; Match 2 cùng ID/chạm
    cạnh/chỉ tầng dưới; cascade support mất → rơi → Match tiếp; thắng theo `pairGoal`; không
    timer/move limit/booster. Kèm 7 nguyên tắc "không đảo ngược khi lên production".

Đồng thời `02-FINAL-CORE-GAMEPLAY-VA-HOOK.md` chốt **6 mục tiêu thiết kế puzzle** dùng xuyên
suốt: Hook rõ ràng, Dễ hiểu/dễ vào, Độ khó có chủ đích, Đúng feeling ("controlled-collapse
satisfaction"), Feature-freeze, Playtest có tiêu chí giữ core.

## Giai đoạn 4 — Nhánh Khay Tiêu Hóa mở rộng song song (bản 11–26)

*Nguồn: `CHANGELOG.md` (Nhật ký Prototype).*

Chạy song song với giai đoạn 3, không phải bản kế thừa của nó:

- **11 — Khay Tiêu Hóa**: đóng hàng không xoá quân ngay mà đưa vào Khay chờ; 3 quân giống nhau
  hoặc liên tiếp cùng chất tự nổ; khay tràn = thua. Đây là bản **được port sang Unity/C#** (nằm
  ngoài phạm vi các tài liệu prototype HTML).
- **12–19**: 5 ý hybrid khác biệt thật sự, không lấy Block Blast làm gốc so sánh; sau đó mượn
  đúng 1 hook/bản từ boardgame cổ điển (2048/Threes, Domino, Mahjong Connect, Rummikub,
  Othello, Connect Four).
- **Brainstorm giữa chừng** (không sinh file): chốt bỏ Sảnh chỉ giữ Phỗng; 1 batch ~10 ý
  mechanic "buff/bonus" bị **từ chối** vì không đổi quyết định lõi ([[feedback_core_over_buffs]]);
  1 batch 5 ý đổi core thật (Rummikub, Connect Four/domino, Cờ vây, Bingo, Nine Men's Morris).
- **23–26** (kế thừa trực tiếp cơ chế 11): 23 đổi bộ 3 → 3-4-5; 24 hiểu lệch hướng (quay về
  Match-2 kiểu Mahjong Solitaire, giữ tham khảo không dùng tiếp); 25 sửa đúng ý — giữ cơ chế 23,
  đổi bộ tối thiểu 3→2, thêm 2 tầng, trọng lực giữa 2 tầng, camera giả-isometric; 26 vẽ lại bàn
  cờ bằng khối 3D low-poly thật, không đổi game logic so với 25.

Đây chính là nhánh hiện tại có tên **Khay Tiêu Hóa ruleset** ([[project_khay_tieu_hoa_ruleset]]):
tại thời điểm viết các tài liệu 01–03, nhánh này chưa được playtest tay và tách biệt hẳn với
nhánh gravity/drag 20–22.

## Giai đoạn 5 — Đảo ngược quy tắc Match: 24K → 24K-1 (20–21/08/2026)

*Nguồn: `03-LICH-SU-THAY-DOI-24K-DEN-24K1-TOP-MATCH.md`.*

Từ baseline 24K (chỉ tile z0 mới Match, roof chỉ do level đặt sẵn), mở nhánh thử nghiệm song
song: đổi luật Match sang **"chỉ tile đang lộ (không bị che) mới Match được"**, đồng thời cho
phép người chơi **chủ động xếp chồng** (player-stackable placement). Biến việc "che quân" thành
một lựa chọn chiến thuật chủ động (gài bẫy rồi giải bẫy).

`proto-mechanic-match-top.html` → `24k-1.html` (10 màn sinh thủ tục) → **`24K-1-top-match-same-
layer.html`: chốt làm gameplay chính**, tiếp tục tinh chỉnh nhiều vòng:

- Đổi thuật toán ghép cặp greedy → **gom nhóm liên thông** (match-3/4 tự nhiên), thêm rào chắn
  chống "baked self-match" trong 1 piece (trừ Level 1, cố ý).
- Đổi điều kiện thắng: tổng `pairGoal` → **phá đủ N tile của từng loại cụ thể** (`winTargets`),
  verify lại bằng solver mô phỏng toàn bộ 10 level (phát hiện 2 lỗi thật lúc đổi board/goal).
- Thu nhỏ board 6×6 → 5×5.
- Dựng lại Màn 1 thành màn dạy luật 3 lượt, không dùng chữ (xếp chồng → gravity/reveal → match
  áp dụng cho tile vừa lộ); xoá toàn bộ chữ giải thích cơ chế trong game — dạy hoàn toàn bằng
  `guideMoves` (ô nhấp nháy).
- 6 vòng chỉnh hiệu ứng "tile đang bị đè": bài học giữ lại — đo pixel thật của asset gốc trước
  khi đoán màu/kích thước; chỉ áp hiệu ứng cho đúng đối tượng đang thiếu nó (chỉ 1/8 icon quân
  cần thêm bóng đổ giả, 7 icon còn lại đã có sẵn).

`24K-lower-layer-gravity.html` (24K gốc) từ đây trở thành tài liệu tham khảo, không còn là
gameplay chính; `24K-1-top-match-same-layer.html` là nền cho toàn bộ UI/UX và production về sau.

## Giai đoạn 6 — UI/UX Spec "Hành Trình Qua Vườn Trúc" (21/08/2026)

*Nguồn: `FINAL-CORE-UI-UX-SPEC-TU-INDEX.md`, `Retro-Start-Stop-Continue-21082026.md`.*

Yêu cầu trung tâm: giữ concept cổng tre mở ra để vào game (Main Menu) + level select dạng con
đường cổng xen kẽ; nâng chất lượng hình ảnh theo hướng Zen/Trung Hoa cổ/tre trúc/gỗ/giấy; đảm
bảo gameplay 24K-1 dễ đọc với casual 35+; không tăng thao tác hay thêm hệ meta gây nhiễu.

Vấn đề cụ thể cần sửa: chữ quá nhỏ (nâng chuẩn tối thiểu 16px nội dung/14px caption); phong cách
đang nghiêng casino (chuyển vàng sáng/đèn đỏ sang đồng cổ/ngọc bích); texture gỗ cạnh tranh với
nội dung; thao tác 2 bước lặp lại; màn khoá phụ thuộc grayscale + emoji 🔒 (đổi sang thanh gỗ/dây
thừng vật lý); gameplay còn UI legacy (**Điểm, Khay chờ, Đổi khối, Xả quân — phải bỏ hết**, chỉ
giữ Goal/Board 2 tầng/Current/Next/Help-Pause). Chốt design tokens, information architecture,
thứ tự triển khai P0 (readability) → P1 (visual polish) → P2 (delight/accessibility).

Retro cùng ngày (21/08) đúc kết thành thói quen làm việc, xem [[project_difficulty_safety_net_pattern]]
và bài học kỹ thuật: đọc đầy đủ dòng bị grep rút gọn trước khi kết luận an toàn; không đoán mù
chỉnh sửa hình ảnh nhiều vòng mà không đo pixel thật; quét toàn file tìm hết tham chiếu trước
khi xoá/sửa (vì nhiều lớp patch ghi đè cùng tên hàm); xin log console khi nghi runtime error;
hỏi lại phạm vi khi yêu cầu mơ hồ; viết/chạy test headless sau mỗi sửa lớn; backup trước khi
merge lớn (dự án chưa có git lúc đó); dùng script đếm assertion khi sửa hàng loạt text/CSS.

## Giai đoạn 7 — GDD Master + kế hoạch Tuần 3–4 (24/08/2026)

*Nguồn: `04-GDD-FINAL-CORE-MASTER.md`.*

Chốt lại: **Tuần 1–2 đã hoàn thành** — engine P24K/P24M (board 2 tầng, polyomino 2–5 ô, Match
2/3/4 cùng tầng-liền kề-đang lộ, cascade trọng lực); cơ chế **Phong Ấn (Seal)** và **Ô Chắn
(Permanent)**; 4 loại goal (`PAIR_QUOTA`, `TARGET_FACE`, `OPEN_SEAL`, `BURIED_TARGET`); **30
level đầu** theo 5 hồi sư phạm, mỗi level có solution giải sẵn + verify tự động; redesign Main
Menu (cổng tre) và Level Select (vào thẳng chương hiện tại). Quy mô chốt cứng cho Tuần 3–4: vẫn
6×6 tối đa, 6 mặt quân, 30 level/3 chương. Monetization chốt hướng **Ads (interstitial +
rewarded)**, platform chưa chốt nên thiết kế `AdService` theo hướng cắm-được-sau.

Kế hoạch Tuần 3 (Audit + UI polish + Level polish) và Tuần 4 (AdService no-op + playtest cuối +
đóng gói) được lên lịch theo ngày — nhưng thực tế **rẽ hướng ngay sau đó** (xem Giai đoạn 8):
đội ưu tiên thêm cơ chế core mới và scale nội dung thay vì đi tiếp đúng thứ tự Ads đã vạch.

## Giai đoạn 8 — Tuần W35 (25–31/08/2026): cơ chế mới + scale + level editor + sound

*Nguồn: `06-CHANGELOG-TIEP-NOI.md`, `20260828_TinTDD_W35_Note.md`.*

- **`moveLimit`** (giới hạn số lượt đặt) trở thành điều kiện thua mới, tích hợp thẳng vào core
  loop (HUD đếm lượt còn lại).
- **2 booster core mới — Đổi khối (Reroll) và Hint** — không tốn lượt đặt; Hint tự giải bằng
  DFS sống trên trạng thái bàn hiện tại.
- **Mặt Wild/Joker** — khớp bất kỳ mặt nào đang lộ cùng tầng (về sau bị gỡ bỏ, xem Giai đoạn 10).
- **Level Editor nâng cấp sang kéo-thả trực quan**: di chuyển tile, dán khối, sắp xếp sequence,
  quét vùng vẽ nhanh Seal/Permanent; có chế độ Play-test mô phỏng đúng luật; thêm tính năng
  **sinh level bằng mô tả ngôn ngữ tự nhiên (AI)** kèm auto-solver kiểm tra trước khi playtest tay.
- **Scale 30 → 50 level**: thêm Chapter 4 (Wild) và Chapter 5 (mastery); nhóm chương đổi từ
  hard-code sang tính động theo độ dài `P24M_LEVELS`. Chạy lại solver cho toàn bộ 50 level.
- **Chế độ nguồn khối ngẫu nhiên có gate chứng minh còn đường thắng** (Queue Pool; Random
  Shapes+Faces) — **lệch hướng có chủ đích** so với nguyên tắc "queue deterministic" đã chốt ở
  Giai đoạn 3, chỉ áp dụng cho các level khai báo tường minh.
- **Đảo ngược quyết định âm thanh**: dừng WebAudio tổng hợp cho tiếng đặt/phá tile, chuyển hẳn
  sang **sample âm thanh thật** nhúng base64 (giữ đúng ràng buộc 1-file-HTML), thêm nhạc nền lần
  đầu.
- Dừng lại có chủ đích: tạm ngưng UI mới cho Level Editor để ưu tiên verify tính giải được; dừng
  thử nghiệm cơ chế khác (xoay khối, băng chuyền, hoán đổi tile) để tập trung hoàn thiện đúng 1
  cụm cơ chế mới trước.
- Công cụ phát sinh: Playwright + script chụp màn hình để kiểm tra UI trực quan; `.gitignore` bổ
  sung loại trừ `tmp/` và thư mục sinh ra bởi Unity.
- Câu hỏi mở cuối tuần: độ khó sau moveLimit+booster đã đủ thử thách chưa (cần playtest người
  thật); dữ liệu (level+âm thanh) gộp 1 file HTML có ảnh hưởng độ mượt không.

## Giai đoạn 9 — 04/09/2026: Nhiệm Vụ Hàng Ngày + Điểm Danh 30 Ngày

*Nguồn: `06-CHANGELOG-TIEP-NOI.md`.*

Xây thẳng vào `index.html`, ngồi TRÊN Economy đã có (dùng lại `addCoins`/`setBoosterReroll`/
`setBoosterHint`, không tạo kho riêng, không đổi luật thắng/thua):

- **Nhiệm Vụ Hàng Ngày**: mỗi ngày chọn cố định 3/6 nhiệm vụ mẫu (deterministic theo ngày, qua
  `pickDailyQuests()`), tất cả đếm lại sự kiện core sẵn có (thắng màn, ghép 6 cặp, dùng booster,
  phá Seal, thắng không dùng booster, chain ≥2 wave). Thưởng 20–30 Xu hoặc booster.
- **Điểm Danh 30 Ngày**: mô hình **cộng dồn, không mất trắng khi lỡ ngày** — đúng tinh thần
  "không phạt" đã thấy ở [[project_difficulty_safety_net_pattern]]. Thắng ≥1 màn/ngày mở khoá 1
  ô kế tiếp; mốc 10/20/30 là quà lớn (60–200 Xu + 3–8 booster mỗi loại); ngày 30 xong quay vòng
  lại ngày 1.
- UI: 1 nút "🎯" mới ở Main Menu, modal 2 tab, có badge khi có thứ để nhận.
- Xác nhận bằng 4 assertion mới trong self-test (34/34 check) + chạy full luồng thật qua
  Playwright (thắng Lv1 → quest lên tiến độ → claim đúng số Xu, không lỗi console).
- Ghi chú: phần Monetization (Ads) của kế hoạch Tuần 4 gốc **chưa được bắt đầu** — đội chuyển ưu
  tiên sang cơ chế core mới + scale nội dung + level editor + sound design.

## Giai đoạn 10 — Tuần W36 (01–07/09/2026): Lock/Crack, đổi mô hình booster, UI tổng thể, Settings

*Nguồn: `20260904_TinTDD_W36_Note.md`, đối chiếu `07-GDD-TONG-HOP-TU-INDEX.md` cũ (đọc code
06/09; tài liệu này về sau được viết lại và đổi tên thành `GAME_DESIGN_DOCUMENT.md`, xem Giai
đoạn 13).*

- Thêm 2 cơ chế chặn ô mới vào core loop: **Khóa (Lock)** và **Nứt (Crack)**.
- **Chuyển đổi mô hình booster**: bỏ mô hình cấp riêng theo từng level, đổi sang **kho dùng
  chung toàn game** (không reset qua màn) — người chơi mới có sẵn 5 Đổi khối + 5 Hint, nạp thêm
  qua Cửa Hàng.
- Làm mới toàn bộ giao diện game: bỏ bố cục UI bị khoá chung 1 hàng trong màn chơi; tách Goal
  thành dải riêng (`#goal-strip`); đổi bàn cờ mặc định sang gỗ thật; khoá tỉ lệ khung hình 16:9/
  9:16 (letterbox).
- **Modal Cài đặt mới** (icon bánh răng): 2 thanh trượt âm lượng độc lập (nhạc nền/hiệu ứng),
  bật/tắt haptic (rung), và **i18n 3 ngôn ngữ Việt/Anh/Trung** cho toàn bộ text tĩnh + động.
- Cập nhật Level Editor để chuẩn bị chốt.
- Xây dựng thêm **Kinh tế Xu & Cửa Hàng đầy đủ** (đọc thấy trong code khi đối chiếu 07-GDD cũ,
  dù không phải goal tường minh trong Weekly Log): công thức thắng màn (`computeWinCoins`), 3
  tab Cửa Hàng (12 skin tile, 11 skin bàn, gói booster 100 Xu/5 lượt), toàn bộ skin thuần cosmetic.
- Câu hỏi mở cuối tuần: độ khó sau Lock/Crack + siết moveLimit/booster đã đủ thử thách chưa;
  dung lượng 1 file HTML (50 level + âm thanh + toàn bộ Cửa Hàng/skin) có ảnh hưởng độ mượt
  không; hệ economy hiện tại "vẫn ở mức bản mẫu, mang tính cho có", cần cân bằng lại ở tuần cuối.

**Đã gỡ bỏ sau đó (07/09/2026)** — theo `07-GDD-TONG-HOP-TU-INDEX.md` cũ mục 4: mặt **Wild/
Joker** và cơ chế **Nứt (Crack)** từng lập trình + tự kiểm nhưng chưa từng được dùng trong bất kỳ
level chính thức nào — xoá hoàn toàn khỏi `index.html` và `level-editor.html` (code, CSS,
self-test, tool tác giả level, schema AI-gen) theo yêu cầu dọn dẹp. Cùng ngày, dọn phần **gán-đè
lãng phí của tầng engine "P24K V2"** (một lớp lịch sử cũ hơn từng bị engine mới nhất gán đè hoàn
toàn), xoá `startLevel(...)` tự chạy khi nạp trang gây "chớp màn hình sai" trước khi engine thật
vẽ đè lên. Engine hiện có 3 tầng lịch sử chồng nhau trong cùng 1 file — chỉ tầng cuối cùng thật
sự chạy — tầng gốc cũ nhất ("Match 2 & Phá Ấn", ~1000 dòng) vẫn còn nguyên làm chỗ trống
(binding) bắt buộc, được ghi nhận là nợ kỹ thuật chưa dọn (rủi ro cao hơn lợi ích trong đợt này).

## Giai đoạn 11 — 06–08/09/2026: Playtest Audit 50 màn + cân bằng level design

*Nguồn: `PLAYTEST-AUDIT-50-LEVELS.md`, `08-GDD-LEVEL-DESIGN.md` (bản 08/09/2026).*

- **Playtest thật cho cả 50 màn** qua đúng engine (`p24kPlace`/`p24kResolveAnimated`, không chỉ
  replay solver offline): 0 lỗi thật (đặt sai/exception/thua giữa chừng/hết solution chưa
  thắng); ban đầu 12 màn "thắng sớm" (goal đạt trước khi hết solution — hiện tượng biết trước và
  **cố ý giữ**, xem [[project_difficulty_safety_net_pattern]]), giảm dần qua nhiều đợt sửa còn
  **2 màn** (Lv28, Lv30 — số màn tại thời điểm đó, trước khi Ch2/Ch3 đổi chỗ ở Giai đoạn 13).
- Phát hiện từ chơi thử thật: Lv3–10 "dễ hơn Lv2" vì công thức độ khó không tính tổng số ô cần
  khớp — sửa bằng cách nâng tổng mục tiêu 5 màn (Lv3,4,5,6,10) lên bằng/vượt Lv2, verify lại
  bằng solver + self-test + playtest thật.
- **Bỏ auto-guide** (trừ Lv1) theo yêu cầu người dùng — 18 màn từng có `guideMoves>0` bị đặt về
  0; hệ quả làm tăng điểm độ khó các màn đó (đúng bản chất), gây lệch thứ tự đỉnh sóng Lv7/Lv13 —
  sửa bằng cách nới bàn/thêm seal trang trí (không đổi cách giải).
- **Đồng bộ Lv10–20 về 5×5** (trước đó lẫn 4×4/5×5/6×6) — 4 màn (13,18,19,20) phải thiết kế lại
  tuyến giải vì dùng tới hàng/cột 5; verify lại bằng `design_helper.js` + engine thật.
- **Sàn độ khó theo chương** được cân bằng để tăng dần đúng thứ tự (C1 0.6 → C2 3.0 → C3 3.1 →
  C4 3.2 → C5 3.3) — số liệu tại thời điểm đó, trước khi Giai đoạn 13 tính lại toàn bộ thang điểm.
- **Quy tắc mới chốt 08/09/2026** (`08-GDD-LEVEL-DESIGN.md` bản gốc):
  - Giới hạn số loại mahjong tối đa mỗi màn: **≤4 loại** nếu không kết hợp Seal/Permanent/Lock,
    **≤3 loại** nếu có — theo phản hồi playtest 2 persona (nam/nữ trung niên, đúng tệp mục tiêu)
    "quá nhiều loại phải nhớ cùng lúc". Mặt bị loại khỏi `winTargets` vẫn giữ nguyên trên bàn làm
    nội dung "trang trí", không xoá tile/sequence/move đã thiết kế.
  - Số nước dư tối thiểu: mọi màn nên có **≥2 nước dư** (trừ Lv1 gốc, và màn "Two Shots" — 0
    nước dư có chủ đích, playtest xác nhận đây là "khó đúng gu"). 10 màn từng có 0-1 nước dư
    không có lý do đặc biệt đã được nới lên ≥2.
  - Công thức điểm độ khó 7 thành phần (cỡ bàn, số nước kế hoạch, độ chật, số mặt quân, cơ chế,
    cỡ khối, trọng số goal type) — tính lại và ghi vào `Beatchart.xlsx` sau mỗi lần đổi 1 trong 7
    thành phần.

## Giai đoạn 12 — 09/09/2026: dọn dead code, chuẩn bị trình bày/bàn giao

*Nguồn: `Document/09-TONG-HOP-AI-LOG-TOAN-DU-AN.md` (viết lúc 09/09/2026).*

Bằng chứng gần nhất trong repo tại thời điểm đó: `index.html.before-deadcode-removal-
20260909-010931.bak` (01:09 sáng 09/09) — một đợt **dọn dead code** vừa được thực hiện trên
`index.html` (chưa có tài liệu changelog riêng mô tả nội dung cụ thể của đợt này tại thời điểm
viết `09-...`). `Mahjong_x_Block_Beatchart.xlsx` cũng vừa được cập nhật lúc 01:05 cùng ngày —
khớp với quy trình "chạy lại điểm độ khó sau mỗi thay đổi" đã nêu ở Giai đoạn 11. Ngoài bản
HTML chính, thư mục dự án lúc đó đã có thêm `Mahjong_x_Block_PitchDeck.pptx`,
`Mahjong_x_Block_Presentation.pptx`, `Mahjong_x_Block_SourceSink.xlsx`, và bộ ảnh chụp màn hình
`Figma UI Export/` (13 màn hình chính của game, chụp 06/09) — cho thấy dự án đang bước sang giai
đoạn chuẩn bị trình bày/bàn giao, song song với việc tiếp tục hoàn thiện engine. Dự án lúc này
**chưa có git** (xem Giai đoạn 13 — commit đầu tiên diễn ra ngay sau đó).

## Giai đoạn 13 — 11/09/2026: Đưa dự án lên Git, tái cấu trúc GDD theo vai trò, đổi luật Seal, nghiên cứu thị trường

*Nguồn: git log (`6772a7d` Push Project to Git · `132aa50` fix · `348eb39` optimize game ·
`8b97d5e` Chỉnh sửa GDD), `Final Outputs/GAME_DESIGN_DOCUMENT.md`, `Document/
08-GDD-LEVEL-DESIGN.md` (bản 11/09/2026), `Document/Market-Research-Block-Puzzle-va-Mahjong-
Solitaire.md`.*

- **Đưa dự án lên Git lần đầu** (`6772a7d Push Project to Git`): thư mục sản phẩm đổi tên
  **`Final Core` → `Final Outputs`** — mọi đường dẫn `Final Core/...` nhắc tới ở Giai đoạn 3–12
  phía trên nay đã lỗi thời, tương đương `Final Outputs/...`.
- **Xác minh lại bằng Chrome/Puppeteer thật** (không chỉ đọc code, `132aa50`) rằng nút Help
  (`#btn-help`) và overlay luật cũ "Match 2 & Phá Ấn" thực sự không thể chạm tới được bởi người
  chơi: `getComputedStyle` = `display:none`, `getBoundingClientRect` = 0, click Puppeteer thất
  bại với "Node is either not clickable or not an Element" — xác nhận đúng như Giai đoạn 10 ghi
  nhận (onboarding đã gộp hoàn toàn vào Level 1 thật), dù đoạn code gắn sự kiện cho nút cũ vẫn
  còn tồn tại trong file (chưa dọn, không lộ ra người chơi).
- **Viết lại toàn bộ `04-GDD-FINAL-CORE-MASTER.md` theo 4 phần vai trò** (`348eb39`): Game
  Designer / Lập trình viên-Engineer / Hoạ sĩ-Âm thanh / Producer, thay vì 1 mạch tuyến tính —
  mỗi phần tự đứng được. Gộp toàn bộ bảng "nguyên tắc đã chốt cũ (bản 08-24) vs thực tế hiện tại"
  (move limit, booster, hiển thị điểm số, monetization, quy mô level, tutorial, cơ chế lõi mới)
  vào 1 bảng duy nhất ở đầu tài liệu để không ai vô tình coi bản cũ còn hiệu lực.
- **Đổi luật Seal — nay đòi hỏi match kề sát** (`8b97d5e`, theo yêu cầu người dùng): mọi
  seed/piece dùng để mở 1 Seal phải được đặt (hoặc dẫn 1 match cascade tới) một ô **liền kề trực
  tiếp** (không chéo) với ô Seal — không còn tính nếu match xảy ra ở nơi khác trên bàn dù đủ N
  mặt khác nhau. Bổ sung self-test mới `every_seal_level_opens_in_its_own_solution`, vì
  `selfTest().ok===true` cũ **không đủ** để bắt lỗi "Seal không bao giờ thật sự mở dù goal khác
  của màn đó vẫn đạt" — phải verify riêng bằng `model.sealAdjacentCounts` (tách biệt khỏi
  `model.idCounts`/`S.targetCounts`) và `model.sealOpen===true` sau khi replay `solution`.
  **Cập nhật (xem Giai đoạn 14): luật kề-sát này bị đảo ngược lại chỉ 1 ngày sau (12/09/2026),
  theo yêu cầu người dùng** — đoạn trên vẫn đúng làm mốc lịch sử, nhưng không còn phản ánh luật
  Seal hiện hành.
- **Đảo thứ tự Chương 2/3** theo yêu cầu người dùng: **Ô Chắn (Permanent)** — cơ chế đơn giản
  hơn, chặn vĩnh viễn không điều kiện — nay dạy trước ở Ch2 (Lv11–20); **Phong Ấn (Seal)** — giờ
  có thêm ràng buộc kề-sát nên phức tạp hơn — dạy sau ở Ch3 (Lv21–30), ngược hẳn thứ tự cũ ở
  Giai đoạn 7/11. 4 màn từng kết hợp Seal+Permanent ở vị trí Ch2 cũ ("Double Block", "Open
  Route", "Three Faces Two Stations", "Chapter Final Exam" — số màn mới 16/17/19/20) được thiết
  kế lại thành **Permanent thuần** vì Seal chưa được dạy tại thời điểm đó trong thứ tự mới;
  tile/sequence/solution giữ nguyên, chỉ đổi loại ô chặn. Các đỉnh khó "PEAK 1/2/3 OF 3" và các
  breather level cũng dịch số theo (Lv13→23, Lv18→28, v.v.) — số màn nhắc tới ở Giai đoạn 11 phía
  trên là số **cũ**, trước lần đổi chỗ này.
- **Chấp nhận có chủ đích 1 vi phạm quy tắc "độ khó tăng dần theo chương"**: sau khi đổi chỗ và
  tính lại toàn bộ 7 thành phần điểm độ khó, Ch2 Ô Chắn (điểm TB 40.6) hiện **cao hơn** Ch3 Phong
  Ấn (điểm TB 33.5) — vì đợt này chỉ hoán đổi vị trí nội dung mà chưa cân bằng lại độ khó nội tại
  theo vị trí sư phạm mới. Đánh đổi được chấp nhận có chủ đích: ưu tiên thứ tự dạy cơ chế hợp lý
  hơn đường cong độ khó tuyệt đối theo chương trong đợt này. **Việc cần làm sau (chưa làm)**: một
  đợt cân bằng riêng để hạ độ khó TB Ch2 hoặc nâng Ch3 (hoặc cả hai) tới khi quy tắc đơn điệu
  được khôi phục.
- **`07-GDD-TONG-HOP-TU-INDEX.md` được viết lại và đổi tên thành `GAME_DESIGN_DOCUMENT.md`**
  (rename `R089` trong git, không phải xoá+tạo mới), giữ nguyên vai trò "tài liệu gameplay/cơ chế
  duy nhất còn hiệu lực" trong `Final Outputs/` — mọi tham chiếu `07-GDD-TONG-HOP-TU-INDEX.md` ở
  các giai đoạn trước (7, 10, 11) nay trỏ tới `GAME_DESIGN_DOCUMENT.md`.
- **Dọn lại vị trí file deliverable** giữa `Document/` và `Final Outputs/`: `Mahjong_x_Block_
  Beatchart.xlsx` chuyển hẳn từ `Document/` sang `Final Outputs/`; bản `Mahjong_x_Block_Pitch_
  Deck.pptx` cũ và file `.inspect.ndjson` đi kèm bị xoá khỏi `Final Outputs/`; thêm `index.
  devtest.html` (bản build tách riêng cho test/audit, không phải bản chạy thật `index.html`).
- **Nghiên cứu thị trường mới** (`Document/Market-Research-Block-Puzzle-va-Mahjong-Solitaire.md`,
  phiên làm việc riêng — web search + trích dẫn nguồn công khai, không dùng số liệu nội bộ trả
  phí): so sánh thể loại Block Puzzle (đại diện **Block Blast!** — #1 game tải nhiều nhất thế
  giới Q1/2026, 70 triệu DAU/300 triệu MAU, đang mở rộng mạnh ở Việt Nam) và Mahjong Solitaire
  với core hook của Mahjong × Block; tài liệu tự nêu rõ giới hạn phương pháp luận ở mục 7.

## Giai đoạn 14 — 12/09/2026: Đảo ngược luật Seal (kề-sát → đếm khắp bàn, mỗi ô Seal có ngưỡng riêng) + nhiều phiên AI chạy song song

*Nguồn: `Document/08-GDD-LEVEL-DESIGN.md` mục "[Đổi luật 12/09/2026]" (đối chiếu code) · báo cáo
qua cross-session message của phiên AI khác đang làm việc trên cùng repo (tên phiên
`mahjong-x-block-b4`), tự xác nhận đã chạy `selfTest()` (33 check, xanh) + kiểm tra thật trên
Level Editor (không lỗi console) trước khi báo hoàn tất.*

- **Bối cảnh mới đáng chú ý**: kể từ khoảng 11–12/09/2026, dự án được nhiều **phiên Claude Code
  chạy song song** (quan sát được ít nhất 5 phiên cùng lúc) cùng chỉnh sửa trực tiếp trên
  `Final Outputs/index.html` và các tài liệu GDD — không phải 1 AI session tuyến tính duy nhất
  như các Giai đoạn 0–13 phía trên. Hệ quả quan sát được: xung đột ghi-đè thoáng qua (đổi kiểu
  dấu nháy, giá trị toạ độ Seal lệch giữa 2 lần đọc) do nhiều phiên đọc/ghi cùng 1 file lớn gần
  như đồng thời — xem [[project_concurrent_session_editing_risk]]. Từ giai đoạn này trở đi, log
  không còn đảm bảo phản ánh **một** trình tự làm việc duy nhất, mà là tổng hợp các báo cáo từ
  nhiều phiên khác nhau khi chúng chủ động thông báo qua cross-session message.
- **Đảo ngược luật Seal đã đổi ở Giai đoạn 13 (11/09/2026), theo yêu cầu người dùng**: bỏ hẳn yêu
  cầu "match phải kề sát ô Seal" — Seal quay lại đếm số mặt **khác nhau đã match ở BẤT KỲ ĐÂU
  trên bàn**, dùng chung bộ đếm với TARGET_FACE/Lock (`model.idCounts`); tên `model.
  sealAdjacentCounts` bị xoá khỏi code.
- **Nhưng KHÔNG quay lại y hệt bản gốc trước 11/09** — giữ lại 1 thay đổi cấu trúc mới:
  `level.seals` nay là mảng bộ ba **`[r, c, required]`** (thay vì `[r, c]` dùng chung 1
  `sealRequiredDistinct` cấp-màn) — **mỗi ô Seal có ngưỡng `required` riêng**, nên nhiều Seal
  trên cùng 1 bàn có thể mở tại các mốc khác nhau của cùng 1 bộ đếm chung (ví dụ 1 Seal cần 1
  mặt khác nhau đã mở, Seal khác trên cùng bàn cần 4 mặt mới mở). Thiếu phần tử thứ 3 mặc định
  `required=1`. Hàm kiểm tra thắng đổi từ `model.sealOpen` (đã xoá) sang
  `p24kSealsAllOpen(level, model.idCounts)`.
- **UI**: mỗi ô Seal hiện thêm 1 badge nhỏ hiển thị ngưỡng riêng của chính nó, cộng 1 dòng tổng
  hợp "đã mở/tổng số Seal" trên HUD.
- **Phạm vi áp dụng**: cả 17 màn có Seal trong `Final Outputs/index.html`; đồng bộ lại
  `Document/04-GDD-FINAL-CORE-MASTER.md` và `Document/08-GDD-LEVEL-DESIGN.md`; cập nhật
  `Final Prototype/level-editor.html` (giao diện soạn Seal đổi từ 1 ô nhập `sealRequiredDistinct`
  chung sang danh sách Seal từng-ô-một, hàm engine mirror lại đúng logic mới, export/schema
  dùng cho AI-gen level cũng cập nhật theo) — phiên báo cáo xác nhận thay đổi trong
  `level-editor.html` chỉ chạm phần code liên quan Seal, không đụng tới các sửa lock/dragstart/
  faceEmoji mà phiên khác đang làm cùng lúc.
- **Ghi chú lưu ý khi đọc lại Giai đoạn 11/13 phía trên**: mô tả `sealRequiredDistinct` dùng
  chung cấp-màn và luật "kề sát" ở các giai đoạn đó **không còn đúng với code hiện hành** — chỉ
  còn giá trị lịch sử, giải thích vì sao 2 quyết định đó từng được đưa ra và sau đó bị đảo ngược.

---

## Trạng thái hiện tại — tóm tắt kỹ thuật (tính đến 12/09/2026)

*Chi tiết đầy đủ nằm ở `Final Outputs/GAME_DESIGN_DOCUMENT.md` (4 phần theo vai trò) và
`Document/08-GDD-LEVEL-DESIGN.md`; đây chỉ là gạch đầu dòng để tra nhanh.*

- **Core loop**: kéo 1 polyomino (2–5 ô, mixed-ID) vào bàn N×N (2×2 đến 6×6 tuỳ level) tối đa 2
  tầng; mỗi ô tự rơi tầng thấp nhất còn trống; 2+ quân cùng mặt/cùng tầng/liền kề/đang lộ Match
  cùng lúc (nhóm, không chỉ cặp); support mất → quân trên rơi → cascade nhiều wave.
- **Goal type**: `TILE_QUOTA` (5 màn), `TARGET_FACE` (32), `OPEN_SEAL` (6), `BURIED_TARGET` (7).
- **Blocker**: Ô Chắn/Permanent (vĩnh viễn, ~28 màn dùng, **nay dạy trước ở Ch2**), Phong Ấn/Seal
  (đếm số mặt khác nhau đã match **ở bất kỳ đâu trên bàn** — luật "kề sát" của 11/09/2026 đã bị
  đảo ngược lại 12/09/2026; mỗi ô Seal nay có ngưỡng `required` riêng qua `level.seals=[r,c,
  required]`, không còn 1 `sealRequiredDistinct` dùng chung cho cả màn — 17 màn, **nay dạy sau ở
  Ch3**), Khóa/Lock (N quân 1 mặt cụ thể theo từng nhóm ô, ~16 màn). Wild/Joker và Nứt/Crack đã
  bị gỡ bỏ hoàn toàn (07/09/2026, xem Giai đoạn 10).
- **Nội dung**: 50 level (5 chương × 10, **thứ tự Ch2/Ch3 đã đảo so với bản trước 11/09/2026**),
  mỗi level có solution giải sẵn + verify tự động; chỉ Lv1 còn giữ `guideMoves` (auto-guide).
- **Booster**: Đổi khối + Hint, kho dùng chung toàn game (không theo từng level), nạp thêm qua
  Cửa Hàng; Level 1 luôn khoá booster.
- **Kinh tế**: công thức Xu theo `computeWinCoins()`; Cửa Hàng 3 tab (12 skin tile, 11 skin bàn,
  gói booster); toàn bộ skin thuần cosmetic, không đổi luật. Tự nhận "vẫn ở mức bản mẫu, cần cân
  bằng lại".
- **Gắn kết dài hạn**: Nhiệm Vụ Hàng Ngày (3/6, chọn theo ngày) + Điểm Danh 30 Ngày (cộng dồn,
  không phạt khi lỡ ngày).
- **UI/UX**: thẩm mỹ "Hành Trình Qua Vườn Trúc" (Trung Hoa cổ, tre/gỗ/ngọc bích); khoá tỉ lệ khung
  hình 16:9/9:16; Cài đặt (âm lượng riêng nhạc/hiệu ứng, haptic, i18n Việt/Anh/Trung); nút Help
  cũ đã xác minh **không thể chạm tới được** trên Chrome thật.
- **Âm thanh**: sample thật nhúng base64 (không còn WebAudio tổng hợp cho SFX chính), nhạc nền
  Trung Hoa; tiếng "cạch" nút UI vẫn tổng hợp riêng.
- **Kỹ thuật**: 1 file HTML tự chứa (`Final Outputs/index.html`, đổi tên thư mục từ `Final Core`
  khi lên Git); còn thêm bản `index.devtest.html` tách riêng cho test/audit; 3 tầng engine lịch
  sử chồng nhau (chỉ tầng cuối chạy thật); `p24mSelfTest()` chạy hàng chục assertion mỗi lần tải
  trang (kể cả check Seal-kề-sát mới); Level Editor riêng (`level-editor.html`) hỗ trợ kéo-thả +
  AI-gen level + auto-solver.
- **Tài liệu master**: `Document/04-GDD-FINAL-CORE-MASTER.md` nay chia 4 phần theo vai trò (Game
  Designer/Engineer/Hoạ sĩ-Âm thanh/Producer); `Final Outputs/GAME_DESIGN_DOCUMENT.md` (thay thế
  `07-GDD-TONG-HOP-TU-INDEX.md` cũ) là nguồn gameplay/cơ chế chính.
- **Chưa làm / còn mở**: Monetization (Ads/`AdService`) của kế hoạch Tuần 4 gốc chưa bắt đầu; nợ
  kỹ thuật tầng engine gốc cũ nhất chưa dọn hết; câu hỏi về độ mượt khi tải file HTML lớn trên
  thiết bị yếu chưa có câu trả lời từ playtest thật; chế độ sinh khối ngẫu nhiên (Queue
  Pool/Random Shapes) mới chỉ kiểm bằng bot, chưa qua playtest người thật; hệ economy tự nhận là
  "vẫn ở mức bản mẫu, cần cân bằng lại"; **Ch2 hiện khó hơn Ch3 sau khi đổi chỗ dạy Ô Chắn/Seal —
  cân bằng lại độ khó theo vị trí mới chưa được thực hiện**.

---

## Câu hỏi follow-up lặp lại xuyên suốt các tuần (chưa có câu trả lời chốt)

- UI dựa hoàn toàn trên nền HTML thì tạo được game feel tốt tới đâu?
- 1 file HTML có đủ tối ưu cho 50 level (+ âm thanh + Cửa Hàng/skin) không, có ảnh hưởng độ mượt
  trên thiết bị yếu không?
- Độ khó sau mỗi đợt thêm cơ chế (moveLimit+booster, rồi Lock, rồi đổi chỗ Ch2/Ch3) đã đủ thử
  thách cho tệp người chơi mục tiêu (casual 35+) chưa — hay vẫn cần playtest người thật để hiệu
  chỉnh, không chỉ dựa công thức?
- Hệ economy (Xu/Cửa Hàng) hiện tại có đang chỉ "cho có" hay đã đúng vai trò lâu dài?
- **Mới (11/09/2026)**: khi nào thực hiện đợt cân bằng lại để Ch2 (Ô Chắn) không còn cao điểm độ
  khó hơn Ch3 (Phong Ấn) — vi phạm quy tắc "tăng dần theo chương" hiện đang được chấp nhận có
  chủ đích, chưa có lịch sửa?

---

## Nguồn tài liệu đã dùng để tổng hợp

`Bai_tap_Mahjong_x_Block_Puzzle_SINGLE_HTML.pdf` · `Document/AILog_15082026.md` ·
`Document/CHANGELOG.md` · `Document/01-LICH-SU-THAY-DOI-DEN-FINAL-CORE.md` ·
`Document/02-FINAL-CORE-GAMEPLAY-VA-HOOK.md` ·
`Document/03-LICH-SU-THAY-DOI-24K-DEN-24K1-TOP-MATCH.md` ·
`Document/FINAL-CORE-UI-UX-SPEC-TU-INDEX.md` ·
`Document/Retro-Start-Stop-Continue-21082026.md` · `Document/04-GDD-FINAL-CORE-MASTER.md`
(bản 11/09/2026, 4 phần vai trò) · `Document/05-CHANGELOG-TOAN-DU-AN.md` ·
`Document/06-CHANGELOG-TIEP-NOI.md` · `20260821_TinTDD_W34_Note.md` ·
`20260828_TinTDD_W35_Note.md` · `20260904_TinTDD_W36_Note.md` ·
`Document/08-GDD-LEVEL-DESIGN.md` (bản 11/09/2026) · `Document/PLAYTEST-AUDIT-50-LEVELS.md` ·
`Document/09-TONG-HOP-AI-LOG-TOAN-DU-AN.md` (bản 09/09/2026, tiền thân trực tiếp của tài liệu
này) · `Final Outputs/GAME_DESIGN_DOCUMENT.md` (thay thế `07-GDD-TONG-HOP-TU-INDEX.md` cũ) ·
`Document/Market-Research-Block-Puzzle-va-Mahjong-Solitaire.md` · git log của repo (`6772a7d`,
`132aa50`, `348eb39`, `8b97d5e`, `af089b5`) · `Document/08-GDD-LEVEL-DESIGN.md` mục
"[Đổi luật 12/09/2026]" · cross-session message từ phiên AI khác (`mahjong-x-block-b4`) đang làm
việc song song trên cùng repo, báo cáo đã tự verify bằng `selfTest()` + Level Editor trước khi
xác nhận hoàn tất · danh sách file trong `Document/`, `Final Outputs/`, `Final Prototype/`,
`Level Design Document/`, `Figma UI Export/` (đối chiếu timestamp để xác nhận hoạt động gần
nhất, không suy diễn nội dung chưa có changelog).

*Lưu ý về nguồn từ 12/09/2026 trở đi: một phần nội dung Giai đoạn 14 dựa trên báo cáo do chính
phiên AI thực hiện thay đổi tự thuật lại qua cross-session message (không phải do phiên viết tài
liệu này tự đọc code xác minh), đối chiếu với `08-GDD-LEVEL-DESIGN.md` để tăng độ tin cậy. Do
nhiều phiên AI đang chạy song song trên cùng file (xem [[project_concurrent_session_editing_risk]]),
các con số/tên hàm cụ thể ở Giai đoạn 14 có thể lệch nếu có thêm chỉnh sửa sau thời điểm viết.*

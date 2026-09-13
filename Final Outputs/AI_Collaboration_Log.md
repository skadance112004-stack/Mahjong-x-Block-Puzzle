# AI Collaboration Log — Mahjong × Block

**Phạm vi:** toàn bộ quá trình làm việc với AI từ lúc bắt đầu dự án đến hiện tại (13/09/2026).
**Mục đích:** một điểm đọc duy nhất, theo đúng trình tự thời gian, gộp lại nội dung đang nằm rải
rác ở 8 tài liệu trong `Document/` (`01`–`06`, `08`, `09`), `Document/AILog_15082026.md`, 3 Weekly
Log (W34/W35/W36), Retro 21/08, `PLAYTEST-AUDIT-50-LEVELS.md`, `Final Outputs/GAME_DESIGN_DOCUMENT.md`
(nay `GDD.md`), `Document/Market-Research-Block-Puzzle-va-Mahjong-Solitaire.md`, và git log của
repo. Không suy diễn thêm — mỗi giai đoạn ghi rõ nguồn để đối chiếu. Các tài liệu gốc **vẫn giữ
nguyên**, không bị thay thế; tài liệu này chỉ là bản gộp để đọc nhanh toàn cảnh.

*Bản này kế thừa trực tiếp `Document/09-TONG-HOP-AI-LOG-TOAN-DU-AN.md` (mốc 09/09/2026), nối dài
qua các Giai đoạn 13–14, và nay được **định dạng lại** theo yêu cầu người dùng (13/09/2026) thành
5 mục cố định mỗi giai đoạn — xem "Định dạng ghi chép" ngay dưới đây.*

---

## Định dạng ghi chép (áp dụng từ 13/09/2026)

Mỗi giai đoạn dưới đây được hồi tố (retrofit, với các giai đoạn cũ) hoặc ghi trực tiếp (với giai
đoạn mới) theo đúng 5 mục:

- **Prompt / Bối cảnh** — yêu cầu hoặc tình huống khởi phát công việc (từ người dùng, từ phản hồi
  playtest, hoặc từ báo cáo của một phiên AI khác đang chạy song song).
- **Phản hồi & quyết định chính** — AI/đội đã làm gì, chốt gì.
- **Phương án — chọn / sửa / loại** — trong số các hướng được cân nhắc: hướng nào được **CHỌN**,
  hướng nào bị **SỬA** lại giữa chừng (đổi hướng nhưng giữ một phần), hướng nào bị **LOẠI** hẳn.
- **Lý do** — vì sao chọn/sửa/loại như vậy.
- **Kết quả kiểm thử** — cách nào dùng để xác nhận đúng (solver, self-test, playtest thật,
  Playwright, verify bằng Chrome thật...) và kết quả. Ghi "Không ghi nhận" khi nguồn không nêu rõ,
  thay vì suy diễn.

Với Giai đoạn 0–14 (viết trước khi định dạng này tồn tại), 5 mục được hồi tố lại từ đúng nội dung
đã có trong nguồn — không suy diễn thêm sự kiện mới ngoài những gì nguồn đã ghi.

---

## Giai đoạn 0 — Đề bài gốc (trước 13/08/2026)

*Nguồn: `Bai_tap_Mahjong_x_Block_Puzzle_SINGLE_HTML.pdf`.*

- **Prompt / Bối cảnh**: Đề bài gốc giao cho 1 người làm, trong khoảng 1 tháng.
- **Phản hồi & quyết định chính**: Công nghệ HTML/CSS/JS đóng gói 1 file tự chứa, chạy trên trình
  duyệt mobile; mục tiêu sản xuất dài hạn ~50 level; Mahjong và Block phải nằm trong **một core
  loop**, không phải hai minigame nối tiếp; đối tượng casual, thu hẹp thành nhóm **trên 35 tuổi**;
  ưu tiên ít thao tác (mặc định chỉ kéo–thả), không cần biết luật Mahjong truyền thống; kế hoạch
  4 Sprint (concept+prototype → vertical slice/tutorial → sản xuất level+playtest → freeze+QA).
- **Phương án — chọn/sửa/loại**: Không áp dụng — đây là brief/ràng buộc gốc, chưa có phương án kỹ
  thuật nào để so sánh.
- **Lý do**: Ràng buộc đề bài (1 file HTML, 1 người, 1 tháng, đối tượng casual 35+).
- **Kết quả kiểm thử**: Không áp dụng (chưa có sản phẩm để test).

---

## Giai đoạn 1 — 6 prototype đầu tiên (15–16/08/2026)

*Nguồn: `AILog_15082026.md`.*

- **Prompt / Bối cảnh**: Yêu cầu dựng nhiều hướng prototype để so sánh; sau đó "nêu pros and cons
  của từng thể loại"; sau đó "cho tôi 1 prototype mà thay vì dùng mahjong block, dùng bộ bài tây".
- **Phản hồi & quyết định chính**: Dựng 6 prototype HTML chơi được: **Mahjong Block Blast, Mahjong
  Collapse, Hand Builder, Mahjong Towers, Mahjong Battle, Mahjong Roguelike** + bảng so sánh
  (dễ hiểu/chiều sâu/vai trò Mahjong/khả năng chơi lại/độ khó phát triển) + 1 bản Poker
  (`07-card-blast.html`, giữ cùng bố cục/điều khiển để dễ so sánh).
- **Phương án — chọn/sửa/loại**: **CHỌN** Mahjong Block Blast làm core gameplay chính (dễ hiểu
  nhất, chi phí thấp nhất, phù hợp MVP nhanh). Các hướng còn lại không bị loại mà được gán vai trò
  phụ: Hand Builder → chế độ level/campaign; Mahjong Towers → cơ chế phụ trong một số level;
  Mahjong Collapse → chế độ arcade/event; Mahjong Battle → meta-game dài hạn; Mahjong Roguelike →
  chế độ endgame.
- **Lý do**: Block Blast "hai cơ chế kết hợp khá tự nhiên, ván ngắn phù hợp mobile casual, chi phí
  phát triển/cân bằng thấp nhất, dễ mở rộng"; các hướng khác có nhược điểm loại chúng khỏi vai trò
  core (Collapse: điều khiển khó trên phone, dễ căng thẳng cho casual; Hand Builder: khó hiểu hơn,
  không hợp chế độ vô tận thuần; Towers: Mahjong dễ thành cơ chế phụ, phụ thuộc may rủi vị trí ẩn;
  Battle: khó cân bằng nhất puzzle-vs-chiến đấu; Roguelike: khó tiếp cận nhất với casual).
- **Kết quả kiểm thử**: Prototype chơi được thật (playable HTML) cho cả 6+1 bản; chưa có
  self-test/solver tự động ở giai đoạn này (chưa tồn tại).

## Giai đoạn 2 — Mở rộng prototype nền (bản 08–10)

*Nguồn: `CHANGELOG.md` mục 0.*

- **Prompt / Bối cảnh**: Tiếp tục thử nghiệm biến thể trên nền Block Blast đã chọn ở Giai đoạn 1.
- **Phản hồi & quyết định chính**: 3 bản mới — 08 Mahjong Block 3-Layer (bàn 3 tầng); 09 Mahjong
  Meld-Only 3-Layer (chỉ tính bộ, không sảnh); 10 Layer Focus Tabs.
- **Phương án — chọn/sửa/loại**: **CHỌN** khái niệm **Layer** (từ bản 10) mang sang các giai đoạn
  sau (dùng xuyên suốt Giai đoạn 3+). Bản thân 08/09/10 không được chọn nguyên trạng làm nền —
  chỉ khái niệm "layer" của chúng sống sót vào vòng thử nghiệm tiếp theo.
- **Lý do**: Không nêu rõ trong nguồn (`CHANGELOG.md` mục 0 chỉ liệt kê, không giải thích sâu lý
  do từng bước).
- **Kết quả kiểm thử**: Không ghi nhận.

## Giai đoạn 3 — Hành trình khoá Core Gameplay (17–20/08/2026)

*Nguồn: `01-LICH-SU-THAY-DOI-DEN-FINAL-CORE.md`.*

- **Prompt / Bối cảnh**: Cần chốt core gameplay chính thức; tự đặt ra 5 tiêu chí đánh giá concept
  trước khi thử: (1) Removal Test — bỏ Mahjong/Block có sụp gameplay không; (2) một quyết định hay
  hai công đoạn; (3) Action load — giữ 1 thao tác chính; (4) Cognitive load phù hợp casual;
  (5) Level-design capacity đủ trục độ khó mịn.
- **Phản hồi & quyết định chính**: **Khoá Final Core 24K (20/08/2026)** sau 10 vòng thử — input 1
  drag–drop; board 6×6, tối đa 2 tầng preset (roof chỉ do level đặt, không tự xây); nguồn 1 current
  + 1 next, queue deterministic lặp vô hạn; piece polyomino ≥2 cell (mixed-ID); bỏ line clear, bỏ
  khay; Match 2 cùng ID/chạm cạnh/chỉ tầng dưới; cascade support mất → rơi → Match tiếp; thắng theo
  `pairGoal`; không timer/move limit/booster. Kèm 7 nguyên tắc "không đảo ngược khi lên production".
  Song song, `02-FINAL-CORE-GAMEPLAY-VA-HOOK.md` chốt 6 mục tiêu thiết kế puzzle (Hook rõ ràng, Dễ
  hiểu/dễ vào, Độ khó có chủ đích, Đúng feeling, Feature-freeze, Playtest có tiêu chí giữ core).
- **Phương án — chọn/sửa/loại**:
  - **LOẠI**: Pair & Drop/Patch/Flip/Route/Box (giữ cấu trúc Mahjong Puzzle cũ: khay 4 → Match 2 →
    công cụ → dùng trên board) — loop chia 2 pha rõ rệt.
  - **LOẠI**: 4 prototype coupling logic (Cặp Hóa Khối, Cặp An Toàn, Khay Là Nhiên Liệu, Recipe
    Line) — dựa resource/recipe, không tác động trực tiếp lên topology board.
  - **SỬA HƯỚNG**: Generation 2 (Pair & Sow/Tilt/Flip/Liberty/Chain) → rút ra quyết định quan
    trọng: không cần dựa vào boardgame cổ điển; ưu tiên cơ chế trực tiếp, ít luật, một drag, vẫn
    có chain.
  - **SỬA TIẾP**: quay lại Khay Tiêu Hóa, giản lược còn Match 2 tự động, một kéo-thả, không chọn
    pair/reorder/power-up/timer, giữ forecast.
  - Thử 24A/24B ("Auto Selective Digestion", "Overlap to Digest") → **SỬA**: đưa layer vào core
    (24C–24F) → **LOẠI** vì giữ quá nhiều luật cùng lúc thành feature soup.
  - **Bước ngoặt — SỬA thành CHỌN tạm**: bỏ khay, Match trực tiếp trên board (24G, 24H) — 24H
    (Roof on Board) là bản đầu tiên gộp layer + placement + Match vào cùng 1 quyết định kéo.
  - Thử thêm biến thể chạm core (24I Match 2+/Bridge, 24J Self-built Roof, 24L Repeat Move ×
    Same-layer Match) → không cái nào thay thế được 24H/24K.
  - 24K + gravity → phát hiện vấn đề (người chơi tự xây tầng trên khiến kết quả khó dự đoán;
    "clear đủ số loại" hướng về checklist thay vì cascade) → **SỬA** thành bản 24K khoá cứng cuối
    cùng (roof chỉ do level đặt, không tự xây).
- **Lý do**: Từng bước loại/sửa đều bám theo 5 tiêu chí đặt ra ở đầu giai đoạn — chi tiết lý do cụ
  thể nằm kèm mỗi bước thử ở trên (ví dụ: loại 2 hướng đầu vì vi phạm tiêu chí (2)/(1); sửa hướng
  giữa chừng vì phát hiện risk "feature soup" vi phạm tiêu chí (4)).
- **Kết quả kiểm thử**: Không ghi nhận kiểm thử tự động ở giai đoạn này (trước khi self-test/solver
  tồn tại) — đánh giá bằng 5 tiêu chí thiết kế tự đặt + chơi thử tay từng bản.

## Giai đoạn 4 — Nhánh Khay Tiêu Hóa mở rộng song song (bản 11–26)

*Nguồn: `CHANGELOG.md` (Nhật ký Prototype).*

- **Prompt / Bối cảnh**: Chạy song song với Giai đoạn 3 (không phải bản kế thừa của nó) — tiếp tục
  khai thác nhánh Khay Tiêu Hóa (từ bản 11) độc lập với nhánh gravity/drag 20–22.
- **Phản hồi & quyết định chính**:
  - **11 — Khay Tiêu Hóa**: đóng hàng không xoá quân ngay mà đưa vào Khay chờ; 3 quân giống nhau
    hoặc liên tiếp cùng chất tự nổ; khay tràn = thua. Bản này **được port sang Unity/C#**.
  - **12–19**: 5 ý hybrid khác biệt thật sự (không lấy Block Blast làm gốc so sánh), mỗi ý mượn
    đúng 1 hook từ 1 boardgame cổ điển (2048/Threes, Domino, Mahjong Connect, Rummikub, Othello,
    Connect Four).
  - **23–26** (kế thừa trực tiếp cơ chế 11): 23 đổi bộ 3→3-4-5; 24 hiểu lệch hướng; 25 sửa đúng ý;
    26 vẽ lại 3D low-poly (không đổi logic so với 25).
- **Phương án — chọn/sửa/loại**:
  - **Brainstorm giữa chừng** (không sinh file): **CHỌN** bỏ Sảnh chỉ giữ Phỗng. **LOẠI** hẳn 1
    batch ~10 ý mechanic "buff/bonus" vì không đổi quyết định lõi
    ([[feedback_core_over_buffs]]). **CHỌN tiếp tục cân nhắc** 1 batch 5 ý đổi core thật (Rummikub,
    Connect Four/domino, Cờ vây, Bingo, Nine Men's Morris).
  - **24 — LOẠI**: hiểu lệch hướng đề bài (quay về Match-2 kiểu Mahjong Solitaire) — giữ lại làm
    tham khảo, không dùng tiếp.
  - **25 — SỬA đúng ý**: giữ cơ chế 23, đổi bộ tối thiểu 3→2, thêm 2 tầng, trọng lực giữa 2 tầng,
    camera giả-isometric.
  - **26 — CHỌN** (thuần visual): vẽ lại bàn cờ bằng khối 3D low-poly thật, không đổi game logic
    so với 25.
- **Lý do**: Batch buff/bonus bị loại vì "không đổi quyết định lõi" — ghi nhận thành nguyên tắc
  lâu dài của dự án ([[feedback_core_over_buffs]]: brainstorm cơ chế đổi core loop, không phải lớp
  bonus thụ động). Bản 24 bị loại vì lệch hướng thiết kế đã định (quay về Match-2 cổ điển thay vì
  giữ tinh thần "chọn nơi đặt" của bản 11/23).
- **Kết quả kiểm thử**: Không ghi nhận kiểm thử tự động; đây chính là nhánh về sau có tên **Khay
  Tiêu Hóa ruleset** ([[project_khay_tieu_hoa_ruleset]]) — tại thời điểm viết tài liệu 01–03, nhánh
  này **chưa được playtest tay**.

## Giai đoạn 5 — Đảo ngược quy tắc Match: 24K → 24K-1 (20–21/08/2026)

*Nguồn: `03-LICH-SU-THAY-DOI-24K-DEN-24K1-TOP-MATCH.md`.*

- **Prompt / Bối cảnh**: Từ baseline 24K (chỉ tile z0 mới Match, roof chỉ do level đặt sẵn), mở
  nhánh thử nghiệm song song để xem đảo luật Match có tốt hơn không.
- **Phản hồi & quyết định chính**: Đổi luật Match sang "chỉ tile đang lộ (không bị che) mới Match
  được", đồng thời cho phép người chơi **chủ động xếp chồng** (player-stackable placement) — biến
  việc "che quân" thành lựa chọn chiến thuật chủ động. `proto-mechanic-match-top.html` →
  `24k-1.html` (10 màn sinh thủ tục) → **`24K-1-top-match-same-layer.html`: chốt làm gameplay
  chính**.
- **Phương án — chọn/sửa/loại**:
  - **CHỌN**: đổi thuật toán ghép cặp greedy → gom nhóm liên thông (match-3/4 tự nhiên).
  - **CHỌN + thêm rào chắn**: chống "baked self-match" trong 1 piece, **trừ Level 1** (ngoại lệ cố
    ý, ghi nhận thành quy tắc lâu dài).
  - **SỬA điều kiện thắng**: tổng `pairGoal` → phá đủ N tile của từng loại cụ thể (`winTargets`).
  - **SỬA**: thu nhỏ board 6×6 → 5×5.
  - **SỬA cách dạy**: dựng lại Màn 1 thành màn dạy luật 3 lượt không dùng chữ; **LOẠI** toàn bộ
    chữ giải thích cơ chế trong game, thay bằng `guideMoves` (ô nhấp nháy).
  - **SỬA 6 vòng**: hiệu ứng "tile đang bị đè" — chỉ áp dụng cho đúng 1/8 icon quân thiếu bóng đổ
    giả (7 icon còn lại đã có sẵn), sau khi đo pixel thật thay vì đoán.
  - **LOẠI vai trò chính**: `24K-lower-layer-gravity.html` (24K gốc) từ đây thành tài liệu tham
    khảo, không còn là gameplay chính.
- **Lý do**: Việc "che quân" biến thành quyết định chiến thuật thật thay vì hệ quả kỹ thuật thụ
  động; đổi điều kiện thắng vì `pairGoal` không đủ cụ thể cho thiết kế level đa dạng; loại chữ giải
  thích để giữ cognitive load thấp cho casual 35+ (nhất quán với Giai đoạn 3).
- **Kết quả kiểm thử**: Verify lại bằng **solver mô phỏng toàn bộ 10 level** sau khi đổi điều kiện
  thắng — phát hiện **2 lỗi thật** lúc đổi board/goal, đã sửa. Hiệu ứng hình ảnh được verify bằng
  đo pixel thật của asset gốc (không đoán mù).

## Giai đoạn 6 — UI/UX Spec "Hành Trình Qua Vườn Trúc" (21/08/2026)

*Nguồn: `FINAL-CORE-UI-UX-SPEC-TU-INDEX.md`, `Retro-Start-Stop-Continue-21082026.md`.*

- **Prompt / Bối cảnh**: Yêu cầu trung tâm — giữ concept cổng tre mở ra để vào game (Main Menu) +
  level select dạng con đường cổng xen kẽ; nâng chất lượng hình ảnh theo hướng Zen/Trung Hoa cổ;
  đảm bảo gameplay 24K-1 dễ đọc với casual 35+; không tăng thao tác hay thêm hệ meta gây nhiễu.
- **Phản hồi & quyết định chính**: Chốt design tokens, information architecture, thứ tự triển khai
  P0 (readability) → P1 (visual polish) → P2 (delight/accessibility).
- **Phương án — chọn/sửa/loại**:
  - **SỬA**: chữ quá nhỏ → nâng chuẩn tối thiểu 16px nội dung/14px caption.
  - **SỬA phong cách**: đang nghiêng casino (vàng sáng/đèn đỏ) → chuyển sang đồng cổ/ngọc bích.
  - **SỬA**: texture gỗ cạnh tranh với nội dung → giảm độ chiếm chỗ.
  - **LOẠI**: thao tác 2 bước lặp lại.
  - **SỬA**: màn khoá phụ thuộc grayscale + emoji 🔒 → đổi sang thanh gỗ/dây thừng vật lý.
  - **LOẠI toàn bộ**: UI legacy trong gameplay — Điểm, Khay chờ, Đổi khối, Xả quân — chỉ **giữ**
    Goal/Board 2 tầng/Current/Next/Help-Pause.
- **Lý do**: Đảm bảo thẩm mỹ Zen/Trung Hoa cổ nhất quán, không lẫn casino; giữ cognitive load thấp
  cho casual 35+ đúng nguyên tắc đã chốt từ Giai đoạn 3/5.
- **Kết quả kiểm thử**: Không ghi nhận kiểm thử tự động (giai đoạn spec/thiết kế). Retro cùng ngày
  đúc kết thói quen làm việc quan trọng — xem [[project_difficulty_safety_net_pattern]] — và bài
  học kỹ thuật: đọc đầy đủ dòng bị grep rút gọn trước khi kết luận an toàn; không đoán mù chỉnh sửa
  hình ảnh nhiều vòng mà không đo pixel thật; quét toàn file tìm hết tham chiếu trước khi xoá/sửa;
  xin log console khi nghi runtime error; hỏi lại phạm vi khi yêu cầu mơ hồ; viết/chạy test
  headless sau mỗi sửa lớn; backup trước khi merge lớn (dự án chưa có git lúc đó); dùng script đếm
  assertion khi sửa hàng loạt text/CSS.

## Giai đoạn 7 — GDD Master + kế hoạch Tuần 3–4 (24/08/2026)

*Nguồn: `04-GDD-FINAL-CORE-MASTER.md`.*

- **Prompt / Bối cảnh**: Chốt lại toàn bộ tiến độ Tuần 1–2 thành 1 GDD Master, lên kế hoạch Tuần
  3–4.
- **Phản hồi & quyết định chính**: Tuần 1–2 hoàn thành — engine P24K/P24M (board 2 tầng, polyomino
  2–5 ô, Match 2/3/4 cùng tầng-liền kề-đang lộ, cascade trọng lực); cơ chế **Phong Ấn (Seal)** và
  **Ô Chắn (Permanent)**; 4 loại goal (`PAIR_QUOTA`, `TARGET_FACE`, `OPEN_SEAL`, `BURIED_TARGET`);
  **30 level đầu** theo 5 hồi sư phạm, mỗi level có solution giải sẵn + verify tự động; redesign
  Main Menu (cổng tre) và Level Select.
- **Phương án — chọn/sửa/loại**:
  - **CHỌN**: quy mô chốt cứng cho Tuần 3–4 — vẫn 6×6 tối đa, 6 mặt quân, 30 level/3 chương.
  - **CHỌN**: monetization hướng Ads (interstitial + rewarded); platform chưa chốt nên thiết kế
    `AdService` theo hướng cắm-được-sau (không chốt cứng SDK cụ thể).
  - **Kế hoạch Tuần 3 (Audit + UI polish + Level polish) và Tuần 4 (AdService no-op + playtest cuối
    + đóng gói) bị SỬA/rẽ hướng ngay sau đó** (xem Giai đoạn 8) — đội ưu tiên thêm cơ chế core mới
    và scale nội dung thay vì đi tiếp đúng thứ tự Ads đã vạch.
- **Lý do**: Không nêu rõ lý do rẽ hướng khỏi kế hoạch Tuần 3–4 trong nguồn này (chỉ ghi nhận thực
  tế xảy ra); xem Giai đoạn 8 cho nội dung thay thế.
- **Kết quả kiểm thử**: Solution tự-verify cho từng level trong 30 level đầu (không nêu con số tổng
  self-test cụ thể ở giai đoạn này).

## Giai đoạn 8 — Tuần W35 (25–31/08/2026): cơ chế mới + scale + level editor + sound

*Nguồn: `06-CHANGELOG-TIEP-NOI.md`, `20260828_TinTDD_W35_Note.md`.*

- **Prompt / Bối cảnh**: Tiếp nối, rẽ hướng khỏi kế hoạch Ads-first của Giai đoạn 7 để ưu tiên cơ
  chế core mới + scale nội dung + level editor + sound design.
- **Phản hồi & quyết định chính**: `moveLimit` trở thành điều kiện thua mới; 2 booster core mới
  (Đổi khối/Reroll, Hint — Hint tự giải bằng DFS); mặt Wild/Joker (khớp bất kỳ mặt lộ cùng tầng);
  Level Editor nâng cấp kéo-thả trực quan + sinh level bằng ngôn ngữ tự nhiên (AI) kèm auto-solver;
  scale 30→50 level (thêm Chapter 4 Wild, Chapter 5 mastery); chế độ nguồn khối ngẫu nhiên có gate
  chứng minh còn đường thắng (Queue Pool/Random Shapes+Faces).
- **Phương án — chọn/sửa/loại**:
  - **CHỌN**: moveLimit + 2 booster mới, tích hợp thẳng vào core loop.
  - **CHỌN (về sau bị LOẠI, xem Giai đoạn 10)**: mặt Wild/Joker.
  - **SỬA (lệch hướng có chủ đích)**: chế độ Queue Pool/Random Shapes — lệch khỏi nguyên tắc "queue
    deterministic" đã chốt ở Giai đoạn 3, nhưng chỉ áp dụng cho level khai báo tường minh (không
    thay thế mặc định).
  - **ĐẢO NGƯỢC quyết định âm thanh**: dừng WebAudio tổng hợp cho tiếng đặt/phá tile → chuyển hẳn
    sang sample âm thanh thật nhúng base64; thêm nhạc nền lần đầu.
  - **DỪNG có chủ đích** (không phải loại vĩnh viễn): tạm ngưng UI mới cho Level Editor để ưu tiên
    verify tính giải được; dừng thử nghiệm cơ chế khác (xoay khối, băng chuyền, hoán đổi tile) để
    tập trung hoàn thiện đúng 1 cụm cơ chế mới trước.
- **Lý do**: moveLimit/booster tăng chiều sâu chiến thuật; Wild/Joker thêm biến thể mặt quân; sample
  âm thanh thật cho cảm giác chân thực hơn WebAudio tổng hợp; dừng polish Level Editor UI để ưu
  tiên đúng tính đúng đắn (correctness) trước thẩm mỹ công cụ nội bộ.
- **Kết quả kiểm thử**: Chạy lại **solver cho toàn bộ 50 level**; công cụ Playwright + script chụp
  màn hình để kiểm tra UI trực quan được đưa vào quy trình từ đây. Câu hỏi mở cuối tuần (chưa có
  câu trả lời): độ khó sau moveLimit+booster đã đủ thử thách chưa (cần playtest người thật); dữ
  liệu gộp 1 file HTML có ảnh hưởng độ mượt không.

## Giai đoạn 9 — 04/09/2026: Nhiệm Vụ Hàng Ngày + Điểm Danh 30 Ngày

*Nguồn: `06-CHANGELOG-TIEP-NOI.md`.*

- **Prompt / Bối cảnh**: Thêm hệ thống gắn kết dài hạn, xây thẳng vào `index.html`, ngồi TRÊN
  Economy đã có (không tạo kho riêng, không đổi luật thắng/thua).
- **Phản hồi & quyết định chính**: **Nhiệm Vụ Hàng Ngày** — mỗi ngày chọn cố định 3/6 nhiệm vụ mẫu
  (deterministic theo ngày qua `pickDailyQuests()`), đếm lại sự kiện core sẵn có, thưởng 20–30 Xu
  hoặc booster. **Điểm Danh 30 Ngày** — mô hình cộng dồn, không mất trắng khi lỡ ngày; mốc 10/20/30
  là quà lớn; ngày 30 xong quay vòng lại ngày 1. UI: 1 nút "🎯" mới ở Main Menu, modal 2 tab.
- **Phương án — chọn/sửa/loại**:
  - **CHỌN**: tái sử dụng `addCoins`/`setBoosterReroll`/`setBoosterHint` đã có, không tạo hệ thống
    kho riêng cho quest/check-in.
  - **CHỌN**: mô hình Điểm Danh cộng dồn "không phạt" thay vì streak truyền thống dễ mất trắng —
    nhất quán với [[project_difficulty_safety_net_pattern]].
- **Lý do**: Giữ tinh thần "không phạt" đã thấy xuyên suốt dự án (đúng như pattern đã ghi nhận);
  tránh tạo thêm 1 hệ kinh tế song song không cần thiết.
- **Kết quả kiểm thử**: **4 assertion mới trong self-test (34/34 check)** + chạy full luồng thật
  qua **Playwright** (thắng Lv1 → quest lên tiến độ → claim đúng số Xu, không lỗi console). Ghi
  chú: Monetization (Ads) của kế hoạch Tuần 4 gốc **chưa được bắt đầu** ở mốc này.

## Giai đoạn 10 — Tuần W36 (01–07/09/2026): Lock/Crack, đổi mô hình booster, UI tổng thể, Settings

*Nguồn: `20260904_TinTDD_W36_Note.md`, đối chiếu `07-GDD-TONG-HOP-TU-INDEX.md` cũ (đọc code 06/09;
tài liệu này về sau được viết lại và đổi tên thành `GAME_DESIGN_DOCUMENT.md`, nay `GDD.md`, xem
Giai đoạn 13).*

- **Prompt / Bối cảnh**: Tiếp tục mở rộng cơ chế + dọn lại kiến trúc booster/UI/Settings.
- **Phản hồi & quyết định chính**: Thêm **Khóa (Lock)** và **Nứt (Crack)**; chuyển đổi mô hình
  booster (bỏ cấp riêng theo level → kho dùng chung toàn game); làm mới toàn bộ giao diện game
  (tách Goal thành `#goal-strip`, bàn cờ mặc định gỗ thật, khoá tỉ lệ khung hình 16:9/9:16); Modal
  Cài đặt mới (2 thanh trượt âm lượng độc lập, haptic, i18n Việt/Anh/Trung); xây dựng Kinh tế Xu &
  Cửa Hàng đầy đủ (`computeWinCoins`, 3 tab Cửa Hàng, toàn bộ skin thuần cosmetic).
- **Phương án — chọn/sửa/loại**:
  - **CHỌN (về sau bị LOẠI hoàn toàn, xem dưới)**: cơ chế Nứt (Crack).
  - **CHỌN**: kho booster dùng chung toàn game, thay hẳn mô hình cấp riêng theo level.
  - **Đã gỡ bỏ sau đó (07/09/2026) — LOẠI HOÀN TOÀN**: mặt **Wild/Joker** (từ Giai đoạn 8) và cơ
    chế **Nứt (Crack)** — cả hai từng lập trình + tự kiểm nhưng **chưa từng được dùng trong bất kỳ
    level chính thức nào**, xoá hoàn toàn khỏi `index.html` và `level-editor.html` (code, CSS,
    self-test, tool tác giả level, schema AI-gen) theo yêu cầu dọn dẹp.
  - **SỬA/dọn nợ kỹ thuật (một phần)**: dọn phần gán-đè lãng phí của tầng engine "P24K V2"; xoá
    `startLevel(...)` tự chạy gây "chớp màn hình sai". **KHÔNG dọn** (quyết định giữ nguyên có chủ
    đích): tầng engine gốc cũ nhất ("Match 2 & Phá Ấn", ~1000 dòng) vẫn giữ nguyên làm chỗ trống
    bắt buộc — rủi ro dọn cao hơn lợi ích trong đợt này.
- **Lý do**: Wild/Joker và Crack bị loại vì **chưa từng dùng trong level chính thức nào** — chi phí
  bảo trì (code, self-test, tool) không tương xứng giá trị thực tế mang lại; dọn nợ kỹ thuật engine
  gốc bị hoãn vì rủi ro/lợi ích không tương xứng ở đợt này.
- **Kết quả kiểm thử**: Không nêu con số self-test cụ thể cho đợt Lock/Crack (thời điểm thêm); việc
  gỡ Wild/Joker/Crack ngày 07/09 được xác nhận qua rà soát code không còn level nào tham chiếu.
  Câu hỏi mở cuối tuần (chưa có câu trả lời): độ khó sau Lock/Crack + siết moveLimit/booster đã đủ
  thử thách chưa; hệ economy tự nhận "vẫn ở mức bản mẫu, mang tính cho có".

## Giai đoạn 11 — 06–08/09/2026: Playtest Audit 50 màn + cân bằng level design

*Nguồn: `PLAYTEST-AUDIT-50-LEVELS.md`, `08-GDD-LEVEL-DESIGN.md` (bản 08/09/2026).*

- **Prompt / Bối cảnh**: Cần audit playtest thật cho cả 50 màn (không chỉ replay solver offline) và
  cân bằng lại theo phản hồi playtest 2 persona (nam/nữ trung niên, đúng tệp mục tiêu).
- **Phản hồi & quyết định chính**: Playtest thật qua đúng engine (`p24kPlace`/`p24kResolveAnimated`)
  — 0 lỗi thật; phát hiện Lv3–10 "dễ hơn Lv2" do công thức độ khó không tính tổng số ô cần khớp;
  đồng bộ Lv10–20 về 5×5; chốt quy tắc mới (giới hạn số loại mahjong/màn, số nước dư tối thiểu,
  công thức điểm độ khó 7 thành phần).
- **Phương án — chọn/sửa/loại**:
  - **SỬA**: 12 màn "thắng sớm" ban đầu → giảm dần qua nhiều đợt sửa còn 2 màn (Lv28, Lv30 ở thời
    điểm đó) — nhưng đây **KHÔNG bị coi là lỗi cần loại bỏ hoàn toàn**: hiện tượng "thắng sớm +
    chơi tiếp nước thừa vô hại" được **CHỌN giữ nguyên có chủ đích**
    ([[project_difficulty_safety_net_pattern]]), chỉ giảm số lượng màn có hiện tượng này chứ không
    xoá hẳn.
  - **SỬA**: nâng tổng mục tiêu 5 màn (Lv3,4,5,6,10) lên bằng/vượt Lv2.
  - **LOẠI**: auto-guide ở 18 màn từng có `guideMoves>0` (đặt về 0) theo yêu cầu người dùng — hệ
    quả làm tăng điểm độ khó, gây lệch thứ tự đỉnh sóng Lv7/Lv13, **SỬA** bằng cách nới bàn/thêm
    seal trang trí (không đổi cách giải).
  - **CHỌN**: chuẩn hoá quy tắc "≤4 loại mahjong/màn (không kèm Seal/Permanent/Lock), ≤3 loại nếu
    có kèm" — mặt bị loại khỏi `winTargets` vẫn giữ trên bàn làm nội dung trang trí, không xoá
    tile/sequence/move đã thiết kế.
  - **CHỌN**: quy tắc "mọi màn nên có ≥2 nước dư", trừ Lv1 gốc và màn "Two Shots" (0 nước dư có chủ
    đích — **CHỌN giữ nguyên** dù trái quy tắc chung, vì playtest xác nhận "khó đúng gu").
- **Lý do**: Mọi thay đổi bám theo phản hồi **playtest 2 persona thật** ("quá nhiều loại phải nhớ
  cùng lúc" → giới hạn số loại; cần margin sai sót → quy tắc ≥2 nước dư) — không phải thay đổi cảm
  tính.
- **Kết quả kiểm thử**: Playtest thật cho cả 50 màn qua đúng engine; verify lại bằng **solver +
  self-test + playtest thật** sau mỗi đợt sửa; đồng bộ Lv10–20 verify bằng `design_helper.js` +
  engine thật; công thức điểm độ khó tính lại và ghi vào `Beatchart.xlsx` sau mỗi lần đổi 1 trong 7
  thành phần.

## Giai đoạn 12 — 09/09/2026: dọn dead code, chuẩn bị trình bày/bàn giao

*Nguồn: `Document/09-TONG-HOP-AI-LOG-TOAN-DU-AN.md` (viết lúc 09/09/2026).*

- **Prompt / Bối cảnh**: Không ghi nhận prompt cụ thể — suy ra từ bằng chứng file (`index.html.
  before-deadcode-removal-20260909-010931.bak`, 01:09 sáng 09/09) rằng một đợt dọn dead code vừa
  được yêu cầu/thực hiện trên `index.html`.
- **Phản hồi & quyết định chính**: Dọn dead code trên `index.html`; cập nhật lại `Beatchart.xlsx`
  (01:05 cùng ngày, khớp quy trình "chạy lại điểm độ khó sau mỗi thay đổi" từ Giai đoạn 11).
- **Phương án — chọn/sửa/loại**: Không ghi nhận chi tiết cụ thể (chưa có tài liệu changelog riêng
  mô tả nội dung đợt dọn dead code này tại thời điểm viết `09-...`).
- **Lý do**: Không ghi nhận.
- **Kết quả kiểm thử**: Không ghi nhận. Bối cảnh thêm: dự án lúc này đã có `Mahjong_x_Block_
  PitchDeck.pptx`, `Mahjong_x_Block_Presentation.pptx`, `Mahjong_x_Block_SourceSink.xlsx`, và bộ
  ảnh `Figma UI Export/` (13 màn hình, chụp 06/09) — cho thấy dự án bước sang giai đoạn chuẩn bị
  trình bày/bàn giao. Dự án lúc này **chưa có git**.

## Giai đoạn 13 — 11/09/2026: Đưa dự án lên Git, tái cấu trúc GDD theo vai trò, đổi luật Seal, nghiên cứu thị trường

*Nguồn: git log (`6772a7d` Push Project to Git · `132aa50` fix · `348eb39` optimize game ·
`8b97d5e` Chỉnh sửa GDD), `Final Outputs/GAME_DESIGN_DOCUMENT.md` (nay `GDD.md`), `Document/
08-GDD-LEVEL-DESIGN.md` (bản 11/09/2026), `Document/Market-Research-Block-Puzzle-va-Mahjong-
Solitaire.md`.*

- **Prompt / Bối cảnh**: Đưa dự án lên Git lần đầu; yêu cầu người dùng đổi luật Seal; yêu cầu
  nghiên cứu thị trường độc lập (phiên AI khác).
- **Phản hồi & quyết định chính**:
  - Đổi tên thư mục sản phẩm **`Final Core` → `Final Outputs`** khi push lên Git lần đầu.
  - Xác minh lại bằng Chrome/Puppeteer thật (không chỉ đọc code) rằng nút Help cũ và overlay luật
    "Match 2 & Phá Ấn" thực sự không thể chạm tới được bởi người chơi.
  - Viết lại toàn bộ `04-GDD-FINAL-CORE-MASTER.md` theo 4 phần vai trò (Game Designer / Engineer /
    Hoạ sĩ-Âm thanh / Producer).
  - Đổi luật Seal sang yêu cầu match kề sát; đảo thứ tự Chương 2/3 (Ô Chắn dạy trước Seal); nghiên
    cứu thị trường mới (Block Blast!, Mahjong Solitaire).
- **Phương án — chọn/sửa/loại**:
  - **SỬA cấu trúc tài liệu**: gộp bảng "nguyên tắc đã chốt cũ (bản 08-24) vs thực tế hiện tại" vào
    1 bảng duy nhất ở đầu `04-GDD-FINAL-CORE-MASTER.md`, thay vì rải rác — để không ai vô tình coi
    bản cũ còn hiệu lực.
  - **CHỌN (về sau bị ĐẢO NGƯỢC 1 ngày sau — xem Giai đoạn 14)**: Seal đòi hỏi match **kề sát trực
    tiếp** với ô Seal, không tính match ở nơi khác trên bàn dù đủ N mặt khác nhau. Bổ sung self-test
    mới `every_seal_level_opens_in_its_own_solution`.
  - **CHỌN**: đảo thứ tự Chương 2/3 — Ô Chắn (Permanent, đơn giản hơn — chặn vĩnh viễn không điều
    kiện) dạy trước ở Ch2 (Lv11–20); Phong Ấn (Seal, nay phức tạp hơn vì thêm ràng buộc kề-sát) dạy
    sau ở Ch3 (Lv21–30) — ngược thứ tự cũ ở Giai đoạn 7/11.
  - **SỬA nội dung 4 màn**: 4 màn từng kết hợp Seal+Permanent ở vị trí Ch2 cũ ("Double Block",
    "Open Route", "Three Faces Two Stations", "Chapter Final Exam") thiết kế lại thành **Permanent
    thuần** vì Seal chưa được dạy tại thời điểm đó trong thứ tự mới — tile/sequence/solution giữ
    nguyên, chỉ đổi loại ô chặn.
  - **CHẤP NHẬN có chủ đích 1 vi phạm quy tắc**: "độ khó tăng dần theo chương" — sau đổi chỗ, Ch2
    (TB 40.6) cao hơn Ch3 (TB 33.5), vì đợt này chỉ hoán đổi vị trí nội dung mà chưa cân bằng lại
    độ khó nội tại theo vị trí sư phạm mới — ưu tiên thứ tự dạy cơ chế hợp lý hơn đường cong độ khó
    tuyệt đối trong đợt này (**việc cần làm sau, chưa làm**).
  - **CHỌN đổi tên**: `07-GDD-TONG-HOP-TU-INDEX.md` viết lại + đổi tên thành `GAME_DESIGN_DOCUMENT.
    md` (git rename `R089`, không phải xoá+tạo mới).
  - **SỬA vị trí file deliverable**: `Mahjong_x_Block_Beatchart.xlsx` chuyển từ `Document/` sang
    `Final Outputs/`; **LOẠI** bản `Mahjong_x_Block_Pitch_Deck.pptx` cũ + file `.inspect.ndjson`
    khỏi `Final Outputs/`; **thêm mới** `index.devtest.html` (build tách riêng cho test/audit).
- **Lý do**: Ràng buộc kề-sát cho Seal nhằm tăng độ chủ động chiến thuật (theo yêu cầu người dùng);
  đảo Ch2/Ch3 vì Ô Chắn về bản chất đơn giản hơn Seal-kề-sát nên hợp lý dạy trước; đổi tên
  GAME_DESIGN_DOCUMENT.md để có 1 nguồn gameplay/cơ chế duy nhất, dễ tham chiếu hơn tên `07-...`.
- **Kết quả kiểm thử**: Xác minh nút Help bằng `getComputedStyle`=`display:none`,
  `getBoundingClientRect`=0, click Puppeteer thất bại ("Node is either not clickable or not an
  Element"). Seal-kề-sát verify bằng self-test mới + `model.sealAdjacentCounts`/`model.sealOpen`
  sau khi replay `solution`. Nghiên cứu thị trường: web search + trích dẫn nguồn công khai (không
  dùng số liệu nội bộ trả phí), tự nêu rõ giới hạn phương pháp luận ở mục 7 của tài liệu đó.
  **Cập nhật quan trọng**: luật Seal kề-sát ở trên **bị đảo ngược lại chỉ 1 ngày sau (12/09/2026)**
  — xem Giai đoạn 14; đoạn trên vẫn đúng làm mốc lịch sử nhưng không còn phản ánh luật hiện hành.

## Giai đoạn 14 — 12/09/2026: Đảo ngược luật Seal (kề-sát → đếm khắp bàn, mỗi ô Seal có ngưỡng riêng) + nhiều phiên AI chạy song song

*Nguồn: `Document/08-GDD-LEVEL-DESIGN.md` mục "[Đổi luật 12/09/2026]" (đối chiếu code) · báo cáo
qua cross-session message của phiên AI khác đang làm việc trên cùng repo (tên phiên
`mahjong-x-block-b4`), tự xác nhận đã chạy `selfTest()` (33 check, xanh) + kiểm tra thật trên
Level Editor (không lỗi console) trước khi báo hoàn tất.*

- **Prompt / Bối cảnh**: Yêu cầu người dùng (gửi tới phiên AI khác, `mahjong-x-block-b4`) đảo
  ngược luật Seal kề-sát vừa chốt ở Giai đoạn 13. Đồng thời, kể từ khoảng 11–12/09/2026, dự án bắt
  đầu được nhiều **phiên Claude Code chạy song song** (quan sát được ít nhất 5 phiên cùng lúc)
  chỉnh sửa trực tiếp `Final Outputs/index.html` và các tài liệu GDD — khác hẳn 1 AI session tuyến
  tính duy nhất như Giai đoạn 0–13.
- **Phản hồi & quyết định chính**: Bỏ hẳn yêu cầu "match phải kề sát ô Seal" — Seal quay lại đếm số
  mặt khác nhau đã match ở **bất kỳ đâu trên bàn**, dùng chung bộ đếm với TARGET_FACE/Lock
  (`model.idCounts`); nhưng **không quay lại y hệt bản gốc trước 11/09** — giữ lại thay đổi cấu
  trúc `level.seals=[r,c,required]` (mỗi ô Seal có ngưỡng riêng, thay vì 1 `sealRequiredDistinct`
  chung cho cả màn). Thêm badge UI riêng cho từng ô Seal + dòng tổng hợp "đã mở/tổng số Seal".
- **Phương án — chọn/sửa/loại**:
  - **LOẠI**: yêu cầu kề-sát + `model.sealAdjacentCounts` (xoá khỏi code) — đảo ngược hoàn toàn
    quyết định của Giai đoạn 13.
  - **CHỌN giữ lại (không revert)**: cấu trúc `level.seals` dạng bộ ba `[r,c,required]` — cải tiến
    thật so với bản gốc trước 11/09 (khi đó `sealRequiredDistinct` dùng chung cấp-màn), cho phép
    nhiều Seal trên cùng bàn mở ở các mốc khác nhau của cùng 1 bộ đếm.
  - **SỬA hàm kiểm tra thắng**: `model.sealOpen` (đã xoá) → `p24kSealsAllOpen(level, model.
    idCounts)`.
  - **Phạm vi áp dụng — CHỌN**: cả 17 màn có Seal; đồng bộ `04-GDD-FINAL-CORE-MASTER.md`,
    `08-GDD-LEVEL-DESIGN.md`, và `level-editor.html` (UI soạn Seal đổi từ 1 ô nhập chung sang danh
    sách Seal từng-ô-một) — phiên báo cáo xác nhận thay đổi trong `level-editor.html` **không**
    đụng tới các sửa lock/dragstart/faceEmoji mà phiên khác đang làm cùng lúc (phối hợp qua
    cross-session message để tránh xung đột).
- **Lý do**: Đảo ngược theo yêu cầu trực tiếp của người dùng (không nêu lý do sâu hơn trong nguồn);
  giữ lại cấu trúc per-cell `required` vì đó là cải tiến độc lập với quyết định kề-sát/không-kề-sát
  — không có lý do để bỏ luôn khi revert phần kia.
- **Kết quả kiểm thử**: `selfTest()` — **33 check, xanh** (do chính phiên `mahjong-x-block-b4` chạy
  và báo cáo qua cross-session message) + kiểm tra thật trên Level Editor (load/vẽ/sửa ô Seal,
  không lỗi console). **Ghi chú độ tin cậy**: phần này dựa một phần trên báo cáo tự thuật của phiên
  thực hiện thay đổi (không phải do phiên viết log này tự đọc code xác minh trực tiếp lúc đó), đối
  chiếu với `08-GDD-LEVEL-DESIGN.md` để tăng độ tin cậy — xem [[project_concurrent_session_editing_risk]]
  về rủi ro drift khi nhiều phiên AI cùng sửa 1 file.

## Giai đoạn 15 — 12–13/09/2026: Refine Pitch Deck, viết Assets.md, và phối hợp đa phiên AI trên cùng repo

*Nguồn: trực tiếp từ phiên AI viết tài liệu này (không qua báo cáo gián tiếp) — thao tác + kiểm thử
tự thực hiện và tự xác minh trong cùng phiên.*

- **Prompt / Bối cảnh**: (1) "cập nhật lại slide thuyết trình, refine" — người dùng yêu cầu refine
  1 trong 4+ bản pitch deck đang tồn tại trong dự án. (2) "hiện tôi muốn tạo 1 file assets.md để
  ghi nguồn những assets mà tôi đã sử dụng" — ghi nguồn asset đã dùng vào file có sẵn trong
  `Final Outputs/`. Song song, nhiều phiên AI khác (`mahjong-x-block-b4/c3/f8/26`...) liên tục gửi
  cross-session message hỏi xác nhận không có xung đột chỉnh sửa trên cùng `Final Outputs/
  MahjongXBlock.html` (khi đó còn tên `index.html`) và các file GDD.
- **Phản hồi & quyết định chính**:
  - Vì yêu cầu refine pitch deck mơ hồ (4+ file deck khác nhau tồn tại: `Mahjong_x_Block_
    PitchDeck.pptx`, `Mahjong_x_Block_Presentation.pptx`, 1 bản "ancient Chinese" build dở dang,
    1 thư mục "Pitch Deck Revised" rỗng) → **hỏi lại người dùng** trước khi làm (2 câu hỏi: chọn
    file nào, "refine" nghĩa là gì).
  - Đã chọn: `Document/Mahjong_x_Block_PitchDeck.pptx`, refine cả nội dung lẫn hình thức. Cập nhật
    số self-test (31/31 → 33/33, đếm trực tiếp từ code) trên 2 slide; thêm 1 dòng bằng chứng thị
    trường có trích dẫn (Block Blast! #1 thế giới Q1/2026) vào slide "CƠ HỘI THỊ TRƯỜNG"; thêm
    speaker notes/nguồn cho 4 slide mang số liệu (trước đó toàn bộ speaker notes đang trống).
  - Viết `Assets.md`: rà toàn bộ comment nguồn gốc asset trong code (`MahjongXBlock.html`) + liệt
    kê file thật trong `Assets/Sounds/` và `Assets/Art-References/`, đối chiếu để xác nhận file nào
    thực sự được nhúng/dùng, file nào có mặt trong thư mục nhưng chưa được code tham chiếu.
- **Phương án — chọn/sửa/loại**:
  - **LOẠI** cách tiếp cận "dùng LibreOffice/render để visual-QA thay đổi pptx" — không có sẵn
    trong môi trường; **CHỌN** thay thế bằng chỉnh sửa XML trực tiếp qua `jszip` (surgical text
    replace + thêm 1 shape mới đúng theo style đã có), validate bằng `fast-xml-parser` thay vì
    render hình để kiểm tra.
  - **LOẠI** việc dựng lại toàn bộ deck từ đầu bằng `pptxgenjs` (rủi ro làm mất thiết kế đã có sẵn,
    không kiểm chứng được bằng mắt) — **CHỌN** chỉnh sửa tối thiểu, đúng chỗ, giữ nguyên toàn bộ
    phần còn lại.
  - **LOẠI** việc tự bịa link Pixabay chính xác cho các track chưa có URL xác nhận (`freesound_
    community-...`, `soundreality-...`, `dragon-studio-...`) — **CHỌN** chỉ ghi tác giả/ID suy ra từ
    quy ước đặt tên file, đánh dấu "chưa có link cụ thể đã xác nhận" thay vì đoán URL.
  - **CHỌN** đánh dấu 2 file âm thanh (`dragon-studio-button-press-382713.mp3`,
    `Bamboo_Door_toggle2.ogg.mp3`) là "có trong thư mục nhưng chưa nhúng/dùng" sau khi grep code
    không thấy tham chiếu — thay vì mặc định coi chúng đã được dùng.
  - **Không tự sửa/không tự xoá** khi phát hiện `Assets.md` bị người khác chỉnh sửa trực tiếp trên
    đĩa ngay sau đó (điền link `Mahjong.png` thật + thêm dòng tham khảo Anisimova) — giữ nguyên
    theo đúng quy tắc "không tự ý revert thay đổi trông có vẻ chủ đích".
- **Lý do**: Ưu tiên an toàn/khả năng xác minh (validate XML, đối chiếu code thật) hơn tốc độ/thẩm
  mỹ tối đa khi không thể render để tự kiểm tra bằng mắt; không bịa URL vì rủi ro cung cấp nguồn sai
  cao hơn giá trị của việc "có vẻ đầy đủ".
- **Kết quả kiểm thử**: Toàn bộ 7 phần XML bị sửa trong `.pptx` (3 slide + 4 notes slide) **validate
  VALID 100%** bằng `fast-xml-parser`; đối chiếu lại bằng cách trích xuất text sau khi sửa để xác
  nhận đúng và chỉ đúng nội dung dự kiến thay đổi (không có thay đổi ngoài ý muốn). Bản gốc trước
  khi sửa **đã xác nhận có trong lịch sử git** (`af089b5`) nên không cần giữ file backup cục bộ dư
  thừa. Song song, phối hợp qua **6+ lượt cross-session message** với các phiên khác (`b4`, `c3`,
  `f8`, `26`) để loại trừ xung đột chỉnh sửa trên `MahjongXBlock.html`/level data — mỗi lần đều xác
  nhận bằng `git status`/mtime thật trước khi trả lời, không suy đoán.

---

## Trạng thái hiện tại — tóm tắt kỹ thuật (tính đến 13/09/2026)

*Chi tiết đầy đủ nằm ở `Final Outputs/GDD.md` (trước đó `GAME_DESIGN_DOCUMENT.md`, 4 phần theo vai
trò) và `Document/08-GDD-LEVEL-DESIGN.md`; đây chỉ là gạch đầu dòng để tra nhanh. Lưu ý: nhiều tên
file trong `Final Outputs/` đã được 1 phiên AI khác đổi lại trong lúc viết tài liệu này (`index.
html`→`MahjongXBlock.html`, `GAME_DESIGN_DOCUMENT.md`→`GDD.md`, và chính log này từ
`AI_LOG_TONG_HOP.md`→`AI_Collaboration_Log.md`) — các Giai đoạn 0–14 phía trên vẫn dùng tên file cũ
tại đúng thời điểm chúng được ghi, không hồi tố đổi tên ngược.*

- **Core loop**: kéo 1 polyomino (2–5 ô, mixed-ID) vào bàn N×N (2×2 đến 6×6 tuỳ level) tối đa 2
  tầng; mỗi ô tự rơi tầng thấp nhất còn trống; 2+ quân cùng mặt/cùng tầng/liền kề/đang lộ Match
  cùng lúc (nhóm, không chỉ cặp); support mất → quân trên rơi → cascade nhiều wave.
- **Goal type**: `TILE_QUOTA` (5 màn), `TARGET_FACE` (32), `OPEN_SEAL` (6), `BURIED_TARGET` (7).
- **Blocker**: Ô Chắn/Permanent (vĩnh viễn, ~28 màn dùng, dạy trước ở Ch2), Phong Ấn/Seal (đếm số
  mặt khác nhau đã match ở bất kỳ đâu trên bàn, mỗi ô Seal có ngưỡng `required` riêng qua
  `level.seals=[r,c,required]`, 17 màn, dạy sau ở Ch3), Khóa/Lock (N quân 1 mặt cụ thể theo từng
  nhóm ô, ~16 màn). Wild/Joker và Nứt/Crack đã bị gỡ bỏ hoàn toàn (07/09/2026).
- **Nội dung**: 50 level (5 chương × 10, thứ tự Ch2/Ch3 đã đảo so với bản trước 11/09/2026), mỗi
  level có solution giải sẵn + verify tự động; chỉ Lv1 còn giữ `guideMoves` (auto-guide).
- **Booster**: Đổi khối + Hint, kho dùng chung toàn game, nạp thêm qua Cửa Hàng; Level 1 luôn khoá
  booster.
- **Kinh tế**: công thức Xu theo `computeWinCoins()`; Cửa Hàng 3 tab (12 skin tile, 11 skin bàn,
  gói booster 100 Xu/5 lượt); khoảng giá skin 895–2.265 Xu/món (xác nhận trực tiếp từ dữ liệu sống
  13/09/2026); toàn bộ skin thuần cosmetic. Tự nhận "vẫn ở mức bản mẫu, cần cân bằng lại".
- **Gắn kết dài hạn**: Nhiệm Vụ Hàng Ngày (3/6, chọn theo ngày) + Điểm Danh 30 Ngày (cộng dồn,
  không phạt khi lỡ ngày).
- **UI/UX**: thẩm mỹ "Hành Trình Qua Vườn Trúc" (Trung Hoa cổ, tre/gỗ/ngọc bích); khoá tỉ lệ khung
  hình 16:9/9:16; Cài đặt (âm lượng riêng nhạc/hiệu ứng, haptic, i18n Việt/Anh/Trung).
- **Âm thanh**: sample thật (Pixabay/Freesound Community/soundreality, xem `Assets.md`) nhúng
  base64 cho SFX đặt/match/switch chính + nhạc nền; tiếng "cạch" nút UI dùng lại sample switch qua
  `window.__switchSfxBuffer`.
- **Kỹ thuật**: 1 file HTML tự chứa (`Final Outputs/MahjongXBlock.html`, trước đó `index.html`);
  `p24mSelfTest()` — **33 check xanh** (xác nhận 13/09/2026, số này tăng dần theo thời gian khi
  thêm luật mới); Level Editor riêng hỗ trợ kéo-thả + AI-gen level + auto-solver.
- **Tài liệu master**: `Document/04-GDD-FINAL-CORE-MASTER.md` chia 4 phần theo vai trò;
  `Final Outputs/GDD.md` (trước đó `GAME_DESIGN_DOCUMENT.md`, thay thế `07-GDD-TONG-HOP-TU-INDEX.
  md` cũ) là nguồn gameplay/cơ chế chính; `Final Outputs/Assets.md` mới — nguồn asset âm
  thanh/hình ảnh đã dùng.
- **Môi trường làm việc mới (từ ~11/09/2026)**: nhiều phiên Claude Code chạy song song trên cùng
  repo — xem [[project_concurrent_session_editing_risk]]; một số nội dung Giai đoạn 14–15 dựa một
  phần trên báo cáo cross-session từ các phiên khác, không phải quan sát trực tiếp 100%.
- **Chưa làm / còn mở**: Monetization (Ads/`AdService`) chưa bắt đầu; nợ kỹ thuật tầng engine gốc
  cũ nhất chưa dọn hết; độ mượt trên thiết bị yếu chưa có câu trả lời từ playtest thật; Queue
  Pool/Random Shapes mới chỉ kiểm bằng bot; hệ economy tự nhận "vẫn ở mức bản mẫu"; **Ch2 hiện khó
  hơn Ch3 sau khi đổi chỗ dạy Ô Chắn/Seal — cân bằng lại độ khó theo vị trí mới chưa được thực
  hiện**; nguồn gốc ảnh gốc `Assets/Art-References/Mahjong.png` trước khi được người dùng bổ sung
  link `blueeyedrat.itch.io` — nay đã có, xem `Assets.md`.

---

## Câu hỏi follow-up lặp lại xuyên suốt các tuần (chưa có câu trả lời chốt)

- UI dựa hoàn toàn trên nền HTML thì tạo được game feel tốt tới đâu?
- 1 file HTML có đủ tối ưu cho 50 level (+ âm thanh + Cửa Hàng/skin) không, có ảnh hưởng độ mượt
  trên thiết bị yếu không?
- Độ khó sau mỗi đợt thêm cơ chế (moveLimit+booster, rồi Lock, rồi đổi chỗ Ch2/Ch3) đã đủ thử
  thách cho tệp người chơi mục tiêu (casual 35+) chưa — hay vẫn cần playtest người thật để hiệu
  chỉnh, không chỉ dựa công thức?
- Hệ economy (Xu/Cửa Hàng) hiện tại có đang chỉ "cho có" hay đã đúng vai trò lâu dài?
- Khi nào thực hiện đợt cân bằng lại để Ch2 (Ô Chắn) không còn cao điểm độ khó hơn Ch3 (Phong Ấn)?
- **Mới (13/09/2026)**: với 5+ phiên AI chạy song song trên cùng file `MahjongXBlock.html`, cần quy
  trình điều phối chính thức nào (không chỉ dựa vào cross-session message tự phát) để tránh drift/
  xung đột tái diễn khi dự án tiếp tục mở rộng?

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
`Document/08-GDD-LEVEL-DESIGN.md` (bản 11–13/09/2026) · `Document/PLAYTEST-AUDIT-50-LEVELS.md` ·
`Document/09-TONG-HOP-AI-LOG-TOAN-DU-AN.md` (bản 09/09/2026, tiền thân trực tiếp của tài liệu
này) · `Final Outputs/GDD.md` (trước đó `GAME_DESIGN_DOCUMENT.md`, thay thế
`07-GDD-TONG-HOP-TU-INDEX.md` cũ) · `Document/Market-Research-Block-Puzzle-va-Mahjong-Solitaire.md`
· `Final Outputs/Assets.md` · git log của repo (`6772a7d`, `132aa50`, `348eb39`, `8b97d5e`,
`af089b5`) · `Document/08-GDD-LEVEL-DESIGN.md` mục "[Đổi luật 12/09/2026]" · cross-session message
từ các phiên AI khác đang làm việc song song trên cùng repo (`mahjong-x-block-b4`, `c3`, `f8`,
`26`...), mỗi lần đối chiếu bằng `git status`/mtime thật trước khi ghi nhận · danh sách file trong
`Document/`, `Final Outputs/`, `Final Prototype/`, `Level Design Document/`, `Figma UI Export/`,
`Assets/` (đối chiếu timestamp để xác nhận hoạt động gần nhất, không suy diễn nội dung chưa có
changelog).

*Lưu ý về nguồn từ 12/09/2026 trở đi: một phần nội dung Giai đoạn 14 dựa trên báo cáo do chính
phiên AI thực hiện thay đổi tự thuật lại qua cross-session message (không phải do phiên viết tài
liệu này tự đọc code xác minh trực tiếp lúc đó), đối chiếu với `08-GDD-LEVEL-DESIGN.md` để tăng độ
tin cậy. Giai đoạn 15 trở lên do chính phiên viết tài liệu này trực tiếp thực hiện và kiểm thử. Do
nhiều phiên AI đang chạy song song trên cùng file (xem [[project_concurrent_session_editing_risk]]),
các con số/tên file cụ thể có thể lệch nếu có thêm chỉnh sửa sau thời điểm viết — luôn đối chiếu
`git log`/code sống trước khi dựa vào số liệu cũ trong tài liệu này để hành động.*

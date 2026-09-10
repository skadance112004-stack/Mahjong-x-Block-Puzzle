# Changelog Dự Án — Mahjong × Block

Tổng hợp các **goal rõ ràng** đã được đặt ra từ lúc bắt đầu dự án đến hiện tại (24/08/2026), theo đúng thứ tự thời gian. Chỉ ghi lại mục tiêu/yêu cầu/quyết định đã được nêu tường minh trong tài liệu dự án — không suy diễn, không thêm ý ngoài nguồn, không lược bớt goal đã có. Mỗi mục ghi rõ nguồn để đối chiếu.

**Phạm vi:** tài liệu này chỉ tổng hợp phần **thiết kế/prototype HTML** (`Document/`, `Final Core/`, `mahjong-block-blast-prototypes/`). Phần dựng project Unity/port C#/Unity-MCP (nếu có) nằm ngoài phạm vi, theo đúng quy ước đã đặt ra trong `CHANGELOG.md` gốc.

---

## Giai đoạn 0 — Đề bài gốc (trước 13/08/2026)

*Nguồn: `Bai_tap_Mahjong_x_Block_Puzzle_SINGLE_HTML.pdf`, tổng hợp lại tại `01-LICH-SU-THAY-DOI-DEN-FINAL-CORE.md` mục 2.*

Ràng buộc/goal ban đầu:

- Một người thực hiện, trong khoảng một tháng.
- Công nghệ: HTML, CSS, JavaScript.
- Playable build chạy được trên trình duyệt mobile, đóng gói trong một file HTML tự chứa.
- Mục tiêu sản xuất dài hạn: khoảng 50 level.
- Mahjong và Block phải nằm trong **một core loop**, không phải hai minigame nối tiếp nhau.
- Người chơi mục tiêu: casual — về sau thu hẹp thành nhóm **trên 35 tuổi**.
- Ưu tiên ít loại thao tác; mặc định chỉ dùng kéo–thả.
- Không phụ thuộc hiểu biết luật Mahjong truyền thống.
- Kế hoạch 4 Sprint: (1) chốt concept + prototype core, (2) vertical slice + tutorial + game flow, (3) sản xuất level + đường cong độ khó + playtest, (4) feature freeze + QA + polish + đóng gói.

---

## Giai đoạn 1 — 6 prototype ý tưởng đầu tiên (15–16/08/2026)

*Nguồn: `AILog_15082026.md`.*

- Goal: dựng **6 prototype HTML chơi được** để so sánh hướng đi core gameplay: Mahjong Block Blast, Mahjong Collapse, Hand Builder, Mahjong Towers, Mahjong Battle, Mahjong Roguelike.
- Goal: đánh giá pros/cons từng hướng để chọn core chính. Kết quả đề xuất: **Mahjong Block Blast làm core gameplay chính**; Hand Builder cho chế độ level/campaign; Mahjong Towers làm cơ chế phụ trong một số level; Mahjong Collapse cho chế độ arcade/event; Mahjong Battle cho meta-game dài hạn; Mahjong Roguelike cho endgame.
- Goal: dựng thêm 1 prototype dùng **bộ bài Tây (Poker)** thay thế mặt Mahjong, giữ cùng bố cục/điều khiển để so sánh (`07-card-blast.html`).

---

## Giai đoạn 2 — Mở rộng prototype nền (08–10, trước phiên tài liệu hoá)

*Nguồn: `CHANGELOG.md` mục 0.*

- 08 — Mahjong Block 3-Layer: bàn 3 tầng.
- 09 — Mahjong Meld-Only 3-Layer: bàn 3 tầng, chỉ tính bộ (không sảnh).
- 10 — Layer Focus Tabs: luật "lộ diện" theo tầng — nguồn gốc khái niệm **Layer** dùng xuyên suốt các giai đoạn sau.

---

## Giai đoạn 3 — Hành trình tìm khoá Core Gameplay (17–20/08/2026)

*Nguồn: `01-LICH-SU-THAY-DOI-DEN-FINAL-CORE.md`.*

Goal đặt ra cho cả giai đoạn: dựng **5 tiêu chí đánh giá** concept — (1) Removal Test: bỏ Mahjong hoặc bỏ Block gameplay có sụp đổ rõ ràng không; (2) một quyết định hay hai công đoạn; (3) Action load — giữ 1 thao tác chính; (4) Cognitive load phù hợp casual; (5) Level-design capacity đủ trục độ khó mịn.

1. **Bộ concept Pair & Drop/Patch/Flip/Route/Box** — goal: giữ cấu trúc Mahjong Puzzle quen thuộc (khay 4 → Match 2 → nhận công cụ → dùng trên board). Quyết định: không chọn làm core — loop bị chia hai pha rõ rệt.
2. **4 prototype coupling logic** (Cặp Hóa Khối, Cặp An Toàn, Khay Là Nhiên Liệu, Recipe Line) — goal: kiểm tra "A tạo B, B tạo A" có đủ sức nặng không. Kết luận: cần một luật tác động trực tiếp lên topology board, không phải resource/recipe.
3. **Generation 2** (Pair & Sow/Tilt/Flip/Liberty/Chain) — goal: mượn verb từ boardgame cổ điển để tìm emergence. Quyết định quan trọng: **không cần dựa vào boardgame cổ điển**; ưu tiên cơ chế trực tiếp, ít luật, một drag, vẫn có chain reaction.
4. **Quay lại Khay Tiêu Hóa** — nguyên tắc giản lược được chốt: chuyển về Match 2, tự động xử lý pair, một thao tác kéo–thả, không chọn pair/không reorder khay/không power-up/không timer; giữ forecast.
5. **24A/24B trên UI gốc** — thử "Auto Selective Digestion" và "Overlap to Digest".
6. **Đưa layer Mahjong vào core** (24C–24F) — thử bounded buffer/accessibility graph, kết luận: giữ đồng thời quá nhiều luật (block-fit, line clear, identity, khay, layer, side-lock) sẽ thành feature soup → tách riêng câu hỏi để test.
7. **Bỏ khay, Match trực tiếp trên board** (24G, 24H) — **bước ngoặt**: 24H (Roof on Board) là bản đầu tiên gộp layer + placement + Match vào cùng một quyết định kéo, trở thành nền cho các thử nghiệm tiếp theo.
8. **Thử các thay đổi chạm core** (24I Match 2+/Bridge, 24J Self-built Roof, 24L Repeat Move × Same-layer Match).
9. **24K + gravity** — vấn đề phát hiện: người chơi tự xây tầng trên khiến kết quả khó dự đoán; "clear đủ số loại" hướng về checklist thay vì cascade.
10. **Khoá Final Core 24K** (20/08/2026) — bảng quyết định cuối:
    - Input: một drag–drop.
    - Board: 6×6, tối đa hai tầng preset (roof chỉ do level đặt sẵn, người chơi không tự xây tầng trên).
    - Nguồn: một current + một next, queue deterministic lặp vô hạn.
    - Piece: polyomino ≥2 cell, có thể mixed-ID.
    - Bỏ line clear, bỏ khay.
    - Match: 2 cùng ID, chạm cạnh, chỉ tầng dưới (`z=0`); tầng trên cấm Match.
    - Cascade: support mất → tile trên rơi → Match tiếp.
    - Thắng theo `pairGoal` (không cần clear-all).
    - Không timer/move limit, không power-up/booster.
    - 7 nguyên tắc "không nên đảo ngược khi bước sang production" được chốt kèm theo (không thêm thao tác thứ hai, không cho xây tầng trên trở lại, không dùng booster bù độ khó, không cascade toàn board từ cặp tĩnh, không tăng khó chủ yếu bằng luật mới, không che identity tới mức phải đoán, không đồng nhất "queue vô hạn" với "không thể thua").

*Đồng thời, `02-FINAL-CORE-GAMEPLAY-VA-HOOK.md` chốt **6 mục tiêu thiết kế puzzle** dùng làm tiêu chí xuyên suốt: (1) Hook rõ ràng, (2) Dễ hiểu/dễ vào, (3) Độ khó là hệ thống có chủ đích, (4) Nhắm đúng feeling ("controlled-collapse satisfaction"), (5) Trọn vẹn hơn nhiều tính năng (feature-freeze), (6) Playtest với tiêu chí giữ core cụ thể.*

---

## Giai đoạn 4 — Nhánh Khay Tiêu Hóa mở rộng song song (11–26)

*Nguồn: `CHANGELOG.md` (Nhật ký Prototype).*

- **11 — Khay Tiêu Hóa**: goal nền — đóng hàng không làm quân biến mất ngay mà bay vào Khay chờ; 3 quân giống nhau hoặc liên tiếp cùng chất tự nổ; khay tràn = thua.
- **12–19**: goal — dựng 5 ý hybrid **khác biệt thật sự**, không bó buộc luật mahjong chuẩn, không lấy Block Blast làm gốc so sánh; sau đó mở rộng bằng cách mượn đúng 1 hook mỗi bản từ boardgame cổ điển (2048/Threes, Domino, Mahjong Connect, Rummikub, Othello, Connect Four…).
- **Brainstorm giữa chừng (không sinh file mới)**:
  - Goal: bỏ Sảnh, chỉ giữ Phỗng ("bộ 3") — tường minh yêu cầu bỏ luật mahjong, chỉ giữ bộ 3.
  - Batch ~10 ý mechanic "không làm game phức tạp" (buff/bonus) — **bị từ chối** vì chỉ là lớp phủ, không đổi quyết định lõi.
  - Batch 5 ý đổi core gameplay thật, mỗi ý mượn 1 cơ chế boardgame (Rummikub, Connect Four/domino, Cờ vây, Bingo, Nine Men's Morris).
- **23–26 (kế thừa trực tiếp cơ chế 11)**:
  - 23: thực thi "bỏ Sảnh" + đổi bộ 3 thành bộ 3-4-5, thưởng thêm nếu match nhiều hơn 3.
  - 24: yêu cầu "match 2 + 2 tầng board + trọng lực" — bị hiểu lệch hướng (quay về Match 2 kiểu Mahjong Solitaire), user xác nhận lại muốn giữ nguyên cơ chế 23; file giữ tham khảo, không dùng tiếp.
  - 25: sửa đúng ý — giữ 100% cơ chế đặt-khối/Khay của 23, đổi bộ tối thiểu 3→2 (dải 2-3-4), thêm 2 tầng mỗi ô, trọng lực giữa 2 tầng, camera giả-isometric.
  - 26: yêu cầu "camera còn tệ" — làm lại phần vẽ bàn cờ bằng khối 3D low-poly thật, **không đổi game logic** so với 25.

---

## Giai đoạn 5 — Đảo ngược quy tắc Match: 24K → 24K-1 (20–21/08/2026)

*Nguồn: `03-LICH-SU-THAY-DOI-24K-DEN-24K1-TOP-MATCH.md`.*

- Goal: mở nhánh thử nghiệm song song từ 24K — đổi quy tắc Match từ "chỉ tile z0" sang **"chỉ tile đang lộ (không bị che) mới Match được"**, đồng thời cho phép người chơi **chủ động xếp chồng (player-stackable placement)** thay vì roof chỉ do level đặt sẵn. Mục đích: biến việc "che quân" thành một lựa chọn chiến thuật chủ động.
- `proto-mechanic-match-top.html` → `24k-1.html` (10 màn sinh thủ tục, có sửa lỗi hàng chờ hữu hạn) → **`24K-1-top-match-same-layer.html`: được chốt là gameplay chính**, tiếp tục tinh chỉnh với các goal cụ thể:
  - Đổi thuật toán ghép cặp sang **gom nhóm liên thông** (match-3/4 khi tự nhiên xảy ra), thêm rào chắn chống "baked self-match" trong 1 piece (trừ Level 1 — cố ý dùng domino cùng mặt để đảm bảo thắng ngay).
  - Đổi điều kiện thắng: từ tổng `pairGoal` sang **phá đủ N tile của từng loại cụ thể** (`winTargets`), verify lại bằng solver mô phỏng cho toàn bộ 10 level.
  - Thu nhỏ board 6×6 → 5×5.
  - Dựng lại Màn 1 thành màn dạy luật có chủ đích, không dùng chữ — đúng 3 lượt dạy 3 khái niệm (xếp chồng → gravity/reveal → match áp dụng cho tile vừa lộ).
  - Xoá toàn bộ chữ giải thích cơ chế trong lúc chơi (nhãn pha, mô tả dài, popup luật) — dạy hoàn toàn bằng gợi ý `guideMoves`.
  - Yêu cầu về hiệu ứng: nhận diện tile "đang bị đè"/"không bị đè" phải đo màu pixel thật từ asset gốc, không đoán.

---

## Giai đoạn 6 — UI/UX Spec "Hành Trình Qua Vườn Trúc" (21/08/2026)

*Nguồn: `FINAL-CORE-UI-UX-SPEC-TU-INDEX.md`.*

Yêu cầu trung tâm đặt ra cho việc nâng cấp UI/UX:

- Giữ concept **cổng tre mở ra để bước vào game** (Main Menu) và **level select dạng con đường các cổng xen kẽ**.
- Nâng chất lượng hình ảnh theo hướng **Zen, Trung Hoa cổ, tre trúc, gỗ và giấy** — tên định hướng: *"Hành Trình Qua Vườn Trúc"*.
- Đảm bảo gameplay 24K-1 dễ đọc với người chơi casual trên 35 tuổi.
- Không tăng số thao tác hoặc thêm hệ thống meta gây nhiễu.

Vấn đề cụ thể cần khắc phục (đã liệt kê thành goal sửa): chữ chức năng quá nhỏ (nâng lên chuẩn tối thiểu 16px nội dung/14px caption); phong cách đang nghiêng về casino Mahjong (chuyển vàng sáng/đèn đỏ sang đồng cổ/ngọc bích); texture gỗ cạnh tranh với nội dung; thao tác hai bước lặp lại quá nhiều (Continue/Play tuỳ trạng thái); màn khoá phụ thuộc grayscale + emoji 🔒 (đổi sang thanh gỗ/dây thừng vật lý); gameplay vẫn còn UI legacy của prototype cũ (**Điểm, Khay chờ, Đổi khối, Xả quân — phải bỏ hết**, chỉ giữ Goal/Board 2 tầng/Current/Next/Help-Pause).

Đã chốt: bộ design tokens (màu, typography, shape, touch target ≥48×48px), information architecture, và thứ tự ưu tiên triển khai P0 (readability + đồng bộ core) → P1 (visual polish) → P2 (delight + accessibility).

---

## Giai đoạn 7 — GDD Master + Milestone Tuần 3–4 (24/08/2026, hiện tại)

*Nguồn: `04-GDD-FINAL-CORE-MASTER.md`.*

**Tuần 1–2 — đã hoàn thành** (tóm tắt goal đã đạt):
- Engine P24K/P24M: board 2 tầng, polyomino 2–5 ô, luật Match 2/3/4 cùng tầng–liền kề–đang lộ, cascade theo trọng lực.
- Cơ chế **Phong Ấn (Seal)** và **Ô Chắn (Permanent)**; 4 loại goal (`PAIR_QUOTA`, `TARGET_FACE`, `OPEN_SEAL`, `BURIED_TARGET`).
- **30 level đầu tiên** theo đúng tài liệu thiết kế (5 hồi sư phạm), mỗi level có solution giải sẵn + verify tự động.
- Redesign Main Menu (cổng tre, nền Zen tối giản) và Level Select (vào thẳng chương hiện tại, 2 mũi tên lật chương).
- Quy mô đã chốt, **không mở rộng thêm ở Tuần 3–4**: vẫn 6×6 tối đa, 6 mặt quân, 30 level/3 chương hiển thị.
- Monetization đã chốt: **Ads — interstitial + rewarded**; platform phát hành chưa chốt → thiết kế theo hướng cắm-được-sau.

**Tuần 3 — Audit + UI polish + Level design polish** (theo kế hoạch từng ngày):
| Ngày | Goal | Trạng thái |
|---|---|---|
| 1 | Audit toàn diện build so với `FINAL-CORE-UI-UX-SPEC-TU-INDEX.md` | ✅ Đã xong |
| 2–3 | UI polish: bỏ Score khỏi banner Thắng, đồng bộ token màu (jade/amber), sửa timing resolve-chain, sửa âm Match theo wave, thêm âm riêng cho Reveal/Seal, thêm Reduced Motion | ✅ Đã xong |
| — | Bổ sung ngoài kế hoạch ban đầu: xây tutorial qua nút "?" ở Main Menu, dạy bằng chính engine gameplay thật | ✅ Đã xong |
| 4–5 | Level design polish: cân lại `guideMoves`, kiểm tra đường cong khó dần ở điểm nối 10→11 (Seal) và 20→21 (Ô Chắn) | ⏳ Chưa làm — việc tiếp theo |

**Tuần 4 — Monetization (Ads) + hoàn thiện + đóng gói** (kế hoạch, chưa thực hiện):
| Ngày | Goal |
|---|---|
| 6 | Thiết kế lớp trừu tượng `AdService` (`showInterstitial()`, `showRewarded(onReward)`, mặc định no-op) |
| 7 | Implement `AdService` no-op, gắn vào đúng điểm đã chốt (interstitial sau màn Thắng, rewarded ở nút tuỳ chọn) |
| 8 | Thêm self-test cho lớp ads: không treo/chặn win-state, rewarded luôn có đường bỏ qua |
| 9 | Playtest tay thật vòng cuối: toàn bộ 30 level + tutorial + luồng ads no-op |
| 10 | Fix punch list, cập nhật `CHANGELOG.md` + tài liệu GDD, ghi chú bàn giao platform cần chọn để cắm `AdService` thật |

**Không nằm trong phạm vi Tuần 3–4** (giới hạn goal tường minh): không thêm level/chương mới, không thêm cơ chế lõi mới, không tích hợp SDK ads thật, không làm IAP, không đổi engine/kiến trúc kỹ thuật.

---

## Ghi chú

- Tài liệu này tổng hợp lại đúng nội dung đã có trong `CHANGELOG.md`, `01-LICH-SU-THAY-DOI-DEN-FINAL-CORE.md`, `02-FINAL-CORE-GAMEPLAY-VA-HOOK.md`, `03-LICH-SU-THAY-DOI-24K-DEN-24K1-TOP-MATCH.md`, `04-GDD-FINAL-CORE-MASTER.md`, `AILog_15082026.md`, `FINAL-CORE-UI-UX-SPEC-TU-INDEX.md` — không dựa vào suy diễn ngoài các nguồn này.
- Các nhánh không được chọn (ví dụ: giai đoạn 1–3 của mục "Giai đoạn 3", bản 24 lệch hướng, `24K-lower-layer-gravity.html`) được giữ lại trong danh sách vì chúng là quyết định rõ ràng đã đưa ra ("không chọn làm core", "giữ tham khảo") — không phải bị lược bỏ.

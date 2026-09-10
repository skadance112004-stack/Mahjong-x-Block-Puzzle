# Changelog Dự Án — Tiếp nối (từ sau 05-CHANGELOG-TOAN-DU-AN.md)

Tài liệu này nối tiếp `05-CHANGELOG-TOAN-DU-AN.md` (chốt lúc 24/08/2026, kết thúc ở mốc "GDD Master + Milestone Tuần 3–4"). Nội dung dưới đây chỉ ghi các **goal rõ ràng** phát sinh **sau** thời điểm đó, tính đến 04/09/2026 — không lặp lại nội dung đã có ở file 05.

**Nguồn:** `20260828_TinTDD_W35_Note.md` (Weekly Log W35, định dạng Start/Stop/Continue) là nguồn goal chính; đối chiếu và xác nhận lại bằng cách đọc trực tiếp code hiện tại (`Final Core/index.html`, `Final Core/level-editor.html`) để đảm bảo mỗi goal ghi dưới đây đã thực sự được triển khai, không chỉ là dự định. File `20260821_TinTDD_W34_Note.md` không đưa vào vì trùng mốc thời gian với `Retro-Start-Stop-Continue-21082026.md` đã dùng ở file 05.

---

## Giai đoạn 8 — Tuần W35 (25/08 – 31/08/2026): cơ chế core mới + scale level + level editor + sound

### Goal đã bắt đầu và xác nhận có trong code

- **Giới hạn số lượt đi (`moveLimit`) làm điều kiện thua mới** — tích hợp thẳng vào core loop, không phải cơ chế phụ. Xác nhận trong `index.html`: mỗi level có trường `moveLimit`, HUD có ô đếm lượt còn lại (`hud-moves`/`movesLeft`) chỉ hiện khi level có giới hạn hữu hạn.
- **2 booster hỗ trợ người chơi — Đổi khối và Hint — được xây như cơ chế core mới, không phải buff phụ**: mỗi level khai báo riêng `boosterReroll`/`boosterHint` (số lượt dùng được); cả hai **không tốn lượt đặt** (`moveLimit`). Đổi khối = bỏ qua khối hiện tại, lấy khối kế tiếp trong sequence. Hint = tự giải từ đúng trạng thái bàn hiện tại bằng một bộ giải DFS (`p24kTrySolveLive`).
- **Mặt Wild/Joker** — mặt đặc biệt khớp được với bất kỳ mặt nào khác đang lộ cùng tầng, đưa vào như cơ chế core mới (không phải vật phẩm). Xác nhận: `P24M_WILD_ID='jk'`, luật match được sửa thành `a.id===b.id || a.id===WILD || b.id===WILD`.
- **Nâng cấp Level Editor sang thao tác kéo-thả trực quan** (`Final Core/level-editor.html`), thay cho việc click từng bước trước đó:
  - Kéo-thả tile trực tiếp trên bàn để di chuyển vị trí.
  - Kéo-thả để dán khối (piece) vào bàn.
  - Kéo để sắp xếp lại thứ tự trong sequence (hàng đợi khối).
  - Quét vùng (rectangle-drag) để vẽ nhanh Ô Ấn (Seal) / Ô Chắn (Permanent) thay vì click từng ô.
  - Có chế độ Play-test mô phỏng lại đúng luật game để thử ngay trong editor.
- **Scale số lượng level từ 30 lên 50**: thêm **Chapter 4** (giới thiệu Wild) và **Chapter 5** (tổng hợp/mastery). Xác nhận: mảng `P24M_LEVELS` trong `index.html` hiện có đúng 50 phần tử; cơ chế nhóm chương (`CHAPTERS`) đã được đổi từ mảng cố định hard-code "30 level" sang tính động theo độ dài thực của `P24M_LEVELS` (đọc được từ comment trong code, không phải suy diễn).
- **Bắt đầu Verify level**: chạy lại solver cho toàn bộ level sau khi thêm moveLimit/booster/Wild, để đảm bảo mọi level (30 cũ + 20 mới) vẫn giải được đúng luật mới.
- **Thêm chế độ nguồn khối ngẫu nhiên có gate chứng minh còn đường thắng**, dùng cho một số level thuộc Chapter mới — không thấy nêu trong Weekly Log nhưng xác nhận rõ trong code (`level-editor.html`, `index.html` hàm `p24qDrawGated`/`p24qDrawGatedGenerative`):
  - **Queue Pool**: rút khối đã ghép sẵn, có trọng số, từ một danh sách hữu hạn.
  - **Random Shapes + Random Faces**: sinh khối hoàn toàn ngẫu nhiên (hình dạng và từng mặt tile đều rút ngẫu nhiên có trọng số).
  - Cả hai đều bị chặn bởi một "reroll-until-provably-winnable gate" (bounded-DFS): khối rút ra chỉ được chấp nhận nếu bàn sau đó vẫn còn đường thắng; nếu không có khối nào qua được sau `queueRerollBudget` lần thử, dùng khối dự phòng bắt buộc (`queueFallback`).
  - **Lưu ý đối chiếu**: đây là một lệch hướng có chủ đích so với nguyên tắc đã chốt trước đó ở `04-GDD-FINAL-CORE-MASTER.md` ("Queue: deterministic, lặp vô hạn — không phụ thuộc random"). Việc lệch này chỉ áp dụng cho các level dùng tường minh `queuePool`/`randomShapes+randomFaces`; các level còn lại vẫn giữ `sequence` xác định trước như cũ.
- **Thêm tính năng sinh level bằng mô tả ngôn ngữ tự nhiên (AI) trong Level Editor**: nhập mô tả (ví dụ "màn dạy cơ chế Seal cho người chơi mới, bàn 4×4, độ khó thấp"), công cụ tự chạy auto-solver kiểm tra màn giải được trước khi playtest tay.

### Goal/quyết định dừng lại hoặc đảo ngược (có chủ đích)

- **Tạm dừng mở rộng thêm UI mới cho Level Editor**, chuyển ưu tiên sang verify tính giải được của toàn bộ level trước.
- **Dừng dùng sound effect tổng hợp bằng WebAudio cho tiếng đặt tile/phá block, chuyển hẳn sang sample âm thanh thật** để tăng cảm giác cho người chơi. Xác nhận trong code: các buffer `PLACE_SFX_B64`, `MATCH_SFX_B64`, `SWITCH_SFX_B64`, `DOOR_SFX_B64`, `BG_MUSIC_B64` được decode qua `decodeAudioData` — âm thanh thật được **nhúng base64 thẳng trong `index.html`** (không tách file ngoài), giữ đúng ràng buộc "một file HTML tự chứa". File nguồn tương ứng đã thêm vào `Assets/` (`freesound_community-hit-wood-42549.mp3`, `freesound_community-wood-crate-destory-2-97263.mp3`, `soundreality-switch-150130.mp3`, `Bamboo_Door_toggle2.ogg.mp3`, `drmekhan-chinese-inflight-soft-instrumental-relaxing-289404.mp3` — nhạc nền).
  - **Lưu ý đối chiếu**: đây là đảo ngược so với quyết định trước đó ở `04-GDD-FINAL-CORE-MASTER.md` mục 3.10 ("mỗi sự kiện có 1 âm thanh tổng hợp WebAudio riêng, không dùng file audio ngoài"). Quyết định mới: vẫn không dùng file audio *rời* (giữ 1-file HTML), nhưng nội dung âm thanh chuyển từ tổng hợp sang sample thu sẵn, cộng thêm nhạc nền lần đầu xuất hiện.
- **Dừng thử nghiệm thêm cơ chế mới khác** (xoay khối, băng chuyền, hoán đổi tile...) để tập trung hoàn thiện đúng 1 cơ chế mới (moveLimit + booster + Wild) trước khi mở rộng tiếp.

### Việc đang tiếp diễn (goal chưa chốt, còn mở)

- Tiếp tục playtest và cân bằng độ khó.
- Tiếp tục tinh chỉnh sound effect (đặt gỗ, phá block, âm lượng nhạc nền) dựa trên phản hồi nghe trực tiếp qua nhiều lần thử.
- Tiếp tục thiết kế và tinh chỉnh level, ưu tiên dùng cơ chế đã có sẵn thay vì thêm cơ chế mới liên tục.
- Tiếp tục chỉnh UI/UX của Level Editor theo phản hồi thực tế khi dùng để build level mới.

### Câu hỏi mở do chính tuần này đặt ra (chưa có câu trả lời, ghi lại nguyên văn)

- Độ khó sau khi siết `moveLimit` + booster đã đủ thử thách cho tệp người chơi mục tiêu chưa, hay vẫn cần playtest bằng người chơi thật để hiệu chỉnh tiếp thay vì chỉ dựa vào công thức?
- Với 50 level hiện tại, dữ liệu (level + âm thanh) đều nằm chung trong 1 file HTML, đặc biệt là có file âm thanh — có bị giảm độ mượt trong lúc chơi không?

### Công cụ hỗ trợ phát sinh trong giai đoạn này (không phải goal thiết kế, ghi để đầy đủ hồ sơ)

- Thêm Playwright + các script chụp màn hình (`tmp/ls-shot*.mjs`, `tmp/ls-*.png`) để kiểm tra trực quan `index.html` sau khi sửa (nhiều kích thước màn hình, ví dụ tablet).
- `.gitignore` được bổ sung: loại trừ thư mục `tmp/` (scratch/screenshot) và các thư mục sinh ra bởi Unity (`Library/`, `Temp/`, `Obj/`, `Build/`…) khỏi git.
- `Final Core/index.html.bak` được tạo trong lúc thao tác — bản sao lưu trước khi gộp thay đổi lớn, chưa dọn.

---

## Giai đoạn 9 — 04/09/2026: Nhiệm Vụ Hàng Ngày + Điểm Danh 30 Ngày

Theo yêu cầu thiết kế: 1 hệ Nhiệm Vụ Hàng Ngày (mốc đơn giản, thưởng Xu + Booster) và 1 hệ Điểm Danh chu kỳ 30 ngày (mốc quà lớn ở ngày 10/20/30). Cả hai xây thẳng vào `Final Core/index.html`, ngồi TRÊN Economy (Xu) đã có ở Giai đoạn trước — dùng lại đúng `addCoins`/`setBoosterReroll`/`setBoosterHint`, không tạo kho tiền/booster riêng, không đổi luật thắng/thua nào của core loop.

### Nhiệm Vụ Hàng Ngày

- Mỗi ngày (theo local date của máy) chọn **cố định** 3 trong 6 nhiệm vụ mẫu — deterministic theo chuỗi ngày (không random lại mỗi lần mở modal), qua `pickDailyQuests()`.
- 6 nhiệm vụ mẫu, tất cả ĐẾM LẠI sự kiện core đã có sẵn (không thêm khái niệm mới vào core loop): thắng 1 màn, ghép đủ 6 cặp cộng dồn trong ngày, dùng 1 lượt Booster (Đổi khối hoặc Hint), phá 1 Phong Ấn, thắng 1 màn không dùng Booster, tạo chuỗi cascade ≥2 wave. Thưởng mỗi nhiệm vụ: 20–30 Xu, hoặc combo 1 Đổi khối + 1 Hint (nhiệm vụ "dùng booster").
- Tiến độ cộng dồn qua `addQuestProgress(id, amount)`, gọi từ đúng các điểm core đã tồn tại: `win()` (thắng màn / không dùng booster / chuỗi cascade), `p24kResolveAnimated()` (ghép cặp), `p24kMaybeOpenSeal()` (phá Ấn), `p24kUseReroll()`/`p24kUseHint()` (dùng booster).

### Điểm Danh 30 Ngày

- Thiết kế **cộng dồn, không phải streak mất trắng khi lỡ ngày** — bỏ lỡ 1 ngày chỉ đơn giản là hôm đó không mở thêm ô nào, không mất tiến độ đã có. Đây là lựa chọn có chủ đích, đúng tinh thần không-phạt đã thấy ở [[project_difficulty_safety_net_pattern]] (level cho thắng sớm/chơi filler vô hại), không phải hành vi mặc định của kiểu "điểm danh" thường gặp.
- Mỗi ngày thắng ít nhất 1 màn (`markWinToday()`, gọi từ `win()`) mở khoá đúng 1 ô kế tiếp (1..30) để nhận; claim thủ công qua modal (không tự động cộng Xu sau lưng người chơi). Ngày 30 claim xong quay vòng về ngày 1 (chu kỳ lặp lại, không phải streak tuyến tính vô hạn).
- Bảng thưởng (`checkinReward()`): ngày thường 10/15/20 Xu tuỳ giai đoạn (1–9 / 11–19 / 21–29), mốc 5/15/25 có thêm 1 Đổi khối, mốc **10/20/30** override hẳn thành quà lớn — 60/100/200 Xu kèm 3/5/8 lượt Đổi khối + Hint mỗi loại.

### UI

- 1 nút mới "🎯" ở cụm góc phải Main Menu (cạnh Cửa Hàng/Tủ Đồ), có badge chấm tròn khi có nhiệm vụ/ngày điểm danh có thể nhận. Mở modal 2 tab (Nhiệm Vụ / Điểm Danh), cùng khung style với modal Tủ Đồ nhưng dùng class riêng (`.quest-tab`/`.quest-panel`) để tránh việc 2 modal cùng tái dùng `.theme-tab` sẽ vô tình đổi active-state chéo nhau (Tủ Đồ wire tab bằng `querySelectorAll` không lồng theo modal cha).

### Xác nhận đã hoạt động (không chỉ dự định)

- 4 assertion mới trong `p24mSelfTest()`: chọn nhiệm vụ xác định theo ngày, quest state tự reset đúng ngày mới, mốc điểm danh 10/20/30 lớn hơn ngày liền trước, claim điểm danh đòi hỏi đã thắng màn hôm nay + quay vòng đúng ở ngày 30. `p24mSelfTest().ok===true` (34/34 check, chạy qua Playwright headless).
- Chạy thử toàn bộ luồng thật qua Playwright: thắng Level 1 qua đúng `p24kPlace()` → `win()` → quest "Thắng 1 màn" lên 1/1, Điểm Danh Ngày 1/30 sẵn sàng nhận → claim cả hai → Xu cộng đúng số (+20 quest, +10 điểm danh ngày 1). Không có lỗi console/page trong suốt quá trình.

---

## Ghi chú

- **Chưa động tới trong giai đoạn này** (dù nằm trong kế hoạch Tuần 4 đã ghi ở `04-GDD-FINAL-CORE-MASTER.md`): chưa thấy `AdService`/`showInterstitial`/`showRewarded` xuất hiện trong `index.html` — phần Monetization (Ads) của kế hoạch Tuần 4 gốc **chưa được bắt đầu**; đội đã chuyển hướng ưu tiên sang cơ chế core mới (moveLimit, booster, Wild), scale 30→50 level, nâng cấp Level Editor, và đổi sound design thay vì đi tiếp đúng thứ tự Tuần 3 → Tuần 4 đã vạch trước đó. Đây là quan sát khách quan từ việc đối chiếu code, không phải suy đoán.
- Danh sách trên tổng hợp đúng nội dung `20260828_TinTDD_W35_Note.md`, đối chiếu xác nhận qua `Final Core/index.html` và `Final Core/level-editor.html` tại thời điểm 01/09/2026 — không thêm goal ngoài hai nguồn này, không lược bớt mục nào đã nêu trong Weekly Log.

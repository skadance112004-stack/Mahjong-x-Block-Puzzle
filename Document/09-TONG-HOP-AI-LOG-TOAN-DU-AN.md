# Tổng Hợp AI Log Toàn Dự Án — Mahjong × Block

**Phạm vi:** toàn bộ quá trình làm việc với AI từ 17/08/2026 đến hiện tại (13/09/2026).
**Định dạng:** mỗi giai đoạn tách rõ 4 loại nội dung, **kèm trích dẫn nguyên văn thật** lấy trực
tiếp từ log hội thoại gốc (không phải diễn giải lại) làm bằng chứng cho từng mục:

- 🗣️ **Phản biện** — tranh luận/đẩy lại có lý do thật ở cả hai phía.
- ❌ **Phương án bị loại** — concept/thiết kế cụ thể đã thử hoặc đề xuất rồi bị từ chối, kèm lý do.
- 🐞 **Lỗi AI** — sai sót thật (hiểu sai, đọc nhầm file, code sai, gãy tính năng).
- ✅ **Kết quả sau kiểm thử** — số liệu/kết luận CÓ ĐƯỢC SAU KHI verify.

**Nguồn của bản này:** ngoài các tài liệu `01`–`08` đã dùng ở bản trước, bản này đọc trực tiếp
**17 file log hội thoại gốc** (`.jsonl`, lưu tại `~/.claude/projects/...`, tổng ~500MB thô) —
trích xuất phần văn bản người dùng gõ thật và câu trả lời thật của AI (bỏ qua phần suy nghĩ nội
bộ, lệnh gọi công cụ, dữ liệu nhị phân), còn lại ~2MB text đọc được, xử lý qua 6 agent song song
theo từng cụm phiên/mốc thời gian. Trích dẫn dưới đây lấy thẳng từ đó, có ghi tên file phiên +
mốc giờ khi có. Không suy diễn hay bịa câu trích — nếu một giai đoạn không có material cho 1 mục,
mục đó bị bỏ qua.

**Lưu ý về nguồn:** 3 file "Weekly Note" và `07-GDD-TONG-HOP-TU-INDEX.md` được các tài liệu khác
trích tên nhưng không còn tồn tại đầy đủ trong repo/git history (xem bản trước để chi tiết) —
phần nội dung tương ứng của chúng nay được bù đắp trực tiếp bằng trích dẫn hội thoại gốc trong
bản này, đầy đủ hơn hẳn.

---

## Giai đoạn 0 — Đề bài gốc (trước 17/08/2026)

*Nguồn: `Bai_tap_Mahjong_x_Block_Puzzle_SINGLE_HTML.pdf`.*

1 người làm, HTML/CSS/JS đóng gói 1 file tự chứa. Mục tiêu ~50 level, Mahjong và Block phải nằm
trong **một core loop**. Người chơi mục tiêu: casual, trên 35 tuổi. Ưu tiên ít thao tác. *(Giai
đoạn thuần đề bài, không có log hội thoại vì AI chưa vào việc.)*

## Giai đoạn 1 — 6 prototype đầu tiên + hạ tầng Unity (17–18/08/2026)

*Nguồn: `AILog_15082026.md`; phiên `b68ca5a6` (17/08 08:38–15:28), `960f62ef` (18/08 06:07–06:53).*

Dựng 6 prototype HTML so sánh hướng đi (Block Blast, Collapse, Hand Builder, Towers, Battle,
Roguelike) + song song dựng hạ tầng UI Unity/C# cho nhánh Khay Tiêu Hóa.

**✅ Kết quả sau kiểm thử:** kết quả đo bằng bot cho bản Unity được trích dẫn nguyên văn: *"Hook
chịu lực thật: từ màn 4, bot không đọc khay chết 60-100% ván (Δhook 40-54 điểm %)... `rig` (thiên
vị tray) phải ≥0.5, nếu không hook sập (Δhook 50pt→8pt)."* (`b68ca5a6`, 17/08).

**❌ Phương án bị loại:** bộ bài Tây thay Mahjong (`07-card-blast.html`) — chỉ dừng ở vai trò so
sánh, không có lý do từ chối tường minh trong log.

## Giai đoạn 2 — Mở rộng prototype nền (bản 08–10)

*Nguồn: `CHANGELOG.md` mục 0.*

08 — Mahjong Block 3-Layer. 09 — Meld-Only 3-Layer. 10 — Layer Focus Tabs — nguồn gốc khái niệm
**Layer** xuyên suốt các giai đoạn sau.

## Giai đoạn 3 — Hành trình khoá Core Gameplay (18–20/08/2026)

*Nguồn: `01-LICH-SU-THAY-DOI-DEN-FINAL-CORE.md`; phiên `eb2bc30a` (18/08 02:33 – 21/08 13:34,
~256KB text — phiên giàu tư liệu nhất giai đoạn này).*

Giai đoạn giàu "phương án bị loại" nhất dự án — gần 15 concept bị thử rồi loại liên tiếp trước khi
khoá Final Core 24K ngày 20/08.

**🗣️ Phản biện:**
- User đặt định hướng ngược lại giả thuyết ban đầu của AI, chính là gốc của nguyên tắc "core over
  buffs": *"các idea nên đánh trực tiếp vào core gameplay, không phải các buff, có thể kết hợp thử
  với các mechanics của boardgame classic không"* (18/08 05:45) — AI thừa nhận thẳng: *"Nhận ra
  đúng vấn đề: 10 ý trước đều là lớp thưởng phủ lên trên, không đổi cái người chơi phải quyết
  định."*
- AI tự phát hiện và báo ngay một mâu thuẫn thay vì âm thầm tiếp tục: *"Tôi đã đọc
  `02-FINAL-CORE-GAMEPLAY-VA-HOOK.md`... rồi đọc kỹ file tham chiếu
  `Final Core/24K-lower-layer-gravity.html`. **Hai bên không khớp nhau**"* (20/08 09:22) — user bác
  lại thẳng: *"Không cần quan tâm đến level design hiện tại, prototype 24k đang chuẩn, kết hợp với
  GDD để làm nó tốt hơn"* (20/08 11:35) — AI đảo ngược kết luận của chính mình ngay sau đó (xem Lỗi
  AI).
- User giới hạn phạm vi mượn ý từ boardgame cổ điển: *"không cần phải lấy hết luật của boardgame áp
  vào, mà chỉ cần lấy các core hook"* (~19/08 03:55) — mỗi prototype 17-19 sau đó chỉ mượn đúng 1
  hook/bản.

**❌ Phương án bị loại** (bổ sung bằng chứng cụ thể cho bảng đã có ở bản trước):
- Bỏ luật Sảnh trong Khay Tiêu Hóa theo đúng chỉ đạo: *"'bỏ luật mahjong, chỉ giữ bộ 3': cụ thể là
  bỏ nhánh Sảnh... chỉ giữ nhánh Phỗng"* (19/08 05:45).
- Camera isometric/3D (`rotateX`/`perspective`) cho bàn 2 tầng — bị loại 2 lần độc lập: *"bỏ hẳn kỹ
  thuật rotateX/counter-rotate cũ (thứ khiến camera 'tệ')"* (proto 26), và về sau AI tự cảnh báo
  không lặp lại: *"we already tried a perspective/rotateY 'camera' approach earlier... it turned
  out fragile across browsers... I'd avoid it for the same reason."*
- Hiệu ứng "làm mờ + gạch chéo ô đang bị đè" — bị loại ngay khi vừa làm xong: user *"sai idea rồi:
  không cần phải indicate tile nào đang ở dưới 1 tile vì bản cũ đã đủ rõ"* (21/08 02:47) → AI:
  *"Reverted the covered/stacked-tile dimming + diagonal hatch from last turn — you're right that
  it was already clear, so that change was solving a problem that didn't exist."*
- Toàn bộ file viết lại từ đầu `floor-queue-gravity-cascade.html` — chính AI tự nhận đây là công
  sức lãng phí: *"My separate rewrite was unnecessary duplicate work... left in the folder as a
  harmless leftover from my earlier misread"* (20/08).

**🐞 Lỗi AI:**
- Crash Unity thật: *"Tìm ra lỗi rồi: `IndexOutOfRangeException` tại `GameController.RenderBoard()`
  — do bàn cờ UI tôi dựng cố định 8×8, nhưng màn 1 ... có kích thước bàn 6×6"* (18/08 03:48).
- AI tự bắt lỗi trong chính bộ test mình viết thay vì đổ cho thuật toán: *"I made an error in my
  own test setup — let me trace through and fix it properly rather than just patching the
  assertion"* (19/08 05:08); một lần khác self-test FAIL đúng vì kỳ vọng test sai chứ không phải
  thuật toán sai: *"same-row/col pairs can never use a 1-turn path... the test's expectation was
  wrong."*
- **Lỗi lớn nhất giai đoạn này**: AI chỉ đọc `<script>` đầu tiên của file, kết luận file không khớp
  GDD, rồi viết lại từ đầu — trong khi có 1 khối `<script>` thứ 2 monkey-patch toàn bộ game khớp
  đúng GDD. Tự sửa sai: *"I only read the file's first script block earlier and concluded it didn't
  match the GDD — but there's a second, later script block that monkey-patches the whole game...
  My separate rewrite was unnecessary duplicate work"* (20/08 11:40).
- User đoán đúng nguyên nhân bug, AI xác nhận: *"vẫn đang bị lỗi không hiện lv1-3 có thể là do lỗi
  local storage"* (20/08 12:44) → *"Found it — this is a real bug, and it matches your hunch
  exactly. The self-tests in both the menu and level-select scripts mutate the real `localStorage`
  key... and never restore it."* Sau khi sửa, user báo màn hình VẪN che khuất, AI tìm ra lớp lỗi
  CSS thứ 2 đứng sau: *"a stray `justify-content:center` from a merged stylesheet made the top of a
  scrollable list unreachable"* (20/08 13:44).
- User gửi ảnh chụp lỗi, AI xác nhận ngay: *"Found it — a real, confirmed bug. The real 24K sets
  `boardEl.style.gridTemplateColumns` dynamically in JS every render; I copied the static CSS but
  missed that line"* (20/08 18:26).

**✅ Kết quả sau kiểm thử:**
- Bảng self-test headless cho 5 prototype, ví dụ: *"16-conveyor-connect ... 6/6 (bắt được 1 lỗi
  thật trong lúc viết selftest, đã sửa)"*, kèm cảnh báo tự đặt ra: *"self-test chỉ đảm bảo logic
  lõi không sai, không thay được playtest thật"* (19/08 02:31).
- Sau khi thay asset thật: *"Re-verified the full file (both script blocks) after each step — still
  4/4 + 14/14 checks passing, file is 453KB now"* (20/08 11:42).
- Chốt cơ chế match-3/4 theo nhóm liên thông: *"all 3 layered self-test suites pass — 4 + 14 + 22
  checks"*, sau đó: *"Everything verified... 30 checks total... zero out-of-bounds cells anywhere
  on the new board"* (21/08).

Kết quả cuối: **Khoá Final Core 24K (20/08/2026)** — 7 nguyên tắc "không đảo ngược khi lên
production" (tất cả sau này đều bị đảo ngược, xem Giai đoạn 7).

## Giai đoạn 4 — Nhánh Khay Tiêu Hóa mở rộng song song (bản 11–26)

*Nguồn: `CHANGELOG.md`, `05-CHANGELOG-TOAN-DU-AN.md`; tư liệu bổ sung nằm chung phiên `eb2bc30a`.*

Chạy song song Giai đoạn 3. 11 — Khay Tiêu Hóa (port Unity/C#). 12–19 — 5 ý hybrid, mỗi bản mượn 1
hook từ 1 boardgame cổ điển. 23–26 — kế thừa cơ chế 11.

**🗣️ Phản biện:** batch ~10 ý buff/bonus bị user chủ động từ chối — xem trích dẫn ở Giai đoạn 3
(chính là cùng một câu nói, gốc của nguyên tắc [[feedback_core_over_buffs]]).

**🐞 Lỗi AI:** bản 24 — yêu cầu "match 2 + 2 tầng + trọng lực" bị AI hiểu lệch hướng, quay về
Match-2 kiểu Solitaire thay vì giữ bộ 3-4-5 của bản 23; user phải xác nhận lại tường minh muốn giữ
nguyên cơ chế 23; bản 25 mới là bản sửa đúng ý.

## Giai đoạn 5 — Đảo ngược quy tắc Match: 24K → 24K-1 (20–23/08/2026)

*Nguồn: `03-LICH-SU-THAY-DOI-24K-DEN-24K1-TOP-MATCH.md`; phiên `eb2bc30a` (tiếp), `bd49eadf`
(21/08 17:22 – 25/08, ~288KB — phiên UI/level-select/level-editor chính).*

**🗣️ Phản biện:** tài liệu tự ghi "một nhánh thử nghiệm song song, không phải để thay thế 24K vì
24K sai." Về sau, khi cần rút gọn UI chọn màn cho 30 level, AI trình bày rõ đánh đổi trước khi làm
thay vì tự quyết: *"The tradeoff: it's an extra tap to reach a level deep in the game... A cheaper
alternative... keep one flat list but auto-scroll it... less work, but still a 30-item scroll"*
(23/08 12:53) — user chọn phương án tốn công hơn: *"ok, break it into chapter."*

**❌ Phương án bị loại:**
- Rework lại cả Level 2 để bù thiếu 1 loại mặt — chọn giải pháp tối thiểu thay vì đại phẫu: *"a
  minimal, safe addition (an inert decoy tile of the third type, not touched by the solution)
  rather than reworking the whole level"* (23/08 12:38).
- Nhạc nền dùng nhạc thật theo link YouTube user gửi — bị từ chối vì bản quyền: *"I can't watch or
  listen to external video links... even if I could, closely replicating someone else's specific
  composition would be a real copyright concern"* (24/08 13:39) — AI tự render 1 bản PCM gốc thay
  thế.
- Parse `.xlsx` nhị phân thật — bị loại vì cồng kềnh: *"true binary `.xlsx` parsing needs a full
  library I can't reasonably embed in a single dependency-free file, so I'll use CSV"* (24/08
  17:40).
- Model AI cục bộ (WebLLM) cho tính năng sinh level bằng ngôn ngữ tự nhiên — bị loại: *"it'd
  meaningfully bloat the single-file tool (model weights are hundreds of MB+) and would be
  noticeably worse at this kind of precise spatial/constraint reasoning"* (25/08 03:23).
- UI bản đồ chương 2 màn hình (5 chương rồi 3 chương, có mũi tên) — bị user bỏ thẳng: *"i think it
  should be: The chapter dont need a whole screen... there is 2 arror in both side"* (23/08 13:53)
  → sau đó chính mũi tên thay thế cũng bị bỏ tiếp: *"bỏ đi 2 mũi tên, thay bằng tính năng slide qua
  trái qua phải"* (24/08 05:17).
- Lớp âm thanh "switch" pha trộn cùng wood-crate cho tiếng phá khối — bị user yêu cầu revert ngay
  trong ngày: *"sound của đặt gỗ chưa khớp, phá block chưa được switch"* → *"có thể chuyển phá
  block về âm thanh cũ"* (26/08 02:57) → AI: *"Phá block: revert hoàn toàn về sound cũ (chỉ
  wood-crate sample, y hệt trước khi tôi động vào)."*

**🐞 Lỗi AI:**
- 4 lỗi thật khi đổi board 6×6→5×5 (giữ nguyên từ bản trước, đã kiểm chứng qua trích dẫn agent):
  thiếu `position:relative` khiến tile bay lệch màn hình; queue hữu hạn hết quân giữa chừng; 3 màn
  có bước solution vượt biên board mới; 1 tile bị nhầm là rác nên bị dời trong khi là quân match dự
  tính.
- AI tự phát hiện lỗi toán học thật trong nhạc nền tổng hợp khi bị chê: user *"the sound is bad, the
  pitch and the rhythm is so bad, fix it"* (24/08 15:07) → *"the vibrato math was mathematically
  wrong (using instantaneous frequency×time instead of properly integrating phase)... previous note
  timings were hand-picked decimal timestamps... with no shared pulse underneath them."*
- Regression do chính AI gây ra: user *"now i cant scroll vertically"* (24/08 06:11) → *"the
  `touch-action:pan-y` I added to `#path` is the likely culprit... Apologies for the regression —
  that CSS line should never have gone in."*
- Bug đo đạc trong chính công cụ test của AI (không phải bug thật của game), 2 lần liền: *"That's a
  test-harness bug on my end — `atob()` decodes base64 into a raw Latin-1 byte string, not proper
  UTF-8 text... Not a bug in the actual tool"* rồi ngay sau: *"Found the real bug — not a test
  artifact this time. My bracket-depth scanner never accounted for `//`... comments"* (25/08
  01:12–01:15).
- Level 1 im lặng gãy vì solution rỗng: *"Level 1 had `guideMoves: 2` but an *empty* `solution: []`
  — so the pre-existing glow highlight had nothing to show and was silently broken"* (25/08 05:57).
- Chèn 20 level mới làm gãy cú pháp cả file do thiếu 1 dấu phẩy: *"missing comma between the
  original last level and my injected levels [level 31]... whole file gãy cú pháp"* (26/08 09:36) —
  bắt được nhờ `node --check`.

**✅ Kết quả sau kiểm thử:**
- Tiến độ AI-gen 30 level theo dõi real-time bằng số liệu thật, không phải ước lượng: *"8 of 11
  batches done → 23 of 30 levels complete"* (23/08 12:33).
- Đo trực tiếp DOM để xác nhận animation thật chạy: *"shards genuinely fall (Y position increases
  from ~265px to ~630px over time)"* (22/08 18:11).
- Nhạc nền nhúng base64 được xác minh nguyên vẹn 3 lần riêng biệt sau các lần sửa: *"decoded
  duration reported as **34 seconds** (exactly matching the composition)... exactly one looping
  `AudioBufferSourceNode`"* (24/08 14:13–14:37).
- 50→ (thời điểm đó 30) level: *"Viết lại engine match/wave (bản có wild) trong Node, chạy replay
  từng solution của cả 50 level — tất cả thắng đúng và nằm trong moveLimit"* (26/08 09:38, phiên
  `26035a6a`).

## Giai đoạn 6 — UI/UX Spec "Hành Trình Qua Vườn Trúc" (21/08/2026)

*Nguồn: `FINAL-CORE-UI-UX-SPEC-TU-INDEX.md`, `Retro-Start-Stop-Continue-21082026.md`.*

**🐞 Lỗi AI (tự phản biện, nguyên văn từ Retro, cột "Stop"):** *"Đoán mù các chỉnh sửa hình ảnh...
không đo pixel thực tế trước"*; *"Cho rằng 1 hàm chỉ có 1 định nghĩa, trong khi file có nhiều lớp
patch ghi đè cùng tên (`renderHUD`, `startLevel`, `showPreview`...)"* — mầm mống của vấn đề "nhiều
tầng engine chồng nhau" lặp lại xuyên suốt các giai đoạn 10-13; *"Thêm UI mới... mà không kiểm tra
nó có che khuất control tương tác bên dưới"*; *"Xoá markup/phần tử chỉ dựa trên 1 lượt grep hẹp."*

## Giai đoạn 7 — GDD Master + kế hoạch Tuần 3–4 (24/08/2026)

*Nguồn: `04-GDD-FINAL-CORE-MASTER.md`.*

**🗣️ Phản biện (đảo ngược 7 nguyên tắc "không đảo ngược" từ Giai đoạn 3)** — bảng đối chiếu giữ
nguyên từ bản trước: Không giới hạn nước đi → Move Limit thật có; Không vật phẩm hỗ trợ → Booster
thật có; Không hiển thị điểm số → Điểm hiện HUD; Ads-only → thêm Xu+Cửa Hàng; 30 level/3 chương →
50/5; Tutorial riêng → gộp Level 1; Không thêm cơ chế lõi mới → thêm Lock/Điểm/Xu/Nhiệm vụ/Chủ Đề.

**✅ Kết quả sau kiểm thử:** *"Self-test tự động: 31/31 xanh"*; *"Level hoàn chỉnh: 50/50"* (thời
điểm đó vẫn ghi 30, số 50 tới sau); xác nhận dead-code an toàn để dọn bằng Puppeteer thật:
*"getComputedStyle/getBoundingClientRect xác nhận ẩn hẳn, 1 click thật thất bại với 'Node is either
not clickable'."*

## Giai đoạn 8 — Tuần W35 (25/08–01/09/2026): cơ chế mới + scale + level editor + sound + economy

*Nguồn: `06-CHANGELOG-TIEP-NOI.md`; phiên `26035a6a` (25–28/08), `41d87727` (28/08–), `6f4b3585`
(28/08–, phiên lớn nhất dự án, 7050 dòng text), `e9e489bb` (31/08–, phiên lớn thứ nhì).*

Đây là giai đoạn nhiều phiên chạy song song thật sự bắt đầu — 2 phiên lớn nhất dự án (`6f4b3585`,
`e9e489bb`) đều khởi động trong tuần này và chạy tới tận 12/09.

### 8.1 — moveLimit, booster, Wild/Joker

**🗣️ Phản biện:**
- AI từ chối trực tiếp 1 yêu cầu vì nó đảo lộn quá nhiều quyết định đã khoá cùng lúc: *"đưa
  currency-đổi-booster vào Final Core không phải 'thêm 1 tính năng nhỏ' — nó đảo ngược 3 quyết định
  đã khoá cùng lúc (monetization, core-simplification, scope-freeze) trong lúc chỉ còn 2 tuần"*
  (28/08 17:23, `41d87727`) — user phản lại: *"nếu không thêm reward cho người chơi, tiến trình
  chơi sẽ bị vô nghĩa"* (17:27) — AI tái định hình vấn đề: *"'reward' ở đây không nhất thiết phải là
  numeric/currency... vấn đề thật có thể không phải 'thiếu reward' mà là reward hiện có bị thiếu
  tín hiệu cảm nhận (feedback)."*
- Trước khi build "semi-random blocks", AI cảnh báo rõ hệ quả: *"Yes, technically doable — but it's
  a real departure from how this game is currently built... a random draw could hand the player a
  piece that makes the level unwinnable"* (29/08 03:30, `6f4b3585`); user hỏi lại 2 lần liệu vẫn giữ
  được đảm bảo thắng, AI trả lời thẳng giới hạn: *"It's a bounded search... not that every possible
  line of play wins... The guarantee only holds if you actually author `queueFallback`"* (31/08
  06:41–06:46).
- AI tự dừng lại giữa việc thay vì tiếp tục nhồi nhét: *"I don't want to keep mechanically cramming
  unused blocker cells into boards purely to satisfy a number — that's curve-fitting, not design"*
  (06/09 02:16, `6f4b3585`).

**❌ Phương án bị loại:**
- Currency+booster cho Final Core — từ chối thẳng vì phá 3 quyết định đã khoá (xem Phản biện).
- Wild/Joker — thử 3 hướng cứu ("Unstable Wild", Wild có điều kiện, "Wild bị giam"), rồi user chọn
  phương án dứt khoát hơn: *"This is a decisive call — cutting Wild outright rather than trying to
  save it"* (30/08 06:44) — về sau gỡ khỏi toàn bộ 50 level.
- Booster 3 bậc nâng cấp vĩnh viễn (`BOOSTER_UPGRADE_PRICES=[475,955,1550]`) tự tay AI xây trong
  tuần này, bị chính 1 phiên khác gỡ bỏ sau đó, phát hiện qua diff: *"hệ thống booster đã đổi kiến
  trúc hoàn toàn... thay hẳn cho 3 bậc nâng cấp vĩnh viễn mình xây trước đó (đã bị session khác gỡ
  bỏ)"* (08/09 06:29, `41d87727`).
- Cơ chế Crack ("Nứt") — xây đầy đủ, tự kiểm đủ, nhưng **chưa từng dùng ở bất kỳ level chính thức
  nào** — gỡ cùng đợt với Wild (xem Giai đoạn 10).

**🐞 Lỗi AI:**
- User: *"the 50 levels is not the same as before since it only contains 1 mahjong per polynomio,
  can not drag the block, the level is wrong"* (31/08 11:33) — lỗi remap id mặt quân bỏ sót
  `randomFaces`/`queuePool`/`queueFallback`.
- User: *"hiện tại, mỗi màn chơi đều quá dễ khi chỉ cần 1 goal match là qua"* (31/08 11:44) — AI:
  *"my `pairGoal` formula reset to 1 at the start of every chapter... so 15 of the 50 levels needed
  just a single match."*
- Tự bắt lỗi khi tra id sai giữa 2 quân giống nhau: *"I made an id substitution error in my trace
  (used `h1`/`c1` for both buried stacks when the real file uses `h1`+`c2`)"* (01/09 16:29).
- Sửa nhầm level: *"This one is actually intentional... Let me revert that change"* → *"I made an
  error there — let me fix it immediately"* (03/09 17:29) — Edit nhắm vào Lv30 lại trúng chuỗi giống
  hệt ở Lv1.
- Tự vi phạm đúng quy tắc do GDD của mình đặt ra: *"the master doc's §4 curriculum is explicit that
  Ô Chắn (Permanent) doesn't teach in until Lv21 — but my earlier 'peak' rebuilds this session had
  added permanents to Lv7, Lv13, and Lv18"* (03/09 18:00).
- Bug hint booster: DFS đồng bộ không giới hạn thời gian làm treo tab ~27s, thất bại ở Lv49 dù màn
  giải được — phát hiện 06/09 15:49–16:02, sửa bằng move-ordering + yield bất đồng bộ + ngân sách
  thời gian/node + fallback lời giải một phần.
- Bug "sequence cyclic" — chèn 1 phần tử vào `sequence` không "unroll" trước làm đổi modulo, tráo
  quân của TẤT CẢ nước cũ — gây lỗi thật ở Lv13, Lv20, Lv28.

**✅ Kết quả sau kiểm thử:**
- *"All 23 of the game's own self-test checks pass... Lv30 wins at move 2 of 8; Lv50 wins at move 1
  of 3"* (29/08 03:26).
- Probe độ khó qua bot: *"chapters A, B, C, E all clear at 93–100% win rate. Chapter D's back half
  (Seals #6–10) drops to 33–77%"* (31/08 09:22) → sau khi sửa: *"all 50 levels now clear at ≥80% win
  rate under a naive bot (was 3 levels as low as 63-77% before this pass)"* (31/08 11:53).
- *"0/490 generated piece instances across levels 2-50 in live gameplay have a baked self-match"*
  (31/08 12:22).
- Lock mechanic: *"13 adversarial tests... self-test (now 25/25 passing, still zero regressions
  across all 50 levels)"* (02/09 08:38).

### 8.2 — Level Editor + AI-gen level + Economy/Score (phiên `41d87727`)

**🗣️ Phản biện:** yêu cầu "mỗi màn hoàn thành cho 1 lượng tiền bất kỳ" (random) bị AI phản lại bằng
đúng tinh thần thiết kế đã có: *"'reward' ngẫu nhiên đi ngược tinh thần cả game... 'Không có dự báo,
hook chỉ là đánh cược, không phải quyết định'"* (01/09 06:02) — đổi sang biến thiên nhưng đoán trước
được.

**❌ Phương án bị loại:** giữ tỉ lệ giá skin cũ (×2.5) trong khi đổi công thức Xu theo log — bị loại
vì đẩy giá skin đắt nhất (~2.265 Xu) vượt quá tổng Xu tối ưu cả đời chơi (2.555) — đổi sang hệ số
×5.967 khớp thực tế hơn (02/09 13:51–14:21).

**🐞 Lỗi AI:**
- Bug cross-scope: `tileHTML()` gọi `activeTileSkin()` từ IIFE khác → crash âm thầm cả engine, sửa
  bằng `window.__activeTileSkin` (01/09 06:28).
- User: *"khi chơi lại màn chơi không được thêm xu"* (01/09 13:54) — bug thưởng Xu khi chơi lại đã
  thắng.
- Puppeteer + Chrome profile thật gây báo động giả: script báo "211 Xu" thay vì "11 Xu" kỳ vọng —
  hoá ra do localStorage giữ nguyên qua các lần chạy script khác nhau (không phải profile ẩn danh) —
  sửa bằng cách so delta (200→211 = +11) thay vì giá trị tuyệt đối.

**✅ Kết quả sau kiểm thử:**
- *"chơi thắng màn 1 qua headless Chrome (không mock)... Shop hiện đúng 9 item, chơi thắng màn 1
  cộng đúng 14 Xu"* (01/09 06:30).
- *"Tổng Xu tối đa nếu chơi hoàn hảo cả 50 màn: 1.380, trung bình 28/màn"* (02/09 12:23) → sau rescale:
  *"11 Xu ở màn 1 → 25 ở màn 10 → 35 ở màn 30 → 40 ở màn 50"*, catalogue 895→2265 Xu, self-test
  `economy_floor_affords_cheapest_skin_by_level30` pass (02/09 14:25).

### 8.3 — UI level-select, shop, art pass (phiên `bd49eadf` tiếp diễn, `e9e489bb` khởi động)

**❌ Phương án bị loại:**
- Khay cố định 150px cho piece lớn nhất — bị loại vì làm khay to bất kể cỡ quân, nguy cơ tràn
  viewport màn ngắn: *"Tôi cân nhắc cả phương án... nhưng bỏ vì nó làm khay to hơn mọi lúc... có
  nguy cơ đẩy màn chơi tràn viewport trên máy màn hình ngắn (iPhone SE...)"* (01/09 04:10) — giữ
  100px + tự co khi cần.
- Hiệu ứng zoom "nhảy vào màn chơi" — build xong rồi xoá hẳn khi đổi sang hiệu ứng cửa tre thống
  nhất: *"Bỏ hẳn hiệu ứng zoom `#lvl-enter-fx` vừa thêm trước đó (CSS, HTML, JS) vì không còn dùng
  tới"* (01/09 05:10).
- Kệ Cửa Hàng chia theo hàng-3-món trong cùng 1 category — user bác thẳng: *"các vật phẩm có cùng
  category không nên được phân tầng, phân tầng khác category"* (01/09 14:18).
- Vật liệu tre cho màn chơi/level — user yêu cầu rồi đổi ý ngay trong ngày: *"đổi lại thành wooden
  material"* (03/09 06:29).
- Đổi màu cửa tre sang hổ phách — user bác lại đúng hôm đó: *"vẫn giữ lại cửa tre, các icon đang bị
  chìm vào background quá"* (06/09 16:19) → AI: *"Reverting the door recolor back to the original
  green bamboo."*

**🐞 Lỗi AI:**
- Hệ thống skin quân hoàn toàn vô tác dụng vì bị hàm `tileHTML()` khai báo sau đè lại: *"cơ chế skin
  quân... hoàn toàn không có tác dụng lên bàn chơi thật — vì `tileHTML()` bị 1 phiên bản khác... đè
  lại ở cuối file"* (01/09 06:57).
- CSS container-query tự tham chiếu chính nó làm emoji vỡ hình (01/09 07:20).
- **Lỗi khiến toàn bộ art pass "vô hình" với user**: `#zen-bg` phủ `position:fixed;inset:0` toàn bộ
  cửa sổ trình duyệt trong khi UI game chỉ nằm giữa cột ~480px — sau nhiều lần user báo *"i see no
  changes in external browser"* (02/09 17:13) và AI thử sai 3 giả thuyết (bị gate che, sai file,
  cache trình duyệt), mới tìm ra: *"nearly everything I added... gets scaled/cropped off past
  recognition"* (02/09 17:16).
- Tutorial "bàn tay hướng dẫn" không bao giờ hiện vì tính vị trí lúc màn hình còn `display:none`
  (02/09 12:22).
- Xoá `#h-goal-lab` làm crash 1 bản `renderHUD` cũ vẫn âm thầm chạy lúc tải trang: *"Cannot set
  properties of null"* (03/09 03:12).
- Nhãn "Tổng điểm" trong popup thắng sai vì `S.score` thực ra reset về 0 mỗi màn (03/09 02:05).
- Bug `vh` vs `svh` khiến bàn cờ/khung game tự nhảy khi cuộn trong webview — xảy ra **2 lần độc
  lập** (08/09 03:44 cho `#board`, 10/09 21:10 cho toàn `#app-frame`) — cùng một lớp bug, không rút
  kinh nghiệm từ lần đầu sang lần hai.

**✅ Kết quả sau kiểm thử:**
- Rebuild level-select: *"50 rows... 4 gates fully visible under header at top of list, 5
  mid-scroll... zero JS errors"* (31/08 11:47).
- Đo thật nút PLAY: *"31px (below 40-44px HIG/Material minimum)"* → sửa thành *"58×40px"* (01/09
  03:53).
- Cửa Hàng: *"grew from 8→12 tile skins, 7→11 board skins... 27/27 self-test checks green"* (01/09
  14:05).
- Khoá tỉ lệ khung hình: *"exact 0.5625 ratio held across tall-phone, wide-desktop, short, and
  square windows; 27/27 self-test"* (03/09 17:16).

## Giai đoạn 9 — 04/09/2026: Nhiệm Vụ Hàng Ngày + Điểm Danh 30 Ngày

*Nguồn: `06-CHANGELOG-TIEP-NOI.md`; phiên `dc77ee59`, `4d19056f` (04–07/09).*

**🗣️ Phản biện:** AI tự nêu vấn đề thay vì im lặng làm theo: *"việc Cửa hàng cho nâng cấp *vĩnh
viễn* booster có hơi lệch khỏi hướng 'ưu tiên core, hạn chế buff phụ' hay không — bạn kiểm tra lại
xem có đúng ý muốn nêu ra không"* (04/09 07:49); ở bảng cân bằng economy, tự flag: *"Mốc giá skin rẻ
nhất (895 Xu) đang neo theo 'worst-case tới màn 30', nhưng KHÔNG tính Daily... Cần quyết định rõ có
chủ ý hay không"*, và *"Quest hết hạn cứng mỗi ngày, hơi lệch triết lý 'không phạt' đã thấy ở
Check-in/độ khó"* (06/09 12:29).

**🐞 Lỗi AI:** bản nháp đầu của ghi chú tuần bị thiếu vì chỉ nhìn theo thời gian sửa file gần nhất —
AI tự sửa bằng cách diff trực tiếp file với bản backup (04/09 07:49); bug tham chiếu hàng trong công
thức spreadsheet: *"I caught a few row-reference bugs in my formulas (hand-guessed row numbers
instead of computed ones)"* (06/09 12:25).

**✅ Kết quả sau kiểm thử:** *"Full end-to-end test passed: won level 1 through the real UI path,
both the quest and check-in day became claimable... zero console errors"* + *"4 assertion... 34/34
pass"* (04/09), giữ nguyên *"34/34 checks green"* sau khi merge với 3 phiên đồng thời khác (05/09
19:27).

## Giai đoạn 10 — Tuần W36 (01–07/09/2026): Lock/Crack, đổi mô hình booster, UI tổng thể, Settings

*Nguồn: `06-CHANGELOG-TIEP-NOI.md`; phiên `6f4b3585`, `e9e489bb`, `dc77ee59` (tiếp diễn).*

**❌ Phương án bị loại (gỡ hẳn sau khi đã xây xong):** user ra quyết định dứt khoát: *"xóa bỏ luôn
wild/joker và nứt, 3 tầng engine tầng nào chết thì dọn"* (07/09 02:23) — lý do đã ghi trong GDD
trước đó: *"Wild/Joker và Nứt (Crack) đã lập trình + tự kiểm đầy đủ nhưng 0/50 level chính thức thật
sự dùng"*. Gỡ khỏi cả `index.html` và `level-editor.html`.

**🐞 Lỗi AI:**
- Dọn Wild/Crack bỏ sót 1 đường code trùng: *"Good catch — a second default-level factory
  (`blankLevel()`). Fixing it"* (07/09 03:04).
- Nợ kỹ thuật tự nhận, không dọn hết vì rủi ro cao hơn lợi ích lúc đó: *"the oldest prototype layer's
  ~1000-line body is still present but inert — rewriting its declarations to fully remove it was
  judged higher risk than benefit for this pass"* (07/09 03:14).
- CSS `.hidden{display:none}` được dùng trong `level-editor.html` nhưng chưa từng được định nghĩa
  trong file đó — khiến hàng booster không bao giờ ẩn thật (08/09 15:30).
- Ô nhập "weight" mất focus mỗi lần gõ 1 ký tự vì `onDataChanged()` dựng lại toàn bộ DOM danh sách
  mỗi keystroke — **đúng lớp bug đã từng sửa ở panel khác nhưng chưa migrate sang panel này** (08/09
  15:30).
- Một agent con báo cáo sai về dead-code: gắn nhãn `renderHUD`/`renderBoard`/... là "còn sống",
  trong khi bản khai báo SỚM thực ra đã chết (bị gán đè sau) — AI **không tin báo cáo agent, tự
  verify lại từng tên** trước khi xoá gì (10/09).

**✅ Kết quả sau kiểm thử:**
- *"headless Chrome run of all 7 script blocks plus selfTest() shows 31/31 checks passing with zero
  console errors"* (07/09 03:15) — sau dọn dead-engine: *"same 0 real failures / 7 expected early
  wins as before"* (07/09 03:17).
- Audit hiệu năng mobile (CPU throttle 4x): *"~1.6s startup parse/execute cost from dead legacy
  engines + 4 duplicate AudioContexts"* — nguyên nhân chính, còn lại (drag latency, cascade resolve,
  DOM leak) đều ổn (08/09 17:52).

## Giai đoạn 11 — 06–08/09/2026: Playtest Audit 50 màn + cân bằng level design

*Nguồn: `PLAYTEST-AUDIT-50-LEVELS.md`, `08-GDD-LEVEL-DESIGN.md`; phiên `6f4b3585`, `e9e489bb`,
`c44c499f`.*

**🗣️ Phản biện:** AI đính chính lại chính phản hồi user gửi để tránh sửa nhầm chỗ: *"Đính chính điểm
feedback #1: Game thực ra đã tự kết thúc màn ngay khi đạt đủ mục tiêu... không phải lỗi gameplay,
chỉ là dữ liệu khiến điểm khó bị tính lệch"* (07/09 19:21). Với Lv47 (đã có ở bản trước): quy tắc
giới hạn loại mahjong mâu thuẫn tên màn "PICK ANY FOUR OF THE SIX" — AI hỏi lại, user xác nhận áp
dụng quy tắc chung, tên màn tự nó cũng bị rút gọn 2 lần: "Six Faces" → ý tưởng của user "One Big
Board, Three Faces" (bị chê dài) → chốt "Three Of Six".

**🐞 Lỗi AI:**
- Công thức độ khó bỏ sót biến số (đã có ở bản trước) — user phát hiện qua chơi thật.
- Đọc nhầm thứ tự tham số `K_DOMINO_V(key,a,b)` khiến Lv38 khớp goal ngay nước 1.
- *"non-peak Lv10/14/20 came out nearly as high as the peaks themselves... which flattens the sine
  effect"* (01/09 00:18).
- *"Chapter 3's new average (40.74) already exceeds Chapter 5's (38.14) — the finale chapter. So
  raising Chapter 4... would only push it past Chapter 5 too"* (08/09 15:12) — buộc thiết kế lại
  cách tăng độ khó thay vì chỉ cộng dồn tuyến tính.
- *"Chapter 5 became jagged — Lv43/48 dipped to 'Vừa' tier... while Lv47/49/50 spiked to 58-62"*
  (08/09 18:03) — do kỹ thuật thêm độ khó tỉ lệ theo diện tích trống thay vì theo nhu cầu thật.
- Lv36: *"My seed tile at (3,2) got silently buried under a roof tile the original solution's move
  4 already deposited there... it could never match"* (06/09 11:00).
- Bug harness test tự viết, không phải bug game: *"That's clearly a bug in my test harness, not the
  game (all 50 fail identically at move 1, including trivial Lv1)"* — do `win()`/`lose()` thiếu
  `return` tường minh (06/09 11:17).
- Cuối phiên phát hiện **3 level thật sự đang hỏng** (không do đợt sửa nào của phiên này gây ra):
  *"Lv40 'Chapter 4 Review' (solution rỗng), Lv42 'Squeezed' (bước 3 solution ra ngoài biên bàn),
  Lv46 'Two Shots' (goal cần s1:4 nhưng solution chỉ đạt s1:2)"* — `selfTest()` trả `ok:false`
  (12/09, cuối file `6f4b3585`).

**✅ Kết quả sau kiểm thử:**
- Chuỗi số liệu thắng-sớm qua các đợt sửa (giữ nguyên bảng bản trước, nay có thêm mốc giữa):
  12→9→7 (07/09 03:11, ghi rõ "Lv12/17 no longer end early") →2 (07/09 06:49, "Lv28, Lv30").
- *"phát hiện 33 màn vi phạm quy tắc mới [giới hạn loại mahjong]... có màn lên tới 7 loại (Lv29,
  Lv47)"* (07/09 17:27) → sau sửa, self-test xanh + `check_win_at.js` xác nhận cả 33 màn vẫn giải
  được.
- Lv20-29 nâng độ khó bằng solver: *"All 10 levels (20-29) now pass with `winAt === solutionLen` —
  no early wins, no illegal moves"* — đường cong cuối: *"C1(19.6) &lt; C2(30.1) &lt; C3(40.7) &lt;
  C4(41.7) &lt; C5(43.0)"* (08/09).
- Monte Carlo cho Queue Pool: *"10/16 màn đã đạt 15/15 thắng ngay ở mức yếu nhất"* (10/09 21:27).

## Giai đoạn 12 — 09–12/09/2026: dọn dead code + đổi tên thư mục + rebalance seal

*Nguồn: đối chiếu timestamp repo + phiên `e9e489bb`, `c44c499f`, `15891deb`.*

**🗣️ Phản biện:**
- User ngắt lời khi thấy AI verify quá kỹ: *"dont need to check, if it's okay stop the work"*
  (01/09 08:04) — AI tự trích lại lệnh này khi cân nhắc có nên kiểm tra thêm không ở lần khác:
  *"...not worth chasing further per your earlier signal to stop over-verifying this"* (01/09
  13:43).
- AI chỉ thẳng ra 2 chỉ đạo user đưa ra mâu thuẫn nhau thay vì chọn bừa 1 bên: *"Mâu thuẫn trực tiếp
  với yêu cầu trước đó của bạn: lượt trước bạn bảo tôi rút 'chạm mở → chạm CHƠI' xuống còn 1 chạm...
  Spec này lại muốn giữ bước preview... cần bạn quyết định"* (02/09 13:44).
- User lặp lại đúng 1 phàn nàn 2 lần sau khi AI khẳng định code đúng: *"i see no booster button"*
  (03/09 01:57, 02:11) — tới lần thứ 2 AI mới thừa nhận có bug thật (tràn viewport ngắn), thay vì
  tiếp tục bảo vệ kết luận "code đúng" ban đầu.
- Khi tách rời seal-mechanic rework khỏi mahjong-x-block-b4, AI công khai thừa nhận uncertainty
  thay vì đoán liều: peer lo lắng đang sửa nhầm code chết, AI tự verify trực tiếp thay vì tin lời:
  *"`ac`/`beep` chỉ có ĐÚNG 1 bản trong toàn bộ closure lớn... và `sfx` dùng `const`... xác nhận
  chắc chắn khối âm thanh... là code SỐNG thật"* (08/09 18:20).

**❌ Phương án bị loại:**
- Cơ chế Seal "phải match kề sát ô Seal" — xây xong (chạm 6 hàm engine), phát hiện làm hỏng 13/21
  màn Seal, trong đó nhiều màn **không thể sửa được về mặt hình học** (Lv31/34 cần 6 mặt khác nhau
  kề 1 ô, trong khi 1 ô tối đa có 4 ô kề) — bị đảo ngược lại đúng luật gốc: *"sửa lại cơ chế seal
  thành ban đầu, đếm số cặp khác nhau thay vì nổ ở gần"* (12/09 08:42) → rồi đơn giản hoá thêm 1 bước
  nữa cùng ngày: *"không cần phải phá khác nhau để mở khóa, chỉ cần phá 1 cặp là được tính 1 số trên
  số cặp cần phá"* (12/09 11:12).
- Tài liệu thiết kế âm thanh tự nhận nhầm: *"it claimed sound was recorded samples; live code is
  WebAudio synthesis for all SFX, only music is a sample"* — tài liệu bị sửa lại cho khớp code thật,
  không phải ngược lại.

**🐞 Lỗi AI:**
- Dọn dead-code phát hiện khối engine cũ nhất "entangled sâu hơn grep tưởng" — 13 hàm phải chuyển
  thành stub rỗng thay vì xoá hẳn (đã có ở bản trước, nay xác nhận thêm qua log: net *-467/+40
  dòng*, *29/29 self-test*, 0 lỗi console).
- Bug CSS Grid `1fr` có sàn min-content ngầm, không phải 0 — làm Cửa Hàng tràn khung ở tỉ lệ hẹp,
  AI ban đầu còn không tái hiện được lỗi trước khi tìm ra nguyên nhân (04/09 02:38).
- 1 lần Edit tự AI ghi ra code rác/bị cắt cụt thay vì đúng cấu trúc dữ liệu dự định — phát hiện ngay
  khi đọc lại, viết lại hoàn chỉnh (07/09 20:42).
- **Rủi ro vận hành nhiều phiên cùng sửa 1 file, lặp lại và leo thang trong giai đoạn này**: 1 phiên
  phát hiện dữ liệu 50 level "trôi" diện rộng không ai chủ đích gây ra (moveLimit/solution tăng,
  Lock biến mất ở vài màn, goalType đổi ở Lv17) — nhiều phiên (`26`, `b4`, `d5`, `56`, `4b`, `aa`)
  nhắn tin loại trừ lẫn nhau, và tới cuối vẫn **chưa xác định được ai gây ra**, kèm cảnh báo nếu
  không phiên nào là thủ phạm thì nguyên nhân "outside the Claude sessions entirely" (12/09 10:54) —
  cuối cùng có báo cáo peer bị xung đột ghi file thật trong Level Editor, phải yêu cầu TẤT CẢ các
  phiên tạm dừng sửa 2 file `index.html`/`level-editor.html` (12/09 11:37).

**✅ Kết quả sau kiểm thử:**
- Seal rework cuối cùng: *"engine rewritten to count total pairs broken anywhere on the board...
  17 seal levels re-tuned by simulating each level's authored solution... self-test 32/33"* (1 lỗi
  còn lại xác nhận do trạng thái dở dang của 1 phiên khác trên Lv23, không phải do đợt sửa này gây
  ra) (12/09 11:25).
- Audit UI vòng 3: *"14 total bugs found and fixed across index.html + level-editor.html... all
  reverified green after the fact, không có gì bị bỏ sót hay bị revert bởi các phiên khác"* (08/09
  16:08).

## Giai đoạn 13 — 12–13/09/2026: âm thanh, lỗi Level Editor, và rủi ro đa phiên (phiên hiện tại)

*Nguồn: trực tiếp trong phiên làm việc này (`130fae8b`) — giữ nguyên nội dung đã viết ở bản trước,
đây là phần tôi có ký ức trực tiếp đầy đủ nhất, không cần trích lại qua agent.*

### 13.1 — Chuỗi tinh chỉnh âm thanh (đặt quân, match, nút bấm)

**🗣️ Phản biện:** khi user báo "âm thanh hiệu ứng lúc có lúc không", AI đưa giả thuyết cụ thể (mã
đang tune có thể là dead code bị 1 tầng engine khác gán đè) và chủ động dừng sửa, hỏi phiên khác
đang dọn dead code cùng lúc để xác minh. Phiên kia phản biện lại bằng bằng chứng cụ thể (`const
sfx={...}` không thể bị bare-reassignment ghi đè, nếu có sẽ crash mà game không hề crash) → bác bỏ
giả thuyết dead-code — một vòng phản biện có bằng chứng ở cả hai chiều.

**❌ Phương án bị loại:** chuỗi gain match `1.1→.6→(qua 1.0+compressor)→.32` kèm cắt còn 140ms (quá
nhẹ, gần như im lặng); lớp "sine sweep" tổng hợp thêm vào tiếng đặt quân — bị loại vì "một tông synth
sạch cạnh 1 sample thật không hoà"; lớp "switch" pha trước tiếng match — bị loại vì thêm độ trễ.

**🐞 Lỗi AI:**
- Cắt tiếng match còn 140ms từ giây 0 mà không kiểm tra sample có khoảng lặng/rè ở đầu — cắt trúng
  đúng đoạn rè, bỏ lỡ hẳn phần "crack" thật, khiến tiếng gần như biến mất.
- Giả thuyết đầu tiên sai về bug Level Editor "không vẽ được nhóm Khóa" — nghi `RECT_TOOL_ARRAYS`
  thiếu khoá `'lock'`, nhưng đọc kỹ lại thấy `applyRectTool()` đã xử lý riêng cho `'lock'` từ trước —
  giả thuyết bị loại trước khi kịp sửa sai chỗ.

**✅ Kết quả sau kiểm thử:** chặn `AudioContext.prototype.decodeAudioData` xác nhận cả 5 file âm
thanh giải mã thành công (đúng byte/độ dài từng file); mô phỏng 1 lượt chơi thật (đặt quân → match →
cascade 3 cặp) gọi `sfx.place()`/`sfx.pop()` liên tục — 0 lỗi JavaScript; 2 self-test nội bộ pass.

### 13.2 — Lỗi thật: tool "Khóa" trong Level Editor bị nuốt click

Sau khi giả thuyết dead-code bị loại, test trực tiếp mọi kịch bản hợp lý đều pass — phải hỏi lại
user 3 câu cụ thể mới thu hẹp đúng điều kiện: chỉ xảy ra khi click đơn vào ô ĐÃ CÓ SẴN tile.

**🐞 Lỗi AI (bug có sẵn từ trước, do AI tìm ra):** tile Floor/Roof render `draggable=true`; điều
kiện chặn kéo-thả chỉ liệt kê `'seal'`/`'permanent'`, quên `'lock'` — chuột thật (luôn xê dịch nhỏ)
bị trình duyệt hiểu nhầm thành kéo-thả HTML5, nuốt mất click trước khi chạm code Khóa. Khớp đúng mọi
triệu chứng: chỉ Khóa lỗi, hoàn toàn im lặng, và **không tái hiện được bằng test tự động** (click
script hoá không có độ xê dịch tay người thật).

**✅ Kết quả sau kiểm thử:** thêm `'lock'` vào điều kiện chặn ở cả 2 chỗ; test lại toàn bộ — không
hồi quy. Phát hiện thêm 1 lỗi phụ: xoá 1 nhóm Khóa đứng trước nhóm đang chọn làm lệch chỉ số
`activeLockGroup` — sửa cùng đợt.

### 13.3 — Icon/chữ không nhất quán + emoji trùng lặp giữa các mặt quân

User báo: board hiện hình nhưng khu vực khác hiện chữ; 2 mặt quân trùng hình (tự sửa từ "A và D"
thành "A và C" ở tin nhắn kế).

**🐞 Lỗi AI... nhưng là lỗi có sẵn trong DATA của game:** mặt A (`s1`) và C (`w1`) cùng dùng emoji 🪷
— không chỉ ở Level Editor mà ngay trong chính game thật (skin "Hoa Sen"). Audit mở rộng phát hiện
thêm 3 skin bán trong Cửa Hàng cũng lỗi y hệt: Fruit (trùng cả rank 1 lẫn 2: 🍎🍊), Ocean (trùng rank
1: 🐠), Treasure (mặt s rank 1 trùng mặt w rank 2: 💎) — lỗi thật ảnh hưởng người chơi đã/sẽ mua skin.

**✅ Kết quả sau kiểm thử:** hoán đổi giá trị trong mảng (không thêm emoji mới); script kiểm tra 8
mặt quân cho ra đúng 8 emoji khác nhau; Playwright xác nhận cả Level Editor và game thật, 0 lỗi
console, self-test pass.

### 13.4 — Rủi ro vận hành: nhiều phiên Claude cùng sửa 1 file (tiếp diễn từ Giai đoạn 12)

Xuyên suốt phiên này, ít nhất 5 phiên Claude khác nhau liên tục nhắn tin chéo để xác nhận phạm vi,
báo cáo hoàn thành, và cùng loại trừ nghi phạm khi phát hiện dữ liệu 50 level "trôi". AI trong phiên
này: xác nhận không phải mình gây ra hiện tượng trôi dữ liệu; gợi ý hướng điều tra cho phiên khác;
và trước khi tin báo cáo "đã xong, không đụng vùng của bạn" từ 1 phiên khác, **tự grep lại trực tiếp
trên file** để xác nhận fix của mình còn nguyên vẹn thay vì tin lời suông.

---

## Trạng thái hiện tại — tóm tắt kỹ thuật (tính đến 13/09/2026)

*(Giữ nguyên nội dung tóm tắt từ bản trước — không đổi kể từ khi viết lại lần này, vì Giai đoạn 13
chỉ bổ sung bằng chứng, không đổi trạng thái kỹ thuật cuối cùng.)*

- **Core loop**: kéo 1 polyomino (2–5 ô, mixed-ID) vào bàn N×N tối đa 2 tầng; Match 2+ cùng
  mặt/cùng tầng/liền kề/đang lộ; support mất → rơi → cascade.
- **Goal type**: `TILE_QUOTA`, `TARGET_FACE`, `OPEN_SEAL`, `BURIED_TARGET`.
- **Blocker**: Ô Chắn/Permanent, Phong Ấn/Seal (đếm mặt khác nhau bất kỳ đâu trên bàn, luật đã đảo
  lại về bản gốc 12/09), Khóa/Lock. Wild/Joker và Nứt/Crack đã gỡ bỏ hoàn toàn.
- **Nội dung**: 50 level, mỗi level có solution tự-verify — nhưng tính đến cuối Giai đoạn 11, có
  **3 level đã biết đang hỏng** (Lv40 solution rỗng, Lv42 solution ra ngoài biên, Lv46 solution
  không đạt goal) chưa xác nhận đã được sửa lại trong các đợt sau.
- **Âm thanh**: 5 sample thật nhúng base64 đã qua kiểm thử decode + trigger thật không lỗi; tiếng
  match/đặt quân/click đều đã qua nhiều vòng tinh chỉnh gain/độ dài theo phản hồi trực tiếp.
- **Skin**: 6 skin cosmetic — đã sửa hết lỗi trùng emoji ở 4/6 skin đang dùng thật.
- **Kỹ thuật**: đã qua 1 đợt dọn dead-code lớn nhưng vẫn còn tầng engine gốc cũ nhất chưa dọn hết;
  rủi ro vận hành rõ ràng nhất của dự án: **5+ phiên AI cùng sửa 1 file gần như đồng thời**, gây ít
  nhất 1 lần dữ liệu trôi chưa xác định được nguồn gốc, và ít nhất 1 lần xung đột ghi file thật buộc
  toàn bộ phiên phải tạm dừng.
- **Chưa làm / còn mở**: Monetization (Ads) chưa bắt đầu; nợ kỹ thuật tầng engine cũ nhất chưa dọn
  hết; độ mượt trên thiết bị yếu chưa có câu trả lời từ playtest thật; economy tự nhận "vẫn ở mức
  bản mẫu"; nguồn gốc "trôi dữ liệu" ở Giai đoạn 12 chưa xác định; **3 level hỏng phát hiện cuối
  Giai đoạn 11 cần xác nhận lại tình trạng hiện tại**.

---

## Câu hỏi follow-up lặp lại xuyên suốt các tuần (chưa có câu trả lời chốt)

- UI dựa hoàn toàn trên nền HTML thì tạo được game feel tốt tới đâu?
- 1 file HTML có đủ tối ưu cho 50 level (+ âm thanh + Cửa Hàng/skin) không, có ảnh hưởng độ mượt
  trên thiết bị yếu không?
- Độ khó sau mỗi đợt thêm cơ chế đã đủ thử thách cho tệp người chơi mục tiêu chưa — hay vẫn cần
  playtest người thật để hiệu chỉnh, không chỉ dựa công thức?
- Hệ economy (Xu/Cửa Hàng) hiện tại có đang chỉ "cho có" hay đã đúng vai trò lâu dài?
- Quy trình nào để nhiều phiên AI làm việc song song trên cùng 1 file lớn mà không gây "trôi dữ
  liệu" âm thầm hoặc xung đột ghi file thật (phát sinh rõ ràng ở Giai đoạn 12–13, chưa có giải pháp
  quy trình chốt)?

---

## Nguồn tài liệu đã dùng để tổng hợp

**Tài liệu:** `Bai_tap_Mahjong_x_Block_Puzzle_SINGLE_HTML.pdf` · `AILog_15082026.md` ·
`CHANGELOG.md` · `01-LICH-SU-THAY-DOI-DEN-FINAL-CORE.md` · `02-FINAL-CORE-GAMEPLAY-VA-HOOK.md` ·
`03-LICH-SU-THAY-DOI-24K-DEN-24K1-TOP-MATCH.md` · `FINAL-CORE-UI-UX-SPEC-TU-INDEX.md` ·
`Retro-Start-Stop-Continue-21082026.md` · `04-GDD-FINAL-CORE-MASTER.md` ·
`05-CHANGELOG-TOAN-DU-AN.md` · `06-CHANGELOG-TIEP-NOI.md` · `08-GDD-LEVEL-DESIGN.md` ·
`PLAYTEST-AUDIT-50-LEVELS.md`.

**Log hội thoại gốc (17 phiên, `.jsonl`, đọc trực tiếp qua 6 agent trích xuất song song):**
`b68ca5a6` (17/08) · `960f62ef` (18/08) · `eb2bc30a` (18–21/08) · `bd49eadf` (21–25/08) ·
`26035a6a` (25–28/08) · `a7efca4b` (24/08–01/09) · `41d87727` (28/08–12/09) · `6f4b3585` (28/08–12/09,
lớn nhất) · `e9e489bb` (31/08–12/09, lớn thứ nhì) · `dc77ee59`, `4d19056f` (04–07/09) · `ea9023e5`
(08/09) · `c7a77845`, `97387537` (06/09) · `c44c499f`, `15891deb` (11–12/09) · `130fae8b` (25/08–nay,
phiên hiện tại). *(3 file Weekly Note và `07-GDD-TONG-HOP-TU-INDEX.md` được các nguồn trên trích tên
nhưng không còn tồn tại đầy đủ trong repo/git history.)*

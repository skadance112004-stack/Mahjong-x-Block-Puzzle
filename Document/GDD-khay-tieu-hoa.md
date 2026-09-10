# GDD — KHAY TIÊU HÓA
### Mahjong × Block Puzzle · build `11-khay-tieu-hoa.html`

| | |
|---|---|
| **Bản mô tả** | prototype kiểm chứng hook, **8 màn** (bản đầy đủ dự kiến 50) |
| **Build** | 01 file HTML duy nhất, tự chứa CSS/JS/SVG/âm thanh, chạy offline, không CDN |
| **Nền tảng** | trình duyệt điện thoại, dọc, cảm ứng |
| **Feeling đích** | **nhẹ nhõm (relief)** — không phải ASMR thuần |
| **Thời lượng ván** | 12–18 nước/màn (đo bằng bot) |

> ⚠️ Mọi thông số dưới đây được **dump trực tiếp từ code build**, không viết lại từ ghi chú.

---

## 1. Hook

> **Đóng hàng KHÔNG làm quân bốc hơi. Quân bay vào KHAY. Khay tràn là thua.**

**Câu trả lời cho câu hỏi trọng tâm của đề bài** — quyết định mới mà không dòng nào có:

> *"Hàng này đã đầy rồi. Mình CÓ NÊN đóng nó không?"*

- **Block Puzzle** không bao giờ hỏi câu này — clear luôn luôn tốt.
- **Mahjong** không bao giờ hỏi, vì bạn chọn từng quân một, không nuốt cả hàng cùng lúc.

Chiều ngược lại cũng có thật: vì khay quyết định hàng nào an toàn, người chơi phải **xếp hàng có chủ đích** — *"mình cần một 3索 vào khay, nên phải đóng cột 4 chứ không phải hàng 6."* Mahjong dẫn dắt việc đặt khối, không chỉ ăn theo.

**Test "bỏ một phần":** bỏ khay → thành Block Blast thường. Bỏ block → không có gì đẩy quân vào khay. **Cả hai đều sập.**

**Verb-arc / feeling:** *tích trữ → nín thở → châm ngòi → tiêu hóa → nhẹ nhõm.* Pha **"nín thở"** (build-or-spend: cầm một hàng đã đầy và lưỡng lự) là tâm điểm cảm xúc, và là pha mà mọi prototype trước của nhóm đều thiếu.

---

## 2. Luật chơi

### 2.1 Vòng lặp cốt lõi

1. Khay dưới có **3 khối**. Kéo một khối lên bàn (hoặc bấm khối → bấm ô → bấm lại để xác nhận).
2. Đặt hết 3 khối → phát 3 khối mới.
3. Khi một **hàng ngang hoặc cột dọc đầy** → hàng đó **không bốc hơi**. Quân trong hàng **lần lượt bay vào KHAY**.
4. Trong khay, mỗi lần một quân vào là kiểm tra bộ ngay:
   - **Phỗng** = 3 quân **cùng ID** → nổ, **+120**
   - **Sảnh** = 3 quân **liên tiếp cùng chất** (vd 3-4-5 索) → nổ, **+150**
5. **Khay vượt số ô cho phép → THUA NGAY.**
6. Đủ số bộ mục tiêu → qua màn.

### 2.2 Chi tiết cần đúng khi implement

| Luật | Quy định chính xác |
|---|---|
| Đặt khối | Toàn bộ ô của khối phải trong bàn và đang trống. Không xoay, không trọng lực. |
| Phát hiện hàng đầy | Quét **hàng trước, rồi cột**. Ô nằm ở giao của cả hàng đầy và cột đầy chỉ tính **một lần**. |
| Thứ tự quân vào khay | Hàng: trái→phải. Cột: trên→dưới. Theo thứ tự quét ở trên. |
| **Trần nhận (`intake`)** | Mỗi lượt khay chỉ nhận **tối đa `intake` quân đầu tiên**; quân dư **bay đi**, được **+6 điểm/quân**. |
| Tìm bộ trong khay | Xét **mọi tổ hợp 3 quân** (không cần liền nhau). **Ưu tiên phỗng trước sảnh** — để lại thế sảnh cho người chơi. Lặp đến khi không còn bộ. |
| Quân chữ (honors) | **Chỉ phỗng, KHÔNG có sảnh.** Lẻ một con là rác thuần. |
| Sảnh | Phải **cùng một chất**. 3索4索5索 hợp lệ; 3索4筒5索 không. |
| Điều kiện tràn | Sau mỗi lần đẩy quân + nổ hết bộ: nếu `số quân trong khay > cap` → thua. |
| Thắng màn | `số bộ đã nổ >= goal` |
| Thua | (a) tràn khay, hoặc (b) không khối nào đặt được **và** đã hết lượt Đổi khối. |

### 2.3 Bốn chất quân

| Mã | Tên | Hình | Màu | Sảnh? |
|---|---|---|---|---|
| `s` | Sách (索) | n thanh tre dọc | xanh lá | ✔ |
| `c` | Văn (筒) | n vòng tròn | xanh dương | ✔ |
| `w` | Vạn (萬) | chữ số lớn + gạch trang trí | đỏ | ✔ |
| `h` | Chữ | 中 / 發 / 白 (icon hình học) | vàng | **✘ không** |

Mọi quân đều có **số/ký tự nhỏ ở góc trên-trái** — bắt buộc, để người chơi đọc được rank mà tính sảnh.

### 2.4 Hai công cụ

| Công cụ | Tác dụng | Lượt/màn |
|---|---|---|
| 🔄 **Đổi khối** | Thay toàn bộ khối chưa dùng trong khay dưới | 2–3 |
| ✋ **Xả 1 quân** | Bấm nút → bấm một quân trong khay → bỏ nó đi | 2–3 |

### 2.5 Dự báo — thành phần quan trọng nhất của UX

Trong lúc kéo khối, góc phải khay hiện **dự báo trực tiếp**:

- An toàn (xanh): `+6(↑1) · nổ 2 · dư 3/8` — bao nhiêu quân vào khay, (bao nhiêu bay đi), nổ mấy bộ, khay còn dư mấy trên mấy.
- Nguy hiểm (đỏ): `⚠ TRÀN KHAY — SẼ THUA`
- Khay **vẽ trước** trạng thái tương lai; quân sẽ thay đổi vẽ **mờ**.
- Ô của hàng sắp đóng **tô xanh**, hoặc **tô đỏ** nếu nước đó gây tràn.

> Không có dự báo này, hook chỉ là **đánh cược**, không phải quyết định. Đây là chỗ *không được* cắt để tiết kiệm.

---

## 3. Thông số

### 3.1 Điểm

| Hành động | Điểm |
|---|---|
| Đặt 1 quân xuống bàn | **+2** /quân |
| Đóng 1 hàng/cột | **+30** /hàng |
| Quân bay đi (vượt `intake`) | **+6** /quân |
| **Phỗng** nổ | **+120** × combo |
| **Sảnh** nổ | **+150** × combo |
| **Sạch khay** (khay rỗng sau một lượt đóng hàng) | **+80** |
| Combo | `min(chuỗi, 5)`, chuỗi tích lũy **trong cùng một lượt đóng hàng**, reset mỗi lượt |

*Điểm meld chiếm ~60–70% tổng điểm — có chủ đích, để hai hệ thưởng nhau chứ không tranh nhau.*

### 3.2 Khối

**18 hình**, phân bố: 1 hình 1 ô · 2 hình 2 ô · **6 hình 3 ô** · **9 hình 4 ô**.
Gồm domino, tromino (4 hướng), I3/I4 (ngang+dọc), O, T (2 hướng), J, L, S, Z.
Mỗi màn lọc theo `maxCells` (màn 1–2 chỉ ≤3 ô).

### 3.3 Sinh quân trong khối (`rig`) — cơ chế bắt buộc

Bài học từ prototype `03-hand-builder`: **tray random không thiên vị = không thể lên kế hoạch = không có game** (§5.2 chứng minh bằng số).

1. Tính **nhu cầu khay**: mọi ID đang có trong khay (hướng phỗng) + mọi rank còn thiếu của các cặp cùng chất cách nhau 1 hoặc 2 (hướng sảnh).
2. Mỗi ô của khối: với xác suất **`rig`** lấy một ID từ nhu cầu; ngược lại lấy từ pool có **thiên vị theo tần suất trên bàn** (mỗi ID trên bàn được nhân thêm tối đa 2 lần trong pool).
3. Ngoài ra, khối ≥3 ô có xác suất **`rig × 0.45`** là khối **tự tiêu hóa** — toàn bộ cùng một ID, hoặc một sảnh liền.

### 3.4 Bảng 8 màn (dump từ build)

| Màn | Tên | Bàn | Chất | Rank | Chữ | **ID** | Khay | Nhận | Mục tiêu | ≤ô | rig | Đổi | Xả | Seed |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Quân không bốc hơi | 6×6 | s | 1–5 | 0 | **5** | 9 | 6 | 4 bộ | 3 | .72 | 2 | 2 | 5 |
| 2 | Sảnh | 6×6 | s | 1–7 | 0 | **7** | 9 | 6 | 5 bộ | 3 | .68 | 2 | 2 | 5 |
| 3 | Hai chất | 6×6 | s c | 1–5 | 0 | **10** | 9 | 6 | 5 bộ | 4 | .64 | 2 | 2 | 5 |
| 4 | Khay hẹp lại | 6×6 | s c | 1–7 | 0 | **14** | 8 | 6 | 6 bộ | 4 | .60 | 3 | 2 | 5 |
| 5 | Bàn rộng, hàng dài | 7×7 | s c | 1–7 | 0 | **14** | 8 | 6 | 6 bộ | 4 | .58 | 3 | 2 | 6 |
| 6 | Đủ 9 số | 7×7 | s c | 1–9 | 0 | **18** | 8 | 6 | 7 bộ | 4 | .55 | 3 | 3 | 6 |
| 7 | **Quân chữ** | 7×7 | s c w | 1–5 | 3 | **18** | 8 | 6 | 6 bộ | 4 | .58 | 3 | 3 | 6 |
| 8 | Màn cuối bản test | 8×8 | s c w | 1–6 | 3 | **21** | 9 | 7 | 8 bộ | 4 | .54 | 3 | 3 | 7 |

`Seed` = số quân rải sẵn đầu màn = `max(4, round(size × 0.9))`, **không bao giờ tạo hàng đầy ngay lúc rải**.

---

## 4. Beat chart

`D` = dạy cơ chế mới · `L` = luyện · `K` = kết hợp/siết · **▲** = cú nhảy **định tính** (luật mới) · **△** = cú nhảy **định lượng**

| Màn | Beat | Cơ chế mới | Trục bị siết | Trục được **nới** để bù | Cảm xúc dự kiến |
|---|---|---|---|---|---|
| 1 | **D** ▲ | Quân vào khay · **phỗng** | — | ID chỉ 5, khay 9, khối ≤3 ô | "à, quân không mất đi" |
| 2 | **D** ▲ | **Sảnh** | ID 5→7 | — | "có hai cách nổ" |
| 3 | **D** ▲ | Chất thứ hai · sảnh phải cùng chất | ID 7→10, khối ≤4 ô | rank tụt 7→5 | bắt đầu phải nhìn màu |
| 4 | **K** △ | — | ID 10→14, **khay 9→8** | +1 lượt Đổi khối | **lần đầu thấy nguy hiểm** |
| 5 | **L** △ | — | bàn 6→7 (hàng 7 quân) | `intake` 6 < 7 → quân dư bay đi | *thả lỏng* (răng cưa) |
| 6 | **K** △ | — | ID 14→18 | +1 lượt Xả | "hàng ngẫu nhiên không tự tiêu hóa nữa" |
| 7 | **D** ▲ | **Quân chữ** — chỉ phỗng, không sảnh | +chất Vạn, +3 quân rác | **rank 9→5, khay giữ 8** | "con lẻ này là rác" |
| 8 | **K** △ | — | bàn 7→8, ID 18→21, mục tiêu 8 bộ | **khay 8→9**, `intake` 7 | tổng duyệt |

**Nguyên tắc bố trí (theo tài liệu tham chiếu §3):** mọi cú nhảy ▲ đều đi kèm **nới một trục mịn** ở cùng màn. Xem màn 7 — thêm quân chữ *đồng thời* hạ rank 9→5 và **không** siết khay. Đây là sửa chữa trực tiếp từ kết quả đo (§5.3).

---

## 5. Đường cong độ khó — có số liệu

### 5.1 Đo bằng bot, 30 trial/màn

Hai bot **xếp khối giỏi ngang nhau** (cùng heuristic: thưởng gom cụm, phạt tạo lỗ kín). Khác biệt **duy nhất**: có đọc khay hay không.

- **NAIVE** = phản xạ Block Blast: đóng được hàng nào là đóng, không nhìn khay.
- **CAREFUL** = đọc dự báo, tránh nước gây tràn.
- **Δhook** = chênh lệch tỷ lệ thắng = **giá trị của việc đọc khay**.

| Màn | CAREFUL thắng | chết tràn | bí nước | **Δhook** | % lượt có nước chết |
|---|---|---|---|---|---|
| 1 | 97% | 0% | 3% | −3pt | 0% |
| 2 | 100% | 0% | 0% | 3pt | 0% |
| 3 | 93% | 0% | 7% | 6pt | 1% |
| 4 | 63% | 27% | 10% | **40pt** | 17% |
| 5 | 73% | 3% | 23% | **53pt** | 14% |
| 6 | 53% | 10% | 37% | **50pt** | 22% |
| 7 | 57% | 27% | 17% | **54pt** | 25% |
| 8 | 37% | 30% | 33% | **34pt** | 27% |

**Đọc được gì:**
- Màn 1–3 tỷ lệ thắng 93–100%, Δhook ≈ 0 → **vùng dạy, không thể chết**. Đúng yêu cầu "màn đầu tỷ lệ thắng phải rất cao".
- Từ màn 4, bot phản xạ Block Blast **chết vì tràn khay 60–100% số ván**. Đọc khay đáng **40–54 điểm phần trăm**. → **Hook chịu lực, không phải trang trí.**
- Răng cưa có chủ đích: **63% → 73% → 53%** (khó, thả, khó).

*Bot chỉ nhìn 1 nước và không dùng nút Xả → tỷ lệ thắng của người chơi thật cao hơn đáng kể. Coi 37% ≈ "khó nhưng qua được".*

### 5.2 Ba trục — và trục nào dùng cho việc gì

| Trục | Loại | Ảnh hưởng đo được | Dùng để |
|---|---|---|---|
| **Số ID** (`chất × rank`) | **mịn** | 10 ID→79% · 12→71% · 14→50% · 18→33% thắng | **Trục chủ lực trải 50 màn.** Trơn, chia nhỏ tùy ý, không phá hook ở bất kỳ điểm nào. |
| **Số ô khay** (`cap`) | **thô** | 9→Δhook 29pt · **7→Δhook 50pt** · 6→17pt · **5→8pt** | Dùng dè, vùng vàng **7–9**. Khay ≤5: mọi nước đều tràn → dự báo vô nghĩa → **giết hook**. |
| **Trần nhận** (`intake`) | mịn | chủ yếu đổi "chết vì tràn" thành "chết vì bí" | **Van an toàn** để làm mềm cú nhảy thô, không phải trục độ khó. |

### 5.3 `rig` không phải tinh chỉnh — là điều kiện sống còn

| `rig` | CAREFUL thắng | **Δhook** |
|---|---|---|
| 0.75 | 50% | **50pt** |
| 0.60 | 46% | 46pt |
| 0.50 | 33% | 33pt |
| 0.35 | 33% | 33pt |
| **0.15** | 8% | **8pt** |

Khi tray gần như random, Δhook sụp từ 50pt xuống **8pt** — đọc khay không còn giúp gì, vì không có quân để lên kế hoạch. **Không rig tray thì không có game.** Giữ `rig ≥ 0.5` ở mọi màn.

---

## 6. Trình bày & juice

| Khoảnh khắc | Phản hồi |
|---|---|
| Đặt khối | quân bật vào ô (scale 0.55→1, 190ms), blip 320→420Hz |
| Hàng đầy | nhấp sáng cả hàng (brightness ×2.6, 220ms), tiếng trầm 180→90Hz |
| Quân bay vào khay | bay theo đường cong lên khay (230ms, có vồng), blip 700→900Hz **từng quân một** |
| Bộ nổ | slot phóng to 1.3× rồi biến mất · tia tóe · số điểm nổi lên · tiếng lên cao dần **theo chuỗi combo** (`520 × 1.13^n`) |
| Sạch khay | 2 nốt lên + 16 tia xanh + chữ "SẠCH KHAY +80" |
| Khay ≥ cap−1 | viền đỏ + glow đập nhịp |
| Sắp tràn | khay **rung** + tiếng buzz trầm |

Bố cục dọc, thứ tự từ trên: HUD → **KHAY** → bàn → khay khối + công cụ. Khay đặt **trên** bàn để luôn trong tầm mắt khi cân nhắc; khối đặt **dưới** cho vừa tầm ngón tay.
Ô bàn ~48–57px trên máy 390px → thoải mái cho ngón tay. Toàn bộ hình quân là **SVG dựng bằng hình học** (không phụ thuộc font CJK — quan trọng cho máy Android thiếu font). Âm thanh **tổng hợp bằng WebAudio**, không file ngoài.

---

## 7. Cấu trúc build

| Khối | Vai trò |
|---|---|
| `LEVELS[]` | **Toàn bộ dữ liệu 8 màn nằm trong một mảng khai báo** — sửa độ khó không cần sửa logic |
| `meldOf(a,b,c)` / `findMeld(khay)` | Luật mahjong. `findMeld` quét mọi tổ hợp 3, ưu tiên phỗng |
| `fullLines(board)` | Phát hiện hàng/cột đầy, trả về Map ô→quân (đã dedupe) |
| **`simulate(r,c,i)`** | **Mô phỏng nguyên nước đi** (đặt → tìm hàng → tiêu hóa) mà không đổi state. Dùng cho **cả dự báo UI và bot cân bằng** — nên dự báo hiển thị *chắc chắn* khớp với kết quả thật |
| `place(r,c,i)` | Thực thi nước đi + animation, `async` |
| `makePiece()` / `needIds()` | Sinh khối có thiên vị (`rig`) |
| `S.fast` | Bỏ toàn bộ animation → chạy hàng nghìn ván để tune 50 màn |
| `window.__digest` | Hook test: `simulate`, `setBoard`, `setKhay`, `setTray`, `LEVELS`, `state()` |

`simulate()` được dùng chung cho dự báo và cho bot là quyết định thiết kế quan trọng nhất về mặt kỹ thuật: nó **loại bỏ khả năng dự báo nói dối người chơi**.

**Tự kiểm:** file tự chạy 6 assertion khi load (phỗng, sảnh, sảnh khác chất phải fail, quân chữ không có sảnh, quân chữ phỗng được, ưu tiên phỗng) và log `[selftest] OK` ra console.

**Đã kiểm bằng Playwright/Chromium headless — 32 check pass, 0 lỗi console:** dự báo khớp kết quả thật · cảnh báo tràn đúng · thua đúng lý do · kéo-nhả đặt được khối · tap-tap đặt được khối · 2 công cụ hoạt động · 8 màn khởi tạo hợp lệ (không seed ra hàng đầy, luôn có nước đi) · bot tự chơi 74 nước qua 7 màn không treo.

---

## 8. AI

| | |
|---|---|
| **Model** | `claude-opus-5` (Claude, chế độ Cowork) |
| **Dùng cho** | chẩn đoán 12 prototype cũ (đọc JS, không đọc mô tả) → phân loại kiểu khớp nối → sinh 6 concept → build HTML → **viết bot cân bằng** → tune đường cong → viết GDD |
| **Kiểm thử** | Playwright + Chromium headless (test chức năng, sweep tham số, soak) |
| **Người quyết định** | Game Designer chọn concept, chốt hook, phê duyệt đường cong |

**Prompt tổng hợp cuối:**

> *"dựa vào prototype đã tạo, tạo 1 file MD GDD ngắn"*

**Ba quyết định lớn và nguồn của chúng (truy được về nhật ký):**

1. **Chọn "Khay Tiêu Hóa" trong 6 concept** — vì là concept duy nhất khiến *"đóng hàng"* trở thành một **quyết định có rủi ro**, và vì nó ghép đúng cơ chế của hai game bán chạy nhất trong data thị trường của nhóm (Vita Mahjong 9.44M DL = khay chờ; Block Blast 18.3M DL = đặt khối).
2. **Đổi trục độ khó chủ lực từ `cap` sang `số ID`** — vì đường cong đầu tiên **vỡ** (bot cẩn thận thắng 0% từ màn 5), và sweep cho thấy `cap ≤ 5` giết hook (Δhook 50pt → 8pt).
3. **Bắt buộc rig tray ≥ 0.5** — vì đo được `rig 0.15` làm Δhook sụp còn 8pt. Đây cũng là điểm chết đã tìm thấy ở 11/12 prototype cũ.

**AI đã sai ở đâu (giữ lại để đối chiếu):**
- Đường cong 8 màn phiên bản đầu **hoàn toàn không chơi được** — tự tin trên giấy, 0% thắng khi đo. Chỉ bot mới lộ ra.
- Bố cục bàn chơi ban đầu **collapse về 0px** (flex item + grid `1fr` + `aspect-ratio` gây phụ thuộc vòng). Chỉ screenshot mới lộ ra, test logic pass hết.
- Bot cân bằng phiên bản đầu chết vì "bí nước" 54–100% → dẫn tôi tới kết luận sai là *game quá khó*. Thực ra **bot quản bàn dở**. Phải viết lại heuristic xếp khối trước khi số liệu có nghĩa.

---

## 9. Còn lại để lên 50 màn

1. **Trải trục số ID:** 5 → 30 ID qua 50 màn, mỗi màn +0.5 ID trung bình. `cap` chỉ đổi 4 lần (9→8→7→8→9), `intake` làm van.
2. **Ba cú nhảy định tính còn dư địa:** quân khóa (phải clear 2 lần) · slot khay bị đóng băng · **Riichi** (tuyên bố sẽ hoàn thành một bộ trong N lượt, ×3 điểm, trượt thì bị phạt) — Riichi đặt quanh màn 22–25.
3. **Tune bằng `S.fast`:** target CAREFUL 90–100% (màn 1–10), 70–85% (11–30), 45–65% (31–50); **giữ Δhook ≥ 30pt** ở mọi màn từ 12 trở lên.
4. **Giảm "bí nước"** — hiện 10–37%. Cần playtest người để tách phần nào là thiết kế, phần nào là bot 1-ply.
5. **Playtest người, câu hỏi duy nhất cần trả lời:** *người chơi có bao giờ **cố tình KHÔNG đóng** một hàng đã đầy không?* Có → hook đã sống. Nếu họ đóng bừa rồi chết mà không hiểu tại sao → **dự báo chưa đủ rõ**, sửa UI chứ đừng sửa luật.

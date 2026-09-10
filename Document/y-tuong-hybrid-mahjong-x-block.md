# Ý tưởng Hybrid Mahjong × Block Puzzle
### Chẩn đoán 12 prototype đã làm → 6 hướng hybrid mới

> Nguồn đã đọc: `thiet-ke-tu-cam-xuc-tong-hop 2.md`, `puzzle-design-6-muc-tieu 1.md`, đề bài `Bai_tap_Mahjong_x_Block_Puzzle`, `Mahjong market.txt`, `Block market.txt`, `Benchmark.MD`, `AILog_15082026`, và code JS của cả 12 file prototype (`01`–`07` trong folder 6-prototypes + `07`–`10` bản 3-tầng).

---

## PHẦN 0 — Chẩn đoán: 12 prototype đang khớp nối tới đâu

Đọc **code**, không đọc mô tả. Đây là điểm khớp nối *thật sự* trong từng file:

| Prototype | Khớp nối thật trong code | Mức |
|---|---|---|
| **05-battle** | `dmg = rows*14 + pungs*12` / `guard = cols*9 + chows*6` — **loại bộ quyết định loại tài nguyên**. Boss đánh trả ghi `curse` vào bàn → combat bẩn ngược lại board. | ★★★ hai chiều |
| **03-hand-builder** | `collect(id)` chạy trên mọi ô bị clear → clear là **cách duy nhất** thu tile cho tay bài. `makePiece()` rig 62% tile theo `need`. | ★★★ hai chiều |
| **08-3-layer** | `const level = lowestEmpty(rr,cc)` — **một khối bị xẻ dọc, mỗi tile rơi một tầng khác nhau** tùy độ cao cột. Địa hình block quyết định meld hình thành ở đâu. | ★★★ hai chiều |
| **04-towers** | `peel()` trên mỗi ô clear → **vị trí** của meld quyết định đào tới đâu. Nhưng pung/chow peel như nhau. | ★★ một chiều |
| **07-gravity-stack** | `completionCandidates()` lọc ứng viên theo `lowestEmpty(col)===level` → RNG offer bị địa hình lọc. | ★★ mỏng |
| **01-mahjong-block**, **07-gravity** | `findClears()` gộp line-cells và meld-cells vào **một Set duy nhất**. Mahjong = một trigger clear thứ hai. | ★ cộng, không nhân |
| **06-roguelike** | pung/chow bị **gộp thành `matches`** — mất phân biệt. Chỉ relic Jade cho mahjong trọng số riêng. | ★ yếu |
| **09**, **10** | Xóa hẳn line clear (`09`), rồi đổi 3 tầng thành tab (`10`). Block tụt xuống thành **ràng buộc**, không còn verb riêng. `lines` thành dead code. | ✗ một chiều |
| **02-collapse** | Không có một dòng nào đọc suit/rank. Bỏ mặt mahjong đi thì vẫn là Columns/Puyo y hệt. | ✗ reskin |
| **01-mahjong-only** | Không có mahjong (bản control). | — baseline |

### Ba phát hiện quan trọng

**1. Ba khớp nối thật đã tìm ra rồi** — và chúng thuộc ba *kiểu* khác nhau:
- `05` = **meld → tài nguyên khác loại** (đổi hệ quy chiếu)
- `03` = **clear → nguyên liệu cho mục tiêu mahjong** (pipeline vật chất)
- `08` = **địa hình block → tầng mà tile hạ cánh** (đổi hệ quy chiếu, hình học)

**2. Điểm chết chung của gần như toàn bộ:** ngoài `03` (rig tray) và `02` (`correlatedTiles`), tray tile là random **không thiên vị**. Người chơi **không thể lên kế hoạch cho một chow — chỉ có thể phát hiện ra là đang có một chow**. Đây là trần cứng chặn mọi chiều sâu mahjong, bất kể luật clear viết hay tới đâu. *(Đúng tiêu chí §1 của puzzle-design: "người chơi đủ thông tin để cân nhắc nhưng không chắc chắn" — hiện đang là "không đủ thông tin, thuần may".)*

**3. Toàn bộ 12 file bỏ qua linh hồn của Mahjong Solitaire: luật quân tự do (free tile).** Vita Mahjong — game #1 trong data thị trường của chính bạn, 9.44M DL — cốt lõi là *quân bị chặn* + *khay chờ*, không phải "ghép 3 quân giống nhau". Cả hai cơ chế này chưa prototype nào chạm tới. Đây là mỏ vàng còn nguyên.

**4. Có 2 bug đáng sửa nếu tái dùng code:** `07-gravity` chỉ chạy `findClears()` một pass rồi `finishTurn()` — meld sinh ra do trọng lực **không bao giờ được tính**; và cửa sổ trượt 3-ô bị **đếm trùng** (4 quân giống nhau liên tiếp = 2 pung, 5 quân sảnh = nhiều chow).

---

## PHẦN 1 — Vì sao đa số hybrid rơi vào "hai game cạnh nhau"

Cần gọi tên đúng bản chất kinh tế của hai dòng:

| | Block Puzzle | Mahjong |
|---|---|---|
| Đơn vị giá trị | **Chỗ trống** (occupancy) | **Danh tính** (identity) |
| Verb | ĐẶT (xây, làm đầy) | GỠ (dọn, làm rỗng) |
| Thất bại | Hết chỗ | Hết cặp / khay tràn |
| Mù về | Mặt quân là gì | Quân nằm ở đâu |

> **Nguyên nhân gốc của thất bại:** nếu cả hai hệ **cùng làm một việc là xóa ô**, thì mahjong chỉ là *một biến thể của luật clear* — hai hệ **cộng** vào nhau chứ không **nhân** (đúng §6 tài liệu cảm xúc: "không chung trục → siloed → chỉ là phép cộng"). Đó chính xác là chuyện đã xảy ra ở `01`, `06`, `07`.

**Điều kiện để nhân:** hai hệ phải **giao dịch một tài nguyên mà hệ kia cần và không tự tạo ra được.**

Có đúng 4 kiểu giao dịch khả thi:

| | Kiểu khớp nối | Mô tả | Ví dụ có sẵn |
|---|---|---|---|
| **K1** | **Pipeline vật chất** | Output của A là input bắt buộc của B | `03` |
| **K2** | **Chi phí đối nghịch** | A muốn đầy, B muốn rỗng, cùng một bàn | *chưa ai làm* |
| **K3** | **Đổi hệ quy chiếu** | Quyết định của A quyết định *hình học/tài nguyên* của B | `05`, `08` |
| **K4** | Cổng khóa | A mở khóa quyền dùng B | — *(dễ thành hai game cạnh nhau, tránh)* |

Sáu ý tưởng dưới đây đều nằm ở K1–K3, cố tình.

---

## PHẦN 2 — Sáu ý tưởng hybrid

Mỗi ý tưởng ghi: **Hook** (câu 1 dòng) · **Core loop** · **Quyết định mới** (câu trả lời cho câu hỏi trọng tâm của đề) · **Verb-arc & feeling** · **Trục độ khó** · **Rủi ro thật**.

---

### ⭐ Ý TƯỞNG 1 — KHAY TIÊU HÓA *(Digest)*
**Kiểu khớp nối: K1 ngược + K2**

> **Hook: "Block Puzzle mà đóng hàng là một RỦI RO, không phải phần thưởng."**

**Core loop.** Bàn 8×8 kiểu Block Blast, mỗi ô là một quân mahjong. Tray 3 khối polyomino như thường lệ.
- Đóng đủ hàng/cột → các quân **không bốc hơi**, chúng **bay vào KHAY 7 ô** ở dưới (đúng cơ chế Vita Mahjong).
- Trong khay: 3 quân giống nhau (pung) hoặc 3 quân liên tiếp cùng chất (chow) → **nổ**, điểm lớn, giải phóng slot.
- **Khay đầy 7 quân mà không nổ được → THUA NGAY.**

**Quyết định mới — chưa dòng nào có:**
> *"Hàng này đã đầy rồi. Mình CÓ NÊN đóng nó không?"*

Block Puzzle không bao giờ hỏi câu này — clear luôn luôn tốt. Mahjong không bao giờ hỏi vì bạn chọn từng quân một, không nuốt cả hàng. Ở đây bạn phải **xếp hàng có chọn lọc** để hàng chứa đúng những quân khay đang tiêu hóa được. Block placement bị mahjong dẫn dắt ngược lên: *"mình cần một 3索 rơi vào khay, vậy phải đóng đúng cột 4 chứ không phải hàng 6."*

**Verb-arc & feeling:** *tích trữ → nín thở → châm ngòi → tiêu hóa → nhẹ nhõm.*
Đây gần như trùng khít arc Snow Throw (*tích lũy → giữ → buông → va chạm*) trong tài liệu cảm xúc — có **khoảnh khắc build-or-spend** thật sự: cầm một hàng đã đầy trong tay và lưỡng lự. Aesthetic: **relief** (nhẹ nhõm) chứ không chỉ satisfaction — mạnh hơn ASMR thuần, và vẫn nằm trong vùng casual nếu khay rộng.

**Trục độ khó (rất mịn — điểm mạnh nhất của hướng này):**
- Trục mịn: số slot khay `9→8→7→6→5` · số chất `1→2→3` · có/không honor tile · tỉ lệ quân trùng · số hàng cần dọn để qua màn
- Trục mịn hiếm có: **"hàng clear chỉ đẩy tối đa N quân vào khay, phần dư bốc hơi"** — chỉnh N từ 8→5→3 là một trục cực mịn, chỉnh được nửa nấc
- Trục thô: quân khóa (phải clear 2 lần) · khay bị đóng băng 1 slot · quân "gió" chỉ nổ khi đủ 4

**Rủi ro:** căng hơn Block Blast cổ điển → không hợp casual thuần. **Xử lý:** 15 màn đầu để khay 9 slot + 1 chất duy nhất (chỉ pung, chưa dạy chow); nút "xả khay" 1 lần/màn.

**Vì sao là top pick:** trùng khớp với **hai game bán chạy nhất trong chính data của bạn** (Vita Mahjong 9.4M DL — khay chờ; Block Blast 18.3M DL — đặt khối). Hook nói được trong 8 chữ. Và test "bỏ một phần đi": bỏ khay → thành Block Blast thường; bỏ block → chẳng có gì đẩy quân vào khay. Cả hai đều sập.

---

### ⭐ Ý TƯỞNG 2 — HÓA NGỌC *(Petrify)*
**Kiểu khớp nối: K2 thuần — hai hệ đối nghịch trên cùng một bàn**

> **Hook: "Ghép bộ thì được điểm, nhưng bộ đã ghép hóa thành ngọc — vẫn chiếm chỗ. Chỉ hàng đầy mới dọn được ngọc."**

**Core loop.** Một bàn 8×8 duy nhất. Đặt khối như Block Blast.
- 3 quân thẳng hàng thành pung/chow → **lật thành NGỌC trơn** (mất mặt quân), **KHÔNG biến mất**, vẫn chiếm ô. Ăn điểm ngay.
- Hàng/cột đầy → clear như bình thường. **Ngọc trong hàng clear nhân đôi điểm.**

**Quyết định mới:**
> *Mahjong ăn điểm nhưng làm bàn **cứng lại**. Block dọn chỗ nhưng **phá thế meld** đang xây.*

Người tham meld sẽ chết ngạt vì hết chỗ. Người tham line clear sẽ liên tục xóa mất những quân mình cần. Hai verb *tranh nhau cùng một ô*. Đây là "orthogonal nhưng intersecting" đúng nghĩa trong §6 tài liệu cảm xúc.

**Verb-arc:** *gieo → kết tinh → chất đầy (nguy hiểm) → quét sạch → khoan khoái.*
Feeling: gần ASMR nhất trong 6 ý tưởng — nhịp "ghép nhỏ liên tục, thỉnh thoảng quét lớn". Juice rõ: quân lật vàng → ngọc phát sáng → hàng ngọc nổ thành mưa vàng.

**Trục độ khó:** kích thước bàn · số chất · **ngọc có tự vỡ sau N lượt không** (trục mịn tốt) · yêu cầu màn: "tạo 12 ngọc" vs "clear 8 hàng có ngọc" vs "làm sạch bàn hoàn toàn" · ô đá cố định không lật được.

**Rủi ro:** nếu juice yếu, người chơi cảm thấy meld "vô ích vì không dọn được chỗ". **Xử lý:** điểm meld phải chiếm ~60% tổng điểm, và ngọc nhân đôi khi clear để hai hệ *thưởng nhau*.

**Biến thể mạnh hơn (NGỌC & ĐÁ):** khối trong tray gồm cả quân sống lẫn **ô đá chết**. Đá không ghép meld được — chỉ line clear xóa. Quân sống thì line clear **không** xóa — chúng rơi xuống. → Hai hệ xóa **hai loại vật chất khác nhau, không thay thế nhau được.** Đây là bản đạt tiêu chí "bỏ một phần là game sập" tuyệt đối nhất, nhưng khó dạy hơn.

---

### ⭐ Ý TƯỞNG 3 — HÀNG NGANG / CỘT DỌC *(Two Axes, Two Rules)*
**Kiểu khớp nối: K2 — rẻ nhất để build, dễ hiểu nhất**

> **Hook: "Hàng ngang chơi luật Block. Cột dọc chơi luật Mahjong. Mỗi quân bạn đặt phải phục vụ cả hai."**

**Core loop.** Bàn 6×6.
- **Hàng ngang** đầy → clear, **bất kể mặt quân** (luật Block thuần).
- **Cột dọc** chỉ clear khi cả cột là một **tay bài hợp lệ** — ví dụ cột 6 ô = 2 bộ (pung/chow), hoặc 1 bộ + 1 đôi + ... (luật Mahjong thuần).

**Quyết định mới:**
> Mỗi quân nằm ở giao của **hai luật khác nhau**. Đặt 3萬 vào (r4,c2): nó là ô thứ 5 của hàng 4 (sắp clear kiểu block) *đồng thời* là quân thứ 3 của cột 2 (đang xây sảnh 2-3-4萬). Một quân, hai vai. Bạn liên tục phải chọn: **phục vụ trục nào**.

Đây là hook có **tỷ lệ chiều-sâu / độ-phức-tạp cao nhất** trong cả 6 — chỉ thêm đúng *một* luật so với Block Blast, nhưng mọi ô trên bàn lập tức có hai giá trị.

**Verb-arc:** *cân nhắc → đặt → hai luồng cùng tiến → một trong hai nổ.* Feeling: "sắp xếp thông minh", thiên về Challenge/Discovery hơn ASMR.

**Trục độ khó (đẹp và mịn):** kích thước cột (3 ô = 1 bộ → 5 ô = bộ + đôi → 6 ô = 2 bộ) · số chất · cột nào bắt buộc phải là mahjong (1 cột → 3 cột → tất cả) · số quân honor.

**Rủi ro:** bất đối xứng ngang/dọc có thể gây khó chịu thị giác. **Xử lý:** tô nền cột mahjong khác màu, viền vàng, badge tiến độ ở đầu mỗi cột.

**Vì sao đáng chú ý:** rẻ nhất (gần như là `01-mahjong-block` chỉ đổi `findClears`), và **dạy được bằng chơi trong 10 giây** — thẳng vào B2 (Tiếp cận, 8 điểm).

---

### Ý TƯỞNG 4 — NÚI TỰ XÂY *(Self-Built Mountain)*
**Kiểu khớp nối: K3 — bản "đúng chất Mahjong" nhất**

> **Hook: "Mahjong Solitaire mà chính bạn dựng lên ngọn núi mình phải đào."**

**Core loop.** Bàn 6×6, tối đa 3 tầng chồng.
- Đặt khối polyomino → quân chồng lên nhau, **chôn** những gì bên dưới.
- **Luật quân tự do (đúng mahjong solitaire):** chỉ quân ở **mặt trên** *và* **hở ít nhất một cạnh trái/phải** mới bắt cặp được.
- Bắt đôi giống nhau → xóa → quân trên rơi xuống, có thể mở khóa dây chuyền.
- Mục tiêu: dọn sạch bàn. Thua khi không còn nước đặt.

**Quyết định mới:**
> Mỗi lần đặt vừa **cho nguyên liệu vừa chôn nguyên liệu**. Block Puzzle lần đầu tiên có **chiều sâu (depth)** chứ không chỉ mặt phẳng — và bạn phải nghĩ trước 2 nước: "đặt khối này xong thì con 5筒 mình cần có bị kẹp giữa không?"

Đây là ý tưởng khai thác **thứ mà cả 12 prototype đều bỏ sót**: luật quân bị chặn. Nó cũng là ý tưởng duy nhất mà mahjong đóng góp *một luật không gian*, chứ không chỉ *một luật danh tính*.

**Verb-arc:** *bao quát → chôn (lo lắng) → tìm ra kẽ hở → gỡ → sập dây chuyền → sáng ra.*
Đây là arc **order-from-chaos** trong tài liệu cảm xúc, nhưng đã chuyển thành **agentive** — vì hỗn loạn do chính người chơi tạo ra. Rất mạnh về mặt coherence.

**Trục độ khó:** số tầng tối đa (2→3) · số chất · **hình khối có bị "xẻ dọc" khi rơi không** (kế thừa `08`) · quân xi măng không bắt được · yêu cầu dọn sạch vs dọn N cặp.

**Rủi ro lớn nhất — đọc 3 tầng trên mobile.** Đây đúng là vấn đề mà file `09`/`10` của bạn đang vật lộn. **Xử lý:** tối đa 2–3 tầng, quân bị chôn xám mờ + badge số tầng, quân *bắt được ngay* viền sáng — không dùng tab (tab giết cảm giác một bàn duy nhất).

---

### Ý TƯỞNG 5 — MELD RÈN KHỐI *(Meld Forges the Block)*
**Kiểu khớp nối: K3 — hook mạnh nhất, layout rủi ro nhất**

> **Hook: "Bộ bài bạn ghép sẽ biến thành khối bạn buộc phải đặt."**

**Core loop.** Hai khu vực, nhưng là **một đường ống**, không phải hai game:
- **Trên:** pool quân mahjong (1–2 tầng, layout solitaire).
- **Dưới:** lưới 8×8.
- Ghép một bộ từ pool → sinh ra một **khối có hình phụ thuộc loại bộ**:
  - Đôi (pair) → domino `1×2`
  - Pung (3 giống) → thanh thẳng `1×3`
  - Chow (3 liên tiếp) → chữ **L** hoặc **T** (tùy khoảng cách 3 quân trên pool)
- **Bắt buộc phải đặt khối đó xuống lưới.** Lưới đầy → thua.
- Đóng hàng ở lưới → **gỡ một tầng che ở pool** (hoặc xáo pool). ← chiều ngược lại.

**Quyết định mới:**
> *"Bộ tốt nhất về điểm có thể cho mình cái hình tệ nhất về chỗ."*

Không dòng game nào có quyết định này. Nó bắt người chơi **nghĩ bằng ngôn ngữ mahjong nhưng chịu hậu quả bằng hình học Tetris**. Đây là câu trả lời sắc nhất cho câu hỏi trọng tâm của đề bài.

**Verb-arc:** *soi pool → chọn bộ → rèn (biến hình) → tìm chỗ nhét → sạch/nghẹt.*

**Trục độ khó:** kích thước lưới · số tầng pool · hình khối gán cho mỗi loại bộ (đổi bảng ánh xạ = trục thô rất mạnh) · số bộ tối đa "để dành" được.

**Rủi ro thật — hai board trên màn hình dọc mobile, dễ bị chấm là "hai minigame cạnh nhau"** dù pipeline chặt chẽ. **Xử lý:** ép pool xuống thành **một dải ngang 2 hàng ở đỉnh màn**, lưới chiếm 70% màn. Hoặc: pool chính là **4 hàng trên cùng của lưới** — một bàn duy nhất, nửa trên chơi luật mahjong, nửa dưới chơi luật block, và khối "rơi" từ trên xuống dưới.

---

### Ý TƯỞNG 6 — XẢ BÀI & RIICHI *(Discard & Commit)*
**Không phải core loop độc lập — đây là LỚP PHỦ để đắp lên ý tưởng 1/2/3**

> **Hook: "Verb thật của Mahjong không phải là ghép — mà là BỎ."**

Mahjong thật vận hành bằng **rút–đánh (draw–discard)** và **tuyên bố (riichi)**. Không dòng casual nào dùng. Hai cơ chế đắp thêm:

**a) Xả bài.** Tray có 4 khối. Mỗi lượt: đặt 1, **bỏ 1** — khối bị bỏ **rơi xuống làm rác/đá** ở một cột bạn chọn. Rút 2 khối mới.
> *Quyết định mới:* **từ chối cũng có giá.** Block Blast chưa bao giờ tính phí việc "không dùng". Ở đây, việc chờ đợi một khối tốt hơn để lại dấu vết vật lý trên bàn.

**b) Riichi (tuyên bố).** Nhấn nút "Riichi" → tuyên bố sẽ hoàn thành một bộ cụ thể trong N lượt.
- Thành công → **×3 điểm**, hiệu ứng lớn.
- Trượt → phạt (mất lượt / bàn bị đổ thêm rác).
> *Quyết định mới:* cơ chế **cam kết**. Đây chính là pha **"giữ" (build-or-spend)** trong verb-arc — pha mà tài liệu cảm xúc chỉ ra là *tâm điểm* nhưng bị thiếu ở gần hết prototype hiện tại.

**Vị trí trong 50 màn:** Riichi là một cú nhảy **định tính** hoàn hảo để giới thiệu quanh **màn 22–25** — đúng lúc người chơi đã thạo core và bắt đầu chán.

---

## PHẦN 3 — Chấm điểm 6 ý tưởng theo khung của chính bạn

Thang 1–5. `Hook` theo §1 puzzle-design; `Tiếp cận` theo §2; `Trục mịn` theo §3; `Feeling` theo §4.

| Ý tưởng | Hook | Tiếp cận | Trục mịn (50 màn) | Feeling | Vai trò Mahjong | Chi phí build | **Rủi ro "hai game cạnh nhau"** |
|---|---|---|---|---|---|---|---|
| **1. Khay tiêu hóa** | **5** | 4 | **5** | **5** | **5** | 3 | Rất thấp |
| **2. Hóa ngọc** | 4 | 4 | 4 | **5** | 4 | **2** | Rất thấp |
| **3. Hàng ngang/cột dọc** | 4 | **5** | 4 | 3 | 4 | **1** | Rất thấp |
| **4. Núi tự xây** | 4 | 2 | 3 | 4 | **5** | 4 | Thấp |
| **5. Meld rèn khối** | **5** | 3 | 4 | 4 | **5** | 4 | ⚠️ **Cao** |
| **6. Xả bài + Riichi** | 3 | 2 | **5** | 4 | **5** | 2 | — *(lớp phủ)* |

---

## PHẦN 4 — Khuyến nghị

### Cấu hình tôi đề xuất cho bài nộp

**Core = Ý tưởng 1 (Khay tiêu hóa)** + **Ý tưởng 2 (Hóa ngọc) làm cơ chế màn giữa** + **Riichi làm cú nhảy định tính ở màn ~25**.

Lý do:
- Hook nói được trong một câu, và câu đó **trả lời trực tiếp câu hỏi trọng tâm của đề** (*"clear một hàng lần đầu tiên trở thành một quyết định có rủi ro"*) → thẳng vào **B1 (12đ)**.
- Cả hai cơ chế đều **soi chiếu vào hai game bán chạy nhất trong data thị trường của chính bạn** — không phải hybrid trên giấy.
- Trục độ khó cực mịn (số slot khay × số chất × trần "N quân vào khay") → đủ trải 50 màn mà không lặp máy móc → **B3 (12đ)**.
- Feeling rõ: **nhẹ nhõm (relief)**, không chỉ ASMR chung chung → **B4 (8đ)**.
- Test "bỏ một phần": bỏ khay → Block Blast thường; bỏ block → không có gì đẩy quân vào khay. **Cả hai đều sập** → đúng yêu cầu đề.

### Nếu cần bản an toàn / gấp
**Ý tưởng 3** — sửa đúng hàm `findClears` của `01-mahjong-block` là xong, dạy được bằng chơi, gần như không có rủi ro "hai game cạnh nhau".

### Cần sửa trước, dù chọn hướng nào
1. **Bỏ random tray không thiên vị.** Học từ `03-hand-builder`: `makePiece()` phải rig ~50–65% theo nhu cầu hiện tại (khay đang thiếu gì / meld đang dở). Không có cái này thì không có chiều sâu mahjong nào tồn tại được.
2. **Sửa đếm trùng cửa sổ trượt** (4 quân giống nhau ≠ 2 pung).
3. **Chỉ dùng 2 chất + không honor ở 15 màn đầu.** Tài liệu §3 nói rất đúng: chỗ cần mịn nhất là đầu và giữa game.
4. **Bỏ chow dọc** hoặc đổi tên nó — sảnh theo chiều dọc vô nghĩa về mặt mahjong và làm rối việc đọc bàn.

### Cách kiểm chứng nhanh (1 buổi/ý tưởng)
Theo §6 puzzle-design, dấu hiệu cần quan sát ở người lạ:
- Họ có **tự dừng lại trước một hàng đã đầy** không (ý tưởng 1)? → nếu có, hook đã sống.
- Họ có buột ra "à, phải để dành chỗ" không (ý tưởng 2)?
- Họ có nhìn **cả hàng lẫn cột** trước khi đặt không (ý tưởng 3)?

---

*Tài liệu này là đầu ra của bước "sinh N ứng viên" trong §8 tài liệu cảm xúc — LLM sinh, người chọn theo cảm giác thật, playtest phán quyết. "Không cái nào khớp" là một output hợp lệ.*

---

# PHỤ LỤC — Kết quả đo từ prototype `11-khay-tieu-hoa.html`

Ý tưởng 1 đã được build thành file HTML chơi được và **đo bằng bot** (headless Chromium, chế độ `S.fast` bỏ animation). Đây không còn là suy đoán trên giấy.

## 1. Thí nghiệm cốt lõi: hook có chịu lực không?

Hai bot **quản bàn giỏi ngang nhau** (cùng một hàm heuristic xếp khối: thưởng gom cụm, phạt tạo lỗ kín). Khác biệt **duy nhất**:

- **Bot NAIVE** — phản xạ Block Blast: đóng được hàng nào là đóng, **không nhìn khay**.
- **Bot CAREFUL** — đọc dự báo khay, tránh nước làm tràn, ưu tiên hàng tự tiêu hóa.

`Δhook` = chênh lệch tỷ lệ thắng giữa hai bot = **giá trị của việc đọc khay**.

| Màn | Cấu hình | ids | CAREFUL thắng | chết tràn | bí | **Δhook** | % lượt có nước chết |
|---|---|---|---|---|---|---|---|
| 1 | 6×6 khay 9 | 5 | 97% | 0% | 3% | −3pt | 0% |
| 2 | 6×6 khay 9 | 7 | 100% | 0% | 0% | 3pt | 0% |
| 3 | 6×6 khay 9 | 10 | 93% | 0% | 7% | 6pt | 1% |
| 4 | 6×6 khay 8 | 14 | 63% | 27% | 10% | **40pt** | 17% |
| 5 | 7×7 khay 8 | 14 | 73% | 3% | 23% | **53pt** | 14% |
| 6 | 7×7 khay 8 | 18 | 53% | 10% | 37% | **50pt** | 22% |
| 7 | 7×7 khay 8 *(quân chữ)* | 18 | 57% | 27% | 17% | **54pt** | 25% |
| 8 | 8×8 khay 9 | 21 | 37% | 30% | 33% | **34pt** | 27% |

*30 trial/màn. Bot chỉ nhìn 1 nước và **không dùng nút Xả** → người chơi thật sẽ cao hơn đáng kể.*

**Kết luận:** từ màn 4 trở đi, **bot phản xạ Block Blast chết vì tràn khay 63–100% số ván**, và việc đọc khay đáng giá **40–54 điểm phần trăm** tỷ lệ thắng. Câu hỏi *"có nên đóng hàng này không?"* là một quyết định có thật, không phải trang trí. Ở màn 1–3 Δhook ≈ 0 — đúng ý đồ: đó là vùng dạy, không thể chết.

## 2. Sweep tham số — ba kết luận đổi cách nghĩ

### (a) `rig` (thiên vị tray) là điều kiện SỐNG CÒN, không phải tinh chỉnh

| rig | CAREFUL thắng | Δhook |
|---|---|---|
| 0.75 | 50% | **50pt** |
| 0.60 | 46% | 46pt |
| 0.50 | 33% | 33pt |
| 0.35 | 33% | 33pt |
| **0.15** | 8% | **8pt** |

→ **Đây là bằng chứng số cho chẩn đoán ở Phần 0.** Khi tray gần như random (`rig` 0.15), Δhook sụp từ 50pt xuống 8pt — nghĩa là *đọc khay không còn giúp gì*, vì bạn không có quân để lên kế hoạch. Toàn bộ 12 prototype cũ (trừ `03`) đang ở vùng này. **Không rig tray thì không có game.**

### (b) Siết khay quá chặt thì GIẾT hook, không làm nó khó hơn

| cap khay | CAREFUL thắng | Δhook |
|---|---|---|
| 9 | 58% | 29pt |
| 8 | 46% | 38pt |
| **7** | 54% | **50pt** ← đỉnh |
| 6 | 17% | 17pt |
| **5** | 8% | **8pt** |

→ Khay ≤5 ô: *mọi* nước đều tràn nên đọc dự báo vô nghĩa → game chỉ còn "chết". **Cap là trục THÔ, dùng dè.** Vùng vàng là 7–9.

### (c) Trục mịn tốt nhất là **số ID** (`suits × maxRank`), không phải cap

| ids | CAREFUL thắng |
|---|---|
| 10 | 79% |
| 12 | 71% |
| 14 | 50% |
| 18 | 33% |

→ Đường cong trơn, chia nhỏ tùy ý (thêm 1 rank = +2÷3 ids), và **không phá hook** ở bất kỳ điểm nào. Đây chính là "trục đủ mịn để trải một đường cong dài mà vẫn mượt" (§3). **Với 50 màn, đây là trục chủ lực.**

Trục thứ ba, `intake` (mỗi lượt khay chỉ nhận tối đa N quân, quân dư bay đi): đo được là **van an toàn** chứ không phải trục độ khó — nó chủ yếu đổi "chết vì tràn" thành "chết vì bí". Dùng để làm mềm các cú nhảy thô.

## 3. Sai số của phép đo — phải nói rõ

- Bot chỉ nhìn **1 nước**, không dùng nút Xả, không lên kế hoạch nhiều lượt → **tỷ lệ thắng thật của người chơi cao hơn** con số ở bảng. Coi 37% của bot ≈ ván "khó nhưng qua được" với người.
- `bí nước` 10–37% có phần là bot dở (không biết chừa chỗ cho khối lớn). Cần playtest người để tách phần nào là thiết kế, phần nào là bot.
- Bot đo được *tỷ lệ thắng*, **không** đo được *cảm giác*. Câu hỏi ở §6 puzzle-design vẫn phải hỏi người thật: **họ có bao giờ cố tình KHÔNG đóng một hàng đã đầy không?** Nếu có — hook đã sống.

## 4. Cái đã sửa nhờ đo

1. **Đường cong ban đầu vỡ hoàn toàn**: bot cẩn thận thắng 0% từ màn 5. Sửa bằng cách đổi trục chủ lực từ `cap` sang `số ID`.
2. **Màn 7 vốn dồn hai cú nhảy thô cùng lúc** (thêm quân chữ *và* siết khay 8→7): thắng 7%, Δhook sụp còn 7pt. Sửa theo đúng §3 — giữ khay 8 ô và *nới* `maxRank` 9→5 để bù cho cú nhảy định tính. Kết quả: 57%, Δhook 54pt (cao nhất bảng).
3. **Sawtooth có chủ đích**: màn 4 (63%) → màn 5 (73%) → màn 6 (53%) — khó rồi thả rồi khó, đúng §3.

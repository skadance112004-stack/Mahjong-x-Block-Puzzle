# GDD — Mahjong × Block Hybrid Puzzle

\---

## 1\. Tổng quan

**Thể loại:** Puzzle ghép khối (block-drop) hybrid mạt chược (mahjong tile-matching).

**Đối tượng người dùng**: Thị trường nước ngoài đặc biệt là Âu Mỹ Ấn, user hybrid của 2 dòng game mahjong và block, phân khúc độ tuổi vào khoảng trên 35 -45 tuổi.
**Hook cốt lõi:** Thả một khối nhiều-ô (polyomino) xuống bàn cờ vuông N×N; mỗi ô của khối *tự rơi độc lập* xuống tầng thấp nhất còn trống của cột đó (bàn có tối đa 2 tầng) dựa trên cơ chế trọng lực.  Hai quân **cùng mặt, cùng tầng, kề cạnh nhau, và đang lộ mặt (không bị quân khác che ở trên)** sẽ Match và biến mất, kéo theo quân ở mái rơi xuống sàn nếu sàn vừa trống — có thể tạo phản ứng dây chuyền (cascade) nhiều đợt (wave) trong cùng 1 lượt đặt.

**Vì sao khác Mahjong Solitaire / Match-3 thường:** người chơi chủ động chọn NƠI đặt khối (không phải chọn 2 quân có sẵn để ghép), nên việc "che một quân để khoá nó rồi tự tay lộ lại đúng lúc" là một quyết định chiến thuật.
**Nền tảng:** web game mobile tỉ lệ màn hình dọc 9:16

**Phong cách hình ảnh:** Trung Hoa cổ — cổng tre, mái ngói cong, đèn lồng, vân gỗ/tre, quân mạt chược.

\---

## 2\. Core loop - Core Mechanics

### 2.1 Bàn chơi 2 tầng

* Bàn hình vuông, kích thước `size×size` khai báo riêng theo từng level - Scope hiện tại: Min 2x2 - Max 6x6
* Mỗi ô (cell) chứa tối đa 2 quân chồng: tầng 0 (sàn) và tầng 1 (mái). Một khối chỉ có thể thả nếu MỌI ô nó chiếm đều còn ít nhất 1 tầng trống (không "full") và không bị chặn (xem mục 4).
* Mỗi ô-con của khối rơi độc lập: nếu sàn trống → rơi tầng 0; nếu sàn đã có quân → rơi tầng 1 (mái). Điều này cho phép 1 khối phủ nhiều độ cao khác nhau cùng lúc trên các cột khác nhau
* Sau khi quân ở mái bị Match/biến mất, quân sàn cùng cột **không tự trồi lên tầng 1** — tầng vẫn giữ nguyên vị trí z; việc "rơi" chỉ áp dụng cho quân MỚI được thả, không dịch chuyển lại quân cũ.

### 2.2 Khối \& hàng đợi Current/Next

* Người chơi chỉ thấy và điều khiển **1 khối tại một thời điểm** ("Current"), cộng 1 ô xem trước ("Next") — không phải khay 3-6 ô như bản nháp đầu tiên của dự án.
* Thư viện hình khối (polyomino), định nghĩa qua các hàm `P24K\\\_PIECE` — mỗi hàm nhận `key` (định danh nội bộ) + 1 mặt Mahjong cho từng ô, trả về danh sách toạ độ tương đối `\\\[dr,dc,mặt]` (offset từ ô neo `(0,0)` người chơi đang kéo tới, không phải toạ độ tuyệt đối trên bàn). Toạ độ chính xác từng hình (verify trực tiếp từ code, dùng để hiểu vì sao 1 hình "xoay" theo hướng cụ thể chứ không xoay được bằng tay — **game không có thao tác xoay khối**, mỗi hàm dưới đây LÀ 1 hướng cố định riêng biệt):

|Hàm|Số ô|Toạ độ `\\\[dr,dc]` từng ô|Hình dạng|
|-|-|-|-|
|`K\\\_DOMINO\\\_H`|2|`\\\[0,0] \\\[0,1]`|Domino ngang|
|`K\\\_DOMINO\\\_V`|2|`\\\[0,0] \\\[1,0]`|Domino dọc|
|`P24M\\\_L3`|3|`\\\[0,0] \\\[1,0] \\\[1,1]`|Tromino góc L (bản gốc)|
|`P24M\\\_L3B`|3|`\\\[0,1] \\\[1,0] \\\[1,1]`|Tromino góc L (lật ngang so với `L3`)|
|`P24M\\\_L3C`|3|`\\\[0,0] \\\[0,1] \\\[1,0]`|Tromino góc L (lật dọc)|
|`P24M\\\_L3D`|3|`\\\[0,0] \\\[0,1] \\\[1,1]`|Tromino góc L (lật cả 2 trục)|
|`P24M\\\_I3H`|3|`\\\[0,0] \\\[0,1] \\\[0,2]`|Tromino thẳng ngang|
|`P24M\\\_I3V`|3|`\\\[0,0] \\\[1,0] \\\[2,0]`|Tromino thẳng dọc|
|`P24M\\\_O4`|4|`\\\[0,0] \\\[0,1] \\\[1,0] \\\[1,1]`|Tetromino vuông O (2×2)|
|`P24M\\\_T4`|4|`\\\[0,0] \\\[0,1] \\\[0,2] \\\[1,1]`|Tetromino chữ T|
|`P24M\\\_S4`|4|`\\\[0,1] \\\[0,2] \\\[1,0] \\\[1,1]`|Tetromino chữ S|
|`P24M\\\_L4`|4|`\\\[0,0] \\\[1,0] \\\[2,0] \\\[2,1]`|Tetromino chữ L (dài)|
|`P24M\\\_PLUS5`|5|`\\\[0,1] \\\[1,0] \\\[1,1] \\\[1,2] \\\[2,1]`|Pentomino hình cộng (+)|
|`P24M\\\_L5`|5|`\\\[0,0] \\\[1,0] \\\[2,0] \\\[2,1] \\\[2,2]`|Pentomino chữ L dài|

Kích thước khối tối đa 5 ô/khối

* Mỗi khối trong `sequence` của level được theo đúng thứ tự cố định (deterministic) — không random khi chơi bình thường (xem mục 6 về ngoại lệ generative, hiện chưa dùng trong 50 level chính).
* Luật "không tự match sẵn trong khối": mọi khối ≥2 ô kề nhau cùng mặt sẽ tự động Match ngay khi vừa rơi xuống — coi là lỗi thiết kế NẾU xảy ra ngoài ý muốn, nên self-test `no\\\_baked\\\_self\\\_match` bắt buộc mọi khối (trừ khối đầu tiên của Level 1 — cố ý làm domino tự-match để dạy luật ngay từ cú chạm đầu tiên) không được tự chứa 2 ô kề cùng mặt. Cụ thể, guard kiểm tra MỌI cặp ô trong khối có khoảng cách Manhattan = 1 (kề trực giao) — nếu cặp đó cùng mặt, khối bị coi là "baked self-match" và bị self-test chặn ngay từ lúc soạn màn, không đợi tới lúc chơi thật mới lộ ra.

### 2.3 Luật Match \& thuật toán Cascade

* Match xảy ra khi 2 quân **cùng id mặt, cùng tầng (z), kề cạnh trực tiếp (không chéo), và đang lộ mặt** (đang ở tầng 1, hoặc ở tầng 0 mà tầng 1 cùng ô đang trống).
* Một nhóm liên thông ≥2 quân cùng mặt cùng tầng sẽ Match cùng lúc trong 1 "wave" (không chỉ ghép cặp 2-2) — thuật toán tìm nhóm chạy flood-fill trên đồ thị kề-cạnh cùng mặt/cùng tầng (`p24kFindWavePairs`), không giới hạn cỡ nhóm (cụm 5+ quân liên thông vẫn clear trọn 1 lần nếu tồn tại, dù nội dung 50 level hiện tại chưa cố tình tạo cụm >4).
* Sau khi 1 wave clear, quân mái phía trên rơi xuống sàn nếu sàn cùng cột vừa trống → có thể tạo Match mới ngay lập tức → wave tiếp theo tự động resolve (cascade). Vòng lặp cascade sau mỗi lượt đặt (rút gọn từ code thật):
đặt xong mọi ô-con của khối (chưa animate)
lặp:
tìm mọi nhóm liên thông thoả điều kiện match → nếu rỗng, DỪNG (cascade kết thúc)
waves++; clear toàn bộ nhóm tìm được CÙNG LÚC (1 wave)
quân mái phía trên mỗi ô vừa trống ở sàn rơi xuống sàn

Số wave liên tiếp trong 1 lượt đặt được lưu vào `S.chainBest` (chuỗi dài nhất từng đạt, không reset giữa lượt), dùng để cộng điểm (xem công thức Điểm bên dưới) và cho quest `chain2` (yêu cầu ≥2 wave trong 1 lượt).

Quân ở tầng 0 bị quân khác che ở tầng 1 **không được tính là "đang lộ"**, dù cùng mặt kề nhau vẫn KHÔNG match

**Công thức Điểm chính xác**:

```
Điểm 1 lượt đặt =
    (số ô của khối) × 5                                    
  + Σ mỗi wave w trong cascade của lượt này:
      round( ( Σ mỗi nhóm g clear trong wave w: 160 + (kích\\\_thước(g) − 2) × 120 )
             × ( 1 + 0.25 × min(w − 1, 4) ) )               // hệ số chuỗi theo ĐỘ SÂU wave, trần ở wave thứ 5 (×2)
  + min(streak\\\_liên\\\_tiếp\\\_hiện\\\_tại, 10) × 15                  // CHỈ cộng nếu lượt này có ít nhất 1 match; streak reset về 0 nếu đặt hụt
```

Ví dụ cụ thể: 1 nhóm 3 quân clear ở wave 1 = `160+(3−2)×120=280` điểm × hệ số `1+0.25×0=1` → 280 điểm cho wave đó; nếu cùng lượt có thêm wave 2 clear 1 nhóm 2 quân = `160` điểm × hệ số `1.25` → 200 điểm. Đây là 2 con số RIÊNG BIỆT cộng dồn, không phải "điểm wave sau ghi đè wave trước".

### 2.4 Giới hạn lượt đi \& điều kiện thua

* `moveLimit` (số nguyên, khai báo theo từng level) là số lượt đặt khối tối đa; nếu level không khai báo, coi như vô hạn (`Infinity`).
* **Thua khi:**

  1. Hết lượt (`S.movesLeft<=0`) mà goal chưa đạt → "HẾT LƯỢT ĐI" (`lose\\\_moves\\\_title`).
  2. Không còn ô nào hợp lệ để đặt khối hiện tại trong giới hạn 2 tầng, dù còn lượt → "HẾT CHỖ ĐẶT" (`lose\\\_nospace\\\_title`) — đây là điều kiện "bí nước" thật, khác điều kiện hết lượt.

### 2.5 Booster (Đổi khối / Hint)

* **Đổi khối (Reroll):** bỏ qua khối hiện tại, lấy khối kế tiếp trong `sequence` lên thay - không tiêu tốn Move Limit
* **Hint** có **2 đường xử lý riêng biệt**, ưu tiên đường rẻ trước:

  1. **Đường nhanh — "còn bám đúng solution"** (`p24kSolutionOnTrack`): nếu TOÀN BỘ lịch sử nước đi của người chơi từ đầu màn (`S.moveHistory`) khớp CHÍNH XÁC với `level.solution`  tính tới thời điểm hiện tại, Hint trả về NGAY nước tiếp theo trong `solution` — không chạy DFS gì cả, tức thì và luôn đúng (vì `solution` đã tự-verify qua self-test). Đây là đường đi của đa số lượt Hint thực tế, vì hầu hết người chơi ít khi lệch hẳn khỏi 1 đường giải hợp lý.
  2. **Đường chậm — DFS trực tiếp trên bàn sống** (`p24kTrySolveLive`), chỉ chạy khi người chơi ĐÃ lệch khỏi `solution` gốc (`S.hintDeviated=true`, tự bật cờ này ngay khi 1 nước đi không khớp `solution\\\[i]`) — duyệt đệ quy tối đa **24 bước** hoặc **20.000 node** hoặc **3000ms** (chạm ngưỡng nào trước thì dừng), có memo hoá trạng thái đã thăm để không duyệt lại, và **nhường luồng chính mỗi 300 node** (`await sleep(0)`) để không đứng hình UI khi tìm kiếm chạy lâu. Nếu hết ngân sách mà chưa tìm thấy đường thắng trọn vẹn, trả về nước đi thuộc **nhánh tiến xa nhất từng thấy** (best-partial fallback) thay vì báo "không tìm được" ngay — ưu tiên gợi ý hữu ích hơn là im lặng thất bại.
  * Dùng 1 lượt Hint sẽ highlight đúng ô nên đặt trong **4 giây** rồi tự tắt (không tốn thêm lượt Move Limit nào, chỉ trừ 1 lượt Hint trong kho dùng chung).
* **Kho dùng chung toàn game**: người chơi mới có sẵn 5 lượt Đổi khối + 5 lượt Hint, lưu ở `localStorage` (`mxb\\\_booster\\\_reroll`, `mxb\\\_booster\\\_hint`), nạp thêm qua Cửa hàng (xem mục 7).
* **Ngoại lệ Level 1:** cố ý khoá cả 2 booster về 0 bất kể kho chung còn bao nhiêu, để dạy luật cơ bản trước khi phát công cụ hỗ trợ.

\---

## 3\. Mục tiêu màn chơi (Goal Types)

Mỗi level khai báo đúng 1 trong 3 `goalType`. Thống kê thực tế trên 50 level:

|goalType|Số level|Điều kiện thắng|
|-|-|-|
|`TILE\\\_QUOTA`|12|Tổng số quân đã phá (mọi mặt cộng dồn) ≥ `tileGoal`. Không yêu cầu mặt cụ thể.|
|`TARGET\\\_FACE`|36|Mỗi mặt trong `winTargets` (vd `{id:'s1',need:4}`) phải đạt đủ số lượng RIÊNG của nó. Nếu level có `targetRequiredCount`, chỉ cần đạt đủ N/M mục tiêu (không cần tất cả — vd "3 trong 4 mặt"). Gồm cả 7 màn từng gắn nhãn `BURIED\\\_TARGET` riêng (mục tiêu bị chôn dưới Phong Ấn/mái) trước 13/09/2026 — xem ghi chú dưới.|
|`OPEN\\\_SEAL`|2|Mở đủ Phong Ấn (xem mục 4) — không cần phá thêm gì sau khi mở.|

**Cách `targetRequiredCount` hoạt động cụ thể** — ví dụ Lv7 "Pick The Target Face" có `winTargets=\\\[{s1,4},{c2,3},{w3,2},{c8,2}]` (4 mục tiêu). Nếu level đặt `targetRequiredCount=3`, engine (`p24mTargetsMet`) chỉ cần ĐẠT ĐỦ 3 trong 4 mục tiêu đó (bất kỳ 3 cái nào, không cố định phải là 3 cái đầu) — mục tiêu thứ 4 vẫn hiện trên goal-strip nhưng không bắt buộc đạt để thắng. Đây là cơ chế "N trên M", tạo cảm giác linh hoạt (người chơi có thể bỏ qua 1 mặt khó xoay xở hơn) mà không cần giảm số mục tiêu hiển thị. Hiện tại field này CHƯA được dùng ở màn nào trong 50 màn chính thức (tất cả đều yêu cầu đủ 100% `winTargets`) — sẵn sàng dùng cho đợt cân bằng sau nếu muốn thêm biến thể độ khó này.

\---

## 4\. Cơ chế chặn ô (Blockers)

Hàm `p24kCellBlocked()` kiểm tra theo đúng thứ tự ưu tiên sau (ô có thể bị chặn bởi nhiều lý do cùng lúc):

1. **Ô Chắn / Permanent (`level.permanents`)** — chặn vĩnh viễn, không bao giờ mở, không phụ thuộc điều kiện gì. Dạy khái niệm "định tuyến quanh vật cản" (routing). xuất hiện đầu tiên ở Lv11.
2. **Phong Ấn / Seal (`level.seals`, mỗi entry `\\\[r,c,required]`)** — **\[Luật hiện tại, đã chốt lại sau 2 lần đổi]** mỗi ô Seal có ngưỡng `required` **riêng của chính nó** (không dùng chung 1 số cho cả màn), mở khi tổng số **CẶP bất kỳ đã Match ở bất kỳ đâu trên bàn** (`S.pairs`, cộng dồn toàn màn, không cần khác mặt nhau, không cần match xảy ra kề sát ô Seal) đạt đủ ngưỡng đó. Bộ đếm dùng chung `S.pairs` — không có state "kề sát" riêng. Vẫn mở đúng 1 lần, chỉ sau khi 1 cascade đã settle hoàn toàn. Dùng trong **24/50 màn**, xuất hiện đầu tiên ở Lv21.
3. **Khóa / Lock (`level.locks`, mỗi entry `{cells, face, required}`)** — giống Phong Ấn nhưng **theo từng NHÓM Ô riêng biệt**, gắn với ĐÚNG 1 mặt cụ thể + số lượng cần (đếm số TILE của đúng mặt đó qua `targetCounts`, khác Seal đếm CẶP bất kỳ mặt), hiển thị rõ ràng trên ô (không mờ như Seal). Dùng trong **19/50 màn**, xuất hiện đầu tiên ở Lv31.

Bảng phân biệt nhanh 3 loại chặn:

|Cơ chế|Điều kiện mở|Phạm vi|Mở lại được?|
|-|-|-|-|
|Ô Chắn|Không bao giờ mở|Ô đơn|Không|
|Phong Ấn|Đủ N cặp bất kỳ (không cần khác mặt, không cần kề sát), N riêng từng ô|Từng ô Seal riêng, ngưỡng chung 1 bộ đếm `pairs`|1 lần, vĩnh viễn sau đó|
|Khóa|N quân của 1 mặt cụ thể (không cần kề sát)|Từng nhóm ô riêng|1 lần/nhóm, vĩnh viễn sau đó|

**Toàn bộ hàm `p24kCellBlocked(level,r,c,targetCounts,pairs)` (rút gọn từ code thật)** — thứ tự kiểm tra CỐ ĐỊNH, dừng ở điều kiện đầu tiên đúng (1 ô có thể bị chặn bởi nhiều lý do, nhưng chỉ cần đủ 1 lý do để chặn):

```
1. r,c nằm trong level.permanents?           → chặn vĩnh viễn, dừng ở đây
2. r,c là 1 ô Seal VÀ seal đó CHƯA đủ pairs?  → chặn, dừng ở đây
3. r,c nằm trong 1 nhóm Lock CHƯA đủ điều kiện? → chặn, dừng ở đây
4. không thoả điều kiện nào ở trên            → KHÔNG chặn
```

Seal "đủ pairs" (`p24kSealMet`) chỉ đơn giản là `pairs >= required` của CHÍNH seal đó — không có state lưu riêng "seal đã mở hay chưa", trạng thái mở/đóng luôn được TÍNH LẠI SỐNG từ `S.pairs` mỗi lần kiểm tra (nên không thể "lệch pha" giữa hiển thị và luật thật). `S.sealsOpened`/`S.locksOpened` (2 tập hợp riêng) CHỈ dùng để chặn hiệu ứng mở khoá/âm thanh phát lại nhiều lần, không phải nguồn sự thật cho việc chặn đặt quân.

**Lock 2 giai đoạn cụ thể hoạt động ra sao** (`p24kLockMet`): 1 Lock coi là mở khi CẢ 2 điều kiện đều đạt — `targetCounts\\\[lock.face] >= lock.required` (điều kiện của chính nó) VÀ (nếu có khai báo `lock.after`) `targetCounts\\\[lock.after.face] >= lock.after.required` (điều kiện tiền đề). Ví dụ cụ thể (giả định, hiện chưa dùng ở màn nào): 1 Lock yêu cầu `face:'w1', required:3, after:{face:'s1', required:2}` chỉ mở khi người chơi đã ghép ĐỦ 2 quân `s1` TRƯỚC (không quan trọng lúc nào), rồi tiếp tục ghép đủ 3 quân `w1` — khác Seal (chỉ đếm tổng `pairs`, không phân biệt THỨ TỰ mặt nào ghép trước) ở đúng 1 điểm: Lock 2 giai đoạn thêm được 1 trục "phải làm A trước rồi mới làm B" mà Seal không biểu diễn được.

## 5\. Nội dung 50 level

* **Cấu trúc:** 5 chương × 10 level = 50 level (`chapters()` tính động theo `P24M\\\_LEVELS.length`, không hard-code "30 level" nữa). UI hiện tại KHÔNG còn chia tab/vuốt ngang theo chương — toàn bộ 50 level nằm trong 1 danh sách cuộn dọc duy nhất, tự cuộn tới đúng level đang mở khi vào màn.
* **Đường cong dạy (lesson):** mỗi level có field `lesson` (mô tả bài học bằng tiếng Anh, dùng nội bộ/debug) và tuỳ chọn `teach` (mô tả ngắn cho người chơi). Không có mô tả cơ chế bằng lời trong overlay bắt đầu/thắng/thua nữa — việc DẠY hoàn toàn dựa vào bàn tay hướng dẫn (`guideMoves`, chỉ Level 1) và tự chơi mà hiểu.
* **Chỉ Level 1** có `guideMoves>0` (bàn tay 👆 hướng dẫn chạm đúng ô) — mọi level khác đặt `guideMoves:0` (đã cố ý gỡ bỏ auto-guide highlight khỏi mọi level trừ Lv1).

### 5.1 Cấu trúc chương \& phân bố cơ chế

50 màn chia **5 chương × 10 màn**, ranh giới chương chỉ mang tính hiển thị ở màn chọn cấp (không
gate nội dung). Thứ tự dạy cơ chế theo đúng dữ liệu sống hiện tại — **mỗi cơ chế mới vẫn xuất
hiện lần đầu ở đúng đầu chương của nó, không sớm hơn**:

|Chương|Tên|Màn|Vai trò|
|-|-|-|-|
|C1|Nền tảng|1–10|Core loop: đặt, Match, che–lộ 2 tầng. Không có Ô Chắn/Seal/Lock nào.|
|C2|Ô Chắn|11–20|Ô Chắn (Permanent) xuất hiện lần đầu ở Lv11, dùng xuyên suốt 10/10 màn.|
|C3|Phong Ấn|21–30|Seal xuất hiện lần đầu ở Lv21. Lv21/22 là 2 màn `OPEN\\\_SEAL` duy nhất còn lại trong toàn game.|
|C4|Kết hợp|31–40|Lock xuất hiện lần đầu ở Lv31. Từ đây cả 3 cơ chế bắt đầu xuất hiện chung trong cùng 1 màn.|
|C5|Mastery|41–50|Board lớn nhất game (đa số 6×6), mật độ Ô Chắn/Seal/Lock dày nhất, màn chốt hạ.|

Đây chính là lộ trình dạy cơ chế nói ở mục 3 phía trên: **Ch1** (nền tảng, không cơ chế chặn nào)
→ **Ch2** giới thiệu Ô Chắn (đơn giản hơn — "ô này không bao giờ mở", không điều kiện) → **Ch3**
giới thiệu Phong Ấn (phức tạp hơn — ngưỡng N cặp riêng từng ô, đếm dồn TOÀN BÀN chứ không chỉ kề
sát ô Seal, xem mục 4) sau khi người chơi đã quen "vật cản" → **Ch4** giới thiệu Lock, kết hợp
ngay với 2 cơ chế kia (không có màn nào chỉ giới thiệu Lock một mình) → **Ch5** tổng hợp, mật độ
cao nhất. Mốc chương chỉ là "cứ 10 level một nhóm" để hiển thị số ("màn X/50") — không còn quyết
định nội dung dạy, nội dung dạy trải không đều giữa các chương.

**Phân bố loại mục tiêu (Goal Type)** — tính lại trực tiếp từ `window.\\\_\\\_digest24k1.LEVELS`
ngày 13/09/2026:

|Goal Type|Số màn|Danh sách màn|Ý nghĩa|
|-|-|-|-|
|`TILE\\\_QUOTA`|12|1,2,3,4,5,17,31,34,37,43,44,48|Ghép đủ N quân bất kỳ mặt nào|
|`TARGET\\\_FACE`|36|6,7,8,9,10,11,12,13,14,15,16,18,19,20,23,24,25,26,27,28,29,30,32,33,35,36,38,39,40,41,42,45,46,47,49,50|Ghép đủ N của (các) mặt cụ thể|
|`OPEN\\\_SEAL`|2|21,22|Thắng khi tất cả Seal của màn đã mở (đếm tổng số cặp khắp bàn)|

**Phân bố cơ chế chặn/khoá** (một màn có thể dùng nhiều hơn 1 loại cùng lúc):

|Cơ chế|Số màn dùng|Màn sớm nhất|Số màn kết hợp CẢ 3 cơ chế cùng lúc|
|-|-|-|-|
|Ô Chắn (Permanent)|31|Lv11||
|Seal (Niêm phong)|24|Lv21|13 màn: 33, 38, 39, 40, 41, 42, 44, 45, 46, 47, 48, 49, 50|
|Lock (Khoá)|19|Lv31|(bảng bên trái)|

* **Độ khó biến thiên:** `moveLimit` dao động thực tế **8–20** trong số các màn có giới hạn nước
(Lv32, Lv34 thấp nhất với 8; Lv42 cao nhất với 20 — Lv1 không có `moveLimit` nên không tính vào
khoảng này, xem bảng đầy đủ ở §5.2); kích thước bàn 3×3 đến 6×6 — **toàn bộ Lv46-50 đều là board 6×6** (đợt
nâng cấp gần nhất, mật độ Ô Chắn/Seal/Lock và move limit cũng tăng theo cho cả 5 màn này so với
phần còn lại của game).

### 5.2 Bảng dữ liệu đầy đủ 50 màn

Trích trực tiếp từ `window.\\\_\\\_digest24k1.LEVELS` (13/09/2026), không suy diễn — bảng dưới là TOÀN
BỘ 50 dòng, đọc trực tiếp qua `runSolution()`/`LEVELS\\\[i]` cùng lúc với lần xác nhận self-test gần
nhất (`selfTest().ok===true` áp dụng cho toàn bộ 50 dòng này). Cột "Goal" ghi mặt quân theo id ĐÃ
QUA REMAP hiển thị runtime (`s1,c2,w3,s4,c5,w6,c8,s7` — xem quy tắc RAW-vs-rendered ở §5.8 mục
1), không phải raw id trong source. "Ô Chắn"/"Seal"/"Lock" là SỐ Ô/NHÓM Ô dùng cơ chế đó (không
phải số mặt); ô trống nghĩa là 0. "Pool" = `Có` nếu màn có `queuePool` (rút ngẫu nhiên lúc chơi
thật, xem mục 6 "Bộ máy sinh khối ngẫu nhiên" bên dưới).

|Lv|Tên|Bàn|Goal|Chi tiết goal|MoveLimit|Lời giải|Dư|Ô Chắn|Seal|Lock|Khối lớn nhất|Số khối HĐ|Pool|
|-|-|-|-|-|-|-|-|-|-|-|-|-|-|
|1|A Single Spot|3×3|Quota|quota=10|—|4|—||||2|2||
|2|Current and Next|3×3|Quota|quota=6|15|4|11||||2|3||
|3|Every Cell Falls On Its Own|4×4|Quota|quota=6|15|6|9||||2|6||
|4|Same Face, Different Floor|4×4|Quota|quota=8|15|7|8||||2|5||
|5|Roof Opens the Floor|4×4|Quota|quota=10|15|4|11||||3|4||
|6|The Fourth Face|4×4|Target|w3:2,s1:2,s4:2,c2:2|15|6|9||||2|6||
|7|Pick The Target Face|6×6|Target|s1:4,c2:3,w3:2,c8:2|15|7|8||||2|7||
|8|One Triomino, Two Heights|5×5|Target|s1:2,w3:2,s4:2,c2:2|15|4|11||||3|4||
|9|Two Match Stations|5×5|Target|c2:2,w3:2,s1:2|15|4|11||||2|6||
|10|Core Review|5×5|Target|w3:2,s1:4|15|8|7||||3|8||
|11|First Blocker|5×5|Target|s1:2,c2:2,w3:2|12|9|3|3|||3|9||
|12|Two-Cell Notch|4×4|Target|s1:3,w3:3,s4:3|12|6|6|2|||2|6||
|13|Topology Fit|5×5|Target|w3:2,c2:2,s1:3|15|8|7|3|||3|8||
|14|Detour Wall|6×6|Target|s1:3,c2:3,w3:2|16|9|7|6|||3|9||
|15|Fork Around|6×6|Target|s1:3,c2:3,w3:3|15|8|7|5|||3|8||
|16|Double Block|6×6|Target|s1:3,c2:3,w3:3|12|9|3|6|||3|9||
|17|Open Route|6×6|Quota|quota=8|14|9|5|6|||3|9||
|18|Sixth Face|6×6|Target|s1:3,c2:3,w3:3|14|8|6|6|||3|9||
|19|Three Faces, Two Stations|6×6|Target|s1:4,c2:5,w3:4|17|10|7|8|||3|10||
|20|Chapter Final Exam|6×6|Target|s1:2,w6:1,c2:4|16|9|7|9|||3|9||
|21|Break The First Seal|4×4|Seal|seal x1|12|3|9||1||2|5||
|22|Two Different Faces|5×5|Seal|seal x4|11|10|1||4||3|11||
|23|Use The Freed Cell|5×5|Target|s1:4,c2:4,w3:3|10|7|3||8||2|7||
|24|One Meter, Many Cells|6×6|Target|s1:4,c2:4,w3:4|11|6|5||4||5|6||
|25|A Breather|6×6|Target|s1:4,c2:4,w3:4,s4:4|12|8|4||5||5|8||
|26|The Fifth Face|6×6|Target|s1:4,c2:4,w3:6,s4:4|12|9|3||6||5|9||
|27|Two Routes to Progress|6×6|Target|s1:4,c2:4,w3:4,s4:2|12|7|5||6||5|7||
|28|Three Faces Unlocked|6×6|Target|s1:4,c2:4,w3:4|13|6|7|4|7||5|6||
|29|Buried Under Seal|6×6|Target|s1:4,c2:4,w3:6|13|8|5|4|4||3|8||
|30|Twin Stations|6×6|Target|s1:4,c2:4,w3:6,s4:4|13|9|4|6|6||3|9||
|31|Seal and Stone|4×4|Quota|quota=8|9|6|3|||2|4|5||
|32|Two Under One|5×5|Target|s1:6,c8:2|8|7|1|5||1|2|7||
|33|Either Way Works|5×5|Target|s1:6,c2:2,c8:2|12|10|2|4|1|1|2|7||
|34|Three Keys|5×5|Quota|quota=10|8|6|2|||3|4|7||
|35|Permanent Detour|6×6|Target|s1:2,c2:2,w3:2|12|7|5|8||3|3|8|Có|
|36|Roof Chain|6×6|Target|c8:2,w3:4,s1:2|13|6|7|9||3|3|9||
|37|Three Distinct|6×6|Quota|quota=16|13|11|2|8||4|3|8|Có|
|38|Buried Behind Seal|5×5|Target|s1:2,s4:2,c8:4|13|10|3|2|1|1|3|8|Có|
|39|Stretch|5×5|Target|c2:3,w3:3,s1:2|15|14|1|4|1|2|3|10|Có|
|40|Chapter 4 Review|5×5|Target|s1:2,c2:2,w3:2|15|4|11|5|1|1|4|9||
|41|Mastery Begins|6×6|Target|s1:4,c2:2,s4:2|15|9|6|10|3|2|4|11||
|42|Squeezed|6×6|Target|s1:5,w3:3,s4:3|20|10|10|7|3|1|4|12|Có|
|43|Triple Seal|5×5|Quota|quota=16|16|12|4|12|4||4|14||
|44|The Long Wall|6×6|Quota|quota=10|16|10|6|6|4|4|4|14|Có|
|45|Buried Twice|6×6|Target|s1:2,c2:2,s4:2|14|10|4|6|1|1|4|12|Có|
|46|Two Shots|6×6|Target|c2:2,c8:4,s1:4|14|8|6|10|2|1|3|6||
|47|Three Of Six|6×6|Target|s1:2,c2:2,w3:2|12|9|3|10|2|2|3|9|Có|
|48|Two Seals|6×6|Quota|quota=16|12|11|1|13|1|5|4|9||
|49|Penultimate|6×6|Target|s1:4,w3:4,s4:2|14|11|3|10|2|1|4|12|Có|
|50|Grand Finale|6×6|Target|s1:6,c2:6|15|12|3|7|5|2|4|12||

`—` ở cột MoveLimit/Dư (chỉ Lv1) nghĩa là màn không có `moveLimit` trong source (tutorial gốc,
không giới hạn nước) — khác với ô trống ở các cột Ô Chắn/Seal/Lock (nghĩa là 0).

### 5.3 Nguyên tắc đường cong độ khó

* **Trục thô (qualitative)**: cơ chế mới luôn giới thiệu ở **màn dễ, đơn lẻ** trước khi bị trộn
với cơ chế khác — Ô Chắn ở Lv11 (đơn lẻ), Seal ở Lv21 (đơn lẻ, 2 màn `OPEN\\\_SEAL` liên tiếp),
Lock ở Lv31 (ngay lập tức kết hợp với 2 cơ chế kia — Ch4 mang tên "Kết hợp" đúng nghĩa: không
có màn nào chỉ giới thiệu Lock một mình).
* **Trục tinh (quantitative)**: số nước, số mặt quân, `need` của từng mục tiêu, cỡ bàn, số khối
lớn nhất trong hàng đợi. Dùng để tinh chỉnh độ khó *sau khi* cơ chế đã quen.
* **Không tăng đều một mạch (sawtooth)**: mỗi chương nên có nhịp "khó dần rồi thả một màn dễ"
(breather level) thay vì tăng tuyến tính. Đọc trực tiếp cột "Lời giải" ở bảng §5.2, vị trí
breather hiện tại (số nước lời giải thấp cục bộ so với 2 màn liền kề) của từng chương: **C1 —
Lv5, Lv8 và Lv9** (4 nước, thấp hơn hẳn Lv4/Lv7/Lv10 xung quanh — Lv8/Lv9 liền nhau cùng tạo 1
đoạn nghỉ 2 màn trước khi Lv10 tăng vọt lên 8 nước); **C2 — Lv12** (6 nước, ngay sau đỉnh Lv11
9 nước); **C3 — Lv24 và Lv28** (6 nước mỗi màn); **C4 — Lv40** (4 nước — thấp nhất cả chương,
đúng vai trò "Chapter 4 Review" nhẹ nhàng trước khi sang C5); **C5 — Lv46** (8 nước, thấp nhất
nội bộ chương dù vẫn cao hơn hẳn C1-C3 vì mặt bằng chung của C5 đã cao).
* **Sàn độ khó nên tăng dần theo chương** — quy tắc **định hướng**, không phải quy tắc cứng: vì
không dùng 1 con số "độ khó tổng hợp" duy nhất đại diện cho mỗi màn (xem §5.4), việc so sánh
chương-với-chương dựa trên NHIỀU chỉ số thô song song (cỡ bàn, số nước, số cơ chế kết hợp) thay
vì 1 điểm tổng.

### 5.4 Số liệu độ khó thô theo chương

Không dùng công thức điểm-khó-tổng-hợp (7 thành phần cộng trọng số) như bản thiết kế cũ — theo
yêu cầu người dùng, mọi số liệu độ khó chỉ ở dạng THÔ, không quy về 1 điểm duy nhất. Số liệu
TRUNG BÌNH thô theo chương (tính trực tiếp từ `window.\\\_\\\_digest24k1.LEVELS`, không suy diễn):

|Chương|Cỡ bàn TB|Số nước lời giải TB|Move Limit TB|
|-|-|-|-|
|C1 Nền tảng|4.3|5.4|15.0\*|
|C2 Ô Chắn|5.6|8.5|14.3|
|C3 Phong Ấn|5.6|7.3|11.9|
|C4 Kết hợp|5.2|8.1|11.8|
|C5 Mastery|5.9|10.2|14.8|

`\\\*` C1 tính trên 9/10 màn — Lv1 không có `moveLimit` (không giới hạn nước) nên bị loại khỏi trung
bình này, không tính là 0.

**Đọc bảng này thế nào**: cỡ bàn và số nước lời giải tăng dần khá rõ từ C1→C5 (đúng hướng thiết
kế). Move Limit TB không đơn điệu và không còn tăng dần theo chương: C1 cao nhất (15.0, nhưng chỉ
tính trên 9 màn có giới hạn nước — Lv2-10 đều được đặt phẳng ở mức 15), C2 và C5 xấp xỉ nhau
(14.3 / 14.8), còn C3/C4 thấp hơn hẳn (11.9 / 11.8) — **không phải dấu hiệu C1 "khó nhất"**, vì
số nước lời giải TB của C1 (5.4) vẫn thấp nhất trong 5 chương; move limit rộng rãi ở C1 phản ánh
chủ đích thiết kế "dạy nhẹ nhàng" (nhiều lượt dư) hơn là độ khó thật. Không có 1 điểm số tổng hợp
để xếp hạng "màn nào khó nhất" một cách khách quan tuyệt đối — muốn so sánh 2 màn cụ thể, đọc trực
tiếp bảng §5.2 (cỡ bàn, số nước, lượt dư, số cơ chế, khối lớn nhất) thay vì 1 con số.

**Phân bố cỡ bàn toàn game**: 3×3×2, 4×4×7, 5×5×14, 6×6×27 (không còn màn nào 2×2 — Lv1 đã lên
3×3). Hơn một nửa số màn (27/50) đã là 6×6 — bao gồm toàn bộ C5 gần như 100% và phần lớn C4 (các
đợt "tăng mật độ" và "kết hợp 3 cơ chế" gần đây đều mở rộng board để có chỗ thêm nội dung thay vì
nén vào board cũ).

**Phân bố khối lớn nhất trong hàng đợi**: domino (2 ô, khối lớn nhất trong màn) — 12 màn;
tromino (3 ô) — 22 màn; tetromino (4 ô) — 11 màn; pentomino (5 ô) — 5 màn. Đa dạng hình khối đã
được chủ động thêm vào nhiều màn Chương 5 (46-50) theo yêu cầu người dùng ("không cần quá nhiều
4-5 ô, vẫn giữ đa số 2-3 ô, nhưng phải có 4-5 ô") — không phải mọi màn Lv40-50 đều đổi thành
tetromino/pentomino, chỉ tăng tỉ trọng so với trước.

### 5.5 Giới hạn số loại mahjong tối đa mỗi màn

Số **loại mặt quân được liệt kê làm mục tiêu** (`winTargets.length`, áp dụng cho `TARGET\\\_FACE`) không được vượt:

* **Tối đa 4 loại** nếu màn KHÔNG kết hợp Seal/Permanent/Lock nào khác.
* **Tối đa 3 loại** nếu màn CÓ kết hợp ít nhất 1 trong 3 cơ chế trên.

**Lý do**: thanh mục tiêu (goal-strip) hiển thị 1 chip riêng cho mỗi mặt quân + 1 chip cho
Seal/Lock nếu có. Quá 4-5 chip trên màn hình điện thoại hẹp làm chữ số bị bé, khó phân biệt loại
mặt — người chơi thật (playtest theo 2 persona: nam trung niên và nữ trung niên) đều phản hồi
"quá nhiều loại phải nhớ cùng lúc" là điểm trừ rõ rệt.

**Không phải target thì vẫn được giữ lại làm nội dung "trang trí"**: khi một mặt bị loại khỏi
`winTargets` do vượt giới hạn, KHÔNG xoá tile/sequence/move đã tạo ra nó — chỉ xoá khỏi mảng
`winTargets`. Quân đó vẫn được đặt và ghép bình thường trên bàn, chỉ là không được đếm vào điều
kiện thắng.

### 5.6 Số nước dư tối thiểu (spare moves)

`Lượt dư = Move Limit − Nước lời giải`. Quy tắc chuẩn: **mọi màn nên có ít nhất 2 nước dư**.

**Tình trạng thực tế (13/09/2026, sau lần sync moveLimit mới nhất từ beatchart)** — đọc trực tiếp
từ bảng §5.2:

* **Lv1**: không đụng vào — màn tutorial gốc, không có `moveLimit`, quy tắc không áp dụng.
* **Không còn màn nào ở mức `0 lượt dư`** — Lv4 (trước đây là màn duy nhất 0-lượt-dư) nay có 8
lượt dư sau lần sync này.
* **Lv22, 32, 39, 48**: `1 lượt dư` — 4 màn duy nhất còn dưới mức khuyến nghị "≥2", nằm rải rác ở
3 chương khác nhau (Lv22 thuộc C3, Lv32/39 thuộc C4, Lv48 thuộc C5), không phải chỉ ở Lv1-39. Không
có ghi chú thiết kế nào xác nhận đây là "có chủ đích" — nên coi là ứng viên rà lại nếu muốn áp dụng
nghiêm quy tắc "≥2" trong 1 đợt cân bằng sau này.

> \\\*\\\*Khuyến nghị cho game designer\\\*\\\*: danh sách "dưới 2 lượt dư" hiện còn 4/50 màn (22, 32, 39, 48),
> giảm đáng kể so với trước (từng có 1 màn 0-lượt-dư và 11 màn 1-lượt-dư). Các màn còn lại đều đã
> đạt tối thiểu 2 lượt dư. 4 màn còn lại trải đều C3-C5 chứ không gom riêng vào 1 chương — nên rà
> lại có chủ đích cho từng màn này trong đợt cân bằng tiếp theo, thay vì giả định tất cả đều "được
> thiết kế đúng như vậy".

### 5.7 Mật độ trực quan — tránh "rối mắt"

Quy tắc khi thêm Permanent để tăng độ khó, **hình dạng cụm ô bị chặn quan trọng hơn số lượng tuyệt đối**:

* **Ưu tiên**: 1 cụm hình học rõ ràng (một hàng, một cột, một khối vuông) hơn là các ô rải rác
từng cái một khắp bàn.
* **Khi cần thêm mà không muốn thêm ô bị chặn mới**: nâng cấp 1 ô Permanent đã có trong cụm
thành **Lock** thay vì thêm Permanent mới cạnh đó — cùng chiếm 1 ô nhưng Lock là cơ chế "sống"
(có ngưỡng mở) thay vì vĩnh viễn chết.
* Board càng nhỏ (4×4) càng nhạy cảm với quy tắc này — mỗi ô bị chặn thêm là +6.25% diện tích
bàn nhìn thấy được.

### 5.8 Quy trình an toàn khi sửa/thêm màn

Đúc kết từ rất nhiều lỗi thật gặp phải khi chỉnh màn qua nhiều đợt. Đọc kỹ trước khi sửa bất kỳ
`winTargets`/`tiles`/`sequence`/`solution` nào:

1. **RAW id vs rendered id**: code luôn dùng raw id (`s1,s2,c1,c2,w1,w2,h1,h2`) trong
`tiles`/`sequence`/`winTargets`/`locks\\\[].face`/`locks\\\[].after.face` khi viết trong file
nguồn. Đọc `LEVELS\\\[i]` qua `window.\\\_\\\_digest24k1` lúc runtime trả về **rendered id đã map**
(`s1→s1, c1→c2, w1→w3, s2→s4, c2→c5, w2→w6, h1→c8, h2→s7`). Luôn quy đổi ngược trước khi
viết vào source.
2. **"Real playtime" ≠ độ dài `solution`**: `levelWon()` được check ngay sau MỌI nước đi, màn
kết thúc NGAY khi đạt mục tiêu — không đợi hết `solution`. Nhiều màn có nước "chết" phía sau
điểm thắng thật (safety-net pattern, mục 3 dưới) — chấp nhận được, không phải bug.
3. **Lỗi "cascade-absorption"**: nếu thêm seed/piece mới dùng CHUNG 1 mặt đã tồn tại ở nơi khác
trong màn, quân mới có thể bị "hút" vào một cascade match đã có sẵn ở nước đi TRƯỚC nước dự
kiến. Ưu tiên một mặt CHƯA từng dùng trong màn đó cho seed/piece mới.
4. **Board đã đầy kín (0 ô trống)**: kiểm tra bằng cách replay `solution` qua
`debug.freshModel`/`debug.modelDrop` và ghi lại mọi ô từng bị chạm (kể cả tạm thời) — chỉ ô
KHÔNG nằm trong danh sách đó mới thật sự an toàn để đặt seed mới. Nếu không còn ô nào, mở
rộng board (VD 4×4→5×5) — tọa độ cũ vẫn hợp lệ nguyên vẹn, chỉ thêm hàng/cột mới.
5. **Sequence dạng "cyclic"**: nếu `sequence.length < solution.length`, engine lặp lại quân qua
modulo `(queueIndex+offset) % sequence.length`. Phải "unroll" thành danh sách tường minh
trước khi thêm quân mới vào cuối, nếu không sẽ tráo quân của TẤT CẢ các nước cũ.
6. **Luật Seal hiện hành**: Seal đếm **TỔNG SỐ CẶP đã ghép khắp bàn** (`S.pairs`/`model.pairs`),
không cần khác mặt, không cần kề sát ô Seal. `level.seals` là mảng bộ ba `\\\[r, c, required]` —
mỗi ô Seal có ngưỡng riêng, mở ở các mốc khác nhau của cùng 1 bộ đếm `pairs` chung. Thiếu phần
tử thứ 3 mặc định `required = 1`. Sau khi thêm/sửa Seal, luôn xác nhận bằng
`p24kSealsAllOpen(level, model.pairs) === true` sau khi replay `solution` — `selfTest().ok`
không đủ để bắt lỗi Seal không thật sự mở.
7. **Lock 2 giai đoạn (`lock.after`)**: nếu dùng, nhớ quy đổi RAW id cho `after.face` giống như
`face` (mục 1) — pipeline remap đã xử lý cả hai, nhưng dễ quên khi viết tay. Hiện không màn
nào trong 50 màn dùng field này (xem §5.1).
8. **Sau mỗi thay đổi, luôn xác nhận**: `window.\\\_\\\_digest24k1.selfTest().ok === true` (check
TOÀN BỘ 50 màn cùng lúc, không chỉ màn vừa sửa) + trace lại `solution` bằng
`debug.freshModel`/`debug.modelDrop` để chắc điểm thắng thật đúng như dự tính.

### 5.9 Công cụ hỗ trợ (không nằm trong repo)

Các script Playwright/Node dưới đây được viết lại theo nhu cầu mỗi phiên làm việc (không commit
vào repo) — nếu cần lặp lại 1 tác vụ, viết lại theo mô tả sau:

* **Trích xuất dữ liệu 1 hoặc nhiều màn**: mở `MahjongXBlock.html?genTest=0\\\&unlockAll=1` bằng
Playwright, đọc `window.\\\_\\\_digest24k1.LEVELS\\\[i]`, tính ô "chưa từng bị chạm" (an toàn đặt seed
mới) qua `debug.freshModel`/`debug.modelDrop`.
* **Kiểm tra điểm thắng thật**: replay từng nước, check điều kiện thắng theo `goalType` sau mỗi
nước, so với `solution.length` — lệch nghĩa là có nước "chết" phía sau (safety-net, §5.8 mục 3).
* **Cập nhật `Beatchart.xlsx`**: đọc toàn bộ `LEVELS` qua `window.\\\_\\\_digest24k1`, dùng `exceljs`
ghi ra ĐÚNG 1 sheet "Level Data" **16 cột** dữ liệu thô mỗi màn (level, cỡ bàn, goalType, goal
detail, moveLimit, số nước, lượt dư, số khối, khối lớn nhất, số mặt khác nhau, số Ô
Chắn/Seal/Lock + chi tiết, có/không Random Queue Pool). Không có cột "Trạng thái" tự thuật kết
quả self-test/runSolution — chỉ ghi tình trạng self-test tổng quát vào dòng ghi chú cuối sheet.
Không có bước tính điểm khó 7 thành phần, không dựng ảnh biểu đồ SVG, không có sheet Economy.



## 6\. Bộ máy sinh khối ngẫu nhiên (Future Work to be improved)

Engine hỗ trợ 2 kiểu nguồn khối KHÔNG cố định, cả hai đều đi qua 1 "cổng chống-random-ăn-gian" (reroll-gate, bounded-DFS `p24qTrySolveFrom`): khối rút ra chỉ được CHẤP NHẬN nếu bàn sau đó CHỨNG MINH ĐƯỢC vẫn còn đường thắng; nếu không khối nào qua nổi sau `queueRerollBudget` lần thử, dùng khối dự phòng bắt buộc (`queueFallback`).

* **Queue Pool** (`level.queuePool`): rút khối đã ghép sẵn, có trọng số, từ 1 danh sách hữu hạn tác giả soạn.
* **Random Shapes + Random Faces** (`level.randomShapes` + `level.randomFaces`): sinh khối HOÀN TOÀN ngẫu nhiên — cả hình dạng lẫn từng mặt tile đều rút ngẫu nhiên có trọng số.

**Thuật toán rút khối có cổng chặn (`p24qDrawGated`, rút gọn từ code thật):**

```
for attempt in 1..queueRerollBudget (mặc định 10 nếu level không khai báo):
  entry = rút có trọng số từ queuePool (p24qWeightedPick)
  nếu p24qTrySolveFrom(bàn\\\_sống, \\\[...khối\\\_đã\\\_cam\\\_kết, entry.piece], queuePool, {maxDepth: queueSolveDepth mặc định 8}) === true:
    CHẤP NHẬN entry, dừng vòng lặp
nếu hết budget mà không khối nào qua:
  dùng queueFallback (hoặc phần tử đầu queuePool + console.warn nếu tác giả quên khai báo queueFallback)
```

`khối\\\_đã\\\_cam\\\_kết` (`committedPrefix`) là `\\\[]` cho khối đầu tiên của màn, hoặc `\\\[Current]` khi đang rút Next trong lúc Current đã hiện nhưng chưa chơi — đảm bảo phép kiểm tra "còn đường thắng" tính đúng cả khối đang chờ, không chỉ khối sắp rút.

**`p24qTrySolveFrom` — bounded-DFS chứng minh "còn đường thắng"** (rút gọn): duyệt đệ quy tối đa `maxDepth` bước (mặc định 8) hoặc `maxNodes` node (mặc định 20.000), có memo hoá trạng thái đã thăm (`seen`, key = toàn bộ quân sống + `pairs` + `idCounts` + số khối còn lại) để không lặp lại nhánh đã xét; ở mỗi bước, nếu còn khối "đã cam kết" phải dùng đúng khối đó, hết cam kết rồi mới được tự do chọn bất kỳ khối nào trong `pool`. Trả `true` ngay khi tìm được 1 đường bất kỳ đạt goal (`p24mGoalMet`), `false` nếu cạn ngân sách mà chưa thấy đường nào. **Đây chỉ là phép CHỨNG MINH TỒN TẠI ít nhất 1 đường thắng, không phải tìm đường tối ưu** — mục đích duy nhất là loại bỏ khối khiến bàn "chết chắc chắn", không đảm bảo khối được chấp nhận là lựa chọn hay nhất.

**Chế độ Random Shapes+Faces** không thể áp dụng y hệt thuật toán trên (không gian "mọi hình × mọi mặt mỗi ô" quá lớn để duyệt hết) — thay vào đó, mỗi lần thử lấy mẫu 1 lô nhỏ hình+mặt MỚI ngẫu nhiên (không cache lại giữa các lần gọi) làm đại diện cho "khối tương lai lý tưởng", cùng tinh thần với `queuePool` hữu hạn nhưng tái lấy mẫu thay vì cố định.



* Bộ test này được sinh + đo độ khó bằng script riêng `gen\\\_test\\\_levels.js`: mô phỏng 30 lượt chơi/level bằng 1 bot "greedy-match-hoặc-nước-đi-hợp-lệ-đầu-tiên" (naive). Chương A-C và E đạt tỉ lệ qua màn 93–100% với bot đó; chương D (khó nhất, Seal #6-10 kết hợp `pairGoal` 2-4 trên bàn 4×4) chỉ 33–77% — KHÔNG phải lỗi có-thể-thắng-được (cổng reroll-gate vẫn luôn chứng minh còn đường thắng ở mỗi bước), mà là bằng chứng các level đó cần chơi có chủ đích hơn 1 bot ẩu.

\---

## 7\. Kinh tế Xu \& Cửa Hàng

### 7.1 Kiếm Xu

**\[Đổi 13/09/2026, theo yêu cầu người dùng]** Công thức sàn Xu đổi từ **logarith** sang **exponential** — đặc tính đường cong ĐẢO NGƯỢC hẳn: log tăng nhanh ở đầu game rồi phẳng dần về cuối, exponential thì ngược lại, tăng nhẹ/chậm ở các màn đầu rồi DỐC hẳn lên ở cuối game. Công thức thắng màn (`computeWinCoins()`, hằng số `COIN\\\_BASE=9, COIN\\\_GROWTH=1.07`, code thật dùng `S.lv` 0-indexed — dưới đây quy về level hiển thị 1-indexed):

* Sàn: `round(COIN\\\_BASE × COIN\\\_GROWTH^(level−1))` = `round(9 × 1.07^(level−1))` — Lv1: `round(9×1.07^0) = 9` Xu; Lv10: `round(9×1.07^9) = 17` Xu; Lv30: `round(9×1.07^29) = 64` Xu; Lv50: `round(9×1.07^49) = 248` Xu (trước khi nhân đôi màn chốt chương).
* **Không có bonus lượt dư** (đã bỏ hẳn từ trước — hàng đợi khối định trước, "dư lượt" nhiều lúc chỉ là đợi đúng mặt Mahjong cần để Match, không phải chơi giỏi hơn).
* `+15 Xu` nếu thắng mà KHÔNG dùng mất booster nào so với lúc bắt đầu màn — cộng TRƯỚC khi nhân đôi (xem thứ tự phép tính ở ví dụ A4 của `04-GDD-FINAL-CORE-MASTER.md`).
* `×2` ở mọi level chốt chương (level thứ 10, 20, 30, 40, 50) — áp dụng SAU cùng, nên các mốc chốt chương giờ tạo ra những "đỉnh" rất rõ rệt so với màn liền trước (vd Lv49→50: 232→496 Xu tệ nhất, gần gấp đôi thay vì tăng dần đều).
* Chơi lại 1 level đã từng qua (`firstClear=false`) → **0 Xu** (đọc thẳng code: `if(!firstClear) return 0;`, không cào Xu vô hạn bằng cách chơi lại level dễ).
* Người chơi tệ nhất (luôn hết booster, 0 lượt dư) vẫn gom đủ **966 Xu** tới màn 30 (verify bằng self-test `economy\\\_floor\\\_affords\\\_cheapest\\\_skin\\\_by\\\_level30`, dùng đúng công thức này) — đủ mua skin rẻ nhất (895 Xu), giữ đúng bất biến thiết kế từ công thức cũ, chỉ dư dả hơn (cũ là \~899 Xu, sát nút hơn).
* **Tổng cả đời chơi 50 màn**: **4.149 Xu (tệ nhất)** – **4.959 Xu (tối ưu)** — tăng mạnh so với công thức log cũ (1.725–2.535 Xu) vì exponential dồn phần lớn phần thưởng vào 10-15 màn cuối; xem `Document/Mahjong\\\_x\\\_Block\\\_SourceSink.xlsx` (đã cập nhật cùng công thức) để xem chi tiết từng màn/tinh chỉnh lại tham số nếu cần cân bằng lại.

### 7.2 Cửa hàng (3 tab)

**Nguồn gốc hệ số giá ×5.967**: đây là bối cảnh LỊCH SỬ (khi đổi công thức kiếm Xu từ 1 công thức cũ hơn sang **logarith** — `round(10×ln(level+2))`, đã đổi tiếp sang **exponential** ở 13/09/2026, xem 7.1) — toàn bộ bảng giá skin gốc (thiết kế cho 1 công thức kiếm Xu khác, phóng khoáng hơn) khi đó bị lệch hẳn khỏi mốc cân bằng mong muốn. Thay vì tự nghĩ lại 23 mức giá riêng lẻ, mọi giá được NHÂN ĐỀU 1 hệ số duy nhất (×5.967) sao cho giá skin RẺ NHẤT (Ngọc Bích) chạm đúng \~895 Xu — đúng bằng mốc "vẫn đủ mua ở màn 30 kể cả người chơi tệ nhất" của công thức log lúc đó (899 Xu worst-case). Nhờ scale đều 1 hệ số, TỈ LỆ CHÊNH LỆCH giữa các skin so với bản gốc được giữ nguyên. **Giá skin KHÔNG đổi** trong đợt chuyển sang exponential lần này (chỉ đổi công thức kiếm Xu) — bất biến "đủ mua skin rẻ nhất ở màn 30" vẫn giữ đúng, nay còn dư dả hơn (966 Xu worst-case so với ngưỡng 895 Xu, xem 7.1) chứ không sát nút như trước.

* **Quân Bài — 12 skin tile** (giá quy đổi hệ số ×5.967 so với bản gốc, mốc neo skin rẻ nhất = 895 Xu):
Ngà nguyên bản (0, mặc định), Ngọc Bích (895), Mực Đen (1195), Hổ Phách (1490), Thập Nhị Chi (1910), Muông Thú (1670), Tứ Quý Trái Cây (1550), Bài Tây — hiện chất bài Tây ♠♥♦♣ (1790), Hoa Sen (1730), Biển Cả (1610), Trân Bảo (2265), Tứ Thời (1850).
* **Bàn Cờ — 11 skin bàn:** Gỗ nguyên bản (0, mặc định), Tre Trúc (1195), Đá Xanh (1790), Ngọc Bích Hoàng Cung (1670), Sơn Mài Đỏ (1550), Giấy Hoa Tiên (1315), Sứ Men Lam (1790), Vườn Anh Đào (1550), Điện Rồng Vàng (2150), Ánh Trăng Đêm (1430), Trà Quán (1195).
* **Nâng Cấp:** mua thêm gói 5 lượt Booster (Đổi khối HOẶC Hint), giá cố định 100 Xu/gói, cộng thẳng vào kho dùng chung (không phải "cấp" vĩnh viễn kiểu bậc thang).
* Mọi skin đều thuần cosmetic (đổi ảnh/CSS filter, không đổi ảnh gốc TILE\_IMG, không đổi luật).
* Preview thật trong popup chi tiết: render bằng đúng `tileHTML()`/biến CSS game dùng, không phải ảnh giả.

\---

## 8\. Vòng lặp gắn kết dài hạn (Nhiệm vụ \& Điểm danh)

Trên Economy, dùng lại đúng `addCoins`/`setBoosterReroll`/`setBoosterHint` có sẵn — không có kho tiền/booster riêng, không đổi luật thắng/thua. Ngày xác định theo local date máy (`YYYY-MM-DD`), không cần server.

### 8.1 Nhiệm Vụ Hàng Ngày

* Chọn **3 trong 6** nhiệm vụ mẫu, XÁC ĐỊNH theo ngày (seed từ chuỗi ngày qua 1 LCG rẻ tiền — cùng ngày luôn ra đúng 3 nhiệm vụ đó dù mở lại trang/modal nhiều lần, không random lại mỗi lần mở). Thuật toán chính xác (`pickDailyQuests`/`seedFromString`):

```
  seed = |hash đa thức của chuỗi ngày "YYYY-MM-DD"|     // h = (h\\\*31 + charCode) lặp qua từng ký tự
  lặp 3 lần (pool 6 nhiệm vụ, KHÔNG hoàn lại sau mỗi lần chọn):
    seed = (seed × 1103515245 + 12345) \\\& 0x7fffffff      // hằng số LCG kinh điển (ANSI C rand())
    chọn nhiệm vụ ở vị trí (seed mod số-nhiệm-vụ-còn-lại), loại khỏi pool
```

Vì seed chỉ phụ thuộc chuỗi ngày (không có yếu tố ngẫu nhiên thật/`Math.random()`), 2 người chơi bất kỳ mở game cùng 1 ngày LUÔN thấy đúng 3 nhiệm vụ giống hệt nhau, theo đúng thứ tự — hữu ích nếu sau này muốn thêm bảng xếp hạng/sự kiện theo-ngày dùng chung đề.

|Nhiệm vụ|Mục tiêu|Thưởng|
|-|-|-|
|Thắng 1 màn hôm nay|1|20 Xu|
|Ghép đủ 6 cặp (cộng dồn mọi màn hôm nay)|6|20 Xu|
|Dùng 1 lượt Đổi khối hoặc Hint|1|1 Đổi khối + 1 Hint|
|Phá 1 Phong Ấn|1|25 Xu|
|Thắng 1 màn không dùng Booster nào|1|30 Xu|
|Tạo chuỗi dây chuyền ≥2 wave|1|25 Xu|

* **Mốc quà theo số nhiệm vụ hoàn thành trong ngày** (độc lập với thưởng từng nhiệm vụ, tính theo "đã đạt target" chứ không cần đã nhận): hoàn thành 1 nhiệm vụ → 15 Xu; 2 nhiệm vụ → 25 Xu + 1 Đổi khối; cả 3 → 40 Xu + 1 Đổi khối + 1 Hint.

### 8.2 Điểm Danh 30 Ngày

* Mô hình **CỘNG DỒN**, không phải streak-mất-trắng khi lỡ ngày — bỏ lỡ 1 ngày chỉ đơn giản không mở thêm ô, không mất tiến độ đã có.
* Mỗi ngày thắng ≥1 màn → mở khoá đúng 1 ô kế tiếp (1..30) để nhận; hết ô 30 thì vòng mới bắt đầu lại từ ô 1.
* Thưởng bậc thang: ngày <10 → 10 Xu (15 Xu nếu ngày chia hết 5, +1 Đổi khối); ngày 10-19 → 15 Xu nền; ngày 20-29 → 20 Xu nền. Mốc lớn override hẳn công thức: **Ngày 10** = 60 Xu + 3 Đổi khối + 3 Hint; **Ngày 20** = 100 Xu + 5 + 5; **Ngày 30** = 200 Xu + 8 + 8.
* Việc "đủ điều kiện" (thắng ≥1 màn hôm nay) và việc "bấm nhận" tách rời — không tự động cộng Xu sau lưng người chơi.

\---

## 9\. Giao diện \& Trải nghiệm

### 9.1 Danh sách màn hình

* **Menu chính** — cổng tre lớn chiếm gần hết màn, chạm nắm cửa (đã tách 2 nửa theo cánh cửa khi mở) để vào game; lá rơi trang trí, đèn lồng 2 bên.
* **Chọn Level** — 1 danh sách cuộn dọc duy nhất (đã bỏ chia chương/vuốt ngang), mỗi level là 1 "cổng" nhỏ hiện goal, khoá/mở theo tiến trình, tự cuộn tới level hiện tại khi mở.
* **Trong game** — HUD (Level/Điểm/Lượt) + dải Goal riêng (tách khỏi HUD) + Khay (Current/Next) + Bàn + 2 nút Booster.
* **Cửa Hàng** — vào/ra bằng cửa cuốn gỗ kéo dọc (khác 2 cánh cửa tre kéo ngang ở nơi khác), giao diện "sạp hàng Trung Hoa cổ" (mái ngói cong, biển hiệu treo, 2 cột gỗ, kệ hàng phân tầng như "ô kệ" lõm).
* **Tủ Đồ (Wardrobe/Theme)** — đổi nhanh skin ĐÃ SỞ HỮU, mở từ menu, dùng chung dữ liệu/preview với Cửa Hàng.
* **Nhiệm Vụ \& Điểm Danh (modal)** — 2 tab.
* **Cài đặt (modal)** — nhạc/hiệu ứng (2 thanh trượt riêng)/rung/ngôn ngữ.

### 9.2 Khoá tỉ lệ khung hình

Toàn bộ game bọc trong `#app-frame` cố định tỉ lệ 16:9 (ngang)/9:16 (dọc), canh giữa; phần dư để lộ nền gỗ của `<body>` làm viền đen 2 bên (letterbox) thay vì kéo giãn méo hình. Cuộn trang chuyển hẳn vào 1 lớp con `#app-scroll` riêng để các nút `position:fixed` (back/settings...) neo đúng theo khung chứ không theo viewport thật.

### 9.3 Vật liệu \& màu mặc định

* Bàn cờ mặc định đổi hẳn sang **gỗ thật** (trước là tông xanh lục dù nhãn ghi "gỗ"). Vân gỗ/tre dùng chung 1 biến CSS (`--tex-wood`/`--tex-bamboo`), phủ thêm 2 lớp lệch góc nhẹ + 1 dải sáng chéo mô phỏng ánh đèn để tránh cảm giác "vân kẻ" lặp đều giả tạo.
* HUD: Goal tách hẳn thành `#goal-strip` riêng (full-width, phía trên bàn) thay vì nhồi chung 1 hàng với Level/Điểm/Lượt/Khoá — tránh Goal (phần tử cuối) bị đẩy lỏi/che khuất ở màn hình dọc hẹp.

### 9.4 Onboarding

* Chỉ **Level 1** có "bàn tay hướng dẫn" (👆) — hoạt ảnh lặp vô hạn di chuyển từ khối Current tới đúng ô cần thả, tôn trọng `prefers-reduced-motion` (đứng yên tại ô đích thay vì lượn qua lại nếu người dùng bật giảm chuyển động). Mọi level khác không có hướng dẫn tự động nào — dạy hoàn toàn qua việc tự chơi.

### 9.5 Overlay Thắng/Thua (kết quả màn) — **\[Đồng bộ lại 13/09/2026]**

Cả 2 overlay dùng chung 1 khung thẻ gỗ `#ovcard` (bo góc, viền vàng mờ, box-shadow nổi khối), khác nhau đúng ở màu tiêu đề (`--gold` cho Thắng, `--danger` màu đỏ cam cho Thua) — trước đợt 13/09/2026, 2 overlay lệch hẳn về độ "giàu thông tin": Thắng có khung `.result-stats` 2 thẻ `.hud-box` (Điểm/Xu nhận, có icon SVG đồng xu riêng), còn Thua chỉ có 1 dòng chữ thô kiểu "3/4". Đã đồng bộ lại:

* **Thắng** (`win()`): `<h2>` tên màn + (nếu chuỗi >1 wave) 1 dòng phụ "Best chain ×N" → `.result-stats` gồm 2 `.hud-box`: **Điểm** (tổng điểm màn) và **Xu nhận** (kèm icon đồng xu SVG vẽ tay, không dùng emoji) → tối đa 3 nút: `MÀN TIẾP THEO` (ẩn nếu đang ở level cuối) / `CHƠI LẠI LEVEL` / `VỀ CHỌN MÀN`.
* **Thua** (`lose(reason)`, `reason` là `'moves'` hoặc `'nospace'`): `<h2 style="color:var(--danger)">` tiêu đề đúng lý do thua (`lose\\\_moves\\\_title`/`lose\\\_nospace\\\_title`) + 1 dòng mô tả lý do (`lose\\\_moves\\\_msg`/`lose\\\_nospace\\\_msg` — 2 chuỗi dịch đã tồn tại sẵn cả 3 ngôn ngữ từ trước nhưng CHƯA từng được dùng tới cho tới đợt này) → cùng `.result-stats` với 2 `.hud-box`: **Điểm** và **Tiến độ** (mục tiêu chưa đạt, hiện bằng ĐÚNG icon mặt quân thật tái dùng từ `.goal-chip`/`tileHTML()` của HUD trong game — không phải số thô — mỗi mục tiêu 1 chip riêng, tự xuống dòng nếu nhiều hơn 2 mục tiêu qua class `.result-progress` riêng vì `.hud-val` gốc mặc định nowrap) → 2 nút: `CHƠI LẠI LEVEL` / `VỀ CHỌN MÀN` (không có "màn tiếp theo" vì chưa qua màn).
* **Gotcha kỹ thuật đã gặp khi build lại Thua**: `<button>` không tự kế thừa `color` của `<body>` như thẻ thường — 1 nút không khai báo `color` sẽ dùng màu chữ mặc định của trình duyệt (thường tối), không phải `--cream` sáng của toàn game. Đây CHÍNH LÀ nguyên nhân số lượt Booster trong thẻ Nâng Cấp (`.shop-card-preview-btn`, xem 7.2) từng bị "chìm" vào nền gỗ tối — đã sửa bằng cách khai báo rõ `color:var(--cream)` trên chính `<button>` cha thay vì trên từng phần tử con.

### 9.6 Cửa Hàng — tự sáng tab theo cuộn (scrollspy)

3 category (Quân Bài/Bàn Cờ/Nâng Cấp) không ẩn/hiện qua tab như 1 SPA thường — cả 3 render nối tiếp thành 1 trang dài duy nhất (`.shop-section`), tab chỉ đóng vai trò (a) bấm để `scrollIntoView` mượt tới đúng section và (b) tự sáng theo section NGƯỜI CHƠI ĐANG THẤY khi cuộn tay, không bấm gì. Thuật toán tự sáng (`updateShopActiveSection`, chạy mỗi sự kiện scroll qua `requestAnimationFrame`-coalescing để đỡ tốn `getBoundingClientRect()` liên tục):

```
với mỗi .shop-section:
  tính phần DIỆN TÍCH của nó đang thật sự lộ ra trong khung nhìn (dưới thanh tab dính, trên đáy khung)
chọn section có diện tích lộ NHIỀU NHẤT → sáng tab tương ứng
NGOẠI LỆ: nếu #app-scroll đã cuộn chạm đáy thật sự (scrollTop+clientHeight >= scrollHeight-2px)
          → LUÔN ép sáng tab CUỐI CÙNG, bất kể diện tích so đo thế nào
```

Ngoại lệ ở dòng cuối là bản vá cho 1 bug thật: section "Nâng Cấp" chỉ có 2 thẻ (Đổi khối/Hint), ngắn hơn hẳn khung nhìn — nếu chỉ so diện tích lộ ra, dù cuộn hết cỡ xuống đáy trang, section "Bàn Cờ" (11 thẻ, dài hơn) phía trên vẫn luôn lộ nhiều hơn, khiến tab "Nâng Cấp" không bao giờ tự sáng dù người chơi rõ ràng đã cuộn tới cuối. Bài học chung cho pattern scrollspy: "section lộ nhiều nhất" chỉ đúng khi mọi section đều dài hơn khung nhìn — cần luôn có 1 nhánh dự phòng xử lý riêng section CUỐI ngắn hơn khung.

\---

## 10\. Âm thanh, Haptic, Đa ngôn ngữ

### 10.1 Âm thanh

`place`/`match` (2 hiệu ứng gameplay quan trọng nhất, nghe MỖI lượt đặt/match) **thực ra phát 1 sample âm thanh thật đã thu sẵn** (`PLACE\\\_SFX\\\_B64`/`MATCH\\\_SFX\\\_B64`, nhúng base64, decode qua `decodeAudioData` ngay khi trang tải — cùng kiểu với nhạc nền), KHÔNG phải tổng hợp thuần bằng oscillator như mô tả trước đây. `playWoodTile()`/`playMatchSfx()` chỉ rơi về `beep()`/`woodClack()` (oscillator tổng hợp) làm phương án DỰ PHÒNG nếu sample chưa kịp decode xong hoặc decode lỗi. Chi tiết kỹ thuật đáng chú ý:

* Cả 2 sample đều được cắt bớt phần "im lặng dẫn đầu" (`placeSfxOffset`/tương tự cho match): dò byte đầu tiên vượt ngưỡng biên độ `0.02`, phát từ đó trừ lùi 3ms — vì sample gốc có 1 đoạn mở đầu gần như im lặng, nếu phát nguyên bản sẽ nghe như bị trễ/nhẹ tiếng.
* `playMatchSfx(n)` tăng `playbackRate` theo `n` (số match liên tiếp, tối đa +12.5% ở n=5) — pitch tăng nhẹ theo combo, không đổi bằng cách chọn sample khác.
* Cả 2 sample lẫn oscillator dự phòng đều gọi `window.\\\_\\\_duckMusicForSfx()` trước khi phát — xem cơ chế "ducking" tạm hạ âm lượng nhạc nền bên dưới.
* `beep()`/`woodClack()` (phương án dự phòng, thật sự chạy khi KHÔNG có sample) mới đúng là oscillator tổng hợp (`OscillatorNode`+`GainNode`, envelope tuyến tính lên rồi exponential xuống \~0.0008), dùng chung cho các sự kiện phụ khác (reveal/sealOpen/target...) chưa có sample riêng.
* *(Có 3 định nghĩa `function beep(){}` trong file do lịch sử phát triển nhiều lớp — chỉ định nghĩa CUỐI xuất hiện trong file là bản đang chạy thật, xem quy tắc ở `04-GDD-FINAL-CORE-MASTER.md` B1.)*
* **Nhạc nền** dùng 1 track base64 nhúng thẳng trong file (giữ đúng ràng buộc "1 file HTML tự chứa", \~5.7MB base64), chạy trên `AudioContext` riêng biệt hoàn toàn với sfx — không cái nào làm giảm âm lượng cái kia (trừ ducking chủ động qua `\\\_\\\_duckMusicForSfx()`, xem trên).

Trước đây việc GIẢI MÃ (`decodeAudioData`) file nhạc chỉ bắt đầu SAU cú chạm/phím đầu tiên của người chơi (cùng lúc với việc BẮT ĐẦU PHÁT, vốn dĩ bắt buộc phải chờ cử chỉ theo chính sách autoplay của mọi trình duyệt — không có cách nào bỏ qua yêu cầu này bằng code). Việc gộp chung "giải mã" với "phát" khiến độ trễ CỘNG DỒN: giải mã \~5.7MB base64 (gồm `atob()` đồng bộ + `decodeAudioData` bất đồng bộ) mất thêm một khoảng thời gian đáng kể SAU cú chạm, tạo cảm giác "nhạc chỉ chạy khi đã vào tới màn chơi" dù người chơi đã tương tác từ ở menu. Đã tách: việc giải mã giờ bắt đầu NGAY khi script tải xong (được phép, vì tự nó không phát ra âm thanh nên không bị chính sách chặn), chỉ còn bước PHÁT chờ đúng cử chỉ đầu tiên — nhờ vậy khi cử chỉ đó xảy ra, buffer thường đã sẵn sàng từ trước, phát gần như tức thì (đo thực tế \~5ms) thay vì phải đợi giải mã xong ngay lúc đó.

* Tiếng "cạch" gỗ cho MỌI nút bấm UI (menu/chọn màn/shop/game) tổng hợp riêng qua 2 lớp: noise ngắn qua bandpass \~1.6kHz (tiếng va chạm bề mặt) + 1 tone sine trầm đổ nhanh (cộng hưởng thân gỗ), chạy trên `AudioContext` thứ 3 riêng (`\\\_\\\_clickAc`) — có công tắc bật/tắt riêng đồng bộ với công tắc Âm thanh chung.
* 2 thanh trượt âm lượng ĐỘC LẬP trong Cài đặt: Nhạc nền / Hiệu ứng.
* **Mở khoá AudioContext trên iOS**: `ac()` (sfx) tự gọi `AC.resume()` nếu context đang `suspended` MỖI lần được gọi, cộng thêm 1 listener `pointerdown` riêng trên toàn `document` cũng gọi resume — an toàn thừa (idempotent) để đảm bảo lần chạm thật đầu tiên luôn có cơ hội "mở khoá" audio, đặc biệt trên Safari iOS (hay giữ context ở trạng thái suspended nếu bị tạo ra ngoài đúng khung 1 user-gesture được tin cậy).

### 10.2 Haptic (rung)

* `window.HAPTIC = {place:25, match:35, matchBig:\\\[30,30,35]}` (đơn vị ms, dùng `navigator.vibrate`), công tắc bật/tắt riêng, độc lập với công tắc Âm thanh. Hàm `haptic()` kiểm tra `navigator.vibrate` tồn tại + bọc `try/catch` trước khi gọi.
KHÔNG hoạt động trên iPhone (Safari/WKWebView) — đây là giới hạn nền tảng của Apple, không phải bug trong code.\*\* Safari trên iOS chưa bao giờ implement Vibration API (`navigator.vibrate` không tồn tại trên iOS ở bất kỳ phiên bản nào tới nay), khác hẳn Chrome/WebView trên Android (có hỗ trợ). Code hiện tại đã xử lý đúng bằng feature-detect (`if(navigator.vibrate)`) nên trên iPhone chỉ lặng lẽ không rung — không lỗi, không crash — nhưng kết quả cuối người chơi iOS vẫn là "bấm công tắc Haptic ON mà không thấy rung gì". Vì game là 1 file HTML thuần web (không đóng gói qua Capacitor/Cordova), **không có cách nào gọi được Taptic Engine thật của iPhone từ JavaScript** trong kiến trúc hiện tại — muốn có rung thật trên iOS bắt buộc phải bọc game trong 1 native app wrapper kèm plugin haptics gọi `UIImpactFeedbackGenerator` (native API), là thay đổi kiến trúc lớn ngoài phạm vi "1 file HTML tự chứa" hiện tại. Xem thêm §13.

### 10.3 Đa ngôn ngữ (i18n)

* 3 ngôn ngữ đầy đủ: **Việt (mặc định) / English / 中文**, áp dụng cho toàn bộ text tĩnh (`data-i18n`) lẫn text động đã render (win/lose/quest/checkin...). Chuyển ngôn ngữ đổi ngay lập tức, không cần tải lại trang.

\---

## 11\. Kiến trúc kỹ thuật

### 11.1 Cấu trúc file

* **1 file HTML duy nhất, tự chứa hoàn toàn** (\~6.85MB): không gọi asset ngoài khi chạy — kể cả 42 mặt quân mạt chược (ảnh chụp thật, 2 bộ TILE\_IMG/TILE\_IMG\_BLOCK) lẫn toàn bộ audio đều nhúng base64 trực tiếp trong file (đây là phần chiếm dung lượng lớn nhất — 1 dòng nhạc nền một mình đã \~5.7MB base64).
* **Nhiều tầng engine chồng lên nhau theo lịch sử phát triển**, chỉ tầng cuối cùng thật sự chạy:

  1. Engine gốc cũ nhất (`LEVELS`, `SHAPES`, `S`, `simulate()`...) — prototype "Match 2 \& Phá Ấn" 8 màn đầu tiên của dự án. Riêng phần này vẫn còn nguyên trong file (chưa dọn — rủi ro nợ kỹ thuật còn lại, xem mục 13); các bản khai báo `function win/lose/startLevel/goalState/levelWon/showPreview/clearPreview/renderKhay(){}` của tầng này chỉ giữ vai trò "chỗ trống" (binding) bắt buộc để 2 tầng sau gán đè lên — không xoá được nếu không viết lại toàn bộ theo kiểu khai báo biến thường.
  2. `P24K\\\_LEVELS` — 1 bộ 10 level tiếng Việt cũ hơn ("24K V2", pairGoal, không có moveLimit/booster/goalType). **Đã dọn (07/09/2026):** các phần GÁN ĐÈ của tầng này (`win=`, `lose=`, `startLevel=`, `goalState=`, `levelWon=`, `showPreview=`, `clearPreview=`, `renderKhay=`) cùng với self-test/`window.\\\_\\\_digest24k` riêng và lệnh `startLevel(...)` tự chạy khi nạp trang (gây "chớp" 1 màn hình sai trước khi engine thật vẽ đè lên) đã bị xoá — chỉ giữ lại `renderBoard`/`renderTray`/`renderHUD`/`renderAll`/`intakeCap`/`refillTray`/`makePiece` (những cái KHÔNG bị gán đè lại ở tầng 3 nên vẫn đang là bản thật sự chạy) và `p24kFreshModel`/`p24kModelDrop`/`p24kRunSolution` (giữ nguyên khai báo rỗng-tác-dụng vì tầng 3 cần đúng cái tên này để gán đè lại).
  3. **Tầng thật sự chạy:** 1 IIFE cuối file GÁN LẠI (`win=function(){...}`, `lose=function(){...}`, `startLevel=function(){...}`, `goalState=function(){...}`, `place=p24kPlace`, `p24kRunSolution=function(){...}`) đè lên các tên hàm/biến toàn cục đã khai báo ở tầng 1, biến chúng thành engine P24K/P24M thật sự đang chơi (2 tầng gravity, moveLimit, booster, Khóa, 50 level).
  * Tầng 1 (prototype gốc, \~1000 dòng) vẫn còn nguyên — dọn tiếp cần viết lại cách khai báo các biến `win/lose/startLevel/...` (vd sang `let` thay vì `function`) để bỏ hẳn phần thân cũ mà không phá binding cho tầng 3; chưa làm trong đợt này vì rủi ro cao hơn lợi ích, xem mục 13.
* **Level Editor** (`Final Core/level-editor.html`, file riêng): thao tác kéo-thả trực quan (di chuyển tile, dán khối, sắp xếp lại sequence, quét vùng vẽ nhanh Seal/Ô Chắn/Khóa), chế độ playtest mô phỏng đúng luật, và tính năng sinh level bằng mô tả ngôn ngữ tự nhiên (AI) kèm auto-solver kiểm tra giải được trước khi playtest tay.

### 11.2 Lưu trữ (localStorage keys)

`mxb\\\_coins`, `mxb\\\_owned\\\_tileskins`, `mxb\\\_owned\\\_boardskins`, `mxb\\\_active\\\_tileskin`, `mxb\\\_active\\\_boardskin`, `mxb\\\_booster\\\_reroll`, `mxb\\\_booster\\\_hint`, `mxb\\\_level\\\_unlocked`, `mxb\\\_quest\\\_state`, `mxb\\\_checkin\\\_state`, `mxb\\\_sound`, `mxb\\\_music\\\_vol`, `mxb\\\_sfx\\\_vol`, `mxb\\\_haptic`, `mxb\\\_lang`.

### 11.3 Tự kiểm (self-test) \& công cụ QA

* `window.\\\_\\\_digest24k1.selfTest()` chạy **đúng 33 assertion** mỗi khi tải trang (dev), bao gồm: đúng 50 level, mọi khối là polyomino hợp lệ (2-5 ô), không khối nào tự-match sẵn (trừ Lv1), luật match nhóm 3/4 quân, gravity chọn đúng tầng thấp nhất, quân bị che không match, Ô Chắn/Phong Ấn/Khóa chặn đúng luật, mọi level có Seal đều thật sự mở được trong lời giải tác giả, mọi `moveLimit` đủ chỗ cho lời giải, và quan trọng nhất — **`all\\\_solutions`: lời giải tác giả soạn cho cả 50 level đều thắng được dưới đúng luật hiện tại** (chạy lại mỗi khi luật thay đổi để bắt sớm level nào bị "gãy" theo). **Danh sách đầy đủ cả 33 assertion kèm tên hàm thật + ý nghĩa từng cái** ở `04-GDD-FINAL-CORE-MASTER.md` B3 — tra theo đúng tên nếu 1 assertion cụ thể fail trong tương lai, thay vì đoán từ mô tả gộp nhóm ở trên.
* **✅ Cập nhật 13/09/2026: `ok === true` (33/33 check)** — 3 màn Lv40/Lv42/Lv46 từng fail `every\\\_seal\\\_level\\\_opens\\\_in\\\_its\\\_own\\\_solution`/`all\\\_solutions` (solution rỗng/`sequence` rỗng khiến rút quân ngẫu nhiên/goal không khả thi) đã được vá, xem root-cause chi tiết từng màn ở §5.1. Đã xác nhận qua `runSolution(39)`, `runSolution(41)`, `runSolution(45)` (0-indexed) và `check\\\_all\\\_solutions` trên cả 50 level.
* Bộ test riêng cho chế độ generative: `gen\\\_test\\\_levels.js` (30 lượt chơi mô phỏng/level bằng bot naive) — xem mục 6.
* Playwright + script chụp màn hình (`tmp/ls-shot\\\*.mjs`) để kiểm tra UI trực quan ở nhiều kích thước màn hình, thay cho test tay từng lần sửa giao diện.
* Tiện ích debug qua URL: `?level=N` (mở thẳng level N), `?unlockAll=1` (mở khoá mọi level), `?genTest=1`/`?genTest=0` (bật/tắt bộ 50 level generative test).

\---

## 12\. Lịch sử quyết định thiết kế \& nguyên tắc đã đúc kết

### 12.1 Vì sao game có hình dạng hiện tại

1. **Đề bài gốc** (trước 13/08): 1 file HTML tự chứa, \~50 level, Mahjong+Block phải là **1 core
loop** (không phải 2 minigame nối tiếp), đối tượng casual **35+**, ưu tiên ít thao tác (mặc định
chỉ kéo-thả), không cần biết luật Mahjong truyền thống.
2. **Chọn thể loại nền** (Giai đoạn 1, từ 6 prototype thử nghiệm): **Mahjong Block Blast** được chọn
vì "2 cơ chế kết hợp tự nhiên nhất, ván ngắn hợp mobile casual, chi phí cân bằng/phát triển thấp
nhất, dễ mở rộng" — so với Mahjong Collapse (khó điều khiển trên phone), Hand Builder (khó hiểu
hơn), Mahjong Towers (dễ thành cơ chế phụ dựa may rủi), Mahjong Battle (khó cân bằng nhất),
Mahjong Roguelike (khó tiếp cận nhất với casual).
3. **Khoá Core Gameplay** (Giai đoạn 3, 10 vòng thử trong 4 ngày) dựa trên **5 tiêu chí tự đặt ra
trước khi thử** — vẫn nên dùng làm khung đánh giá cho MỌI đề xuất cơ chế mới sau này:

   * **Removal Test**: bỏ Mahjong hoặc bỏ Block ra khỏi cơ chế, gameplay có sụp không? (nếu không
sụp, cơ chế đó chưa thật sự "1 core loop").
   * Có phải **1 quyết định** duy nhất, không phải 2 công đoạn tách rời (chọn rồi mới hành động)?
   * **Action load**: có giữ đúng 1 thao tác chính (kéo-thả) không?
   * **Cognitive load** có phù hợp casual 35+ không (không cần học luật phức tạp trước)?
   * **Level-design capacity**: cơ chế có đủ trục để tạo độ khó mịn xuyên suốt \~50 level không?
4. **Đảo luật Match: 24K → 24K-1 "Top Match"** (Giai đoạn 5) — thay vì chỉ tile tầng đáy mới Match
(24K gốc), đổi sang **chỉ tile ĐANG LỘ (không bị che) mới Match được**, đồng thời cho phép người
chơi chủ động xếp chồng. Đây là quyết định **quan trọng nhất về cảm giác chơi**: biến "che 1 quân
lại" từ hệ quả kỹ thuật thụ động thành 1 lựa chọn chiến thuật chủ động ("che để khoá, lộ lại đúng
lúc" — xem A1.1/2.3). Toàn bộ thiết kế level sau này (Ô Chắn, Seal, Lock, và mục tiêu bị chôn dưới
Seal/mái — nhãn `BURIED\\\_TARGET` riêng cho kiểu màn này đã gộp vào `TARGET\\\_FACE` từ 13/09/2026, xem
§3) đều xây trên đúng ý tưởng lõi này.
5. **UI/UX "Hành Trình Qua Vườn Trúc"** (Giai đoạn 6) chốt hướng thẩm mỹ Trung Hoa cổ/Zen (tre, gỗ,
ngọc bích, đồng cổ) thay vì hướng casino ban đầu đang nghiêng về (vàng sáng/đèn đỏ) — loại hẳn
UI legacy trong gameplay (Điểm/Khay chờ/Đổi khối/Xả quân hiển thị bằng chữ) để giữ cognitive load
thấp, chỉ giữ Goal/Board/Current/Next.

### 12.2 Cơ chế ĐÃ THỬ và bị loại — không nên thêm lại nếu không có lý do mới

* **Wild/Joker** (mặt khớp bất kỳ mặt lộ cùng tầng, thêm ở Giai đoạn 8) và **Nứt/Crack** (thêm cùng
đợt) — cả 2 đã lập trình đầy đủ + có self-test riêng, nhưng **gỡ bỏ hoàn toàn** (07/09/2026, xoá
khỏi cả `MahjongXBlock.html` lẫn `level-editor.html`: code, CSS, self-test, tool tác giả level,
schema AI-gen) vì **chưa từng được dùng trong bất kỳ level chính thức nào** — chi phí bảo trì
không tương xứng giá trị thực tế. Nếu muốn thêm lại 1 mặt "khớp bất kỳ" trong tương lai, nên coi
đây là tính năng MỚI cần thiết kế lại từ đầu, không phải khôi phục code cũ (đã xoá sạch).
* **Seal yêu cầu match KỀ SÁT trực tiếp** (chốt 11/09, Giai đoạn 13) — đảo ngược chỉ 1 ngày sau
(12/09, Giai đoạn 14) về lại "đếm khắp bàn". Bài học: 1 thay đổi luật cốt lõi nên chờ ít nhất vài
ngày phản hồi thật trước khi lan toả sang nhiều tài liệu/level, vì chi phí đảo ngược sau khi đã
áp dụng cho 17+ màn là không nhỏ (dù lần này vẫn làm được an toàn).
* **Batch \~10 ý mechanic "buff/bonus"** (Giai đoạn 4, brainstorm không sinh file) — loại toàn bộ vì
"không đổi quyết định lõi" — xem nguyên tắc \[\[feedback\_core\_over\_buffs]] ở 12.3.
* **Nhiều hướng cấu trúc loop 2-pha** (Pair \& Drop/Patch/Flip/Route/Box, 4 prototype dựa
resource/recipe) — loại vì giữ cấu trúc "khay 4 → Match 2 → công cụ → dùng trên board" chia 2 pha
rõ rệt, vi phạm tiêu chí "1 quyết định duy nhất" ở 12.1 mục 3.
* **Bonus "lượt dư → Xu/Điểm"** (từng có, bỏ hẳn ở đợt kinh tế Xu) — vì hàng đợi khối do tác giả
định trước (không random), "dư lượt" nhiều lúc chỉ phản ánh việc phải đợi đúng mặt cần để Match,
không phải tín hiệu kỹ năng đáng tin. Bài học chung: **cẩn trọng khi thưởng dựa trên 1 chỉ số có
thể bị chi phối bởi thiết kế nội dung (content-driven) hơn là kỹ năng người chơi (skill-driven)**.

### 12.3 Nguyên tắc đã đúc kết — nên tôn trọng khi mở rộng game

* **\[\[feedback\_core\_over\_buffs]]** — khi brainstorm cơ chế mới, ưu tiên thay đổi CORE LOOP thật
(đổi cách đặt/match/thắng), không phải thêm 1 lớp buff/bonus thụ động đứng ngoài quyết định
chính. Một buff hay ho vẫn có thể bị loại nếu nó "không đổi quyết định lõi".
* **\[\[project\_difficulty\_safety\_net\_pattern]]** — game CỐ Ý cho phép thắng sớm rồi chơi tiếp vài
nước "vô hại" (số nước còn lại trong `solution` không dùng hết); Điểm Danh 30 ngày CỐ Ý cộng dồn
không phạt khi lỡ ngày. Đừng "sửa" các hiện tượng này khi gặp lại — đây là triết lý nhất quán
xuyên suốt dự án ("không phạt người chơi vì lý do ngoài tầm kiểm soát của họ"), không phải bug.
* **Không giải thích cơ chế bằng chữ trong overlay/UI** — mọi bài học đều dạy qua `guideMoves` (chỉ
Lv1) + tự chơi mà hiểu, không có overlay "luật chơi" dạng văn bản. Nếu thêm cơ chế mới, nên thiết
kế 1-2 level đầu của cơ chế đó đủ đơn giản để tự dạy qua trải nghiệm, thay vì thêm text giải
thích.
* **\[\[project\_concurrent\_session\_editing\_risk]]** — từ \~11/09/2026, nhiều phiên AI/dev có thể cùng
sửa `MahjongXBlock.html` song song. Luôn đọc lại trạng thái sống (`git status`, self-test,
`runSolution`) trước khi dựa vào số liệu cũ trong bất kỳ tài liệu nào (kể cả tài liệu này) — số
liệu có thể đã lệch nếu có đợt sửa khác chen giữa.
* **Verify bằng chạy thật, không chỉ đọc code** — mọi thay đổi luật/level nên verify qua
`selfTest()` + `runSolution()`/Playwright thật, không suy diễn từ đọc code tĩnh (đã có tiền lệ 1
session suýt xoá nhầm hàm tưởng chết nhưng vẫn đang được gán lại ở lớp cuối, xem `04-GDD-FINAL-CORE-MASTER.md` B1).

### 12.4 Câu hỏi mở lặp lại nhiều tuần liền — chưa có câu trả lời chốt

Từ nhật ký, các câu hỏi sau được nêu lại nhiều lần qua nhiều tuần mà CHƯA có playtest/số liệu thật
để trả lời dứt điểm — người tiếp quản nên biết đây là nợ quyết định còn treo, không phải đã bị lãng
quên:

* UI dựa hoàn toàn trên HTML/CSS/WebAudio thì tạo được "game feel" tốt tới đâu so với native?
* 1 file HTML \~6.85MB (audio+ảnh nhúng base64) có ảnh hưởng độ mượt trên thiết bị yếu không?
* Độ khó sau mỗi đợt thêm cơ chế đã đủ thử thách cho casual 35+ chưa, hay cần playtest người thật
để hiệu chỉnh thay vì chỉ dựa công thức/bot mô phỏng?
* Hệ Kinh tế Xu hiện tại có đang chỉ "cho có" (bản mẫu) hay đã đúng vai trò gắn kết dài hạn thật?
* Với nhiều phiên AI chạy song song trên cùng file, cần quy trình điều phối chính thức nào (ngoài
cross-session message tự phát) để tránh drift/xung đột khi dự án tiếp tục mở rộng?

\---

## 13\. Vấn đề mở / điểm cần quyết định

* **Tầng 1 (prototype gốc "Match 2 \& Phá Ấn", \~1000 dòng) vẫn còn nguyên trong file** — đã dọn xong phần gán-đè lãng phí của tầng 2 (mục 11.1), nhưng tầng 1 vẫn là nợ kỹ thuật: nội dung không còn chạy (bị tầng 2/3 gán đè), song phần khai báo `function` của nó vẫn bắt buộc phải tồn tại làm chỗ trống cho các tầng sau. Dọn tiếp cần đổi cách khai báo (vd `let win;` thay vì giữ nguyên thân hàm cũ) — chưa làm vì rủi ro/công sức cao hơn lợi ích trong đợt này.
* **Dung lượng file \~6.85MB** (chủ yếu do audio + ảnh tile nhúng base64) trong 1 file HTML duy nhất — câu hỏi về độ mượt khi tải/chơi trên thiết bị yếu vẫn còn để ngỏ (đã nêu ở các weekly note trước, chưa có câu trả lời từ playtest thật).
* **Chế độ generative (Queue Pool / Random Shapes+Faces)** đã được kiểm chứng độ khó bằng bot mô phỏng nhưng CHƯA qua playtest người thật — cần quyết định lộ trình đưa vào bản chính thức hay chỉ giữ làm nội dung thử nghiệm nội bộ (`?genTest=1`).
* **Haptic không hoạt động trên iOS** (xem §10.2) — giới hạn nền tảng của Safari/WKWebView (không implement Vibration API), không phải bug sửa được trong kiến trúc "1 file HTML" hiện tại. Nếu muốn có rung thật trên iPhone, cần quyết định có đáng để đổi kiến trúc sang native wrapper (Capacitor + plugin haptics) hay chấp nhận giới hạn này vĩnh viễn với bản web thuần.


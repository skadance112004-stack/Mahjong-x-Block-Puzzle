# Mahjong × Block — UI/UX Spec dựa trên `Final Core/index.html`

## 1. Mục đích tài liệu

Tài liệu này định hướng cải tiến UI/UX cho bản game có ba màn hình trong cùng một file HTML:

1. Main Menu.
2. Chọn màn.
3. Gameplay.

Yêu cầu trung tâm:

- Giữ concept **cổng tre mở ra để bước vào game**.
- Giữ level select dạng **con đường các cổng xen kẽ**.
- Nâng chất lượng hình ảnh theo hướng **Zen, Trung Quốc cổ, tre trúc, gỗ và giấy**.
- Đảm bảo gameplay 24K-1 dễ đọc với người chơi casual trên 35 tuổi.
- Không làm tăng số thao tác hoặc thêm hệ thống meta gây nhiễu.

Tên định hướng hình ảnh:

> **Hành Trình Qua Vườn Trúc**

Người chơi mở Nguyệt Môn ở Main Menu, đi dọc một con đường qua các cổng tre ở Level Select, rồi giải puzzle trên một bàn trà gỗ trong Gameplay.

---

## 2. Những yếu tố từ bản hiện tại cần giữ

### 2.1. Cổng lớn ở Main Menu

Cổng là điểm nhận diện tốt nhất của giao diện hiện tại. Thao tác chạm để hai cánh mở ra tạo cảm giác “bước vào thế giới game”, phù hợp với trải nghiệm chậm và có nghi thức.

Giữ lại:

- Cấu trúc mái cổng và hai cánh tre.
- Animation hai cánh mở sang hai bên.
- CTA xuất hiện bên trong sau khi cổng mở.
- Hai đèn lồng làm điểm cân bằng hai bên.

### 2.2. Đường chọn màn dạng cổng tre

Các level nằm xen kẽ trái–phải trên một đường dọc tạo cảm giác hành trình rõ ràng hơn grid level thông thường.

Giữ lại:

- Path dọc.
- Level node là một cổng tre.
- Chạm cổng để mở preview mục tiêu.
- Màn khóa và màn đã mở có trạng thái khác nhau.
- Tiến trình mở khóa tuần tự.

### 2.3. Ngôn ngữ vật liệu

Giữ:

- Gỗ tối.
- Tre trúc.
- Giấy màu ngà.
- Ngọc bích và đồng cổ làm accent.

Không giữ cách dùng quá nhiều vàng sáng, đèn đỏ và texture có độ tương phản cao cùng lúc.

---

## 3. Các vấn đề của UI hiện tại cần khắc phục

### 3.1. Chữ chức năng quá nhỏ

Trong bản hiện tại, nhiều label nằm ở khoảng 9.5–13 px. Mức này khó đọc trên mobile, đặc biệt với nhóm người chơi trên 35 tuổi.

Thay đổi:

- Nội dung chức năng: tối thiểu 16 px.
- Label phụ: tối thiểu 14 px.
- Tên level trong gate: 16–18 px.
- Nút chính: 17–18 px, semibold/bold.
- Số mục tiêu: 22–24 px.

### 3.2. Phong cách đang nghiêng về casino Mahjong

Vàng sáng, đèn lồng đỏ, gradient bóng và text-shadow cùng xuất hiện khiến giao diện gần phong cách casino hơn Zen.

Thay đổi:

- Vàng chuyển thành đồng cổ ít bão hòa.
- Đỏ chỉ dùng ở đèn lồng nhỏ hoặc trạng thái nguy hiểm.
- Ngọc bích trở thành màu tương tác chính.
- Tile ngà là vật thể sáng nhất.
- Giảm số gradient, glow và shadow chồng nhau.

### 3.3. Texture gỗ cạnh tranh với nội dung

Các đường vân lặp lại trên toàn bộ background làm màn hình bận và giảm độ rõ của cổng/board.

Thay đổi:

- Nền chính là xanh mực hoặc xanh trúc tối gần phẳng.
- Texture tre/gỗ chỉ xuất hiện trên vật thể có ý nghĩa: cổng, panel, button, khung board.
- Không để họa tiết chạy qua vùng gameplay.

### 3.4. Thao tác hai bước bị lặp quá nhiều

Main Menu yêu cầu mở cổng rồi nhấn nút. Mỗi level ở Level Select cũng yêu cầu mở cổng rồi nhấn `CHƠI`. Concept đẹp nhưng nếu lặp mỗi lần sẽ tạo ma sát.

Giải pháp:

- Lần đầu mở game: giữ đầy đủ nghi thức chạm cổng → cổng mở → CTA xuất hiện.
- Những lần quay lại: cổng tự mở một phần và hiển thị `TIẾP TỤC MÀN N` ngay.
- Ở Level Select: màn hiện tại tự mở khi màn hình xuất hiện; các màn khác vẫn chạm để xem preview.
- Animation đã xem có thể chạy nhanh hơn, không bỏ hẳn.

### 3.5. Màn khóa phụ thuộc vào grayscale và emoji khóa

Grayscale làm mất chất liệu và emoji `🔒` không cùng ngôn ngữ mỹ thuật với cổng tre.

Thay đổi:

- Cổng khóa được chặn bằng một thanh gỗ ngang hoặc dây thừng vật lý.
- Giảm ánh sáng, không chuyển toàn bộ sang grayscale.
- Hiển thị dòng nhỏ: `Hoàn thành Màn 4 để mở`.
- Không dùng icon khóa hệ thống làm dấu hiệu chính.

### 3.6. Gameplay vẫn mang thành phần của prototype cũ

Các thành phần như Điểm, Khay chờ, Đổi khối và Xả quân không còn phù hợp với final core 24K-1.

Gameplay mới phải chỉ giữ:

- Goal hiện tại.
- Board hai tầng.
- Current block.
- Next block.
- Help/Pause.
- Chuỗi feedback Gravity → Match → Reveal.

---

## 4. Design principles

### 4.1. Tile first

Thứ tự ưu tiên thị giác:

```text
Mahjong tile
→ tầng và trạng thái che
→ current block
→ mục tiêu level
→ next block
→ điều hướng
→ decoration
```

### 4.2. Zen là rõ ràng, không phải mờ nhạt

- Nền có thể tối và dịu.
- Tile, chữ và button phải có tương phản mạnh.
- Ít vật thể chuyển động cùng lúc.
- Mỗi animation có khoảng nghỉ.

### 4.3. Ancient China qua vật liệu và không gian

Dùng:

- Tre, gỗ, giấy, ngọc, đồng.
- Cổng, trà thất, Nguyệt Môn, vườn trúc.
- Khoảng trống, bố cục cân bằng, sương và ánh trăng.

Không lạm dụng:

- Rồng.
- Đồng xu.
- Đèn đỏ kích thước lớn.
- Hoa văn vàng đặc.
- Hiệu ứng jackpot.

### 4.4. Một màn hình — một hành động chính

- Main Menu: Tiếp tục.
- Level Select: Chọn một level.
- Gameplay: Kéo current block.
- Result: Sang màn tiếp theo.

Secondary action luôn nhỏ và ít tương phản hơn primary action.

---

## 5. Information architecture

```text
Khởi động
   ↓
Main Menu
   ├── Tiếp tục → Gameplay
   ├── Chọn màn → Level Select
   └── Cài đặt

Level Select
   ├── Chọn cổng → Level Preview
   ├── Chơi → Gameplay
   └── Quay lại → Main Menu

Gameplay
   ├── Hoàn thành → Result → Màn tiếp theo
   ├── Hết chỗ → Retry
   ├── Pause
   └── Help
```

Không cần một màn Level Intro dài trước mọi level. Tên, mục tiêu và bài học đã được preview trong cổng. Chỉ tutorial mới hiện một instruction ngắn trên board.

---

## 6. Design tokens

### 6.1. Color

| Token | Giá trị | Vai trò |
|---|---|---|
| `ink-950` | `#0E1814` | Nền tối nhất |
| `ink-900` | `#14221C` | Modal/header |
| `bamboo-900` | `#182B21` | Nền vườn trúc |
| `bamboo-700` | `#2D4936` | Tre trung tính |
| `felt` | `#153027` | Mặt board |
| `cell` | `#0F251E` | Ô board |
| `wood-900` | `#2B190F` | Gỗ tối |
| `wood-700` | `#51321F` | Cổng và panel |
| `wood-500` | `#795031` | Button phụ |
| `brass` | `#A87A3C` | Viền đồng cổ |
| `ivory` | `#FFF8E8` | Tile và nội dung sáng |
| `paper` | `#F1E4CA` | Card giấy |
| `text-primary` | `#F7EEDC` | Text chính |
| `text-secondary` | `#CBBDA5` | Text phụ |
| `jade` | `#78B991` | Primary, Match, hoàn thành |
| `jade-dark` | `#37694B` | Button pressed |
| `gravity` | `#D5A64E` | Gravity preview |
| `danger` | `#DE746B` | Không còn chỗ/lỗi |
| `focus` | `#A9D9C2` | Focus accessibility |

### 6.2. Typography

- Logo/tên chapter: serif hỗ trợ tiếng Việt.
- UI, số, hướng dẫn: sans-serif.
- Không dùng thư pháp cho text chức năng.

| Style | Mobile |
|---|---:|
| Logo | 34–40 px |
| Chapter title | 24–28 px |
| Screen title | 22–24 px |
| Level title | 17–18 px |
| Body/Button | 16–18 px |
| Caption | 14 px |
| Goal number | 22–24 px |

### 6.3. Shape và depth

- Radius panel: 16 px.
- Radius button: 12–14 px.
- Radius tile: theo asset tile, không dùng radius quá tròn.
- Shadow lớn chỉ dùng cho gate/modal.
- Shadow nhỏ dùng để biểu đạt tile trên đè tile dưới.
- Border 1 px màu đồng cổ hoặc ivory có opacity thấp.

### 6.4. Touch target

- Button/icon tối thiểu 48×48 px.
- Primary CTA cao 52–56 px.
- Level gate có hit area tối thiểu 168×120 px.
- Current block có vùng pickup tối thiểu 80×80 px.

---

## 7. Main Menu specification

### 7.1. Bố cục

```text
┌─────────────────────────────┐
│                       [⚙]   │
│                             │
│       MAHJONG × BLOCK       │
│      Tĩnh tâm · Xếp khối    │
│                             │
│        [NGUYỆT MÔN]         │
│       cổng tre hai cánh     │
│                             │
│      [TIẾP TỤC MÀN 6]       │
│        Chọn màn             │
└─────────────────────────────┘
```

### 7.2. Background

- Vườn trúc xanh mực, tương phản thấp.
- Ánh trăng hoặc vùng sáng dịu phía sau mái cổng.
- Sương chuyển động rất chậm; tắt khi Reduced Motion.
- Không dùng texture gỗ toàn màn hình.

### 7.3. Logo

- `MAHJONG × BLOCK` giữ nguyên tên.
- Dòng kỹ thuật `Floor-only Queue · Gravity Cascade` được bỏ khỏi UI người chơi.
- Tagline gợi ý: `Tĩnh tâm · Xếp khối · Khơi mở`.
- Không hiển thị `FINAL CORE 24K` trong giao diện sản phẩm; version chỉ nằm trong Settings/About.

### 7.4. Gate interaction

**First visit**

1. Hint: `Chạm cổng để bước vào`.
2. Chạm gate.
3. Hai cánh mở trong 500–650 ms.
4. CTA xuất hiện sau 250 ms.

**Returning player**

- Gate mở sẵn khoảng 70%.
- Primary CTA: `TIẾP TỤC MÀN N`.
- Secondary text button: `Chọn màn`.
- Không bắt mở cổng lại nếu người chơi vừa quay về từ gameplay.

### 7.5. Đèn lồng

- Giữ hai đèn nhỏ như accent.
- Giảm glow đỏ khoảng 50% so với hiện tại.
- Đèn không pulse liên tục.
- Có thể rung rất nhẹ khi cổng mở.

### 7.6. Settings button

- Tăng từ 34×34 lên tối thiểu 48×48 px.
- Dùng icon line-art đồng bộ, không emoji.
- Giữ safe-area ở góc trên phải.

---

## 8. Level Select specification

### 8.1. Header

```text
┌─────────────────────────────┐
│ ‹   CHƯƠNG 2 · TRÀ THẤT     │
│     6/10 màn hoàn thành     │
└─────────────────────────────┘
```

- Có Back rõ ràng ở trái.
- Tên chapter thay cho việc lặp lại logo lớn.
- Progress ngắn, không dùng điểm hoặc sao.
- Header có thể sticky nhưng không che level node.

### 8.2. Path

Giữ đường dọc và các gate xen kẽ trái–phải.

Cải tiến:

- Path là đá lát hoặc dây đồng mảnh, không dùng đường chấm đơn giản.
- Mỗi chapter có một landmark: hồ sen, trà thất, Nguyệt Môn, núi mực.
- Khoảng cách node đủ lớn để mỗi gate có vùng chạm thoải mái.
- Auto-scroll tới màn hiện tại khi vào Level Select.

### 8.3. Trạng thái gate

#### Completed

- Cổng mở.
- Có con dấu ngọc nhỏ.
- Hiển thị tên level và goal đã hoàn thành.
- Không dùng ba sao.

#### Current

- Cổng tự mở.
- Ánh sáng ngà từ bên trong.
- Primary CTA `CHƠI` hoặc `TIẾP TỤC`.
- Đây là node có độ tương phản cao nhất.

#### Unlocked, not played

- Cổng đóng nhưng sáng rõ.
- Chạm để mở preview.
- Có chuyển động tre/gió rất nhẹ, không glow nhấp nháy.

#### Locked

- Cổng bị chặn bằng thanh gỗ/dây thừng.
- Vẫn giữ màu vật liệu, chỉ giảm brightness nhẹ.
- Text: `Hoàn thành Màn N để mở`.
- Chạm có phản hồi gỗ khựng nhẹ và toast, không rung mạnh.

### 8.4. Gate preview

Sau khi mở gate:

```text
MÀN 12 · LỘ MẶT TRÚC
[Sách 1] [Vạn 3] [Đồng 5]
Ghép bất kỳ 2 trong 3 loại

[CHƠI]
```

- Tên level 17–18 px.
- Goal 15–16 px.
- Nếu goal dùng tile ID, hiển thị portrait tile thay vì chỉ text.
- Chỉ một gate được mở tại một thời điểm.
- Màn current được mở sẵn để giảm một lần chạm.

### 8.5. Chapter transition

Sau mỗi 10–15 level:

- Path đi qua một landmark.
- Palette và background thay đổi nhẹ.
- Core UI, kích thước gate và state không đổi.

Chapter gợi ý:

1. Vườn Trúc — Match và same-layer.
2. Trà Thất — current/next và dựng trạm.
3. Nguyệt Môn — target bị chôn.
4. Sơn Thủy Mặc — nhiều trạm và cascade mastery.

---

## 9. Gameplay specification cho final core 24K-1

### 9.1. Bố cục

```text
┌─────────────────────────────┐
│ ‹  Màn 12 · Lộ Mặt Trúc  ‖ │
│ [Target A] [Target B] [C]   │
│      MỤC TIÊU 2/3           │
├─────────────────────────────┤
│                             │
│          BOARD 6×6          │
│                             │
├─────────────────────────────┤
│ RƠI → GHÉP → LỘ → GHÉP      │
├─────────────────────────────┤
│  KHỐI HIỆN TẠI    TIẾP THEO │
│  [block lớn]       [preview] │
└─────────────────────────────┘
```

### 9.2. Loại bỏ UI legacy

Không hiển thị trong final UI:

- Điểm.
- Khay chờ.
- Đổi khối.
- Xả quân.
- Ba lựa chọn block.
- Footer tên prototype.

### 9.3. HUD

- Header một hàng: Back, tên level, Pause.
- Goal card ngay dưới header.
- Help nằm trong Pause hoặc button nhỏ nhưng đạt 48×48 px.
- Không dùng ba box nhỏ cạnh nhau như prototype cũ.

### 9.4. Board và hai tầng

- Tile đơn tầng dưới nằm giữa cell.
- Khi stack có hai tile:
  - tile trên nằm trái–trên;
  - tile dưới dịch phải–dưới;
  - cả hai nằm hoàn toàn trong cell;
  - tile dưới còn lộ 60–70% bề rộng;
  - tile dưới không bị giảm opacity hoặc saturation.
- Bóng đổ và vị trí là tín hiệu chính về tầng.
- Không dùng label `TOP`, `BOTTOM`, số tầng hoặc viền màu dày.

### 9.5. Current và Next

- Chỉ một current block được kéo.
- Next block nhỏ hơn current khoảng 22–28%.
- Next vẫn phải đọc rõ tile art.
- Current có vùng pickup lớn; không bắt người chơi kéo chính xác trên tile nhỏ.

### 9.6. Drag preview

- Ghost block nằm cao hơn ngón tay khoảng một cell.
- Preview cho từng cell biết vị trí cuối sau gravity.
- Cell xuống nền: glow hổ phách ở đáy.
- Cell nằm trên support: tile đỡ dịch phải–dưới và xuất hiện bóng depth.
- Cặp Match hợp lệ: halo ngọc bích.
- Cùng mặt nhưng khác tầng: không halo.
- Drop invalid: ghost xám/đỏ dịu và snap về tray.

### 9.7. Resolve feedback

```text
ĐẶT → RƠI → GHÉP CÙNG TẦNG → LỘ TILE → GHÉP TIẾP
```

| Pha | Thời lượng |
|---|---:|
| Snap block | 120–180 ms |
| Gravity | 320–420 ms |
| Hold trước Match | 140–180 ms |
| Match dissolve | 300–360 ms |
| Reveal/recenter | 360–440 ms |
| Nghỉ trước wave 2 | 160–200 ms |

Không resolve toàn bộ trong một flash. Người chơi phải thấy tile nào rơi, tile nào Match và tile nào vừa được lộ.

### 9.8. Tutorial feedback

Nếu người chơi thử tạo cặp cùng mặt nhưng khác tầng ở các level dạy luật:

- Hai tile wiggle ngược hướng trong 180–220 ms.
- Toast: `Cùng mặt, nhưng khác tầng.`
- Không hiện lại sau khi người chơi đã chứng minh hiểu luật nhiều lần.

---

## 10. Goal UI

Mỗi level chỉ dùng một goal component tại cùng vị trí.

### Pair Goal

```text
CẶP  2 / 4
```

Dùng cho tutorial hoặc level thở.

### Target Face Set

```text
[Sách 1 ✓] [Vạn 3 ○] [Đồng 5 ✓]
GHÉP 2 TRONG 3 LOẠI
```

- Tile portrait lớn.
- Khi hoàn thành, portrait đóng con dấu ngọc.
- Match cùng loại lần nữa vẫn có feedback nhưng không tăng số loại.

### Buried Target

```text
[Target A] [Target B] [Target C]
GIẢI PHÓNG 2 / 3
```

- Target trên board có đế khảm đồng/gỗ.
- Dấu target còn nhìn được khi tile bị che.
- Không dùng icon khóa vì tile target không phải blocker.

### Reveal Energy

```text
NĂNG LƯỢNG LỘ TILE  ◆ ◆ ◇
```

- Chỉ Match sau Reveal nạp meter.
- Feedback phải chỉ rõ meter tăng từ tile vừa lộ.

---

## 11. Overlays và system screens

### 11.1. Settings

Dùng panel giấy ngà hoặc gỗ tối, không dùng modal bóng đen nặng.

Nội dung:

- Âm thanh.
- Nhạc.
- Rung.
- Tốc độ hiệu ứng: Thường / Nhanh.
- Giảm chuyển động.
- Ngôn ngữ nếu có.
- Xóa tiến trình nằm trong khu vực `Dữ liệu`, cần confirm hai bước.
- Version/About ở cuối, không hiện trên Main Menu.

### 11.2. Pause

- Tiếp tục.
- Chơi lại.
- Hướng dẫn.
- Âm thanh/Rung.
- Chọn màn.

Primary action là `TIẾP TỤC`.

### 11.3. Help

Không dùng đoạn văn dài. Hiển thị ba mini-animation:

1. Mỗi cell rơi độc lập.
2. Cùng mặt + cùng tầng + nối cạnh mới Match.
3. Match mái làm lộ và kích hoạt cặp dưới.

### 11.4. Win

```text
HOÀN THÀNH
[Con dấu ngọc]
Đã giải phóng 3 loại tile
Cascade tốt nhất: 2

[MÀN TIẾP THEO]
Chơi lại · Chọn màn
```

- Không pháo hoa hoặc shower đồng xu.
- Dùng lá trúc, mực loang hoặc con dấu ngọc rất nhẹ.
- Số lượt hiển thị trung tính, không chấm ba sao.

### 11.5. Không còn nước đi

```text
KHÔNG CÒN VỊ TRÍ HỢP LỆ
Lần sau hãy giữ một vùng phẳng cho khối tiếp theo.

[THỬ LẠI]
Chọn màn
```

- Không phủ toàn màn bằng màu đỏ.
- Hint dựa trên state nếu có thể.
- Nếu thêm Undo, không biến Undo thành vật phẩm trả phí ở giai đoạn core validation.

---

## 12. Motion và sound direction

### 12.1. Motion principles

- `ease-out` cho mở cổng và Reveal.
- `ease-in` cho gravity.
- Không có vật thể decorative chuyển động nhanh.
- Một thời điểm chỉ có một vùng attention chính.
- Reduced Motion thay animation dài bằng fade/snap ngắn.

### 12.2. Gate motion

- Mở gate: 500–650 ms.
- CTA fade/slide: bắt đầu sau 250–300 ms.
- Gate current ở Level Select mở tự động với tốc độ 400–500 ms.
- Gate locked chỉ nảy 2–3 px rồi trở về, không shake mạnh.

### 12.3. Sound palette

- Gate: tre/gỗ trượt.
- UI button: tiếng gỗ gõ nhỏ.
- Match: tiếng ngọc trong.
- Reveal: giấy/gỗ trượt.
- Cascade wave 2: tăng cao độ nhẹ.
- Win: chuông gió hoặc mõ gỗ mềm.
- Không dùng coin sound hoặc jackpot fanfare.

---

## 13. Content design

### 13.1. Ngôn ngữ player-facing

Thay các dòng kỹ thuật:

| Hiện tại | Đề xuất |
|---|---|
| `Floor-only Queue · Gravity Cascade` | `Tĩnh tâm · Xếp khối · Khơi mở` |
| `FINAL CORE 24K` | Ẩn khỏi UI, đưa vào About |
| `Level 4/10` | `Màn 4 · Hai Độ Cao` |
| `Goal 6 pairs` | `Ghép đủ 6 cặp` hoặc goal cụ thể |
| `CHƠI` ở mọi nơi | `TIẾP TỤC`, `BẮT ĐẦU`, `CHƠI LẠI` theo ngữ cảnh |

### 13.2. Tên level

Tên level nên mô tả cảm giác hoặc bài học bằng hình ảnh ngắn:

- Cặp Đầu Tiên.
- Hai Độ Cao.
- Mở Mái Trúc.
- Dòng Chảy Đôi.
- Giữ Chỗ Cho Ngày Mai.
- Hai Cổng, Một Đường.
- Lộ Mặt Ngọc.

Không để tên level chứa thuật ngữ kỹ thuật như `trigger`, `chain length`, `floor-only`.

---

## 14. Responsive và accessibility

### 14.1. Mobile baseline

Thiết kế ưu tiên 360×800 đến 430×932 px.

- Nội dung dùng `max-width: 440px` như hiện tại là phù hợp.
- Dùng safe-area trên/dưới.
- Level Select được scroll dọc tự nhiên.
- Gameplay không scroll trong lượt chơi.
- Tránh đặt goal và board sát mép thiết bị.

### 14.2. Landscape/tablet

- Không kéo giãn board quá lớn.
- Gameplay có thể chia board trái, current/next phải.
- Main Menu và Level Select giữ cột trung tâm tối đa khoảng 520 px.

### 14.3. Accessibility

- Text contrast tối thiểu 4.5:1.
- Không dựa riêng vào đỏ/xanh hoặc opacity.
- Focus ring rõ cho keyboard.
- Button có label thật, không chỉ emoji.
- Screen reader đọc: màn, goal, current/next, hàng/cột, mặt tile, tầng và trạng thái bị che.
- Không vô hiệu hóa pinch zoom trên Help/Settings.
- Có Reduced Motion và điều chỉnh tốc độ.

---

## 15. Mapping với cấu trúc HTML hiện tại

| Selector hiện tại | Vai trò giữ lại | Hướng cải tiến |
|---|---|---|
| `#screen-menu` | Main Menu | Nền vườn trúc, hierarchy mới |
| `#gate` | Cổng chính | Giữ animation, thêm returning state |
| `#gate-cta` | CTA trong cổng | Continue là primary, Chọn màn secondary |
| `#btn-settings` | Settings | Tăng 48×48, icon đồng bộ |
| `#screen-levelselect` | Chọn màn | Giữ path, thêm header/back/chapter |
| `#path` | Đường level | Đá lát/đường đồng, chapter landmarks |
| `.gate` | Level node | Bốn state vật lý, text lớn hơn |
| `.gate-reveal` | Level preview | Portrait goal, CTA rõ |
| `.lock-badge` | Locked state | Thay emoji bằng thanh gỗ/dây thừng |
| `#screen-game` | Gameplay | Thay HUD legacy bằng UI 24K-1 |
| `#hud` | Goal/header | Một goal chính, bỏ score |
| `#khay-wrap` | Legacy | Xóa khỏi final core |
| `#tray-wrap` | Supply | Chuyển thành Current + Next |
| `#tools` | Legacy booster | Xóa khỏi core validation |
| `#ov` / `#ovcard` | Overlay | Style giấy/gỗ và hierarchy mới |

Không nên tiếp tục thêm các lớp override CSS chồng lên những screen cũ. Khi implement visual pass, nên gom token và component state thành một nguồn style thống nhất để tránh Main Menu, Level Select và Gameplay có ba phiên bản `body`, `.btn` và palette khác nhau.

---

## 16. Ưu tiên triển khai

### P0 — Readability và đồng bộ core

1. Thay Gameplay HUD theo 24K-1; bỏ UI legacy.
2. Làm rõ stack hai tầng và drag preview.
3. Tăng toàn bộ text/touch target.
4. Thay technical copy bằng player-facing copy.
5. Thêm Back và trạng thái current rõ ở Level Select.

### P1 — Visual polish

1. Chuyển palette sang xanh mực + gỗ + ngọc.
2. Giảm đỏ/vàng/glow.
3. Thay nền gỗ toàn màn bằng vườn trúc tối.
4. Thiết kế state gate completed/current/unlocked/locked.
5. Đồng bộ modal, button và icon.

### P2 — Delight và accessibility

1. Returning-player gate state.
2. Auto-scroll level current.
3. Gate/Match/Reveal sound palette.
4. Reduced Motion và tốc độ animation.
5. Chapter landmark và transition.

---

## 17. Acceptance checklist

### Main Menu

- [ ] Concept cổng tre vẫn được nhận ra ngay.
- [ ] Người chơi cũ vào tiếp level trong tối đa một lần chạm chính.
- [ ] Không còn dòng kỹ thuật hoặc tên prototype.
- [ ] Settings đạt vùng chạm 48×48 px.
- [ ] Tile/game title nổi bật hơn decoration.

### Level Select

- [ ] Tự cuộn tới màn hiện tại.
- [ ] Completed, current, unlocked và locked phân biệt không chỉ bằng màu.
- [ ] Màn current được mở sẵn.
- [ ] Tên và goal level đọc được ở khoảng cách tay cầm điện thoại.
- [ ] Có Back rõ ràng.
- [ ] Cổng khóa dùng vật thể cùng art direction, không dùng emoji.

### Gameplay

- [ ] Không còn Score, Khay chờ, Đổi khối hoặc Xả quân.
- [ ] Chỉ có Current và một Next.
- [ ] Tile trên/dưới đọc được mà không dùng nhãn tầng.
- [ ] Không tile nào lấn qua cell khác.
- [ ] Preview cho biết từng cell sẽ nằm ở tầng nào.
- [ ] Cùng mặt khác tầng không nhận feedback Match.
- [ ] Gravity, Match và Reveal được nhìn thấy theo đúng thứ tự.

### Casual 35+

- [ ] Body text tối thiểu 16 px, caption tối thiểu 14 px.
- [ ] Touch target tối thiểu 48×48 px.
- [ ] Không phụ thuộc vào màu hoặc opacity.
- [ ] Animation mặc định đủ chậm để hiểu cascade.
- [ ] Có Reduced Motion và tốc độ nhanh.

### Art direction

- [ ] Tile là vật thể sáng nhất.
- [ ] Tre/gỗ chỉ nằm trên vật thể có ý nghĩa.
- [ ] Đỏ và vàng chỉ là accent.
- [ ] Không có cảm giác casino hoặc jackpot.
- [ ] Main Menu, Level Select và Gameplay cùng một hệ token/component.


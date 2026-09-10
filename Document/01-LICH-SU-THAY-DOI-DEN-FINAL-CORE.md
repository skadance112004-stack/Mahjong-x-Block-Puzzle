# Mahjong × Block — Lịch sử thay đổi đến Final Core

**Trạng thái:** Core gameplay đã chốt  
**Prototype đại diện:** [24K — Floor-only Queue × Gravity](digest-layers-prototypes/24K-lower-layer-gravity.html)  
**Ngày tổng hợp:** 20/08/2026

## 1. Mục đích tài liệu

Tài liệu này ghi lại quá trình dự án đi từ một yêu cầu rộng — “làm game Mahjong × Block trong một tháng, một người, HTML, khoảng 50 màn” — đến core gameplay cuối cùng.

Đây là **decision history**, không phải bản sao hội thoại. Mỗi giai đoạn tập trung vào:

- Giả thuyết thiết kế được kiểm tra.
- Prototype đã làm.
- Điều học được.
- Phần được giữ, sửa hoặc loại bỏ.
- Lý do chuyển sang bước tiếp theo.

## 2. Điểm xuất phát và ràng buộc

Dự án bắt đầu với các ràng buộc chính:

- Một người thực hiện trong khoảng một tháng.
- Công nghệ chính: HTML, CSS và JavaScript.
- Playable build phải chạy trên trình duyệt mobile và có thể đóng gói trong một file HTML tự chứa.
- Mục tiêu sản xuất dài hạn: khoảng 50 level.
- Mahjong và Block phải cùng nằm trong **một core loop**, không phải hai minigame nối tiếp nhau.
- Người chơi mục tiêu là casual, về sau được thu hẹp thành nhóm trên 35 tuổi.
- Ưu tiên ít loại thao tác; mặc định chỉ dùng kéo–thả.
- Không phụ thuộc hiểu biết về luật Mahjong truyền thống.

Kế hoạch ban đầu chia bốn Sprint:

1. Chốt concept và prototype core.
2. Làm vertical slice, tutorial và game flow.
3. Sản xuất level, đường cong độ khó và playtest.
4. Feature freeze, QA, polish và đóng gói.

Quá trình trong tài liệu này chủ yếu là phần rủi ro nhất của Sprint 1: tìm và khóa core gameplay.

## 3. Tiêu chí đánh giá được hình thành trong quá trình

Các concept dần được đánh giá bằng năm câu hỏi:

1. **Removal Test:** bỏ Mahjong hoặc bỏ Block thì gameplay có sụp đổ rõ ràng không?
2. **Một quyết định hay hai công đoạn:** người chơi có giải đồng thời bài toán identity và không gian, hay chỉ làm A để nhận B rồi làm B?
3. **Action load:** có giữ được một thao tác chính là kéo–thả không?
4. **Cognitive load:** người chơi casual có dự đoán được kết quả mà không mô phỏng quá nhiều hệ thống không?
5. **Level-design capacity:** core có các trục độ khó mịn, đủ để tạo nhiều level mà không phải liên tục thêm feature không?

Một bài học xuyên suốt là: **coupling về logic chưa đủ**. Hai hệ thống có thể truyền dữ liệu cho nhau nhưng vẫn tạo cảm giác như một pipeline cứng. Coupling tốt phải xuất hiện ngay trong giá trị của một nước đi.

---

## 4. Giai đoạn 1 — Các hybrid boardgame đầu tiên

### 4.1 Bộ concept Pair & Drop / Patch / Flip / Route / Box

Những concept đầu tiên giữ cấu trúc Mahjong Puzzle quen thuộc:

`Chọn Mahjong lộ → vào khay 4 → Match 2 → nhận một quân/shape/action → dùng trên board → mở layer Mahjong mới`

Năm prototype gồm:

- **Pair & Drop:** pair tạo block màu; thả theo cột và nối ba.
- **Pair & Patch:** pair tạo polyomino; đóng hàng/cột để mở Mahjong stack.
- **Pair & Flip:** pair tạo stone ngang/dọc; kẹp và lật quân để mở stack.
- **Pair & Route:** pair tạo mảnh đường; nối tuyến tới stack để gỡ layer.
- **Pair & Box:** pair tạo cạnh; đóng box để mở Mahjong.

### Điều học được

- Tác động Mahjong → Block và Block → Mahjong đã tồn tại trên giấy.
- Tuy nhiên loop bị chia thành hai pha rõ: **chơi Mahjong để lấy công cụ**, sau đó **chơi boardgame bằng công cụ đó**.
- Người chơi phải chuyển mô hình tư duy giữa hai board.
- Số thao tác tăng: chọn tile, quản khay, chọn/đặt quân, đôi khi xoay hoặc chọn hướng.

### Quyết định

Không chọn các concept này làm core. Chúng có thể là nguồn tham khảo về interaction, nhưng không đạt mục tiêu một thao tác và một quyết định thống nhất.

## 5. Giai đoạn 2 — Bốn prototype coupling logic

### 5.1 Cặp Hóa Khối

`Đặt Block → clear line → thu tile → Match 2/3/4 → rèn shape mới → dùng shape mới`

- Match 2 tạo domino.
- Match 3 tạo L.
- Match 4 tạo 2×2.

**Điểm tốt:** Block quyết định thành phần pair; pair quyết định shape tương lai.  
**Vấn đề:** mapping “số tile → shape” là bảng công thức. Người chơi thường đi theo chuỗi designer soạn sẵn, ít emergence.

### 5.2 Cặp An Toàn

- Các tile cùng ID nối cạnh thành nhóm an toàn.
- Tile cô lập đi vào khay.

**Điểm tốt:** identity làm thay đổi hậu quả của cùng một shape.  
**Vấn đề:** khó đọc khi nhiều ID xuất hiện; adjacency dễ biến thành lớp tính toán phụ.

### 5.3 Khay Là Nhiên Liệu

- Tile trong khay trở thành resource cho hành động tiếp theo.

**Điểm tốt:** tạo chiều sâu kinh tế.  
**Vấn đề:** thêm currency và quyết định tiêu resource; quá nhiều cognitive tax cho casual.

### 5.4 Recipe Line

- Level yêu cầu thành phần pair cụ thể trong line.

**Điểm tốt:** dễ author level.  
**Vấn đề:** lời giải bị script và cứng; phù hợp hơn làm objective late-game chứ không phải core.

### Kết luận giai đoạn

Bốn bản này chứng minh rằng “A tạo B, B tạo A” vẫn có thể thiếu sức nặng. Dự án cần một luật tạo thay đổi trực tiếp lên topology board thay vì đổi sang resource hoặc recipe.

## 6. Giai đoạn 3 — Generation 2 và tìm emergence

Năm hướng mới mượn một verb từ boardgame cổ điển:

- **Pair & Sow:** pair được gieo lại board.
- **Pair & Tilt:** pair nghiêng board và tạo gravity.
- **Pair & Flip:** hai tile cùng ID kẹp và đồng hóa tile ở giữa.
- **Pair & Liberty:** placement thay đổi liberty; capture tạo tile trong khay.
- **Pair & Chain:** placement nối endpoint; đóng chain sinh endpoint mới.

### Điều tiến bộ

- Pair không còn chỉ là điểm hoặc currency.
- Mahjong trực tiếp đổi topology và trạng thái placement.
- Xuất hiện khả năng chain reaction và tình huống ngoài script.

### Lý do không chốt

- Nhiều concept cần thao tác phụ: chọn hướng sow/tilt, kéo pair trở lại board, chọn endpoint hoặc quản liberty.
- Player phải suy nghĩ ở hai trạng thái hoặc nhiều bước quá lâu.
- Pair & Liberty sâu nhưng không phù hợp target casual.
- Pair & Sow/Tilt có “đồ chơi” tốt nhưng làm loop dài và tăng action load.

### Quyết định quan trọng

Không cần dựa vào boardgame cổ điển. Ưu tiên cơ chế trực tiếp, ít luật, một drag, nhưng vẫn có chain reaction.

---

## 7. Giai đoạn 4 — Quay lại prototype Khay Tiêu Hóa

Prototype nguồn có hook:

`Đóng hàng/cột không làm tile biến mất ngay → tile đi vào khay → match để tiêu hóa → khay đầy thì thua`

### Vấn đề được xác định

- Mahjong chủ yếu là hệ xử lý rác sau Block Puzzle.
- Match làm giảm áp lực khay nhưng không đổi board đủ mạnh.
- Mixed-ID trong một block, nhiều loại meld và random rigging khiến lượng thông tin cao.
- Một phần tile vào khay, phần dư biến mất gây khó hiểu.

### Nguyên tắc giản lược

- Chuyển về Match 2.
- Tự động xử lý pair.
- Một thao tác kéo–thả.
- Không chọn pair, không reorder khay, không power-up, không timer.
- Forecast được giữ vì giúp người chơi dự đoán kết quả.

## 8. Giai đoạn 5 — 24A và 24B trên UI gốc

### 8.1 24A — Auto Selective Digestion

- Đóng line.
- Pair cùng ID tự tiêu hóa.
- Singleton quay lại đúng vị trí board.

**Giả thuyết:** người chơi sẽ dùng identity để điều khiển residue.  
**Kết quả thiết kế:** dễ hiểu hơn nhưng line-clear vẫn là trigger gián tiếp; Mahjong chưa tác động sâu tới topology.

### 8.2 24B — Overlap to Digest

- Block được đặt lên ô trống hoặc chồng lên tile cùng ID.
- Cell overlap cùng ID tạo pair và biến mất.
- Phần shape trên ô trống ở lại board.

**Giả thuyết:** một drag vừa xóa vừa xây.  
**Kết quả thiết kế:** coupling trực tiếp hơn, nhưng luật overlap cần forecast mạnh và có nguy cơ khó đọc khi shape lớn.

## 9. Giai đoạn 6 — Đưa layer Mahjong vào core

Ảnh tham chiếu Mahjong cổ điển gợi hai cấu trúc:

- **Bounded buffer:** khay 4 là nơi giữ “nợ cặp”.
- **Accessibility graph:** tile trên và tile hai bên quyết định tile nào được lấy.

Phân tích cho thấy nếu giữ đồng thời block-fit, line clear, tile identity, khay 4, layer và side-lock thì game sẽ thành feature soup. Vì vậy các prototype tách riêng câu hỏi.

### 9.1 24C — Bóc lớp theo line

- Clear line chỉ xử lý lớp trên.
- Pair bị bóc làm lộ tile dưới; singleton ở lại.

**Bài học:** layer dễ trở thành “HP nhiều lớp” nếu tile dưới không làm thay đổi quyết định.

### 9.2 24D — Khuôn Enzyme

- Kéo mask 1–3 ô qua các tile FREE.
- Toàn bộ mask phải hợp lệ.
- Tile vào khay 4 và auto-match.

**Bài học:** một drag và accessibility graph có tiềm năng, nhưng mask 1 ô làm các shape lớn trở thành tùy chọn không cần thiết; với bốn ID, khay 4 còn không thể overflow.

### 9.3 24E — Kho Block nhiều tầng

- Các nguồn polyomino nằm trong kho xếp tầng.
- Kéo block FREE lên board.
- Đóng line đưa tile vào khay và mở nguồn tiếp theo.

**Điểm được giữ về sau:** layer vật lý tạo preview nguồn và quan hệ “phá support → lộ/rơi phần trên”.

### 9.4 24F — Physical Overlap Supply

- Thay ký hiệu FREE/BLOCKED bằng chồng lấp vật lý.
- Block phía trước che block phía sau.

**Bài học:** che phủ phải được hiểu bằng hình học trực tiếp; label chỉ nên hỗ trợ, không gánh luật.

## 10. Giai đoạn 7 — Bỏ khay, Match trực tiếp trên board

### 10.1 24G — Board Match

- Hai block cùng Mahjong ID chạm cạnh thì Match 2 trên board.
- Không còn line clear hoặc khay chờ.

**Điểm tốt:** giảm một pha và một vùng chú ý.  
**Vấn đề:** kho nguồn và board vẫn giống hai hệ nối tiếp; board chưa tác động đủ vào cấu trúc nguồn.

### 10.2 24H — Roof on Board

- Toàn bộ block nhiều tầng nằm ngay trên board.
- Kéo mái khỏi chỗ cũ vừa làm lộ block dưới vừa tạo placement mới.
- Hai block cùng mặt, đang lộ và chạm cạnh sẽ Match.

**Đây là bước ngoặt:** layer, placement và Match cùng xuất hiện trong một quyết định kéo. 24H trở thành nền tảng để thử các core modifier tiếp theo.

## 11. Giai đoạn 8 — Thử các thay đổi chạm core

### 11.1 24I — Match 2+ / Bridge

- Block vừa thả có thể nối nhiều mate cùng ID.
- Cụm được nối bị tiêu hóa.

**Giá trị:** shape trở thành cầu nối.  
**Rủi ro:** nếu Match 3+ hiếm thì chỉ là combo add-on; nếu quá mạnh sẽ phá cả board trong một lượt.

### 11.2 24J — Self-built Roof

- Block có thể đặt trên nền hoặc trên bề mặt được support hoàn toàn.
- Người chơi tự dựng mái rồi kéo lại.

**Giá trị:** topology do người chơi tạo.  
**Rủi ro:** khó dự đoán, cross-layer ambiguity, setup có thể làm toàn bộ board nổ; không phù hợp mục tiêu dễ hiểu.

### 11.3 24L — Repeat Move × Same-layer Match

- Block lộ có thể kéo lại nhiều lần.
- Chỉ Match cùng tầng.
- Khi nhấc mái, tile dưới được preview; thả hợp lệ mới xác nhận.
- Chỉ block vừa kéo hoặc vừa lộ kích hoạt Match cục bộ.

**Bài học:** local resolution làm luật dễ giải thích hơn global scan, nhưng việc kéo lại block và quản nhiều block có thể làm trạng thái dài và khó đọc.

## 12. Giai đoạn 9 — 24K và gravity

### 12.1 24K phiên bản đầu

- Kéo polyomino mixed-ID.
- Sau khi thả, từng cell tự settle: ô trống xuống tầng dưới, ô có support nằm tầng trên.
- Chỉ tầng dưới được Match.
- Phá support làm tile trên rơi và có thể Match tiếp.
- Mục tiêu ban đầu là clear đủ số loại Mahjong.
- Nguồn ban đầu có ba lựa chọn block hữu hạn.

### Vấn đề phát hiện

- Người chơi có thể tự xây tầng trên, khiến cách settle của cùng một shape khó dự đoán.
- Một số lời giải thắng mà không cần tạo tile trên mới; mixed-height placement không thật sự thiết yếu.
- “Clear số loại” hướng người chơi tới checklist identity hơn là khoái cảm tạo cascade.
- Ba lựa chọn nguồn tăng scanning và làm queue kém định hướng.
- Visual tầng dưới bị tile trên che quá nhiều hoặc lấn sang cell bên cạnh.

## 13. Giai đoạn 10 — Khóa Final Core 24K

Final 24K được giản lược theo các quyết định sau.

### 13.1 Bỏ khả năng người chơi xây tầng trên

- Layer trên chỉ có trong layout level.
- Mọi cell của block kéo vào phải nằm trên **ô hoàn toàn trống ở tầng dưới**.
- Nếu footprint chạm ô đã có tile ở bất kỳ tầng nào, drop không hợp lệ.

Lợi ích:

- Kết quả placement dễ đọc.
- Gravity vẫn quan trọng thông qua support preset.
- Level designer kiểm soát chain và solvability tốt hơn.

### 13.2 Giữ polyomino mixed-ID như 24K cũ

- Mỗi lượt kéo một khối Block-Blast gồm ít nhất hai tile.
- Các cell trong cùng khối có thể mang Mahjong ID khác nhau.
- Shape được giữ cứng trong lúc kéo.
- Sau khi đặt, từng cell là một tile độc lập để Match hoặc rơi.

Đây là điểm nối trực tiếp giữa hai hệ:

- Shape quyết định footprint và vị trí các identity.
- Identity quyết định cell nào Match.
- Match quyết định support nào mất.
- Support mất quyết định tile nào rơi và trạng thái board tiếp theo.

### 13.3 Queue một lựa chọn + một preview

- Chỉ khối hiện tại được kéo.
- Khối tiếp theo được hiển thị để lập kế hoạch.
- Queue deterministic và lặp, không giới hạn số khối hoặc lượt.
- Không quay lại bộ ba lựa chọn để giảm scanning.

### 13.4 Điều kiện thắng theo số cặp

- Thắng khi đạt `pairGoal`.
- Không cần clear toàn board.
- Không còn mục tiêu “đủ số loại”.
- Không có timer hoặc move limit.

### 13.5 Match và gravity

- Chỉ tile tầng dưới (`z = 0`) được Match.
- Hai tile phải cùng ID và chạm cạnh.
- Tile tầng trên không Match với nhau hoặc với tầng dưới.
- Support dưới vẫn có thể Match dù đang bị che.
- Khi support mất, tile trên rơi xuống.
- Tile vừa rơi trở thành active và có thể tạo nhịp Match tiếp theo.

### 13.6 Mười level kiểm chứng

Mười level tăng dần từ:

- Ba loại tile và một chain dễ đọc.
- Hai trạm rơi.
- Chain dài/ngắn.
- Hai chain song song.
- Domino mixed-ID kích hoạt hai trigger.
- Shape liên tiếp cần chừa footprint.
- Ba hướng gravity và mục tiêu 12 cặp.

Mọi level có lời giải mẫu, dùng gravity thật và không cần player-created upper tile.

### 13.7 Visual final

- Mỗi stack nằm gọn trong một cell; không lấn sang tile bên cạnh.
- Tile dưới gần full-size.
- Tile trên nhỏ hơn và nằm ở góc dưới-phải.
- Góc trên-trái, rank và màu suit thật của tile dưới luôn lộ.
- Nền cell, bóng đổ và animation củng cố cảm giác độ sâu.

---

## 14. Bảng quyết định cuối

| Thành phần | Quyết định | Lý do |
|---|---|---|
| Input | Một drag–drop | Giảm action load |
| Board | 6×6, tối đa hai tầng preset | Dễ đọc, author được chain |
| Player-created roof | Loại bỏ | Settle khó dự đoán |
| Source | Một current + một next | Có planning nhưng ít scanning |
| Queue | Deterministic, lặp vô hạn | Không phụ thuộc random, không move limit |
| Piece | Polyomino ≥2 cell, có thể mixed-ID | Giữ giá trị Block và Mahjong trong cùng drag |
| Line clear | Loại bỏ | Không còn là core cần thiết |
| Khay | Loại bỏ | Giảm một pha và một vùng chú ý |
| Match | Match 2 cùng ID, chạm cạnh, tầng dưới | Luật ngắn, trực tiếp |
| Upper match | Cấm | Giữ gravity là điều kiện để tile trên hoạt động |
| Cascade | Support mất → upper rơi → Match tiếp | Hook và payoff chính |
| Win | Phá đủ số cặp | Dễ đọc, không bắt clear-all |
| Timer/move limit | Không dùng trong core | Giữ cảm giác casual, ít áp lực |
| Power-up/booster | Không dùng | Tránh add-on và feature creep |

## 15. Những nguyên tắc không nên đảo ngược khi bước sang production

1. Không thêm thao tác thứ hai nếu cùng vấn đề có thể giải bằng drag và forecast.
2. Không cho player xây tầng trên trở lại nếu chưa chứng minh được readability.
3. Không dùng booster để bù cho level khó hoặc queue không tốt.
4. Không làm cascade toàn board từ các cặp tĩnh không liên quan; kết quả phải quy được về block vừa đặt hoặc tile vừa rơi.
5. Không tăng độ khó chủ yếu bằng cách thêm luật mới.
6. Không che identity tầng dưới đến mức người chơi phải nhớ hoặc đoán.
7. Không đánh đồng “queue vô hạn” với “không thể thua”: board vẫn có thể hết footprint hợp lệ.

## 16. Trạng thái hiện tại và phần còn phải kiểm chứng

Core đã được khóa ở mức prototype hệ thống, nhưng chưa đồng nghĩa product đã hoàn thiện. Các giả thuyết cần playtest với người chơi trên 35 tuổi:

- Có nhận ra đúng tile tầng dưới trong dưới hai giây không?
- Có hiểu block mới chỉ đặt được ở tầng dưới không?
- Có quy cascade về placement của mình hay cảm thấy game tự chạy?
- Preview một khối tiếp theo có đủ cho planning nhưng không gây áp lực không?
- Sau vài level, người chơi có chủ động nhắm support để tạo cascade không?
- Đường cong 10 level hiện tại có quá nhiều lời giải “một placement đúng” hay không?

Nếu các câu hỏi này chưa đạt, ưu tiên sửa level setup, forecast và visual trước khi thêm bất kỳ feature mới nào.


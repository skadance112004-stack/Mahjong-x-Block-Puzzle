# So sánh Core Mechanics: Mahjong và Block Puzzle

## 1\. Phạm vi so sánh

Tài liệu này tập trung vào **core mechanics**: hành động người chơi lặp lại nhiều nhất, quy tắc tạo match/clear, giới hạn không gian, điều kiện thắng/thua và loại quyết định mà game yêu cầu.

Hình ảnh quân Mahjong, skin bàn cờ, trang trí phòng, cốt truyện, bộ sưu tập và meta progression không được xem là core mechanic.

“Game Mahjong” trên thị trường casual thực tế gồm nhiều dòng khác nhau. Chúng có hình ảnh tương tự nhưng core gameplay không giống nhau:

* Mahjong truyền thống.
* Mahjong Solitaire.
* Tile Match / Triple Tile.
* Mahjong Connect.

Block Puzzle cũng có hai nhánh chính:

* Falling Block, tiêu biểu là Tetris.
* Grid Placement, tiêu biểu là 1010 hoặc Block Blast.

Prototype `01-mahjong-only` hiện gần với **Grid Placement kết hợp Color Match**, không phải Mahjong truyền thống.

## 2\. Core loop của từng dòng Mahjong

### 2.1. Mahjong truyền thống

**Core loop:** Rút tile → đánh giá tay bài → tạo meld hoặc bỏ tile → đọc hành động đối thủ → hoàn thiện tay thắng.

|Thành phần|Cơ chế|
|-|-|
|Hành động chính|Rút, bỏ, chiếm tile và tạo bộ|
|Điều kiện kết hợp|Pair, triplet và sequence theo luật|
|Không gian quyết định|Tay bài của người chơi|
|Thông tin|Kết hợp thông tin ẩn và công khai|
|Kỹ năng chính|Xác suất, ghi nhớ, đọc đối thủ và quản lý rủi ro|
|Điều kiện thắng|Hoàn thành cấu trúc tay bài hợp lệ|

**Điểm mạnh:** Chiều sâu chiến thuật cao, nhiều quyết định có ý nghĩa.

**Điểm yếu với casual hybrid:** Luật khó học, lượt chơi dài và cần nhiều kiến thức nền. Không phù hợp để ghép trực tiếp với Block Puzzle nếu mục tiêu là mechanic đơn giản.

### 2.2. Mahjong Solitaire

**Core loop:** Quan sát tile đang mở → tìm hai tile giống nhau → xóa cặp → làm lộ tile mới → lặp lại.

|Thành phần|Cơ chế|
|-|-|
|Hành động chính|Chọn hai tile giống nhau|
|Điều kiện kết hợp|Hai tile cùng loại và đều đang “mở”|
|Không gian quyết định|Bố cục tile nhiều lớp|
|Tài nguyên chính|Số cặp còn khả dụng|
|Kỹ năng chính|Quan sát, ưu tiên thứ tự mở khóa và tránh deadlock|
|Điều kiện thắng|Xóa toàn bộ tile|
|Điều kiện thua|Không còn cặp hợp lệ|

Core tension đến từ việc **cặp nào nên được xóa trước**, không chỉ từ khả năng nhìn thấy hai hình giống nhau.

### 2.3. Tile Match / Triple Tile

**Core loop:** Chọn tile đang mở → đưa vào khay → ba tile giống nhau tự clear → tiếp tục mở bố cục.

|Thành phần|Cơ chế|
|-|-|
|Hành động chính|Chọn một tile|
|Điều kiện kết hợp|Ba tile cùng loại trong khay|
|Không gian quyết định|Bố cục tile và khay chứa giới hạn|
|Tài nguyên chính|Slot trống trong khay|
|Kỹ năng chính|Ghi nhớ, quản lý khay và tính thứ tự mở tile|
|Điều kiện thắng|Xóa toàn bộ tile|
|Điều kiện thua|Khay đầy trước khi tạo được bộ ba|

Dòng này dễ tiếp cận hơn Mahjong Solitaire vì tile không cần được chọn thành cặp ngay lập tức. Tuy nhiên, khay chứa tạo thêm một hệ thống quản lý không gian thứ hai.

### 2.4. Mahjong Connect

**Core loop:** Tìm hai tile giống nhau → kiểm tra đường nối hợp lệ → xóa cặp → mở thêm đường nối.

|Thành phần|Cơ chế|
|-|-|
|Hành động chính|Chọn một cặp|
|Điều kiện kết hợp|Giống nhau và có thể nối bằng đường đi hợp lệ|
|Không gian quyết định|Vị trí tile và khoảng trống trên bàn|
|Kỹ năng chính|Quét hình ảnh và nhận diện đường đi|
|Điều kiện thắng|Xóa toàn bộ tile|
|Điều kiện thua|Hết thời gian hoặc không còn cặp hợp lệ|

Luật đường nối tạo bản sắc mạnh nhưng khó kết hợp với block nhiều ô vì người chơi phải đọc đồng thời hình khối và đường đi.

## 3\. Core loop của từng dòng Block Puzzle

### 3.1. Falling Block

**Core loop:** Quan sát block đang rơi → di chuyển hoặc xoay → khóa block → hoàn thành hàng → tăng tốc độ.

|Thành phần|Cơ chế|
|-|-|
|Hành động chính|Di chuyển, xoay và thả block|
|Điều kiện clear|Lấp đầy một hàng ngang|
|Áp lực chính|Thời gian và chiều cao chồng block|
|Kỹ năng chính|Phản xạ, hình dung không gian và sửa lỗi|
|Điều kiện thua|Block chạm vùng giới hạn phía trên|

Trọng tâm là thực hiện quyết định dưới áp lực thời gian. Nhịp này không tương thích tốt với Mahjong casual vốn thiên về quan sát chậm.

### 3.2. Grid Placement

**Core loop:** Quan sát bộ ba block → chọn block → tìm vị trí đặt → hoàn thành hàng/cột → nhận bộ block mới.

|Thành phần|Cơ chế|
|-|-|
|Hành động chính|Chọn và đặt một hình block|
|Điều kiện clear|Lấp đầy hàng, cột hoặc vùng|
|Không gian quyết định|Các ô trống còn lại trên grid|
|Tài nguyên chính|Diện tích và hình dạng khoảng trống|
|Kỹ năng chính|Hình dung hình học, lập kế hoạch và giữ bàn mở|
|Điều kiện thắng|Thường không có; tối đa hóa điểm hoặc hoàn thành goal|
|Điều kiện thua|Không còn vị trí cho các block đang có|

Đây là nhánh phù hợp nhất để hybrid với Mahjong casual vì cả hai đều:

* Không bắt buộc áp lực thời gian.
* Yêu cầu quan sát toàn bàn trước khi hành động.
* Sử dụng việc clear để tạo thêm không gian.
* Có thể chơi bằng thao tác chạm hoặc kéo đơn giản.

## 4\. So sánh trực tiếp

|Trục so sánh|Mahjong Solitaire|Tile Match|Mahjong Connect|Grid Placement Block Puzzle|
|-|-|-|-|-|
|Đơn vị người chơi điều khiển|Hai tile|Một tile|Hai tile|Một block nhiều ô|
|Quy tắc match|Cặp giống nhau|Bộ ba giống nhau|Cặp giống nhau + đường nối|Hoàn thành hàng/cột/vùng|
|Giới hạn không gian|Tile bị che/chặn|Tile bị che + khay chứa|Đường đi bị chặn|Hình dạng khoảng trống|
|Quyết định chính|Xóa cặp nào trước|Đưa tile nào vào khay|Mở đường nào trước|Đặt hình ở đâu|
|Planning horizon|Ngắn đến trung bình|Ngắn đến trung bình|Ngắn|Trung bình đến dài|
|Nguồn ngẫu nhiên|Layout và phân bố cặp|Layout và thứ tự lộ tile|Layout|Bộ block được phát|
|Failure state|Không còn cặp|Khay đầy|Không còn cặp/thời gian hết|Không còn chỗ đặt|
|Cảm giác thỏa mãn|Cặp biến mất, lộ lớp mới|Khay tạo triple|Đường nối và clear nhanh|Multi-line clear, combo lớn|

## 5\. Khác biệt thiết kế quan trọng

### 5.1. Mahjong dựa trên quan hệ giữa các tile

Một tile chỉ có giá trị khi được so sánh với tile khác: giống nhau, thuộc cùng bộ hoặc có thể nối với nhau. Người chơi chủ yếu đọc **identity** của tile.

### 5.2. Block Puzzle dựa trên hình học của khoảng trống

Giá trị của một block phụ thuộc vào hình dạng, kích thước và vị trí đặt. Người chơi chủ yếu đọc **geometry** của bàn.

### 5.3. Mahjong thường làm giảm số vật thể

Một hành động đúng thường xóa tile khỏi bàn và mở thêm lựa chọn.

### 5.4. Block Puzzle thêm vật thể trước khi clear

Người chơi phải làm bàn chật hơn để chuẩn bị cho một lần clear. Vì vậy mỗi nước đặt đều có rủi ro dài hạn.

Đây là khác biệt cốt lõi nhưng cũng là điểm tạo ra tiềm năng hybrid:

> Đặt block làm bàn chật hơn, còn match tile giúp giải phóng bàn.

## 6\. Độ tương thích khi hybrid

|Cặp kết hợp|Độ phù hợp|Nhận xét|
|-|-:|-|
|Mahjong Solitaire + Grid Placement|Cao|Pair matching có thể trở thành cách giải phóng không gian sau khi đặt block|
|Tile Match + Grid Placement|Trung bình–cao|Cả hai cùng quản lý không gian, nhưng thêm khay có thể gây quá tải|
|Mahjong Connect + Grid Placement|Trung bình–thấp|Luật đường nối cạnh tranh với bài toán hình học của block|
|Mahjong truyền thống + Grid Placement|Thấp với casual|Meld, tay bài và xác suất làm số luật tăng quá nhanh|
|Mahjong Solitaire + Falling Block|Thấp|Một bên cần quan sát chậm, một bên tạo áp lực thời gian|

## 7\. Prototype hiện tại đang sử dụng mechanic nào?

Prototype `01-mahjong-only` hiện có:

* Chọn một trong ba block.
* Đặt block lên grid 6×6.
* Tile trong block có màu đồng nhất hoặc trộn màu.
* Ba tile cùng màu liên tục theo hàng/cột sẽ clear.
* Hoàn thành goal số tile để sang level tiếp theo.

Phân loại chính xác:

|Thành phần|Nguồn mechanic|
|-|-|
|Chọn và đặt hình nhiều ô|Grid Placement Block Puzzle|
|Quản lý khoảng trống|Grid Placement Block Puzzle|
|Match ba màu liên tục|Color Match / Match-3|
|Goal phá X tile|Level-based casual puzzle|
|Hình ảnh hoặc tên Mahjong|Theme, nếu không có luật pair/exposure/meld|

Vì vậy, prototype hiện là **Block Puzzle + Color Match**, chưa tạo cảm giác Mahjong mạnh ở cấp độ mechanic. Nếu thay tile Mahjong bằng hình tròn màu mà gameplay không đổi, người chơi vẫn nhận được gần như cùng một trải nghiệm.

## 8\. Những mechanic Mahjong có thể chuyển sang hybrid mà không quá phức tạp

### A. Place-to-Pair

Tile vừa đặt chạm cạnh một tile cùng loại đã có trên bàn sẽ tạo cặp và clear.

* Giữ hành động chính là đặt block.
* Thêm nhận diện cặp đặc trưng của Mahjong Solitaire.
* Không cần thêm khay hoặc nhiều lớp.

### B. Dual Clear

Người chơi có hai cách clear:

* Ghép cặp tile giống nhau.
* Hoàn thành hàng/cột như Block Puzzle.

Một nước kích hoạt cả hai có thể tạo bonus “Perfect Clear”. Đây là hướng thể hiện hai dòng game rõ nhất nhưng cần preview tốt để tránh mơ hồ.

### C. Exposed Tile đơn giản hóa

Chỉ tile nằm cạnh ít nhất một ô trống mới có thể tham gia match.

* Tạo quyết định về thứ tự mở bàn.
* Mang tinh thần “tile đang mở” của Mahjong Solitaire.
* Không nên kết hợp thêm layer trong prototype đầu tiên.

### D. Match tạo Rescue Block

Phá đủ số cặp sẽ nhận một block 1×1 hoặc một lần đổi bộ ba block.

* Mahjong hỗ trợ trực tiếp bài toán sống sót của Block Puzzle.
* Đây là mechanic phụ, không đủ mạnh để làm hook duy nhất.

## 9\. Nguyên tắc thiết kế cho target casual chơi cả hai dòng game

1. Giữ một hành động chính: **đặt block** hoặc **chọn tile**, không bắt người chơi luân phiên quá nhiều chế độ input.
2. Chỉ nên có tối đa hai điều kiện clear chính.
3. Preview rõ tile nào sẽ bị phá trước khi người chơi xác nhận.
4. Độ khó nên đến từ quyết định không gian, không chỉ từ việc tăng số loại tile.
5. RNG cần tạo tình huống, không được quyết định trực tiếp thắng thua.
6. Một mechanic Mahjong thực sự phải ảnh hưởng đến lựa chọn của người chơi; chỉ sử dụng hình quân Mahjong không tạo ra hybrid gameplay.
7. Tránh đưa đồng thời layer, khay chứa, đường nối và nhiều loại meld vào cùng một prototype.

## 10\. Kết luận

Mahjong casual và Grid Placement Block Puzzle có chung nhịp quan sát–quyết định–clear, nhưng sử dụng hai loại tư duy khác nhau:

* Mahjong: nhận diện quan hệ giữa các tile.
* Block Puzzle: quản lý hình học của khoảng trống.

Hướng hybrid phù hợp nhất là để **người chơi đặt block nhằm tạo cặp tile và giải phóng không gian**, trong khi vẫn giữ một phần thưởng đặc trưng của Block Puzzle như hoàn thành hàng/cột. Đây là giao điểm dễ học, có đủ bản sắc mechanic và phù hợp với người chơi casual của cả hai dòng game.


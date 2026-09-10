# Các mục tiêu quan trọng khi thiết kế puzzle game

Xếp theo ưu tiên. Mục 1 quyết định game có đáng làm không; các mục sau quyết định nó có tốt không.
Nhãn nguồn: **(pillar gốc)** = ý ban đầu của bạn, **(bổ sung)** = phần thêm vào.

## 1\. Có một hook rõ ràng — (bổ sung)

Hook là câu một dòng khiến người ta thấy "khác": *hầu hết game làm X, game này làm Y*. Thường là một verb (thao tác lõi) mới hoặc bị bẻ cong, hoặc một ràng buộc thông minh.

* Ví dụ: match-3 = "ghép 3"; Pixel Flow = "quản băng chuyền với 5 slot chờ"; Monument Valley = "thao tác kiến trúc bất khả thi để tạo đường đi".
* Hook là *ý tưởng*, không phải chất lượng thi công. Nó khiến game đáng làm thay vì chỉ là một clone chỉn chu.

Hook thế nào là hay — kiểm tra bằng mấy tiêu chí:

* **Ít luật, nhiều tình huống có nghĩa** (tỷ lệ chiều sâu trên độ phức tạp cao). Đây là tiêu chí quan trọng nhất.
* **Đẻ ra quyết định thú vị**: không có nước đi trội hẳn, các lựa chọn cho hậu quả khác nhau rõ, người chơi đủ thông tin để cân nhắc nhưng không chắc chắn, và lựa chọn ảnh hưởng về sau.
* **Có tính sinh sôi**: các luật tương tác với nhau tạo ra tình huống mà chính người thiết kế không soạn trước.
* **Qua được "test đồ chơi"**: bản thân thao tác lõi đã vui khi nghịch, trước cả khi có mục tiêu thắng.
* Lưu ý: "lạ" không đồng nghĩa với "hay". Và chiều sâu phải để *người chơi* cảm được, không chỉ người thiết kế thấy.

## 2\. Dễ hiểu, dễ vào — (pillar gốc: "đưa cho player một vấn đề rõ ràng")

Người chơi hiểu mục tiêu trong vài giây, tự học qua màn đầu, không cần tutorial. Tách hai lớp: *mục tiêu* phải rõ ràng, nhưng *lời giải* vẫn phải có độ sâu. Nếu cả hai đều hiển nhiên thì không còn là puzzle, chỉ là bấm nút.

## 3\. Độ khó là một hệ thống có chủ đích — (pillar gốc: "trục độ khó / nhiều màn")

Nền tảng: hiểu các trục điều chỉnh độ khó và cách chúng kết hợp.

* Trục định lượng: thay đổi giá trị của các tham số đã có, như kích thước board, số màu, tỷ lệ màu trên kích thước, số mục tiêu hoặc số nước đi.
* Trục định tính: thêm hoặc trộn một luật/cơ chế mới, như vật cản mới, mục tiêu nhiều lớp, giới hạn nước đi hay giới hạn thời gian. Cần phân biệt: **lần đầu thêm** giới hạn nước đi là thay đổi định tính; sau đó chỉnh giới hạn từ 30 xuống 20 là thay đổi định lượng.

**Ví dụ cụ thể — Candy Crush Saga:**

* **Tăng độ khó định lượng:** giữ nguyên luật match-3, loại mục tiêu và các cơ chế đang có, nhưng thay đổi con số. Ví dụ, cùng là màn xóa Jelly, giảm giới hạn từ 30 xuống 20 nước đi; tăng từ 20 lên 40 ô Jelly; đổi Jelly một lớp thành hai lớp; hoặc tăng từ 5 lên 6 màu kẹo. Bài toán cũ trở nên chặt hơn nhưng người chơi không phải học một luật mới.
* **Tăng độ khó định tính:** đưa **Chocolate** vào board. Chocolate không chỉ chiếm chỗ như một ô Jelly cần xóa mà còn có thể lan ra và nuốt kẹo bên dưới, vì vậy người chơi phải học một hành vi mới và cân nhắc ưu tiên khống chế nó. Tương tự, thêm Magic Mixer — vật thể sinh ra các phần tử mới trên board — sẽ làm thay đổi bản chất quyết định, không chỉ tăng một con số.
* **Kết hợp hai loại:** ở màn đầu giới thiệu Chocolate, có thể nới trục định lượng — cho nhiều nước đi hơn, ít màu hơn hoặc ít Jelly hơn. Khi người chơi đã hiểu Chocolate, mới siết số nước đi và tăng số mục tiêu. Nhờ vậy, cú nhảy định tính được làm mềm bằng các trục định lượng.

Tham chiếu cơ chế: [Jelly, Chocolate và Magic Mixer trong Candy Crush Saga](https://candycrush.zendesk.com/hc/en-us/articles/360000754717-Which-Blockers-can-I-find-in-the-game); [booster thêm 5 nước đi](https://candycrush.zendesk.com/hc/en-us/articles/211320729-What-types-of-Boosters-are-available).

Bốn nguyên tắc khi dùng các trục này:

* **Không tăng đều một mạch.** Dùng đường cong lên xuống (răng cưa) để giữ người chơi trong vùng vừa sức — giữa chán và quá tải: khó vài màn rồi thả một màn dễ.
* **Đường cong độ khó đi cùng đường cong dạy.** Cơ chế mới xuất hiện ở màn dễ trước, rồi mới bị đem ra dùng trong màn khó.
* **Độ chia của trục phải đủ nhỏ** *(điểm bạn bổ sung).* Đối tượng mobile puzzle rất rộng — nhiều giới, nhiều tuổi, casual — nên độ khó phải nhích lên từ từ, mỗi nấc một chút, tránh thêm một nấc là độ khó nhảy vọt.
* **Không phải trục nào cũng chia nhỏ được.** Có trục *thô* (thêm cơ chế mới → nhảy lớn) và trục *mịn* (số nước đi, thời gian, tốc độ spawn, tỷ lệ màu). Kỹ thuật là dùng trục mịn làm trơn giữa các cú nhảy của trục thô: khi buộc phải thêm một thứ thô, đồng thời nới lỏng một trục mịn để tổng độ khó chỉ tăng nhẹ. Riêng cơ chế mới luôn gây một cú nhảy lúc mới ra (vì còn lạ), nên giới thiệu nó ở màn mà mọi thứ khác đã vặn xuống dễ. Chỗ cần mịn nhất là giai đoạn đầu và giữa game — nơi giữ số đông; các màn đầu tỷ lệ thắng phải rất cao.

Đây cũng là cách hiểu đúng ý "hàng ngàn màn": không phải đẻ ra số lượng, mà là có một bộ trục đủ mịn để trải một đường cong dài mà vẫn mượt.

## 4\. Nhắm đúng "feeling" của game — aesthetic (chữ A trong MDA) — (pillar gốc: "cảm xúc ASMR khi solve")

Theo MDA (Mechanics → Dynamics → Aesthetics), "A" không phải đồ họa mà là *cảm xúc* game tạo ra ở người chơi. Đây mới là ý của pillar này, và nó khác juice: juice chỉ là phản hồi tức thời (âm thanh, particle), còn aesthetic là cảm giác tổng thể mà cả hệ thống hướng tới.

Các mobile puzzle thành công hiện nay nhắm tới một aesthetic kiểu ASMR: thư giãn, dễ chịu, thỏa mãn, ít áp lực. Theo bảng 8 loại "fun" của LeBlanc, nó chủ yếu là Sensation (khoái cảm giác quan) cộng Abnegation/Submission (chơi để thả trôi, giải tỏa), và Challenge được giữ thấp có chủ ý.

Vì là một mục tiêu cảm xúc, nó chi phối cả ba tầng chứ không chỉ là lớp trang trí:

* Mechanics: thường bỏ đồng hồ đếm giờ, thua nhẹ nhàng, thao tác đơn giản, có dòng vật thể để dọn liên tục.
* Dynamics: một chuỗi giải-quyết nhỏ đều đặn, đưa người chơi vào trạng thái flow.
* Presentation: juice khớp với hành động (đổ → nước/tràn, cắt → lát/tách, dọn → pop/board sạch). Juice là một phương tiện ở tầng này, không phải bản thân aesthetic.

Quan hệ với hook (mục 1): aesthetic là *cảm giác bạn nhắm tới*, hook là *cách tạo ra cảm giác đó theo kiểu mới* — hai tầng khác nhau của MDA, không cạnh tranh. Nhắm aesthetic ASMR là hợp lý vì đó là thứ thị trường muốn; cái yếu là nhắm nó *mà không có hook*, tức chỉ dựa vào cảm giác với cơ chế nhạt.

## 5\. Trọn vẹn hơn là nhiều tính năng — (bổ sung)

Một game nhỏ mà làm xong hẳn — có mở đầu, một khoảnh khắc "à-há", màn kết, cảm giác có chủ đích — luôn hơn một game tham vọng làm dở dang. Khi phân vân giữa thêm tính năng và làm xong cái đang có, chọn làm xong.

## 6\. Kiểm chứng bằng playtest — (bổ sung)

Đừng đoán cảm giác "hay", hãy quan sát người lạ chơi thử. Dấu hiệu tốt: họ tự nghịch cơ chế khi chưa được giải thích luật; buột ra "ồ" hoặc "làm được thế này à?"; liên tục tìm ra tình huống mới; chọn khác nhau giữa từng người; và đòi chơi thêm ván nữa. Dự đoán bằng tiêu chí ở mục 1, rồi xác nhận bằng những dấu hiệu này.

\---

Tóm nguồn: mục 2, 3, 4 là ba pillar gốc của bạn; mục 1, 5, 6 là phần bổ sung.


# Bộ 4 prototype Mahjong × Block — Core Integration Test

Mục tiêu của bộ test là trả lời: **hai hệ thống có thật sự cần nhau và có tạo quyết định mới không?**

## 1. Cặp Hóa Khối

- Block placement quyết định thành phần tile của line.
- Match 2–4 quyết định shape block được tạo tiếp theo.
- Câu hỏi playtest: người chơi có cố tình xây recipe tile để sản xuất shape cho trạng thái board tương lai không?

## 2. Cặp An Toàn

- Shape và vị trí quyết định tile có tạo nhóm nối cạnh hay không.
- Nhóm an toàn không vào khay; tile cô lập tạo áp lực khay.
- Câu hỏi playtest: người chơi có đổi tile ID dù shape giống nhau để giảm tile lẻ không?

## 3. Khay Là Nhiên Liệu

- Match 2/3/4 tạo 1/2/3 năng lượng theo tile ID.
- Block cùng ID cần năng lượng để được đặt.
- Câu hỏi playtest: người chơi có lập kế hoạch energy economy hay chỉ phản ứng từng lượt?

## 4. Recipe Line

- Mỗi line có thành phần tile bắt buộc.
- Recipe đúng tạo block bắt buộc cho recipe tiếp theo.
- Câu hỏi playtest: người chơi có đọc đồng thời shape, tile ID và recipe trước khi đặt không?

## Cách chạy

Mở `index.html`, hoặc mở từng file HTML trực tiếp. Tất cả đều chạy offline.

## Bộ câu hỏi chung

1. Sau 60 giây, người chơi có giải thích được quan hệ Block → Mahjong → Block không?
2. Giữ nguyên shape nhưng đổi tile ID, lựa chọn của họ có đổi không?
3. Bỏ Mahjong thì core loop có sụp không?
4. Bỏ spatial placement thì core loop có sụp không?
5. Prototype nào khiến người chơi tự thử thêm nước đi ngoài hướng dẫn?
6. Có thời điểm nào UI hoặc luật chen ngang làm mất nhịp không?

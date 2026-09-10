# GDD — CHỐT HOOK & CORE GAMEPLAY
### Khay Tiêu Hóa · Mahjong × Block Puzzle

> Tài liệu này chốt **hai thứ duy nhất không được đổi nữa**: hook và core loop. Số liệu cân bằng, bảng 50 màn, chi tiết build kỹ thuật xem [GDD-khay-tieu-hoa.md](GDD-khay-tieu-hoa.md).

---

## 1. Hook

> **Đóng hàng KHÔNG làm quân bốc hơi. Quân bay vào KHAY. Khay tràn là thua.**

Hook trả lời một câu hỏi mà chưa dòng game nào trong hai thể loại gốc từng hỏi:

> *"Hàng này đã đầy rồi. Mình CÓ NÊN đóng nó không?"*

- **Block Puzzle** không bao giờ hỏi câu này — clear luôn luôn tốt, không có mặt trái.
- **Mahjong** không bao giờ hỏi, vì người chơi chọn từng quân một, không bao giờ nuốt cả hàng cùng lúc.

Chiều ngược lại cũng thật: vì khay quyết định hàng nào an toàn để đóng, người chơi buộc phải **xếp hàng có chủ đích** — không còn "đóng được là đóng", mà là *"mình cần một 3索 vào khay, nên phải đóng cột 4 chứ không phải hàng 6."* Mahjong dẫn dắt việc đặt khối, chứ không chỉ ăn theo sau khi khối đã đặt xong.

**Phép thử "bỏ một phần" (điều kiện để gọi là hybrid thật, không phải hai game dán cạnh nhau):**
- Bỏ khay → trò chơi tụt về Block Blast thường.
- Bỏ block → không có gì đẩy quân vào khay để tạo bộ.

**Cả hai đều sập.** Đây là bằng chứng hook không phải trang trí.

---

## 2. Core Loop

```
┌─────────────────────────────────────────────────────────┐
│  1. Khay dưới có 3 khối → chọn 1, đặt lên bàn            │
│  2. Đặt hết 3 khối → phát 3 khối mới                     │
│  3. Hàng/cột đầy → KHÔNG bốc hơi, quân bay vào KHAY      │
│  4. Mỗi quân vào khay → kiểm tra bộ ngay lập tức:        │
│       • Phỗng (3 quân cùng ID)         → nổ, +điểm       │
│       • Sảnh (3 quân liên tiếp cùng chất) → nổ, +điểm    │
│  5. Khay tràn (vượt sức chứa) → THUA NGAY                │
│  6. Đủ số bộ mục tiêu → QUA MÀN                          │
└─────────────────────────────────────────────────────────┘
```

**Verb-arc / feeling:** *tích trữ → nín thở → châm ngòi → tiêu hóa → nhẹ nhõm.*
Pha **"nín thở"** — cầm một hàng đã đầy trong tay và lưỡng lự có nên đóng — là tâm điểm cảm xúc của toàn bộ thiết kế. Feeling đích là **nhẹ nhõm (relief)**, không phải ASMR thuần: có một khoảnh khắc căng (build-or-spend) trước khi được giải tỏa, chứ không chỉ là dọn dẹp êm ả liên tục.

---

## 3. Luật cốt lõi (không được sai khi implement)

| Luật | Quy định |
|---|---|
| Đặt khối | Toàn bộ ô của khối phải nằm trong bàn và đang trống. Không xoay, không trọng lực. |
| Phát hiện hàng đầy | Quét hàng trước, rồi cột. Ô ở giao của cả hàng đầy và cột đầy chỉ tính **một lần**. |
| Thứ tự quân vào khay | Hàng: trái→phải. Cột: trên→dưới. |
| Trần nhận (`intake`) | Mỗi lượt khay chỉ nhận tối đa N quân đầu; quân dư bay đi (vẫn được điểm nhỏ). |
| Tìm bộ trong khay | Xét mọi tổ hợp 3 quân, không cần liền nhau. **Ưu tiên phỗng trước sảnh.** Lặp đến khi không còn bộ. |
| Quân chữ (honor) | Chỉ phỗng, **không có sảnh**. Lẻ một con là rác thuần. |
| Sảnh | Bắt buộc **cùng một chất**. |
| Điều kiện tràn | Sau khi đẩy quân + nổ hết bộ có thể nổ: nếu số quân trong khay vượt sức chứa → thua. |
| Thắng/thua màn | Thắng khi đủ số bộ mục tiêu. Thua khi (a) khay tràn, hoặc (b) không khối nào đặt được và đã hết lượt Đổi khối. |

**Hai công cụ hỗ trợ** (không phải core, nhưng bắt buộc có để hook không quá khắc nghiệt):
- 🔄 **Đổi khối** — thay toàn bộ khối chưa dùng trong khay dưới.
- ✋ **Xả 1 quân** — bỏ một quân đang kẹt trong khay.

**Dự báo (forecast)** trong lúc kéo khối là thành phần bắt buộc, không phải juice tùy chọn: nó biến hook từ "đánh cược" thành "quyết định". Không có dự báo, người chơi không đủ thông tin để trả lời câu hỏi trọng tâm ở Mục 1.

---

## 4. Vì sao chốt hook này

- Ghép đúng cơ chế của hai game bán chạy nhất trong data thị trường của nhóm: **Vita Mahjong** (khay chờ) và **Block Blast** (đặt khối) — không phải hybrid nghĩ ra trên giấy.
- Đã build prototype chơi được (`11-khay-tieu-hoa.html`) và **đo bằng bot** (không phải suy đoán): từ màn 4 trở đi, bot không đọc khay chết 60–100% số ván, còn bot đọc khay thắng cao hơn 40–54 điểm phần trăm. Chi tiết số liệu và bảng 50 màn: [GDD-khay-tieu-hoa.md](GDD-khay-tieu-hoa.md).

Từ đây trở đi, mọi thay đổi khác (số màn, tham số độ khó, cơ chế phụ như Riichi) đều phải giữ nguyên hai điều chốt ở Mục 1 và Mục 2.

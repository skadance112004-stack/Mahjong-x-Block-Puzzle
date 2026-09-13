# Assets.md — Nguồn tài nguyên (art/âm thanh) đã sử dụng

\---

## 1\. Âm thanh (`Assets/Sounds/`)

|Dùng cho|File gốc|Tác giả / nền tảng|Ghi chú|
|-|-|-|-|
|Nhạc nền (menu + trong game)|`drmekhan-chinese-inflight-soft-instrumental-relaxing-289404.mp3`|**drmekhan**, Pixabay (ID 289404)|https://pixabay.com/th/music/%E0%B9%82%E0%B8%A5%E0%B8%81-chinese-inflight-soft-instrumental-relaxing-289404/|
|SFX đặt quân (`playWoodTile()`)|`freesound\_community-086372\_hit-wood-42549.mp3`|**Freesound Community**, qua Pixabay (ID 42549, "hit-wood")|Bản thu tiếng gõ gỗ thật, thay cho `woodClack()` tổng hợp (vẫn giữ làm fallback nếu decode lỗi/chưa xong)|
|SFX match/phá quân (`playMatchSfx()`)|`freesound\_community-wood-crate-destory-2-97263.mp3`|**Freesound Community**, qua Pixabay (ID 97263, "wood-crate-destroy-2")|Bản thu tiếng vỡ gỗ thật; cao độ tăng nhẹ theo combo (giữ cảm giác "combo lớn hơn = sáng hơn" của bản tổng hợp cũ|
|SFX chuyển cảnh / click UI (`playUiClick()` dùng lại buffer này qua `window.\_\_switchSfxBuffer`)|`soundreality-switch-150130.mp3`|**soundreality**, qua Pixabay (ID 150130, "switch")|1 sample dùng chung cho cả hiệu ứng "switch" trong game lẫn tiếng click nút UI toàn trang|
||`dragon-studio-button-press-382713.mp3`|dragon-studio (?), qua Pixabay (ID 382713)||
||`Bamboo\_Door\_toggle2.ogg.mp3`|chưa xác định||



## 2\. Hình ảnh (`Assets/Art-References/`)

|File|Dùng để làm gì|Nguồn|
|-|-|-|
|`Mahjong.png`|Sprite sheet ảnh quân mạt chược **thật** (42 mặt: chấm 1-9, sách 1-9, vạn 1-9, gió+tam nguyên 1-7, hoa/tứ quý 1-8) — cắt + nhúng base64 vào `TILE\_IMG`/`TILE\_IMG\_BLOCK` trong `MahjongXBlock.html`, dùng cho toàn bộ mặt quân trong game (skin "Ngà nguyên bản")|https://blueeyedrat.itch.io/pixel-assets-mahjong-tiles|
|Anisimova's Vector mahjong|Dùng để lấy tham khảo về chất lieu của 1 khối mahjong|https://anisimova.itch.io/anisimovas-mahjong-game-pack|

## 3\. Font \& ký tự

* Không dùng web font/font nhúng ngoài — toàn bộ UI dùng font hệ thống (**Georgia** cho tiêu đề,
**Segoe UI** cho nội dung). Không cần giấy phép asset riêng cho font.
* Ký tự `🀄` (Unicode Mahjong Tile Red Dragon, U+1F004) dùng ở vài chỗ trang trí — là glyph
Unicode hệ thống, không phải asset hình ảnh cần cấp phép.




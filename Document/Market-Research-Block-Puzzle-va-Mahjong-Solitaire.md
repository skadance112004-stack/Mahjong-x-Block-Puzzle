# Market Research: Block Puzzle & Mahjong Solitaire — So sánh với Core Hook của Mahjong × Block

*Ngày nghiên cứu: 2026-09-11 · Phương pháp: tìm kiếm web + đọc trực tiếp mô tả/store listing/bài phân tích thiết kế công khai, mỗi nhận định đều có nguồn trích dẫn. Không dùng số liệu nội bộ (Sensor Tower/App Annie trả phí) — chỉ số liệu nào được báo chí/thông cáo công khai trích dẫn mới đưa vào, có ghi rõ nguồn thứ cấp. Mục 7 nêu rõ giới hạn của cách làm này.*

---

## 1. Thể loại Block Puzzle

### 1.1 Quy mô thị trường (dẫn chứng công khai)

**Block Blast!** (Hungry Studio) là cái tên đại diện lớn nhất hiện nay:
- Đứng **#1 game được tải nhiều nhất thế giới** trong cả 3 tháng đầu 2026 (theo Sensor Tower, trích qua Business Wire) — [nguồn](https://www.businesswire.com/news/home/20260423998721/en/Block-Blast-Ends-Q1-2026-as-the-No.-1-Most-Downloaded-Mobile-Game-Worldwide).
- **70 triệu DAU, 300 triệu MAU**, có mặt ở 200+ quốc gia, #1 mục Puzzle ở 40+ thị trường — [nguồn](https://www.businesswire.com/news/home/20260423998721/en/Block-Blast-Ends-Q1-2026-as-the-No.-1-Most-Downloaded-Mobile-Game-Worldwide).
- Đang mở rộng mạnh ở Indonesia, Brazil, **Việt Nam** — [nguồn](https://www.businesswire.com/news/home/20260423998721/en/Block-Blast-Ends-Q1-2026-as-the-No.-1-Most-Downloaded-Mobile-Game-Worldwide).

*Lưu ý: đây là số liệu do Sensor Tower cung cấp, được bên thứ ba (Business Wire/nhà phát hành) trích dẫn lại trong thông cáo báo chí — không phải số liệu mình tự truy xuất trực tiếp từ Sensor Tower.*

### 1.2 Cơ chế cốt lõi

"Drag–match–clear": kéo khối nhiều-ô vào lưới, lấp đầy hàng/cột để phá — [nguồn](https://www.businesswire.com/news/home/20260423998721/en/Block-Blast-Ends-Q1-2026-as-the-No.-1-Most-Downloaded-Mobile-Game-Worldwide). Theo phân tích của **Deconstructor of Fun** (blog phân tích thiết kế game có uy tín trong ngành), thể loại này đã trải qua nhiều "thế hệ":

| Thế hệ | Đại diện | Đặc điểm |
|---|---|---|
| 1 | Block Blast | Khối phát ngẫu nhiên liên tục, bàn giới hạn, **áp lực sinh tồn** (board đầy dần = thua) |
| 2 | Color Block Jam | **Level tĩnh, thiết kế sẵn** — cả bài toán đưa ra ngay từ đầu, thiên về giải đố hơn sinh tồn |
| 3 | Car Jam, Gecko Out | Thêm booster/vật cản/chủ đề hình ảnh lên nền cơ chế đã có |

[Nguồn phân tích đầy đủ](https://www.deconstructoroffun.com/blog/2026/1/19/from-tetris-to-block-blast-why-block-puzzles-never-stop-printing).

**Điều genre chủ động KHÔNG làm** (trích nguyên văn phân tích): thể loại này **loại bỏ có chủ đích áp lực thời gian và thử thách phản xạ** — không có luật "khối rơi từ trên xuống" kiểu Tetris cổ điển, thay vào đó người chơi nhận "3 khối mỗi lượt", **loại hẳn yếu tố đặt nhầm do phản xạ chậm** ra khỏi quyết định — [nguồn](https://www.deconstructoroffun.com/blog/2026/1/19/from-tetris-to-block-blast-why-block-puzzles-never-stop-printing). Áp lực quyết định trong Block Blast đến từ việc **không gian thu hẹp dần** ("bạn cảm nhận được bàn cờ đang chật lại, biên độ sai số đang co lại"), không phải từ tốc độ.

### 1.3 Các biến thể khác trong genre

| Game | Bàn | Đặc điểm riêng |
|---|---|---|
| Woodoku | 9×9 | Thêm điều kiện phá thứ 3 (ô vuông 3×3, ngoài hàng/cột) — độ phức tạp cao hơn khi chơi giỏi; nổi bật vì "phản hồi giác quan" (âm thanh gỗ va ASMR) |
| Blockudoku | 9×9 | Lai giữa block-puzzle và Sudoku |
| 1010! | 10×10 | Bàn rộng hơn Block Blast (8×8) → "dễ thở" hơn một chút |

[Nguồn so sánh](https://appgrooves.com/compare/app-woodoku-by-tripledot-studios-limited/app-blockudoku-block-puzzle-game-by-easybrain-ltd).

---

## 2. Thể loại Mahjong Solitaire

### 2.1 Các tựa game phổ biến (dẫn chứng công khai)

- **Mahjong City Tours** — hơn 10 triệu lượt tải, chủ đề du lịch thế giới, có hệ thống mở khoá điểm đến — [nguồn](https://www.logicloftgames.com/blog/best-mahjong-games/).
- **Mahjong Solitaire 2026** (Standard Game Limited) — 4.9/5, 100k+ tải, không timer, chơi offline — [nguồn](https://apps.apple.com/us/app/mahjong-solitaire-2026/id6752898694).
- **2026 Simple Mahjong Solitaire** — 1000+ bố cục miễn phí, gợi ý thông minh, undo không giới hạn — [nguồn](https://play.google.com/store/apps/details?id=com.joybat.Mahjong).

### 2.2 Cơ chế cốt lõi

Bố cục 144 quân xếp nhiều lớp (kiểu kim tự tháp); người chơi chỉ được ghép **quân đang "mở"** (không bị quân khác đè lên, và trống ít nhất 1 bên trái/phải); ghép đủ cặp giống hệt nhau để dọn sạch bàn — [nguồn](https://www.solitairebliss.com/blog/how-to-play-mahjong-solitaire), [nguồn 2](https://solitaired.com/guides/how-to-play-mahjong-solitaire). Có hint, undo, và xáo lại (reshuffle) khi bí — [nguồn](https://solitaired.com/guides/how-to-play-mahjong-solitaire).

**Tỉ lệ may rủi/kỹ năng**: người mới có thể phụ thuộc may rủi tới ~75%, người chơi nhiều kinh nghiệm giảm còn ~25% — [nguồn](https://worldmahjongtour.live/the-role-of-luck-versus-skill-in-mahjong-competitions/). Với riêng Mahjong Solitaire (không phải Mahjong 4 người), yếu tố quyết định độ khó nằm ở **cấu trúc bố cục có sẵn** (bao nhiêu quân "mở" ngay từ đầu — 2-4 quân mở tạo chuỗi phụ thuộc chặt, 8+ quân mở tạo nhiều đường giải) chứ không phải quyết định real-time của người chơi trong lúc chơi — khoảng 70-85% bố cục chuẩn giải được — [nguồn](https://themahjong.io/blog/mahjong-solitaire-difficulty-ranking-layouts).

**Điều genre KHÔNG có** (suy ra trực tiếp từ luật đã dẫn nguồn ở trên, không phải diễn giải): người chơi **không có cách nào chủ động che một quân đang lộ để "khoá" nó lại** — việc quân nào đang mở/đóng hoàn toàn do bố cục xếp sẵn quyết định, người chơi chỉ *chọn trong số quân đã mở sẵn*, không *tạo ra* trạng thái che/lộ mới bằng hành động của mình.

---

## 3. Đã có ai làm "Mahjong × Block hybrid" chưa?

Tìm trực tiếp trên store bằng từ khoá hybrid — có **nhiều tựa game đã tồn tại** ghép 2 từ khoá này, cần liệt kê trung thực thay vì giả định mình là người đầu tiên:

| Game | Cơ chế thật (theo mô tả/store) | Có "che chủ động rồi tự lộ lại" không? |
|---|---|---|
| **Block Mahjong Match** | Kéo-thả quân mahjong vào lưới, ghép 3 quân giống nhau theo hàng/cột/chéo — gần giống match-3 kiểu Connect hơn là block-puzzle thật | Không thấy nhắc tới — [nguồn](https://play.google.com/store/apps/details?id=com.exploretech.game.block.mahjong.wrmg) |
| **Mahjong Hybrid: Match & Relax** | Ghép cặp quân giống hệt, được phép trượt ngang/dọc để đưa 2 quân lại gần nhau, có thể có ô trống ở giữa | Không — không có khái niệm 2 tầng hay che quân | — [nguồn](https://apps.apple.com/in/app/mahjong-hybrid-match-relax/id6755711414) |
| **Piles of Mahjong** | Chọn quân từ 1 đống, quân được chọn dồn vào 7 ô trống phía dưới; ghép đủ 3 quân giống nhau tại đó; thua nếu 7 ô đầy | Không — áp lực đến từ **quản lý không gian chứa**, không phải từ việc chủ động che/lộ — [nguồn](https://www.crazygames.com/game/piles-of-mahjong-jhb) |
| **Mahjong Jam: Block Match** | Xuất hiện trong kết quả tìm kiếm nhưng **chưa fetch được mô tả chi tiết** trong nghiên cứu này | Chưa xác minh |

**Kết luận có giới hạn rõ ràng**: trong phạm vi các tựa game kiểm tra được (không phải toàn bộ thị trường), **chưa tìm thấy game nào** để người chơi **chủ động dùng hành động đặt khối để che 1 quân đang lộ, biến việc che thành 1 quyết định chiến thuật, rồi tự tay lộ lại đúng lúc** — đây là mô tả chính xác nhất có thể đưa ra từ dữ liệu đã thu thập, **không phải** khẳng định "chưa ai từng làm điều này trên toàn thị trường" (xem giới hạn nghiên cứu, mục 7).

---

## 4. Xu hướng kinh doanh chung của casual puzzle 2026

- Mô hình "chỉ quảng cáo" đang suy yếu; xu hướng chung là **hybrid Ads + IAP** — [nguồn](https://gamegrowthadvisor.com/blog/2026-04-02-f2p-monetization-models-comparison-2026/).
- Riêng nhóm **hybrid-casual puzzle**: tỉ lệ doanh thu **59% từ IAP / 41% từ quảng cáo** (Sensor Tower "State of Gaming 2026", trích qua Game Growth Advisor) — [nguồn](https://gamegrowthadvisor.com/blog/2026-04-16-hybrid-casual-game-design-strategy-2026/).
- Doanh thu in-app của mảng hybrid-casual tăng 20% lên 4.2 tỷ USD, là mảng duy nhất tăng trưởng — cùng nguồn trên.

*Đối chiếu ngắn gọn*: Mahjong × Block hiện dùng Ads (interstitial+rewarded) + 1 lớp Xu/cosmetic **kiếm được qua chơi** (không phải IAP tiền thật). Đây là mô hình **nhẹ hơn** so với xu hướng IAP-nặng (59%) đang thắng thế của genre — phù hợp nếu mục tiêu là giữ trải nghiệm "không Pay-to-Win", nhưng cũng có nghĩa là game **chưa khai thác** kênh doanh thu đang tăng trưởng mạnh nhất của chính thể loại mình tham gia. Đây là 1 đánh đổi kinh doanh cần cân nhắc có chủ đích, không phải điểm "hơn" hay "kém" tự nhiên.

---

## 5. So sánh với Core Gameplay Hook của Mahjong × Block

| Tiêu chí | Block Puzzle (Block Blast và biến thể) | Mahjong Solitaire | Hybrid hiện có trên thị trường | **Mahjong × Block** |
|---|---|---|---|---|
| Cách tạo ra trạng thái "che/lộ" | Không có khái niệm này | Cố định sẵn theo bố cục, người chơi không tạo ra được | Không thấy ở 3 game đã kiểm tra | **Người chơi tự tạo bằng hành động đặt khối** — verify qua GDD nội bộ |
| Áp lực cốt lõi | Không gian thu hẹp dần (theo Deconstructor of Fun) | Cấu trúc bố cục quyết định trước, ít phụ thuộc quyết định real-time | Quản lý không gian chứa (Piles of Mahjong) hoặc ghép theo hàng/cột (Block Mahjong Match) | Cân bằng giữa "dùng khối để mở khoá ngay" và "cố ý che lại để dành cho nước sau" |
| Áp lực thời gian/phản xạ | Chủ động loại bỏ (nguồn: Deconstructor of Fun) | Không có | Không thấy | Không có (move-based, không phải time-based) — **giống genre**, không phải điểm khác biệt |
| Cấu trúc nội dung | Đang dịch chuyển từ sinh tồn vô hạn → level tĩnh thiết kế sẵn (thế hệ 2) | Bố cục cố định, độ khó do cấu trúc | Đa phần bố cục cố định | 50 level tĩnh, có `solution` giải sẵn & tự-verify — **cùng hướng với "thế hệ 2"** của block-puzzle, không phải hướng đi mới lạ |
| Mô hình kinh doanh | Ads-nặng (Block Blast) hoặc IAP-nặng (Color Block Jam) | Đa phần Ads + IAP nhẹ | Không khảo sát chi tiết | Ads + Xu kiếm được qua chơi (không IAP tiền thật) — nhẹ hơn xu hướng chung của genre (mục 4) |

### Đánh giá trung thực

**Khác biệt có vẻ thật, dựa trên dữ liệu đã thu thập**: cơ chế "chủ động che 1 quân để khoá, tự tay lộ lại đúng lúc" bằng đúng hành động đặt khối (polyomino) — không xuất hiện trong 2 thể loại gốc (theo luật đã dẫn nguồn) và không xuất hiện trong 3 hybrid đã kiểm tra chi tiết.

**Không phải khác biệt** — cần tránh overclaim trong pitch: việc *không có timing pressure* không phải điểm khác biệt của Mahjong × Block so với genre — đây là đặc điểm **genre đã chủ động chọn từ trước** (Block Blast cũng không có). Việc dùng level tĩnh có solution cũng không mới — đây là hướng cả genre block-puzzle đang dịch chuyển tới (thế hệ 2).

**Cần kiểm chứng thêm, chưa thể khẳng định chắc**: liệu có tựa game nào KHÁC (ngoài phạm vi đã tìm) đã làm đúng cơ chế "polyomino 2 tầng, che chủ động" này chưa — nghiên cứu này chỉ kiểm tra được 4 tựa gắn nhãn "mahjong hybrid" xuất hiện đầu kết quả tìm kiếm, không phải toàn bộ thị trường (ước tính hàng trăm game mahjong/block đang tồn tại trên 2 store). Khuyến nghị: nếu dùng dữ liệu này cho pitch nhà đầu tư/phát hành, nên đóng khung là "chưa tìm thấy trong khảo sát ban đầu" chứ không phải "độc nhất trên thị trường".

---

## 6. Tóm tắt 1 trang (dùng cho pitch nếu cần)

1. Cả 2 genre gốc đều rất lớn (Block Blast #1 tải toàn cầu Q1/2026, Mahjong City Tours 10M+ tải) — thị trường có thật, không phải ngách nhỏ.
2. Cả 2 genre gốc, theo đúng luật/phân tích đã dẫn nguồn, **đều không có cơ chế người chơi chủ động che-rồi-lộ quân bằng hành động đặt khối**.
3. Đã có nhiều game tự nhận là "mahjong × block hybrid" — nhưng 3/4 game kiểm tra chi tiết đều là biến thể match-3/match-pair, không phải cơ chế 2 tầng gravity như Mahjong × Block.
4. Xu hướng kinh doanh chung của genre đang chuyển sang IAP-nặng hơn (59/41) — mô hình Ads+Xu-kiếm-được của Mahjong × Block nhẹ hơn xu hướng này, là lựa chọn có chủ đích chứ không phải mặc định.

---

## 7. Giới hạn của nghiên cứu này

- Toàn bộ dữ liệu lấy từ **tìm kiếm web công khai ngày 2026-09-11** (store listing, blog phân tích thiết kế, thông cáo báo chí) — không dùng dữ liệu phân tích trả phí (Sensor Tower/data.ai gốc), không phỏng vấn người chơi thật, không A/B test.
- Số liệu tải/DAU/MAU của Block Blast là **số liệu bên thứ ba trích dẫn lại**, không tự truy xuất từ nguồn gốc Sensor Tower.
- Phần "đã có hybrid chưa" (mục 3) chỉ kiểm tra **4 tựa xuất hiện đầu kết quả tìm kiếm** — không phải khảo sát đầy đủ 2 app store.
- Không có dữ liệu về **retention/session length thật** của bất kỳ game nào trong bài — mọi nhận định về "áp lực"/"quyết định" đều dựa trên mô tả luật chơi hoặc bài phân tích thiết kế, không phải đo lường hành vi người chơi thật.
- 1 nguồn (`Mahjong Jam: Block Match`) xuất hiện trong tìm kiếm nhưng chưa fetch được nội dung — liệt kê trong mục 3 kèm ghi chú rõ "chưa xác minh" thay vì bỏ qua hoặc đoán.

---

## Nguồn tham khảo đầy đủ

- [Block Blast! Ends Q1 2026 as the No. 1 Most Downloaded Mobile Game Worldwide — Business Wire](https://www.businesswire.com/news/home/20260423998721/en/Block-Blast-Ends-Q1-2026-as-the-No.-1-Most-Downloaded-Mobile-Game-Worldwide)
- [From Tetris to Block Blast: why block puzzles never stop printing — Deconstructor of Fun](https://www.deconstructoroffun.com/blog/2026/1/19/from-tetris-to-block-blast-why-block-puzzles-never-stop-printing)
- [Woodoku vs Blockudoku comparison — AppGrooves](https://appgrooves.com/compare/app-woodoku-by-tripledot-studios-limited/app-blockudoku-block-puzzle-game-by-easybrain-ltd)
- [The 10 Best Mahjong Games — Logic Loft Games](https://www.logicloftgames.com/blog/best-mahjong-games/)
- [Mahjong Solitaire 2026 — App Store](https://apps.apple.com/us/app/mahjong-solitaire-2026/id6752898694)
- [2026 Simple Mahjong Solitaire — Google Play](https://play.google.com/store/apps/details?id=com.joybat.Mahjong)
- [How to Play Mahjong Solitaire — Solitaire Bliss](https://www.solitairebliss.com/blog/how-to-play-mahjong-solitaire)
- [How to play Mahjong Solitaire — Solitaired](https://solitaired.com/guides/how-to-play-mahjong-solitaire)
- [The role of luck versus skill in Mahjong competitions](https://worldmahjongtour.live/the-role-of-luck-versus-skill-in-mahjong-competitions/)
- [The Ultimate Mahjong Solitaire Difficulty Index](https://themahjong.io/blog/mahjong-solitaire-difficulty-ranking-layouts)
- [Block Mahjong Match — Google Play](https://play.google.com/store/apps/details?id=com.exploretech.game.block.mahjong.wrmg)
- [Mahjong Hybrid: Match & Relax — App Store](https://apps.apple.com/in/app/mahjong-hybrid-match-relax/id6755711414)
- [Piles of Mahjong — CrazyGames](https://www.crazygames.com/game/piles-of-mahjong-jhb)
- [F2P Monetization Models 2026 — Game Growth Advisor](https://gamegrowthadvisor.com/blog/2026-04-02-f2p-monetization-models-comparison-2026/)
- [Hybrid Casual Games 2026: Design, Monetization and the Real Revenue Split — Game Growth Advisor](https://gamegrowthadvisor.com/blog/2026-04-16-hybrid-casual-game-design-strategy-2026/)

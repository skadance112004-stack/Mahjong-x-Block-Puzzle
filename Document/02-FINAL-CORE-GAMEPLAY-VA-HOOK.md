# Mahjong × Block — Final Core Gameplay & Hook

**Tên nội bộ của core:** Floor-only Queue × Gravity Cascade  
**Prototype:** [24K — Final Core](digest-layers-prototypes/24K-lower-layer-gravity.html)  
**Trạng thái:** Core lock; tiếp theo là playtest, level design và polish  
**Tài liệu nền:** `puzzle-design-6-muc-tieu 1.md` và `thiet-ke-tu-cam-xuc-tong-hop 2.md`

## 1. Elevator pitch

Một puzzle casual nơi người chơi kéo một polyomino gồm nhiều Mahjong tile vào tầng dưới của board. Khi hai tile cùng mặt chạm nhau, chúng phá support; những tile nằm phía trên rơi xuống và có thể tiếp tục tạo Match 2 thành cascade.

## 2. Hook một câu

> **Đặt khối xuống tầng dưới, Match 2 để phá chân đỡ, rồi nhìn mái Mahjong rơi xuống thành chuỗi Match tiếp theo.**

Phiên bản đối chiếu “hầu hết game làm X, game này làm Y”:

- Block Puzzle thường clear line; game này dùng **identity của từng cell để phá support**.
- Mahjong Puzzle thường chọn hai tile đang free; game này dùng **polyomino placement để tự tạo cặp**.
- Gravity thường là luật settle của block mới; game này biến gravity thành **payoff sau khi support bị Match**.

## 3. Target player và target experience

### Người chơi

- Casual mobile.
- Trọng tâm: người chơi trên 35 tuổi.
- Không yêu cầu biết luật Mahjong.
- Chấp nhận suy nghĩ ngắn trước mỗi drag, nhưng không muốn mô phỏng nhiều hệ thống hoặc đọc tutorial dài.

### Cảm xúc cụ thể

Không chỉ gọi chung là “ASMR” hay “thỏa mãn”. Cảm xúc đích cụ thể là:

> **Controlled-collapse satisfaction — cảm giác mình nhìn ra đúng chân đỡ, đặt một khối có chủ đích, rồi được thưởng bằng chuỗi rơi gọn gàng do chính nước đi đó gây ra.**

Đây là sự kết hợp của:

- **Anticipation nhẹ:** nhìn current/next và các stack.
- **Competence:** nhận ra trigger phù hợp.
- **Commitment:** thả nguyên polyomino xuống board.
- **Release:** cặp support biến mất.
- **Sensation:** tile rơi, chạm và pop theo nhịp.
- **Relief:** board thoáng hơn và tiến độ pair tăng.

## 4. Verb-arc cảm xúc

Theo lens Verb-Arc, hình dạng cảm xúc theo thời gian là:

`quan sát → nhắm support → đặt khối → phá đỡ → rơi → nối chuỗi → nhẹ bàn`

| Pha cảm xúc | Beat gameplay |
|---|---|
| Quan sát | Đọc stack, tile tầng dưới, current và next |
| Nhắm support | So identity và footprint để chọn điểm drop |
| Đặt khối | Kéo–thả polyomino; cam kết một vị trí |
| Phá đỡ | Match 2 ở tầng dưới loại support |
| Rơi | Tile tầng trên mất support và drop xuống |
| Nối chuỗi | Tile vừa rơi Match tiếp qua nhiều wave |
| Nhẹ bàn | Không gian mở, pairGoal tăng, board ổn định |

### Loại agency

Core là **agentive → receptive payoff**:

- Agentive: người chơi chọn vị trí và tạo Match đầu tiên.
- Receptive: hệ thống thực hiện gravity/cascade và trao payoff cảm giác.

Điều phải kiểm chứng là người chơi vẫn quy kết quả cascade cho quyết định của mình. Nếu họ thấy cascade ngẫu nhiên, mắt xích `đặt khối → phá đỡ → rơi` đã không được truyền đạt đủ rõ.

---

## 5. Core loop

```text
Đọc board hai tầng
        ↓
Đọc polyomino hiện tại + preview kế tiếp
        ↓
Kéo nguyên khối vào footprint trống ở tầng dưới
        ↓
Các cell cùng ID chạm cạnh tạo Match 2
        ↓
Support bị xóa
        ↓
Tile tầng trên rơi xuống
        ↓
Tile vừa rơi có thể Match tiếp
        ↓
Cascade dừng khi board ổn định
        ↓
Kiểm tra đủ pairGoal chưa
        ↓
Lấy polyomino tiếp theo và lặp lại
```

Core loop chỉ có **một input chủ động**: kéo và thả polyomino.

## 6. Luật gameplay chính

### 6.1 Board

- Grid `6×6`.
- Mỗi cell có tối đa hai tầng: dưới `z = 0`, trên `z = 1`.
- Layer trên do level data đặt sẵn.
- Người chơi không thể xây thêm layer trên.

### 6.2 Nguồn block

- Một polyomino hiện tại có thể kéo.
- Một polyomino kế tiếp được preview.
- Không có ba lựa chọn cùng lúc.
- Mỗi polyomino có ít nhất hai cell.
- Các cell trong một polyomino có thể mang Mahjong ID khác nhau.
- Queue deterministic và lặp vô hạn; không có giới hạn số block hay lượt.

### 6.3 Luật đặt block

Một drop chỉ hợp lệ khi:

- Toàn bộ footprint nằm trong board.
- Mọi cell đích hoàn toàn trống.
- Không cell nào có tile ở tầng dưới hoặc tầng trên.

Tất cả cell của block mới luôn vào tầng dưới.

Polyomino là vật thể cứng trong khi kéo. Sau khi đặt, từng cell trở thành tile độc lập để Match, bị xóa hoặc tham gia trạng thái board.

### 6.4 Luật Match 2

Hai tile Match khi đồng thời thỏa:

1. Cùng Mahjong ID.
2. Cùng ở tầng dưới.
3. Chạm cạnh ngang hoặc dọc.
4. Ít nhất một tile thuộc tập active của lượt hiện tại: tile vừa đặt hoặc vừa rơi.

Không tính chạm góc. Tile tầng trên không Match với tầng trên hoặc tầng dưới.

Luật active ngăn các cặp tĩnh không liên quan tự nổ toàn board. Người chơi phải thấy kết quả xuất phát từ hành động vừa thực hiện.

### 6.5 Support và gravity

- Tile tầng dưới có thể Match kể cả khi đang đỡ một tile trên.
- Khi tile support biến mất, tile tầng trên cùng cell rơi xuống `z = 0`.
- Tile vừa rơi được thêm vào tập active.
- Nếu nó tạo Match mới, resolver chạy wave tiếp theo.
- Cascade kết thúc khi không còn active pair.

### 6.6 Điều kiện thắng

- Mỗi level có một `pairGoal`.
- Thắng khi tổng số cặp đã phá đạt mục tiêu.
- Không bắt buộc dọn sạch board.
- Một cascade có thể đóng góp nhiều cặp.

### 6.7 Điều kiện thua

- Không có timer.
- Không có move limit.
- Queue không hết.
- Thua khi polyomino hiện tại không còn footprint hợp lệ ở tầng dưới trước khi đạt pairGoal.

Đây là áp lực không gian tự nhiên, không phải constraint gắn thêm.

## 7. Vì sao Mahjong và Block đều thiết yếu

### Bỏ Mahjong identity

- Các cell không còn lý do Match theo cặp.
- Không biết support nào bị phá.
- Gravity chain mất cấu trúc.
- Game chỉ còn bài đặt polyomino vào ô trống.

### Bỏ Block shape

- Người chơi chỉ đặt từng tile cạnh mate.
- Footprint, chừa không gian và preview kế tiếp mất ý nghĩa.
- Mixed-ID trigger không còn trade-off không gian.

### Quan hệ compound

`Shape định vị identity → identity phá support → support đổi topology → topology quyết định footprint tương lai`

Đây là vòng phản hồi, không phải hai minigame đứng cạnh nhau.

## 8. MDA — từ luật đến cảm xúc

### Mechanics

- Floor-only polyomino placement.
- Mixed Mahjong ID theo cell.
- Match 2 tầng dưới.
- Preset support/roof.
- Gravity theo cell.
- Current/next deterministic queue.
- Pair-goal win condition.

### Dynamics

- Tìm một cell trigger trong shape nhưng vẫn phải đặt được toàn footprint.
- Chừa vùng trống cho block kế tiếp.
- Nhắm support có upper tile phù hợp với mate tiếp theo.
- Tạo chain nhiều wave thay vì chỉ một cặp trực tiếp.
- Dùng placement không Match như nước chuẩn bị, nhưng chịu áp lực board chật hơn.

### Aesthetics

- Dễ hiểu và ít áp lực.
- Competence từ việc đọc ra trigger.
- Anticipation trước khi drop.
- Release khi support vỡ.
- Satisfying cascade khi roof rơi đúng chuỗi.
- Relief khi board mở và mục tiêu tiến triển.

### Giả thuyết coherence cần playtest

`Người chơi đọc được tile dưới`  
→ `dự đoán support nào sẽ vỡ`  
→ `quy cascade cho placement của mình`  
→ `cảm thấy thông minh rồi được giải tỏa`.

Nếu tile dưới không đọc được, toàn bộ chuỗi cảm xúc chuyển từ competence sang may rủi.

---

## 9. Đối chiếu với 6 mục tiêu của puzzle design

### Mục tiêu 1 — Hook rõ ràng

Hook nằm ở quan hệ `Match support → roof rơi → Match tiếp`, không nằm ở theme Mahjong.

Luật ít nhưng có khả năng sinh nhiều tình huống từ:

- Shape khác nhau.
- Identity khác nhau trong cùng shape.
- Vị trí support.
- Tile trên support.
- Mate ở tầng dưới.
- Thứ tự current/next.

**Rủi ro:** nếu level chỉ có một trigger hiển nhiên và cascade dọn gần hết mục tiêu, game sẽ thành tìm “điểm đúng” thay vì puzzle có nhiều quyết định.

### Mục tiêu 2 — Dễ hiểu, dễ vào

Mục tiêu người chơi nhìn thấy ngay: `phá X cặp`.

Input: một drag.

Rule card tối thiểu:

1. Kéo nguyên khối vào ô trống.
2. Hai tile giống nhau ở tầng dưới sẽ Match.
3. Mất support thì tile trên rơi xuống.

Không cần giải thích Mahjong truyền thống, line clear, khay, power-up hoặc currency.

### Mục tiêu 3 — Độ khó là hệ thống có chủ đích

Các trục định lượng mịn:

- `pairGoal`.
- Số loại tile.
- Số stack.
- Mật độ cell trống.
- Độ dài chain.
- Số trạm gravity độc lập.
- Số cell trong polyomino.
- Tỷ lệ cell trigger/cell chờ trong shape.
- Khoảng cách từ trigger tới mate.
- Số placement hợp lệ cho current block.

Các trục định tính nên dùng tiết chế:

- Lần đầu giới thiệu mixed-ID shape.
- Lần đầu một block kích hoạt hai chain.
- Lần đầu cần dùng preview để chừa footprint.

Khi giới thiệu một nhảy định tính, phải nới trục định lượng: board thoáng hơn, pairGoal thấp hơn hoặc chain dễ đọc hơn.

Đường cong production nên là răng cưa, không tăng đều. Sau một level chain dài khó, đặt một level payoff dễ để củng cố mastery.

### Mục tiêu 4 — Nhắm đúng feeling

Feeling đích là “controlled collapse”, không phải challenge nặng.

Mechanics hỗ trợ:

- Không timer.
- Không move limit.
- Queue preview.
- Objective không yêu cầu clear-all.

Dynamics hỗ trợ:

- Nhiều giải quyết nhỏ.
- Cascade theo wave rõ ràng.
- Sai nhẹ làm board chật dần thay vì phạt tức thì.

Presentation hỗ trợ:

- Match pop ngắn và rõ.
- Upper tile nhấc trước khi support vỡ.
- Fall có gia tốc, tiếp đất mềm.
- Âm thanh tăng cao độ theo wave nhưng không gây căng thẳng.
- PairGoal tiến triển ngay sau từng cặp.

### Mục tiêu 5 — Trọn vẹn hơn nhiều tính năng

Core đã feature-freeze. Những thứ không thuộc final core:

- Khay chờ.
- Chọn/reorder pair.
- Line clear.
- Player-created roof.
- Match tầng trên.
- Rotation trong prototype core.
- Booster, bomb, wildcard, lock, timer, move limit.
- Manual tilt, sow hoặc chọn hướng gravity.

Ưu tiên tiếp theo là hoàn thiện onboarding, level curve, forecast, visual, sound và validation — không mở thêm feature tree.

### Mục tiêu 6 — Playtest

Các tín hiệu tốt:

- Người chơi bắt đầu kéo trong dưới 10 giây.
- Sau level đầu, họ nói được “phá tile dưới thì tile trên rơi”.
- Họ nhìn next block trước khi thả current.
- Họ chỉ vào support và dự đoán ít nhất một wave tiếp theo.
- Họ buột ra phản ứng khi cascade dài hơn dự kiến nhưng vẫn hiểu nguyên nhân.
- Họ thử một placement khác để tạo chain tốt hơn.

Các tín hiệu xấu:

- Chỉ thả vào ô xanh mà không biết vì sao.
- Không phân biệt tile trên và dưới.
- Nghĩ tile trên cũng có thể Match.
- Cascade xảy ra nhưng không biết placement nào gây ra.
- Tìm đúng một vị trí bằng trial-and-error.
- Cảm thấy queue lặp là ngẫu nhiên hoặc game đang gian lận.

## 10. Visual language phục vụ core

### Stack trong một cell

- Mọi phần tử bị clip trong cell; không lấn sang neighbor.
- Tile dưới gần full-size.
- Tile trên nhỏ hơn, nằm ở góc dưới-phải.
- Góc trên-trái của tile dưới lộ rank và màu suit thật.
- Không dùng icon khóa hoặc badge mô tả tầng.

### Placement preview

- Vàng: toàn bộ footprint sẽ vào tầng dưới.
- Xanh lá: placement tạo Match trực tiếp.
- Đỏ: ít nhất một cell bị chiếm hoặc vượt board.
- Forecast ghi rõ khi Match sẽ làm tile trên rơi tiếp.

### Animation hierarchy

1. Block đáp xuống tầng dưới.
2. Cặp active sáng lên.
3. Support pop.
4. Upper tile nhấc nhẹ rồi rơi.
5. Wave tiếp theo bắt đầu.
6. HUD cộng pair sau mỗi wave.

Không chạy đồng thời mọi hiệu ứng; sequence phải giúp người chơi đọc nhân–quả.

## 11. Level design framework

### Vai trò của level

Level không nên thêm add-on feature. Level chỉ tổ hợp các biến đã có để đặt câu hỏi mới:

- Trigger nào đáng dùng?
- Footprint nào nên được giữ trống?
- Chain nào nên kích hoạt trước?
- Có nên lấy Match trực tiếp hay chuẩn bị cascade dài hơn?

### Cấu trúc dạy đề xuất

| Pha | Nội dung |
|---|---|
| Learn | Một chain, ba ID, placement gần như hiển nhiên |
| Confirm | Hai trạm độc lập, cho phép chọn thứ tự |
| Practice | Chain dài/ngắn và pairGoal tăng nhẹ |
| Combine | Mixed-ID domino kích hoạt hai support |
| Plan | Phải dùng preview để chừa footprint |
| Mastery | Nhiều hướng gravity, nhiều trigger, vẫn không thêm luật mới |

### Guardrail cho casual 35+

- Chỉ 2–5 placement đáng cân nhắc; không để 20 ô trống tương đương nhau.
- Tile dưới phải nhận diện được trong dưới hai giây.
- Level đầu có win rate rất cao.
- Không dùng memory; thông tin cần thiết luôn hiện trên board.
- Không tạo cụm ba tile cùng ID nếu resolver pair có thể mơ hồ.
- Không bắt người chơi dự đoán quá hai wave trong tutorial.
- Một level khó nên được theo sau bởi một level payoff dễ hơn.

## 12. Test đồ chơi và Removal Test

### Toy test

Ngay cả trước khi có pairGoal, việc kéo một mixed-ID shape để làm support vỡ và roof rơi phải tạo cảm giác đáng nghịch.

Câu hỏi:

> Người chơi có tự thử thả cùng một shape ở vị trí khác chỉ để xem cascade thay đổi thế nào không?

Nếu không, level setup có thể đang quá script hoặc feedback chưa đủ hấp dẫn.

### Removal Test

| Loại bỏ | Điều gì mất |
|---|---|
| Mahjong identity | Không còn Match/support chain |
| Polyomino shape | Không còn bài toán footprint và current/next |
| Layer preset | Không còn gravity payoff |
| Gravity | Match chỉ là xóa cặp phẳng, hook biến mất |
| Preview next | Planning giảm, game nghiêng về phản ứng |

## 13. Rủi ro thiết kế còn lại

### Cascade quá script

Nếu chỉ có một drop thắng, người chơi giải bằng tìm hotspot. Cần tăng số route hợp lệ và tạo trade-off giữa Match trực tiếp, chain và footprint tương lai.

### Cascade không quy về agency

Nếu chain chạy quá nhanh hoặc tile dưới khó đọc, payoff trở thành spectacle không có competence. Cần forecast và nhịp animation rõ.

### Queue vô hạn làm giảm tension

Queue không hết, nhưng board space vẫn là pressure. Nếu người chơi có thể spam vùng trống mà không chịu hậu quả, cần chỉnh level density và sequence; không nên chữa bằng move limit ngay.

### Mixed-ID quá tải

Mỗi shape chỉ nên có 2–3 cell trong early game và 3–4 ID toàn level. Shape lớn hơn chỉ xuất hiện sau khi người chơi đã đọc stack thành thạo.

### Visual stack chưa đủ rõ

Nếu test với người trên 35 tuổi vẫn nhầm tầng dưới, ưu tiên tăng vùng lộ và scale artwork. Không thêm badge trước khi thử giải pháp vật lý.

## 14. Playtest protocol tối thiểu

### Thiết lập

- 5–8 người chơi, ưu tiên trên 35 tuổi.
- Không giải thích ngoài ba câu luật trong game.
- Cho chơi level 1–5.

### Ghi nhận

- Thời gian tới drag đầu tiên.
- Số drop invalid.
- Số lần nhìn next preview.
- Số lần chỉ đúng tile tầng dưới trước khi drop.
- Số lần dự đoán đúng ít nhất một fall.
- Thời gian dừng suy nghĩ dài hơn 15 giây.
- Level phải restart.
- Phản ứng tự phát khi cascade xảy ra.

### Câu hỏi sau chơi

1. Vì sao tile trên vừa rơi xuống?
2. Tile nào trong block vừa rồi bắt đầu chain?
3. Block kế tiếp đã ảnh hưởng vị trí bạn chọn thế nào?
4. Bạn cảm thấy cascade do mình tạo hay game tự làm?
5. Bạn có muốn thử lại để tạo chain khác không?

### Tiêu chí giữ core

- Phần lớn người chơi diễn đạt đúng luật support sau level 1.
- Không có nhầm lẫn hệ thống về Match tầng trên.
- Người chơi bắt đầu dùng next preview từ level 3 trở đi.
- Cascade được quy cho quyết định của người chơi.
- Có mong muốn replay vì route, không chỉ vì chưa hiểu luật.

## 15. Core lock statement

Final core được khóa như sau:

> Người chơi kéo một polyomino mixed-ID từ queue vào các ô trống tầng dưới. Match 2 cùng ID phá support; tile preset tầng trên rơi xuống và có thể tiếp tục Match theo cascade. Người chơi thắng khi phá đủ số cặp. Toàn bộ trải nghiệm dùng một drag, một current block, một next preview, không timer, không move limit và không hệ thống phụ.

Mọi đề xuất tương lai chỉ được đưa vào core nếu:

1. Nó dùng cùng verb kéo–thả.
2. Nó làm sâu hơn quan hệ shape → identity → support → gravity.
3. Nó không tăng đáng kể action load hoặc cognitive load.
4. Nó giải quyết một vấn đề được quan sát trong playtest.


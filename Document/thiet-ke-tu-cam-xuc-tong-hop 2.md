# Thiết Kế Ý Tưởng Game Từ Cảm Xúc — Cùng LLM
### Verb-Arc · Con đường generative · Vai trò & giới hạn của LLM (bản tổng hợp)

> Bản này hợp nhất hai mảnh: **(I) kỹ thuật/lens** để *mô tả & nối* cảm xúc với mechanic, và **(II) con đường generative** để đi *từ một cảm xúc → ra ý tưởng game*. Hai ví dụ chạy xuyên suốt: **Snow Throw** (agentive) và **game tổ kiến** (receptive).
> Nguyên tắc gốc: cái game designer *hướng tới* là **cảm xúc**, cái họ *bắt đầu* lại là **động từ (verb)**. Tài liệu này nói về cách bắc cầu hai đầu — cả chiều phân tích lẫn chiều sáng tạo. Đây là chiều **ngược của MDA** (Aesthetic → Dynamic → Mechanic).
> Cách làm ở đây là **người thiết kế + LLM cùng làm**: LLM *sinh ứng viên* (tên cảm xúc, verb-arc, mechanic), người *chọn theo cảm giác thật* rồi *đem playtest*. Vai trò và giới hạn của LLM nói rõ ở **§8**.

**Ba điều khung — đọc trước:**
- Đây là **hướng / scaffold, không phải công thức bảo đảm.** Nó tổ chức việc tìm kiếm, không xóa cú nhảy sáng tạo (nhất là bước chọn verb).
- **Emotion-first chỉ là MỘT cửa vào.** Game hay cũng khởi từ *mechanic-first*, *theme / fantasy-first*, hay *khe hở thị trường*. Sức mạnh của emotion-first là **coherence** — lý do nó hợp để dạy.
- Mọi mắt xích là **giả thuyết** — chỉ **playtest** mới chốt. Coherence-trên-giấy ≠ coherence-khi-chơi.

---

# PHẦN I — NỀN TẢNG & KỸ THUẬT (cách nghĩ)

## 1. Ba lớp MDA và "điểm kết nối"

MDA (Hunicke, LeBlanc & Zubek, 2004) chia một game thành ba lớp:
- **Mechanic** — luật chơi / verb (người chơi làm gì)
- **Dynamic** — hành vi nảy sinh khi chơi thật
- **Aesthetic** — cảm xúc / trải nghiệm đích

Giá trị thật của việc trình bày ba lớp này KHÔNG phải sinh ra thiết kế, mà là **soi sự ăn khớp (coherence)**: verb này có thật sự đẻ ra dynamic kia không, dynamic kia có thật sự tạo ra cảm xúc đích không. Nó là *lens chẩn đoán*, không phải *công cụ sinh tạo*. Các mắt xích trên giấy là **giả thuyết** — chỉ playtest xác nhận.

## 2. Vấn đề: nhãn Aesthetic tĩnh thì rời rạc

Nếu điền ô Aesthetic bằng một **tính từ tĩnh** ("vui", "căng thẳng") hoặc một nhãn phân loại ("Sensation", "Challenge"), nó *đứng tách* khỏi verb:
- Không thấy mechanic đẻ ra cảm xúc đó bằng cách nào.
- Quá thô: "Challenge" có thể đến từ cả ngàn verb khác nhau → nhãn *under-determine* mechanic.

## 3. Kỹ thuật Verb-Arc (trọng tâm)

**Quy tắc:** tả cảm xúc đích bằng **một chuỗi động từ (một arc)**, không bằng tính từ tĩnh.

Ví dụ — Snow Throw: **tích lũy → giữ → buông → va chạm.**

**Vì sao nó hoạt động:** một động từ có thể *đồng thời* chỉ ba thứ — một hành động (mechanic), tình huống nó tạo ra (dynamic), và mang sẵn một sắc cảm xúc (aesthetic). Ví dụ "buông": vừa là thao tác (THROW), vừa là khoảnh khắc cam kết được giải tỏa (dynamic), vừa là cảm giác catharsis (aesthetic). **Động từ là cái bản lề chạm cả ba lớp.** Khi tả cảm xúc bằng cùng *văn phạm động từ* với mechanic, hai lớp **chung một bộ xương** — đó chính là "điểm kết nối".

Mỗi pha cảm xúc trùng khít một beat của action loop:

| Pha cảm xúc (Aesthetic) | Beat hành động (Verb / Dynamic) |
|---|---|
| tích lũy | MERGE — dựng sức mạnh |
| giữ | khoảnh khắc build-or-spend (cầm quả, lưỡng lự) |
| buông | THROW — buông tay |
| va chạm | pierce — hệ quả lên thế giới |

**Hai lợi ích:** (1) **mịn hơn** — có *hình dạng theo thời gian* của cảm xúc thay vì một nhãn tĩnh; (2) **tự nối** — mỗi pha chỉ thẳng một beat phải dựng trong mechanic / dynamic.

## 4. Agentive vs Receptive — hai ví dụ

Verb-arc *nối-về-mechanic* mạnh khi cảm xúc **cưỡi trên hành động của người chơi** (agentive). Với cảm xúc **được trao** (receptive), arc vẫn tả được nhưng nó neo vào beat của *hệ thống / nội dung tác giả*, không phải verb người chơi.

**Snow Throw (agentive):** *tích lũy → giữ → buông → va chạm* — các động từ là *hành động của người chơi*; cảm xúc do chính tay họ tạo.

**Game tổ kiến (receptive):** *bao quát → ngợp → lần theo → bắt được pattern → sáng ra → mãn nguyện* — cảm xúc là **order-from-chaos satisfaction**; các động từ trung tâm là *tri giác* (lần theo, bắt được), neo vào verb của con kiến (đào, tha). Người chơi *phát hiện* trật tự, không *tạo* ra nó.

→ Khác biệt này quyết định **người chơi ngồi đâu** và game thuộc loại nào — và là bước phân loại bắt buộc ở Phần II.

## 5. Toolkit cảm xúc: từ cảm xúc cụ thể → điều kiện

Verb-arc là cách **tả & nối**, không phải cách *suy ra* verb. Để đi từ một cảm xúc cụ thể về thiết kế, dùng thêm **mô hình cảm xúc mịn hơn 8-kinds**:
- **Lazzaro — 4 Keys to Fun** (2004): đặt tên hẳn "fiero" (niềm vui chiến thắng gian khó); Hard / Easy / Serious / People Fun.
- **OCC model** (Ortony, Clore & Collins, 1988): mô hình *appraisal* — định nghĩa từng cảm xúc theo cách *đánh giá tình huống*; gần "sinh tạo" nhất.
- **Self-Determination Theory** (Deci & Ryan): competence / autonomy / relatedness.

**Quy trình cảm xúc → verb (micro):**
1. Đặt tên cảm xúc *càng cụ thể càng tốt* (vd "fiero từ cú ném mạo hiểm phút chót").
2. Phân rã bằng appraisal: người chơi phải *đánh giá* gì để thấy cảm xúc đó? (fiero cần: rủi ro thật + thành công quy về kỹ năng của họ).
3. Appraisal đó *ràng buộc* dynamic cần có.
4. Dynamic *gợi ra* verb + feedback.

→ Verb suy ra **sau cùng**, từ dynamic. Verb-arc hỗ trợ ở khâu (1) làm rõ cảm xúc và nối nó sang (3)(4).

## 6. Verb như trục xương sống: đào sâu thay vì mở rộng

**Sau khi có verb từ Aesthetic** (vd MERGE + THROW), verb trở thành **trục để mọi thiết kế khác bám vào** — power growth, tension, enemy đều xoay quanh chính nó. Đây là **depth over breadth** (sâu thay vì rộng).

**Cơ chế tạo depth:** hệ thống mới cùng *cắm vào* verb thì **nhân** với hệ thống có sẵn (compound). Ở Snow Throw: một enemy ép THROW ⟷ trục nâng cấp THROW ⟷ tension build-or-spend — chúng giao nhau. Hệ thống KHÔNG chạm verb (vd ghép minigame câu cá) chỉ *cộng thêm bề mặt* = breadth.

> Chung trục verb → các hệ thống giao nhau → depth tổ hợp.
> Không chung trục → siloed → chỉ là phép cộng.

**Orthogonal nhưng intersecting:** depth tốt nhất khi mỗi hệ thống thêm một *chiều khác biệt* mà vẫn bám verb. Hai trục **SNOW vs THROW** của Snow Throw đúng kiểu này — khác facet, cùng phục vụ core. (Trần ≤5 power layer là cách *cưỡng chế* depth-not-breadth; orthogonality giữ các tầng không đè nhau.)

**Palette các chiều để đào sâu quanh một verb:** Power/progression · Tension/decision · Enemy/challenge · Mastery · Modifier · Feel/feedback · Không gian/bối cảnh · Tương tác giữa các verb.

**Caveat:** "sâu thay vì rộng" là *default* đúng, không tuyệt đối. Breadth vẫn cần cho đổi mới / chống nhàm; live-service cần một ít breadth (mode, event) để giữ chân. Nguyên tắc: **đào sâu core TRƯỚC, mở rộng SAU, ưu tiên breadth nào vẫn móc vào verb.** Cái nó chống là *feature creep*.

---

# PHẦN II — CON ĐƯỜNG THIẾT KẾ TỪ CẢM XÚC (quy trình generative)

## 7. Bảy bước

**0. Bắt từ một cảm xúc THẬT, cụ thể** — tả thật chi tiết (phenomenology trước).
**1. Gọi tên cảm xúc** — càng cụ thể càng tốt (dùng toolkit ở §5 nếu cần).
**2. Tìm verb-arc** — diễn thành chuỗi động từ → lộ shape (thường tension → release).
**3. Phân loại agency** — receptive hay agentive? (xem §4).
**4. Chọn VERB của người chơi** — cú nhảy thiết kế cốt lõi.
**5. Kiểm tra coherence + rủi ro** — verb có *thật sự móc* vào arc không? mắt xích dễ đứt ở đâu?
**6. Dựng hệ thống QUANH verb** — đào sâu (§6) + một cách *bơm lại chaos* để cảm xúc lặp lại; cài núm Flow.
**7. Build → playtest → xem arc có *nổ* lúc chơi không** — lặp lại. Bộ lọc cuối, không bỏ được.

**Hai ví dụ chạy qua 7 bước:**

| Bước | Snow Throw (agentive) | Game tổ kiến (receptive) |
|---|---|---|
| 0. Cảm xúc thật | *(map ngược)* khoái cảm build-rồi-giải-tỏa | xem tổ kiến: loạn → trật tự, lớn dần |
| 1. Đặt tên | satisfaction của cú giải tỏa có tính toán | order-from-chaos satisfaction |
| 2. Verb-arc | tích lũy → giữ → buông → va chạm | bao quát → ngợp → lần theo → bắt được pattern → sáng ra → mãn nguyện |
| 3. Agency | **agentive** — verb của người chơi | **receptive** — verb của kiến/hệ thống + tri giác |
| 4. Player-verb | MERGE + THROW | PROVIDE / TEND (đặt thức ăn; kiến tự đào) |
| 5. Coherence / rủi ro | một build trùm hết → mất chiều sâu | feeding mỏng → đứng xem → chán |
| 6. Hệ thống quanh verb | 2 trục SNOW/THROW · enemy tạo demand · bounce/pierce mastery | đặt-chỗ định hình hang · khan hiếm = quyết định · sự kiện = chaos mới |
| 7. Playtest hỏi gì | cú ném có "đã tay"? quyết định gộp-hay-ném có căng? | trật tự hiện ra có "đọc được"? feeding có *cảm thấy* gây ra trật tự? |

*(Lưu ý trung thực: Snow Throw vốn được thiết kế **mechanic-first** rồi map ngược ra cảm xúc — nó minh họa rằng khung này dùng được cả để *phân tích* một game có sẵn, không chỉ để *sinh* game mới.)*

### Case study: verb-arc là "X-quang", không phải công thức

Bản mô tả Snow Throw *đầu tiên* (của chính tác giả, làm bằng trực giác — **mechanic-first**), rút gọn:

> "gom tuyết, ghép thành cục bự, quăng vào enemy đi từ trên xuống… feeling: gom + ghép → *đã đã*; quăng cục bự → *phá hủy*; tốc độ dot lớn lên / số enemy tiến đến = áp lực."

**Lens verb-arc rọi vào → cấu trúc lộ ra** (vốn đã nằm sẵn, không phải áp từ ngoài):
gom → ghép → **[đã đã]** → quăng → **[va chạm]** ≈ *tích lũy → giữ → buông → va chạm*.
Tác giả đã *ghép verb với cảm xúc* theo trực giác — đúng cái verb-arc hệ thống hóa.

**Lens *thêm* gì so với bản gốc:** (1) gọi tên cảm xúc mịn hơn ("đã đã / phá hủy" → satisfaction-tích-lũy / catharsis-va-chạm); (2) nhấc **"giữ" / build-or-spend** thành dynamic tâm điểm (bản gốc mới *gieo mầm* qua áp lực thời gian); (3) xếp thành arc tuần tự + **kiểm tra coherence**.

**Bài học:** đây là game **mechanic-first** (không "chạy" con đường ở §7), nhưng lens vẫn rọi ra cấu trúc — *chứng tỏ verb-arc là công cụ mô tả/kiểm tra dùng được cả chiều phân tích*, và rằng **trực giác có trước cái tên**. Verb-arc là *X-quang*, không phải *recipe*; emotion-first chỉ là một trong nhiều cửa vào. (Lưu ý khung: điều này KHÔNG có nghĩa "phương pháp không cần" — nó cho thấy lens *có giá trị*, dùng được cả để phân tích.)

## 8. Vai trò của LLM trong phương pháp này — và giới hạn

Trong thực hành, nhiều bước phân tích — đặt tên cảm xúc, sinh verb-arc, gợi mechanic — được thực thi bằng **LLM**. Cần minh bạch:

**Xuất xứ "verb-arc":** đây là một **lens tổng hợp do LLM (Claude) đưa ra**, ráp từ mô tả cảm xúc của người dùng + synthesis của model — **không phải khái niệm có sẵn trong tài liệu game design.** Hệ quả: đừng cite như canon; coi là *giả thuyết-scaffold*; giá trị đo bằng "có giúp thiết kế tốt hơn / sống sót playtest không".

**Rủi ro lõi:** **LLM sẽ *trôi chảy* sinh ra một verb-arc cho BẤT KỲ mô tả cảm xúc nào.** Fluency ≠ validity. Output của LLM là **máy sinh giả thuyết, không phải oracle chân lý**.

**Safeguard — generate-and-select:** thay vì nhận câu trả lời trôi chảy đầu tiên, yêu cầu LLM đưa **N phương án** (vd 10 tên cảm xúc; rồi 10 verb-arc; rồi N player-verb), và **chính người thiết kế chọn cái khớp *cảm giác thật* nhất**. Phân vai: *LLM = máy sinh ứng viên; người = bộ phân biệt.* Hiệu quả vì (a) dời phán định validity về ground truth của người, (b) đổi từ *task chấp nhận* sang *task phân biệt* (đáng tin hơn), (c) loại dần các phương án sai làm *sắc* chính introspection.

### Ba giới hạn của safeguard này — phải nhớ, đừng quá tin chính nó

1. **Tập ứng viên *giới hạn* câu trả lời.** Bạn chỉ chọn trong N cái LLM đưa. Nếu cả N đều trượt cấu trúc thật (vd đều xoay quanh một trục sai), bạn chọn cái "ít sai nhất" và *tưởng* đã tìm ra. LLM còn hay sinh N cái *nghe khác mà gốc giống nhau* (mode collapse) → ảo giác đa dạng.
   → **Yêu cầu các phương án khác nhau thật sự; coi "không cái nào khớp" là một output hợp lệ, quan trọng — đừng ép mình phải chọn.**

2. **Introspection cũng sai được — và bị lời lẽ trôi chảy *dẫn dắt*.** Một mô tả viết hay có thể khiến bạn *tin* mình đã cảm thấy thế (gợi ý / confabulation).
   → **Chọn *trước khi* đọc phần LLM giải thích; để ý mình đang cộng hưởng *thật* hay đang bị câu chữ đẹp quyến rũ.**

3. **"Khớp cảm giác" ≠ "thành game hay".** Dù chọn đúng verb-arc khớp cảm xúc, nó vẫn có thể không dịch được thành agentive play, hoặc không *bền*. Safeguard này chỉ chứng thực *đầu* pipeline; *đuôi* (có thành game chơi được / giữ chân không) vẫn phải **playtest**.
   → **Hai bộ lọc cho hai khúc khác nhau: felt-match ở đầu, playtest ở cuối.**

---

# PHẦN III — EPISTEMICS & TÓM TẮT

## 9. Định vị epistemics (để dạy đúng tính chất)

Khi đứng lớp, tách rõ ba loại — vừa truyền nội dung, vừa rèn thái độ học thuật:
- **Có nguồn học thuật, cite được:** MDA (2004), Flow (Csikszentmihalyi, 1990), 8 kinds of fun (LeBlanc), 4 Keys (Lazzaro, 2004), OCC (Ortony / Clore / Collins, 1988), SDT (Deci & Ryan).
- **Nguyên lý có thật, gốc ngành khác, vay vào game:** tension-and-release (nhạc & kịch → pacing); depth over breadth, emergence, orthogonality (craft / lý thuyết hệ thống).
- **Lens thực hành / tổng hợp (gồm cái gốc LLM):** **verb-arc** (gốc LLM-assisted), "build → hold → release → impact", "ba tầng / hai tầng challenge", "enemy = câu hỏi".

Minh bạch về công cụ: **LLM = engine sinh giả thuyết; con người = bộ lọc (đối chiếu cảm giác thật + truy vấn phê phán); playtest = trọng tài cuối.**

## 10. Tóm tắt

**Vòng khép kín:** cảm xúc thật → đặt tên cụ thể → verb-arc → phân loại agency → chọn player-verb → dựng hệ thống quanh verb (sâu + lặp lại, orthogonal + intersecting) → playtest.

**Ba ý cốt:**
1. **Tả cảm xúc bằng chuỗi động từ, không bằng tính từ tĩnh** — vì động từ chạm cả ba lớp MDA cùng lúc → vừa *mịn hơn* vừa *tự nối* về mechanic.
2. **Verb là xương sống** — đào sâu quanh nó, đừng mở rộng ra ngoài nó.
3. **Hai bộ lọc, hai khúc** — felt-match (sinh N → chọn theo cảm giác thật, nhớ 3 giới hạn ở §8) ở *đầu*; **playtest** ở *cuối*. LLM giúp ở khâu sinh; phán định luôn thuộc về người + bản chơi thật.

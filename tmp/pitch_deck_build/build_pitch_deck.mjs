import fs from "node:fs/promises";
import { Presentation, PresentationFile } from "@oai/artifact-tool";

const root = "C:/Users/LAP17257/OneDrive - VNG Group JSC/Documents/Mahjong x Block";
const out = `${root}/Final/Mahjong_x_Block_Pitch_Deck.pptx`;
const figma = `${root}/Figma UI Export`;
const W = 1280, H = 720;
const C = {
  ink: "#1B1009", wood: "#3A2417", wood2: "#5C3921", cream: "#F6ECD8",
  gold: "#E8B64C", jade: "#86A94D", red: "#B33A26", muted: "#CDBB9E", line: "#7B572F"
};

async function bytes(path) {
  const b = await fs.readFile(path);
  return b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength);
}

function box(slide, x, y, w, h, fill, radius = "rounded-xl", line = C.line) {
  return slide.shapes.add({ geometry: "roundRect", position: { left: x, top: y, width: w, height: h }, fill, line: { style: "solid", fill: line, width: 1 }, borderRadius: radius });
}

function text(slide, value, x, y, w, h, size = 20, color = C.cream, opts = {}) {
  const s = slide.shapes.add({ geometry: "textbox", position: { left: x, top: y, width: w, height: h }, fill: "none", line: { style: "solid", fill: "none", width: 0 } });
  s.text = value;
  s.text.style = { fontSize: size, color, bold: !!opts.bold, alignment: opts.align || "left", verticalAlignment: opts.valign || "middle" };
  return s;
}

function rule(slide, x, y, w, color = C.gold, h = 3) {
  slide.shapes.add({ geometry: "rect", position: { left: x, top: y, width: w, height: h }, fill: color, line: { style: "solid", fill: color, width: 0 } });
}

function base(slide, index, section = "MAHJONG × BLOCK") {
  slide.background.fill = C.ink;
  slide.shapes.add({ geometry: "rect", position: { left: 0, top: 0, width: W, height: 18 }, fill: C.gold, line: { style: "solid", fill: C.gold, width: 0 } });
  text(slide, section, 72, 34, 360, 22, 13, C.gold, { bold: true });
  text(slide, String(index).padStart(2, "0"), 1140, 34, 68, 22, 13, C.muted, { bold: true, align: "right" });
  rule(slide, 72, 672, 1136, C.line, 1);
  text(slide, "Nguồn: GDD Tổng Hợp — Mahjong × Block (Final Core)", 72, 682, 620, 18, 10, C.muted);
}

function notes(slide, sources) {
  slide.speakerNotes.textFrame.setText(`[Sources]\n${sources.map(s => `- ${s}`).join("\n")}`);
  slide.speakerNotes.setVisible(true);
}

async function image(slide, file, x, y, w, h, fit = "cover") {
  slide.images.add({ blob: await bytes(file), contentType: "image/png", alt: "Product UI screenshot", fit, position: { left: x, top: y, width: w, height: h }, geometry: "roundRect", borderRadius: "rounded-xl" });
}

function title(slide, heading, sub) {
  text(slide, heading, 72, 76, 760, 76, 42, C.cream, { bold: true });
  rule(slide, 72, 164, 124, C.gold, 4);
  if (sub) text(slide, sub, 72, 182, 760, 48, 20, C.muted);
}

function stat(slide, n, label, x, y, w = 180) {
  text(slide, n, x, y, w, 58, 38, C.gold, { bold: true, align: "center" });
  text(slide, label, x, y + 61, w, 46, 16, C.muted, { align: "center" });
}

async function main() {
  const p = Presentation.create({ slideSize: { width: W, height: H } });
  const menu = `${figma}/01_menu_gate_closed.png`;
  const level = `${figma}/03_levelselect_top.png`;
  const gameplay = `${figma}/05_gameplay.png`;
  const shop = `${figma}/06_shop_tiles.png`;
  const upgrade = `${figma}/07_shop_upgrades.png`;
  const quests = `${figma}/10_quest_tab.png`;
  const checkin = `${figma}/11_checkin_tab.png`;

  // 1 — cover
  {
    const s = p.slides.add(); s.background.fill = C.ink;
    await image(s, menu, 810, 0, 470, 720, "cover");
    s.shapes.add({ geometry: "rect", position: { left: 0, top: 0, width: 870, height: 720 }, fill: C.ink, line: { style: "solid", fill: C.ink, width: 0 } });
    rule(s, 72, 104, 138, C.gold, 5);
    text(s, "MAHJONG × BLOCK", 72, 142, 690, 78, 56, C.cream, { bold: true });
    text(s, "Pitch deck", 72, 232, 380, 32, 23, C.gold, { bold: true });
    text(s, "Puzzle thả khối lai mạt chược\ntrên bàn cờ hai tầng", 72, 286, 620, 100, 30, C.muted);
    text(s, "Bản trình bày dựa trên GDD và bản game hiện có", 72, 602, 560, 28, 16, C.muted);
    notes(s, ["Final/07-GDD-TONG-HOP-TU-INDEX.md", "Figma UI Export/01_menu_gate_closed.png"]);
  }

  // 2 — hook
  {
    const s = p.slides.add(); base(s, 2, "CORE HOOK"); title(s, "Không chọn cặp có sẵn — người chơi tạo ra cơ hội ghép", "Mỗi lượt là một quyết định đặt polyomino, không phải thao tác chọn hai quân.");
    box(s, 72, 254, 472, 324, C.wood);
    text(s, "Điểm khác biệt", 108, 286, 340, 30, 21, C.gold, { bold: true });
    text(s, "Thả một khối nhiều ô vào vị trí hợp lệ. Từng ô rơi độc lập xuống tầng trống thấp nhất của cột đó.", 108, 336, 372, 104, 23, C.cream);
    text(s, "Từ đó, người chơi chủ động tạo, che và lộ các quân để chuẩn bị Match.", 108, 465, 372, 74, 19, C.muted);
    await image(s, gameplay, 610, 214, 526, 394, "cover");
    text(s, "Gameplay hiện có: Current / Next, bàn 2 tầng, booster", 610, 618, 526, 24, 14, C.muted, { align: "center" });
    notes(s, ["Final/07-GDD-TONG-HOP-TU-INDEX.md, mục 1 và 2.1–2.3", "Figma UI Export/05_gameplay.png"]);
  }

  // 3 — rules
  {
    const s = p.slides.add(); base(s, 3, "CORE RULE"); title(s, "Hai tầng biến “lộ mặt” thành một lựa chọn chiến thuật", "Chỉ quân cùng mặt, cùng tầng, kề cạnh và đang lộ mới Match.");
    const xs = [72, 430, 788];
    const vals = [
      ["01", "Tầng sàn & mái", "Mỗi ô chứa tối đa 2 quân. Khối chỉ rơi khi mọi ô con còn chỗ."],
      ["02", "Che để trì hoãn", "Quân tầng sàn bị mái che không được Match, dù đang kề quân cùng mặt."],
      ["03", "Lộ để tạo chuỗi", "Sau khi Match, mái rơi xuống sàn và có thể kích hoạt wave tiếp theo."]
    ];
    vals.forEach((v, i) => { box(s, xs[i], 264, 300, 280, C.wood); text(s, v[0], xs[i] + 30, 292, 80, 42, 30, C.gold, { bold: true }); text(s, v[1], xs[i] + 30, 350, 238, 48, 23, C.cream, { bold: true }); text(s, v[2], xs[i] + 30, 412, 238, 98, 17, C.muted); });
    text(s, "Tín hiệu thiết kế: “đặt đúng chỗ” quan trọng hơn “đặt thật nhanh”.", 72, 584, 1035, 34, 23, C.gold, { bold: true });
    notes(s, ["Final/07-GDD-TONG-HOP-TU-INDEX.md, mục 2.1 và 2.3"]);
  }

  // 4 — core loop
  {
    const s = p.slides.add(); base(s, 4, "CORE LOOP"); title(s, "Core loop tập trung vào đọc bàn, lựa chọn và phản ứng dây chuyền", "Một lượt có thể tạo nhiều wave Match liên tiếp.");
    const steps = [["ĐỌC", "Current, Next, các quân đang lộ"], ["ĐẶT", "Chọn điểm rơi hợp lệ cho cả khối"], ["MATCH", "Nhóm ≥2 quân cùng mặt cùng tầng biến mất"], ["CASCADE", "Mái rơi xuống, tạo wave mới nếu đủ điều kiện"]];
    const x = [72, 352, 632, 912];
    steps.forEach((d, i) => { box(s, x[i], 300, 226, 172, i === 3 ? C.red : C.wood); text(s, String(i + 1).padStart(2, "0"), x[i] + 22, 316, 50, 24, 16, C.gold, { bold: true }); text(s, d[0], x[i] + 22, 355, 176, 30, 24, C.cream, { bold: true, align: "center" }); text(s, d[1], x[i] + 22, 402, 176, 44, 16, C.muted, { align: "center" }); if (i < 3) text(s, "→", x[i] + 234, 360, 38, 32, 28, C.gold, { bold: true, align: "center" }); });
    text(s, "Hệ thống tính chuỗi dài nhất trong một lượt để cộng điểm và hỗ trợ nhiệm vụ chain2.", 72, 536, 1040, 42, 20, C.muted);
    notes(s, ["Final/07-GDD-TONG-HOP-TU-INDEX.md, mục 2.3"]);
  }

  // 5 — content
  {
    const s = p.slides.add(); base(s, 5, "CONTENT"); title(s, "50 level là một curriculum có mục tiêu rõ ràng", "5 chương × 10 level; toàn bộ level chính có lượt đi giới hạn và lời giải được kiểm tra.");
    s.charts.add("bar", { position: { left: 72, top: 256, width: 560, height: 294 }, categories: ["TILE QUOTA", "TARGET FACE", "OPEN SEAL", "BURIED TARGET"], series: [{ name: "Số level", values: [5, 32, 6, 7], fill: C.gold, points: [{ idx: 1, fill: C.jade }, { idx: 2, fill: C.red }] }], barOptions: { direction: "bar", grouping: "clustered", gapWidth: 44 }, hasLegend: false, xAxis: { visible: false, majorGridlines: null }, yAxis: { textStyle: { fill: C.cream, fontSize: 16 }, line: { style: "solid", fill: C.line, width: 1 } }, dataLabels: { showValue: true, position: "outEnd", textStyle: { fill: C.cream, fontSize: 16, bold: true } }, chartFill: C.ink, plotAreaFill: C.ink, plotAreaLine: { style: "solid", fill: C.ink, width: 0 } });
    await image(s, level, 726, 232, 316, 360, "cover");
    text(s, "Phân bố 4 goal type trong 50 level", 72, 580, 560, 26, 16, C.muted, { align: "center" });
    notes(s, ["Final/07-GDD-TONG-HOP-TU-INDEX.md, mục 3 và 5", "Figma UI Export/03_levelselect_top.png"]);
  }

  // 6 — difficulty
  {
    const s = p.slides.add(); base(s, 6, "CONTENT"); title(s, "Độ khó tăng bằng không gian, áp lực và điều kiện mở khóa", "Không cần thêm luật Match mới để tạo biến thể màn chơi.");
    stat(s, "2×2 → 6×6", "kích thước bàn", 72, 264, 260);
    stat(s, "1–8", "lượt đặt khối", 362, 264, 190);
    stat(s, "tới 6", "mặt mục tiêu đồng thời", 600, 264, 210);
    stat(s, "3", "level dùng Lock", 864, 264, 180);
    rule(s, 72, 432, 1058, C.line, 1);
    text(s, "Mốc dạy cụ thể", 72, 468, 220, 28, 20, C.gold, { bold: true });
    text(s, "Lv1: Match cùng tầng + lộ mặt  •  Lv11: Phong Ấn đầu tiên  •  Lv21: Ô Chắn  •  Lv46: One Shot  •  Lv50: tổng hợp toàn bộ cơ chế", 72, 514, 1020, 50, 20, C.cream);
    text(s, "Chỉ Level 1 dùng bàn tay hướng dẫn; các level sau dạy qua cấu trúc bàn và mục tiêu.", 72, 590, 1020, 34, 17, C.muted);
    notes(s, ["Final/07-GDD-TONG-HOP-TU-INDEX.md, mục 4, 5 và 9.4"]);
  }

  // 7 — boosters
  {
    const s = p.slides.add(); base(s, 7, "SUPPORT"); title(s, "Booster hỗ trợ quyết định, không thay đổi điều kiện thắng", "Đổi khối và Hint cùng dùng kho chung, nhưng Level 1 cố ý khóa chúng để dạy luật cơ bản.");
    await image(s, upgrade, 72, 230, 372, 388, "cover");
    box(s, 516, 258, 566, 118, C.wood); text(s, "Đổi khối", 550, 280, 190, 30, 23, C.gold, { bold: true }); text(s, "Bỏ Current, đưa khối kế tiếp lên — không tốn lượt đặt.", 550, 320, 470, 30, 18, C.cream);
    box(s, 516, 398, 566, 118, C.wood); text(s, "Hint", 550, 420, 190, 30, 23, C.gold, { bold: true }); text(s, "DFS từ trạng thái live, highlight vị trí đặt tiếp theo — không tốn lượt.", 550, 460, 470, 30, 18, C.cream);
    text(s, "Người chơi mới: 5 Đổi khối + 5 Hint trong kho dùng chung.", 516, 548, 540, 32, 19, C.muted);
    notes(s, ["Final/07-GDD-TONG-HOP-TU-INDEX.md, mục 2.5 và 7.2", "Figma UI Export/07_shop_upgrades.png"]);
  }

  // 8 — retention
  {
    const s = p.slides.add(); base(s, 8, "ENGAGEMENT"); title(s, "Vòng lặp hằng ngày đặt trên core loop thay vì thay thế nó", "Quest và điểm danh tái sử dụng Xu / booster, không có kho tài nguyên riêng.");
    await image(s, quests, 88, 242, 338, 344, "cover");
    await image(s, checkin, 476, 242, 338, 344, "cover");
    box(s, 862, 254, 274, 154, C.wood); text(s, "3 / 6", 892, 282, 210, 42, 34, C.gold, { bold: true, align: "center" }); text(s, "nhiệm vụ được chọn xác định theo ngày", 892, 330, 210, 48, 16, C.muted, { align: "center" });
    box(s, 862, 428, 274, 154, C.wood); text(s, "30 ngày", 892, 456, 210, 42, 30, C.gold, { bold: true, align: "center" }); text(s, "điểm danh cộng dồn, không phạt khi bỏ lỡ", 892, 504, 210, 48, 16, C.muted, { align: "center" });
    notes(s, ["Final/07-GDD-TONG-HOP-TU-INDEX.md, mục 8", "Figma UI Export/10_quest_tab.png", "Figma UI Export/11_checkin_tab.png"]);
  }

  // 9 — economy
  {
    const s = p.slides.add(); base(s, 9, "ECONOMY"); title(s, "Economy thiên về cosmetic, với booster là một sink cần được cân nhắc", "GDD quy định economy không được chỉnh luật thắng / thua của core loop.");
    await image(s, shop, 742, 204, 352, 420, "cover");
    box(s, 72, 258, 586, 108, C.wood); text(s, "12 skin quân bài", 108, 280, 250, 30, 24, C.gold, { bold: true }); text(s, "0–2.265 Xu; skin mặc định miễn phí.", 108, 322, 430, 20, 17, C.cream);
    box(s, 72, 388, 586, 108, C.wood); text(s, "11 skin bàn cờ", 108, 410, 250, 30, 24, C.gold, { bold: true }); text(s, "0–2.150 Xu; toàn bộ là cosmetic.", 108, 452, 430, 20, 17, C.cream);
    box(s, 72, 518, 586, 108, C.red); text(s, "Gói 5 booster", 108, 540, 250, 30, 24, C.cream, { bold: true }); text(s, "100 Xu / gói; là điểm còn cần quyết định về ưu tiên core versus buff phụ.", 108, 582, 480, 20, 16, C.muted);
    notes(s, ["Final/07-GDD-TONG-HOP-TU-INDEX.md, mục 7 và 12", "Figma UI Export/06_shop_tiles.png"]);
  }

  // 10 — readiness
  {
    const s = p.slides.add(); base(s, 10, "READINESS"); title(s, "Nội dung deterministic đã có “lan can” kỹ thuật; rủi ro chính còn là trải nghiệm thật", "Mỗi lần tải, self-test kiểm tra luật, dữ liệu và lời giải authored.");
    const cards = [
      ["✓", "50 / 50", "level có lời giải authored đạt điều kiện thắng dưới luật hiện tại."],
      ["✓", "2–5 ô", "mọi khối chính thức hợp lệ; tránh tự-Match ngoài ngoại lệ Level 1."],
      ["!", "~6,85 MB", "HTML tự chứa; cần đo độ mượt trên thiết bị yếu bằng playtest thật."],
      ["!", "Nợ kỹ thuật", "prototype tầng 1 vẫn còn trong file và cần refactor rủi ro cao."]
    ];
    cards.forEach((c, i) => { const x = 72 + (i % 2) * 554; const y = 254 + Math.floor(i / 2) * 176; box(s, x, y, 506, 140, i < 2 ? C.wood : C.wood2); text(s, c[0], x + 28, y + 30, 42, 42, 32, i < 2 ? C.jade : C.gold, { bold: true, align: "center" }); text(s, c[1], x + 92, y + 26, 324, 34, 26, C.cream, { bold: true }); text(s, c[2], x + 92, y + 70, 354, 48, 16, C.muted); });
    text(s, "Chế độ generative mới qua mô phỏng bot, chưa qua playtest người thật.", 72, 594, 1036, 30, 18, C.gold, { bold: true });
    notes(s, ["Final/07-GDD-TONG-HOP-TU-INDEX.md, mục 6, 11.1, 11.3 và 12"]);
  }

  // 11 — next decisions
  {
    const s = p.slides.add(); s.background.fill = C.ink; await image(s, menu, 842, 0, 438, 720, "cover");
    s.shapes.add({ geometry: "rect", position: { left: 0, top: 0, width: 920, height: 720 }, fill: C.ink, line: { style: "solid", fill: C.ink, width: 0 } });
    rule(s, 72, 92, 142, C.gold, 5); text(s, "Quyết định tiếp theo", 72, 130, 650, 58, 42, C.cream, { bold: true });
    const rows = ["01  Chạy playtest người thật, ưu tiên thiết bị yếu.", "02  Quyết định giữ hay đưa generative mode vào bản chính thức.", "03  Đối chiếu booster-upgrade với định hướng ưu tiên core gameplay."];
    rows.forEach((r, i) => { box(s, 72, 244 + i * 110, 660, 76, i === 1 ? C.wood2 : C.wood); text(s, r, 102, 262 + i * 110, 590, 40, 20, C.cream, { bold: true }); });
    text(s, "Mahjong × Block đã có một core loop khác biệt, curriculum 50 màn và vòng lặp hỗ trợ được định nghĩa rõ; bước tiếp theo là kiểm chứng cảm nhận người chơi.", 72, 588, 650, 58, 19, C.muted);
    notes(s, ["Final/07-GDD-TONG-HOP-TU-INDEX.md, mục 6 và 12", "Figma UI Export/01_menu_gate_closed.png"]);
  }

  await fs.mkdir(`${root}/tmp/pitch_deck_build/renders`, { recursive: true });
  for (const [i, slide] of p.slides.items.entries()) {
    const png = await p.export({ slide, format: "png", scale: 1 });
    await fs.writeFile(`${root}/tmp/pitch_deck_build/renders/slide-${String(i + 1).padStart(2, "0")}.png`, new Uint8Array(await png.arrayBuffer()));
  }
  const deck = await PresentationFile.exportPptx(p);
  await deck.save(out);
}

main().catch(err => { console.error(err); process.exitCode = 1; });

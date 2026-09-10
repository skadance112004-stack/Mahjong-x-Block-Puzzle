(() => {
  const suits = { b: "索", c: "筒", d: "萬", h: "字" };
  const honorLabels = ["東", "南", "西", "北", "中", "發", "白"];
  const shapeDefs = [
    [[0,0]], [[0,0],[0,1]], [[0,0],[1,0]],
    [[0,0],[0,1],[0,2]], [[0,0],[1,0],[2,0]],
    [[0,0],[1,0],[1,1]], [[0,0],[0,1],[1,0]], [[0,0],[0,1],[1,1]], [[0,1],[1,0],[1,1]],
    [[0,0],[0,1],[1,0],[1,1]],
    [[0,0],[0,1],[0,2],[1,1]], [[0,0],[1,0],[2,0],[2,1]],
    [[0,0],[0,1],[0,2],[0,3]], [[0,0],[1,0],[2,0],[3,0]],
  ];

  function rand(n) { return Math.floor(Math.random() * n); }
  function randomTile(includeHonors = false) {
    if (includeHonors && Math.random() < .12) return `h${rand(7)}`;
    return `${["b","c","d"][rand(3)]}${1 + rand(6)}`;
  }
  function label(id) {
    if (!id) return "";
    const suit = id[0];
    const rank = Number(id.slice(1));
    return suit === "h" ? honorLabels[rank] : `${rank}${suits[suit]}`;
  }
  function face(id) {
    if (!id) return "";
    const suit = id[0];
    const rank = Number(id.slice(1));
    if (suit === "h") return `<span class="tile-face s-h"><b>${honorLabels[rank]}</b><small>HONOR</small></span>`;
    return `<span class="tile-face s-${suit}"><b>${rank}</b><small>${suits[suit]}</small></span>`;
  }
  function correlatedTiles(count, honors = false) {
    const mode = Math.random();
    if (count >= 3 && mode < .28) {
      const one = randomTile(honors);
      return Array(count).fill(one);
    }
    if (count >= 3 && mode < .56) {
      const suit = ["b","c","d"][rand(3)];
      const start = 1 + rand(4);
      return Array.from({length:count}, (_,i) => `${suit}${Math.min(6,start + (i % 3))}`);
    }
    return Array.from({length:count}, () => randomTile(honors));
  }
  function piece(maxSize = 4, honors = false) {
    const pool = shapeDefs.filter(s => s.length <= maxSize);
    const cells = pool[rand(pool.length)].map(p => [...p]);
    return { cells, tiles: correlatedTiles(cells.length, honors), used:false };
  }
  function dims(cells) {
    return {
      rows: Math.max(...cells.map(c => c[0])) + 1,
      cols: Math.max(...cells.map(c => c[1])) + 1,
    };
  }
  function renderMini(pieceData) {
    const size = dims(pieceData.cells);
    const lookup = new Map(pieceData.cells.map((p,i) => [`${p[0]},${p[1]}`, pieceData.tiles[i]]));
    let html = `<div class="piece-grid" style="grid-template-columns:repeat(${size.cols},22px);grid-template-rows:repeat(${size.rows},25px)">`;
    for (let r=0;r<size.rows;r++) for (let c=0;c<size.cols;c++) {
      const id = lookup.get(`${r},${c}`);
      html += id ? `<span class="mini-tile">${label(id)}</span>` : `<span></span>`;
    }
    return html + "</div>";
  }
  function fits(board, rows, cols, cells, r, c) {
    return cells.every(([dr,dc]) => {
      const rr=r+dr, cc=c+dc;
      return rr>=0 && cc>=0 && rr<rows && cc<cols && !board[rr][cc];
    });
  }
  function anyFit(board, rows, cols, cells) {
    for (let r=0;r<rows;r++) for (let c=0;c<cols;c++) if (fits(board,rows,cols,cells,r,c)) return true;
    return false;
  }
  let toastTimer;
  function toast(text) {
    let node = document.querySelector(".toast");
    if (!node) { node=document.createElement("div"); node.className="toast"; document.body.append(node); }
    node.textContent=text; node.classList.add("show");
    clearTimeout(toastTimer); toastTimer=setTimeout(() => node.classList.remove("show"), 1400);
  }
  function shuffle(array) {
    for(let i=array.length-1;i>0;i--){const j=rand(i+1);[array[i],array[j]]=[array[j],array[i]];} return array;
  }
  window.MJ = { suits, honorLabels, shapeDefs, rand, randomTile, label, face, correlatedTiles, piece, dims, renderMini, fits, anyFit, toast, shuffle };
})();

import React from "react";
import CloseIcon from "../../asset/icons/mui/close-icon";

import "./style.scoped.scss";


const generateRandomGrid = (Y, X, TILES) => {
  if (TILES <= 0)   return "";
  
  let ret;
  while (true) {
    const map = Array.from(Array(Y), () => Array(X).fill(0));
    const seed = new Array(TILES + 1);

    const _plant = () => {
      let tile;
      let y, x, tmp;

      const map = new Array(Y * X).fill(0);
      for (let i = 0; i < TILES; i++)
        map[i] = i + 1;
      for (let i = 0; i < Y * X; i++) {
        
      }


      

      for (tile = 1; tile <= TILES; tile++) {
        while (true) {
          tmp = Math.floor(Math.random() * (Y * X));
          y = Math.floor(tmp / X), x = tmp % X;
          if (map[y][x]) continue;
          map[y][x] = -tile, seed[tile] = { y: y, x: x };
          break;
        }
      }
    };
    const _shuffleArray = arr => {
      let i, j, tmp;
      for (i = 0; i < arr.length - 1; i++) {
        j = (i + 1) + Math.floor(Math.random() * (arr.length - i - 1));
        tmp = arr[i], arr[i] = arr[j], arr[j] = tmp;
      }
    };
    const _grow = tile => {
      let { y, x } = seed[tile];
      let y_m = y, y_M = y;
      let x_m = x, x_M = x;

      let order = [ 0, 1, 2, 3 ];
      _shuffleArray(order);

      let i, b;
      for (i = 0; i < order.length; i++) {
        switch (order[i]) {
        case 0:     // to +X
          for (x = x_M + 1; x < X; x++) {
            b = true;
            for (y = y_m; y <= y_M; y++)
              if (map[y][x]) {
                b = false;
                break;
              }
            if (!b) break;
            for (y = y_m; y <= y_M; y++)    map[y][x] = -tile;
            x_M = x;
          }
          break;
        case 1:     // to +Y
          for (y = y_M + 1; y < Y; y++) {
            b = true;
            for (x = x_m; x <= x_M; x++)
              if (map[y][x]) {
                b = false;
                break;
              }
            if (!b) break;
            for (x = x_m; x <= x_M; x++)    map[y][x] = -tile;
            y_M = y;
          }
          break;
        case 2:     // to -X
          for (x = x_m - 1; x >= 0; x--) {
            b = true;
            for (y = y_m; y <= y_M; y++)
              if (map[y][x]) {
                b = false;
                break;
              }
            if (!b) break;
            for (y = y_m; y <= y_M; y++)    map[y][x] = -tile;
            x_m = x;
          }
          break;
        case 3:     // to -Y
          for (y = y_m - 1; y >= 0; y--) {
            b = true;
            for (x = x_m; x <= x_M; x++)
              if (map[y][x]) {
                b = false;
                break;
              }
            if (!b) break;
            for (x = x_m; x <= x_M; x++)    map[y][x] = -tile;
            y_m = y;
          }
          break;
        }
      }
    };
    const _isFullGrown = () => {      
      let x, y;
      for (x = 0; x < X; x++)
        for (y = 0; y < Y; y++)
          if (map[y][x] === 0)
            return false;
      return true;
    };
    const _sort = () => {
      let new_tile = 1, tile;
      let y, x, y1, x1;
      for (y = 0; y < Y; y++) {
        for (x = 0; x < X; x++) {
          if ((tile = map[y][x]) < 0) {
            for (y1 = y; y1 < Y; y1++) {
              if (map[y1][x] !== tile)   break;
              map[y1][x] = new_tile;
              for (x1 = x + 1; x1 < X; x1++) {
                if (map[y1][x1] !== tile)  break;
                map[y1][x1] = new_tile;
              }
            }
            new_tile++;
            if (x1 < X)   x = x1 - 1;
          }
        }
      }
    };
    const _draw = (prefix="") => {
      let s = ``;
      let y, x;
      for (y = 0; y < Y; y++) {
        s += `"`;
        for (x = 0; x < X; x++)
          s += `${prefix}${map[y][x]} `;
        s += `"\n`;
      }
      return s;
    };

    _plant();
    let tile;
    for (tile = 1; tile <= TILES; tile++)   _grow(tile);
    if (_isFullGrown()) {
      _sort();
      ret = _draw("grid-");
      break;
    }
  }
  //console.log(ret);
  return ret;
};


const ImageGrid = ({ imageUrls=[], trailer, action=(() => {}), editable }) => {
  let TILES = imageUrls.length;                                   // # of tiles
  let M = 3;                                                      // # of columns
  let N = (TILES > 0) ? Math.max(2, Math.ceil(TILES / 2)) : 0;    // # of rows

  const makeCell = (src, idx) => (
    <div key={idx} className="grid" onClick={() => action(idx)}
      style={{ gridArea: `grid-${idx + 1}`, backgroundImage: `url(${src})` }}
    >
      {editable && (
        <button className="button button-delete">
          <div className="icon"><CloseIcon /></div>
        </button>
      )}
    </div>
  );
  const makeGridStyle = hasTrailer => {
    if (hasTrailer) {
      return {
        gridTemplateRows: `repeat(${N + 1}, 1fr)`,
        gridTemplateColumns: `repeat(${M}, 1fr)`,
        height: `${8 * (N + 1)}rem`,
        gridTemplateAreas: generateRandomGrid(N, M, TILES) + (`"` + `grid-${TILES + 1} `.repeat(M) + `"\n`),
      };
    } else {
      return {
        gridTemplateRows: `repeat(${N}, 1fr)`,
        gridTemplateColumns: `repeat(${M}, 1fr)`,
        height: `${8 * N}rem`,
        gridTemplateAreas: generateRandomGrid(N, M, TILES),
      };
    }
  };

  return (
    <div className={`image-grid ${editable ? "editable" : ""}`} style={makeGridStyle(trailer ? true : false )}>
      {imageUrls.map(makeCell)}
      {trailer && <div className="grid trailer" style={{ gridArea: `grid-${TILES + 1}` }}>{trailer}</div>}
    </div>
  );
};

export default ImageGrid;
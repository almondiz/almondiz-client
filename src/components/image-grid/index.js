import React from "react";
import CloseIcon from "../../asset/icons/mui/close-icon";

import "./style.scoped.scss";


const generateRandomGrid = (Y, X, TILES) => {
  const _shuffleArray = (arr, endIdx, action=(() => {})) => {
    if (!endIdx)  endIdx = arr.length - 1;

    let i, j, tmp;
    for (i = 0; i < endIdx; i++) {
      j = (i + 1) + Math.floor(Math.random() * (arr.length - i - 1));
      tmp = arr[i], arr[i] = arr[j], arr[j] = tmp;
      action(i, j);
    }
  };
  const _plant = () => {
    const map = [];
    const seed = new Array(TILES + 1);

    const map1D = new Array(Y * X).fill(0);
    for (let i = 0; i < TILES; i++)
      map1D[i] = -(i + 1);

    _shuffleArray(map1D, TILES, (i, j) => {
      let tmp;
      if (tmp = map1D[j])
        seed[-tmp] = { y: Math.floor(j / Y) , x: j % Y };
      if (tmp = map1D[i])
        seed[-tmp] = { y: Math.floor(i / Y) , x: i % Y };
    });

    for (let i = 0; i < Y; i++)
      map.push(map1D.slice(i * Y, (i + 1) * Y));
    return [ map, seed ];
  };
  const _grow = (map, seed, tile) => {
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
  const _isFullGrown = map => {      
    let x, y;
    for (x = 0; x < X; x++)
      for (y = 0; y < Y; y++)
        if (map[y][x] === 0)
          return false;
    return true;
  };
  const _sort = map => {
    let newTile = 1, tile;
    let y, x, y1, x1;
    for (y = 0; y < Y; y++) {
      for (x = 0; x < X; x++) {
        if ((tile = map[y][x]) < 0) {
          for (y1 = y; y1 < Y; y1++) {
            if (map[y1][x] !== tile)   break;
            map[y1][x] = newTile;
            for (x1 = x + 1; x1 < X; x1++) {
              if (map[y1][x1] !== tile)  break;
              map[y1][x1] = newTile;
            }
          }
          newTile++;
          if (x1 < X)   x = x1 - 1;
        }
      }
    }
  };
  const _draw = (map, prefix="") => {
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


  if (TILES <= 0 || Y * X < TILES)  return "";
  
  let ret;  
  while (true) {
    const [ _map, _seed ] = _plant(_map, _seed);
    for (let tile = 1; tile <= TILES; tile++)
      _grow(_map, _seed, tile);
    if (_isFullGrown(_map)) {
      _sort(_map);
      ret = _draw(_map, "grid-");
      break;
    }
  }
  console.log(ret);
  return ret;
};


const ImageGrid = ({ imageUrls=[], trailer, action=(() => {}), editable }) => {
  /*imageUrls = [
    "https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20200512_270%2F1589240248177WIr4l_JPEG%2FKakaoTalk_Photo_2019-11-15-21-09-35.jpeg",
    "https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20160222_124%2F1456108689766cGsT8_JPEG%2F176172516828220_1.jpeg",
    "https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20160222_65%2F1456108689887hMVWw_JPEG%2F176172516828220_2.jpeg",
    "https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fpup-review-phinf.pstatic.net%2FMjAyMjA4MDVfMTg1%2FMDAxNjU5NjU1NjY2MDY0.9OVwKR1z4PPRPc261Bm6s7uijG0StPCpIjmpGNTN7gog.k3_zLr9zb9AO4HIUhxSAEAMHwMn-fDUtJWv6ggqm_i4g.JPEG%2Fupload_7a34a53d254c06cf9240f8ac12b01655.jpeg",
    "https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fmyplace-phinf.pstatic.net%2F20211221_50%2F1640014951911xYfbU_JPEG%2Fupload_72846c3e27e83636fc5315a45bb4ee53.jpeg",
    "https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fmyplace-phinf.pstatic.net%2F20211221_238%2F164001495200947VEL_JPEG%2Fupload_438a1fb5d2e2bdf650c5ccc9ae140291.jpeg",
    "https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fmyplace-phinf.pstatic.net%2F20211221_245%2F1640014952265p4T4U_JPEG%2Fupload_74f2d577c28ecb075f4f90f026ffd1f1.jpeg",
  ];*/
  
  const TILES = imageUrls.length;                                   // # of tiles
  const M = 3;                                                      // # of columns
  const N = (TILES > 0) ? Math.max(2, Math.ceil(TILES / 2)) : 0;    // # of rows

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
import React from "react";
import CloseIcon from "../../asset/icons/mui/close-icon";

import "./style.scoped.scss";


const generateRandomGrid = (Y, X, TILES) => {
  const _shuffleArray = (arr, endIdx, action=(() => {})) => {
    if (!endIdx || endIdx > arr.length - 1)
      endIdx = arr.length - 1;

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
        seed[-tmp] = { y: Math.floor(j / X) , x: j % X };
      if (tmp = map1D[i])
        seed[-tmp] = { y: Math.floor(i / X) , x: i % X };
    });

    while (map1D.length)
      map.push(map1D.splice(0, X));
    
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
  return ret;
};


const ImageGrid = ({ images=[], trailer, action=(() => {}), editable, setImages }) => {
  const TILES = images.length;                                      // # of tiles
  const Y = (TILES > 0) ? Math.max(2, Math.ceil(TILES / 2)) : 0;    // # of rows
  const X = 3;                                                      // # of columns

  const ButtonDelete = ({ images, setImages, idx }) => {
    const onClick = () => {
      const _images = [...images];
      _images.splice(idx, 1);
      setImages(_images);
    };

    return (
      <button className="button button-delete" onClick={onClick}>
        <div className="icon"><CloseIcon /></div>
      </button>
    );
  };

  const makeCell = (image, idx) => (
    <div key={idx} className="grid" onClick={() => action(idx)}
      style={{ gridArea: `grid-${idx + 1}`, backgroundImage: `url(${image.url})` }}
    >
      {editable && <ButtonDelete images={images} setImages={setImages} idx={idx} />}
    </div>
  );
  const makeGridStyle = hasTrailer => {
    const randomGrid = generateRandomGrid(Y, X, TILES);
    //console.log("[ImageGrid.randomGrid]", randomGrid);

    if (hasTrailer) {
      return {
        gridTemplateRows: `repeat(${Y + 1}, 1fr)`,
        gridTemplateColumns: `repeat(${X}, 1fr)`,
        height: `${8 * (Y + 1)}rem`,
        gridTemplateAreas: randomGrid + (`"` + `grid-${TILES + 1} `.repeat(X) + `"\n`),
      };
    } else {
      return {
        gridTemplateRows: `repeat(${Y}, 1fr)`,
        gridTemplateColumns: `repeat(${X}, 1fr)`,
        height: `${8 * Y}rem`,
        gridTemplateAreas: randomGrid,
      };
    }
  };

  return (
    <div className={`image-grid ${editable ? "editable" : ""}`} style={makeGridStyle(trailer ? true : false )}>
      {images.map(makeCell)}
      {trailer && <div className="grid trailer" style={{ gridArea: `grid-${TILES + 1}` }}>{trailer}</div>}
    </div>
  );
};

export default ImageGrid;
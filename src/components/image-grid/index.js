import React from "react";

import "./style.scoped.scss";
import NavigateNextIcon from "../../asset/icons/mui/navigate-next-icon";


const generateRandomGrid = (Y, X, TILES) => {
  let ret;

  while (true) {
    const map = Array.from(Array(Y), () => Array(X).fill(0));
    const seed = new Array(TILES + 1);

    const _plant = () => {
      map[Y - 1][X - 2] = map[Y - 1][X - 1] = -TILES, seed[TILES] = { y: Y - 1, x: X - 2 };   // for shop-link

      let tile;
      let y, x, tmp;
      for (tile = 1; tile <= TILES - 1; tile++) {
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
      if (tile === TILES)   x_M = x + 1;

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

      if (tile === TILES) {
        for (x = x_m; x <= x_M; x++)
          for (y = y_m; y <= y_M; y++)
            if (map[y][x] !== -tile)
              map[y][x];
      }
    };
    const _isFullGrown = () => {
      let x, y;
      if (tile === TILES)
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
            if (tile === -TILES) {    // for shop-link
              map[y][x] *= -1;
              continue;
            }

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

const ImageGrid = ({ images, shop, action }) => {
  const makeCell = (src, index) => (
    <div
      key={index}
      className="grid image"
      style={{ gridArea: `grid-${index + 1}`, backgroundImage: `url(${src})` }}
      onClick={() => action(index)}
    />
  );
  const makeGridStyle = () => {
    let N = Math.round(images.length / 2) + 1;  // # of rows
    let M = 3;                                  // # of columns
    let TILES = images.length + 1;              // # of tiles (including a shop link tile)

    const ImageGridStyle = {
      gridTemplateRows: `repeat(${N}, 1fr)`,
      gridTemplateColumns: `repeat(${M}, 1fr)`,
      height: `${8 * N}rem`,
      gridTemplateAreas: generateRandomGrid(N, M, TILES),
    };
    return ImageGridStyle;
  };

  return (
    <div className="image-grid" style={makeGridStyle()}>
      {images.map(makeCell)}
      <a href={shop.link} className="grid shop-link" style={{ gridArea: `grid-${images.length + 1}` }}>
        <div className="content">
          <div>
            <p className="name">{shop.name}</p>
            <p className="address">{shop.address}</p>
          </div>
          <NavigateNextIcon height="2.5rem" fill="#fff" />
        </div>
        <div className="image" style={{ backgroundImage: `url(${shop.thumb})` }} />
      </a>
    </div>
  );
};

export default ImageGrid;
import { EMOJIS, COLORS, NUTS } from "./pool"


export const getRandomThumb = () => {
  const idx = Math.floor(Math.random() * (EMOJIS.length * COLORS.length));
  return {
    thumbId: idx,
    emoji: EMOJIS[parseInt(idx / COLORS.length)],
    color: COLORS[idx % COLORS.length],
  };
};

export const getRandomNut = () => {
  const idx = Math.floor(Math.random() * NUTS.length);
  return {
    nutId: idx,
    nutName: NUTS[idx],
  };
};
export const defaultBoardTileSize = 25;

export const getBoardTileMeasurements = (size = defaultBoardTileSize) => {
  const longSize = 2 * size;
  const shortSize = Math.floor(size * Math.sqrt(3));
  const longOffset = longSize * 3 / 4  /* Subtract 1 for a snug fit */;
  const shortOffset = shortSize  /* Subtract 1 for a snug fit */;
  return {longSize, shortSize, longOffset, shortOffset};
};

export const getBoardTileOffsetFromPosition = ({x, y, size = defaultBoardTileSize}) => {
  const {shortSize, longOffset, shortOffset} = getBoardTileMeasurements(size);
  return {
    x: (y % 2 === 0 ? 0 : shortSize / 2) + shortOffset * x,
    y: longOffset * y,
  };
};

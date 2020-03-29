import React, {Component} from "react";
import Hex from "./Hex";
import Ocean from "../draw/Ocean";
import City from "../draw/City";

class Board extends Component {
  static getBorder(board) {
    const {longSize, shortSize, longOffset, shortOffset} = Hex.getMeasurements();
    const x = -shortSize / 2 - 20, y = -longSize / 2 - 20;
    const width = board[0].length * shortOffset + 40;
    const height = board.length * longOffset - longOffset + longSize + 40;
    return {x, y, width, height};
  }

  static getSize(board) {
    const {width, height} = this.getBorder(board);
    return {width, height};
  }

  render() {
    const {board, offset} = this.props;
    const {x, y, width, height} = this.constructor.getBorder(board);
    return (
      <g transform={`translate(${-x + offset.x}, ${-y + offset.y})`}>
        <rect x={x} y={y} width={width} height={height}/>
        {board.map(row => row.filter(tile => tile.active).map(tile =>
          <Hex
            key={`${tile.x},${tile.y}`}
            x={tile.x} y={tile.y}
            fill={(
              tile.oceanOnly
              ? `url(#${Ocean.Def.xlinkHref})`
              : tile.allowedCity
              ? `url(#${City.Def.xlinkHref})`
              : undefined
            )}
          />))}
      </g>
    );
  }
}

export default Board;

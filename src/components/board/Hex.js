import React, {Component} from "react";
import Hexagon from "../draw/Hexagon";
import DefaultHexagon from "../draw/DefaultHexagon";

class Hex extends Component {
  static getMeasurements(size = Hexagon.size) {
    const longSize = 2 * size;
    const shortSize = Math.floor(size * Math.sqrt(3));
    const longOffset = longSize * 3 / 4 - 1 /* Subtract 1 for a snug fit */;
    const shortOffset = shortSize - 1 /* Subtract 1 for a snug fit */;
    return {longSize, shortSize, longOffset, shortOffset};
  }

  render() {
    const {
      size = Hexagon.size,
      x = 0, y = 0,
      fill = 'black',
    } = this.props;
    const {shortSize, longOffset, shortOffset} = this.constructor.getMeasurements(size);
    return (
      <DefaultHexagon position={{
        x: (y % 2 === 0 ? 0 : shortSize / 2) + shortOffset * x,
        y: longOffset * y,
      }} fill={fill}/>
    );
  }
}

export default Hex;

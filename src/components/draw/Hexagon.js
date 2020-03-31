import React, {Component} from "react";

class Hexagon extends Component {
  static size = 25;
  static points = [
    [0, 50],
    [43, 25],
    [43, -25],
    [0, -50],
    [-43, -25],
    [-43, 25],
    [0, 50],
  ];
  static pointsStringBySize = {};

  static getPointsString(size) {
    if (!(size in this.pointsStringBySize)) {
      const ratio = size / 50;
      this.pointsStringBySize[size] = this.points
        .map(([x, y]) => `${x * ratio},${y * ratio}`)
        .join(' ');
    }
    return this.pointsStringBySize[size];
  }

  render() {
    const {id, size = this.constructor.size, position, stroke, fill} = this.props;
    return (
      <polygon
        id={id}
        transform={position ? `translate(${position.x}, ${position.y})` : undefined}
        points={this.constructor.getPointsString(size)}
        stroke={stroke} strokeWidth={3}
        fill={fill}
      />
    );
  }
}

export default Hexagon;

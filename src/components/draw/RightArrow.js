import React, {Component} from "react";

class RightArrow extends Component {
  static path = <path d={`
    M 15.375 12
    L 10 7.54
    C 9.695 7.287 9.461 7 9 7
    C 8.375 7 8 7.516 8 8
    v 3
    H 1
    C 0.45 11 0 11.45 0 12
    v 2
    c 0 0.55 0.45 1 1 1
    h 7
    v 3
    c 0 0.484 0.375 1 1 1
    c 0.461 0 0.695 -0.287 1 -0.54
    L 15.375 14
    C 15.758 13.688 16 13.445 16 13
    S 15.758 12.312999999999999 15.375 12
    z
  `} />;

  render() {
    const {offset} = this.props;
    return (
      <g transform={`translate(${offset.x}, ${offset.y})`}>
        {this.constructor.path}
      </g>
    );
  }
}

export default RightArrow;

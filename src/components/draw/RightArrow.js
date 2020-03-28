import React, {Component} from "react";

class RightArrow extends Component {
  static path = (
    "M15.375,7L10,2.54C9.695,2.287,9.461,2,9,2C8.375,2,8,2.516,8" +
    ",3v3H1C0.45,6,0,6.45,0,7v2c0,0.55,0.45,1,1,1h7v3  c0,0.484" +
    ",0.375,1,1,1c0.461,0,0.695-0.287,1-0.54L15.375,9C15.758" +
    ",8.688,16,8.445,16,8S15.758,7.313,15.375,7z"
  );

  render() {
    const {offset} = this.props;
    return (
      <path
        transform={`translate(${offset.x}, ${offset.y - 5})`}
        d={this.constructor.path}
      />
    );
  }
}

export default RightArrow;

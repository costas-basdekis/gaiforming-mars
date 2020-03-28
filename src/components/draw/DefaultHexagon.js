import React, {Component} from "react";
import Hexagon from "./Hexagon";

class DefaultHexagon extends Component {
  static xlinkHref = 'hexagonDefault';

  render() {
    const {position = {x: 0, y: 0}, fill} = this.props;
    return (
      <use
        x={position.x} y={position.y}
        xlinkHref={`#${this.constructor.xlinkHref}`}
        fill={fill}
      />
    );
  }
}

class DefaultHexagonDef extends Component {
  render() {
    return (
      <Hexagon id={DefaultHexagon.xlinkHref}/>
    );
  }
}
DefaultHexagon.Def = DefaultHexagonDef;

export default DefaultHexagon;

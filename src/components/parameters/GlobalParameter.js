import React, {Component} from "react";

class GlobalParameter extends Component {
  static getSize(parameter) {
    return {
      width: 200,
      height: 25,
    };
  }

  render() {
    const {offset, parameter} = this.props;
    const globalParametersSize = this.constructor.getSize(parameter);
    return (
      <g transform={`translate(${offset.x}, ${offset.y})`}>
        <rect x={0} y={0} width={globalParametersSize.width}
              height={globalParametersSize.height}>
          <title>{parameter.label}: {parameter.value}/{parameter.total}</title>
        </rect>
        <text x={10}
              y={20}>{parameter.label}: {parameter.value}/{parameter.total}</text>
      </g>
    );
  }
}

export default GlobalParameter;

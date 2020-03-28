import React, {Component} from "react";
import GlobalParameter from "./GlobalParameter";
import GameService from "../../game/GameService";

class GlobalParameters extends Component {
  static getSize(parameters) {
    const globalParameterSize = GlobalParameter.getSize(null);
    const rows = Math.ceil(parameters.length / 3);
    return {
      width: 3 * globalParameterSize.width,
      height: rows * globalParameterSize.height + Math.max(0, rows - 1) * 10,
    };
  }

  render() {
    const {offset, parameters} = this.props;
    const globalParameterSize = GlobalParameter.getSize(null);
    return (
      <g transform={`translate(${offset.x}, ${offset.y})`}>
        {parameters.map((parameter, index) => {
          const column = index % 3;
          const row = Math.floor(index / 3);
          return (
            <GlobalParameter
              offset={{
                x: column * globalParameterSize.width + Math.max(0, column - 1) * 10,
                y: row * globalParameterSize.height + Math.max(0, row - 1) * 10,
              }}
              key={parameter.name}
              parameter={parameter}
            />
          );
        })}
      </g>
    );
  }
}

class GlobalParametersDefs extends Component {
  render() {
    return GameService.globalParameters.map(parameter => (
      <GlobalParameter.Def key={parameter.name} parameter={parameter}/>
    ));
  }
}
GlobalParameters.Defs = GlobalParametersDefs;

export default GlobalParameters;

import React, {Component} from "react";
import GlobalParameter from "./GlobalParameter";
import GameService from "../../game/GameService";

class GlobalParameters extends Component {
  static columnsPerRow = 2;
  static getSize(parameters) {
    const globalParameterSize = GlobalParameter.getSize(null);
    const rows = Math.ceil(parameters.length / this.columnsPerRow);
    return {
      width: this.columnsPerRow * globalParameterSize.width,
      height: rows * globalParameterSize.height + Math.max(0, rows - 1) * 10,
    };
  }

  render() {
    const {offset, parameters} = this.props;
    const globalParameterSize = GlobalParameter.getSize(null);
    return (
      <g transform={`translate(${offset.x}, ${offset.y})`}>
        {parameters.map((parameter, index) => {
          const column = index % this.constructor.columnsPerRow;
          const row = Math.floor(index / this.constructor.columnsPerRow);
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

import React, {Component} from "react";
import GameService from "../../game/GameService";
import StandardProject from "./StandardProject";

class StandardProjects extends Component {
  static getSize(game) {
    return {width: 250, height: 310};
  }

  render() {
    const {offset, game, control} = this.props;
    return (
      <g transform={`translate(${offset.x}, ${offset.y})`}>
        <rect
          x={0} y={10} width={250} height={300}
          fill={'silver'}
          stroke={'black'} strokeWidth={2}
        />

        <rect
          x={10} y={0} width={130} height={25}
          fill={'yellow'}
          stroke={'black'} strokeWidth={2}
        />
        <text x={20} y={20} fill={'black'}>Standard Projects</text>

        {GameService.standardProjects.map((project, index) => (
          <StandardProject
            key={index}
            offset={{x: 10, y: 35 + 25 * index}}
            activePlayer={game.activePlayer} project={project}
            control={control}
          />
        ))}
      </g>
    );
  }
}

export default StandardProjects;

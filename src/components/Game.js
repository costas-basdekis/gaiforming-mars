import React, {Component} from "react";
import Board from "./board/Board";
import Players from "./players/Players";
import StandardProjects from "./projects/StandardProjects";
import GlobalParameters from "./parameters/GlobalParameters";
import DefaultHexagon from "./draw/DefaultHexagon";
import OceanIcon from "./draw/OceanIcon";
import CityIcon from "./draw/CityIcon";

class Game extends Component {
  static getSize(game) {
    const boardSize = Board.getSize(game.board);
    const playersSize = Players.getSize(game.players);
    const standardProjectsSize = StandardProjects.getSize(game);
    return {
      width: 10 + Math.max(boardSize.width, playersSize.width, standardProjectsSize.width) + 10,
      height: 10 + boardSize.height + 20 + playersSize.height + 20 + standardProjectsSize.height + 10,
    };
  }

  render() {
    const {game, control} = this.props;
    const gameSize = this.constructor.getSize(game);
    const globalParametersSize = GlobalParameters.getSize(game.globalParameters);
    const boardSize = Board.getSize(game.board);
    const playersSize = Players.getSize(game.players);
    return (
      <svg width={gameSize.width} height={gameSize.height}>
        <defs>
          <GlobalParameters.Defs />
          <DefaultHexagon.Def/>
          <OceanIcon.Def/>
          <CityIcon.Def/>
        </defs>
        <GlobalParameters
          parameters={game.globalParameters}
          offset={{x: 10, y: 10}}
        />
        <Board
          game={game} control={control} activePlayer={game.activePlayer} board={game.board}
          offset={{x: 10, y: 10 + globalParametersSize.height + 20}}
        />
        <Players
          offset={{
            x: 10,
            y: 10 + globalParametersSize.height + 20 + boardSize.height + 20,
          }}
          players={game.players}
          control={control}
        />
        <StandardProjects
          offset={{
            x: 10,
            y: 10 + globalParametersSize.height + 20 + boardSize.height + 20 + playersSize.height + 20
          }}
          game={game}
          control={control}
        />
      </svg>
    );
  }
}

export default Game;

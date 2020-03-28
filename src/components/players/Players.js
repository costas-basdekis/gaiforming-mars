import React, {Component} from "react";
import Player from "./Player";

class Players extends Component {
  static getSize(players) {
    const playerSize = Player.getSize();
    return {
      width: playerSize.width,
      height: playerSize.height * players.length + 10 * (players.length - 1),
    };
  }

  render() {
    const {players, offset, control} = this.props;
    const playerSize = Player.getSize();
    return (
      <g transform={`translate(${offset.x}, ${offset.y})`}>
        {players.map((player, index) =>
          <Player
            key={player.id}
            offset={{x: 0, y: (playerSize.height + 10) * index}}
            player={player}
            control={control}
          />
        )}
      </g>
    );
  }
}

export default Players;

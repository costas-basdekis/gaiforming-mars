import GameService from "./GameService";
import _ from "underscore";

class GameControl {
  constructor(update) {
    this.update = update;
  }

  getPlayer(game, player) {
    [player] = game.players
      .filter(otherPlayer => otherPlayer.id === player.id);
    if (!player) {
      return null;
    }
    return player;
  }

  getTile(game, tile) {
    [tile] = _.flatten(game.board)
      .filter(otherTile => otherTile.x === tile.x && otherTile.y === tile.y);
    if (!tile) {
      return null;
    }
    return tile;
  }

  selectPlayer(player) {
    this.update(game => ({
      game: {
        ...game,
        activePlayer: player,
        players: game.players.map(otherPlayer => ({
          ...otherPlayer,
          active: otherPlayer.id === player.id,
        })),
        action: null,
      },
    }));
  }

  purchaseProject(player, project) {
    this.update(game => {
      player = this.getPlayer(game, player);
      if (!player) {
        return null;
      }
      if (!player.active) {
        return null;
      }
      const newGame = GameService.purchase(game, player, project);
      if (newGame === game) {
        return null;
      }
      return {game: newGame};
    });
    this.updateActivePlayer();
  }

  updateActivePlayer() {
    this.update(game => {
      let [activePlayer] = game.players.filter(player => player.active);
      activePlayer = activePlayer || null;
      if (activePlayer === game.activePlayer) {
        return null;
      }
      return {
        game: {
          ...game,
          activePlayer,
        },
      };
    });
  }

  placeOcean(player, tile) {
    this.update(game => {
      player = this.getPlayer(game, player);
      if (!player) {
        return null;
      }
      if (!player.active) {
        return null;
      }
      tile = this.getTile(game, tile);
      if (!tile) {
        return null;
      }
      const newGame = GameService.placeOcean(game, player, tile);
      if (newGame === game) {
        return null;
      }
      return {game: newGame};
    });
  }

  placeGreenery(player, tile) {
    this.update(game => {
      player = this.getPlayer(game, player);
      if (!player) {
        return null;
      }
      if (!player.active) {
        return null;
      }
      tile = this.getTile(game, tile);
      if (!tile) {
        return null;
      }
      const newGame = GameService.placeGreenery(game, player, tile);
      if (newGame === game) {
        return null;
      }
      return {game: newGame};
    });
  }

  placeCity(player, tile) {
    this.update(game => {
      player = this.getPlayer(game, player);
      if (!player) {
        return null;
      }
      if (!player.active) {
        return null;
      }
      tile = this.getTile(game, tile);
      if (!tile) {
        return null;
      }
      const newGame = GameService.placeCity(game, player, tile);
      if (newGame === game) {
        return null;
      }
      return {game: newGame};
    });
  }
}

export default GameControl;

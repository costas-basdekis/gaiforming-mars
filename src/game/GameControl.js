import GameService from "./GameService";

class GameControl {
  constructor(update) {
    this.update = update;
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
      },
    }));
  }

  purchaseProject(player, project) {
    this.update(game => {
      [player] = game.players
        .filter(otherPlayer => otherPlayer.id === player.id);
      if (!player) {
        return null;
      }
      if (!player.active) {
        return null;
      }
      const newPlayer = GameService.purchase(player, project);
      if (newPlayer === player) {
        return null;
      }
      return {
        game: {
          ...game,
          players: game.players.map(otherPlayer =>
            otherPlayer.id === newPlayer.id ? newPlayer : otherPlayer),
        },
      };
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
}

export default GameControl;

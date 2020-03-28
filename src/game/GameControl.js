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
      const {newGame, newPlayer} = GameService.purchase(game, player, project);
      if (newPlayer === player && newGame === game) {
        return null;
      }
      return {
        game: {
          ...newGame,
          players: newGame.players.map(otherPlayer =>
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

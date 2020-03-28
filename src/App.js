import React, {Component, Fragment} from 'react';
import './App.css';
import GameService from "./game/GameService";
import Game from "./components/Game";
import GameControl from "./game/GameControl";

class App extends Component {
	state = {
    game: GameService.makeGame(),
  };

	updateGame = func => {
	  this.setState(({game}) => func(game));
  };

	control = new GameControl(this.updateGame);

	render() {
  	const {game} = this.state;
  	return (
    	<Fragment>
    	  Gaiaforming Ares
        <br />
      	<Game game={game} control={this.control} />
      </Fragment>
    );
  }
}

export default App;

import React, {Component, Fragment} from 'react';
import _ from 'underscore';
import './App.css';

class GameService {
	static resources = [
  	{name: 'tr', label: 'Terraform Rating', colour: 'cyan', fontColour: 'white', initialProduction: 20},
  	{name: 'money', label: 'MegaCredits', colour: 'yellow', fontColour: 'black', initialValue: 42},
  	{name: 'steel', label: 'Steel', colour: 'brown', fontColour: 'white'},
  	{name: 'titanium', label: 'Titanium', colour: 'black', fontColour: 'white'},
  	{name: 'plants', label: 'Plants', colour: 'green', fontColour: 'white'},
  	{name: 'energy', label: 'Energy', colour: 'purple', fontColour: 'white'},
  	{name: 'heat', label: 'Heat', colour: 'orangered', fontColour: 'white'},
  ];
  static tags = [
  	{name: 'building', label: 'Building', colour: 'brown', fontColour: 'white', prefix: 'B'},
    {name: 'space', label: 'Space', colour: 'black', fontColour: 'white', prefix: 'S'},
    {name: 'plant', label: 'Plant', colour: 'green', fontColour: 'white', prefix: 'P'},
    {name: 'energy', label: 'Energy', colour: 'purple', fontColour: 'white', prefix: 'En'},
    {name: 'science', label: 'Science', colour: 'white', fontColour: 'black', prefix: 'S'},
    {name: 'earth', label: 'Earth', colour: 'cyan', fontColour: 'black', prefix: 'Ea'},
    {name: 'jupiter', label: 'Jupiter', colour: 'orange', fontColour: 'black', prefix: 'J'},
  	{name: 'animal', label: 'Animal', colour: 'green', fontColour: 'white', prefix: 'A'},
    {name: 'microbe', label: 'Microbe', colour: 'green', fontColour: 'white', prefix: 'M'},
    {name: 'event', label: 'Event', colour: 'yellow', fontColour: 'black', prefix: 'Ev'},
    {name: 'city', label: 'City', colour: 'grey', fontColour: 'black', prefix: 'C'},
  ];
  static globalParameters = [
  	{name: 'temperature', label: 'Temperature', initialValue: 1, total: 20},
  ];
  static players = [
  	{id: 1, colour: 'red', fontColour: 'white'},
  	{id: 2, colour: 'blue', fontColour: 'white'},
  ];
  static canPurchase(player, project) {
    if (!player) {
      return false;
    }
  	for (const name in project.cost) {
    	if (!(name in player.resources)) {
      	return false;
      }
      const resource = player.resources[name];
      const cost = project.cost[name];
      if ('value' in cost) {
      	if (cost.value > resource.value) {
        	return false;
        }
      }
      if ('production' in cost) {
      	if (cost.production > resource.production) {
        	return false;
        }
      }
    }

    return true;
  }
  static purchase(player, project) {
  	if (!GameService.canPurchase(player, project)) {
    	return player;
    }
    const newPlayer = {...player, resources: {...player.resources}};
    for (const name in project.cost) {
    	const cost = project.cost[name];
    	const resource = newPlayer.resources[name] = {...newPlayer.resources[name]};
      if ('value' in cost) {
      	resource.value -= cost.value;
      }
      if ('production' in cost) {
      	resource.production -= cost.production;
      }
    }
    for (const name in project.benefit) {
    	const benefit = project.benefit[name];
      const resource = newPlayer.resources[name] = {...newPlayer.resources[name]};
      if ('value' in benefit) {
      	resource.value += benefit.value;
      }
      if ('production' in benefit) {
      	resource.production += benefit.production;
      }
    }
    return newPlayer;
  }
  static standardProjects = [
  	{
    	name: 'powerPlant',
      cost: {money: {value: 11}},
      benefit: {energy: {production: 1}},
    },
  ];
  static makeGame({playerCount = 2} = {}) {
  	return {
      board: this.makeBoard(),
      globalParameters: this.makeGlobalParameters(),
      activePlayer: null,
      players: this.players
      	.slice(0, playerCount)
        .map(player => this.makePlayer(player)),
    };
  }
  static makeBoard() {
  	return _.range(9).map(y => _.range(9).map(x => ({
      x, y, active: (
        x >= Math.ceil((Math.abs(y - 4) - 1) / 2)
        && x <= 8 - Math.ceil((Math.abs(y - 4)) / 2)
      ) || (y == 0 && x == 0) || (y == 8 && x == 0),
    })));
  }
  static makeGlobalParameters() {
  	const parameters = this.globalParameters.map(parameter => ({
    	...parameter,
      value: parameter.initialValue,
    }));
    Object.assign(parameters, _.indexBy(parameters, 'name'));

    return parameters;
  }
  static makePlayer(player) {
    return {
      ...player,
      resources: _.object(this.resources.map(resource =>
      	[resource.name, this.makeResource(resource)])),
      tags: _.object(this.tags.map(tag =>
      	[tag.name, this.makeTag(tag)])),
      hand: [],
      playedCards: [],
      active: false,
    };
  }
  static makeResource(resource) {
  	return {
      value: resource.initialValue || 0,
      production: resource.initialProduction || 0,
      type: resource,
    };
  }
  static makeTag(tag) {
  	return {
    	played: 0,
      cards: [],
      type: tag,
    };
  }
}
GameService.resourcesByName = _.indexBy(GameService.resources, 'name');
GameService.standardProjectsByName = _.indexBy(GameService.standardProjects, 'name');

class App extends Component {
	state = {
    game: GameService.makeGame(),
  };
  selectPlayer = player => {
  	this.setState(({game}) => ({
    	game: {
      	...game,
        activePlayer: player,
        players: game.players.map(otherPlayer => ({
        	...otherPlayer,
          active: otherPlayer.id === player.id,
        })),
      },
    }));
  };
  purchaseProject = (player, project) => {
  	this.setState(({game}) => {
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
  };
  updateActivePlayer = () => {
  	this.setState(({game}) => {
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
  };
  control = _.pick(this, ['selectPlayer', 'purchaseProject']);
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
          <DefaultHexagonDef />
        </defs>
        <GlobalParameters parameters={game.globalParameters} offset={{x:10, y: 10}} />
        <Board board={game.board} offset={{x: 10, y: 10 + globalParametersSize.height + 20}} />
        <Players
          offset={{
          	x: 10,
            y: 10 + globalParametersSize.height + 20 + boardSize.height + 20,
          }}
          players={game.players}
          control={control}
        />
        <StandardProjects
          offset={{x: 10, y: 10 + globalParametersSize.height + 20 + boardSize.height + 20 + playersSize.height + 20}}
          game={game}
          control={control}
        />
      </svg>
    );
  }
}

class GlobalParameters extends Component {
	static getSize(parameters) {
    const globalParameterSize = GlobalParameter.getSize(null);
    const columns = Math.min(3, parameters.length);
    const rows = Math.ceil(parameters.length / 3);
  	return {
    	width: 3 * globalParameterSize.width,
      height: rows * globalParameterSize.height + Math.max(0, rows - 1) * 10,
    };
  }

  render() {
  	const {offset, parameters} = this.props;
    const globalParametersSize = this.constructor.getSize(parameters);
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
        <rect x={0} y={0} width={globalParametersSize.width} height={globalParametersSize.height}>
          <title>{parameter.label}: {parameter.value}/{parameter.total}</title>
        </rect>
        <text x={10} y={20}>{parameter.label}: {parameter.value}/{parameter.total}</text>
      </g>
    );
  }
}

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
        	<PowerPlantStandardProject
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

class PowerPlantStandardProject extends Component {
  canPurchase() {
  	return GameService.canPurchase(this.props.activePlayer, this.props.project);
  }
  purchase = () => {
  	this.props.control.purchaseProject(this.props.activePlayer, this.props.project);
  };
	render() {
  	const {offset, project} = this.props;
    const canPurchase = this.canPurchase();
  	return (
    	<g transform={`translate(${offset.x}, ${offset.y})`}>
        <ResourceBox
          resource={{value: -project.cost.money.value, type: GameService.resourcesByName.money}}
          offset={{x: 0, y: 0}}
        />
        <RightArrow offset={{x: 25, y: 10}} />
        <ProductionBox
          resource={{production: project.benefit.energy.production, type: GameService.resourcesByName.energy}}
          offset={{x: 50, y: 0}}
        />
        <rect
          x={100} y={0} width={130} height={25}
          fill={'yellow'} fillOpacity={canPurchase ? undefined : 0.4}
          stroke={'black'} strokeWidth={2}
        />
        <text x={110} y={20} fill={'black'}>Power Plant</text>
        <rect
          x={100} y={0} width={130} height={25}
          fill={'transparent'}
          className={canPurchase ? 'clickable' : undefined}
          onClick={this.purchase}
        />
    	</g>
    );
  }
}
GameService.standardProjectsByName.powerPlant.component = PowerPlantStandardProject;

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

class Player extends Component {
  static getSize() {
		return {
    	width: 100 + 25 * GameService.resources.length + (GameService.tags.length % Math.ceil(GameService.tags.length / 2) + 1) * 25,
      height: 50,
    };
  }

	selectPlayer = () => {
  	this.props.control.selectPlayer(this.props.player);
  };
	render() {
  	const {player, offset} = this.props;
    const size = this.constructor.getSize();
  	return (
    	<g transform={`translate(${offset.x}, ${offset.y})`}>
    	  <rect
          x={0} y={0} width={size.width} height={size.height}
          fill={player.colour} fillOpacity={player.active ? undefined : 0.4} stroke={'black'}
          strokeWidth={2}
          onClick={this.selectPlayer}
          className={player.active ? undefined : 'clickable'}
        />
        <text x={10} y={20} fill={player.fontColour} style={{pointerEvents: 'none'}}>
          Player #{player.id}
        </text>
        <ProductionBox offset={{x: 100, y: 0}} resource={player.resources.tr} />
        {GameService.resources.filter(resource => resource.name !== 'tr').map((resource, index) => (
	        <ResourceAndProductionBoxes
            key={resource.name}
            offset={{x: 100 + 25 * (index + 1), y: 0}}
            resource={player.resources[resource.name]}
          />
        ))}
        {GameService.tags.map((tag, index) => (
	        <TagCircle
            key={tag.name}
            offset={{
            	x: 100 + 25 * GameService.resources.length + (index % Math.ceil(GameService.tags.length / 2)) * 25,
              y: 0 + 25 * Math.floor(index / Math.ceil(GameService.tags.length / 2)),
            }}
            tag={player.tags[tag.name]}
          />
        ))}
    	</g>
    );
  }
}

class ResourceAndProductionBoxes extends Component {
	render() {
  	const {resource, offset, vertical = true} = this.props;
  	return (
    	<Fragment>
        <ResourceBox offset={{x: 0 + offset.x, y: 0 + offset.y}} resource={resource} />
	      <ProductionBox
          offset={
          	vertical
            ? {x: 0 + offset.x, y: 25 + offset.y}
            : {x: 25 + offset.x, y: 0 + offset.y}
          }
          resource={resource}
        />
      </Fragment>
    );
  }
}

class ResourceBox extends Component {
	render() {
  	const {resource, offset} = this.props;
  	return (
      <g transform={`translate(${offset.x}, ${3 + offset.y})`}>
        <rect width={19} height={19} fill={resource.type.colour} stroke={'black'} />
        <svg width={19} height={19}>
          <text
            x={"50%"} y={"50%"}
            dominantBaseline={"middle"} textAnchor={"middle"}
            fill={resource.type.fontColour}
          >{resource.value}</text>
       </svg>
        <rect width={19} height={19} fill={'transparent'} stroke={'transparent'}>
          <title>{resource.value} {resource.type.label}</title>
        </rect>
      </g>
    );
  }
}

class ProductionBox extends Component {
	render() {
  	const {resource, offset} = this.props;
  	return (
      <g transform={`translate(${offset.x}, ${3 + offset.y})`}>
        <rect width={19} height={19} fill={resource.type.colour} stroke={'slategrey'} strokeWidth={4} />
        <svg width={19} height={19}>
          <text
            x={"50%"} y={"50%"}
            dominantBaseline={"middle"} textAnchor={"middle"}
            fill={resource.type.fontColour}
          >{resource.production}</text>
       </svg>
        <rect width={19} height={19} fill={'transparent'} stroke={'transparent'} strokeWidth={4}>
          <title>{resource.production} {resource.type.label} per generation</title>
        </rect>
      </g>
    );
  }
}

class TagCircle extends Component {
	render() {
  	const {tag, offset} = this.props;
  	return (
      <g transform={`translate(${offset.x}, ${3 + offset.y})`}>
        <rect width={19} height={19} rx={10} ry={10} fill={tag.type.colour} stroke={'black'} />
        <svg width={19} height={19}>
          <text
            x={"50%"} y={"50%"}
            dominantBaseline={"middle"} textAnchor={"middle"}
            fill={tag.type.fontColour}
          >{tag.type.prefix}{tag.played}</text>
       </svg>
        <rect width={19} height={19} rx={10} ry={10} fill={'transparent'} stroke={'transparent'}>
          <title>{tag.played} {tag.type.label} tags played</title>
        </rect>
      </g>
    );
  }
}

class RightArrow extends Component {
	static path = (
  	"M15.375,7L10,2.54C9.695,2.287,9.461,2,9,2C8.375,2,8,2.516,8" +
    ",3v3H1C0.45,6,0,6.45,0,7v2c0,0.55,0.45,1,1,1h7v3  c0,0.484" +
    ",0.375,1,1,1c0.461,0,0.695-0.287,1-0.54L15.375,9C15.758" +
    ",8.688,16,8.445,16,8S15.758,7.313,15.375,7z"
  );
	render() {
  	const {offset} = this.props
  	return (
    	<path transform={`translate(${offset.x}, ${offset.y - 5})`} d={this.constructor.path} />
    );
  }
}

class Board extends Component {
	static getBorder(board) {
    const {longSize, shortSize, longOffset, shortOffset} = Hex.getMeasurements();
    const x = -shortSize / 2 - 20, y = -longSize / 2 - 20;
    const width = board[0].length * shortOffset + 40;
    const height = board.length * longOffset - longOffset + longSize + 40;
  	return {x, y, width, height};
  }
  static getSize(board) {
    const {width, height} = this.getBorder(board);
    return {width, height};
  }
	render() {
  	const {board, offset} = this.props;
    const {x, y, width, height} = this.constructor.getBorder(board);
  	return (
      <g transform={`translate(${-x + offset.x}, ${-y + offset.y})`}>
        <rect x={x} y={y} width={width} height={height} />
        {board.map(row => row.filter(tile => tile.active).map(tile =>
        	<Hex key={`${tile.x},${tile.y}`} x={tile.x} y={tile.y} />))}
      </g>
    );
  }
}

class Hex extends Component {
	static getMeasurements(size = Hexagon.size) {
    const longSize = 2 * size;
    const shortSize = parseInt(size * Math.sqrt(3));
    const longOffset = longSize * 3 / 4 - 1 /* Subtract 1 for a snug fit */;
    const shortOffset = shortSize - 1 /* Subtract 1 for a snug fit */;
    return {longSize, shortSize, longOffset, shortOffset};
  }
	render() {
  	const {
    	size = Hexagon.size,
      x = 0, y = 0,
      fill = 'black',
    } = this.props;
    const {longSize, shortSize, longOffset, shortOffset} = this.constructor.getMeasurements(size);
    return (
    	<DefaultHexagon position={{
        x: (y % 2 === 0 ? 0 : shortSize / 2) + shortOffset * x,
        y: longOffset * y,
      }} fill={fill} />
    );
  }
}

class DefaultHexagon extends Component {
	static xlinkHref = 'hexagonDefault'
	render() {
  	const {position={x: 0, y: 0}, fill} = this.props;
  	return (
    	<use
        x={position.x} y={position.y}
        xlinkHref={`#${this.constructor.xlinkHref}`}
        fill={fill}
      />
    );
  }
}

class DefaultHexagonDef extends Component {
	render() {
  	return (
    	<Hexagon id={DefaultHexagon.xlinkHref} />
    );
  }
}

class Hexagon extends Component {
	static size = 25;
  static points = [
  	[0, 50],
    [43, 25],
    [43, -25],
    [0, -50],
    [-43, -25],
    [-43, 25],
  	[0, 50],
  ];
  static pointsStringBySize = {};
  static getPointsString(size) {
  	if (!(size in this.pointsStringBySize)) {
	    const ratio = size / 50;
    	this.pointsStringBySize[size] = this.points
      	.map(([x, y]) => `${x * ratio},${y * ratio}`)
        .join(' ');
    }
    return this.pointsStringBySize[size];
  }
	render() {
  	const {id, size = this.constructor.size, position, fill} = this.props;
  	return (
      <polygon
        id={id}
        transform={position ? `translate(${position.x}, ${position.y})` : undefined}
        points={this.constructor.getPointsString(size)}
        stroke={'red'} strokeWidth={3}
        fill={fill}
        />
    );
  }
}

export default App;

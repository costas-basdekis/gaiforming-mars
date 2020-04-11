import _ from "underscore";

class GameService {
  static boardOceans = _.indexBy([
    {x: 3, y: 0},
    {x: 5, y: 0},
    {x: 6, y: 0},
    {x: 6, y: 1},
    {x: 7, y: 3},
    {x: 3, y: 4},
    {x: 4, y: 4},
    {x: 5, y: 4},
    {x: 5, y: 5},
    {x: 6, y: 5},
    {x: 7, y: 5},
    {x: 6, y: 8},
  ], ({x, y}) => `${x},${y}`);
  static boardCities = _.indexBy([
    {x: 2, y: 4, name: 'noctis', label: 'Noctis'},
    {x: 0, y: 0, name: 'phobos', label: 'Phobos'},
    {x: 0, y: 8, name: 'ganymede', label: 'Ganymede'},
  ], ({x, y}) => `${x},${y}`);
	static resources = [
  	{name: 'tr', label: 'Terraform Rating', colour: 'cyan', fontColour: 'white', initialProduction: 20},
  	{name: 'money', label: 'MegaCredits', colour: 'yellow', fontColour: 'black', initialValue: 3000},
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
  	{
  	  name: 'generation', label: 'Generation', initialValue: 1, maxValue: null,
      getLabel: parameter => `${parameter.value}`,
    },
  	{
  	  name: 'temperature', label: 'Temperature', initialValue: 0, maxValue: 19,
      emptyColour: 'blue', fullColour: 'red',
      getLabel: parameter => `${-30 + parameter.value * 2}\u00B0C`,
    },
  	{
  	  name: 'oxygen', label: 'Oxygen', initialValue: 0, maxValue: 14,
      emptyColour: 'grey', fullColour: 'cyan',
      getLabel: parameter => `${parameter.value}%`,
    },
  	{
  	  name: 'oceans', label: 'Oceans', initialValue: 0, maxValue: 9,
      emptyColour: 'darkgoldenrod', fullColour: 'blue',
      getLabel: parameter => `${parameter.value} oceans`,
    },
  ];
  static standardProjects = [
  	{
    	name: 'powerPlant',
      label: 'Power Plant',
      cost: {money: {value: 11}},
      benefit: {energy: {production: 1}},
      globalParameters: {},
      tiles: {},
      conditions: {},
    },
  	{
    	name: 'asteroid',
      label: 'Asteroid',
      cost: {money: {value: 14}},
      benefit: {tr: {production: 1}},
      globalParameters: {temperature: 1},
      tiles: {},
      conditions: {maxTemperature: 18},
    },
  	{
    	name: 'aquifer',
      label: 'Aquifer',
      cost: {money: {value: 18}},
      benefit: {tr: {production: 1}},
      globalParameters: {oceans: 1},
      tiles: {ocean: 1},
      conditions: {maxOceans: 8},
    },
  	{
    	name: 'greenery',
      label: 'Greenery',
      cost: {money: {value: 23}},
      benefit: {tr: {production: 1}},
      globalParameters: {oxygen: 1},
      tiles: {greenery: 1},
      conditions: {},
    },
  	{
    	name: 'city',
      label: 'City',
      cost: {money: {value: 25}},
      benefit: {money: {production: 1}},
      globalParameters: {},
      tiles: {city: 1},
      conditions: {},
    },
  ];
  static players = [
  	{id: 1, colour: 'red', fontColour: 'white'},
  	{id: 2, colour: 'blue', fontColour: 'white'},
  ];
  static canPurchase(game, player, project) {
    if (!player) {
      return false;
    }
    if (game.action) {
      return false;
    }
  	for (const name in project.cost) {
      if (!project.cost.hasOwnProperty(name)) {
        continue;
      }
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
  	for (const condition in project.conditions) {
  	  if (!project.conditions.hasOwnProperty(condition)) {
  	    continue;
      }
  	  const value = project.conditions[condition];
  	  switch (condition) {
        case "maxOceans":
          if (game.globalParameters.oceans.value > value) {
            return false;
          }
          break;
        case "maxTemperature":
          if (game.globalParameters.temperature.value > value) {
            return false;
          }
          break;
        default:
          throw new Error(`Unknown condition '${condition}'`);
      }
    }

    return true;
  }
  static purchase(game, player, project) {
  	if (!this.canPurchase(game, player, project)) {
    	return game;
    }
    const newPlayer = {...player, resources: {...player.resources}};
    for (const name in project.cost) {
      if (!project.cost.hasOwnProperty(name)) {
        continue;
      }
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
      if (!project.benefit.hasOwnProperty(name)) {
        continue;
      }
    	const benefit = project.benefit[name];
      const resource = newPlayer.resources[name] = {...newPlayer.resources[name]};
      if ('value' in benefit) {
      	resource.value += benefit.value;
      }
      if ('production' in benefit) {
      	resource.production += benefit.production;
      }
    }
    let newGame = game;
    for (const name in project.globalParameters) {
      if (!project.globalParameters.hasOwnProperty(name)) {
        continue;
      }
      const count = project.globalParameters[name];
      // eslint-disable-next-line no-unused-vars
      for (const i of _.range(count)) {
        const parameter = newGame.globalParameters[name];
        if (parameter.maxValue !== null && parameter.value >= parameter.maxValue) {
          break;
        }
        newGame = {
          ...newGame,
          globalParameters: newGame.globalParameters.map(globalParameter =>
            globalParameter.name === parameter.name ? ({
              ...globalParameter,
              value: globalParameter.value + 1,
            }) : globalParameter),
        };
        Object.assign(
          newGame.globalParameters,
          _.indexBy(newGame.globalParameters, 'name'));
      }
    }
    let action = null;
    for (const name in project.tiles) {
      if (!project.tiles.hasOwnProperty(name)) {
        continue;
      }
      const count = project.tiles[name];
      if (!count) {
        continue;
      }
      action = `place-${name}`;
      break
    }
    if (newPlayer !== player) {
      if (newGame === game) {
        newGame = {...game};
      }
      newGame.players = newGame.players.map(
        oldPlayer => oldPlayer.id === newPlayer.id ? newPlayer : oldPlayer);
    }
    if (action !== game.action) {
      if (newGame === game) {
        newGame = {...game};
      }
      newGame.action = action;
    }
    return newGame;
  }
  static canPlaceOcean(game, player, tile) {
    if (!tile.oceanOnly) {
      return false;
    }
    if (tile.content) {
      return false;
    }

    return true;
  }
  static placeOcean(game, player, tile) {
    if (!this.canPlaceOcean(game, player, tile)) {
      return game;
    }

    let placementBonus = this.getPlacementBonus(game, tile);

    const newGame = {
      ...game,
      board: game.board.map(row => row.map(otherTile => otherTile === tile ? ({
        ...otherTile,
        content: {
          type: 'ocean',
        },
        owner: player.id,
      }) : otherTile)),
      action: null,
    };

    if (placementBonus) {
      newGame.players = newGame.players.map(
        otherPlayer => otherPlayer.id === player.id ? ({
          ...otherPlayer,
          resources: {
            ...otherPlayer.resources,
            money: {
              ...otherPlayer.resources.money,
              value: otherPlayer.resources.money.value + placementBonus.money.value,
            },
          },
        }) : otherPlayer)
    }

    return newGame;
  }
  static getPlacementBonus(game, tile) {
    const bonus = {money: {value: 0}};
    const neighbours = this.getNeighbours(game, tile);
    const oceanNeighbours = neighbours.filter(
      otherTile => otherTile.content && otherTile.content.type === 'ocean');
    if (!oceanNeighbours.length) {
      return null;
    }
    bonus.money.value += oceanNeighbours.length * 2;

    return bonus;
  }
  static NEIGHBOURS_OFFSETS = _
    .flatten(_.range(-1, 2).map(
      dX => _.range(-1, 2).map(dY => ({dX, dY}))))
    .filter(({dX, dY}) => dX !== dY);
  static getNeighbours(game, tile) {
    return this.NEIGHBOURS_OFFSETS
      .map(({dX, dY}) => game.board[tile.y + dY]
        ? game.board[tile.y + dY][tile.x + dX] : null)
      .filter(otherTile => otherTile)
      .filter(otherTile => otherTile.active);
  }
  static makeGame({playerCount = 2} = {}) {
  	return {
      board: this.makeBoard(),
      globalParameters: this.makeGlobalParameters(),
      activePlayer: null,
      players: this.players
      	.slice(0, playerCount)
        .map(player => this.makePlayer(player)),
      action: "none",
    };
  }
  static makeBoard() {
  	return _.range(9).map(y => _.range(9).map(x => ({
      x, y, active: (
        x >= Math.ceil((Math.abs(y - 4) - 1) / 2)
        && x <= 8 - Math.ceil((Math.abs(y - 4)) / 2)
      ) || (y === 0 && x === 0) || (y === 8 && x === 0),
      oceanOnly: `${x},${y}` in this.boardOceans,
      allowedCity: this.boardCities[`${x},${y}`] || null,
      content: null, owner: null,
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

export default GameService;

import _ from "underscore";

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
  	{
  	  name: 'temperature', label: 'Temperature', initialValue: 0, maxValue: 19,
      emptyColour: 'blue', fullColour: 'red',
      getLabel: parameter => `${-30 + parameter.value * 2}\u00B0C`,
    },
  ];
  static standardProjects = [
  	{
    	name: 'powerPlant',
      cost: {money: {value: 11}},
      benefit: {energy: {production: 1}},
      globalParameters: {},
    },
  	{
    	name: 'asteroid',
      cost: {money: {value: 14}},
      benefit: {},
      globalParameters: {temperature: 1},
    },
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
  static purchase(game, player, project) {
  	if (!GameService.canPurchase(player, project)) {
    	return {newPlayer: player, newGame: game};
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
    let newGame = game;
    for (const name in project.globalParameters) {
      const count = project.globalParameters[name];
      for (const i of _.range(count)) {
        const parameter = newGame.globalParameters[name];
        if (parameter.value >= parameter.maxValue) {
          break;
        }
        newGame = {
          ...newGame,
          globalParameters: newGame.globalParameters.map(parameter => ({
            ...parameter,
            value: parameter.value + 1,
          })),
        };
        Object.assign(
          newGame.globalParameters,
          _.indexBy(newGame.globalParameters, 'name'));
      }
    }
    return {newPlayer, newGame};
  }
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
      ) || (y === 0 && x === 0) || (y === 8 && x === 0),
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

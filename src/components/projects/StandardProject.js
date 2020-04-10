import React, {Component} from "react";
import GameService from "../../game/GameService";
import ResourceBox from "../resources/ResourceBox";
import RightArrow from "../draw/RightArrow";
import City from "../draw/City";
import ProductionBox from "../resources/ProductionBox";
import _ from 'underscore';
import OceanIcon from "../draw/OceanIcon";
import Greenery from "../draw/Greenery";
import TemperatureGauge from "../draw/TemperatureGauge";
import Oxygen from "../draw/Oxygen";

class StandardProject extends Component {
  static tilesComponents = {
    'city': City,
    'ocean': OceanIcon,
    'greenery': Greenery,
  };
  static globalParametersComponents = {
    'temperature': TemperatureGauge,
    'oxygen': Oxygen,
    'oceans': null,
  };

  canPurchase() {
    return GameService.canPurchase(this.props.game, this.props.activePlayer, this.props.project);
  }

  purchase = () => {
    this.props.control.purchaseProject(this.props.activePlayer, this.props.project);
  };

  render() {
    const {offset, project} = this.props;
    const canPurchase = this.canPurchase();
    const globalParametersComponents = _.flatten(_.pairs(project.globalParameters).map(([name, count]) =>
      _.range(count).map(() => name)))
      .map(parameter => this.constructor.globalParametersComponents[parameter])
      .filter(GlobalParameter => GlobalParameter !== null);
    const tilesComponents = _.flatten(_.pairs(project.tiles).map(([name, count]) =>
      _.range(count).map(() => name)))
      .map(tile => this.constructor.tilesComponents[tile]);
    const benefits = _.pairs(project.benefit).map(
      ([resourceName, {production, value}]) => [
        ...(production ? [resourceName, {production}] : []),
        ...(value ? [resourceName, {value}] : []),
      ]);
    return (
      <g transform={`translate(${offset.x}, ${offset.y})`}>
        {Object.keys(project.cost).map((resourceName, index) => (
          <ResourceBox
            key={index}
            resource={{
              value: -project.cost[resourceName].value,
              type: GameService.resourcesByName[resourceName],
            }}
            offset={{x: 25 * index, y: 0}}
          />
        ))}
        <RightArrow offset={{x: Object.keys(project.cost).length * 25, y: 0}}/>
        {globalParametersComponents.map((GlobalParameter, index) => (
          <GlobalParameter
            key={index}
            offset={{x: (Object.keys(project.cost).length + 1) * 25, y: 0}}
          />
        ))}
        {tilesComponents.map((Component, index) => (
          <Component
            key={index}
            offset={{
              x: (Object.keys(project.cost).length + 1 + globalParametersComponents.length) * 25,
              y: 0,
            }}
          />
        ))}
        {benefits.map(([resourceName, productionOrValue], index) => (
          productionOrValue.production ? (
            <ProductionBox
              key={index}
              resource={{
                ...productionOrValue,
                type: GameService.resourcesByName[resourceName],
              }}
              offset={{x: (Object.keys(project.cost).length + 1 + globalParametersComponents.length + tilesComponents.length + index) * 25, y: 0}}
            />
          ) : (
            <ResourceBox
              key={index}
              resource={{
                ...productionOrValue,
                type: GameService.resourcesByName[resourceName],
              }}
              offset={{x: (Object.keys(project.cost).length + 1 + globalParametersComponents.length + tilesComponents.length + index) * 25, y: 0}}
            />
          )
        ))}
        <rect
          x={100} y={0} width={130} height={25}
          fill={'yellow'} fillOpacity={canPurchase ? undefined : 0.4}
          stroke={'black'} strokeWidth={2}
        />
        <text x={110} y={20} fill={'black'}>{project.label}</text>
        <rect
          x={100} y={0} width={130} height={25}
          fill={'transparent'}
          className={canPurchase ? 'clickable' : undefined}
          onClick={canPurchase ? this.purchase : null}
        />
      </g>
    );
  }
}

export default StandardProject

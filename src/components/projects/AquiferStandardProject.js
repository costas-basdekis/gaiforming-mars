import React, {Component} from "react";
import GameService from "../../game/GameService";
import ResourceBox from "../resources/ResourceBox";
import RightArrow from "../draw/RightArrow";
import Ocean from "../draw/Ocean";

class AquiferStandardProject extends Component {
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
          resource={{
            value: -project.cost.money.value,
            type: GameService.resourcesByName.money
          }}
          offset={{x: 0, y: 0}}
        />
        <RightArrow offset={{x: 25, y: 10}}/>
        <Ocean offset={{x: 50, y: 0}}/>
        <rect
          x={100} y={0} width={130} height={25}
          fill={'yellow'} fillOpacity={canPurchase ? undefined : 0.4}
          stroke={'black'} strokeWidth={2}
        />
        <text x={110} y={20} fill={'black'}>Aquifer</text>
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
GameService.standardProjectsByName.aquifer.component = AquiferStandardProject;

export default AquiferStandardProject
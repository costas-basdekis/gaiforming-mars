import React, {Component} from "react";
import GameService from "../../game/GameService";
import ProductionBox from "../resources/ProductionBox";
import ResourceAndProductionBoxes
  from "../resources/ResourceAndProductionBoxes";
import TagCircle from "../resources/TagCircle";

class Player extends Component {
  static getSize() {
		return {
    	width: (
    	  100
        + 25 * GameService.resources.length
        + (GameService.tags.length % Math.ceil(GameService.tags.length / 2) + 1) * 25
      ),
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
          fill={player.colour} fillOpacity={player.active ? undefined : 0.4}
          stroke={'black'} strokeWidth={2}
          onClick={this.selectPlayer}
          className={player.active ? undefined : 'clickable'}
        />
        <text
          x={10} y={20}
          fill={player.fontColour} style={{pointerEvents: 'none'}}
        >
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
            	x: (
            	  100
                + 25 * GameService.resources.length
                + (index % Math.ceil(GameService.tags.length / 2)) * 25
              ),
              y: (
                25 * Math.floor(index / Math.ceil(GameService.tags.length / 2))
              ),
            }}
            tag={player.tags[tag.name]}
          />
        ))}
    	</g>
    );
  }
}

export default Player;

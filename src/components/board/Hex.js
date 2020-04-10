import React, {Component} from "react";
import DefaultHexagon from "../draw/DefaultHexagon";
import utils from '../../utils';

class Hex extends Component {
  onClick = () => {
    this.props.onClick(this.props.tile);
  };

  render() {
    const {
      size = utils.defaultBoardTileSize,
      x = 0, y = 0,
      stroke = 'red', fill = 'black',
      className, onClick,
    } = this.props;
    return (
      <DefaultHexagon
        position={utils.getBoardTileOffsetFromPosition({x, y, size})}
        stroke={stroke} fill={fill}
        className={className} onClick={onClick ? this.onClick : null}
      />
    );
  }
}

export default Hex;

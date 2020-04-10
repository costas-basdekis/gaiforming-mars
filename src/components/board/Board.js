import React, {Component} from "react";
import Hex from "./Hex";
import OceanIcon from "../draw/OceanIcon";
import City from "../draw/City";
import GameService from "../../game/GameService";
import _ from "underscore";
import OceanHex from "../draw/OceanHex";
import utils from "../../utils";

class Board extends Component {
  static tileComponents = {
    'ocean': OceanHex,
  };
  static getBorder(board) {
    const {longSize, shortSize, longOffset, shortOffset} = utils.getBoardTileMeasurements();
    const x = -shortSize / 2 - 20, y = -longSize / 2 - 20;
    const width = board[0].length * shortOffset + 40;
    const height = board.length * longOffset - longOffset + longSize + 40;
    return {x, y, width, height};
  }

  static getSize(board) {
    const {width, height} = this.getBorder(board);
    return {width, height};
  }

  onPlaceOceanClick = tile => {
    this.props.control.placeOcean(this.props.game.activePlayer, tile);
  };

  render() {
    const {game, activePlayer, board, offset} = this.props;
    const {x, y, width, height} = this.constructor.getBorder(board);
    const activeTiles = _.flatten(board).filter(tile => tile.active);
    return (
      <g transform={`translate(${-x + offset.x}, ${-y + offset.y})`}>
        <rect x={x} y={y} width={width} height={height}/>
        {activeTiles.map(tile =>
          <Hex
            key={`${tile.x},${tile.y}`}
            x={tile.x} y={tile.y}
            fill={(
              tile.oceanOnly
              ? `url(#${OceanIcon.Def.xlinkHref})`
              : tile.allowedCity
              ? `url(#${City.Def.xlinkHref})`
              : undefined
            )}
          />)}
        {activeTiles.filter(tile => tile.content).map(tile => ({
          tile,
          TypeHex: this.constructor.tileComponents[tile.content.type],
        })).map(({tile, TypeHex}) =>
          <TypeHex
            key={`${tile.x},${tile.y}`}
            x={tile.x} y={tile.y}
          />)}
        {game.action === "place-water" ? (
          activeTiles.filter(tile => GameService.canPlaceOcean(game, activePlayer, tile)).map(tile =>
            <Hex
              key={`${tile.x},${tile.y}`}
              x={tile.x} y={tile.y}
              stroke={'blue'}
              fill={(
                tile.oceanOnly
                ? `url(#${OceanIcon.Def.xlinkHref})`
                : tile.allowedCity
                ? `url(#${City.Def.xlinkHref})`
                : undefined
              )}
              tile={tile}
              onClick={this.onPlaceOceanClick}
              className={'clickable'}
            />)
        ) : null}
      </g>
    );
  }
}

export default Board;

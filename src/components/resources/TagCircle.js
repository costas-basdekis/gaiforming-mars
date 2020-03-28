import React, {Component} from "react";

class TagCircle extends Component {
  render() {
    const {tag, offset} = this.props;
    return (
      <g transform={`translate(${offset.x}, ${3 + offset.y})`}>
        <rect width={19} height={19} rx={10} ry={10} fill={tag.type.colour}
              stroke={'black'}/>
        <svg width={19} height={19}>
          <text
            x={"50%"} y={"50%"}
            dominantBaseline={"middle"} textAnchor={"middle"}
            fill={tag.type.fontColour}
          >{tag.type.prefix}{tag.played}</text>
        </svg>
        <rect
          width={19} height={19} rx={10} ry={10}
          fill={'transparent'} stroke={'transparent'}
        >
          <title>{tag.played} {tag.type.label} tags played</title>
        </rect>
      </g>
    );
  }
}

export default TagCircle;

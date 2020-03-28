import React, {Component} from "react";

class ProductionBox extends Component {
  render() {
    const {resource, offset} = this.props;
    return (
      <g transform={`translate(${offset.x}, ${3 + offset.y})`}>
        <rect
          width={19} height={19}
          fill={resource.type.colour} stroke={'slategrey'} strokeWidth={4}
        />
        <svg width={19} height={19}>
          <text
            x={"50%"} y={"50%"}
            dominantBaseline={"middle"} textAnchor={"middle"}
            fill={resource.type.fontColour}
          >{resource.production}</text>
        </svg>
        <rect
          width={19} height={19}
          fill={'transparent'} stroke={'transparent'} strokeWidth={4}
        >
          <title>{resource.production} {resource.type.label} per
            generation</title>
        </rect>
      </g>
    );
  }
}

export default ProductionBox;

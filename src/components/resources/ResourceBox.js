import React, {Component} from "react";

class ResourceBox extends Component {
  render() {
    const {resource, offset} = this.props;
    return (
      <g transform={`translate(${offset.x}, ${3 + offset.y})`}>
        <rect
          width={19} height={19}
          fill={resource.type.colour} stroke={'black'}
        />
        <svg width={19} height={19}>
          <text
            x={"50%"} y={"50%"}
            dominantBaseline={"middle"} textAnchor={"middle"}
            fill={resource.type.fontColour}
            fontSize={resource.value < 100
              ? undefined : resource.value < 1000 ? '0.66em' : '0.5em'}
          >{resource.value}</text>
        </svg>
        <rect
          width={19} height={19}
          fill={'transparent'} stroke={'transparent'}
        >
          <title>{resource.value} {resource.type.label}</title>
        </rect>
      </g>
    );
  }
}

export default ResourceBox;

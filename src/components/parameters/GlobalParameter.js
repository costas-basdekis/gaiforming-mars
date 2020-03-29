import React, {Component, Fragment} from "react";

class GlobalParameter extends Component {
  static getSize(parameter) {
    return {
      width: 200,
      height: 30,
    };
  }

  render() {
    const {offset, parameter} = this.props;
    const globalParametersSize = this.constructor.getSize(parameter);
    return (
      <g transform={`translate(${offset.x}, ${offset.y})`}>
        <rect
          x={0} y={0}
          width={globalParametersSize.width}
          height={globalParametersSize.height}
        />
        {parameter.maxValue !== null ? (
          <Fragment>
            <mask x={0} y={0} id={`globalParameterMask-${parameter.name}`}>
              <rect
                x={0} y={0}
                width={globalParametersSize.width * parameter.value / parameter.maxValue}
                height={globalParametersSize.height}
                fill={'white'}
              />
            </mask>
            <rect
              x={0} y={0}
              width={globalParametersSize.width}
              height={globalParametersSize.height}
              style={{pointerEvents: 'none'}}
              fill={`url(#${GlobalParameterDef.getXlinkHref(parameter)})`}
              mask={`url(#globalParameterMask-${parameter.name})`}
            />
          </Fragment>
        ) : null}
        <text
          x={10} y={20}
          fill={'white'}
          style={{pointerEvents: 'none'}}
        >
          {parameter.label}: {parameter.getLabel(parameter)}
          {parameter.maxValue !== null
            ? `(${parameter.value}/${parameter.maxValue})`
            : null}
        </text>
      </g>
    );
  }
}

class GlobalParameterDef extends Component {
  static getXlinkHref(parameter) {
    return `globalParameterGradient-${parameter.name}`;
  }

  render() {
    const {parameter} = this.props;
    return (
      <linearGradient
        id={this.constructor.getXlinkHref(parameter)} 
      >
        <stop offset={"5%"}  stopColor={parameter.emptyColour} />
        <stop offset={"95%"} stopColor={parameter.fullColour} />
      </linearGradient>
    );
  }
}
GlobalParameter.Def = GlobalParameterDef;

export default GlobalParameter;

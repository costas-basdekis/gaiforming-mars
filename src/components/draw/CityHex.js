import React, {Component} from 'react';
import utils from "../../utils";

class CityHex extends Component {
  static path = [
    <path key={'background'} fill={"grey"} stroke={"black"} d={`
      M 0 25
      L 21.5,12.5
      L 21.5,-12.5
      L 0,-25
      L -21.5,-12.5
      L -21.5,12.5
      z 
    `} />,
    <path key={'icon'} d={`
      M -7.9 -0.9394500000000008
      h 4.5
      v 1
      h -4.5
      v -1
      M -7.9 1.6105500000000035
      h 4.5
      v 1
      h -4.5
      v -1
      M 9.932500000000001 -11.48945
      h -3.6931
      c -0.8627000000000001 0 -1.5894000000000001 0.7038500000000001 -1.5894000000000001 1.5665
      v 11.2835
      H -1.2999999999999972
      v -3.5982000000000003
      c 0 -0.84565 -0.7000000000000001 -1.5363 -1.55 -1.56325
      v -1.2979
      c 0.0085 -0.8423500000000002 -0.6674500000000001 -1.5321500000000001 -1.5098000000000003 -1.54065
      c -0.010050000000000002 -0.0001 -0.02015 -0.0001 -0.0302 0
      H -5.149999999999999
      V -7.750499999999999
      c 1.1180999999999999 -0.27615 1.8006000000000002 -1.4064 1.52445 -2.52445
      C -3.90165 -11.39305 -5.0319 -12.0756 -6.15 -11.79945
      S -7.9506 -10.393049999999999 -7.67445 -9.275
      C -7.4887999999999995 -8.5232 -6.9018 -7.9361999999999995 -6.15 -7.750499999999999
      v 1.11105
      H -6.918749999999999
      C -7.7814 -6.63945 -8.5 -5.961500000000001 -8.5 -5.098800000000001
      v 1.2979
      c -0.8 0.02695 -1.5 0.7175500000000001 -1.5 1.56325
      v 11.115450000000001
      c 0.00285 0.2696 0.2237 0.4858 0.4933 0.48295000000000005
      c 0.0032500000000000003 -0.00005 0.006450000000000001 -0.0001 0.0097 -0.0002
      h 20.494
      c 0.26945 0.0082 0.4946 -0.20355 0.5028 -0.47305
      c 0.0001 -0.0032500000000000003 0.00015000000000000001 -0.006450000000000001 0.0002 -0.0097
      V -9.92295
      C 11.49775 -10.7876 10.7971 -11.4878 9.932500000000001 -11.48945
      z 
      M -6.738049999999999 -9.7731
      c 0 -0.5985 0.48514999999999997 -1.08365 1.08365 -1.08365
      s 1.08365 0.48514999999999997 1.08365 1.08365
      c 0 0.5985 -0.48514999999999997 1.08365 -1.08365 1.08365
      C -6.252600000000001 -8.6902 -6.737299999999999 -9.174949999999999 -6.738049999999999 -9.7731
      z 
      M -7.5 -5.098800000000001
      c 0 -0.3113 0.27 -0.5406500000000001 0.58125 -0.5406500000000001
      H -4.390000000000001
      c 0.28985 -0.008400000000000001 0.5316 0.2197 0.54 0.5095500000000001
      c 0.00030000000000000003 0.01035 0.00030000000000000003 0.02075 0 0.031100000000000003
      v 1.3093500000000002
      H -7.5
      V -5.098800000000001
      z 
      M -4.75 8.360550000000003
      H -6.550000000000001
      v -2.85
      h 1.8
      V 8.360550000000003
      z 
      M -2.3000000000000007 8.360550000000003
      h -1.4500000000000002
      v -3.37195
      c 0 -0.27615 -0.23095 -0.47805000000000003 -0.5071 -0.47805000000000003
      H -7.0517
      c -0.27615 0 -0.49829999999999997 0.20190000000000002 -0.49829999999999997 0.47805000000000003
      v 3.37195
      H -9
      V -2.2376499999999986
      c 0.0028000000000000004 -0.30760000000000004 0.2544 -0.55465 0.562 -0.5519000000000001
      c 0.00185 0 0.0037 0.00005 0.0055000000000000005 0.0001
      h 5.5562000000000005
      c 0.3114 -0.006500000000000001 0.5693 0.2404 0.5763 0.5518
      V 8.360550000000003
      z 
      M 2.6000000000000014 8.360550000000003
      h -1.85
      v -1.4000000000000001
      h 1.85
      V 8.360550000000003
      z 
      M 4.649999999999999 8.360550000000003
      h -1.05
      v -1.88145
      c -0.008400000000000001 -0.28385 -0.23730000000000004 -0.5115500000000001 -0.52115 -0.5185500000000001
      h -2.8179
      c -0.28185 0.0078000000000000005 -0.5073000000000001 0.23660000000000003 -0.51095 0.5185500000000001
      v 1.88145
      h -1.05
      v -6
      h 5.95
      V 8.360550000000003
      z 
      M 10.5 8.360550000000003
      h -4.8500000000000005
      v -2.6500000000000004
      h 4.8500000000000005
      V 8.360550000000003
      z 
      M 10.5 4.710550000000001
      h -4.8500000000000005
      v -1.3
      h 4.8500000000000005
      V 4.710550000000001
      z 
      M 10.5 2.4105500000000006
      h -4.8500000000000005
      v -1.35
      h 4.8500000000000005
      V 2.4105500000000006
      z 
      M 10.5 0.060549999999999216
      h -4.8500000000000005
      v -1.35
      h 4.8500000000000005
      V 0.060549999999999216
      z 
      M 10.5 -2.2894499999999987
      h -4.8500000000000005
      v -1.3
      h 4.8500000000000005
      V -2.2894499999999987
      z 
      M 10.5 -4.589449999999999
      h -4.8500000000000005
      v -1.35
      h 4.8500000000000005
      V -4.589449999999999
      z 
      M 10.5 -6.939450000000001
      h -4.8500000000000005
      v -1.3
      h 4.8500000000000005
      V -6.939450000000001
      z 
      M 10.5 -9.23945
      h -4.8500000000000005
      v -0.6835
      c 0 -0.31150000000000005 0.2781 -0.5665 0.5894 -0.5665
      h 3.6931
      c 0.3126 0.0010500000000000002 0.5659 0.2539 0.5675 0.5665
      V -9.23945
      z
    `} />,
  ];

  render() {
    const {x = 0, y = 0, fill} = this.props;
    const offset = utils.getBoardTileOffsetFromPosition({x, y});
    return (
      <g transform={`translate(${offset.x}, ${offset.y})`} fill={fill}>
        {this.constructor.path}
      </g>
    );
  }
}

export default CityHex;
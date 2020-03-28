import React, {Component} from 'react';

class TemperatureGauge extends Component {
  static path = [
    <path fill={'red'} stroke={'black'} d={`
      M 10.19185 12.5282
      c -0.03025 -0.019450000000000002 -0.09175 -0.05605 -0.09175 -0.14770000000000003
      V 4.1299
      C 10.100100000000001 2.95545 9.14465 2 7.970300000000001 2
      C 6.7959000000000005 2 5.840450000000001 2.95545 5.840450000000001 4.1299
      v 8.2589
      c 0 0.0771 -0.06185000000000001 0.12025 -0.09235 0.13985
      c -1.1736000000000002 0.75365 -1.8897 2.05045 -1.8897 3.4597499999999997
      c 0 2.2674 1.8446000000000002 4.112 4.1119 4.112
      c 2.26735 0 4.1119 -1.8446500000000001 4.1119 -4.112
      C 12.0822 14.578800000000001 11.36585 13.28185 10.19185 12.5282
      z 
    `} />,
    <path d={`
      M 7.970300000000001 19.3504
      c -1.8537500000000002 0 -3.3619000000000003 -1.5082000000000002 -3.3619000000000003 -3.362
      c 0 -1.24465 0.68335 -2.38215 1.78345 -2.9685
      l 0.046150000000000004 -0.0246
      c 0 0 0.15245 -0.06065000000000001 0.15245 -0.30435
      c 0 -2.1403 0 -8.56105 0 -8.56105
      C 6.59045 3.3689999999999998 7.2094000000000005 2.75 7.970300000000001 2.75
      c 0.76085 0 1.3798000000000001 0.6190000000000001 1.3798000000000001 1.3799000000000001
      c 0 0 0 6.4231 0 8.564100000000002
      c 0 0.24065 0.16175 0.30625 0.16175 0.30625
      l 0.03685 0.01965
      c 1.1001 0.58635 1.7835 1.7238 1.7835 2.9685
      C 11.3322 17.8422 9.82405 19.3504 7.970300000000001 19.3504
      z 
      M 8.6325 14.40705
      c -0.03685 -0.013950000000000002 -0.11220000000000002 -0.036950000000000004 -0.11220000000000002 -0.16195
      V 5.7743
      c 0 -0.30375 -0.24625 -0.55 -0.55 -0.55
      c -0.30375 0 -0.55 0.24625 -0.55 0.55
      v 8.47075
      c 0 0.12085 -0.08275 0.1506 -0.12315000000000001 0.16615000000000002
      c -0.70225 0.27105 -1.20185 0.9531499999999999 -1.20185 1.7499
      c 0 1.0339 0.8411 1.875 1.875 1.875
      c 1.0339 0 1.875 -0.8411 1.875 -1.875
      C 9.845300000000002 15.360300000000002 9.3405 14.67525 8.6325 14.40705
      z 
      M 13.6669 4.2743
      h 2.95175
      c 0.16570000000000001 0 0.30000000000000004 -0.13435 0.30000000000000004 -0.30000000000000004
      c 0 -0.16565000000000002 -0.1343 -0.30000000000000004 -0.30000000000000004 -0.30000000000000004
      h -2.95175
      c -0.16565000000000002 0 -0.30000000000000004 0.13435 -0.30000000000000004 0.30000000000000004
      C 13.366900000000001 4.140000000000001 13.5012 4.2743 13.6669 4.2743
      z 
      M 13.6669 6.2076
      h 3.95175
      c 0.16570000000000001 0 0.30000000000000004 -0.13435 0.30000000000000004 -0.30000000000000004
      c 0 -0.16565000000000002 -0.1343 -0.30000000000000004 -0.30000000000000004 -0.30000000000000004
      h -3.95175
      c -0.16565000000000002 0 -0.30000000000000004 0.13435 -0.30000000000000004 0.30000000000000004
      C 13.366900000000001 6.0733 13.5012 6.2076 13.6669 6.2076
      z 
      M 13.6669 6.2076
      h 3.95175
      c 0.16570000000000001 0 0.30000000000000004 -0.13435 0.30000000000000004 -0.30000000000000004
      c 0 -0.16565000000000002 -0.1343 -0.30000000000000004 -0.30000000000000004 -0.30000000000000004
      h -3.95175
      c -0.16565000000000002 0 -0.30000000000000004 0.13435 -0.30000000000000004 0.30000000000000004
      C 13.366900000000001 6.0733 13.5012 6.2076 13.6669 6.2076
      z 
      M 13.6669 8.1409
      h 2.95175
      c 0.16570000000000001 0 0.30000000000000004 -0.13435 0.30000000000000004 -0.30000000000000004
      s -0.1343 -0.30000000000000004 -0.30000000000000004 -0.30000000000000004
      h -2.95175
      c -0.16565000000000002 0 -0.30000000000000004 0.13435 -0.30000000000000004 0.30000000000000004
      S 13.5012 8.1409 13.6669 8.1409
      z 
      M 17.618650000000002 10.0743
      c 0.16570000000000001 0 0.30000000000000004 -0.1343 0.30000000000000004 -0.30000000000000004
      c 0 -0.16565000000000002 -0.1343 -0.30000000000000004 -0.30000000000000004 -0.30000000000000004
      h -3.95175
      c -0.16565000000000002 0 -0.30000000000000004 0.13435 -0.30000000000000004 0.30000000000000004
      c 0 0.16570000000000001 0.13435 0.30000000000000004 0.30000000000000004 0.30000000000000004
      H 17.618650000000002
      z 
      M 18.1105 15.468600000000002
      l -1.7357500000000003 -2.24595
      c -0.12140000000000001 -0.15700000000000003 -0.29705 -0.24705 -0.48200000000000004 -0.24705
      c -0.1849 0 -0.36060000000000003 0.09010000000000001 -0.48200000000000004 0.24710000000000001
      l -1.7357500000000003 2.2458500000000003
      c -0.13675 0.17695000000000002 -0.1686 0.3735 -0.08725000000000001 0.5392
      c 0.0814 0.16570000000000001 0.25630000000000003 0.26080000000000003 0.48 0.26080000000000003
      h 0.4093
      c 0.054200000000000005 0 0.1 0.04580000000000001 0.1 0.1
      v 2.4640500000000003
      c 0 0.386 0.31400000000000006 0.7000000000000001 0.7000000000000001 0.7000000000000001
      h 1.1347500000000001
      c 0.386 0 0.7000000000000001 -0.31400000000000006 0.7000000000000001 -0.7000000000000001
      v -2.4640500000000003
      c 0 -0.054200000000000005 0.04580000000000001 -0.1 0.1 -0.1
      h 0.50595
      c 0.2237 0 0.39860000000000007 -0.09505000000000001 0.48 -0.26080000000000003
      C 18.2791 15.84205 18.24725 15.645500000000002 18.1105 15.468600000000002
      z 
      M 17.43495 15.66855
      c -0.05575 0 -0.22315000000000002 0 -0.22315000000000002 0
      c -0.386 0 -0.7000000000000001 0.31400000000000006 -0.7000000000000001 0.7000000000000001
      v 2.4640500000000003
      c 0 0.054200000000000005 -0.04580000000000001 0.1 -0.1 0.1
      h -1.1347500000000001
      c -0.054200000000000005 0 -0.1 -0.04580000000000001 -0.1 -0.1
      v -2.4640500000000003
      c 0 -0.386 -0.31400000000000006 -0.7000000000000001 -0.7000000000000001 -0.7000000000000001
      c 0 0 -0.10420000000000001 0 -0.13895 0
      c -0.057050000000000003 0 -0.03545 -0.030850000000000002 -0.03545 -0.030850000000000002
      l 1.5053 -1.9476500000000003
      c 0 0 0.0419 -0.052300000000000006 0.08485000000000001 -0.052300000000000006
      c 0.04530000000000001 0 0.08750000000000001 0.05560000000000001 0.08750000000000001 0.05560000000000001
      l 1.4999500000000001 1.9409
      C 17.4802 15.6343 17.5076 15.66855 17.43495 15.66855
      z
    `} />,
  ];
  render() {
    const {offset} = this.props;
    return (
      <g transform={`translate(${offset.x}, ${offset.y})`}>
        {this.constructor.path}
      </g>
    );
  }
}

export default TemperatureGauge

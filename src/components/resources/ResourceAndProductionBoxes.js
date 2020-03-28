import React, {Component, Fragment} from "react";
import ResourceBox from "./ResourceBox";
import ProductionBox from "./ProductionBox";

class ResourceAndProductionBoxes extends Component {
  render() {
    const {resource, offset, vertical = true} = this.props;
    return (
      <Fragment>
        <ResourceBox
          offset={{x: 0 + offset.x, y: 0 + offset.y}} resource={resource}
        />
        <ProductionBox
          offset={
            vertical
              ? {x: 0 + offset.x, y: 25 + offset.y}
              : {x: 25 + offset.x, y: 0 + offset.y}
          }
          resource={resource}
        />
      </Fragment>
    );
  }
}


export default ResourceAndProductionBoxes;

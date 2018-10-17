import * as React from "react";
import {
    DropTarget
} from "react-dnd";

const boxTarget = {
    drop() {
        return { name: "Area" };
    }
};

@DropTarget(
    "MenuItem",
    boxTarget,
    (connect, monitor) => ({
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
    }),
)
class BuildArea extends React.Component {
    render() {
        const { canDrop, isOver, connectDropTarget } = this.props;
        const isActive = canDrop && isOver;

        let backgroundColor = "#999";
        if (isActive) {
            backgroundColor = "darkgreen";
        } else if (canDrop) {
            backgroundColor = "darkkhaki";
        }

        return connectDropTarget && connectDropTarget(
            <div style={{backgroundColor, height: "100%"}}>
                {isActive ? "Release to drop" : "Drag a box here"}
            </div>
        );
    }
}

export default BuildArea;

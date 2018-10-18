import * as React from "react";
import {
    DropTarget
} from "react-dnd";
import { findDOMNode } from "react-dom";
import ToolMenuItem from "./toolMenuItem";

const boxTarget = {
    drop() {
        return { name: "Area" };
    },
    hover(props, monitor, component) {
        if (!component) {
            return null;
        }

        // console.log(props);
        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;

        // console.log(dragIndex);
        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
            return;
        }

        // Determine rectangle on screen
        const hoverBoundingRect = findDOMNode(
            component,
        ).getBoundingClientRect();

        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

        console.log(hoverMiddleY);

        // Determine mouse position
        const clientOffset = monitor.getClientOffset();

        // Get pixels to the top
        const hoverClientY = (clientOffset).y - hoverBoundingRect.top;

        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%

        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
        }

        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
        }

        // Time to actually perform the action
        props.moveCard(dragIndex, hoverIndex);

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        monitor.getItem().index = hoverIndex;
    }
};

import style from "./buildArea.less";
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
    constructor(props) {
        super(props);

        this.state = {
            tree: []
        };
    }

    render() {
        const { canDrop, isOver, connectDropTarget } = this.props;
        const isActive = canDrop && isOver;

        let border = "1px solid #ccc";
        if (isActive) {
            border = "1px solid lightgreen";
        } else if (canDrop) {
            border = "1px dashed lightblue";
        }

        return (
            <div className={style.areaMain}>
                {connectDropTarget && connectDropTarget(
                    <div style={{border}} className={style.buildArea}>
                        <ToolMenuItem name="image1" index="1" />
                        <ToolMenuItem name="image2" index="2" />
                        <ToolMenuItem name="image3" index="2" />
                    </div>
                )}
            </div>
        );
    }
}

export default BuildArea;

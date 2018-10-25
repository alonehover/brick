import React from "react";
import { DragSource, DropTarget } from "react-dnd";
import { findDOMNode } from "react-dom";
import classNames from "classnames";

import style from "./index.less";
import { observer, inject } from "mobx-react";

const imageSource = {
    beginDrag(props) {
        return {
            name: props.name,
            index: props.index
        };
    }
};

const imageTarget = {
    hover(props, monitor, component) {
        if (!component || !props.canDrop) {
            return null;
        }

        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;

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
        // console.log(dragIndex, hoverIndex);
        props.moveBrick(dragIndex, hoverIndex);

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        monitor.getItem().index = hoverIndex;
    }
};

@DropTarget("Image", imageTarget, connect => ({
    connectDropTarget: connect.dropTarget()
}))
@DragSource("Image", imageSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
}))
@inject("homeStore") @observer
class Image extends React.Component {
    constructor(props) {
        super(props);
        console.log("props", props);
        this.imageRef = null;
    }

    render() {
        const { isDragging, connectDragSource, connectDropTarget, name, active } = this.props;
        const activeClass = classNames({
            [style.image]: true,
            [style.active]: isDragging || active
        });
        return connectDragSource(
            connectDropTarget(
                <div
                    className={activeClass}
                    onClick={this.handleClick}
                    ref={el => (this.imageRef = el)}
                    onMouseOver={this.handleHover}>
                    {name}
                </div>
            )
        );
    }

    handleClick = () => {
        console.log("click", this.props);
    }

    handleHover = () => {
        const { homeStore } = this.props;
        const { x, y } = this.imageRef.getBoundingClientRect();
        homeStore.hoverBrick(this.props.id, {x, y});
    }
}

export default Image;

import React from "react";
import { DropTarget, DragSource } from "react-dnd";
import { findDOMNode } from "react-dom";
import classNames from "classnames";
import Brick from "../index";

import style from "./index.less";
import { observer } from "mobx-react";

const blockSource = {
    beginDrag(props) {
        console.log("block begin drag");
        return {
            name: props.name,
            index: props.index,
            type: "block"
        };
    },
    endDrag(props, monitor, component) {
        const dropResult = monitor.getDropResult();
        if(!dropResult) {
            // 只有最终放置在构建槽里的组件才会新增渲染组件
            console.log("未放置在构建槽，清除新增的渲染组件");
            props.homeStore.handleLastBrick("delete");
            return;
        }
        props.homeStore.handleLastBrick();
        console.log("渲染组件添加成功");
    }
};

const blockTarget = {
    hover(props, monitor, component) {
        if (!component || !props.canDrop || monitor.getItem().type !== "block") {
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
        props.moveBrick(dragIndex, hoverIndex, monitor.getItem());

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        monitor.getItem().index = hoverIndex;
    }
};

@observer
@DropTarget(["Block", "ToolItem"], blockTarget, connect => ({
    connectDropTarget: connect.dropTarget()
}))
@DragSource("Block", blockSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
}))
class Block extends React.Component {
    constructor(props) {
        super(props);
        this.blockRef = null;
    }

    switchBlockComponents = pluginName => {
        let BlockComponent = Brick[pluginName];
        return BlockComponent;
    }

    render() {
        const { isDragging, connectDragSource, connectDropTarget, newBrick, edit, id, plugin, homeStore } = this.props;
        let BlockComponents = this.switchBlockComponents(plugin);
        const activeClass = classNames({
            [style.block]: true,
            [style.draging]: isDragging || newBrick,
            [style.active]: isDragging,
            [style.edit]: edit
        });
        return connectDragSource(
            connectDropTarget(
                <div
                    className={activeClass}
                    onClick={this.handleClick}
                    ref={el => (this.blockRef = el)}>
                    <BlockComponents id={id} homeStore={homeStore} />
                    {/* {name} */}
                </div>
            )
        );
    }

    handleClick = () => {
        console.log("click", this.props);
        const { homeStore, id, plugin, name } = this.props;
        homeStore.selectBrick({id, plugin, name}, this.blockRef.getBoundingClientRect());
    }
}

export default Block;

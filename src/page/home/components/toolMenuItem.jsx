import React from "react";
import { DragSource } from "react-dnd";
import { inject, observer } from "mobx-react";

import style from "./toolMenu.less";

const cardSource = {
    beginDrag(props) {
        return {
            name: props.name,
            plugin: props.plugin
        };
    },
    endDrag(props, monitor, component) {
        const dropResult = monitor.getDropResult();
        if(!dropResult) {
            // 只有最终放置在构建槽里的组件才会新增渲染组件
            console.log(props.name + "未放置在构建槽，清除新增的渲染组件");
            props.homeStore.handleLastBrick("delete");
            return;
        }

        // 没有组件时新增一个
        if(!props.homeStore.brickBuildList.length) {
            props.homeStore.changeBrickBuildList([{
                plugin: props.plugin,
                name: props.name,
                id: new Date().valueOf(),
                newBrick: true,
                canDrop: false,
                edit: false
            }]);
        }
        props.homeStore.handleLastBrick();
        console.log(props.name + "渲染组件添加成功");
    }
};

@inject("homeStore") @observer
@DragSource("ToolItem", cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
}))
class ToolMenu extends React.Component {
    render() {
        const { isDragging, connectDragSource, name } = this.props;
        return connectDragSource(
            <div
                className={style.sideMenuItem}
                style={{ opacity: isDragging ? 0.4 : 1}}>
                {name}
            </div>
        );
    }
}

export default ToolMenu;

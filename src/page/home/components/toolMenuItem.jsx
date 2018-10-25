import React from "react";
import { DragSource } from "react-dnd";
import { inject, observer } from "mobx-react";

import style from "./toolMenu.less";

const cardSource = {
    beginDrag(props) {
        return {
            name: props.name
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
        console.log(props);
        props.homeStore.handleLastBrick();
        console.log("渲染组件添加成功");
    }
};

@inject("homeStore") @observer
@DragSource("Image", cardSource, (connect, monitor) => ({
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

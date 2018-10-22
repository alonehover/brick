import React from "react";
import { DragSource } from "react-dnd";

import style from "./toolMenu.less";

const cardSource = {
    beginDrag(props) {
        return {
            name: props.name
        };
    },
    endDrag(props, monitor, component) {
        // const item = monitor.getItem();
        const dropResult = monitor.getDropResult();
        // console.log(item, dropResult);
        console.log(props, monitor, component.state);
        if(!dropResult) {
            // 只有最终放置在构建槽里的组件才会新增渲染组件
            console.log("清除新增的渲染组件");
            return;
        }

        console.log("渲染组件添加成功");
    }
};

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

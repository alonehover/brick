import React from "react";
import { DragSource } from "react-dnd";

import style from "./toolMenu.less";

const cardSource = {
    beginDrag(props) {
        return {
            name: props.name
        };
    },
    endDrag(props, monitor) {
        const item = monitor.getItem();
        const dropResult = monitor.getDropResult();
        console.log(item, dropResult);
    }
};

@DragSource("MenuItem", cardSource, (connect, monitor) => ({
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

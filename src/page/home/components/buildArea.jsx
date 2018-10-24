import * as React from "react";
import { DropTarget } from "react-dnd";
import { observer } from "mobx-react";
import update from "immutability-helper";

import Brick from "../../../components";
import style from "./buildArea.less";

const boxTarget = {
    drop(props, monitor, component) {
        return { name: "Area" };
    },
    hover(props) {
        if(!props.homeStore.brickBuildList.length) {
            props.homeStore.changeBrickBuildList([{
                plugin: "Image",
                name: "image1",
                id: 1,
                active: true,
                canDrop: false,
                edit: false
            }]);
        }
    }
};

@DropTarget(
    "Image",
    boxTarget,
    (connect, monitor) => ({
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
    }),
)
@observer
class BuildArea extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { canDrop, isOver, connectDropTarget } = this.props;
        const tree = this.props.homeStore.brickBuildList;
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
                        {tree.map((item, index) => {
                            return (
                                <Brick.Image
                                    {...item}
                                    index={index}
                                    key={item.id}
                                    moveBrick={this.moveBrick}
                                />);
                        })}
                    </div>
                )}
            </div>
        );
    }

    moveBrick = (dragIndex, hoverIndex) => {
        const tree = this.props.homeStore.brickBuildList;
        let dragItem = tree[dragIndex];

        if(dragIndex === undefined) {
            dragIndex = tree.length;
            dragItem = {
                plugin: "Image",
                name: "image" + (dragIndex + 1),
                id: dragIndex + 1,
                active: true
            };
        }else {
            dragItem = tree[dragIndex];
        }
        const dragObj = update(tree, {
            $splice: [[dragIndex, 1], [hoverIndex, 0, dragItem]]
        });
        this.props.homeStore.changeBrickBuildList(dragObj);
    }
}

export default BuildArea;

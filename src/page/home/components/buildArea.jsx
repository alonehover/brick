import * as React from "react";
import {
    DropTarget
} from "react-dnd";
import update from "immutability-helper";
import Brick from "../../../components";

const boxTarget = {
    drop() {
        return { name: "Area" };
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
            tree: [{
                plugin: "Image",
                name: "image1",
                id: 1,
                active: false
            }, {
                plugin: "Image",
                name: "image2",
                id: 2,
                active: false
            }, {
                plugin: "Image",
                name: "image3",
                id: 3,
                active: false
            }]
        };
    }

    render() {
        const { canDrop, isOver, connectDropTarget } = this.props;
        const { tree } = this.state;
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
                                    active={item.active}
                                    name={item.name}
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
        const { tree } = this.state;
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
        const dragObj = update(this.state, {
            tree: {
                $splice: [[dragIndex, 1], [hoverIndex, 0, dragItem]]
            }
        });
        this.setState(dragObj);
        // tree[1].name = "todo";
        console.log(tree[1], this.state.tree[1], dragObj);
    }
}

export default BuildArea;

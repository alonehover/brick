import * as React from "react";
import {
    DropTarget
} from "react-dnd";
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
                name: "image",
                id: 1
            }, {
                plugin: "Image",
                name: "image",
                id: 2
            }, {
                plugin: "Image",
                name: "image",
                id: 3
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
        console.log(dragIndex, hoverIndex);
        const tree = Object.assign({}, this.state.tree);
        tree[1].name = "img";
        console.log(tree, this.state.tree);
    }
}

export default BuildArea;

import * as React from "react";
import { Icon } from "antd";
import { DropTarget } from "react-dnd";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import update from "immutability-helper";

import Brick from "../../../components";
import style from "./buildArea.less";

const boxTarget = {
    drop(props, monitor, component) {
        return { name: "Area" };
    }
};

@DropTarget(
    ["Block", "ToolItem"],
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
        const { canDrop, isOver, connectDropTarget, homeStore } = this.props;
        const tree = homeStore.brickBuildList;
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
                    <div id="buildArea" style={{border}} className={style.buildArea}>
                        {tree.map((item, index) => {
                            return (
                                <Brick.Block
                                    {...item}
                                    index={index}
                                    key={item.id}
                                    homeStore={homeStore}
                                    moveBrick={this.moveBrick}
                                />);
                        })}
                    </div>
                )}

                <div className={style.toolFixed} style={toJS(homeStore.toolFixedOpsition.style)}>
                    <ul>
                        <li className={style.removeBtn} onClick={this.removeBrick}>
                            <Icon type="delete" theme="filled" />
                        </li>
                    </ul>
                </div>
            </div>
        );
    }

    moveBrick = (dragIndex, hoverIndex, props) => {
        const tree = this.props.homeStore.brickBuildList;
        let dragItem = tree[dragIndex];

        if(dragIndex === undefined) {
            dragIndex = tree.length;
            dragItem = {
                plugin: props.plugin,
                name: props.name,
                id: new Date().valueOf(),
                newBrick: true
            };
        }else {
            dragItem = tree[dragIndex];
        }
        const dragObj = update(tree, {
            $splice: [[dragIndex, 1], [hoverIndex, 0, dragItem]]
        });
        console.log("in move brick");
        this.props.homeStore.replaceBrickBuildList(dragObj);
    }

    removeBrick = () => {
        this.props.homeStore.removeBrick();
    }
}

export default BuildArea;

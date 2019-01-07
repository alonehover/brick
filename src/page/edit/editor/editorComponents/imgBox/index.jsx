import * as React from "react";
import Img from "./img";
import { Button, message } from "antd";

import { inject, observer } from "mobx-react";
import { DropTarget } from "react-dnd";
import update from "immutability-helper";

const imgBoxTarget = {
    drop(props, monitor, component) {
        return { name: "ImgBox" };
    }
};

@inject("homeStore")
@DropTarget(["ImgItem"], imgBoxTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
}))
@observer
class ImgBox extends React.Component {
    constructor(props) {
        super(props);
    }

    handleAddImg = () => {
        let {homeStore, maxNum} = this.props,
            { editBrick, brickListStyle } = homeStore,
            imgs = brickListStyle[editBrick.id].imgs,
            initImg = {
                title: "Banner Ttitle",
                src: "http://promotion.administration.qa1.tff.com/static_html/common/img/lazy.png",
                href: "#",
                appRouter: "/app/home",
                reactKey: `react_${new Date().valueOf()}`
            };
        if(imgs.length < maxNum) {
            homeStore.addArrayParams(initImg, "imgs");
            message.success("图片添加成功");
            return true;
        }
        message.success(`图片添加失败，最多添加${maxNum}张`);
    }

    removeImgItem = (event, attributes, index) => {
        event.stopPropagation();
        let {homeStore, minNum} = this.props;
        let { editBrick, brickListStyle } = homeStore;
        let imgs = brickListStyle[editBrick.id].imgs;
        if(imgs.length > minNum) {
            message.success(`${attributes.title} 删除成功`);
            // 用update更改（待做）
            let newImgs = update(imgs, { $splice: [[index, 1]] });
            homeStore.replaceEditorBox(newImgs, "imgs");
            return true;
        }
        message.error(`${attributes.title} 删除失败, 至少有${minNum}张图片`);
    }

    moveImgItem = (dragIndex, hoverIndex) => {
        const editBrick = this.props.homeStore.editBrick;
        const tree = this.props.homeStore.brickListStyle[editBrick.id].imgs;
        let dragItem = tree[dragIndex];
        const dragObj = update(tree, {
            $splice: [[dragIndex, 1], [hoverIndex, 0, dragItem]]
        });
        this.props.homeStore.replaceEditorBox(dragObj, "imgs");
    };

    render() {
        let {homeStore, connectDropTarget} = this.props;
        let { editBrick, brickListStyle } = homeStore;
        let imgs = brickListStyle[editBrick.id].imgs;
        return connectDropTarget(
            <div>
                <h3>图片盒子</h3>
                <div>
                    {imgs.map((img, index) => <Img key={img.reactKey} attributes={img} index={index} removeImgItem={this.removeImgItem} moveImgItem={this.moveImgItem} />)}
                </div>
                <Button block type="primary" onClick={() => this.handleAddImg()} >
                    Add
                </Button>
            </div>
        );
    }
}

export default ImgBox;

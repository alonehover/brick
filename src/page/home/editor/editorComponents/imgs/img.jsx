import * as React from "react";
import {Input} from "antd";
import {DropTarget, DragSource} from "react-dnd";

import ImgStyle from "./img.less";

const blockTarget = {
    hover(props, monitor, component) {
        console.log("hover");
    }
};

const blockSource = {
    beginDrag(props) {
        console.log("ImgBox begin drag");
    },
    endDrag(props, monitor, component) {
        console.log("ImgBox end");
    }
};

@DropTarget(["ImgBox"], blockTarget, connect => ({
    connectDropTarget: connect.dropTarget()
}))
@DragSource("ImgBox", blockSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
}))
class Img extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let {connectDragSource, connectDropTarget, attributes} = this.props;
        return connectDragSource(
            connectDropTarget(<section className="img-area">
                <div className={ImgStyle.imgHeader}>
                    <a className={ImgStyle.dragTag} />
                    <div className={ImgStyle.imgTitle}>{attributes.title}</div>
                    <div className={ImgStyle.imgEditor}>操作区</div>
                </div>
                <div className={ImgStyle.imgEditContent}>
                    <h5 style={{paddingTop: 8}}>标题</h5>
                    <Input defaultValue={attributes.title} placeholder="Basic usage" />
                    <h5 style={{paddingTop: 8}}>图片</h5>
                    <Input defaultValue={attributes.src} placeholder="Basic usage" />
                    <h5 style={{paddingTop: 8}}>app路由</h5>
                    <Input defaultValue={attributes.appRouter} placeholder="Basic usage" />
                    <h5 style={{paddingTop: 8}}>链接</h5>
                    <Input defaultValue={attributes.href} placeholder="Basic usage" />
                </div>
            </section>)
        );
    }
}

export default Img;

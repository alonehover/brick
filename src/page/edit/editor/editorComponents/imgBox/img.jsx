import * as React from "react";
import {Input, Icon, Modal, Upload, message} from "antd";
import { findDOMNode } from "react-dom";
import {DropTarget, DragSource} from "react-dnd";
import { inject, observer } from "mobx-react";

import ImgStyle from "./img.less";

const Dragger = Upload.Dragger;

const blockTarget = {
    hover(props, monitor, component) {
        if (!component || monitor.getItem().type !== "ImgItem") {
            return null;
        }
        const dragIndex = monitor.getItem().dragIndex;
        const hoverIndex = props.index;
        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
            return;
        }

        // Determine rectangle on screen
        const hoverBoundingRect = findDOMNode(
            component,
        ).getBoundingClientRect();

        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

        // Determine mouse position
        const clientOffset = monitor.getClientOffset();

        // Get pixels to the top
        const hoverClientY = (clientOffset).y - hoverBoundingRect.top;

        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%
        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
        }

        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
        }
        // Time to actually perform the action
        props.moveImgItem(dragIndex, hoverIndex, monitor.getItem());

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        monitor.getItem().dragIndex = hoverIndex;
    }
};

const blockSource = {
    beginDrag(props) {
        return {
            dragIndex: props.index,
            type: "ImgItem"
        };
    },
    endDrag(props, monitor, component) {
        console.log("ImgItem end");
    }
};

@inject("homeStore")
@DropTarget(["ImgItem"], blockTarget, connect => ({
    connectDropTarget: connect.dropTarget()
}))
@DragSource("ImgItem", blockSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
}))
@observer
class Img extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgEditContentShow: false,
            imgEditIconShow: false,
            uploadForbidden: false
        };
    }

    editContentState = () => {
        let imgEditContentShow = !this.state.imgEditContentShow;
        this.setState({
            imgEditContentShow
        });
    }

    mouseOver = () => {
        if(!this.state.imgEditIconShow) {
            this.setState({
                imgEditIconShow: true
            });
        }
    }

    mouseOut = () => {
        this.setState({
            imgEditIconShow: false
        });
    }

    showModal = () => {
        this.setState({
            uploadModal: true
        });
    }

    handleCancel = e => {
        this.setState({
            uploadModal: false
        });
    }

    changeImgAttribute = (value, key) => {
        const {index, attributes} = this.props;
        attributes[key] = value;
        this.changeArrayParams(attributes, "imgs", index);
    }

    changeArrayParams = (value, key, index) => {
        let { homeStore } = this.props;
        homeStore.changeArrayParams(value, key, index);
    }

    uploadChange = info => {
        const status = info.file.status;
        if (status !== "uploading") {
            console.log(info.file, info.fileList);
        }
        if (status === "done" && info.file.response.code === 0) {
            let response = info.file.response;
            message.success(`${info.file.name} file uploaded successfully.`);
            this.changeImgAttribute(response.data.url, "src");
            this.setState({
                uploadForbidden: true
            });
        } else if (status === "error") {
            message.error(`${info.file.name} file upload failed.`);
        }
    }

    removeFile = () => {
        const {index, attributes} = this.props;
        attributes.src = "http://promotion.administration.qa1.tff.com/static_html/common/img/lazy.png";
        this.changeArrayParams(attributes, "imgs", index);
        return true;
    }

    render() {
        let {connectDragSource, connectDropTarget, attributes, isDragging, removeImgItem, index} = this.props;
        const props = {
            name: "files",
            multiple: false,
            action: "//windtour.administration.qa1.tff.com/api/upload",
            listType: "picture"
        };
        return connectDropTarget(
            <section className={isDragging ? ImgStyle.imgAreaDragging : ImgStyle.imgArea}
                onMouseOut={this.mouseOut}
                onMouseOver={this.mouseOver}>
                {connectDragSource(
                    <div className={ImgStyle.imgHeader}
                        onClick={this.editContentState}>
                        <a className={ImgStyle.dragTag} />
                        <div className={ImgStyle.imgTitle}>{`${index + 1}.${attributes.title}`}</div>
                        <div className={this.state.imgEditIconShow ? ImgStyle.imgEditorActive : ImgStyle.imgEditorHide}>
                            <ul>
                                <li className={ImgStyle.removeBtn} onClick={e => removeImgItem(e, attributes, index)}>
                                    <Icon type="delete" theme="filled" />
                                </li>
                            </ul>
                        </div>
                    </div>)
                }
                <div className={this.state.imgEditContentShow ? ImgStyle.imgEditActive : ImgStyle.imgEditHide}>
                    <h5 style={{paddingTop: 8}}>标题</h5>
                    <Input value={attributes.title}
                        placeholder="Basic usage"
                        onChange={e => this.changeImgAttribute(e.target.value, "title")} />
                    <h5 style={{paddingTop: 8}}>图片</h5>
                    <Input readOnly
                        onClick={this.showModal}
                        value={attributes.src}
                        placeholder="Basic usage" />
                    <h5 style={{paddingTop: 8}}>app路由</h5>
                    <Input defaultValue={attributes.appRouter}
                        placeholder="Basic usage"
                        onChange={e => this.changeImgAttribute(e.target.value, "appRouter")} />
                    <h5 style={{paddingTop: 8}}>链接</h5>
                    <Input defaultValue={attributes.href}
                        placeholder="Basic usage"
                        onChange={e => this.changeImgAttribute(e.target.value, "href")} />
                </div>
                <Modal
                    title="Image Upload"
                    visible={this.state.uploadModal}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <Dragger {...props}
                        onRemove={this.removeFile}
                        disabled={this.state.uploadForbidden}
                        onChange={info => this.uploadChange(info)}>
                        <p className="ant-upload-drag-icon">
                            <Icon type="inbox" />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
                    </Dragger>
                </Modal>
            </section>
        );
    }
}

export default Img;

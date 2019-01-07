import * as React from "react";
import {Input, Icon} from "antd";
import { findDOMNode } from "react-dom";
import {DropTarget, DragSource} from "react-dnd";
import { inject, observer } from "mobx-react";

import ProductStyle from "./product.less";


const blockTarget = {
    hover(props, monitor, component) {
        if (!component || monitor.getItem().type !== "ProductItem") {
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
        props.moveProductItem(dragIndex, hoverIndex, monitor.getItem());

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
            type: "ProductItem"
        };
    },
    endDrag(props, monitor, component) {
        console.log("ProductItem end");
    }
};

@inject("homeStore")
@DropTarget(["ProductItem"], blockTarget, connect => ({
    connectDropTarget: connect.dropTarget()
}))
@DragSource("ProductItem", blockSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
}))
@observer
class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productEditContentShow: false,
            productEditIconShow: false
        };
    }

    editContentState = () => {
        let productEditContentShow = !this.state.productEditContentShow;
        this.setState({
            productEditContentShow
        });
    }

    mouseOver = () => {
        if(!this.state.productEditIconShow) {
            this.setState({
                productEditIconShow: true
            });
        }
    }

    mouseOut = () => {
        this.setState({
            productEditIconShow: false
        });
    }

    changeProductAttribute = (value, key) => {
        const {index, attributes} = this.props;
        attributes[key] = value;
        this.changeArrayParams(attributes, "products", index);
    }

    changeArrayParams = (value, key, index) => {
        let { homeStore } = this.props;
        homeStore.changeArrayParams(value, key, index);
    }

    render() {
        let {connectDragSource, connectDropTarget, attributes, isDragging, removeProductItem, index} = this.props;
        return connectDropTarget(
            <section className={isDragging ? ProductStyle.productAreaDragging : ProductStyle.productArea}
                onMouseOut={this.mouseOut}
                onMouseOver={this.mouseOver}>
                {connectDragSource(
                    <div className={ProductStyle.productHeader}
                        onClick={this.editContentState}>
                        <a className={ProductStyle.dragTag} />
                        <div className={ProductStyle.productTitle}>{`${index + 1}.${attributes.title}`}</div>
                        <div className={this.state.productEditIconShow ? ProductStyle.productEditorActive : ProductStyle.productEditorHide}>
                            <ul>
                                <li className={ProductStyle.removeBtn} onClick={e => removeProductItem(e, attributes, index)}>
                                    <Icon type="delete" theme="filled" />
                                </li>
                            </ul>
                        </div>
                    </div>)
                }
                <div className={this.state.productEditContentShow ? ProductStyle.productEditActive : ProductStyle.productEditHide}>
                    <h5 style={{paddingTop: 8}}>标题</h5>
                    <Input value={attributes.title}
                        placeholder=""
                        onChange={e => this.changeProductAttribute(e.target.value, "title")} />
                    <h5 style={{paddingTop: 8}}>Product ID</h5>
                    <Input readOnly
                        value={attributes.productId}
                        placeholder="" />
                </div>
            </section>
        );
    }
}

export default Product;

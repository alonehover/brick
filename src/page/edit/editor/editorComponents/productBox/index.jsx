import * as React from "react";
import Product from "./product";
import { Button, message } from "antd";

import { inject, observer } from "mobx-react";
import { DropTarget } from "react-dnd";
import update from "immutability-helper";

const productBoxTarget = {
    drop(props, monitor, component) {
        return { name: "ProductBox" };
    }
};

@inject("homeStore")
@DropTarget(["ProductBox"], productBoxTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
}))
@observer
class ProductBox extends React.Component {
    constructor(props) {
        super(props);
    }

    handleAddProduct = () => {
        let {homeStore, maxNum} = this.props,
            { editBrick, brickListStyle } = homeStore,
            products = brickListStyle[editBrick.id].products,
            initProduct = {
                title: "Product Title",
                productId: "",
                reactKey: `react_${new Date().valueOf()}`
            };
        if(products.length < maxNum) {
            homeStore.addArrayParams(initProduct, "products");
            message.success("产品添加成功");
            return true;
        }
        message.success(`产品添加失败，最多添加${maxNum}个`);
    }

    removeProductItem = (event, attributes, index) => {
        event.stopPropagation();
        let {homeStore, minNum} = this.props;
        let { editBrick, brickListStyle } = homeStore;
        let products = brickListStyle[editBrick.id].products;
        if(products.length > minNum) {
            message.success(`${attributes.title} 删除成功`);
            let newProducts = update(products, { $splice: [[index, 1]] });
            homeStore.replaceEditorBox(newProducts, "products");
            return true;
        }
        message.error(`${attributes.title} 删除失败, 至少有${minNum}个产品`);
    }

    moveProductItem = (dragIndex, hoverIndex) => {
        const editBrick = this.props.homeStore.editBrick;
        const tree = this.props.homeStore.brickListStyle[editBrick.id].products;
        let dragItem = tree[dragIndex];
        const dragObj = update(tree, {
            $splice: [[dragIndex, 1], [hoverIndex, 0, dragItem]]
        });
        this.props.homeStore.replaceEditorBox(dragObj, "products");
    };

    render() {
        let {homeStore, connectDropTarget} = this.props;
        let { editBrick, brickListStyle } = homeStore;
        let products = brickListStyle[editBrick.id].products;
        return connectDropTarget(
            <div>
                <h3>产品盒子</h3>
                <div>
                    {products.map((product, index) => <Product key={product.reactKey} attributes={product} index={index} removeProductItem={this.removeProductItem} moveProductItem={this.moveProductItem} />)}
                </div>
                <Button block type="primary" onClick={() => this.handleAddProduct()} >
                    Add
                </Button>
            </div>
        );
    }
}

export default ProductBox;

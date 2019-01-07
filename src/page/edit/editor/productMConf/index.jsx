import * as React from "react";

import { inject, observer } from "mobx-react";
import EditorComponents from "../editorComponents";

@inject("homeStore")
@observer
class ProductMConf extends React.Component {
    constructor(props) {
        super(props);
    }

    srcValueChange = (value, key = "srcs", index) => {
        let {homeStore} = this.props;
        homeStore.changeArrayParams(value, key, index);
    }

    addBrickStyle = (value, key) => {
        let {homeStore} = this.props;
        homeStore.addStringStyle(value, key);
    }

    addNumStyle = (value, key, unit) => {
        let {homeStore} = this.props;
        homeStore.addNumStyle(value, key, unit);
    }

    render() {
        let { homeStore } = this.props;
        let { editBrick, brickListStyle } = homeStore;
        let { style } = brickListStyle[editBrick.id];
        return(
            <div style={{position: "relative"}}>
                <EditorComponents.BlockInput title="product_M" style={style} />
                <EditorComponents.Background style={style} />
                <EditorComponents.MarginInput style={style} />
                <EditorComponents.PaddingInput style={style} />
                <EditorComponents.ProductBox minNum={1} maxNum={99} style={style} />
            </div>
        );
    }
}

export default ProductMConf;

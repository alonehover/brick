import * as React from "react";
import { Input, Button } from "antd";

import BannerConfStyle from "./bannerConf.less";
import { inject, observer } from "mobx-react";
import EditorComponents from "../editorComponents";

@inject("homeStore")
@observer
class BannerConf extends React.Component {
    constructor(props) {
        super(props);
    }

    handleAddBanner = () => {
        let {homeStore} = this.props;
        homeStore.addArrayParams("", "srcs");
    }

    srcValueChange = (value, key = "srcs", index) => {
        // console.log(value, key = "src", index);
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
        let { srcs, style } = brickListStyle[editBrick.id];
        return(
            <div style={{position: "relative"}}>
                <h1>banner设置</h1>
                <EditorComponents.BlockInput title="Banner" style={style} />
                {/* <EditorComponents.MarginInput style={style} />
                <EditorComponents.PaddingInput style={style} /> */}
                <EditorComponents.Imgs />
                <ul>
                    {
                        srcs.map((src, index) => {
                            return(<li key={editBrick.id + "_" + index}><Input addonBefore={`图片${index + 1}`} value={src} onChange={e => this.srcValueChange(e.target.value, "srcs", index)} /></li>);
                        })
                    }
                </ul>
                <Button className={BannerConfStyle.addImage}  onClick={() => this.handleAddBanner()} type="primary" shape="circle" icon="plus" />
            </div>
        );
    }
}

export default BannerConf;

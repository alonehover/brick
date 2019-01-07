import * as React from "react";

import { inject, observer } from "mobx-react";
import EditorComponents from "../editorComponents";

@inject("homeStore")
@observer
class MultiBannerConf extends React.Component {
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
                <h1>banner设置</h1>
                <EditorComponents.BlockInput title="Multi Banner" style={style} />
                <EditorComponents.PaddingInput style={style} />
                <EditorComponents.Background style={style} />
                {/* <EditorComponents.MarginInput style={style} />
                <EditorComponents.PaddingInput style={style} /> */}
                <EditorComponents.ImgBox maxNum={3} minNum={2} style={style} />
            </div>
        );
    }
}

export default MultiBannerConf;

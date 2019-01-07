import * as React from "react";

import { inject, observer } from "mobx-react";
import EditorComponents from "../editorComponents";

@inject("homeStore")
@observer
class BannerConf extends React.Component {
    constructor(props) {
        super(props);
    }

    handleAddImg = () => {
        let {homeStore} = this.props,
            initImg = {
                title: "Banner Ttitle",
                src: "http://promotion.administration.qa1.tff.com/static_html/common/img/lazy.png",
                href: "#",
                appRouter: "/app/home",
                reactKey: `react_${new Date().valueOf()}`
            };
        homeStore.addArrayParams(initImg, "imgs");
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
        // let { homeStore } = this.props;
        // let { editBrick, brickListStyle } = homeStore;
        // let { style } = brickListStyle[editBrick.id];
        return(
            <div style={{position: "relative"}}>
                <h1>banner设置</h1>
                {/* <EditorComponents.BlockInput title="Banner" style={style} /> */}
                {/* <EditorComponents.MarginInput style={style} />
                <EditorComponents.PaddingInput style={style} /> */}
                <EditorComponents.ImgBox minNum={1} maxNum={8} />
            </div>
        );
    }
}

export default BannerConf;

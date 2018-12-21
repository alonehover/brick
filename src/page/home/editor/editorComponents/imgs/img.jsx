import * as React from "react";
import {Input} from "antd";

import ImgStyle from "./img.less";

class Img extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <section className="img-area">
                <div className={ImgStyle.imgHeader}>
                    <a className={ImgStyle.dragTag} />
                    <div className={ImgStyle.imgTitle}>1.Title</div>
                    <div className={ImgStyle.imgEditor}>操作区</div>
                </div>
                <div className={ImgStyle.imgEditContent}>
                    <h5 style={{paddingTop: 8}}>标题</h5>
                    <Input placeholder="Basic usage" />
                    <h5 style={{paddingTop: 8}}>图片</h5>
                    <Input placeholder="Basic usage" />
                    <h5 style={{paddingTop: 8}}>链接</h5>
                    <Input placeholder="Basic usage" />
                </div>
            </section>
        );
    }
}

export default Img;

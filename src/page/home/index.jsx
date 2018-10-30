import React, { Component } from "react";
import { Layout } from "antd";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { inject, observer } from "mobx-react";

// import Board from "../../components/checkerboard";
import ToolMenu from "./components/toolMenu";
import BuildArea from "./components/buildArea";

import style from "./index.less";

const { Header, Sider, Content } = Layout;

@inject("homeStore") @observer
@DragDropContext(HTML5Backend)
class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            height: 0
        };

        // console.log(this.props);
    }

    componentDidMount() {
        this.setState({
            height: document.body.clientHeight - 64
        });
    }

    render() {
        const { height } = this.state;
        return (
            <section id="editor">
                <Layout>
                    <Header>活动页编辑器</Header>
                    <Layout>
                        <Sider className={style.editorSider}>
                            {/* 组件集 */}
                            <ToolMenu />
                        </Sider>
                        <Content style={{ minHeight: height }} className={style.Content}>
                            <div className={style.areaHead}>
                                <div className={style.urlContent}>
                                    https://site.com
                                </div>
                            </div>
                            {/* 拖拽区 */}
                            <BuildArea homeStore={this.props.homeStore} />
                        </Content>
                        <Sider className={style.editorConfig}>
                            <h1>设置</h1>
                            <ul>
                                <li>导航id</li>
                                <li>背景(图片或者颜色)</li>
                                <li>字体大小</li>
                                <li>字体颜色</li>
                                <li>行高</li>
                                <li>外边距</li>
                                <li>内边距</li>
                            </ul>
                        </Sider>
                    </Layout>
                </Layout>
            </section>
        );
    }
}

export default Home;

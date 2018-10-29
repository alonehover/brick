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
                            <ToolMenu />
                        </Sider>
                        <Content style={{ minHeight: height }} className={style.Content}>
                            <div className={style.areaHead}>
                                <div className={style.urlContent}>
                                    https://site.com
                                </div>
                            </div>
                            <BuildArea homeStore={this.props.homeStore} />
                        </Content>
                        <Sider className={style.editorConfig}>
                            <h1>设置</h1>
                        </Sider>
                    </Layout>
                </Layout>
            </section>
        );
    }
}

export default Home;

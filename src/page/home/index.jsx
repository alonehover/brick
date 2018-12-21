import React, { Component } from "react";
import { Layout, Button } from "antd";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { inject, observer } from "mobx-react";

// import Board from "../../components/checkerboard";
import ToolMenu from "./components/toolMenu";
import BuildArea from "./components/buildArea";
import EditorComponents from "./editor";

import style from "./index.less";

const { Header, Sider, Content } = Layout;

@DragDropContext(HTML5Backend)
@inject("homeStore")
@observer
class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            height: 0,
            loading: false
        };

        // console.log(this.props);
    }

    componentDidMount() {
        this.setState({
            height: document.body.clientHeight - 64
        });
    }

    configProduced = () => {
        let configs = [],
            { homeStore } = this.props,
            { brickBuildList, brickListStyle} = homeStore;
        for(let brick of brickBuildList) {
            let {style, ...props} = brickListStyle[brick.id];
            let config = {
                name: brick.name,
                plugin: brick.plugin,
                id: brick.id,
                style, props
            };
            configs.push(config);
        }
        console.log(configs, "configs");
    }

    switchEditorComponent = homeStore => {
        let EditorComponent = homeStore.editBrick === null ? null :  EditorComponents[`${homeStore.editBrick.plugin}Conf`];
        return EditorComponent;
    }

    render() {
        const { height } = this.state;
        const { homeStore } = this.props;
        let EditorComponent = this.switchEditorComponent(homeStore);
        return (
            <section id="editor">
                <Layout>
                    <Header>
                        活动页编辑器
                        <Button type="primary" loading={this.state.loading} onClick={this.configProduced}>
                            Config json
                        </Button>
                    </Header>
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
                        <Sider className={style.editorConfig} width="360">
                            {homeStore.editBrick === null ? null : <EditorComponent /> }
                        </Sider>
                    </Layout>
                </Layout>
            </section>
        );
    }
}

export default Home;

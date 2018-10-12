import React, { Component } from "react";
import { Layout } from "antd";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

// import Board from "../../components/checkerboard";
import ToolMenu from "./components/toolMenu";

import "./index.less";

const { Header, Sider, Content } = Layout;

@DragDropContext(HTML5Backend)
class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            height: 0
        };
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
                    <Header>Header</Header>
                    <Layout>
                        <Sider className="editor-sider">
                            <ToolMenu />
                        </Sider>
                        <Content style={{ minHeight: height }}>
                            {/* <Board knightPosition={[0, 0]} /> */}
                        </Content>
                    </Layout>
                </Layout>
            </section>
        );
    }
}

export default Home;

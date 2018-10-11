import React, { Component } from "react";
import { Layout } from "antd";

import "./index.less";

const { Header, Sider, Content } = Layout;

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            height: 0,
        };
    }

    componentDidMount() {
        this.setState({
            height: document.body.clientHeight - 64,
        });
    }

    render() {
        const { height } = this.state;
        return (
            <section id="editor">
                <Layout>
                    <Header>Header</Header>
                    <Layout>
                        <Sider className="editor-sider">Sider</Sider>
                        <Content style={{ minHeight: height }}>Content</Content>
                    </Layout>
                </Layout>
            </section>
        );
    }
}

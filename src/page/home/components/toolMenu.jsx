import React from "react";

import "./toolMenu.less";

export default class ToolMenu extends React.Component {
    render() {
        return (
            <section className="tool-menu">
                <h1>组件列表</h1>
                <ul>
                    <li>image</li>
                    <li>Banner</li>
                    <li>Multi banner</li>
                    <li>Product 【M】</li>
                    <li>Product 【L】</li>
                    <li>Tab</li>
                    <li>Navigation</li>
                    <li>Text</li>
                </ul>
            </section>
        );
    }
}

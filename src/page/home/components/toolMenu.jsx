import React from "react";
import ToolMenuItem from "./toolMenuItem";

import "./toolMenu.less";

class ToolMenu extends React.Component {
    render() {
        return (
            <section className="tool-menu">
                <h1>组件列表</h1>
                <div>
                    <ToolMenuItem name="Image" />
                    <ToolMenuItem name="Banner" />
                    <ToolMenuItem name="Multi banner" />
                    <ToolMenuItem name="Product 【M】" />
                    <ToolMenuItem name="Product 【L】" />
                    <ToolMenuItem name="Tab" />
                    <ToolMenuItem name="Navigation" />
                    <ToolMenuItem name="Text" />
                </div>
            </section>
        );
    }
}

export default ToolMenu;

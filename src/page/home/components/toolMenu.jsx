import React from "react";
import ToolMenuItem from "./toolMenuItem";

import style from "./toolMenu.less";

const tools = [{
    name: "Image",
    plugin: "Image"
}, {
    name: "Banner",
    plugin: "Banner"
}, {
    name: "Multi banner",
    plugin: "Image_Mul"
}, {
    name: "Product 【M】",
    plugin: "Product_M"
}, {
    name: "Product 【L】",
    plugin: "Product_L"
}, {
    name: "Tab",
    plugin: "Tab"
}, {
    name: "Navigation",
    plugin: "Navigation"
}, {
    name: "Text",
    plugin: "Text"
}];

class ToolMenu extends React.Component {
    render() {
        return (
            <section className={style.toolMenu}>
                <h1>组件列表</h1>
                <div>
                    {tools.map(item => {
                        return <ToolMenuItem name={item.name} plugin={item.plugin} key={item.name} />;
                    })}
                </div>
            </section>
        );
    }
}

export default ToolMenu;

import React from "react";
import ToolMenuItem from "./toolMenuItem";

import style from "./toolMenu.less";

class ToolMenu extends React.Component {
    render() {
        return (
            <section className={style.toolMenu}>
                <h1>组件列表</h1>
                <div>
                    <ToolMenuItem name="Image" plugin="Image" />
                    <ToolMenuItem name="Banner" plugin="Image" />
                    <ToolMenuItem name="Multi banner" plugin="Image_Mul" />
                    <ToolMenuItem name="Product 【M】" plugin="Product_M" />
                    <ToolMenuItem name="Product 【L】" plugin="Product_L" />
                    <ToolMenuItem name="Tab" plugin="Tab" />
                    <ToolMenuItem name="Navigation" plugin="Navigation" />
                    <ToolMenuItem name="Text" plugin="Text" />
                </div>
            </section>
        );
    }
}

export default ToolMenu;

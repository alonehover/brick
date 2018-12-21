import * as React from "react";
import { Input } from "antd";

class MultiImageConf extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <h1>Image配置</h1>
                <div style={{ marginBottom: 16 }}>
                    <Input addonBefore="src" onChange={e => this.propertyValueEnter(e.target.value, "src")} />
                </div>
            </div>
        );
    }
}

export default MultiImageConf;

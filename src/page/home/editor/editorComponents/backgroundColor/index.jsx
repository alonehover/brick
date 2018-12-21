import * as React from "react";
import { Input } from "antd";
import { inject, observer } from "mobx-react";
@inject("homeStore")
@observer
class BackgroundColor extends React.Component {
    constructor(props) {
        super(props);
    }

    styleStringEnter = (value, key) => {
        let { homeStore } = this.props;
        homeStore.addStringStyle(value, key);
    }

    render() {
        let {style} = this.props;
        return(
            <Input.Group style={{ marginBottom: 16 }}>
                <h3>背景</h3>
                <Input addonBefore="背景颜色" value={style.backgroundColor} onChange={e => this.styleStringEnter(e.target.value, "backgroundColor")} />
            </Input.Group>
        );
    }
}

export default BackgroundColor;

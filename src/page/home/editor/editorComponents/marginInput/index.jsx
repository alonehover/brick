import * as React from "react";
import { Input, Row, Col } from "antd";
import { inject, observer } from "mobx-react";
@inject("homeStore")
@observer
class MarginInput extends React.Component {
    constructor(props) {
        super(props);
    }

    styleNumEnter = (value, key, unit) => {
        let { homeStore } = this.props;
        homeStore.addNumStyle(value, key, unit);
    }

    render() {
        let { style } = this.props;
        return(
            <Input.Group style={{ marginBottom: 16 }}>
                <h3>外边距</h3>
                <Row gutter={16} style={{ marginBottom: 16 }}>
                    <Col span={12}>
                        <Input addonBefore="上" value={parseFloat(style.marginTop) || 0} addonAfter="px" onChange={e => this.styleNumEnter(e.target.value, "marginTop", "px")} />
                    </Col>
                    <Col span={12}>
                        <Input addonBefore="右" value={parseFloat(style.marginRight) || 0} addonAfter="px" onChange={e => this.styleNumEnter(e.target.value, "marginRight", "px")} />
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Input addonBefore="下" value={parseFloat(style.marginBottom) || 0} addonAfter="px" onChange={e => this.styleNumEnter(e.target.value, "marginBottom", "px")} />
                    </Col>
                    <Col span={12}>
                        <Input addonBefore="左" value={parseFloat(style.marginLeft) || 0} addonAfter="px" onChange={e => this.styleNumEnter(e.target.value, "marginLeft", "px")} />
                    </Col>
                </Row>
            </Input.Group>
        );
    }
}

export default MarginInput;

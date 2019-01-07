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
                <Row gutter={16} style={{ marginBottom: 8 }}>
                    <Col span={12}>
                        <Input size={"small"}
                            addonBefore="上"
                            addonAfter="px"
                            value={style.marginTop ? (parseFloat(style.marginTop) || 0) : 0}
                            onChange={e => this.styleNumEnter(e.target.value, "marginTop", "px")} />
                    </Col>
                    <Col span={12}>
                        <Input size={"small"}
                            addonBefore="右"
                            addonAfter="px"
                            value={style.marginRight ? (parseFloat(style.marginRight) || 0) : 0}
                            onChange={e => this.styleNumEnter(e.target.value, "marginRight", "px")} />
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Input size={"small"}
                            addonBefore="下"
                            addonAfter="px"
                            value={style.marginBottom ? (parseFloat(style.marginBottom) || 0) : 0}
                            onChange={e => this.styleNumEnter(e.target.value, "marginBottom", "px")} />
                    </Col>
                    <Col span={12}>
                        <Input size={"small"}
                            addonBefore="左"
                            addonAfter="px"
                            value={style.marginLeft ? (parseFloat(style.marginLeft) || 0) : 0}
                            onChange={e => this.styleNumEnter(e.target.value, "marginLeft", "px")} />
                    </Col>
                </Row>
            </Input.Group>
        );
    }
}

export default MarginInput;

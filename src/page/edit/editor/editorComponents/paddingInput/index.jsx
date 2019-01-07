import * as React from "react";
import { Input, Row, Col } from "antd";
import { inject, observer } from "mobx-react";
@inject("homeStore")
@observer
class PaddingInput extends React.Component {
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
                <h3>内边距</h3>
                <Row gutter={16} style={{ marginBottom: 8 }}>
                    <Col span={12}>
                        <Input size={"small"}
                            addonBefore="上"
                            addonAfter="px"
                            value={style.paddingTop ? (parseFloat(style.paddingTop) || 0) : 0}
                            onChange={e => this.styleNumEnter(e.target.value, "paddingTop", "px")} />
                    </Col>
                    <Col span={12}>
                        <Input size={"small"}
                            addonBefore="右"
                            addonAfter="px"
                            value={style.paddingRight ? (parseFloat(style.paddingRight) || 0) : 0}
                            onChange={e => this.styleNumEnter(e.target.value, "paddingRight", "px")} />
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Input size={"small"}
                            addonBefore="下"
                            addonAfter="px"
                            value={style.paddingBottom ? (parseFloat(style.paddingBottom) || 0) : 0}
                            onChange={e => this.styleNumEnter(e.target.value, "paddingBottom", "px")} />
                    </Col>
                    <Col span={12}>
                        <Input size={"small"}
                            addonBefore="左"
                            addonAfter="px"
                            value={style.paddingLeft ? (parseFloat(style.paddingLeft) || 0) : 0}
                            onChange={e => this.styleNumEnter(e.target.value, "paddingLeft", "px")} />
                    </Col>
                </Row>
            </Input.Group>
        );
    }
}

export default PaddingInput;

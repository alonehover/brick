import * as React from "react";
import { Input, Row, Col } from "antd";
import { inject, observer } from "mobx-react";
@inject("homeStore")
@observer
class BlockInput extends React.Component {
    constructor(props) {
        super(props);
    }

    styleNumEnter = (value, key, unit) => {
        let { homeStore } = this.props;
        homeStore.addNumStyle(value, key, unit);
    }

    render() {
        let {style, title} = this.props;
        return(
            <Input.Group style={{ marginBottom: 16 }}>
                <h3>{title}</h3>
                <Row gutter={16}>
                    <Col span={12}>
                        <Input addonBefore="宽度" value={style.width ? (parseFloat(style.width) || 0) : 0} addonAfter="%" onChange={e => this.styleNumEnter(e.target.value, "width", "%")} />
                    </Col>
                    <Col span={12}>
                        <Input addonBefore="高度" value={style.height ? (parseFloat(style.height) || 0) : 0} addonAfter="px" onChange={e => this.styleNumEnter(e.target.value, "height", "px")} />
                    </Col>
                </Row>
            </Input.Group>
        );
    }
}

export default BlockInput;

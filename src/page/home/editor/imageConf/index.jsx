import * as React from "react";
import { inject, observer } from "mobx-react";
import EditorComponents from "../editorComponents";
import { Input, Select } from "antd";

@inject("homeStore")
@observer
class ImageConf extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { homeStore } = this.props;
        let { editBrick, brickListStyle } = homeStore;
        let { style, ...property } = brickListStyle[editBrick.id];
        return(
            <div>
                <h1>Image配置</h1>
                <div style={{ marginBottom: 16 }}>
                    <div style={{ marginBottom: 8 }}>
                        target:
                        <Select defaultValue="blank" style={{marginLeft: 8}}>
                            <Select.Option value="_self" key="_self">self</Select.Option>
                            <Select.Option value="_blank" key="_blank">blank</Select.Option>
                            <Select.Option value="none" key="none">none</Select.Option>
                        </Select>
                    </div>
                    <Input style={{ marginBottom: 8 }} addonBefore="src" value={property.src} onChange={e => this.propertyValueEnter(e.target.value, "src")} />
                    <Input style={{ marginBottom: 8 }} addonBefore="href" value={property.href} onChange={e => this.propertyValueEnter(e.target.value, "href")} />
                </div>
                <EditorComponents.BlockInput style={style} title={editBrick.name} />
                <EditorComponents.MarginInput style={style} />
                <EditorComponents.Paddingnput style={style} />
                <EditorComponents.BackgroundColor style={style} />
            </div>
        );
    }
}

export default ImageConf;

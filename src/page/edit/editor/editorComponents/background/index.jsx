
import * as React from "react";
import { Input, Row, Col, Select, Modal, Upload, Icon, message } from "antd";
import { inject, observer } from "mobx-react";
import { filterImageShow } from "../../../../../utils";

import BackgroundStyle from "./background.less";

const Option = Select.Option;
const Dragger = Upload.Dragger;

@inject("homeStore")
@observer
class Background extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploadModal: false,
            uploadForbidden: false
        };
    }

    styleStringEnter = (value, key) => {
        let { homeStore } = this.props;
        homeStore.addStringStyle(value, key);
    }

    showModal = () => {
        this.setState({
            uploadModal: true
        });
    }

    handleCancel = e => {
        this.setState({
            uploadModal: false
        });
    }

    uploadChange = info => {
        const status = info.file.status;
        if (status !== "uploading") {
            console.log(info.file, info.fileList);
        }
        if (status === "done" && info.file.response.code === 0) {
            let response = info.file.response;
            message.success(`${info.file.name} file uploaded successfully.`);
            this.styleStringEnter(`url(${response.data.url})`, "backgroundImage");
            this.setState({
                uploadForbidden: true
            });
        } else if (status === "error") {
            message.error(`${info.file.name} file upload failed.`);
        }
    }

    removeFile = () => {
        this.styleStringEnter("", "backgroundImage");
        return true;
    }

    render() {
        let {style} = this.props;
        const props = {
            name: "files",
            multiple: false,
            action: "//windtour.administration.qa1.tff.com/api/upload",
            listType: "picture"
        };
        return(
            <div >
                <h3>背景</h3>
                <Input.Group style={{ marginBottom: 8 }}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Input.Group compact>
                                <Input size="small" style={{width: "40%"}} value={"size"} readOnly />
                                <Select size="small" style={{width: "60%"}} value={style.backgroundSize} onSelect={value => this.styleStringEnter(value, "backgroundSize")}>
                                    <Option value="cover">cover</Option>
                                    <Option value="auto">auto</Option>
                                    <Option value="contain">contain</Option>
                                </Select>
                            </Input.Group>
                        </Col>
                        <Col span={12}>
                            <Input.Group compact>
                                <Input style={{width: "40%"}} size="small" value={"Image"} readOnly />
                                <Input style={{width: "60%"}} size="small" readOnly onClick={this.showModal} value={filterImageShow(style.backgroundImage)} />
                            </Input.Group>
                        </Col>
                    </Row>
                </Input.Group>
                <Input.Group compact style={{ marginBottom: 16 }}>
                    <Input addonBefore="color" size="small"
                        className={BackgroundStyle.inputRightRaidus}
                        style={{width: "70%"}}
                        value={style.backgroundColor}
                        onChange={e => this.styleStringEnter(e.target.value, "backgroundColor")} />
                    <div style={{height: 24, width: "30%", border: "1px solid #e4e4e4", borderLeftColor: "transparent"}}>
                        <input type="color" value={style.backgroundColor} onChange={e => this.styleStringEnter(e.target.value, "backgroundColor")} style={{width: "100%", border: "none", height: 22}} />
                    </div>
                </Input.Group>
                <Modal
                    title="Image Upload"
                    visible={this.state.uploadModal}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <Dragger {...props} disabled={this.state.uploadForbidden} onChange={info => this.uploadChange(info)} onRemove={this.removeFile} >
                        <p className="ant-upload-drag-icon">
                            <Icon type="inbox" />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
                    </Dragger>
                </Modal>
            </div>
        );
    }
}

export default Background;

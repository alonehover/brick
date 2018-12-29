import { observable, action } from "mobx";

export default class HomeStore {
    @observable brickToolDragging = false;
    @observable brickBuildList = [];
    @observable editBrick = null;
    @observable brickListStyle = {};
    // 悬浮的组件工具条
    @observable toolFixedOpsition = {
        style: {
            position: "fixed",
            top: "-100px",
            left: "-100px"
        },
        brickId: ""
    };

    @action
    changeBrickBuildList(brick) {
        this.brickBuildList.push(brick);
    }

    @action
    replaceBrickBuildList(data) {
        this.brickBuildList = data;
    }

    // 清除拖拽未加入的组件
    @action
    handleLastBrick(id) {
        if(id) {
            this.brickBuildList = this.brickBuildList.filter(item => {
                return !item.newBrick;
            });
            return false;
        }

        this.brickBuildList = this.brickBuildList.map(item => {
            item.newBrick = false;
            item.canDrop = true;
            return item;
        });
    }

    @action
    selectBrick(editKeyInfo, pos) {
        this.editBrick = editKeyInfo;
        this.brickBuildList = this.brickBuildList.map(item => {
            if(item.id === editKeyInfo.id) {
                item.edit = true;
            }else {
                item.edit = false;
            }
            return item;
        });
        this.toolFixedOpsition = {
            brickId: editKeyInfo.id,
            style: {
                ...this.toolFixedOpsition.style,
                top: pos.y + "px",
                left: (pos.x + pos.width + 6) + "px"
            }
        };
    }

    @action
    removeBrick() {
        if(this.toolFixedOpsition.brickId) {
            this.brickBuildList = this.brickBuildList.filter(item => {
                return item.id !== this.toolFixedOpsition.brickId;
            });
            this.toolFixedOpsition = {
                brickId: "",
                style: {
                    ...this.toolFixedOpsition.style,
                    top: "-100px",
                    left: "-100px"
                }
            };
        }
    }

    // Num类型操作
    @action
    addNumStyle(value, key, unit) {
        let editBrick = this.editBrick;
        value ? this.brickListStyle[editBrick.id].style[key] = `${value}${unit}` : delete this.brickListStyle[editBrick.id].style[key];
    }

    // String类型
    @action
    addStringStyle(value, key) {
        let editBrick = this.editBrick;
        this.brickListStyle[editBrick.id].style[key] = value;
    }
    // Array类型操作
    @action
    addArrayParams(value, key) {
        let editBrick = this.editBrick,
            styleArray = this.brickListStyle[editBrick.id][key];
        styleArray.push(value);
    }

    @action
    changeArrayParams(value, key, index) {
        let editBrick = this.editBrick,
            styleArray = this.brickListStyle[editBrick.id][key];
        styleArray[index] = value;
    }

    // 非style
    @action
    addBlockProperty(value, key) {
        let brickListStyle = this.brickListStyle;
        let editBrick = this.editBrick;
        let styleObj = {};
        styleObj[key] = value;
        brickListStyle[editBrick.id] = brickListStyle[editBrick.id] === undefined ? {} : brickListStyle[editBrick.id];
        Object.assign(brickListStyle[editBrick.id], styleObj);
    }

    @action
    initBrickStyle(id, type) {
        let brickListStyle = this.brickListStyle;
        switch(type) {
        case "Image":
            brickListStyle[id] = {
                src: "",
                href: "",
                style: {
                    height: "auto",
                    width: "100%",
                    paddingTop: "0",
                    paddingRight: "0",
                    paddingBottom: "0",
                    paddingLeft: "0",
                    marginTop: "0",
                    marginRight: "0",
                    marginBottom: "0",
                    marginLeft: "0",
                    backGroundColor: "#fff"
                }
            };
            break;
        case "Banner":
            brickListStyle[id] = {
                imgs: [{
                    title: "Banner Ttitle",
                    src: "http://promotion.administration.qa1.tff.com/static_html/common/img/lazy.png",
                    href: "#",
                    appRouter: "/app/home",
                    reactKey: `react_${new Date().valueOf()}`
                }],
                style: {
                }
            };
            break;
        case "MultiBanner":
            brickListStyle[id] = {
                imgs: [{
                    title: "Banner Ttitle",
                    src: "http://promotion.administration.qa1.tff.com/static_html/common/img/lazy.png",
                    href: "#",
                    appRouter: "/app/home",
                    reactKey: `react_${new Date().valueOf()}1`
                }, {
                    title: "Banner Ttitle",
                    src: "http://promotion.administration.qa1.tff.com/static_html/common/img/lazy.png",
                    href: "#",
                    appRouter: "/app/home",
                    reactKey: `react_${new Date().valueOf()}2`
                }],
                style: {
                    height: "auto",
                    width: "100%",
                    backgroundSize: "cover"
                }
            };
            break;
        }
    }
}

import { observable, action } from "mobx";

export default class HomeStore {
    @observable brickToolDragging = false;
    @observable brickBuildList = [];
    @observable editBrick = null;
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
    changeBrickBuildList(data) {
        this.brickBuildList.replace(data);
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
    selectBrick(id, pos) {
        this.editBrick = id;
        this.brickBuildList = this.brickBuildList.map(item => {
            if(item.id === id) {
                item.edit = true;
            }else {
                item.edit = false;
            }
            return item;
        });
        this.toolFixedOpsition = {
            brickId: id,
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
}

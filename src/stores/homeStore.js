import { observable, action } from "mobx";

export default class HomeStore {
    @observable brickToolDragging = false;
    @observable brickBuildList = [];
    @observable editBrick = null;
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
                return !item.dragging;
            });
            return false;
        }

        this.brickBuildList = this.brickBuildList.map(item => {
            item.dragging = false;
            item.canDrop = true;
            return item;
        });
    }

    @action
    hoverBrick(id, pos) {
        this.editBrick = id;
        this.brickBuildList = this.brickBuildList.map(item => {
            if(item.id === id) {
                item.edit = true;
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
    removeBrick(id) {
        console.log("remove", id);
    }
}

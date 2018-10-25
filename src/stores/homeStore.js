import { observable, action } from "mobx";

export default class HomeStore {
    @observable brickToolDragging = false;
    @observable brickBuildList = [];
    @observable editBrick = null;
    @observable toolFixedOpsition = {};

    @action
    changeBrickBuildList(data) {
        this.brickBuildList.replace(data);
    }

    // 清除拖拽未加入的组件
    @action
    handleLastBrick(id) {
        if(id) {
            this.brickBuildList = this.brickBuildList.filter(item => {
                return item.id !== this.brickBuildList.length;
            });
            return false;
        }

        this.brickBuildList = this.brickBuildList.map(item => {
            item.active = false;
            item.canDrop = true;
            return item;
        });
    }

    @action
    hoverBrick(props, pos) {
        console.log("hoverBrick");
        console.log(props, pos);
        this.editBrick = props;
    }
}

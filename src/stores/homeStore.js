import { observable, action } from "mobx";

export default class HomeStore {
    @observable brickToolDragging = false;
    @observable brickBuildList = [];
    @observable editBrick = null;

    @action
    changeBrickBuildList(data) {
        this.brickBuildList.replace(data);
    }

    // 清除拖拽未加入的组件
    @action
    handleLastBrick(type) {
        switch(type) {
        case "delete":
            this.brickBuildList = this.brickBuildList.filter(item => {
                return item.id !== this.brickBuildList.length;
            });
            break;
        case "add":
            this.brickBuildList = this.brickBuildList.map(item => {
                item.active = false;
                item.canDrop = true;
                return item;
            });
            break;
        }
    }

    @action
    setEditBrick(index) {
        this.editBrick = index;
    }
}

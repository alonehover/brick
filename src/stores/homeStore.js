import { observable, action } from "mobx";

export default class HomeStore {
    @observable brickToolDragging = false;
    @observable brickBuildList = [{
        plugin: "Image",
        name: "image1",
        id: 1,
        active: false
    }, {
        plugin: "Image",
        name: "image2",
        id: 2,
        active: false
    }, {
        plugin: "Image",
        name: "image3",
        id: 3,
        active: false
    }];

    @action
    changeBrickBuildListSort(data) {
        this.brickBuildList = data;
    }

    @action
    cancelLastBrick(data) {
        console.log(this.brickBuildList);
        // this.brickToolDragStatus = data;
    }
}

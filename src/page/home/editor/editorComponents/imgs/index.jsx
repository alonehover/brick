import * as React from "react";
import Img from "./img";

import { inject, observer } from "mobx-react";

@inject("homeStore")
@observer
class Imgs extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let {homeStore} = this.props;
        let { editBrick, brickListStyle } = homeStore;
        let imgs = brickListStyle[editBrick.id].imgs;
        return(
            <div className="imgs-area">
                <h3>图片盒子</h3>
                {imgs.map(img => <Img key={img.reactKey} attributes={img} />)}
            </div>
        );
    }
}

export default Imgs;

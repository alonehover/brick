import * as React from "react";
import Img from "./img";

class Imgs extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div className="imgs-area">
                <h3>图片盒子</h3>
                <Img />
            </div>
        );
    }
}

export default Imgs;

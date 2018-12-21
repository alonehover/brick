import * as React from "react";
import { observer } from "mobx-react";

@observer
class Image extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { homeStore, id } = this.props;
        const {src, style} = homeStore.brickListStyle[id];
        return (
            <div className="block-image">
                <img src={src} style={{...style}} alt="Image" />
            </div>
        );
    }
}

export default Image;

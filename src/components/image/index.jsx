import * as React from "react";
import { observer } from "mobx-react";

@observer
class Image extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { homeStore, id } = this.props;
        const {imgs, style} = homeStore.brickListStyle[id];
        return (
            <div className="block-image" style={{...style}}>
                <img src={imgs[0].src}  alt="Image" />
            </div>
        );
    }
}

export default Image;

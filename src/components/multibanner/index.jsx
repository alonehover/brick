import * as React from "react";
import { observer } from "mobx-react";

import MultiBannerStyle from "./multibanner.less";

@observer
class MultiBanner extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { homeStore, id } = this.props;
        const { imgs, style } = homeStore.brickListStyle[id];
        return (
            <div className={MultiBannerStyle.multiBanner} style={{...style}}>
                <ul>
                    {imgs.map(img => {
                        return (<li key={img.reactKey}>
                            <a href={img.href}>
                                <img src={img.src} />
                            </a>
                        </li>);
                    })}
                </ul>
            </div>
        );
    }
}

export default MultiBanner;

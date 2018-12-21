import * as React from "react";
import BannerStyle from "./banner.less";
import { observer } from "mobx-react";

@observer
class Banner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clickDown: false,
            startX: 0,
            startY: 0,
            preX: 0,
            preY: 0,
            endX: 0,
            endY: 0,
            outEndlock: false, // mouseend和out事件会在某些情况下同时触发，加把锁只让他们触发一次
            currentIndex: 0, // 从0开始计数
            preDate: new Date()
        };
    }

    touchStart = event => {
        event.preventDefault();
        this.setState({
            clickDown: true,
            startX: event.pageX,
            startY: event.pageY,
            preX: event.pageX,
            preY: event.pageY
        });
    }

    touchMove = event => {
        event.preventDefault();
        let {clickDown, preX, preY, preDate} = this.state;
        let now = new Date();
        if(clickDown) {
            let BannerDom = this.refs.Banner,
                moveX = preX - event.pageX,
                moveY = preY - event.pageY,
                translate3d = BannerDom.style.transform;
            if(Math.abs(moveX) > Math.abs(moveY)) {
                let translateX = parseInt(translate3d.match(/\(([\s|\S]*)\)/)[1].split(",")[0]) - moveX;
                BannerDom.style.transform = `translate3d(${translateX}px, 0, 0)`;
                BannerDom.style.webkitTransform = `translate3d(${translateX}px, 0, 0)`;
                BannerDom.style.transitionDuration = "0ms";
                preDate = now;
                this.setState({
                    translateX,
                    preDate,
                    preX: event.pageX,
                    preY: event.pageY
                });
            }
        }
    }

    touchEnd = event => {
        let {clickDown} = this.state,
            { homeStore, id } = this.props,
            pageNum = homeStore.brickListStyle[id].srcs.length;
        if(clickDown) {
            let {startX, currentIndex} = this.state,
                endX = event.pageX,
                BannerDom = this.refs.Banner,
                BannerDomParent = BannerDom.parentNode,
                offsetWidth = BannerDomParent.offsetWidth,
                sliderElasticity = BannerDomParent.offsetWidth * 0.1;
            let moveAll = startX - endX;
            if(moveAll > 0 && Math.abs(moveAll) >= sliderElasticity) {
                currentIndex = currentIndex + 1 >= pageNum ? currentIndex : currentIndex + 1;
            }
            if(moveAll < 0 && Math.abs(moveAll) >= sliderElasticity) {
                currentIndex = currentIndex - 1 < 0 ? 0 : currentIndex - 1;
            }
            BannerDom.style.transform = `translate3d(${ -offsetWidth * currentIndex}px, 0, 0)`;
            BannerDom.style.webkitTransform = `translate3d(${ -offsetWidth * currentIndex}px, 0, 0)`;
            BannerDom.style.transitionDuration = "300ms";
            BannerDom.style.webkitTransitionDuration = "300ms";
            this.setState({
                endX,
                currentIndex,
                clickDown: false,
                outEndlock: true
            });
        }
    }

    touchOut = event => {
        this.touchEnd(event);
    }

    transitionEnd = () => {
        let BannerDom = this.refs.Banner;
        BannerDom.style.transitionDuration = "0ms";
        BannerDom.style.webkitTransitionDuration = "0ms";
    }

    render() {
        let { homeStore, id } = this.props;
        let { srcs, style } = homeStore.brickListStyle[id];
        return(
            <ul className={BannerStyle.banner}
                style={{transform: "translate3d(0px, 0px, 0px)", width: srcs.length * 100 + "%", ...style}}
                onMouseDown={e => this.touchStart(e)}
                onMouseMove={e => this.touchMove(e)}
                onMouseUp={e => this.touchEnd(e)}
                onMouseOut={e => this.touchOut(e)}
                onTransitionEnd={() => this.transitionEnd()}
                ref="Banner" >
                {
                    srcs.map((src, index) => {
                        return (<li key={id + "_" + index} style={{width: 100 / srcs.length + "%"}}>
                            <img src={src} />
                        </li>);
                    })
                }
            </ul>
        );
    }
}

export default Banner;

import * as React from "react";
import { observer } from "mobx-react";

import ProductLStyle from "./productl.less";

@observer
class ProductL extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { homeStore, id } = this.props;
        const { products, style } = homeStore.brickListStyle[id];
        return (
            <div className={ProductLStyle.prdoctl} style={{...style}}>
                <ul>
                    {products.map(product =>
                        <li key={product.reactKey}>
                            <a className={ProductLStyle.product} href="#">
                                <div className={ProductLStyle.productBanner}>
                                    <img className={ProductLStyle.productBannerImg} src={product.src || "http://promotion.administration.qa1.tff.com/static_html/common/img/lazy.png"} />
                                </div>
                                <div className={ProductLStyle.productInfo}>
                                    <h4 className={ProductLStyle.productTitle} >{product.title || "这里是标题"}</h4>
                                    <div className={ProductLStyle.productPrice}>
                                        <div className={ProductLStyle.price}>
                                            {product.originPrice ? <div className={ProductLStyle.originPrice}>{product.originPrice}</div> : null}
                                            <div className={ProductLStyle.currentPrice}>
                                                <span>{product.currentPrice || "0.0"}</span>起
                                            </div>
                                        </div>
                                        <div className={ProductLStyle.bookingBtn}>
                                            立即<br />预订
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </li>
                    )}
                </ul>
            </div>
        );
    }
}

export default ProductL;

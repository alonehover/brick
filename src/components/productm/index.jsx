import * as React from "react";
import { observer } from "mobx-react";

import ProductMStyle from "./productm.less";

@observer
class ProductM extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { homeStore, id } = this.props;
        const { products, style } = homeStore.brickListStyle[id];
        return (
            <div className={ProductMStyle.prdoctm} style={{...style}}>
                <ul>
                    {products.map(product =>
                        <li key={product.reactKey}>
                            <a className={ProductMStyle.product} href="#">
                                <div className={ProductMStyle.productBanner}>
                                    <img className={ProductMStyle.productBannerImg} src={product.src || "http://promotion.administration.qa1.tff.com/static_html/common/img/lazy.png"} />
                                </div>
                                <div className={ProductMStyle.productInfo}>
                                    <h4 className={ProductMStyle.productTitle} >{product.title || "这里是标题"}</h4>
                                    <div className={ProductMStyle.productPrice}>
                                        {product.originPrice ? <div className={ProductMStyle.originPrice}>{product.originPrice}</div> : null}
                                        <div className={ProductMStyle.currentPrice}>
                                            <span>{product.currentPrice || "0.0"}</span>起
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

export default ProductM;

import React from "react";
import PropTypes from "prop-types";

export default class Square extends React.PureComponent {
    render() {
        const { black, children } = this.props;
        const fill = black ? "black" : "white";
        const stroke = black ? "white" : "black";

        return (
            <div
                style={{
                    backgroundColor: fill,
                    color: stroke,
                    width: "100%",
                    height: "100%"
                }}
            >
                {children}
            </div>
        );
    }
}

Square.propTypes = {
    black: PropTypes.bool,
    children: PropTypes.node
};

Square.defaultProps = {
    black: true,
    children: null
};

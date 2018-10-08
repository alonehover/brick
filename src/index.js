import React from "react";
import ReactDOM from "react-dom";

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>Home</div>
        );
    }
}

ReactDOM.render(<Home />, document.getElementById("app"));

// export default Home;
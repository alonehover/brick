import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch,
} from "react-router-dom";

import routes from "./router";

export default class AppRouter extends Component {
    constructor() {
        super();

        this.state = {};
    }

    render() {
        return (
            <Router>
                <Switch>
                    {
                        routes.map(route => (
                            <Route
                                exact={route.exact}
                                path={route.path}
                                key={route.id}
                                component={route.component}
                            />
                        ))
                    }
                    <Redirect from="*" to="/" />
                </Switch>
            </Router>
        );
    }
}

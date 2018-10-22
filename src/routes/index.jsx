import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
} from "react-router-dom";
import { Provider } from "mobx-react";
import DevTools from "mobx-react-devtools";

import * as Store from "../stores";
import routes from "./router";

export default class AppRouter extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <Provider {...Store.default}>
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
                </Provider>
                <DevTools />
            </div>
        );
    }
}

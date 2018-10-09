import React, { Component } from "react";
import { Layout } from 'antd';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
} from "react-router-dom";

import routes from "./router";

const { Content } = Layout;

export default class AppRouter extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <Layout>
                <Content>
                    <Router>
                        <Switch>
                            {routes.map((route, k) => {
                                // if(route.login && !this.state.user) {
                                //     return <Redirect from={route.path} to={`/sign?path=${route.path}`} key={k}/>
                                // }
                                
                                return (<Route exact={route.exact} path={route.path} key={k} component={route.component}/>)
                            })}

                            <Redirect from='*' to='/' />
                        </Switch>
                    </Router>
                </Content>
            </Layout>
        )
    }
}
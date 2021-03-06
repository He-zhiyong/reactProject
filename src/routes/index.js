import React from "react";
import { createHashHistory } from 'history'
import { Router, Route, useRouterHistory} from 'react-router'
import Home from '../pages/home';
import Login from '../pages/login';
import Register from '../pages/register';

const appHistory = useRouterHistory(createHashHistory)({queryKey:false});//去除地址末尾key的hash值

export default class Routes extends React.Component {
    render() {
        return (
            <Router history = {appHistory} >
                <Route path ="/" component={Home} />
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
            </Router>
        )
    }
}
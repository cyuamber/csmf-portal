import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';

import Layout from './components/Layout/Layoutframe';
import Homepage from './pages/Homepage/Homepage';
import Dashboard from './pages/Dashboard/Dashboard';
import Orderconfirm from './pages/Orderconfirm/Orderconfirm';
import Ordermanage from './pages/Ordermanage/Ordermanage';
import Ordermonitor from './pages/Ordermonitor/Ordermonitor';

import './index.css';

ReactDOM.render(
    <Router>
        <Route path="/" exact component={Homepage} />
        <Route path="/dashboard" >
            <Layout>
                <Dashboard />
            </Layout>
        </Route>
        <Route path="/orderconfirm" >
            <Layout>
                <Orderconfirm />
            </Layout>
        </Route>
        <Route path="/ordermanage" >
            <Layout>
                <Ordermanage />
            </Layout>
        </Route>
        <Route exact path="/ordermonitor" >
            <Layout>
                <Ordermonitor />
            </Layout>
        </Route>
        <Route path="/ordermonitor/detail" >
            <Layout>
                <Dashboard />
            </Layout>
        </Route>
    </Router>
    , document.getElementById('root'));

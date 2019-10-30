import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import rootReducer from './reducers';
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';

import Layout from './components/Layout/Layoutframe';
import Homepage from './pages/Homepage/Homepage';
import Dashboard from './pages/Dashboard/Dashboard';
import Orderconfirm from './pages/Orderconfirm/Orderconfirm';
import Ordermanage from './pages/Ordermanage/Ordermanage';
import Ordermonitor from './pages/Ordermonitor/Ordermonitor';

import './index.css';
import './i18n';

const storeFactory = (initialState) => {
    return (rootReducer) => {
        const store = createStore(rootReducer, initialState, compose(
            window.devToolsExtension ? window.devToolsExtension() : f => f
        ));
        return store;
    };
}

const store = storeFactory()(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        <Router>

            <Route path="/" exact >
                <Layout>
                    <Homepage />
                </Layout>
                <Redirect exact from="/" to="/home" />
            </Route>
            <Route path="/home" exact >
                <Layout>
                    <Homepage />
                </Layout>
            </Route>
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
    </Provider>
    , document.getElementById('root'));

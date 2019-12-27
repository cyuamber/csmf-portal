import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import Axios from 'axios';
import enUS from 'antd/es/locale/en_US';
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';
import { getCurrentLng } from 'utils/util';

import Layout from './components/Layout/Layoutframe';
import Login from './pages/Login/Log';
import Homepage from './pages/Homepage/Homepage';
import BusinessOrder from './pages/BusinessOrder/BusinessOrder';
import BusinessOrderDetail from './pages/BusinessOrder/BusinessOrderDetail';

import Orderconfirm from './pages/OrderManagement/OrderManagement';
import Ordermanage from './pages/BusinessManagement/BusinessManagement';
import BusinessMonitor from './pages/BusinessMonitor/BusinessMonitor';

import './index.css';
import './i18n';

const storeFactory = (initialState) => {
    return (rootReducer) => {
        const store = createStore(rootReducer, initialState, compose(
            applyMiddleware(thunk),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        ));
        return store;
    };
}
const store = storeFactory()(rootReducer);
let storageLng = getCurrentLng();
const locale = storageLng === 'en' ? enUS : zhCN;
if (process.env.NODE_ENV === "production") {
    Axios.defaults.baseURL = 'http://192.168.235.66:8083/';
}
ReactDOM.render(
    <Provider store={store}>
        <ConfigProvider locale={locale}>
            <Router>
                <Route path="/login" exact >
                    <Layout>
                        <Login />
                    </Layout>
                </Route>
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
                <Route exact path="/businessorder" >
                    <Layout>
                        <BusinessOrder />
                    </Layout>
                </Route>
                <Route path="/businessorder/detail" >
                    <Layout>
                        <BusinessOrderDetail />
                    </Layout>
                </Route>
                <Route path="/ordermgt" >
                    <Layout>
                        <Orderconfirm />
                    </Layout>
                </Route>
                <Route path="/businessmgt" >
                    <Layout>
                        <Ordermanage />
                    </Layout>
                </Route>
                <Route exact path="/businessmonitor" >
                    <Layout>
                        <BusinessMonitor />
                    </Layout>
                </Route>
                <Route path="/businessmonitor/detail" >
                    <Layout>
                        <BusinessOrder />
                    </Layout>
                </Route>
            </Router>
        </ConfigProvider>
    </Provider>
    , document.getElementById('root')
);

document.getElementById("root").style.display = "block";
document.getElementById("appLoading").style.display = "none";

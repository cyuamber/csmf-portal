import { combineReducers } from 'redux';

import businessmonitor from './pages/BusinessMonitor/reducer'
import businessorder from './pages/BusinessOrder/reducer'
import ordermgt from './pages/OrderManagement/reducer'


export default combineReducers({
    businessmonitor,
    businessorder,
    ordermgt
})
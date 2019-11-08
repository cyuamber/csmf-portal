import { combineReducers } from 'redux';

import businessmonitor from './pages/BusinessMonitor/reducer'
import businessorder from './pages/BusinessOrder/reducer'
import ordermgt from './pages/OrderManagement/reducer'
import businessmgt from './pages/BusinessManagement/reducer'


export default combineReducers({
    businessmonitor,
    businessorder,
    ordermgt,
    businessmgt
})
import moment from 'moment';
import { axiosget } from '../../utils/http';
import APIS from '../../constant/apis';

export const actions = dispatch => {
    return {
        changeTableLoading(bool = false) {
            dispatch({ type: 'CHANGE_TABLE_LOADING', bool });
        },
        getTableData({ status = 'all', pageNo = 1, pageSize = 10 } = {}) {
            dispatch({ type: 'CHANGE_TABLE_LOADING', bool: true });
            const reqBody = { status, pageNo, pageSize };
            // APIS.getOrdersApi(reqBody)
            // APIS.getOrders
            axiosget(APIS.getOrdersApi(reqBody)).then(res => {
                
                let { result_body: {record_number, slicing_order_list}, result_header: { result_code } } = res;
                if (result_code === '200') {
                    let tableData = slicing_order_list.map((item, index) => {
                        item.index = (pageNo - 1) * pageSize + index + 1;
                        item.order_creation_time = moment(item.order_creation_time*1).format('YYYY-MM-DD');
                        return item;
                    })
                    dispatch({ type: 'GET_TABLE_DATA', tableData, bool: false, total: record_number*1, pageSize, pageNo });
                }
            })
        }
    }
}
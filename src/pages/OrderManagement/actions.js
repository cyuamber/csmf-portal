import moment from 'moment';
import { axiosget } from '../../utils/http';
import APIS from '../../constant/apis';
import { message } from 'antd';

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
                const { result_body, result_header: { result_code, result_message } } = res;
                if (result_code === '200') {
                    const { record_number, slicing_order_list } = result_body;
                    let tableData = slicing_order_list.map((item, index) => {
                        item.index = (pageNo - 1) * pageSize + index + 1;
                        item.order_creation_time = moment(item.order_creation_time * 1).format('YYYY-MM-DD hh:mm:ss');
                        return item;
                    })
                    dispatch({ type: 'GET_TABLE_DATA', tableData, bool: false, total: record_number * 1, pageSize, pageNo });
                } else {
                    message.error(result_message, 1);
                    dispatch({ type: 'CHANGE_TABLE_LOADING' });
                }
            }, ({ message: error }) => {
                message.error(error, 1);
                dispatch({ type: 'CHANGE_TABLE_LOADING' });
            })
        }
    }
}
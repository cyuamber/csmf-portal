import { axiosget } from '../../utils/http'
import APIS from '../../constant/apis'

export const actions = dispatch => {
    return {
        changeTableLoading(bool = false) {
            dispatch({ type: 'CHANGE_TABLE_LOADING', bool })
        },
        getTableData({ status = 'all', pageNo = 1, pageSize = 10 } = {}) {
            dispatch({ type: 'CHANGE_TABLE_LOADING', bool: true })
            const reqBody = { status, pageNo, pageSize }
            
            // APIS.getOrdersApi(reqBody)
            axiosget(APIS.getOrders).then(res => {
                let { result_body: {record_number, slicing_order_list}, result_header: { result_code } } = res
                if (result_code === '200') {
                    let tableData = slicing_order_list.map((item, index) => {
                        item.index = (pageNo - 1) * pageSize + index + 1
                        return item
                    })
                    dispatch({ type: 'GET_TABLE_DATA', tableData, bool: false, total: record_number*1, pageSize, pageNo })
                }
            })
        }
    }
}
import { axiosget } from '../../utils/http'
import APIS from '../../constant/apis'

const setTableData = (tableData, total) => ({ type: 'GET_TABLE_DATA', tableData, bool: false, total })

export const actions = dispatch => {
    return {
        changeTableLoading(bool = false) {
            dispatch({ type: 'CHANGE_TABLE_LOADING', bool })
        },
        getTableData({ status, pageNum, pageSize } = {}) {
            dispatch({ type: 'CHANGE_TABLE_LOADING', bool: true })
            let resBody = {
                status: status || 'all',
                pageNo: pageNum || 1,
                pageSize: pageSize || 10 
            }
            
            // APIS.getOrdersApi(resBody)
            axiosget(APIS.getOrders).then(res => {
                let { result_body, result_header: { result_code } } = res
                if (result_code === '200') {
                    let tableData = result_body.map((item, index) => {
                        item.index = pageNum ? (pageNum - 1) * pageSize + index + 1 : index + 1
                        return item
                    })
                    dispatch(setTableData(tableData, res.total))
                }
            })
        }
    }
}
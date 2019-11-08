import { axiosget } from '../../utils/http'
import APIS from '../../constant/apis'

const setTableData = (tableData, total) => ({ type: 'GET_TABLE_DATA', tableData, bool: false, total })

export const actions = dispatch => {
    return {
        changeTableLoading(bool = false) {
            dispatch({ type: 'CHANGE_TABLE_LOADING', bool })
        },
        getTableData({ status, pageNum, pageSize } = {}) {
            // let userId = window.localStorage.getItem('username')
            // axiosget(APIS.getOrders(userId)).then(res => {
            //     if(res.result_header.result.code === '200'){
            //         console.log(res.result_body)
            //     }
            // })
            // 模拟
            let resBody = {}
            if (status) resBody.status = status
            if (pageNum) resBody.pageNum = pageNum
            if (pageSize) resBody.pageSize = pageSize
            axiosget(APIS.getOrders, resBody).then(res => {
                let { result_body, result_header: { result_code } } = res
                if (result_code === '200') {
                    let tableData = result_body.map((item, index) => {
                        item.index = pageNum ? (pageNum - 1) * pageSize + index + 1 : index + 1
                        return item
                    })
                    dispatch(setTableData(tableData, res.total))
                }
            })
        },
        showModal(bool = false) {
            dispatch({ type: 'SHOW_MODAL', bool })
        },
        getOrderDetail(orderId) {
            // let userId = window.localStorage.getItem('username')
            // axiosget(APIS.getOrderDetail(orderId,userId)).then(res => {})
            axiosget(APIS.getOrderDetail).then(res => {
                let { result_body, result_header: { result_code } } = res
                if (result_code === '200') {
                    dispatch({ type: 'GET_ORDER_DETAIL', data: result_body, bool: true })
                }
            })
        },
    }
}
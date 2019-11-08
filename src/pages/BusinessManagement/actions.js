import { axiosget } from '../../utils/http'
import APIS from '../../constant/apis'

const setTableData = (tableData, total) => ({ type: 'GET_BUSINESS_TABLE', tableData, bool: false, total })

export const actions = dispatch => {
    return {
        changeTableLoading(bool = false) {
            dispatch({ type: 'SET_TABLE_LOADING', bool })
        },
        getTableData({ status, pageNum, pageSize } = {}) {
            let resBody = {}
            if (status) resBody.status = status
            if (pageNum) resBody.pageNum = pageNum
            if (pageSize) resBody.pageSize = pageSize
            axiosget(APIS.getBusinessList, resBody).then(res => {
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
        getParams({ status, pageNum, pageSize }) {
            if (status) dispatch({ type: 'GET_STATUS', status })
            else dispatch({ type: 'GET_PAGE', pageNum, pageSize })
        }
    }
}
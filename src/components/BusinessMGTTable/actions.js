import { axiosget } from '../../utils/http'
import APIS from '../../constant/apis'

const changeLoading = bool => ({type: 'CHANGE_LOADING', bool})

export const actions = dispatch => {
    return {
        getTableData (params, cb) {
            dispatch(changeLoading(true))
            const url = typeof params === 'string' ? APIS.getOrderDetail : APIS.getBusinessList
            // APIS.getOrderServiceApi(params)
            axiosget(url).then( res => {
                const {result_body: {record_number, slicing_service_list}, result_header: {result_code}} = res
                if(result_code === '200'){
                    let tableData = null
                    tableData = slicing_service_list.map((item, index) => {
                        if (typeof params === 'object') {
                            const { pageNo, pageSize } = params
                            item.index = pageNo ? (pageNo-1)*pageSize + index+1 : index+1
                        }
                        item.activation = item.service_status === 'activated'? true : false
                        return item
                    })
                    if (typeof params === 'object') {
                        const { pageNo, pageSize } = params
                        dispatch({type: 'SET_TABLE_LIST', total:record_number*1, pageNo, pageSize, data: tableData, bool: false})
                        cb && typeof cb === 'function' && cb()
                    } else {
                        dispatch({type: 'SET_TABLE_DATA', data: tableData, bool: false})
                    }

                }
            })
        },
        changeLoading (bool) {
            dispatch(changeLoading(bool))
        },
        getStatusLoading (serviceId, bool, operation) {
            dispatch({type: 'SET_STATUS_LOADING', serviceId, bool, operation})
        },
        getProgress (index, progress) {
            dispatch({type: 'UPDATA_PROGRESS',index, progress})
        }
    }
}
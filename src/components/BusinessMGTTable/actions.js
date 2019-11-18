import { axiosget, axiosdelete } from '../../utils/http'
import APIS from '../../constant/apis'

const changeLoading = bool => ({type: 'CHANGE_LOADING', bool})

export const actions = dispatch => {
    return {
        getTableData (params, cb) {
            dispatch(changeLoading(true))
            // 判断获取单条数据还是列表数据的接口
            // const url = typeof params === 'string' ? APIS.getOrderDetailApi(params) : APIS.getBusinessListApi(params)
            const url = typeof params === 'string' ? APIS.getOrderDetail : APIS.getBusinessList
            axiosget(url).then( res => {
                const {result_body, result_header: {result_code}} = res
                if(result_code === '200'){
                    let tableData = null
                    if(typeof params === 'object'){
                        const { pageNo, pageSize } = params
                        tableData = result_body.map((item, index) => {
                            item.index = pageNo ? (pageNo-1)*pageSize + index+1 : index+1
                            item.activation = /* item.checked=  */item.service_status === 'normal'? true : false
                            // item.loading = false
                            return item
                        })
                        dispatch({type: 'SET_TOTAL', total:res.total, page_no: pageNo, page_size: pageSize})
                        cb && typeof cb === 'function' && cb()
                    }else tableData = result_body

                    dispatch({type: 'SET_TABLE_DATA', data: tableData, bool: false})
                }
            })
        },
        changeLoading (bool) {
            dispatch(changeLoading(bool))
        }
        // getStatusLoading (serviceId, bool) {
        //     dispatch({type: 'SET_STATUS_LOADING', serviceId, bool})
        // }
    }
}
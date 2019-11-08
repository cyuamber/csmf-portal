import { axiosget, axiosdelete } from '../../utils/http'
import APIS from '../../constant/apis'

const changeLoading = bool => ({type: 'CHANGE_LOADING', bool})

export const actions = dispatch => {
    return {
        getTableData (params = {}) {
            dispatch(changeLoading(true))
            const userId = window.localStorage.getItem('username')
            // const url = typeof params === 'string' ? APIS.getOrderDetail(userId, params) : APIS.getBusinessList(userId)
            const url = typeof params === 'string' ? APIS.getOrderDetail : APIS.getBusinessList
            const resBody = {}
            if(typeof params === 'object'){
                const { status, page_no, page_size } = params
                if ( status ) resBody.service_status = status
                if ( page_no ) {
                    resBody.page_no = page_no  
                    resBody.page_size = page_size
                }  
            }
            axiosget(url, resBody).then( res => {
                const {result_body, result_header: {result_code}} = res
                if(result_code === '200'){
                    let tableData = null
                    if(typeof params === 'object'){
                        tableData = result_body.map((item, index) => {
                            const { page_no, page_size } = params
                            item.index = page_no ? (page_no-1)*page_size + index+1 : index+1
                            return item
                        })
                        dispatch({type: 'SET_TOTAL', total:res.total})
                    }else tableData = result_body
                    dispatch({type: 'SET_TABLE_DATA', data: tableData, bool: false})
                }
            })
        },
        getPages (pageNum, pageSize) {
            dispatch ({type: 'GET_PAGE', pageNum, pageSize})
        }
    }
}
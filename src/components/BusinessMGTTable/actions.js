import { axiosget } from '../../utils/http';
import APIS from '../../constant/apis';
import { message } from 'antd';

const changeLoading = bool => ({ type: 'CHANGE_LOADING', bool });

export const actions = dispatch => {
    return {
        getTableData(params, cb) {
            return new Promise((resolve) => {
                dispatch(changeLoading(true));
                axiosget(APIS.getOrderServiceApi(params)).then(res => {
                    const { result_body: { record_number, slicing_service_list }, result_header: { result_code, result_message } } = res;
                    if (+result_code !== 200 && slicing_service_list.length === 0) {
                        message.error(result_message || 'System error');
                        dispatch(changeLoading(false));
                    } else {
                        const tableData = slicing_service_list.map((item, index) => {
                            if (typeof params === 'object') {
                                const { pageNo, pageSize } = params;
                                item.index = pageNo ? (pageNo - 1) * pageSize + index + 1 : index + 1;
                            }
                            item.activation = item.service_status === 'activated' ? true : false;
                            // 判断是否成功创建，若未成功创建所有操作不可用
                            if (item.last_operation_type === "create" && item.last_operation_process !== 100) {
                                item.disabled = true;
                                item.progress = 100;
                            }
                            // 判断是否有操作正在执行中
                            else if (item.last_operation_type && item.last_operation_process !== 100) {
                                item.loading = true;
                                item.progress = item.last_operation_process;
                                item.operation = item.last_operation_type;;
                            }
                            // 若无操作执行中，不显示progress
                            else {
                                item.progress = 100;
                            }
                            return item;
                        })
                        if (typeof params === 'object') {
                            const { pageNo, pageSize } = params;
                            dispatch({ type: 'SET_TABLE_LIST', total: record_number * 1, pageNo, pageSize, data: tableData, bool: false });
                            cb && typeof cb === 'function' && cb();
                        } else {
                            dispatch({ type: 'SET_TABLE_DATA', data: tableData, bool: false });
                        }
                        resolve(tableData);
                    }
                }, error => {
                    message.error(error.message)
                    dispatch(changeLoading(false));
                })
            })
        },
        changeLoading(bool) {
            dispatch(changeLoading(bool));
        },
        getStatusLoading(serviceId, bool, operation) {
            dispatch({ type: 'SET_STATUS_LOADING', serviceId, bool, operation });
        },
        getProgress(index, progress) {
            dispatch({ type: 'UPDATA_PROGRESS', index, progress });
        }
    }
}
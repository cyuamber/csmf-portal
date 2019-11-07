export const actions = (dispatch) => {
    return {
        changeTable: (data = {}, bool = true) => {
            dispatch({ type: 'GET_BASIC_DATA', data, bool })
        },
        tableLoading: (bool = false) => {
            dispatch({ type: 'TABLE_LOADING', bool })
        },
        fetchBandwidthData: (data = {}) => {
            dispatch({ type: 'FETCH_BANDWIDTH_DATA', data })
        }
    }
}
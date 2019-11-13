export const actions = (dispatch) => {
    return {
        // changeTable: (data = {}, bool = true) => {
        //     dispatch({ type: 'GET_BASIC_DATA', data, bool })
        // },
        // tableLoading: (bool = false) => {
        //     dispatch({ type: 'TABLE_LOADING', bool })
        // },
        setTrafficData: (data = {}) => {
            dispatch({ type: 'SET_TRAFFIC_DATA', data })
        },
        setOnlineusersData: (data = {}) => {
            dispatch({ type: 'SET_ONLINEUSERS_DATA', data })
        },
        setBandwidthData: (data = {}) => {
            dispatch({ type: 'SET_BANDWIDTH_DATA', data })
        }
    }
}
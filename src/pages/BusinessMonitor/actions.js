export const actions = dispatch => {
    return {
        setTrafficData: (data = {}, loading = true) => {
            dispatch({ type: 'SET_TRAFFIC_DATA', data, loading });
        },
        setOnlineusersData: (data = {}, loading = false) => {
            dispatch({ type: 'SET_ONLINEUSERS_DATA', data, loading });
        },
        setBandwidthData: (data = {}, loading = false) => {
            dispatch({ type: 'SET_BANDWIDTH_DATA', data, loading });
        }
    }
}
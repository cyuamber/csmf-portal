export const actions = dispatch => {
    return {
        setTrafficData: (data = {}) => {
            dispatch({ type: 'SET_TRAFFIC_DATA', data });
        },
        setOnlineusersData: (data = {}) => {
            dispatch({ type: 'SET_ONLINEUSERS_DATA', data });
        },
        setBandwidthData: (data = {}) => {
            dispatch({ type: 'SET_BANDWIDTH_DATA', data });
        }
    }
}
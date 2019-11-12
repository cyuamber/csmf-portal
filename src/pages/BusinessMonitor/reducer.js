import I from 'immutable';

const initialState = I.fromJS({
    toolbar: {
        loading: false
    },
    table: {
        data: [],
        loading: false,
    },
    traffic: {
        data: []
    },
    onlineusers: {
        data: []
    },
    bandwidth: {
        data: []
    },
    tableData: {
        data: [],
    },
    page_size: 10
});

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_BASIC_DATA':
            return state
                .setIn(['table', 'loading'], action.bool)
                .setIn(['table', 'data'], I.fromJS(action.data))
        case 'TABLE_LOADING':
            return state
                .setIn(['table', 'loading'], action.bool)
        case 'SET_TRAFFIC_DATA':
            return state
                .setIn(['traffic', 'data'], I.fromJS(action.data))
        case 'SET_ONLINEUSERS_DATA':
            return state
                .setIn(['onlineusers', 'data'], I.fromJS(action.data))
        case 'SET_BANDWIDTH_DATA':
            return state
                .setIn(['bandwidth', 'data'], I.fromJS(action.data))
        case 'SET_TOTAL': 
            return state
                    .setIn(['page_size'], action.page_size)
        case 'SET_TABLE_DATA':
            return state
                    .setIn(['tableData', 'data'], I.fromJS(action.data))
        default:
            return state;
    }
}

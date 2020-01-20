import I from 'immutable';

const initialState = I.fromJS({
    toolbar: {
        loading: false
    },
    traffic: {
        data: [],
        loading: true,
    },
    onlineusers: {
        data: [],
        loading: true,
    },
    bandwidth: {
        data: [],
        loading: true,
    },
    tableData: {
        data: [],
    },
    page_size: 10
});

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_TRAFFIC_DATA':
            return state
                .setIn(['traffic', 'data'], I.fromJS(action.data))
                .setIn(['traffic', 'loading'], I.fromJS(action.loading));
        case 'SET_ONLINEUSERS_DATA':
            return state
                .setIn(['onlineusers', 'data'], I.fromJS(action.data))
                .setIn(['onlineusers', 'loading'], I.fromJS(action.loading));
        case 'SET_BANDWIDTH_DATA':
            return state
                .setIn(['bandwidth', 'data'], I.fromJS(action.data))
                .setIn(['bandwidth', 'loading'], I.fromJS(action.loading));
        case 'SET_TOTAL':
            return state
                .setIn(['page_size'], action.page_size);
        case 'SET_TABLE_LIST':
            return state
                .setIn(['tableData', 'data'], I.fromJS(action.data));
        default:
            return state;
    }
}

import I from 'immutable'

const initState = I.fromJS({
    tableData: {
        loading: false,
        data: []
    },
    status: 'all',
    pageNum: 1,
    pageSize: 10
})

export default function reducer (state = initState, action) {
    switch (action.type) {
        case 'SET_TABLE_LOADING': 
            return state.setIn(['tableData','loading'], action.bool)
        case 'GET_BUSINESS_TABLE':
            return state    
                    .setIn(['tableData','data'], I.fromJS(action.tableData))    
                    .setIn(['tableData','loading'], action.bool)
                    .setIn(['tableData', 'total'], action.total)  
        case 'GET_STATUS':
            return state.setIn(['status'], action.status)
        case 'GET_PAGE':
            return state
                    .setIn(['pageNum'], action.pageNum)
                    .setIn(['pageSize'], action.pageSize)
        default:
            return state;
    }
}
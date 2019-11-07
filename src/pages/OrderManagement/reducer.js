import I from 'immutable'

const initData = I.fromJS({
    tableData: {
        loading: false,
        data: [],
        total: 0
    },
    showModal: false,
    orderDetail: []
})

export default function reducer(state = initData, action){
    switch (action.type){
        case 'GET_TABLE_DATA':
            return state
                    .setIn(['tableData','data'], I.fromJS(action.tableData))    
                    .setIn(['tableData','loading'], action.bool)
                    .setIn(['tableData', 'total'], action.total)
        case 'CHANGE_TABLE_LOADING': 
            return state.setIn(['tableData','loading'], action.bool)
        case 'SHOW_MODAL':
            return state.setIn(['showModal'], action.bool)
        case 'GET_ORDER_DETAIL':
            return state
                    .setIn(['orderDetail'], I.fromJS(action.data))
                    .setIn(['showModal'], action.bool)

        default:
            return state
    }
}
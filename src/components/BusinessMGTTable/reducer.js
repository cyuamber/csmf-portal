import I from 'immutable'

const initData = I.fromJS({
    tableData: {
        loading: false,
        data: [],
        total: 0
    },
    page_no: 1,
    page_size: 10
})

export default function reducer(state = initData, action){
    switch (action.type) {
        case 'CHANGE_LOADING':
            return state
                    .setIn(['tableData', 'loading'], action.bool)
                    .setIn(['tableData', 'data'], I.fromJS([]))
        case 'SET_TOTAL': 
            return state.setIn(['tableData', 'total'], action.total)
        case 'SET_TABLE_DATA':
            return state
                    .setIn(['tableData', 'data'], I.fromJS(action.data))
                    .setIn(['tableData', 'loading'], action.bool)
        case 'GET_PAGE':
            return state
                    .setIn(['pageNum'], action.pageNum)
                    .setIn(['pageSize'], action.pageSize)
        default: 
            return state
    }
}
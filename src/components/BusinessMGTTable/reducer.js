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
            return state
                    .setIn(['tableData', 'total'], action.total)
                    .setIn(['page_no'], action.page_no)
                    .setIn(['page_size'], action.page_size)
        case 'SET_TABLE_DATA':
            return state
                    .setIn(['tableData', 'data'], I.fromJS(action.data))
                    .setIn(['tableData', 'loading'], action.bool)
        default: 
            return state
    }
}
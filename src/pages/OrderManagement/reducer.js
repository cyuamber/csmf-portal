import I from 'immutable'

const initData = I.fromJS({
    tableData: {
        loading: false,
        data: [],
        total: 0
    },
    pageSize: 10,
    pageNo: 1,
})

export default function reducer(state = initData, action){
    switch (action.type){
        case 'GET_TABLE_DATA':
            return state
                    .setIn(['tableData','data'], I.fromJS(action.tableData))    
                    .setIn(['tableData','loading'], action.bool)
                    .setIn(['tableData', 'total'], action.total)
                    .setIn(['pageNo'], action.pageNo)
                    .setIn(['pageSize'], action.pageSize);

        case 'CHANGE_TABLE_LOADING': 
            return state.setIn(['tableData','loading'], action.bool);
        default:
            return state;
    }
}
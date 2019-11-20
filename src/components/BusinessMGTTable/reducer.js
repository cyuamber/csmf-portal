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
        case 'SET_TABLE_LIST': 
            return state
                    .setIn(['tableData', 'total'], action.total)
                    .setIn(['page_no'], action.pageNo)
                    .setIn(['page_size'], action.pageSize)
                    .setIn(['tableData', 'data'], I.fromJS(action.data))
                    .setIn(['tableData', 'loading'], action.bool)
        case 'SET_TABLE_DATA':
            return state
                    .setIn(['tableData', 'data'], I.fromJS(action.data))
                    .setIn(['tableData', 'loading'], action.bool)
        // case 'SET_STATUS_LOADING':
        //     let index = 0
        //     state.getIn(['tableData']).toJS().data.forEach((item, i) => {
        //         if(item.service_id === action.serviceId){
        //             index = i
        //         }
        //     });
        //     return state.setIn(['tableData', 'data'], state.getIn(['tableData', 'data']).update(index, item => {
        //         return item
        //                 .setIn(['loading'], action.bool)
        //                 .setIn(['checked'], !item.getIn(['checked']))
        //     }))
        default: 
            return state
    }
}
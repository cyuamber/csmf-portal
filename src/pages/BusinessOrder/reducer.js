import I from 'immutable'

const initialState = I.fromJS({
    provinceList: [],
    formItem: [
        {
            id: 1,
            cityList: [],
            countyList: [],
            streetList: []
        }
    ],
    address: []
});

export default function reducer (state = initialState, action){
    switch(action.type){
        case 'ADD_FORM_ITEM': 
            return state.setIn(['formItem'], state.getIn(['formItem']).push(I.fromJS(action.item)))
        case 'DELETE_FORM_ITEM':
            return state.setIn(['formItem'], state.get('formItem').splice(action.index, 1))
        case 'GET_PROVINCE':
            return state.setIn(['provinceList'], I.fromJS(action.provinceList));
        case 'GET_CITY':
            return state
                    .setIn(['formItem'],state.get('formItem').update( action.index, item => {
                        return item
                                .setIn(['cityList'],action.cityList)
                                .setIn(['countyList'], I.fromJS([]))
                                .setIn(['streetList'], I.fromJS([]))
                    }))
        case 'GET_COUNTY':
            return state
                    .setIn(['formItem'],state.get('formItem').update( action.index, item => {
                        return item
                                .setIn(['countyList'],action.countyList)
                                .setIn(['streetList'], I.fromJS([]))
                    }))
        case 'GET_STREET':
            return state.setIn(['formItem'],state.get('formItem').update( action.index, item => {
                return item.setIn(['streetList'],action.streetList)
            }))
        case 'GET_ADDRESS': 
            return state.setIn(['address'], I.fromJS(action.address))
        default:
            return state
    }
    
}
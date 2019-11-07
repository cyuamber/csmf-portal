import I from 'immutable'

const initialState = I.fromJS({
    provinceList: [],
    cityList: [],
    countyList: []

});

export default function reducer (state = initialState, action){
    switch(action.type){
        case 'GET_PROVINCE':
            return state.setIn(['provinceList'], I.fromJS(action.provinceList));
        case 'GET_CITY':
            return state.setIn(['cityList'], I.fromJS(action.cityList));
        case 'GET_COUNTY':
            return state.setIn(['countyList'], I.fromJS(action.countyList))
        default:
            return state
    }
    
}
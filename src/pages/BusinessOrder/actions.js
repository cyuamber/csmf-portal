import { axiosget } from '../../utils/http';
import APIS from '../../constant/apis';
import { ADDRESS } from '../../constant/constants';

const setProvinceList = provinceList => ({type: 'GET_PROVINCE', provinceList});
const setCityList = (cityList, index) => ({type: 'GET_CITY', cityList, index});
const setCountyList = (countyList, index) => ({type: 'GET_COUNTY', countyList, index});
const setStreetList = (streetList, index) => ({type: 'GET_STREET', streetList, index});
const setBtnLoading = bool => ({type: 'SET_BTN_LOADING', bool});


export const actions = dispatch => {
    return {
        addFormItem: (id) => {
            let item = {
                id,
                cityList: [],
                countyList: [],
                streetList: []
            };
            dispatch({type: 'ADD_FORM_ITEM', item});
        },
        deleteFormItem: index => {
            dispatch({type: 'DELETE_FORM_ITEM', index});
        },
        getProvinceList: () => {
            axiosget(APIS.getProvinceApi).then(res => {
                dispatch(setProvinceList(res));
            })
        },

        getAddressApi: () => {
            dispatch({type: 'GET_ADDRESS', address: ADDRESS.result_body.province});
        },
        getCityList: (cityList, index) => {
            dispatch(setCityList(cityList, index));
        },
        getCountyList: (countyList, index) => {
            dispatch(setCountyList(countyList, index));
        },
        getStreetList: (streetList, index) => {
            dispatch(setStreetList(streetList, index));
        },
        setBtnLoading: bool => {
            dispatch(setBtnLoading(bool));
        }
    }
}
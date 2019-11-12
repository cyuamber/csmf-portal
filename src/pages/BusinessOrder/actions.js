import { axiosget } from '../../utils/http';
import APIS from '../../constant/apis'

const setProvinceList = provinceList => ({type: 'GET_PROVINCE', provinceList})
const setCityList = (cityList, index) => ({type: 'GET_CITY', cityList, index})
const setCountyList = (countyList, index) => ({type: 'GET_COUNTY', countyList, index})
const setStreetList = (streetList, index) => ({type: 'GET_STREET', streetList, index})


export const actions = dispatch => {
    return {
        addFormItem: (id) => {
            let item = {
                id,
                cityList: [],
                countyList: [],
                streetList: []
            }
            dispatch({type: 'ADD_FORM_ITEM', item})
        },
        deleteFormItem: index => {
            dispatch({type: 'DELETE_FORM_ITEM', index})
        },
        getProvinceList: () => {
            axiosget(APIS.getProvinceApi).then(res => {
                // if(res.code === 200){
                    dispatch(setProvinceList(res))
                // }
            })
        },
        getCityList: (province, index) => {
            axiosget(APIS.getCityApi,{province}).then(res => {
                // if(res.code === 200){
                    dispatch(setCityList(res, index))
                // }
            })
        },
        getCountyList: (city, index) => {
            axiosget(APIS.getCountyApi, {city}).then(res => {
                // if(res.code === 200){
                    dispatch(setCountyList(res, index))
                // }
            })
        },
        getStreetList: (county, index) => {
            axiosget(APIS.getStreetApi, {county}).then( res => {
                dispatch(setStreetList(res, index))
            })
        }
    }
}
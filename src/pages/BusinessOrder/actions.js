import { axiosget } from '../../utils/http';
import APIS from '../../constant/apis'
import { ADDRESS } from '../../constant/constants'

const setProvinceList = provinceList => ({type: 'GET_PROVINCE', provinceList})
const setCityList = (cityList, index) => ({type: 'GET_CITY', cityList, index})
const setCountyList = (countyList, index) => ({type: 'GET_COUNTY', countyList, index})
const setStreetList = (streetList, index) => ({type: 'GET_STREET', streetList, index})
const setBtnLoading = bool => ({type: 'SET_BTN_LOADING', bool})


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

        getAddressApi: () => {
            dispatch({type: 'GET_ADDRESS', address: ADDRESS.result_body.province})
            // axiosget(APIS.getAddressApi).then( res => {
            //     const {result_body, result_header: {result_code}} = res
            //     if(result_code === 200){
            //         dispatch({type: 'GET_ADDRESS', address: result_body.province})
            //     }
            // })
        },
       /*  getCityList: (province, index) => {
            axiosget(APIS.getCityApi,{province}).then(res => {
                // if(res.code === 200){
                    dispatch(setCityList(res, index))
                // }
            })
        }, */
        getCityList: (cityList, index) => {
            dispatch(setCityList(cityList, index))
        },
        // getCountyList: (city, index) => {
        //     axiosget(APIS.getCountyApi, {city}).then(res => {
        //         // if(res.code === 200){
        //             dispatch(setCountyList(res, index))
        //         // }
        //     })
        // },
        getCountyList: (countyList, index) => {
            dispatch(setCountyList(countyList, index))
        },
        // getStreetList: (county, index) => {
        //     axiosget(APIS.getStreetApi, {county}).then( res => {
        //         dispatch(setStreetList(res, index))
        //     })
        // }
        getStreetList: (streetList, index) => {
            dispatch(setStreetList(streetList, index))
        },
        setBtnLoading: bool => {
            dispatch(setBtnLoading(bool))
        }
    }
}
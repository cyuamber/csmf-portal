import { axiosget } from '../../utils/http';
import APIS from '../../constant/apis'

const setProvinceList = provinceList => ({type: 'GET_PROVINCE', provinceList})
const setCityList = cityList => ({type: 'GET_CITY', cityList})
const setCountyList = countyList => ({type: 'GET_COUNTY', countyList})

export const actions = dispatch => {
    return {
        getProvinceList: () => {
            axiosget(APIS.getProvinceApi).then(res => {
                // if(res.code === 200){
                    dispatch(setProvinceList(res))
                // }
            })
        },
        getCityList: (province) => {
            axiosget(APIS.getCityApi,{province}).then(res => {
                // if(res.code === 200){
                    dispatch(setCityList(res))
                // }
            })
        },
        getCountyList: (city) => {
            axiosget(APIS.getCountyApi, {city}).then(res => {
                // if(res.code === 200){
                    dispatch(setCountyList(res))
                // }
            })
        }
    }
}
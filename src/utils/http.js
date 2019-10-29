
import axios from 'axios';

axios.defaults.withCredentials = true; // set cross-origin

const getHeaders = () => ({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "x-requested-with,content-type"
});

export function axiospost(url, data) {
    axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
    return new Promise((resolve, reject) => {
        axios.post(url, data, {
            headers: getHeaders(),
        }).then((res) => {
            resolve(res.data);
        }).catch((err) => {
            reject(err);
        });
    });
}
export function axiosget(url, data) {
    return new Promise((resolve, reject) => {
        axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
        axios.get(url, {
            params: data,
            headers: getHeaders(),
        }).then((res) => {
            resolve(res.data);
        }).catch((err) => {
            reject(err);
        });
    })
}
export function axiosmock(url, param, data) {
    return new Promise((resolve) => {
        console.log('%ccurrenturl', 'padding: 3px; background: #009fff; color: #fff; border-radius: 3px;', url)
        console.log('%ccurrentparams', 'padding: 3px; background:#ff0024; color: #fff; border-radius: 3px;', param)
        resolve(data);
    })
}

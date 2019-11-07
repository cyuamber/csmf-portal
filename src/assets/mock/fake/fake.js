const faker = require("faker");
const _ = require("lodash");
faker.locale = "en";

module.exports = {
    customer: _.times(20, function (n) {
        return {
            id: n,
            name: faker.name.findName(),
            phone: faker.phone.phoneNumber(),
            address: faker.address.streetAddress(),
            avatar: faker.internet.avatar()
        }
    }),
    home: _.times(10, function (n) {
        return {
            id: n,
            name: faker.name.findName(),
            phone: faker.phone.phoneNumber(),
            address: faker.address.streetAddress(),
            avatar: faker.internet.avatar()
        }
    }),
    province: [
        { 
            id: 1,
            province: '北京'
        },
        {
            id: 2,
            province: '上海'
        }, 
        {
            id: 3,
            province: '江苏省'
        }
    ],
    city: [
        {
            id: 1,
            city: '南京市'
        },
        {
            id: 2,
            city: '苏州市'
        },
        {
            id: 3,
            city: '南通市'
        }
    ],
    county: [
        {
            id: 1,
            county: '玄武区',
        },
        {
            id: 2,
            county: '秦淮区'
        },
        {
            id: 3,
            county: '鼓楼区'
        }
    ],
    orders: {
        result_header: {
            result_code: '200',
            result_message: '5G slicing order query result.',
        },
        total: 50,
        result_body: _.times(10, function (n) {
            return {
                order_id: 'order'+n,
                order_creation_time: '20190101',
                service_expiration_time: '20191231',
                order_description: `order${n} description`,
                order_status: n%2 ? 'normal' : 'terminate'
            }
        })
    },
    detail: {
        result_header: {
            result_code: '200',
            result_message: '5G slicing order query result.',
        },
        result_body:[ {
            service_id: 'service1',
            service_creation_time: '20190101',
            service_enable_time: '20190201',
            service_description: 'service1 description',
            service_status: 'disable'
        }]      
    },
    enable: {
        result_header: {
            result_code: '200',
            result_message: '5G slicing order query result.',
        },
    },
    disable: {
        result_header: {
            result_code: '200',
            result_message: '5G slicing order query result.',
        },
    },
    terminate: {
        result_header: {
            result_code: '200',
            result_message: '5G slicing order query result.',
        },
    }
}
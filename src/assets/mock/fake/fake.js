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
    // orders: {
    //     result_header: {
    //         result_code: '200',
    //         result_message: '5G slicing order query result.',
    //     },
    //     total: 50,
    //     result_body: _.times(10, function (n) {
    //         return {
    //             order_id: 'order' + n,
    //             order_creation_time: '20190101',
    //             service_expiration_time: '20191231',
    //             order_description: `order${n} description`,
    //             order_status: n % 2 ? 'normal' : 'terminate'
    //         }
    //     })
    // },
    detail: {
        result_header: {
            result_code: '200',
            result_message: '5G slicing order query result.',
        },
        result_body: [{
            service_id: 'service1',
            service_creation_time: '20190101',
            service_enable_time: '20190201',
            service_name: 'service1 name',
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
    },
    business: {
        result_header: {
            result_code: '200',
            result_message: '5G slicing order query result.',
        },
        total: 20,
        result_body: _.times(6, function (n) {
            return {
                service_id: 'service'+n,
                service_creation_time: '20190101',
                service_enable_time: '20190201',
                service_name: `service${n} description`,
                service_status: n % 2 ? 'normal' : 'terminate'
            }
        })
    }
}
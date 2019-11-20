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
        result_body: {
            record_number: "30",
            slicing_service_list:  _.times(6, function (n) {
                return {
                    service_id: 'service'+n,
                    service_name: `service${n} description`,
                    service_type: "eMBB",
                    service_snssai: "1-010102",
                    service_status: n % 2 ? 'activated' : 'terminate'
                }
            })
        }
    }
}
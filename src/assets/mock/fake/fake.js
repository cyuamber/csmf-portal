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
    ]
}
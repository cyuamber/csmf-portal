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
    createVNFType: {
        code: 200,
        message: 'SUCCESS',
        body: {
            id: faker.random.number(),
            VNFTypeName: faker.random.words(),
            createTime: faker.date.recent()
        }
    },
    updateVNFType: {
        code: 200,
        message: 'SUCCESS',
        body: {
            id: faker.random.number(),
            VNFTypeName: faker.random.words(),
            createTime: faker.date.recent()
        }
    },
    getVNFType: {
        code: 200,
        message: 'SUCCESS',
        total: 50,
        body: _.times(10, function (n) {
            return {
                id: n,
                VNFTypeName: faker.random.words(),
                createTime: faker.date.recent()
            }
        })
    },
    deleteVNFType: {
        code: 200,
        message: 'SUCCESS'
    },
    getVNFTest: {
        code: 200,
        message: 'SUCCESS',
        total: 50,
        body: _.times(10, function (n) {
            return {
                id: n,
                VNFTestName: faker.name.firstName(),
                VNFTestVendor: faker.random.word(),
                VNFTestVersion: 'V' + faker.random.number(),
                VNFTypeName: faker.name.lastName(),
                createTime: faker.date.recent(),
                VNFFileName: {}
            }
        })
    },
    deleteVNFTest: {
        code: 200,
        message: 'SUCCESS',
    },
    getMeterSys: {
        code: 200,
        message: 'SUCCESS',
        total: 50,
        body: _.times(10, function (n) {
            return {
                meterSysName: n + 1,
                meterSysVendor: faker.company.companyName(),
                meterSysUrl: faker.internet.url(),
                createTime: faker.date.recent(),
                username: faker.name.findName(),
                password: faker.internet.password()
            }
        })
    },
    loginMeterSys: {
        code: 200,
        message: 'SUCCESS',
        body: _.times(10, function (n) {
            return {
                meterSysName: n,
                meterSysVendor: faker.company.companyName(),
                meterSysUrl: faker.internet.url(),
                createTime: faker.date.recent()
            }
        })
    },
    updateMeterSys: {
        code: 200,
        message: 'SUCCESS',
        body: _.times(10, function (n) {
            return {
                meterSysName: n,
                meterSysVendor: faker.company.companyName(),
                meterSysUrl: faker.internet.url(),
                createTime: faker.date.recent()
            }
        })
    },
    deleteMeterSys: {
        code: 200,
        message: 'SUCCESS'
    },
    getTestMeter: {
        code: 200,
        message: 'SUCCESS',
        total: 50,
        body: _.times(10, function (n) {
            return {
                tesyMeterName: n + 1,
                tesyMeterVendor: faker.company.companyName(),
                tesyMeterVersion: faker.random.number(),
                tesyMeterType: faker.database.type(),
                createTime: faker.date.recent(),
            }
        })
    },
    getTestMeterVNFType: {
        code: 200,
        message: 'SUCCESS',
        total: 50,
        body: ['VNF', 'PNF', 'XNF', 'NFVI']
    },
    createTestMeter: {
        code: 200,
        message: 'SUCCESS',
        body: _.times(10, function (n) {
            return {
                tesyMeterName: n,
                tesyMeterVendor: faker.company.companyName(),
                tesyMeterVersion: faker.random.number(),
                tesyMeterType: faker.database.type(),
                createTime: faker.date.recent(),
            }
        })
    },
    updateTestMeter: {
        code: 200,
        message: 'SUCCESS',
        body: _.times(10, function (n) {
            return {
                tesyMeterName: n,
                tesyMeterVendor: faker.company.companyName(),
                tesyMeterVersion: faker.random.number(),
                tesyMeterType: faker.database.type(),
                createTime: faker.date.recent(),
            }
        })
    },
    deleteTestMeter: {
        code: 200,
        message: 'SUCCESS'
    },
    uploadVNFFile: {
        code: 200,
        message: 'SUCCESS'
    },
    getTestSpec: {
        code: 200,
        message: 'SUCCESS',
        total: 50,
        body: _.times(10, function (n) {
            return {
                testSpecId: n + 1,
                testSpecName: faker.commerce.productName(),
                testSpecVersion: faker.random.number(),
                VNFtype: faker.database.type(),
                PublishORG: faker.company.companyName(),
                publishTime: faker.date.recent(),
            }
        })
    },
    getTestSpecVNFType: {
        code: 200,
        message: 'SUCCESS',
        total: 50,
        body: ['VNF', 'PNF', 'XNF', 'NFVI']
    },
    addTestSpec: {
        code: 200,
        message: 'SUCCESS',
        body: _.times(10, function (n) {
            return {
                testSpecId: n,
                testSpecName: faker.commerce.productName(),
                testSpecVersion: faker.random.number(),
                VNFtype: faker.database.type(),
                PublishORG: faker.company.companyName(),
                publishTime: faker.date.recent(),
            }
        })
    },
    updateTestSpec: {
        code: 200,
        message: 'SUCCESS',
        body: _.times(10, function (n) {
            return {
                testSpecId: n,
                testSpecName: faker.commerce.productName(),
                testSpecVersion: faker.random.number(),
                VNFtype: faker.database.type(),
                PublishORG: faker.company.companyName(),
                publishTime: faker.date.recent(),
            }
        })
    },
    deleteTestSpec: {
        code: 200,
        message: 'SUCCESS'
    },
    createVNFTest: {
        code: 200,
        message: 'SUCCESS',
        body: {
            id: faker.random.number(),
            VNFTestName: faker.name.firstName(),
            VNFTestVendor: faker.random.word(),
            VNFTestVersion: 'V' + faker.random.word(),
            VNFTypeName: faker.name.lastName(),
            createTime: faker.date.recent(),
        }
    },
    updateVNFTest: {
        code: 200,
        message: 'SUCCESS',
        body: {
            id: faker.random.number(),
            VNFTestName: faker.name.firstName(),
            VNFTestVendor: faker.random.word(),
            VNFTestVersion: 'V' + faker.random.number(),
            VNFTypeName: faker.name.lastName(),
            createTime: faker.date.recent(),
        }
    },
    getVIM: {
        code: 200,
        message: 'SUCCESS',
        total: 50,
        body: _.times(10, function (n) {
            return {
                isOnline: true,
                cloudOwner: faker.name.firstName(),
                cloudRegionId: faker.random.number().toString(),
                cloudType: faker.random.word(),
                cloudVersion: 'V' + faker.random.number(),
                ownerDefinedType: faker.random.word(),
                cloudZone: faker.random.word(),
                userName: faker.internet.userName(),
                passwd: faker.internet.password(),
                authUrl: faker.internet.url(),
                tenant: faker.internet.userName(),
                createTime: faker.date.recent(),
                defaultTenant: faker.random.word(),

            }
        })
    },
    loginVIM: {
        code: 200,
        message: 'SUCCESS',
        body: _.times(10, function (n) {
            return {
                cloudOwner: faker.name.firstName(),
                cloudRegionId: faker.random.number().toString(),
                cloudType: faker.random.word(),
                cloudVersion: 'V' + faker.random.number(),
                ownerDefinedType: faker.random.word(),
                cloudZone: faker.random.word(),
                userName: faker.internet.userName(),
                passwd: faker.internet.password(),
                authUrl: faker.internet.url(),
                tenant: faker.internet.userName(),
            }
        })
    },
    updateVIM: {
        code: 200,
        message: 'SUCCESS',
        body: _.times(10, function (n) {
            return {
                cloudOwner: faker.name.firstName(),
                cloudRegionId: faker.random.number().toString(),
                cloudType: faker.random.word(),
                cloudVersion: 'V' + faker.random.number(),
                ownerDefinedType: faker.random.word(),
                cloudZone: faker.random.word(),
                userName: faker.internet.userName(),
                passwd: faker.internet.password(),
                authUrl: faker.internet.url(),
                tenant: faker.internet.userName(),
            }
        })
    },
    deleteVIM: {
        code: 200,
        message: 'SUCCESS'
    },
    getVNFM: {
        code: 200,
        message: 'SUCCESS',
        total: 50,
        body: _.times(10, function (n) {
            return {
                VNFMname: faker.name.firstName(),
                VNFMtype: faker.random.word(),
                VNFMvendor: faker.random.word(),
                VNFMversion: 'V' + faker.random.number(),
                url: faker.internet.url(),
                vim: faker.name.firstName(),
                authUrl: faker.internet.url(),
                username: faker.internet.userName(),
                password: faker.internet.password(),
                createTime: faker.date.recent(),
            }
        })
    },
    loginVNFM: {
        code: 200,
        message: 'SUCCESS',
        body: {
            VNFMname: faker.name.firstName(),
            VNFMtype: faker.random.word(),
            VNFMvendor: faker.random.word(),
            VNFMversion: 'V' + faker.random.number(),
            url: faker.internet.url(),
            vim: faker.name.firstName(),
            authUrl: faker.internet.url(),
            userName: faker.internet.userName(),
            passwd: faker.internet.password()
        }
    },
    updateVNFM: {
        code: 200,
        message: 'SUCCESS',
        body: {
            VNFMname: faker.name.firstName(),
            VNFMtype: faker.random.word(),
            VNFMvendor: faker.random.word(),
            VNFMversion: 'V' + faker.random.number(),
            url: faker.internet.url(),
            vim: faker.name.firstName(),
            authUrl: faker.internet.url(),
            userName: faker.internet.userName(),
            passwd: faker.internet.password()
        }
    },
    deleteVNFM: {
        code: 200,
        message: 'SUCCESS'
    },
    getTestJob: {
        code: 200,
        message: 'SUCCESS',
        total: 20,
        body: _.times(10, function (n) {
            if (n > 3) {
                n = 0
            }
            return {
                VNFName: faker.name.lastName(),
                jobName: faker.name.firstName(),
                createrTime: faker.date.recent(),
                status: n,
                speciflcation: faker.random.word(),
                description: faker.random.word(),
            }
        })
    }
}
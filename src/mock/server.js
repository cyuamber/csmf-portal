const jsonServer = require('json-server');
const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const customersRouters = require('./routers');

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Get mock data
const fs = require('fs');
const path = require('path');

let localJsonDb = {};                                 //import mock datas
const fakeoriginalData = require('./fake/mock.js');   //import datas created in fake.js
const mockFolder = './src/mock/json';                 //set mock json path folder
const filePath = path.resolve(mockFolder);

fileDisplay(filePath);

function fileDisplay(filePath) {
    let fileList = [];
    // Return filelist on based of filePath
    const files = fs.readdirSync(filePath);
    files.forEach((filename) => {
        // Get filename's absolute path
        let filedir = path.join(filePath, filename);
        // Get the file information according to the file path and return an fs.Stats object
        fs.stat(filedir, (err, stats) => {
            if (err) {
                console.warn('Get files failed......');
            } else {
                let isFile = stats.isFile(); // files
                let isDir = stats.isDirectory(); //files folder
                if (isFile) {
                    fileList.push(path.basename(filedir, '.json'));
                    fileList.forEach(item => {
                        localJsonDb[item] = getjsonContent(item);
                    })
                }
                if (isDir) {
                    console.warn("=====> DO NOT support mock data in folder");
                    fileDisplay(filedir);
                }
                Object.keys(fakeoriginalData).map(item => {
                    localJsonDb[item] = fakeoriginalData[item];
                })
            }
        })
    })
    setTimeout(() => {
        serverRewrite();
        runServer(localJsonDb);
    }, 100)
}
function getjsonContent(path) {
    let newpath = `./src/mock/json/${path}.json`;
    let result = JSON.parse(fs.readFileSync(newpath));
    return result;
}

//set router rewriter rules according to routers.js
function serverRewrite() {
    server.use(jsonServer.rewriter(customersRouters))
}

function runServer(db) {
    server.use(jsonServer.router(db));
}

server.post(`/*`, (req, res, next) => {
    req.method = 'GET'
    next();
})

server.listen(4002, () => {
    console.log('React Mock Server is successfully running on port 4002 😁')
});

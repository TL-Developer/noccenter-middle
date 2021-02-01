const https = require('https');
const http = require('http');

const requestHttps = async (bodyRaw, options) =>
    new Promise((resolve, reject) => {
        try {
            let body = {}
            const events = https.request({
                ...options,
                headers: {
                    ...options.headers,
                    ...{
                        "Content-length": bodyRaw.length
                    }
                }
            }, (response) => {

                response.on('data', (d) => {
                    process.stdout.write(d)
                })

                response.setEncoding('utf8');

                response.on('readable', function () {
                    var chunk = this.read() || '';
                    body += chunk;
                });

                response.on('end', function () {
                    const result = JSON.parse(body.replace('[object Object]', ''))
                    resolve(result)
                });
                events.end()
            })

            events.on('error', (error) => {
                throw (error)
            })

            events.write(bodyRaw)
            events.end()

        } catch (error) {
            reject(error)
        }
    });


    const requestHttp = async (bodyRaw, options) =>
    new Promise((resolve, reject) => {
        try {
            let body = {}
            const events = http.request({
                ...options,
                headers: {
                    ...options.headers,
                    ...{
                        "Content-length": bodyRaw.length
                    }
                }
            }, (response) => {

                response.on('data', (d) => {
                    process.stdout.write(d)
                })

                response.setEncoding('utf8');

                response.on('readable', function () {
                    var chunk = this.read() || '';
                    body += chunk;
                });

                response.on('end', function () {
                    const result = JSON.parse(body.replace('[object Object]', ''))
                    resolve(result)
                });
                events.end()
            })

            events.on('error', (error) => {
                throw (error)
            })

            events.write(bodyRaw)
            events.end()

        } catch (error) {
            reject(error)
        }
    });



    

    const requestHttpGet = async (bodyRaw, options) =>
    new Promise((resolve, reject) => {
        try {
            let body = {}
            const events = http.request({
                ...options,
                headers: { ...options.headers }
                
            }, (response) => {

                response.on('data', (d) => {
                    process.stdout.write(d)
                })

                response.setEncoding('utf8');

                response.on('readable', function () {
                    var chunk = this.read() || '';
                    body += chunk;
                });

                response.on('end', function () {
                    const result = JSON.parse(body.replace('[object Object]', ''))
                    resolve(result)
                });
                events.end()
            })

            events.on('error', (error) => {
                throw (error)
            })

            events.write(bodyRaw)
            events.end()

        } catch (error) {
            reject(error)
        }
    })



module.exports = {requestHttps, requestHttp, requestHttpGet}

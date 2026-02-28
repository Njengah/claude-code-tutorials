import fs from 'fs'

async function requestLogger(req, res, next) {
    const log = req.method + ' ' + req.url + ' - ' + new Date()
    await fs.promises.appendFile('logs.txt', log + '\n')
    next()
}

function errorLogger(err, req, res, next) {
    res.status(500).send('Something went wrong')
}

export { requestLogger, errorLogger }

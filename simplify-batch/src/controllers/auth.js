import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

function login(req, res) {
    const username = req.body.username
    const password = req.body.password

    if (username && password) {
        const token = jwt.sign({ username: username }, 'secret', { expiresIn: '1h' })
        res.send({ token: token })
    } else {
        res.status(400).send('Missing credentials')
    }
}

function logout(req, res) {
    res.send('logged out')
}

export { login, logout }

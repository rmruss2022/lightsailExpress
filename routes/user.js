const express = require('express')
const router = express.Router()
const user = require('../models/user')
const conf = require('../conf.json')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
    try {
        const {username, password} = req.body;
        console.log('username: ', username, ', password: ', password);
        const newUser = new user({username : username, password : bcrypt.hashSync(password, 10), role : 'user'})
        const saveResp = await newUser.save()
        res.status(201).send(saveResp)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/authenticate', async(req, res) => {
    console.log('auth')
    const { username, password } = req.body
    const authUser = await user.findOne({ username : username });
    if (authUser && bcrypt.compareSync(password, authUser.password)) {
        const token = jwt.sign({ sub: username, role: user.role }, conf.secret);
        res.status(200).json(token)
    } else {
        res.status(500).json('User info not correct')
    }

})

module.exports = router
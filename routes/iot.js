const express = require('express')
const router = express.Router()
const iot = require('../models/iot')
const conf = require('../conf.json')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

router.post('/createEntry', async(req, res) => {
    try {
        const {iot_type, classification, score} = req.body;
        console.log('iot type: ', iot_type, 'classification: ', classification);
        const newiot = new iot({iot_type : iot_type, classification : classification, score : parseFloat(score)})
        const saveResp = await newiot.save()
        res.status(201).send(saveResp)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

router.get('/getEntries', async(req,res) => {
    try {
        const allIot = await iot.find()
        res.json(allIot)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = router
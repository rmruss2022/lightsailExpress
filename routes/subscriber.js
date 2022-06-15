const express = require('express')
const router = express.Router()
const subscriber = require('../models/subscriber')

// get all subscribers
router.get('/', async (req, res) => {
    try {
        const allSubscribers = await subscriber.find()
        res.json(allSubscribers)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// get single subscriber
router.get('/:id', getSubscriber, (req, res) => {
    res.send(res.sub)
})

// create subscriber
router.post('/', async (req, res) => {
    console.log('req body: ', req.body)
    const sub = new subscriber({ 
        name : req.body.name,
        subscribedTo: req.body.subscribedTo
    })
    try {
        const newSub = await sub.save()
        res.status(201).send(newSub)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// update subscriber
router.patch('/:id', getSubscriber, async (req, res) => {
    console.log('patching: ', res.sub)
    console.log('new name: ', req.body.name)
    if (req.body.name != null) {
        res.sub.name = req.body.name
    }
    if (req.body.subscribedTo != null) {
        res.sub.subscribedTo = req.body.subscribedTo
    }
    try {
        const updatedSub = await res.sub.save()
        res.json(updatedSub)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// delete subscriber
router.delete('/:id', getSubscriber, async (req, res) => {
    try {
        await res.sub.remove()
        res.json({ message: 'Deleted subscriber' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getSubscriber(req, res, next) {
    try {
        const sub = await subscriber.findById(req.params.id)
        if (sub) {
            res.sub = sub
            next()
        } else {
            res.status(404).json({ message: 'Cannot find subscriber' })
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = router


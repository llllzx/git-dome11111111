const express = require('express');

const Task = require('../model/task');

const router = express.Router();

router.get('/list', async (req, res) => {
    const list = await Task.find();
    res.send(list);
});

router.post('/', async (req, res) => {
    const { title } = req.body;
    const task = await Task.create({ title });
    res.send(task);
});

router.delete('/', async (req, res) => {
    const { ids } = req.body;
    await Task.deleteMany({
        _id: {
            $in: ids
        }
    });
    res.send('ok');
});

router.put('/status', async (req, res) => {
    const { id, completed } = req.body;
    await Task.updateOne({ _id: id }, { completed });
    res.send('ok');
});

router.put('/title', async (req, res) => {
    const { id, title } = req.body;
    await Task.updateOne({ _id: id }, { title });
    res.send('ok');
});

module.exports = router;
const express = require('express');
const router = express.Router();

const Advertisement = require('../../../models/modules/advertisement');
const formattedData = require('../../../utils/formattedData');

router.get('/', async (req, res) => {
    const params = req.query;
    const advertisementList = await Advertisement.getList(params);

    try {
        res.send(formattedData(advertisementList));
    } catch (e) {
        console.log(e);
        res.status(500);
    }
});

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    const advertisementItem = await Advertisement.getItemById(id);

    try {
        res.send(formattedData(advertisementItem));
    } catch (e) {
        console.log(e);
        res.status(500);
    }
});

module.exports = router;
const express = require('express');
const router = express.Router();

const AdvertisementModule = require('../../../modules/advertisement');
const formattedData = require('../../../utils/formattedData');

router.get('/', async (req, res) => {
    const params = req.query;
    const advertisementList = await AdvertisementModule.getList(params);

    try {
        res.send(formattedData(advertisementList));
    } catch (e) {
        console.log(e);
        res.status(500);
    }
});

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    const advertisementItem = await AdvertisementModule.getItemById(id);

    try {
        res.send(formattedData(advertisementItem));
    } catch (e) {
        console.log(e);
        res.status(500);
    }
});

module.exports = router;
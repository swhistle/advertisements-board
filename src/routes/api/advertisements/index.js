const express = require('express');
const router = express.Router();

const AdvertisementModule = require('../../../modules/advertisement');
const formattedData = require('../../../utils/formattedData');
const formattedError = require('../../../utils/formattedError');

router.get('/', async (req, res) => {
    const params = req.query;
    const advertisementList = await AdvertisementModule.getList(params);

    if (!advertisementList) {
        res.status(500);
        res.send(formattedError('Server error'));
        return;
    }

    res.send(formattedData(advertisementList));
});

router.post('/', async (req, res) => {
    const {shortText, description} = req.body;

    if (!shortText || !description) {
        res.status(400);
        res.send(formattedError("Fields 'shortText', 'description' shouldn't be empty"));
        return;
    }

    const newAdvertisement = await AdvertisementModule.create(shortText, description);

    if (!newAdvertisement) {
        res.status(500);
        res.send(formattedError('Server error'));
        return;
    }

    res.status(201);
    res.send(formattedData(newAdvertisement));
});

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    const advertisementItem = await AdvertisementModule.getItemById(id);

    if (!advertisementItem) {
        res.status(404);
        res.send(formattedError("Advertisement with this 'id' is not found"));
        return;
    }

    res.send(formattedData(advertisementItem));
});

router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const {shortText, description} = req.body;

    const advertisementItemForUpdate = await AdvertisementModule.update(id, {shortText, description});

    if (!advertisementItemForUpdate) {
        res.status(404);
        res.send(formattedError("Advertisement with this 'id' is not found"));
        return;
    }

    res.status(202);
    res.send(true);
});

router.delete('/:id', async (req, res) => {
    const {id} = req.params;

    const advertisementItemForRemove = await AdvertisementModule.remove(id);

    if (!advertisementItemForRemove) {
        res.status(404);
        res.send(formattedError("Advertisement with this 'id' is not found"));
        return;
    }

    res.status(201);
    res.send(true);
});

module.exports = router;
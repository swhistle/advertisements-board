const AdvertisementScheme = require('../../models/advertisement');

class AdvertisementModule {
    static async getList(params) {
        return AdvertisementScheme.find(params);
    }

    static async getItemById(id) {
        return AdvertisementScheme.findById(id);
    }
}

module.exports = AdvertisementModule;
const AdvertisementScheme = require('../../schemes/advertisement');

class Advertisement {
    static async getList(params) {
        return AdvertisementScheme.find(params);
    }

    static async getItemById(id) {
        return AdvertisementScheme.findById(id);
    }
}

module.exports = Advertisement;
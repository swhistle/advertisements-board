const AdvertisementScheme = require('../../models/advertisement');

class AdvertisementModule {
    static async getList(params) {
        try {
            return await AdvertisementScheme.find(params);
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    static async getItemById(id) {
        try {
            return await AdvertisementScheme.findById(id);
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    static async create(shortText, description) {
        try {
            const newAdvertisement = new AdvertisementScheme({shortText, description});

            return newAdvertisement.save();
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    static async remove(id) {
        try {
            return await AdvertisementScheme.findByIdAndDelete(id);
        } catch (e) {
            console.log(e);
            return null;
        }
    }
}

module.exports = AdvertisementModule;
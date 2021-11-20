const {Schema, model} = require('mongoose');

const advertisementSchema = Schema(
    {
        shortText: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
    },
    {
        toJSON: {
            transform: (doc, ret) => {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            }
        }
    }

    );

module.exports = model('Advertisement', advertisementSchema);
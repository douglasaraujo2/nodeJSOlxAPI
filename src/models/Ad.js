import mongoose, { Schema } from 'mongoose';

mongoose.Promise = global.Promise;

const modelSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    state: {
        type: Schema.Types.ObjectId,
        ref: "State"
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category"
    },
    images: [Object],
    dateCreated: Date,
    title: String,
    price: Number,
    priceNegotiable: Boolean,
    views: Number,
    status: String
});

const modelName = 'Ad';

let model;
if (mongoose.connection && mongoose.connection.models[modelName]) {
    model = mongoose.connection.models[modelName];
} else {
    model = mongoose.model(modelName, modelSchema);
}

export default model;
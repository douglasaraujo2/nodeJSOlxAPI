import mongoose, { Schema } from 'mongoose';

mongoose.Promise = global.Promise;

const modelSchema = new Schema({
    name: String,
    email: String,
    state: {
        type: Schema.Types.ObjectId,
        ref: 'State'
    },
    passwordHash: String,
    token: String,
    ads: [{
        type: Schema.Types.ObjectId,
        ref: 'Ad'
    }]
});

const modelName = 'User';

let model;
if (mongoose.connection && mongoose.connection.models[modelName]) {
    model = mongoose.connection.models[modelName];
} else {
    model = mongoose.model(modelName, modelSchema);
}

export default model;
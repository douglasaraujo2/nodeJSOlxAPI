import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const modelSchema = new mongoose.Schema({
    name: String,
    slug: String
})

const modelName = 'Category';

let model;
if (mongoose.connection && mongoose.connection.models[modelName]) {
    model = mongoose.connection.models[modelName];
} else {
    model = mongoose.model(modelName, modelSchema);
}

export default model;
import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const modelSchema = new mongoose.Schema({
    name: String
});

const modelName = 'State';

let model;
if (mongoose.connection && mongoose.connection.models[modelName]) {
    model = mongoose.connection.models[modelName];
} else {
    model = mongoose.model(modelName, modelSchema);
}
export default model;
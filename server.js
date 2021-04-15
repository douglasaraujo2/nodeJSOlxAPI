require("dotenv").config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import fileupload from 'express-fileupload';
import apiRoutes from './src/routes/Routes';

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

mongoose.Promise = global.Promise;
mongoose.connection.on("error", (error) => {
    console.log("Erro: " + error.message);
});

const server = express();
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(fileupload());

server.use(express.static(__dirname + '/public'));

server.use("/",apiRoutes);

server.listen(process.env.PORT, () =>{
    console.log("Servidor rodando em: "+ process.env.base);
});

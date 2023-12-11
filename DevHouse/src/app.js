//onde vai configurar o express
import express from "express";
import routes from "./routes.js";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";

//uso de classe é mais recomendado no backend
class App {
  constructor() {
    this.server = express();

    mongoose.connect(
      "mongodb+srv://yasmin075souza:12345@cluster0.yuzlvbp.mongodb.net/?retryWrites=true&w=majority"
    );

    this.middlewares();
    this.routes();
  }

  middlewares() {
    //always first
    this.server.use(cors());

    this.server.use(
      "/files",
      express.static(path.resolve(__dirname, "..", "uploads"))
    );
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;

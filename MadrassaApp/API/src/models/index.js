import mongoose from "mongoose";
import User from "./User.js";
import { config } from "dotenv";
import Dates from "./Dates.js";
// mongoose.connect('mongodb+srv://muhammad:Digimon03.@cluster0.dek5f6q.mongodb.net/quiz?retryWrites=true&w=majority&appName=Cluster0')

config();
mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log('connected to DB'))
.catch((e) => console.log(e))  

export const db = {
    User,
    Dates
}
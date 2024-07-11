import mongoose from "mongoose";

const dateSchema = new mongoose.Schema({
    dateToday: {
        type: String,
        unique: true
    },
    dayToday: {
        type: String
    }
});

export default mongoose.model('Date', dateSchema);
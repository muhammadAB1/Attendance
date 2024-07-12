import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
    attendance: {
        type: String,
    },
    dateToday: {
        type: String,
        default: new Date().toLocaleDateString("en-US", { day: '2-digit', month: 'long', year: 'numeric', timeZone: 'Asia/Karachi' })
    },
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    darja: {
        type: String,
        required: true,
    },
    attendance:[attendanceSchema],
    percentage: {
        type: Number
    }
    
});

export default mongoose.model('User', userSchema);
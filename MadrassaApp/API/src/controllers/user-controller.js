import express from 'express';
import { db } from '../models/index.js';


const userRoutes = express.Router();

userRoutes.get('/', async (req, res) => {
    const data = await db.User.find();
    res.json(data)
})

userRoutes.post('/post', async (req, res) => {
    try {
        const { name, darja } = req.body;
        const data = await db.User.create({
            name: name,
            darja: darja
        })
        res.json(data);
    } catch (error) {
        console.log(error)
    }
})
userRoutes.put('/postAttendance', async (req, res) => {
    const { name, darja, attendance } = req.body;

    const data = await db.User.findOne({ name: name, darja: darja })
    if (!data) {
        res.status(404).send('user not finded')
    }
    else {
        const user = data.attendance.find((d) => d.dateToday === attendance.dateToday);
        if (!user) {
            data.attendance.push(attendance)
            res.json(data)
            await data.save();
        }
        else {
            res.status(404).send('Attendace Already added')
        }
    }
})


userRoutes.put('/attendance', async (req, res) => {
    try {
        const students = req.body
        const response = []
        for (let i = 0; i < students.length; i++) {
            const data = await db.User.findOne({ name: students[i].name, darja: students[i].darja })
            if (!data) {
                response.push({ name: students[i].name, status: 'User not found' });
                continue;
            }

            else {
                const user = data.attendance.find((d) => d.dateToday === students[i].attendance.dateToday);
                if (!user) {
                    if (students[i].attendance.attendance === 'present' || students[i].attendance.attendance === 'absent') {
                        data.attendance.push(students[i].attendance)
                        response.push({ name: students[i].name, status: 'Attendance added' });
                        await data.save();
                    }
                }
                else {
                    response.push({ name: students[i].name, status: 'Attendance already added' });
                }
            }
        }

        res.json(response)

    } catch (error) {
        console.log(error)
    }

})

userRoutes.post('/calculate', async (req, res) => {
    const students = req.body;
    const response = []

    const calculatePercentage = (attendance) => {
        const totalDays = attendance.length;
        const presentDays = attendance.filter(att => att.attendance === 'present').length;
        const percentage = (presentDays / totalDays) * 100;
        return percentage.toFixed(2);
    };
    if (students.length === 0) {

    }
    for (let i = 0; i < students.length; i++) {
        const user = await db.User.findOne({ name: students[i].name, darja: students[i].darja });
        if (user) {
            const percentage = calculatePercentage(user.attendance);
            await db.User.updateOne({ name: students[i].name, darja: students[i].darja }, { percentage });
            response.push({ name: students[i].name, status: 'percentage added' });

        } else {
            response.push({ name: students[i].name, status: 'User not found' });
        }

    }
    res.json(response)

});

userRoutes.get('/attendances', async (req, res) => {
    try {
        const calculatePercentage = (attendance) => {
            const totalDays = attendance.length;
            if (totalDays === 0) {
                return 0;
            }
            else {
                const presentDays = attendance.filter(att => att.attendance === 'present').length;
                const percentage = (presentDays / totalDays) * 100;
                return percentage.toFixed(2);
            }
        };
        const data = await db.User.find();
        for (let index = 0; index < data.length; index++) {
            const percentage = calculatePercentage(data[index].attendance)
            await db.User.updateOne({ name: data[index].name, darja: data[index].darja }, { percentage });
        }
        res.json(data)
    } catch (error) {
        console.log(error)
    }
})


userRoutes.post('/postDate', async (req, res) => {
    try {
        const { date } = req.body;
        const data = await db.Dates.create({ dateToday: date })
        res.status(200).json(data)
    } catch (error) {
        res.json(error)
    }
})

userRoutes.get('/date', async (req, res) => {
    try {
        const data = await db.Dates.find();
        res.json(data)

    } catch (error) {
        res.json(error)
    }
})

userRoutes.post('/addDate', async (req, res) => {
    try {
        const { date, day } = req.body;
        const data = await db.Dates.create({
            dateToday: date,
            dayToday: day
        })
        res.json(data)
    } catch (error) {
        res.json(error)
    }
})

export default userRoutes;


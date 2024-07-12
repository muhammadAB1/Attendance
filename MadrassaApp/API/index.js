import express from 'express';
import cors from 'cors';
import userRoutes from './src/controllers/user-controller.js';

const PORT = 5000

const app = express();
app.use(cors())
app.use(express.json())
app.use('/user', userRoutes)

app.listen(PORT, () => {console.log('app listening on port 5000')});

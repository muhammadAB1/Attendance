import express from 'express';
import { db } from '../models/index.js';
const userRoutes = express.Router();
userRoutes.get('/', (req, res) => {
    const data = db.User.find();
    res.json(data);
});
export default userRoutes;
//# sourceMappingURL=user-controller.js.map
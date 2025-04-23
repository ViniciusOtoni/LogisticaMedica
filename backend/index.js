// backend/index.js
import express from 'express';
import cors from 'cors';
import userRouter from './routes/userRoutes.js';
import adminRouter from './routes/adminRoutes.js';
import createTables from './db/createTables.js';

const app = express();
const PORT = 3000;

app.use(cors());      
app.use(express.json());


app.use('/api/users', userRouter);
app.use('/api/admins', adminRouter);


createTables();

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});

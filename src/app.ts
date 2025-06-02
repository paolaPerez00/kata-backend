import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import userRoutes from './routes/userRoutes';
import digitalAccessRoutes from './routes/digitalAccessRoutes';
import assigmentRoutes from './routes/assigmentRoutes';
import deviceRoutes from './routes/deviceRoutes';

const app = express();

//Para restringir quien nos puede consultar
app.use(morgan('dev'));//para mostrar logs
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) =>{
    console.log('Hola mundo');
    res.json({ message: 'User routes working' });
})


app.use('/user', userRoutes);
app.use('/assignment', assigmentRoutes);
app.use('/digitalAccess', digitalAccessRoutes);
app.use('/device', deviceRoutes);

export default app;
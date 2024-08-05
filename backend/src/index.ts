import express, {Request, Response} from "express";
import cors from "cors";
import 'dotenv/config.js';
import mongoose from "mongoose";
import path from "path";
import {v2 as cloudinary} from "cloudinary";
import userRouter from './routes/user';
import authRouter from './routes/auth';
import projectRouter from './routes/project';


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

mongoose.connect(process.env.CONN_STR as string)
.then((con) => console.log("DB connected"))
.catch((err) => console.log(err))

const app = express();
const port = 9000

app.use((req, res, next) => {
    req.setTimeout(300000);  // Set timeout to 5 minutes (300000 ms)
    res.setTimeout(300000);  // Set timeout to 5 minutes (300000 ms)
    next();
  });
  

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));

//app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.use(express.static(path.join(__dirname, "../../frontend/dist")))

app.use('/api/user', userRouter )
app.use('/api/auth', authRouter)
app.use('/api/project', projectRouter)

//app.get("*", (req: Request, res: Response) => {
    //res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
//})

app.get('*', (req: Request, res: Response) => {
   res.sendFile(path.join(__dirname,"../../frontend/dist/index.html"))
})



app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
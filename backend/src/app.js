import express from "express"
import cookieParser from "cookie-parser"
import cors from 'cors'
import userRouter from './routes/user.routes.js'
import categoryRouter from "./routes/category.routes.js"
const app = express(); 

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json({
    limit:"16kb"
}))

app.use(express.urlencoded({
    extended:true,
    limit:"16kb"
}))

app.use(express.static("public"))
app.use(cookieParser())

app.use("/api/v1/users",userRouter);
app.use("/api/v1/category",categoryRouter);

export {app};
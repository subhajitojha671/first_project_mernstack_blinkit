# BACKEND DOCUMENTATION
## INSTALLATION
### install node js  to get node enviroment , by the we can use npm and npx
### intall moongoose , express 
### install  dotenv for setup .env file 
### install  cors for cross origin -->  Enables cross-origin requests between frontend and backend
### install jsonwebtoken to setup the token
### install bcrypt to encript and decript the password
### install cookiePaser for the set cookie 


## DB CONNECTION

### db connection code written into db/index.js
```js
import mongoose from "mongoose"  // here  moongose import for connect to db 
import { DB_NAME } from "../Constants.js" // db name where all documents will store

const connectDB =async ()=>{  // async await function used because it may be take  the time to connect
   // try catch used for error handling 
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGDB_URL}/${DB_NAME}`);
        console.log(`MongoDB connected : ${connectionInstance.connection.host}`)
    } catch (error) {
        console.error(error);
       
        process.exit(1);
        
    }
}
export default connectDB;

```
### app.js for setup 

```js

import express from "express"
import cookieParser from "cookie-parser"
import cors from 'cors'

const app = express();  //create server 

app.use(cors({ //enables  cors with conf , allow only those ip which assign into CORS_ORIGIN var
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({  // allow json data inside req.body
    limit:"16kb"
}))

app.use(express.urlencoded({  //parses form data via html form 
    extended:true,
    limit:"16kb"
}))

app.use(express.static("public"))//Serves static files from the public folder.
app.use(cookieParser())  //Enables cookie parsing now we can access cookies 

export {app};
```
## index.js

```js
import dotenv from "dotenv"
dotenv.config({path:"./.env"}) // config .env file now access env variable
import connectDB from "./db/index.js"
import {app} from './app.js'

connectDB().then(()=>{ //if connected db connected then server start by listening  particular port
    app.listen(process.env.PORT || 8000 ,()=>{
        console.log("server connected", process.env.PORT)
    })

}).catch((error)=>{
    console.log(error);
})



```


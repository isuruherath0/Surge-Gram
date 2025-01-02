import Express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/index.routes.js";


const app = Express();
dotenv.config();

const port = process.env.PORT || 3000;

//MIDDLEWARE
app.use(cors());
app.use(Express.json({limit: '100mb'}));
app.use(Express.urlencoded({extended: true}));


app.get('/', (req, res) => {
  res.send('Hello World');
});

//ROUTES
app.use("/api/v1", router);




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
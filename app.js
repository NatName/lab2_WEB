import express    from 'express';
import router     from './router';
import bodyParser from 'body-parser';
import path       from 'path';
import cors       from 'cors';

const app = express();

app.use("*",cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
  }));

app.set('views', path.join(__dirname, 'views'));
app.use("/assets", express.static("./views/public"));
app.set('view engine', 'ejs');

app.use(router);

const port = process.env.PORT ? process.env.PORT : 3000; 
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})



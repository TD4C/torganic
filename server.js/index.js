const path = require('path');
const express = require('express');
const app = express();
const port = 3000;
const morgan = require('morgan');
const hbs = require('express-handlebars');
const route = require('../src/routes');
const db = require('../src/config/db/db');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { default: mongoose } = require('mongoose');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const hbsHelpers = require('../src/util/handlebars');
db.connect();
app.engine(
    'hbs',
    hbs.engine({
        extname: '.hbs',
        partialsDir: path.join(__dirname, '../src/resources/views/partials'),
        helpers: hbsHelpers, // Gắn helper vào đây
    }),
);

app.set('view engine', 'hbs');
app.use(morgan('combined'));
app.set('views', path.join(__dirname, '../src/resources/views'));
app.use(express.static(path.join(__dirname, '../public')));

route(app);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

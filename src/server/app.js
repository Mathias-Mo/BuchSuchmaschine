const express = require('express');
const bp = require('body-parser');
const path = require('path');
const app = express();
const searchRoute = require('./routes/book_searches');

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../../public')));
app.use('/', searchRoute);

const PORT = 8080;

app.listen(PORT);
console.log("server started");
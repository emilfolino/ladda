const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

const posts = require("./routes/posts.js");
const bookings = require("./routes/bookings.js");
const auth = require("./routes/auth.js");

require('dotenv').config();

const port = 8345;

app.use(cors());
app.options('*', cors());

app.disable('x-powered-by');

app.set("view engine", "ejs");

// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/posts", posts);
app.use("/bookings", bookings);
app.use("/", auth);

app.get('/', (req, res) => {
    res.redirect('/documentation.html');
});

const server = app.listen(port, () => {
    console.log('auth api listening on port ' + port);
});

module.exports = server;

const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
/* path is a core node.js module to deal with files */
const path = require('path');
const Sequelize = require('sequelize');
// Database
const db = require('./config/database');
const PORT = process.env.PORT || 5000;
const app = express();

//Handlebars (a template engine)
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Body parser
app.use(bodyParser.urlencoded({extended: false}));

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Test db
db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err))

/*
Index route (use a differnt layout from 'main'
request, respond
 */
app.get('/', (req, res) => res.render('index', {layout: 'landing'}));

//Gig routes
app.use('/gigs', require('./routes/gigs'));

app.listen(PORT, console.log(`Server started on port ${PORT}`));
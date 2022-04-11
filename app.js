
const sql = require('mssql/msnodesqlv8');
const bodyParser = require('body-parser');
const passport = require('passport');

config = require('./config/passport')(passport);

const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
//const MssqlStore = require ('mssql-session-store')(session);

const express = require('express');
var app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(session({
    secret: '991E6B44882C4593A46C0DDFCA23E06A',
    resave: true,
    saveUninitialized: true,
}))



app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use ((req, res, next) => {
    res.locals.success_msg = req.flash('seccess_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();

})

app.use(express.static(path.join(__dirname, 'public')));

const userRoutes = require('./routes/user');
const officeRoutes = require('./routes/office');
//database configuration
var config={
    user: 'mo',
    password: 'database',
    database: 'Project_step3',
    server: 'DESKTOP-IBHKMGQ',
    driver: 'msnodesqlv8',
    options: {
        trustedConnection: true
    }
};

sql.connect(config, function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log('connected successfully.');
        // app.use(session({
        //     secret: '991E6B44882C4593A46C0DDFCA23E06A',
        //     resave: false,
        //     saveUninitialized: false,
        //     store: new MssqlStore({ reapInterval: 10, ttl: 10 })
        // }))
    }
})

app.use(bodyParser.urlencoded({ extended: false }));

app.use(userRoutes);
app.use(officeRoutes);

app.use((error, req, res, next) => {
    // res.status(error.httpStatusCode).render(...);
    // res.redirect('/500');
    console.log(error);
    res.status(500).send('error handeler');
  });

var server = app.listen(4000, function () {
    console.log('Server is running..');
});
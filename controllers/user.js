const sql = require('mssql/msnodesqlv8');
const passport = require('passport');

exports.getLogin = (req, res, next) => {
        res.render('login');
};

exports.findLawyer = (req, res, next) => {
    const name = req.body.fname;
    console.log(name);
    const lastname = req.lname;
    var request = new sql.Request();

    request.query(`select * from lawyer where firstname='${name}'`, function(err, recordSet){
            if(err){
                console.log(err);
               }
            else{
                let test = recordSet.recordsets[0][0].ssn
                //console.log(recordSet);
                res.send(test.toString());
            }
        });
};

exports.postLogin = (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;
    console.log('we are here');

    // passport.authenticate('local',{
    //     successRedirect : '/dashboard',
    //     failureRedirect: '/login',
    //     failureFlash: true
    // })(req, res, next);



    passport.authenticate('local', {failureFlash: true},function(err, account, info) {
      if(err){
          return next(err);
      }

      
      if(!account){
          return res.render('login',{ error_msg: info.message});
      }

      req.login(account, function(err){
        if(err){
            return next(err);
        }
        return res.redirect('/dashboard');
      })
    })(req, res, next);

}

exports.getDashboard = (req, res, next) => {
    const title = 'dashboard';

    var request = new sql.Request();

    request.query(`select count(*) nOfCases from Cases
                   select count(*) nOfClients from Client
                   select count(*) nOfLawyers from Lawyer
                   select * from cases order by date desc
                   select top(1) id from cases order by date desc
                   select distinct crimeType from cases
                   select distinct location from cases`,
                    function(err, recordSet){
            if(err){
                console.log(err);
               }
            else{
                //console.log((recordSet.recordsets[0][0]).nOfCases);
                let nOfCases = (recordSet.recordsets[0][0]).nOfCases;
                let nOfClients = (recordSet.recordsets[1][0]).nOfClients;
                let nOfLawyers = (recordSet.recordsets[2][0]).nOfLawyers;
                let latestCrime = (recordSet.recordsets[3][0]).id;
                let crimeTypes = recordSet.recordsets[5];
                let locations = recordSet.recordsets[6];

                res.render('dashboard',{ title: title,
                    nOfCases: nOfCases,
                    nOfClients: nOfClients,
                    nOfLawyers: nOfLawyers,
                    latestCrime: latestCrime,
                    crimeTypes: crimeTypes,
                    locations: locations
                    });
            }
        });

    
} 

exports.getLogout = (req, res, next) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/login');
}
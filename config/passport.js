const sql = require('mssql/msnodesqlv8');
const localStrategy = require('passport-local').Strategy;

const Strategy = function(passport){
    passport.use(
        new localStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        ( email, password, done) => {
            
            //return done(null, {id: 1});

            var request = new sql.Request();
            
            request.query(`select * from users where email='${email}' and password='${password}'`, function(err, recordSet){
                if(err){
                    console.log(err);
                    }
                else{
                    
                    if(recordSet.recordsets[0].length == 0){
                        return done(null, false, {message:'invalid username or password'});
                    }
                    else{
                        return done(null,recordSet.recordsets[0][0] );
                        
                    }
                }
            });
        }
        )

    );

    passport.serializeUser(function(account, done) {

        done(null, account.email); 
    });
    
    // used to deserialize the user
    passport.deserializeUser(function(email, done) {
        
        var request = new sql.Request();
        request.query(`select * from users where email='${email}'`, function(err, recordSet){
            if(err){
                console.log(err);
               }
            else{
                
                return done(null,recordSet.recordsets[0][0] );
            }
        });

    });


}

module.exports = Strategy;
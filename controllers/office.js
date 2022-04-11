const sql = require('mssql/msnodesqlv8');


///////////////////////////////// Cases ///////////////////////////////////////////////

exports.getCases = (req, res, next) => {
    var request = new sql.Request();

    request.query(`select id, cast(date as varchar) date, crimeType, location, yearsSince from cases`, function(err, recordSet){
            if(err){
                console.log(err);
               }
            else{
                let cases = recordSet.recordsets[0];
               // console.log(cases);
                res.render('cases',{
                    cases: cases,
                    title: 'cases'
                });
            }
        });
   
};

exports.deleteCase = (req, res, next) => {
    const id = req.params.id;
    var request = new sql.Request();

    request.query(`delete from cases where id=${id}`, function(err, recordSet){
            if(err){
                console.log(err);
                res.send({
                    msg: 'error'
                });
               }
            else{
                let cases = recordSet.recordsets[0];
               // console.log(cases);
               res.send({
                msg: 'deleted'
            });
            }
        });
};

exports.getEditCase = (req, res, next) => {
    const editMode = req.query.edit;
    const id = req.params.id;
    var request = new sql.Request();

    request.query(`select id, cast(date as varchar) date, crimeType, location, yearsSince from cases where id=${id}`, function(err, recordSet){
            if(err){
                console.log(err);
               
               }
            else{
                let cases = recordSet.recordsets[0][0];
                console.log(cases);
                console.log('we got the product to be deleted');
                res.render('edit',{ editing: editMode, cases: cases, title: 'cases'});
            }
        });
}

exports.postEditCase = (req, res, next) => {
    const id = req.params.id;
    console.log(id);
    const date = req.body.date;
    const crimeType = req.body.crimeType;
    const location = req.body.location;

    var request = new sql.Request();

    request.query(`UPDATE Cases
    SET date= cast('${date}' as date)  , crimeType= '${crimeType}' ,location='${location}'
    WHERE id= ${id}`, function(err, recordSet){
            if(err){
                console.log(err);
               
               }
            else{
                
                console.log('updated successfully!');
                res.redirect('/getCases');
                    }
        });
};

exports.getAddCase = (req, res, next) => {
    res.render('edit', {title: 'cases'});
}
exports.postAddCase = (req, res, next) => {
    const date = req.body.date;
    //console.log(date);
    const crimeType = req.body.crimeType;
    const location = req.body.location;
    console.log(location);
    var request = new sql.Request();
    request.query(`declare @idd  int
    set @idd= ((select  top(1) id from Cases
    order by id desc)+1)
    INSERT INTO Cases(id,date,crimeType, location)
    VALUES (@idd,cast('${date}' as date), '${crimeType}', '${location}');`, function(err, recordSet){
        if(err){
            console.log(err);
           
           }
        else{
            var request = new sql.Request();

            request.query(`select id, cast(date as varchar) date, crimeType, location, yearsSince from cases`, function(err, recordSet){
                    if(err){
                        console.log(err);
                       }
                    else{
                        let cases = recordSet.recordsets[0];
                       // console.log(cases);
                        res.redirect('/getCases');
                    }
                });
        }
    });
}

////////////////////////////////// Criminals ////////////////////////////////////////

exports.getCriminals = (req, res, next) => {
    var request = new sql.Request();

    request.query(`select ssn, firstName, lastName, cast(birthDate as varchar) birthDate, age, gender, nationality, sentenceID from Criminal`, function(err, recordSet){
            if(err){
                console.log(err);
               }
            else{
                let Criminals = recordSet.recordsets[0];
               // console.log(cases);
                res.render('criminals',{
                    criminals: Criminals,
                    title: 'criminals'
                });
            }
        });
}

exports.getEditCriminal= (req, res, next) => {
    //const editMode = req.query.edit;
    const ssn = req.params.ssn;
    var request = new sql.Request();

    request.query(`select ssn, firstName, lastName, cast(birthDate as varchar) birthDate, age, gender, nationality, sentenceID from Criminal where ssn='${ssn}'`, function(err, recordSet){
            if(err){
                console.log(err);
               
               }
            else{
                let criminal = recordSet.recordsets[0][0];
                console.log(criminal);
                console.log('we got the product to be deleted');
                res.render('editCriminal',{  criminal: criminal, title: 'criminals'});
            }
        });
}

exports.postEditCriminal = (req, res, next) => {
    const ssn = req.params.ssn;
    console.log(ssn);
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const birthDate = req.body.birthDate;
    const age = req.body.age;
    const gender = req.body.gender;
    const nationality = req.body.nationality;
    const sentenceID = req.body.sentenceID;

    var request = new sql.Request();

    request.query(`UPDATE criminal
    SET firstName= '${firstName}'  , lastName='${lastName}', gender='${gender}', nationality='${nationality}', sentenceID=${sentenceID} 
    WHERE ssn= ${ssn}`, function(err, recordSet){
            if(err){
                console.log(err);
               
               }
            else{
                
                console.log('updated successfully!');
                res.redirect('/getCriminals');  
                
                }
        });
};

exports.deleteCriminal = (req, res, next) => {
    const ssn = req.params.ssn;
    console.log('here is my ssn');
    console.log(ssn);
    var request = new sql.Request();

    request.query(`delete from criminal where ssn=${ssn}`, function(err, recordSet){
            if(err){
                console.log(err);
                res.send({
                    msg: 'error'
                });
               }
            else{
                let cases = recordSet.recordsets[0];
               // console.log(cases);
               res.send({
                msg: 'deleted'
            });
            }
        });
};

exports.getAddCriminal = (req, res, next) => {
    res.render('editCriminal',{title: 'criminals'});
}

exports.postAddCriminal = (req, res, next) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const birthDate = req.body.birthDate;
    const gender = req.body.gender;
    const nationality = req.body.nationality;
    const sentenceID = req.body.sentenceID;

    console.log(sentenceID);
    console.log(`declare @ssn  int
    set @ssn= ((select  top(1) ssn from criminal
    order by ssn desc)+1)
    INSERT INTO Criminal(ssn,firstName,lastName, birthDate, gender, nationality, sentenceID)
    VALUES (@ssn,'${firstName}', '${lastName}', cast('${birthDate}' as date), '${gender}', '${nationality}', ${sentenceID});`);


    var request = new sql.Request();
    request.query(`declare @ssn  int
    set @ssn= ((select  top(1) ssn from criminal
    order by ssn desc)+1)
    INSERT INTO Criminal(ssn,firstName,lastName, birthDate, gender, nationality, sentenceID)
    VALUES (@ssn,'${firstName}', '${lastName}', cast('${birthDate}' as date), '${gender}', '${nationality}', ${sentenceID});`, function(err, recordSet){
        if(err){
            console.log(req.body) ;
            console.log('get an error from mssql');
            console.log(err);
           
           }
        else{
            var request = new sql.Request();

            request.query(`select ssn, firstName, lastName, cast(birthDate as varchar) birthDate, age, gender, nationality, sentenceID from Criminal`, function(err, recordSet){
                    if(err){
                        console.log(err);
                       }
                    else{
                        let Criminals = recordSet.recordsets[0];
                        //console.log(criminals);
                       // console.log(cases);
                        res.redirect('/getCriminals');
                    }
                });   
        }
    });
}

///////////////////////// Lawyers /////////////////////////////////////////////////////

exports.getLawyers = (req, res, next) => {
    var request = new sql.Request();

    request.query(`select * from lawyer`, function(err, recordSet){
            if(err){
                console.log(err);
               }
            else{
                let lawyers = recordSet.recordsets[0];
               // console.log(cases);
                res.render('lawyers',{
                    lawyers: lawyers,
                    title: 'lawyers'
                });
            }
        });
}

exports.getEditLawyer= (req, res, next) => {
    //const editMode = req.query.edit;
    const ssn = req.params.ssn;
    var request = new sql.Request();

    request.query(`select * from lawyer where ssn=${ssn}`, function(err, recordSet){
            if(err){
                console.log(err);
               
               }
            else{
                let lawyer = recordSet.recordsets[0][0];
                console.log(lawyer);
                console.log('we got the lawyer to be edited');
                res.render('editLawyer',{  lawyer: lawyer, title: 'lawyers'});
            }
        });
}

exports.postEditLawyer = (req, res, next) => {
    const ssn = req.params.ssn;
    console.log(ssn);
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const bureau = req.body.bureau;
    const city = req.body.city;
    const street = req.body.street;

    var request = new sql.Request();

    request.query(`UPDATE lawyer
    SET firstname= '${firstname}'  , lastname='${lastname}', bureau='${bureau}', city='${city}', street='${street}' 
    WHERE ssn= ${ssn}`, function(err, recordSet){
            if(err){
                console.log(err);
               
               }
            else{
                
                console.log('updated successfully!');
                res.redirect('/getLawyers');
                }
        });
};

exports.deleteLawyer = (req, res, next) => {
    const ssn = req.params.ssn;
    console.log('here is my ssn');
    console.log(ssn);
    var request = new sql.Request();

    request.query(`delete from lawyer where ssn=${ssn}`, function(err, recordSet){
            if(err){
                console.log(err);
                res.send({
                    msg: 'error'
                });
               }
            else{
                let lawyer = recordSet.recordsets[0];
               // console.log(cases);
               res.send({
                msg: 'deleted'
            });
            }
        });
};

exports.getAddLawyer = (req, res, next) => {
    res.render('editLawyer',{title: 'lawyers'});
}

exports.postAddLawyer = (req, res, next) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const bureau = req.body.bureau;
    const city = req.body.city;
    const street = req.body.street;



    var request = new sql.Request();
    request.query(`declare @ssn  int
    set @ssn= ((select  top(1) ssn from lawyer
    order by ssn desc)+1)
    INSERT INTO lawyer(ssn,firstname,lastname, bureau, city, street)
    VALUES (@ssn,'${firstname}', '${lastname}', '${bureau}', '${city}', '${street}');`, function(err, recordSet){
        if(err){
            console.log('get an error from mssql');
            console.log(err);
           
           }
        else{
            var request = new sql.Request();

            request.query(`select * from lawyer`, function(err, recordSet){
                    if(err){
                        console.log(err);
                       }
                    else{
                        let lawyers = recordSet.recordsets[0];
                        //console.log(criminals);
                       // console.log(cases);
                        res.redirect('/getLawyers');
                    }
                });   
        }
    });
}

/////////////////////// Clients ////////////////////////////////////

exports.getClients = (req, res, next) => {
    var request = new sql.Request();

    request.query(`select * from client`, function(err, recordSet){
            if(err){
                console.log(err);
               }
            else{
                let clients = recordSet.recordsets[0];
               // console.log(cases);
                res.render('clients',{
                    clients: clients,
                    title: 'clients'
                });
            }
        });
}

exports.getEditClient= (req, res, next) => {
    //const editMode = req.query.edit;
    const ssn = req.params.ssn;
    var request = new sql.Request();

    request.query(`select * from client where ssn=${ssn}`, function(err, recordSet){
            if(err){
                console.log(err);
               
               }
            else{
                let clientt = recordSet.recordsets[0][0];
                console.log(clientt);
                console.log('we got the client to be edited');
                res.render('editClient',{  clientt: clientt, title: 'clients'});
            }
        });
}

exports.postEditClient = (req, res, next) => {
    const ssn = req.params.ssn;
    console.log(ssn);
    const firstname = req.body.firstName;
    const lastname = req.body.lastName;
    const city = req.body.city;
    const street = req.body.street;

    var request = new sql.Request();

    request.query(`UPDATE client
    SET firstName= '${firstname}'  , lastName='${lastname}', city='${city}', street='${street}' 
    WHERE ssn= ${ssn}`, function(err, recordSet){
            if(err){
                console.log(err);
               
               }
            else{
                
                console.log('updated successfully!');
                res.redirect('/getClients');
                }
        });
};

exports.deleteClient = (req, res, next) => {
    const ssn = req.params.ssn;
    console.log('here is my ssn');
    console.log(ssn);
    var request = new sql.Request();

    request.query(`delete from client where ssn=${ssn}`, function(err, recordSet){
            if(err){
                console.log(err);
                return res.send({
                    msg: 'error'
                });
               }
            else{
                let client = recordSet.recordsets[0];
               // console.log(cases);
               return res.send({
                msg: 'deleted'
            });
            }
        });
};

exports.getAddClient= (req, res, next) => {
    res.render('editClient',{title: 'clients'});
}

exports.postAddClient = (req, res, next) => {
    const firstname = req.body.firstName;
    const lastname = req.body.lastName;
    const city = req.body.city;
    const street = req.body.street;



    var request = new sql.Request();
    request.query(`declare @ssn  int
    set @ssn= ((select  top(1) ssn from client
    order by ssn desc)+1)
    INSERT INTO client(ssn,firstName,lastName, city, street)
    VALUES (@ssn,'${firstname}', '${lastname}', '${city}', '${street}');`, function(err, recordSet){
        if(err){
            console.log('get an error from mssql');
            console.log(err);
           
           }
        else{
            var request = new sql.Request();

            request.query(`select * from client`, function(err, recordSet){
                    if(err){
                        console.log(err);
                       }
                    else{
                        let clients = recordSet.recordsets[0];
                        //console.log(criminals);
                       // console.log(cases);
                        res.redirect('/getClients');
                    }
                });   
        }
    });
}

////////////////////////////////// Judges ////////////////////////////////////////

exports.getJudges = (req, res, next) => {
    var request = new sql.Request();

    request.query(`select ssn, firstname, lastname, cast(birthdate as varchar) birthdate, age, courtname from judge`, function(err, recordSet){
            if(err){
                console.log(err);
               }
            else{
                let judges = recordSet.recordsets[0];
               // console.log(cases);
                res.render('judges',{
                    judges: judges,
                    title: 'judges'
                });
            }
        });
}

exports.getEditJudge= (req, res, next) => {
    //const editMode = req.query.edit;
    const ssn = req.params.ssn;
    var request = new sql.Request();

    request.query(`select ssn, firstname, lastname, cast(birthDate as varchar) birthdate, age, courtname from judge where ssn='${ssn}'
                    select name from court`, function(err, recordSet){
            if(err){
                console.log(err);
               
               }
            else{
                let judge = recordSet.recordsets[0][0];
                let courtnames = recordSet.recordsets[1];

                console.log(judge);
                console.log('we got the judge to be deleted');
                res.render('editJudge',{  judge: judge, title: 'judges', courtnames: courtnames});
            }
        });
}

exports.postEditJudge = (req, res, next) => {
    const ssn = req.params.ssn;
    console.log(ssn);
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const birthdate = req.body.birthdate;
    const age = req.body.age;
    const courtname = req.body.courtname;

    var request = new sql.Request();

    request.query(`UPDATE judge
    SET firstname= '${firstname}'  , lastname='${lastname}', birthdate='${birthdate}', courtname='${courtname}' 
    WHERE ssn= ${ssn}`, function(err, recordSet){
            if(err){
                console.log(err);
               
               }
            else{
                
                console.log('updated successfully!');
                res.redirect('/getJudges');  
                
                }
        });
};

exports.deleteJudge = (req, res, next) => {
    const ssn = req.params.ssn;
    console.log('here is my ssn');
    console.log(ssn);
    var request = new sql.Request();

    request.query(`delete from judge where ssn=${ssn}`, function(err, recordSet){
            if(err){
                console.log(err);
                res.send({
                    msg: 'error'
                });
               }
            else{
                let judge = recordSet.recordsets[0];
               // console.log(cases);
               res.send({
                msg: 'deleted'
            });
            }
        });
};

exports.getAddJudge = (req, res, next) => {
    var request = new sql.Request();
    request.query(`select name from court`, function(err, recordSet){
        if(err){

            console.log(err);
           
           }
        else{
            const courtnames = recordSet.recordsets[0];
            console.log(courtnames);
            res.render('editJudge',{title: 'judges', courtnames: courtnames});                
        }
    });
    
}

exports.postAddJudge = (req, res, next) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const birthdate = req.body.birthdate;
    const courtname = req.body.courtname;
    console.log(req.body);

    var request = new sql.Request();
    request.query(`
    declare @ssn  int
    set @ssn= ((select  top(1) ssn from judge
    order by ssn desc)+1)
    INSERT INTO judge(ssn,firstname,lastname, birthdate, courtname)
    VALUES (@ssn,'${firstname}', '${lastname}', cast('${birthdate}' as date), '${courtname}');`, function(err, recordSet){
        if(err){

            console.log(err);
           
           }
        else{
            res.redirect('/getJudges');
                
        }
    });
}

////////////////////////////////// Courts ////////////////////////////////////////

exports.getCourts = (req, res, next) => {
    var request = new sql.Request();

    request.query(`select * from court`, function(err, recordSet){
            if(err){
                console.log(err);
               }
            else{
                let courts = recordSet.recordsets[0];
               // console.log(cases);
                res.render('courts',{
                    courts: courts,
                    title: 'courts'
                });
            }
        });
}

exports.getEditCourt= (req, res, next) => {
    //const editMode = req.query.edit;
    const Name = req.params.Name;
    var request = new sql.Request();

    request.query(`select * from court where Name='${Name}'`, function(err, recordSet){
            if(err){
                console.log(err);
               
               }
            else{
                let court = recordSet.recordsets[0][0];

                console.log(court);
                console.log('we got the court to be deleted');
                res.render('editCourt',{  court: court, title: 'courts'});
            }
        });
}

exports.postEditCourt = (req, res, next) => {
    const namee = req.params.Name;
    const Name = req.body.Name;
    const Location = req.body.Location;
    console.log(namee, Name, Location);
    var request = new sql.Request();

    request.query(`UPDATE court
    SET Name= '${Name}'  , Location='${Location}'
    WHERE Name= '${namee}'`, function(err, recordSet){
            if(err){
                console.log(err);
               
               }
            else{
                
                console.log('updated successfully!');
                res.redirect('/getCourts');  
                
                }
        });
};

exports.deleteCourt = (req, res, next) => {
    const Name = req.params.Name;
    console.log('here is my ssn');
    console.log(Name);
    var request = new sql.Request();

    request.query(`delete from court where Name='${Name}'`, function(err, recordSet){
            if(err){
                console.log(err);
                res.send({
                    msg: 'error'
                });
               }
            else{
                let court = recordSet.recordsets[0];
               // console.log(cases);
               res.send({
                msg: 'deleted'
            });
            }
        });
};

exports.getAddCourt = (req, res, next) => {
    res.render('editCourt',{title: 'courts'});
    
}

exports.postAddCourt = (req, res, next) => {
    const Name = req.body.Name;
    const Location = req.body.Location;
    console.log(req.body);

    var request = new sql.Request();
    request.query(`
    INSERT INTO court(Name, Location)
    VALUES ('${Name}', '${Location}');`, function(err, recordSet){
        if(err){

            console.log(err);
           
           }
        else{
            res.redirect('/getCourts');
                
        }
    });
}


////////////////////////////////// Sentences ////////////////////////////////////////

exports.getSentences = (req, res, next) => {
    var request = new sql.Request();

    request.query(`select * from sentence`, function(err, recordSet){
            if(err){
                console.log(err);
               }
            else{
                let sentences = recordSet.recordsets[0];
               // console.log(cases);
                res.render('sentences',{
                    sentences: sentences,
                    title: 'sentences'
                });
            }
        });
}

exports.getEditSentence= (req, res, next) => {
    //const editMode = req.query.edit;
    const id = req.params.id;
    var request = new sql.Request();

    request.query(`select * from  sentence where id='${id}'
                    select ssn from judge`, function(err, recordSet){
            if(err){
                console.log(err);
               
               }
            else{
                let sentence = recordSet.recordsets[0][0];
                let judgeIds = recordSet.recordsets[1];

                console.log(judgeIds);
                console.log('we got the judge to be deleted');
                res.render('editSentence',{  sentence: sentence, title: 'sentences', judgeIds: judgeIds});
            }
        });
}

exports.postEditSentence = (req, res, next) => {
    const id = req.params.id;
    console.log(id);
    const duration = req.body.duration;
    const judgeId = req.body.judgeId;
    const isPerpetual = duration == -1 ? 1 : 0 ;
    console.log(duration, judgeId);

    var request = new sql.Request();

    request.query(`UPDATE sentence
    SET duration= ${duration}  , judgeId=${judgeId}, isPerpetual= ${isPerpetual}
    WHERE id= ${id}`, function(err, recordSet){
            if(err){
                console.log(err);
               
               }
            else{
                
                console.log('updated successfully!');
                res.redirect('/getSentences');  
                
                }
        });
};

exports.deleteSentence = (req, res, next) => {
    const id = req.params.id;
    console.log('here is my ssn');
    console.log(id);
    var request = new sql.Request();

    request.query(`delete from sentence where id=${id}`, function(err, recordSet){
            if(err){
                console.log(err);
                res.send({
                    msg: 'error'
                });
               }
            else{
                let judge = recordSet.recordsets[0];
               // console.log(cases);
               res.send({
                msg: 'deleted'
            });
            }
        });
};

exports.getAddSentence = (req, res, next) => {
    var request = new sql.Request();
    request.query(`select ssn from judge`, function(err, recordSet){
        if(err){

            console.log(err);
           
           }
        else{
            const judgeIds = recordSet.recordsets[0];
            console.log(judgeIds);
            res.render('editSentence',{title: 'sentences', judgeIds: judgeIds});                
        }
    });
    
}

exports.postAddSentence = (req, res, next) => {
    const duration = req.body.duration;
    const isPerpetual = duration == -1 ? 1 : 0 ;
    const judgeId = req.body.judgeId;

    var request = new sql.Request();
    request.query(`
    declare @id  int
    set @id= ((select  top(1) id from sentence
    order by id desc)+1)
    INSERT INTO sentence(id,duration,isPerpetual, judgeId)
    VALUES (@id,${duration}, ${isPerpetual}, ${judgeId});`, function(err, recordSet){
        if(err){

            console.log(err);
           
           }
        else{
            res.redirect('/getSentences');
                
        }
    });
}




/////////////////////////////////////////////// Search /////////////////////////////////////////
//////////////////////////////////////////////  Search ////////////////////////////////////////

exports.postSearch = (req, res, next) => {
    const crimeType = req.body.crimeType ? req.body.crimeType : '%';
    const crimeLocation = req.body.crimeLocation ? req.body.crimeLocation : '%';
    const crimeDate = req.body.crimeDate ? req.body.crimeDate : '01-01-1800';

    console.log(crimeType, crimeDate, crimeLocation);
    var request = new sql.Request();
    request.query(`
    select  distinct ca.id, cr.firstName+cr.lastName as 'fullname', ca.crimeType, ca.location, cr.nationality, l.firstname as 'lawyerName' , s.duration, cast(ca.date as varchar) date from
    cases ca left outer join CriminalCase cc on ca.id= cc.caseID left outer join Criminal cr on cc.criminalSSN= cr.ssn
    left outer join LawyerCase lc on ca.id=lc.case_id left outer join Lawyer l on lc.lawyerSSN = l.ssn left outer join Sentence s on cr.sentenceID=s.id
    where ca.crimeType like '${crimeType}' and ca.location like'${crimeLocation}' and ca.date > '${crimeDate}' 

    `, function(err, recordSet){
        if(err){

            console.log(err);
           
           }
        else{
            const result= (recordSet.recordsets[0]);
            res.send(result);
                
        }
    });


}
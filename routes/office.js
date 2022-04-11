const express = require('express');

const {ensureAuthenticated} = require('../config/auth')
const router = express.Router();
const officeController = require('../controllers/office');

router.get('/getCases', ensureAuthenticated ,officeController.getCases);
router.post('/cases/:id/delete', ensureAuthenticated ,officeController.deleteCase);
router.get('/editCase/:id', ensureAuthenticated ,officeController.getEditCase);
router.post('/editCase/:id', ensureAuthenticated ,officeController.postEditCase);
router.get('/cases/add', ensureAuthenticated ,officeController.getAddCase);
router.post('/addCase', ensureAuthenticated ,officeController.postAddCase);

router.get('/getCriminals', ensureAuthenticated ,officeController.getCriminals);
router.get('/editCriminal/:ssn', ensureAuthenticated ,officeController.getEditCriminal);
router.post('/editCriminal/:ssn', ensureAuthenticated ,officeController.postEditCriminal);
router.post('/criminals/:ssn/delete', ensureAuthenticated ,officeController.deleteCriminal);
router.get('/criminals/add', ensureAuthenticated ,officeController.getAddCriminal);
router.post('/addCriminal', ensureAuthenticated ,officeController.postAddCriminal);

router.get('/getLawyers', ensureAuthenticated ,officeController.getLawyers);
router.get('/editLawyer/:ssn', ensureAuthenticated ,officeController.getEditLawyer);
router.post('/editLawyer/:ssn', ensureAuthenticated ,officeController.postEditLawyer);
router.post('/lawyers/:ssn/delete', ensureAuthenticated ,officeController.deleteLawyer);
router.get('/lawyers/add', ensureAuthenticated ,officeController.getAddLawyer);
router.post('/addLawyer', ensureAuthenticated ,officeController.postAddLawyer);

router.get('/getClients', ensureAuthenticated ,officeController.getClients);
router.get('/editClient/:ssn', ensureAuthenticated ,officeController.getEditClient);
router.post('/editClient/:ssn', ensureAuthenticated ,officeController.postEditClient);
router.post('/clients/:ssn/delete', ensureAuthenticated ,officeController.deleteClient);
router.get('/clients/add', ensureAuthenticated ,officeController.getAddClient);
router.post('/addClient', ensureAuthenticated ,officeController.postAddClient);

router.get('/getJudges', ensureAuthenticated ,officeController.getJudges);
router.get('/editJudge/:ssn', ensureAuthenticated ,officeController.getEditJudge);
router.post('/editJudge/:ssn', ensureAuthenticated ,officeController.postEditJudge);
router.post('/judges/:ssn/delete', ensureAuthenticated ,officeController.deleteJudge);
router.get('/judges/add', ensureAuthenticated ,officeController.getAddJudge);
router.post('/addJudge', ensureAuthenticated ,officeController.postAddJudge);

router.get('/getCourts', ensureAuthenticated ,officeController.getCourts);
router.get('/editCourt/:Name', ensureAuthenticated ,officeController.getEditCourt);
router.post('/editCourt/:Name', ensureAuthenticated ,officeController.postEditCourt);
router.post('/courts/:Name/delete', ensureAuthenticated ,officeController.deleteCourt);
router.get('/courts/add', ensureAuthenticated ,officeController.getAddCourt);
router.post('/addCourt', ensureAuthenticated ,officeController.postAddCourt);

router.get('/getSentences', ensureAuthenticated ,officeController.getSentences);
router.get('/editSentence/:id', ensureAuthenticated ,officeController.getEditSentence);
router.post('/editSentence/:id', ensureAuthenticated ,officeController.postEditSentence);
router.post('/sentences/:id/delete', ensureAuthenticated ,officeController.deleteSentence);
router.get('/sentences/add', ensureAuthenticated ,officeController.getAddSentence);
router.post('/addSentence', ensureAuthenticated ,officeController.postAddSentence);

router.post('/search', ensureAuthenticated ,officeController.postSearch);



module.exports = router;
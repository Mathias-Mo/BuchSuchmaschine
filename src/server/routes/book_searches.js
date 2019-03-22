const dumpService = require('../services/db/search/dumpSearchResult');

module.exports = (function() {
    const router = require ('express').Router();

    router.post('/submit-form', function(req, res) {
        dumpService.call(req.body).then(rows => res.send(rows)).catch(err => console.log(err));    
    });

    router.post('/autocomplete/title', function(req, res) {
        dumpService.getAutoComplete("title", req.body.value).then(result => res.send(result)).catch(err => console.log(err));
    });
    
    router.post('/autocomplete/authors', function(req, res) {
        dumpService.getAutoComplete("authors", req.body.value).then(result => res.send(result)).catch(err => console.log(err));
    });

    return router;
})();



/*
const router = require ('express').Router();

router.post('/submit-form', function(req, res) {
    //dumpService.call().then(rows => res.send(rows)).catch(err => console.log(err));
    console.log(req.body);
    res.status(204).send();
});

    
exports.router;
*/
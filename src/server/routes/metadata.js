const dumpService = require('../services/db/dbMetadata');

module.exports = (function() {
    const router = require ('express').Router();

    router.get('/get_column_names/:id', function(req, res) {
        //console.log(req);
        dumpService.getColumnNames(req.params.id).then(result => res.send(result)).catch(err => console.log(err));
    });   
    
    router.get('/get_tables', function(req, res) {
        dumpService.getTables().then(result => res.send(result)).catch(err => console.log(err));
    })

    return router;
})();
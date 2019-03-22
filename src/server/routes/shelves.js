const dumpService = require('../services/db/shelves/dumpShelf');

module.exports = (function() {
    const router = require ('express').Router();

    router.get('/get_shelves', function(req, res) {
        dumpService.call().then(rows => res.send(rows)).catch(err => console.log(err));
        //res.send("Fuck you and your shelves");
    });

    router.get('/getShelf/:id', function(req, res) {
        let id = req.params.id;
        res.send("Fuck you and your shelf " + id);
    });

    router.post('/addShelf', function(req, res) {
        res.header('Content-Type', 'application/json');
        console.log(req.body);
        res.send("Fuck you and your shelf adding request");
    });

    router.post('/deleteShelf', function(req, res) {
        res.send("Fuck you and your shelf deleting request");
    });

    return router;
})();
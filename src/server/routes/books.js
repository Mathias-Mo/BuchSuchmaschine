const dumpService = require('../services/db/books/dumpBook');

module.exports = (function() {
    const router = require ('express').Router();

    router.get('/get_books', function(req, res) {
        dumpService.call().then(rows => res.send(rows)).catch(err => console.log(err));
    });

    router.get('/getBook/:id', function(req, res) {

    });

    router.post('/addBook', function(req, res) {

    });

    router.post('/deleteBook', function(req, res) {
        
    });

    return router;
})();
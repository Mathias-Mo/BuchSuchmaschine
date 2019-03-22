const config = require('../config');
const mysql = require('mysql');

exports.call = function() {
    
    const connection = mysql.createConnection(config.connectionData);
    return new Promise(function(resolve, reject) {
        
        connection.connect(function(err){
            if (err) throw err;

            connection.query('select * from book limit 100', function(err, res) {
                if (err) return reject(err);
                else {
                    resolve(res);
                    console.log("we found books");
                    connection.end();
                }
            })
        });
    })
}
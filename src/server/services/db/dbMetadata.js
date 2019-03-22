const config = require('./config');
const mysql = require('mysql');

exports.getColumnNames = function(table) {
    
    const connection = mysql.createConnection(config.connectionData);
    return new Promise(function(resolve, reject) {
        
        connection.connect(function(err){
            if (err) throw err;

            connection.query(`SHOW COLUMNS from ${table}`, function(err, res) {
                if (err) return reject(err);
                else {
                    resolve(res);                    
                    connection.end();
                }
            })
        });
    })
}

exports.getTables = function() {
    
    const connection = mysql.createConnection(config.connectionData);
    return new Promise(function(resolve, reject) {
        
        connection.connect(function(err){
            if (err) throw err;

            connection.query(`SHOW TABLES`, function(err, res) {
                if (err) return reject(err);
                else {
                    //console.log(res);
                    resolve(res);                    
                    connection.end();
                }
            })
        });
    })
}
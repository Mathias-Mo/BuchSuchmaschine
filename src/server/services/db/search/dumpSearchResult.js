const config = require('../config');
const mysql = require('mysql');
//const sql = require('sql-template-strings');

exports.call = function(searchObject) {
    
    const connection = mysql.createConnection(config.connectionData);
    return new Promise(function(resolve, reject) {
        
        let sqlQuery = createSqlQuery(searchObject);

        connection.connect(function(err){
            if (err) throw err;

            connection.query(sqlQuery[0], sqlQuery[1], function(err, res) {
                if (err) return reject(err);
                else {
                    resolve(res);                    
                    connection.end();
                }
            })
        });
    })
}

exports.getAutoComplete = function(columnName, value) {
    
    const connection = mysql.createConnection(config.connectionData);
    return new Promise(function(resolve, reject) {
        
        let sqlQuery = `select ${columnName} from book where ${columnName} LIKE "%${value}%" limit 10`;
        console.log(sqlQuery);

        connection.connect(function(err){
            if (err) throw err;

            connection.query(sqlQuery, function(err, res) {
                if (err) return reject(err);
                else {
                    resolve(res);                    
                    connection.end();
                }
            })
        });
    })
}

let createSqlQuery = (searchObject) => {
    let keyArr = Object.keys(searchObject);
    let baseString = `select * from book `;
    let prepArr = [];
    if (keyArr.length > 0) {
        baseString += "where "
        for(let key of keyArr) {
            baseString += `${key} LIKE ? AND `
            prepArr.push("%" + searchObject[key] + "%");
        }
        baseString = baseString.substr(0, baseString.length - 5);
    } else {
        baseString += "limit 20"
    }
    
    return [baseString, prepArr];
}
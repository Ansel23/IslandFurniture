var mysql = require('mysql2');
var dbconnect = {
    getConnection: function () {
        var conn = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "Poopoo1234!_5",
            database: "islandfurniture-it07"
        });
        return conn;
    }
};
module.exports = dbconnect
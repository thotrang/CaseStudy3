const mysql=require('mysql');

class Connection {

    static createConnection() {
        let configToMySQL = {
            host: 'localhost',
            user: 'root',
            password: '12345678',
            database: 'blog'
        };
        return mysql.createConnection(configToMySQL);
    }
}
module.exports = Connection;

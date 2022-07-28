const Connection = require('./connection.js');

class User {
    constructor() {
        this.connection = Connection.createConnection();
        this.connection.connect((err) => {
            if (err) {
                console.log(err)
            } else {
                console.log('Connect success!');
            }
        })
    }

    // lấy ra tất cả tài khoản admin
    getUsers() {
        return new Promise((resolve, rejects) => {
            this.connection.query('select * from Users', (err, data) => {
                if (err) {
                    rejects(err);
                } else {
                    resolve(data);
                }
            })
        })
    };
    // tạo 1 tài khoản mới register
    createUser(user) {
        let insertUser = `insert into users(username, password, phonenumber, email, address, role_id) values ("${user.name}","${user.password}","${user.phone}","${user.email}",'${user.address}', 2);`;
        this.connection.query(insertUser, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('register success');
            }
        })
    };
    // lấy ra 1 tài khoản với id admin
    getUser(id) {
        return new Promise((resolve, rejects) => {
            this.connection.query(`select * from users where users.id=${id}`, (err, data) => {
                if (err) {
                    rejects(err);
                } else {
                    resolve(data);
                }
            })
        })
    };
    //tìm kiếm 1 tài khoản với email admin
    getUserWithEmail(email) {
        return new Promise((resolve, rejects) => {
            this.connection.query(`select * from users where users.email=${email}`, (err, data) => {
                if (err) {
                    rejects(err);
                } else {
                    resolve(data);
                }
            })
        })
    }
    //tìm kiếm 1 tài khoản với sđt
    getUserWithPhone(PhoneNumber) {
        return new Promise((resolve, rejects) => {
            this.connection.query(`select * from users where users.PhoneNumber=${PhoneNumber}`, (err, data) => {
                if (err) {
                    rejects(err);
                } else {
                    resolve(data);
                }
            })
        })
    }
    // xóa tài khoản admin
    deleteUser(id) {
        let insertUser = `delete from users where users.id=${id}`;
        this.connection.query(insertUser, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('delete success');
            }
        })
    };
    // chỉnh sửa tài khoản user
    editUser(id, user) {
        let insertUser = `update users set password=${user.password},phonenumber=${user.phonenumber},email=${user.email},address=${user.address}) where id=${id};`;
        this.connection.query(insertUser, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('edit success');
            }
        })
    }
    // khóa 1 tài khoản admin
    lockUser(id) {
        let user = this.getUser(id)
        if (user.status == 1) {
            let insertUser = `update users set status= 0 where users.id=${id};`;
            this.connection.query(insertUser, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('lock success');
                }
            })
        } else {
            let insertUser = `update users set status= 1 where users.id=${id};`;
            this.connection.query(insertUser, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('unlock success');
                }
            })
        }
    }
    // chuyển tài khoản user thành admin
    changeAdmin(id){
        let insertUser = `update users set role_id=3 where users.id=${id};`;
            this.connection.query(insertUser, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('change success');
                }
            })
        }

};
module.exports = User;
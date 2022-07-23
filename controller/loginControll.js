const fs = require('fs');
const User = require('../model/User.js');
const qs = require('qs');

class LoginControll {
    constructor() {
        this.user = new User();
    }
    showLogin(req, res) {
        fs.readFile('./views/login.html', (err, data) => {
            if (err) {
                console.log(err);
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
                return res.end();
            }
        })
    };
    login(req, res) {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        });
        req.on('end', async () => {
            let userLogin = qs.parse(data);
            let users=await this.user.getUsers();
            
            for(this.aUser of users){
                console.log(users);
                if(userLogin.email==this.aUser.email && userLogin.password==this.aUser.password){
                    if(this.aUser.status==1){
                        console.log('đăng nhập thành công');
                        res.writeHead(301, {
                            location: '/homeUser'
                        });
                        return res.end();
                    }else{
                        console.log('tài khoản đã bị khóa');
                    }
                }else{
                    console.log('tài khoản hoặc mật khẩu ko đúng');
                }
            }
        })
    }
};
module.exports = LoginControll;
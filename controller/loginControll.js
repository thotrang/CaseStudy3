const fs = require('fs');
const User = require('../model/User.js');
const qs = require('qs');

class LoginController {
    constructor() {
        this.user = new User();
    }
    showLogin(req, res) {
        fs.readFile('./template/login.html', (err, data) => {
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
            let users = await this.user.getUsers();
            
            for(let aUser of users){
                if(userLogin.email === aUser.Email && userLogin.password === aUser.Password){
                    if(aUser.status === 1){
                        console.log('đăng nhập thành công');
                        if(aUser.role_id === 3){
                            res.writeHead(301, {
                                location: `/homeAdmin?id_user=${aUser.id}`
                            });
                        }else{
                            res.writeHead(301, {
                                location: `/homeUser?id_user=${aUser.id}`
                            });
                        }
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
}
module.exports = LoginController;
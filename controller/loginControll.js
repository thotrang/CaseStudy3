const fs = require('fs');
const User = require('../model/User.js');
const qs = require('qs');
const cookie = require('cookie');



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
                    res.setHeader('Set-Cookie', cookie.serialize('user', JSON.stringify(aUser), {
                        httpOnly: true,
                        maxAge: 60 * 60 * 24 * 7
                    }));
                    if(aUser.status === 1){
                        if(aUser.role_id === 3){
                            res.writeHead(301, {
                                location: `/homeAdmin?id_user=${aUser.id}`
                            });
                        }else{
                            res.writeHead(301, {
                                location: `/`
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

    logOut(req,res){
        res.setHeader('Set-Cookie', cookie.serialize('user', '', {
            httpOnly: true,
            maxAge: 0
        }));
        res.writeHead(301, {
            location: `/login`
        })
        res.end();
    }

    checkAuth(req,res){
        let cookieClient = cookie.parse(req.headers.cookie || '');
        if (cookieClient.user) {

        } else {
            res.writeHead(302, {Location: '/login'});
            return res.end();
        }
    }
}
module.exports = LoginController;
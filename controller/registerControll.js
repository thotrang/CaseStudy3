const fs =require('fs');
const User=require('../model/User.js');
const qs = require('qs');
class RegisterController{
    constructor(){
        this.user=new User();
    }

    showRegister(req,res){
        fs.readFile('./views/register.html',(err,data)=>{
            if(err){
                console.log(err);
            }else{
                res.writeHead(200,{'Content-Type':'text/html'});
                res.write(data);
                return res.end();
            }
        })
    };
    createUser(req,res){
        let data='';
        req.on('data',chunk=>{
            data+=chunk;
        });
        req.on('end',()=>{
            let newUser = qs.parse(data);
            this.user.createUser(newUser);
            res.writeHead(301, {
                location: '/register'
            });
            return res.end();
        });
        req.on('error',()=>{
            console.log('error');
        })
    }
    }
module.exports=RegisterController;
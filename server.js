const http = require('http');
const url = require('url');
const qs = require('qs');

const HomeController=require('./controller/homeControll.js');
const ErrorController=require('./controller/errorControll.js');
const RegisterControll=require('./controller/registerControll');
const LoginControll=require('./controller/loginControll.js');
const HomeUserController =require('./controller/homeUserControll.js')

let homeController=new HomeController();
let errorController=new ErrorController();
let registerControll=new RegisterControll();
let loginControll=new LoginControll();
let homeUserControll=new HomeUserController();

let server=http.createServer((req,res)=>{
    let urlParse=url.parse(req.url,true);
    let urlPath = urlParse.pathname;
    let method = req.method;

    switch(urlPath){
        case '/':{
            homeController.showHome(req,res);
            break;
        }
        case '/register':{
            if(method=='GET'){
                registerControll.showRegister(req,res);
            }else{
                registerControll.createUser(req,res);
            }
            break;
        }
        case '/login':{
            if(method=='GET'){
                loginControll.showLogin(req,res);
            }else{
                loginControll.login(req,res);
            }
            break;
        }
        case '/homeUser':{
            homeUserControll.showHomeUser(req,res);
            break;
        }

        default:{
            errorController.showError(req,res);
        }
    }
})
server.listen(8080,()=>{
    console.log('server running in http://localhost:8080');
})
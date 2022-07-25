const http = require('http');
const url = require('url');
const qs = require('qs');

const HomeController=require('./controller/homeControll.js');
const ErrorController=require('./controller/errorControll.js');
const RegisterController=require('./controller/registerControll');
const LoginController=require('./controller/loginControll.js');
const HomeUserController =require('./controller/homeUserControll.js')
const HomeAdminController =require('./controller/homeAdminControll.js')

let homeController=new HomeController();
let errorController=new ErrorController();
let registerController=new RegisterController();
let loginController=new LoginController();
let homeUserController=new HomeUserController();
let homeAdminController=new HomeAdminController();

let server=http.createServer((req,res)=>{
    let urlParse=url.parse(req.url,true);
    let urlPath = urlParse.pathname;
    let query = qs.parse(urlParse.query);
    let method = req.method;

    switch(urlPath){
        case '/':{
            homeController.showHome(req,res);
            break;
        }
        case '/register':{
            if(method==='GET'){
                registerController.showRegister(req,res);
            }else{
                registerController.createUser(req,res);
            }
            break;
        }
        case '/login':{
            if(method==='GET'){
                loginController.showLogin(req,res);
            }else{
                loginController.login(req,res);
            }
            break;
        }
        case '/homeUser':{
            homeUserController.showHomeUser(req,res,query);
            break;
        }
        case '/homeAdmin':{
            homeAdminController.viewUsers(req,res,query);
            break;
        }
        case `/homeUser/blogs`:{
            homeUserController.viewBlogs(req,res,query);
            break;
        }
        case `/homeUser/blogs/blog`:{
            homeUserController.viewABlog(req,res);
            break;
        }
        case `/homeUser/blogs/create_blog`:{
            if(method==='GET'){
                homeUserController.showBlogFromCreate(req,res);
            }else{
                homeUserController.CreateBlog(req,res,query);
            }
            break;
        }
        default:{
            errorController.showError(req,res);
            break;
        }
    }
})
server.listen(8080,()=>{
    console.log('server running in http://localhost:8080');
})

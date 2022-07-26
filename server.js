const http = require('http');
const url = require('url');
const qs = require('qs');
const fs=require('fs');

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

const mimeTypes = {
    "html": "text/html",
    "js": "text/javascript",
    "min.js": "text/javascript",
    "css": "text/css",
    "min.css": "text/css",
    "jpg": "image/jpg",
    "png": "image/png",
    "gif": "image/gif",
    "woff": "text/html",
    "ttf": "text/html",
    "woff2": "text/html",
    "eot": "text/html",
};

let server=http.createServer((req,res)=>{

    let urlParse=url.parse(req.url,true);
    let urlPath = urlParse.pathname;
    let query = qs.parse(urlParse.query);
    let method = req.method;

    const filesDefences = req.url.match(/\.js|.css|.jpg|.png|.gif|min.js|min.css|.woff|.woff2|.ttf|.eot/);
    if (filesDefences) {
        let filePath = filesDefences[0].toString();
        let extension = mimeTypes[filesDefences[0].toString().split('.')[1]];
        if (filePath.includes('/css')){
            extension = mimeTypes[filesDefences[0].toString().split('/')[1]];
        }
        if (extension.includes('?')){
            extension = extension.split('?')[0];
        }
        res.writeHead(200, { 'Content-Type': extension });
        fs.createReadStream(__dirname + "/" + req.url).pipe(res)
    }
    else{
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
            homeAdminController.showHomeAdmin(req,res,query);
            break;
        }
        case `/homeUser/blogs`:{
            homeUserController.viewBlogs(req,res,query);
            break;
        }
        case `/homeUser/blogs/blog`:{
            homeUserController.viewABlog(req,res,query);
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
        case `/homeAdmin/users`:{
            homeAdminController.viewUsers(req,res,query);
            break;
        }
        case `/homeAdmin/users/lock`:{
            homeAdminController.LockUser(query);
            homeAdminController.viewUsers(req,res,query);
            break;
        }
        case `/homeAdmin/users/delete`:{
            homeAdminController.deleteUser(query);
            homeAdminController.viewUsers(req,res,query);
            break;
        }
        case `/homeAdmin/blogs`:{
            homeAdminController.viewBlogs(req,res,query);
            break;
        }
        case `/homeAdmin/blogs/delete`:{
            homeAdminController.deleteBlog(query);
            homeAdminController.viewBlogs(req,res,query);
            break;
        }
        case `/homeAdmin/blogs/lock`:{
            homeAdminController.lockBlog(query);
            homeAdminController.viewBlogs(req,res,query);
            break;
        }
        case `/homeAdmin/blogs/blog`:{
            homeAdminController.viewABlog(req,res,query);
        }
        case `/homeAdmin/categories`:{
            homeAdminController.viewCategories(req,res,query);
            break;
        }
        case `/homeAdmin/search`:{
            homeAdminController.adminSearch()
            break;
        }
        case `/homeAdmin/blog`:{
            homeAdminController.viewABlog(req,res,query);
            break;
        }
        case `/homeAdmin/user`:{
            homeAdminController.viewBlogOfUser(req,res,query);
            break;
        }
        default:{
            errorController.showError(req,res);
            break;
        }
    }
}
})
server.listen(8080,()=>{
    console.log('server running in http://localhost:8080');
})

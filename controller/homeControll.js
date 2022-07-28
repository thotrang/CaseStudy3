const fs=require('fs');
// const cookie = require("qs");
const cookie = require('cookie');

class HomeController{

    showHome(req,res){
        fs.readFile('./template/index.html','utf-8',(err,data)=>{

            if(err){
                console.log(err);
            }else{
                let cookies = cookie.parse(req.headers.cookie || '');
                if(cookies.user){
                    let user = JSON.parse(cookies.user);
                    data = data.replace('{name}', user.Username);
                }else {
                    data = data.replace('{name}', `<a href="/login">Login</a>`)
                }
                res.writeHead(200,{'Content-Type': 'text/html'});
                res.write(data);
                return res.end();
            }
        })
    }
}
module.exports=HomeController;
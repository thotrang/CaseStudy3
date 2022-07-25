const fs=require('fs');
const Category=require('../model/Category.js');
const Blog=require('../model/Blog.js');
class HomeAdminController{
    showHomeAdmin(req,res){
        fs.readFile('./views/home_admin.html','utf-8',(err,data)=>{
            if(err){
                console.log(err);
            }else{
                res.writeHead(200,{'Content-Type':'text/html'});
                res.write(data);
                return res.end();
            }
        })
    }
    // xem tất cả tài khoản
    viewUsers(){

    }
    // xem tất cả bài viết
    viewBlogs(){

    }
    // xem danh sách các danh mục
    viewCategories(){

    }
    // thêm danh mục
    addCategories(){

    }
    // khóa 1 tài khoản
    LockUser(){

    }
    // xóa 1 bài viết
    deleteBlog(){

    }
    // xóa 1 tài khoản
    deleteUser(){
        
    }

};
module.exports=HomeAdminController;
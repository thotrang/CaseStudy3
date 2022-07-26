const fs = require('fs');
const qs = require('qs');
const Blog = require('../model/Blog.js');
const Category = require('../model/Category.js');
class HomeUserController {
    constructor() {
        this.blog = new Blog();
        this.category = new Category();
    }
    showHomeUser(req, res, query) {
        // sẽ show ra các category trc
        fs.readFile('./views/home_user/home_user.html', 'utf-8', (err, data) => {
            if (err) {
                console.log(err);
            } else {
                let id_user = query.id_user;
                data = data.replaceAll('{id}', id_user);
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
                return res.end();
            }
        })
    };
    // xem danh sách các blog
    viewBlogs(req, res,query) {
        fs.readFile('./views/home_user/home_user.html', 'utf-8', async (err, data) => {
            if (err) {
                console.log(err);
            } else {
                let id_user = query.id_user;
                let blogs = await this.blog.getBlogs();
                let table = ``;
                for (let i = 0; i < blogs.length; i++) {
                    table += `
                    <tr>
                    <td>${i + 1}</td>
                    <td>${blogs[i].title}</td>
                    <td>${blogs[i].author}</td>
                    <td><a href="/homeUser/blogs/blog?id_user=${id_user}&id_blog=${blogs[i].id}>View</a></td>
                </tr>`;
                }
                data = data.replaceAll('{id}', id_user);
                data = data.replace('{blog}', table);
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
                return res.end();
            }
        })
    }

    // xem chi tiết 1 blog
    viewABlog(req, res, idBlog) {
        fs.readFile('./views/home_user/home_user.html', 'utf-8', async (err, data) => {
            if (err) {
                console.log(err);
            } else {
                let id_blog=query.id_blog;
                let blog = await this.blog.getBlog(id_blog);
                let data = `<ol>
                <li>${blog.title}</li>
                <li>${blog.author}</li>
                <li>${blog.time_create}</li>
                <li>${blog.time_update}</li>
                <li>${blog.content}</li>
            </ol>`;
                data = data.replaceAll('{id}', id_user);
                data = data.replace('{blog}', data);
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
                return res.end();
            }
        })
    }
    // Đăng 1 blog
    showBlogFromCreate(req,res){
        fs.readFile('./views/home_user/create_blog.html','utf-8',(err,data)=>{
            if(err){
                console.log(err);
            }else{
                
                res.writeHead(200,{'Content-Type':'text/html'});
                res.write(data);
                return res.end();
            }
        })
    }
    CreateBlog(req, res,query) {
        let id_user = query.id_user;
        let data='';
        req.on('data',chunk=>{
            data+=chunk;
        })
        req.on('end',()=>{
            let newBlog=qs.parse(data);
            this.blog.createBlog(newBlog,id_user);
            res.writeHead(301,{
                location:`homeUser/blogs/id_user=${id_user}`
            })

        })
        req.on('error',()=>{
            console.log('err');
        })
    }
    // tìm kiếm 1 blog
    findBlog() {

    }
    // tìm kiếm theo danh mục
    findWithCategory() {

    }

    // xem danh sách blog của tôi
    viewMyBlog(req,res,query) {
        
    }
    // sửa 1 blog đã đăng
    editMyBlog() {

    }
    // xóa 1 bài viết của tôi
    deleteBlog() {

    }
    // thêm ảnh vào blog
    addImage() {

    }
};
module.exports = HomeUserController;
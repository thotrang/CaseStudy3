const fs = require('fs');
const Blog = require('../model/Blog.js');
const Category = require('../model/Category.js');
class HomeUserController {
    constructor() {
        this.blog = new Blog();
        this.category = new Category();
    }
    showHomeUser(req, res) {
        // sẽ show ra các category trc
        fs.readFile('./views/home_user.html', 'utf-8', (err, data) => {
            if (err) {
                console.log(err);
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
                return res.end();
            }
        })
    };
    // xem danh sách các blog
    viewBlogs(req, res) {
        ;
        fs.readFile('./views/home_user.html', 'utf-8', async (err, data) => {
            if (err) {
                console.log(err);
            } else {
                let blogs = await this.blog.getBlogs();
                let table = ``;
                for (let i = 0; i < blogs.length; i++) {
                    table += `
                    <p>danh sách blog</p>
                    <tr>
                    <td>${i + 1}</td>
                    <td>${blogs[i].title}</td>
                    <td>${blogs[i].author}</td>
                    <td><a href="/homeUser?id=${this.aUser.id}&idblog=${blogs[i].id}>View</a></td>
                </tr>`;
                }
                data = data.replace('{blog}', table);
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
                return res.end();
            }
        })
    }

    // xem chi tiết 1 blog
    viewABlog(req, res, idBlog) {
        fs.readFile('./views/home_user.html', 'utf-8', async (err, data) => {
            if (err) {
                console.log(err);
            } else {
                let blog = await this.blog.getBlog(idBlog);
                let data = `<ol>
                <li>${blog.title}</li>
                <li>${blog.author}</li>
                <li>${blog.time_create}</li>
                <li>${blog.time_update}</li>
                <li>${blog.content}</li>
            </ol>`;
                data = data.replace('{blog}', data);
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
                return res.end();
            }
        })
    }
    // tìm kiếm 1 blog
    findBlog() {
        
    }
    // tìm kiếm theo danh mục
    findWithCategory() {

    }
    // Đăng 1 blog
    CreateBlog() {

    }
    // xem danh sách blog của tôi
    viewMyBlog() {

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
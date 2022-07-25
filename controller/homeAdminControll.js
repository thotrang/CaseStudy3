const fs = require('fs');
const Category = require('../model/Category.js');
const Blog = require('../model/Blog.js');
const User = require('../model/User.js');
class HomeAdminController {
    constructor() {
        this.user = new User();
        this.blog = new Blog();
        this.category = new Category();
    }
    showHomeAdmin(req, res) {
        fs.readFile('./views/home_admin/home_admin.html', 'utf-8', (err, data) => {
            if (err) {
                console.log(err);
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
                return res.end();
            }
        })
    }
    // xem tất cả tài khoản
    viewUsers(req, res, query) {
        fs.readFile('./views/home_admin/home_admin.html', 'utf-8', async (err, data) => {
            if (err) {
                console.log(err);
            } else {
                let id_user = query.id_user;
                let users = await this.user.getUsers();
                let table = `<tr>
                <th scope="col">Status</th>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Email</th>
                <th scope="col">Address</th>
                <th scope="col">role</th>
                <th></th>
                <th></th>
            </tr>`;
                for (let i = 0; i < users.length; i++) {
                    table += `<tr>
                    <td>${(users[i].status == 0) ? 'block' : 'available'}</td>
                    <td>${i + 1}</td>
                    <td>${users[i].Username}</td>
                    <td>${users[i].PhoneNumber}</td>
                    <td>${users[i].Email}</td>
                    <td>${users[i].Address}</td>
                    <td>${(users[i].role_id == 3) ? 'admin' : 'user'}</td>
                    <td><a class="btn btn-primary" href="/homeAdmin/user/lock?id_user=${id_user}&id_user_=${users[i].id}">lock</a></td>
                    <td><a class="btn btn-danger" href="/homeAdmin/user/delete?id_user=${id_user}&id_user_=${users[i].id}">delete</a></td>
                </tr>`
                }
                data = data.replace('{table}', table);
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
                return res.end();
            }
        })
    }
    // xem tất cả bài viết
    viewBlogs(req, res, query) {
        fs.readFile('./views/home_admin/home_admin.html', 'utf-8', async (err, data) => {
            if (err) {
                console.log(err);
            } else {
                let id_user = query.id_user;
                let blogs = await this.blog.getUsers();
                let table = `<tr>
                <th scope="col">ID</th>
                <th scope="col">Title</th>
                <th scope="col">Author</th>
                <th scope="col">status</th>
                <th scope="col">User</th>
                <th></th>
                <th></th>
            </tr>`;
                for (let i = 0; i < blogs.length; i++) {
                    table += `<tr><a href="/homeAdmin/blogs/blog?id_user=${id_user}&id_blog=${blogs[i].id}">
                    <td>${i + 1}</td>
                    <td>${blogs[i].title}</td>
                    <td>${blogs[i].author}</td>
                    <td>${(blogs[i].status == 1) ? 'everyone' : 'only me'}</td>
                    <td>${blogs[i].user}</td>
                    </a>
                </tr>`
                }
                data = data.replace('{table}', table);
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
                return res.end();
            }
        })
    }
    // xem danh sách các danh mục
    viewCategories() {

    }
    // thêm danh mục
    addCategories() {

    }
    // khóa 1 tài khoản
    LockUser(req, res, query) {

    }
    // xóa 1 bài viết
    deleteBlog() {

    }
    // xóa 1 tài khoản
    deleteUser() {

    }

};
module.exports = HomeAdminController;
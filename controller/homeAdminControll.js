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
    showHomeAdmin(req, res, query) {
        this.viewUsers(req, res, query)
    }
    // xem tất cả tài khoản
    viewUsers(req, res, query) {
        fs.readFile('./views/home_admin/home_admin.html', 'utf-8', async (err, data) => {
            if (err) {
                console.log(err);
            } else {
                let id_user = query.id_user;
                let users = await this.user.getUsers();
                let content = `<table class="table table-centered table-striped dt-responsive nowrap w-100"
                id="products-datatable">
                <thead>
                    <tr>
                        <th scope="col">Status</th>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Phone Number</th>
                        <th scope="col">Email</th>
                        <th scope="col">Address</th>
                        <th scope="col">role</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>`;
                for (let i = 0; i < users.length; i++) {
                    content += `<tr>
                    <td>${(users[i].status === 0) ? 'block' : 'available'}</td>
                    <td>${i + 1}</td>
                    <td><a href="/homeAdmin/user?id_user=${id_user}&id_user_=${users[i].id}">${users[i].Username}</a></td>
                    <td>${users[i].PhoneNumber}</td>
                    <td>${users[i].Email}</td>
                    <td>${users[i].Address}</td>
                    <td>${(users[i].role_id === 3) ? 'admin' : 'user'}</td>
                    <td><a style="display: ${(users[i].role_id === 3) ? 'none' : 'block'};" class="btn btn-primary" href="/homeAdmin/users/lock?id_user=${id_user}&id_user_=${users[i].id}">${(users[i].status == 1) ? 'lock' : 'unlock'}</a></td>
                    <td><a style="display: ${(users[i].role_id === 3) ? 'none' : 'block'};" class="btn btn-danger" href="/homeAdmin/users/delete?id_user=${id_user}&id_user_=${users[i].id}">delete</a></td>
                </tr>`
                }
                content+=`</tbody></table>`;

                data = data.replaceAll('{id_user}', id_user);
                data = data.replace('{table}', 'USERS');
                data = data.replaceAll('{search}', 'user');
                data = data.replace('{content}', content);
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
                let blogs = await this.blog.getBlogs();
                let content = `<table class="table table-centered table-striped dt-responsive nowrap w-100"
                id="products-datatable">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Title</th>
                        <th scope="col">Author</th>
                        <th scope="col">status</th>
                        <th scope="col">Date</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>`;
                for (let i = 0; i < blogs.length; i++) {
                    content += `<tr>
                    <td>${i + 1}</td>
                    <td><a href="/homeAdmin/blog?id_user=${id_user}&id_blog=${blogs[i].id}">${blogs[i].title}</a></td>
                    <td><a href="/homeAdmin/user?id_user=${id_user}&id_user_=${blogs[i].user_id}">${blogs[i].author}</a></td>
                    <td>${(blogs[i].status === 1) ? 'everyone' : 'only me'}</td>
                    <td><a class="btn btn-primary" href="/homeAdmin/blogs/lock?id_user=${id_user}&id_blog=${blogs[i].id}">${(blogs[i].status == 1) ? 'lock' : 'unlock'}</a></td>
                    <td><a class="btn btn-danger" href="/homeAdmin/blogs/delete?id_user=${id_user}&id_blog=${blogs[i].id}">delete</a></td>
                </tr>`
                
                }
                content+=`</tbody></table>`;
                data = data.replaceAll('{search}', 'blog');
                data = data.replace('{table}', 'BLOGS');
                data = data.replaceAll('{id_user}', id_user);
                data = data.replace('{content}', content);
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
                return res.end();
            }
        })
    }
    //xem chi tiết 1 bài viết
    viewABlog(req, res, query) {
        fs.readFile('./views/home_admin/home_admin.html', 'utf-8', async (err, data) => {
            if (err) {
                console.log(err);
            } else {
                let id_user = query.id_user;
                let id_blog=query.id_blog;
                let blog = await this.blog.getBlog(id_blog);
                let content = `<ol>   
                <li>${blog[0].title}</li>
                <li>${blog[0].author}</li>
                <li>${blog[0].time_create}</li>
                <li>${blog[0].time_update}</li>
                <li>${blog[0].content}</li>
            </ol>`;
                data = data.replaceAll('{search}', 'blog');
                data = data.replace('{table}', `${blog[0].title}`);
                data = data.replaceAll('{id_user}', id_user);
                data = data.replace('{content}', content);
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
                return res.end();
            }
        })
    }
    // xem 1 tài khoản
    viewBlogOfUser(req, res, query) {
        fs.readFile('./views/home_admin/home_admin.html', 'utf-8', async (err, data) => {
            if (err) {
                console.log(err);
            } else {
                let id_user = query.id_user;
                let id_user_=query.id_user_;
                let blogs = await this.blog.getMyBlogs(id_user_);
                let content = `<table class="table table-centered table-striped dt-responsive nowrap w-100"
                id="products-datatable">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Title</th>
                        <th scope="col">Author</th>
                        <th scope="col">status</th>
                        <th scope="col">Date</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>`;
                for (let i = 0; i < blogs.length; i++) {
                    content += `<tr>
                    <td>${i + 1}</td>
                    <td><a href="/homeAdmin/blog?id_user=${id_user}&id_blog=${blogs[i].id}">${blogs[i].title}</a></td>
                    <td><a href="/homeAdmin/user?id_user=${id_user}&id_user_=${blogs[i].user_id}">${blogs[i].author}</a></td>
                    <td>${(blogs[i].status === 1) ? 'everyone' : 'only me'}</td>
                    <td><a class="btn btn-primary" href="/homeAdmin/blogs/lock?id_user=${id_user}&id_blog=${blogs[i].id}">${(blogs[i].status == 1) ? 'lock' : 'unlock'}</a></td>
                    <td><a class="btn btn-danger" href="/homeAdmin/blogs/delete?id_user=${id_user}&id_blog=${blogs[i].id}">delete</a></td>
                </tr>`
                
                }
                content+=`</tbody></table>`;
                data = data.replaceAll('{search}', 'blog');
                data = data.replace('{table}', 'BLOGS');
                data = data.replaceAll('{id_user}', id_user);
                data = data.replace('{content}', content);
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
                return res.end();
            }
        })
    }
    // xem danh sách các danh mục
    viewCategories(req, res, query) {
        fs.readFile('./views/home_admin/home_admin.html', 'utf-8', async (err, data) => {
            if (err) {
                console.log(err);
            } else {
                let id_user = query.id_user;
                let categories = await this.category.getCategoriesWithBLog();
                let addCategory = ` <nav class="navbar bg-light">
                <div class="container-fluid">
                  <form class="d-flex" role="search" method='post'>
                    <input class="form-control me-2" type="text" required aria-label="Search" name='nameCategory'>
                    <button class="btn btn-outline-success" type="submit">Create</button>
                  </form>
                </div>
              </nav>`
                let content = `<table class="table table-centered table-striped dt-responsive nowrap w-100"
                id="products-datatable">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Category</th>
                        <th scope="col">NumberOfBlog</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>`;
                for (let i = 0; i < categories.length; i++) {
                    content += `<tr>
                    <td>${i + 1}</td>
                    <td>${categories[i].name}</td>
                    <td>${categories[i].numberOfBlog}</td>
                    <td><a class="btn btn-danger" href="/homeAdmin/categories/delete?id_user=${id_user}&id_category=${categories[i].id}">delete</a></td>
                </tr>`
                }
                content+=`</tbody></table>`;
                data = data.replaceAll('{search}', 'category');
                data = data.replace('{table}', addCategory);
                data = data.replaceAll('{id_user}', id_user);
                data = data.replace('{content}', content);
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
                return res.end();
            }
        })
    }
    // thêm danh mục
    addCategories(req, res) {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        })
        req.on('end', () => {
            let newCategory = qs.parse(data);
            this.category.createCategory(newCategory);
            res.writeHead(200, 'text/html');
            res.end();
        })
        req.on('error', () => {
            console.log('error');
        })
    }
    // khóa 1 tài khoản
    LockUser(query) {
        let id_user_ = query.id_user_;
        this.user.lockUser(id_user_);
    }
    lockBlog(query) {
        let id_blog = query.id_blog;
        this.blog.lockBlog(id_blog);
    }
    // xóa 1 bài viết
    deleteBlog(query) {
        let id_blog = query.id_blog;
        this.blog.deleteBlog(id_blog);
    }
    // xóa 1 tài khoản
    deleteUser(query) {
        let id_user_ = query.id_user_;
        this.user.deleteUser(id_user_);
    }
    // tìm kiếm
    adminSearch(urlPath){
        switch(urlPath){
            case `/homeAdmin/search/user`:{

                break;
            };
            case `/homeAdmin/search/blog`:{

                break;
            }
            case `/homeAdmin/search/category`:{

                break;
            }
        }
    }

};
module.exports = HomeAdminController;
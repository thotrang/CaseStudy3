const fs = require('fs');
const Category = require('../model/Category.js');
const Blog = require('../model/Blog.js');
const User = require('../model/User.js');
const qs = require('qs');
class HomeAdminController {
    constructor() {
        this.user = new User();
        this.blog = new Blog();
        this.category = new Category();
    }
    showListUser(req, res, query, users) {
        let id_user = query.id_user;
        let content = `<nav class="navbar bg-light">
        <div class="container-fluid">
          <form class="d-flex" role="search" method='post' action="/homeAdmin/users/search?id_user=${id_user}">
            <input class="form-control me-2" type="text" required aria-label="Search" name='q'>
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </nav>
        <table class="table table-centered table-striped dt-responsive nowrap w-100"
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
        content += `</tbody></table>`;
        return content;
    }
    showListBlog(req, res, query, blogs) {
        let id_user = query.id_user;
        let content = `<nav class="navbar bg-light">
        <div class="container-fluid">
          <form class="d-flex" role="search" method='post' action="/homeAdmin/blogs/search">
          <input type="hidden" name="id_user" value="${id_user}"/>
            <input class="form-control me-2" type="text" required aria-label="Search" name='q'>
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </nav>
        <table class="table table-centered table-striped dt-responsive nowrap w-100"
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
        content += `</tbody></table>`;
        return content;
    }
    showListCategory(req, res, query, categories) {
        let id_user = query.id_user;
        let content = `<nav class="navbar bg-light">
        <div class="container-fluid">
          <form class="d-flex" role="search" method='post' action="/homeAdmin/categories/search">
          <input type="hidden" name="id_user" value="${id_user}"/>
            <input class="form-control me-2" type="text" required aria-label="Search" name='q'>

            <button class="btn btn-outline-success" type="submit">Search</button>
            <a style="margin-left: 20px" class="btn btn-outline-success" href="/homeAdmin/categories/create?id_user=${id_user}">Create</a>
          </form>
        </div>
      </nav>
      
        <table class="table table-centered table-striped dt-responsive nowrap w-100"
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
            <td><a href="/homeAdmin/category?id_user=${id_user}&id_category=${categories[i].id}">${categories[i].name}</a></td>
            <td>${categories[i].numberOfBlog}</td>
            <td><a class="btn btn-primary" href="/homeAdmin/categories/edit?id_user=${id_user}&id_category=${categories[i].id}">Edit Name</a></td>
            <td><a class="btn btn-danger" href="/homeAdmin/categories/delete?id_user=${id_user}&id_category=${categories[i].id}">delete</a></td>
        </tr>`
        }
        content += `</tbody></table>`;
        return content;
    }
    // xem tất cả tài khoản
    viewUsers(req, res, query) {
        
        fs.readFile('./views/home_admin/home_admin.html', 'utf-8', async (err, data) => {
            if (err) {
                console.log(err);
            } else {
                let id_user = query.id_user;
                let users = await this.user.getUsers();
                let search = `USER`
                let content = this.showListUser(req, res, query, users);
                data = data.replaceAll('{id_user}', id_user);
                data = data.replace('{search}', search);
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
                let search = `BLOGS`
                let content = this.showListBlog(req, res, query, blogs)
                data = data.replace('{search}', search);
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
                let id_blog = query.id_blog;
                let blog = await this.blog.getBlog(id_blog);
                let content = `<ol>   
                <li>${blog[0].title}</li>
                <li>${blog[0].author}</li>
                <li>${blog[0].time_create}</li>
                <li>${blog[0].time_update}</li>
                <li><img src="${blog[0].image}" alt=""/></li>
                <li>${blog[0].content}</li>
            </ol>`;
                data = data.replaceAll('{search}', `${blog[0].title}`);
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
                let id_user_ = query.id_user_;
                let blogs = await this.blog.getMyBlogs(id_user_);
                let thisUser = await this.user.getUser(id_user_);
                let nameUser = thisUser[0].Username;
                let content = this.showListBlog(req,res,query,blogs);

                data = data.replace('{search}', `BLOGS OF ${nameUser}`);
                data = data.replaceAll('{id_user}', id_user);
                data = data.replace('{content}', content);
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
                return res.end();
            }
        })
    }
    viewBlogOfCategory(req,res,query){
        fs.readFile('./views/home_admin/home_admin.html', 'utf-8', async (err, data) => {
            if (err) {
                console.log(err);
            } else {
                let id_user = query.id_user;
                let id_category = query.id_category;
                let blogs = await this.blog.getBlogWithCategory(id_category);
                let thisCategory = await this.category.getCategory(id_category);
                let nameCategory = thisCategory[0].name;
                let content = this.showListBlog(req,res,query,blogs);

                data = data.replace('{search}', `BLOGS OF ${nameCategory}`);
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
                let search = `CATEGORIES`

                let content = this.showListCategory(req, res, query, categories);
                data = data.replaceAll('{search}', search);
                data = data.replaceAll('{id_user}', id_user);
                data = data.replace('{content}', content);
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
                return res.end();
            }
        })
    }
    // thêm danh mục
    addCategories(req, res, query) {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        })
        req.on('end', () => {
            let id_user = query.id_user;
            let newCategory = qs.parse(data);
            this.category.createCategory(newCategory);
            res.writeHead(301, {
                location: `/homeAdmin/categories?id_user=${id_user}`
            });
            res.end();
        })
        req.on('error', () => {
            console.log('error');
        })
    }
    editCategory(req, res, query) {
        let data = ``;
        req.on('data', chunk => {
            data += chunk;
        })
        req.on('end', () => {
            let id_user = query.id_user;
            let id_category = query.id_category;
            let editCategory = qs.parse(data);
            this.category.editCategory(id_category, editCategory);
            res.writeHead(301, {
                location: `/homeAdmin/categories?id_user=${id_user}`
            });
            res.end();
        })
        req.on('error', () => {
            console.log('error');
        })
    }
    showEditCategory(req,res,query){
        fs.readFile('./views/home_admin/home_admin.html', 'utf-8', async (err, data) => {
            if (err) {
                console.log(err);
            } else {
                let id_user = query.id_user;
                let search = `EDIT CATEGORY`;

              let content=`<nav class="navbar bg-light">
              <div class="container-fluid">
                <form class="d-flex" role="search" method='post' action="">
                  <input class="form-control me-2" type="text" name="nameCategory" required>
                  <button class="btn btn-outline-success" type="submit">EDIT</button>
                </form>
              </div>
            </nav>`
                data = data.replaceAll('{search}', search);
                data = data.replaceAll('{id_user}', id_user);
                data = data.replace('{content}', content);
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
                return res.end();
            }
        })
    }
    showCreateCategory(req,res,query){
        fs.readFile('./views/home_admin/home_admin.html', 'utf-8', async (err, data) => {
            if (err) {
                console.log(err);
            } else {
                let id_user = query.id_user;
                let search = `CREATE CATEGORY`;

                let content=`<nav class="navbar bg-light">
              <div class="container-fluid">
                <form class="d-flex" role="search" method='post' action="">
                  <input class="form-control me-2" type="text" name="nameCategory" required>
                  <button class="btn btn-outline-success" type="submit">CREATE</button>
                </form>
              </div>
            </nav>`
                data = data.replaceAll('{search}', search);
                data = data.replaceAll('{id_user}', id_user);
                data = data.replace('{content}', content);
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
                return res.end();
            }
        })
    }

    // khóa 1 tài khoản
    LockUser(req, res, query) {
        let id_user_ = query.id_user_;
        this.user.lockUser(id_user_);
    }
    lockBlog(req, res, query) {
        let id_blog = query.id_blog;
        this.blog.lockBlog(id_blog);
    }
    // xóa 1 bài viết
    deleteBlog(req, res, query) {
        let id_blog = query.id_blog;
        this.blog.deleteBlog(id_blog);
    }
    // xóa 1 tài khoản
    deleteUser(req, res, query) {
        let id_user_ = query.id_user_;
        this.user.deleteUser(id_user_);
    }
    deleteCategory(req, res, query) {
        let id_category = query.id_category;
        let id_user = query.id_user;
        this.category.deleteCategory(id_category);
        res.writeHead(301, {
            location: `/homeAdmin/categories?id_user=${id_user}`
        });
        res.end();
    }
    // tìm kiếm
    searchUser(req, res, query) {
        let data = ``;
        req.on('data', chunk => {
            data += chunk;
        })
        req.on('end', async () => {
            fs.readFile('./views/home_admin/home_admin.html', 'utf-8', async (err, data1) => {
                let id_user = query.id_user;
                let search = qs.parse(data);
                let users = await this.user.getUserWithName(search);
                let content = this.showListUser(req, res, query, users);

                data1 = data1.replaceAll('{search}', 'USERS');
                data1 = data1.replaceAll('{id_user}', id_user);
                data1 = data1.replace('{content}', content);
                res.write(data1);
                return res.end();
            })
            
        })
        req.on('error', () => {
            console.log('error');
        })
    }
    searchBlog(req, res, query) {
        let data = ``;
        req.on('data', chunk => {
            data += chunk;
        })
        req.on('end', async () => {
            fs.readFile('./views/home_admin/home_admin.html', 'utf-8', async (err, data1) => {
                let id_user = query.id_user;
                let search = qs.parse(data);
                let blogs = await this.blog.getblogWithTitle(search);
                let content = this.showListBlog(req, res, query, blogs);

                data1 = data1.replaceAll('{search}', 'BLOGS');
                data1 = data1.replaceAll('{id_user}', id_user);
                data1 = data1.replace('{content}', content);
                res.write(data1);
                return res.end();
            })
            
        })
        req.on('error', () => {
            console.log('error');
        })
    }
    searchCategory(req, res, query) {
        let data = ``;
        req.on('data', chunk => {
            data += chunk;
        })
        req.on('end', async () => {
            fs.readFile('./views/home_admin/home_admin.html', 'utf-8', async (err, data1) => {
                let id_user = query.id_user;
                let search = qs.parse(data);
                let categories = await this.category.getCategoryWithName(search);
                let content = this.showListCategory(req, res, query, categories);

                data1 = data1.replaceAll('{search}', 'CATEGORIES');
                data1 = data1.replaceAll('{id_user}', id_user);
                data1 = data1.replace('{content}', content);
                res.write(data1);
                return res.end();
            })
            
        })
        req.on('error', () => {
            console.log('error');
        })
    }

};
module.exports = HomeAdminController;
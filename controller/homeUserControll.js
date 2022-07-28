const fs = require('fs');
const qs = require('qs');
let formidable = require('formidable')
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
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                return res.end();
            }
        })
    };

    // xem danh sách các blog
    viewBlogs(req, res, query) {
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
                res.writeHead(200, {'Content-Type': 'text/html'});
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
                let blog = await this.blog.getBlog(idBlog);
                let data = `<ol>
                <li>${blog.title}</li>
                <li>${blog.author}</li>
                <li>${blog.time_create}</li>
                <li>${blog.time_update}</li>
                <li>${blog.content}</li>
            </ol>`;
                data = data.replaceAll('{id}', id_user);
                data = data.replace('{blog}', data);
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                return res.end();
            }
        })
    }

    // Đăng 1 blog
    showBlogFromCreate(req, res) {
        fs.readFile('./views/home_user/create_blog.html', 'utf-8', (err, data) => {
            if (err) {
                console.log(err);
            } else {

                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                return res.end();
            }
        })
    }

    CreateBlog(req, res, query) {
        let id_user = query.id_user;
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        })
        req.on('end', () => {
            let newBlog = qs.parse(data);
            this.blog.createBlog(newBlog, id_user);
            res.writeHead(301, {
                location: `homeUser/blogs/id_user=${id_user}`
            })

        })
    }

    // tìm kiếm 1 blog
    findBlog() {

    }

    // tìm kiếm theo danh mục
    findWithCategory() {

    }

    // xem danh sách blog của tôi
    viewMyBlog(req, res) {
        this.blog.getBlogs().then((results) => {
            fs.readFile('./template/products.html','utf8',(err, data) => {
                if (err) {
                    throw new Error(err.message)
                }
                else {
                    let dataForm = ''
                    results.forEach((item, index) => {
                        dataForm += '<tr>'
                        dataForm += `<td>${index + 1}</td>`
                        dataForm += `<td>${item.title}</td>`
                        dataForm += `<td>${item.content}</td>`
                        dataForm += `<td>${item.author}</td>`
                        dataForm += `<td>${item.status}</td>`
                        // dataForm+=`<img src="../template/image/${item.img}"/>`
                        dataForm += `<td><a href="/template/products/delete?id=${item.id}">Delete</a></td>`
                        dataForm += `<td><a href="/template/products/update?id=${item.id}">Update</a></td>`
                        dataForm += '</tr>'
                    })
                    data = data.replace('{list}', dataForm)
                    res.writeHead(200, "ok", {'Content-Type': 'text/html'})
                    res.write(data)
                    res.end()
                }
            })
        })
    }

    // sửa 1 blog đã đăng
    editMyBlog(res, req, method) {
        if (method === 'GET') {
            fs.readFile('./views/home_user/create_blog.html', 'utf-8', (err, data) => {
                if (err) {
                    throw new Error(err.message)
                }
            })
        } else {
            let data = ''
            req.on('data', chunk => {
                data += chunk
            })
            req.on('end', () => {
                let dataForm = qs.parse(data)

                this.editMyBlog(dataForm.title, dataForm.content, dataForm.author).then((result) => {
                    res.writeHead(301,'Localhost' )
                    res.write(result)
                    res.end()
                })
            })
        }
    }

    // xóa 1 bài viết của tôi
    deleteBlog(req, res, id) {

    }

    // thêm ảnh vào blog
    addImage(req, res) {

    }
}
module.exports = HomeUserController;
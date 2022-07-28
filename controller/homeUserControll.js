const fs = require('fs');
const qs = require('qs');
const Blog = require('../model/Blog.js');
const Category = require('../model/Category.js');
const connection = require("mysql/lib/Pool");

class HomeUserController {
    constructor() {
        this.blog = new Blog();
        this.category = new Category();
        this.editButton = (obj) => {
            return `<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo" onclick='getEditButton(${obj})'>Edit</button>`;
        }
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

                let blogs = await this.blog.getBlogs();
                let table = ``;
                for (let i = 0; i < blogs.length; i++) {
                    table += `
                    <tr>
                    <td>${i + 1}</td>
                    <td>${blogs[i].title}</td>
                    <td>${blogs[i].author}</td>
                    <td><a href="/homeUser/blogs/blog?idBlog=${blogs[i].id}">View</a></td>
                </tr>`;
                }

                // data = data.replaceAll('{id}', id_user);
                data = data.replace('{category}', '')
                data = data.replace('{blog}', table);
                res.writeHead(200, {'Content-Type': 'text/html'})
                res.write(data);
                return res.end();
            }
        })
    }

    // xem chi tiết 1 blog
    viewABlog(req, res, idBlog) {
        fs.readFile('./views/home_user/blogDetail.html', 'utf-8', async (err, data) => {
            if (err) {
                console.log(err);
            } else {
                let blog = await this.blog.getBlog(idBlog);

                let blogDetail = `<ul>
                <li>time-create: ${blog[0].time_create}</li>
                <li>time-update: ${blog[0].time_update}</li>
                <li>content: ${blog[0].content} </li>
            </ul>`;
                // data = data.replaceAll('{id}', id_user);
                data = data.replace('{body}', blogDetail);
                data = data.replace('{title}', blog[0].title);
                data = data.replace('{author}', blog[0].author);
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

    async findBlog(req, res) {
        if (req.method === 'GET') {
            let buffer = [];

            for await (const chunk of req) {
                buffer.push(chunk);
            }
            const data = Buffer.concat(buffer).toString()
            const dataSearch = (qs.parse(data)).name;

            this.blog.getBlogs().then(blogs => {
                fs.readFile('./views/home_user/create_blog.html', 'utf-8', (err, data) => {
                    if (err) {
                        throw err
                    }
                     this.viewBlogs()
                    // data = data.replace('{tbody}', html)
                    // data = data.replace('<a href="/" hidden>Back</a>', '<a href="/" >Back</a>')
                    // res.writeHead(200, "utf8", {"Content-Type": "text/html"})
                    //
                    // res.write(data);
                    return res.end();
                })
            })

        }

    }



    // tìm kiếm theo danh mục
    findWithCategory(req,res,category) {
        this.blog.getBlogWithCategory(category).then((blogs) => {
            console.log(blogs)
            fs.readFile('./views/home_user/home_user.html', 'utf-8', (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    let table = ``;
                    for (let i = 0; i < blogs.length; i++) {
                        table += `
                    <tr>
                    <td>${i + 1}</td>
                    <td>${blogs[i].title}</td>
                    <td>${blogs[i].author}</td>
                    <td><a href="/homeUser/blogs/blog?idBlog=${blogs[i].id}">View</a></td>
                </tr>`;
                    }
                    data = data.replace('{category}', `<h1>${category}</h1>`)
                    data = data.replace('{blog}', table);
                    res.writeHead(200, {'Content-Type': 'text/html'})
                    res.write(data);
                    return res.end();
                }
            })
        })

    };

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
                        dataForm += `<td><a href="/homeUser/products/delete?id=${item.id}">Delete</a></td>`
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
    editMyBlog(req,res) {
        console.log('fuck')
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        })
        req.on('end', () => {
            let blog = qs.parse(data);
            console.log(blog)
            this.blog.editBlog(blog).then(()=>{
                res.writeHead(301, {
                    location: `http://localhost:8080/homeUser/blogs/setting`
                })
                res.end();
            })
        })
    }

    // xóa 1 bài viết của tôi
    deleteBlogs(req, res, id) {
        this.blog.deleteBlog(id).then(() =>{
            res.writeHead(301, {
                Location: 'http://localhost:8080/homeUser/blogs/setting'
            });
            res.end();
            }
        ).catch(err =>{
            console.log(err)
        })

    }

    settingBlog(req,res){
        fs.readFile('./views/home_user/setting_user.html', 'utf-8', async (err, data) => {
            if (err) {
                console.log(err);
            } else {
                let blogs = await this.blog.getBlogs();
                let table = ``;
                for (let i = 0; i < blogs.length; i++) {
                    table += `
                    <tr>
                    <td>${i + 1}</td>
                    <td>${blogs[i].title}</td>
                    <td>${blogs[i].content}</td>
                    <td>${blogs[i].author}</td>
                    <td>${blogs[i].status}</td>
                    <td><a class="btn btn-danger" href="/homeUser/blogs/setting/delete?id=${blogs[i].id}">delete</a>
                    ${this.editButton(JSON.stringify(blogs[i]))}
                    </td>
                </tr>`;
                }

                // data = data.replaceAll('{id}', id_user);
               data = data.replace('{list}', table);
                res.writeHead(200, {'Content-Type': 'text/html'})
                res.write(data);
                return res.end();
            }
        })
    }


    // // thêm ảnh vào blog
    // async addImage(req,res,id) {
    //     let image =
    //
    // }
}
module.exports = HomeUserController;
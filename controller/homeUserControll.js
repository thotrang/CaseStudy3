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
        fs.readFile('./views/home_user/home_user.html','utf-8',async (err,data)=>{

            if(err){
                console.log(err);
            }else{
                let blogs=await this.blog.getBlogs();
                let categories=await this.category.getCategories();
                let id_user=query.id_user;
                let blogs1=``;
                for(let i=0;i<blogs.length;i++){
                    blogs1+=` <div class="item px-2">
                    <div class="fh5co_hover_news_img">
                        <div class="fh5co_news_img"><img src="${blogs[i].image}" alt=""/></div>
                        <div>
                            <a href="/login" class="d-block fh5co_small_post_heading"><span class="">${blogs[i].title}</span></a>
                            <div class="c_g"><i class="fa fa-clock-o"></i> Oct 16,2017</div>
                        </div>
                    </div>
                </div> `
                }
                let blogs2=``;
                for(let i=0;i<blogs.length;i++){

                blogs2+=`<div class="row pb-4">
                <div class="col-md-5">
                    <div class="fh5co_hover_news_img">
                        <div class="fh5co_news_img"><img src="${blogs[i].image}" alt=""/></div>
                        <div></div>
                    </div>
                </div>
                <div class="col-md-7 animate-box">
                    <a href="/login" class="fh5co_magna py-2"> ${blogs[i].title} </a> <a href="/login" class="fh5co_mini_time py-3"> ${blogs[i].author} -
                    ${blogs[i].time_create} </a>
                    <div class="fh5co_consectetur"> Amet consectetur adipisicing elit, sed do eiusmod tempor incididunt
                        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
                    </div>
                </div>
            </div>`
                }
                let blogs3=``;
                for(let i=0;i<blogs.length;i++){
                    blogs3+=` <div class="row pb-3">
                    <div class="col-5 align-self-center">
                        <img src="${blogs[i].image}" alt="img" class="fh5co_most_trading"/>
                    </div>
                    <div class="col-7 paddding">
                        <div class="most_fh5co_treding_font">${blogs[i].title}</div>
                        <div class="most_fh5co_treding_font_123">${blogs[i].time_create}</div>
                    </div>
                </div> `
                }
                let category=``;
                for(let i=0;i<categories.length;i++){
                    category+=`<a href="#" class="fh5co_tagg">${categories[i].name}</a>`
                }
                data=data.replaceAll('{id_user}',id_user);
                data=data.replace('{blogs-1}',blogs1);
                data=data.replace('{blogs-2}',blogs2);
                data=data.replace('{blogs-3}',blogs3);
                data=data.replace('{category}',category);
                res.writeHead(200,{'Content-Type':'text/html'});
                res.write(data);
                return res.end();
            }
        })
    }
    

    // xem chi tiết 1 blog
    viewABlog(req, res, query) {
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
                data = data.replaceAll('{id_user}', id_user);
                data = data.replace('{blog}', data);
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
                return res.end();
            }
        })
    }

    // tìm kiếm 1 blog
   
    searchBlog(req, res, query) {
        let data = ``;
        req.on('data', chunk => {
            data += chunk;
        })
        req.on('end', async () => {
            fs.readFile('./views/home_user/home_user.html', 'utf-8', async (err, data1) => {
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
                Location: 'http://localhost:8080/homeUser/blogs'
            });
            res.end();
            }
        ).catch(err =>{
            console.log(err)
        })

    }
    //setting
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
    showProfile(req,res,query){
        let id_user=query.id_user;
        fs.readFile('./views/home_user/Profile.html','utf-8',async (err,data)=>{
            if(err){
                console.log(err);
            }else{
                let blogs=await this.blog.getMyBlogs(id_user);
                let content=``;
                for(let i=0;i<blogs.length;i++){
                    content+=`<div class="row pb-4">
                    <div class="col-md-5">
                        <div class="fh5co_hover_news_img">
                            <div class="fh5co_news_img"><img src="${blogs[i].image}" alt=""/></div>
                            <div></div>
                        </div>
                    </div>
                    <div class="col-md-7 animate-box">
                        <a href="/login" class="fh5co_magna py-2"> ${blogs[i].title} </a> <a href="/login" class="fh5co_mini_time py-3"> ${blogs[i].author} -
                        ${blogs[i].time_create} </a>
                        <div class="fh5co_consectetur"> ${blogs[i].image}
                        </div>
                    </div>
                </div>`
                }
                data=data.replace('{content}',content);
                data=data.replaceAll('{id_user}',id_user);
                res.writeHead(200,'text/html');
                res.write(data);
                res.end();
            }
        })
    }
    showFormCreate(req,res,query){
        let id_user=query.id_user;
        
        fs.readFile('views/home_user/create_blog.html','utf-8',(err,data)=>{
            if(err){
                console.log(err);
            }else{
                data=data.replaceAll('{id_user}',id_user);
                res.writeHead(200,'text/html');
                res.write(data);
                res.end();
            }
        })
    }
    createBlog(req, res,query) {
        let id_user = query.id_user;
        let data='';
        req.on('data',chunk=>{
            data+=chunk;
        })
        req.on('end',()=>{
            let newBlog=qs.parse(data);
            this.blog.createBlog(newBlog,id_user);
            res.writeHead(301,{
                location:`/homeUser/showProfile?id_user=${id_user}`
            });
            res.end();

        })
        req.on('error',()=>{
            console.log('err');
        })
    }
};
module.exports = HomeUserController;
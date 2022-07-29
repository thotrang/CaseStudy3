const { rejects } = require('assert');
const { resolve } = require('url');
const Connection= require('./connection.js');

class Blog{
    constructor(){
        this.connection=Connection.createConnection();
        this.connection.connect((err)=>{
            if(err){
                console.log(err);
            }else{
                console.log('connect success');
            }
        })
    }
    // lấy ra danh sách blog
    getBlogs(){
        return new Promise((resolve,rejects)=>{
            this.connection.query('select * from blogs',(err,data)=>{
                if(err){
                    rejects(err);
                }else{
                    resolve(data);
                }
            })
        })
    };
    //
    getBlogsUnLock(){
        return new Promise((resolve,rejects)=>{
            this.connection.query('select * from blogs where blogs.status=1',(err,data)=>{
                if(err){
                    rejects(err);
                }else{
                    resolve(data);
                }
            })
        })
    }
    // lấy ra 1 blog
    getBlog(id){
        return new Promise((resolve,rejects)=>{
            this.connection.query(`select * from blogs where blogs.id=${id}`,(err,data)=>{
                if(err){
                    rejects(err);
                }else{
                    resolve(data);
                }
            })
        }) 
    };
    // tìm kiếm 1 blog theo tên
    getblogWithTitle(title){
        return new Promise((resolve,rejects)=>{
            this.connection.query(`select * from blogs where blogs.title like "%${title.q}%"`,(err,data)=>{
                if(err){
                    rejects(err);
                }else{
                    resolve(data);
                }
            })
        }) 
    };
    // xem danh sách blog đã đăng của tôi
    getMyBlogs(id_user){
        return new Promise((resolve,rejects)=>{
            this.connection.query(`select * from blogs where blogs.user_id=${id_user}`,(err,data)=>{
                if(err){
                    rejects(err);
                }else{
                    resolve(data);
                }
            })
        })
    };
    getBlogWithCategory(id_category){
        return new Promise((resolve,rejects)=>{
            this.connection.query(`select * from blogs where blogs.category_id=${id_category}`,(err,data)=>{
                if(err){
                    rejects(err);
                }else{
                    resolve(data);
                }
            })
        })
    }
    // sửa blog
    // editMyBlog(id,blog){
    //     let 
    // }
    // xoad blog
    deleteBlog(id){
        let queryDelete=`delete from blogs where blogs.id=${id}`;
        this.connection.query(queryDelete,(err,data)=>{
            if(err){
                console.log(err);
            }else{
                console.log('delete success');
            }
        })
    }

    // tạo 1 blog
    createBlog(blog,id_user,id_category){
        let query=`insert into blogs (title,author,content,image,user_id,category_id) values ('${blog.title}','${blog.author}','${blog.content}','${blog.image}',${id_user},${id_category})`
        this.connection.query(query,(err,data)=>{
            if(err){
                console.log(err);
            }else{
                console.log('create success');
            }
        })
    }
    // khóa 1 blog
    async lockBlog(id) {
        let blog = await this.getBlog(id);
        if (blog[0].status === 1) {
            let query = `UPDATE blogs SET status = 0 WHERE id=${id};`;
            this.connection.query(query, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('lock success');
                }
            })
        } else {
            let query = `UPDATE blogs SET status = 1 WHERE id=${id};`;
            this.connection.query(query, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('unlock success');
                }
            })
        }
    }

}
module.exports=Blog;
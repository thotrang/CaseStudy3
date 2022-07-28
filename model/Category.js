const { rejects } = require('assert');
const { resolve } = require('url');
const Connection = require('./connection.js');

class Category {
    constructor() {
        this.connection = Connection.createConnection();
        this.connection.connect((err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('connect success');
            }
        })
    };
    // trả về danh sách các danh mục
    getCategories() {
        return new Promise((resolve, rejects) => {
            this.connection.query('select * from categories', (err, data) => {
                if (err) {
                    rejects(err);
                }else{
                    resolve(data)
                }
            })
        })
    };
    // trả về danh sách các danh mục chứa số lượng blog
    getCategoriesWithBLog() {
        return new Promise((resolve, rejects) => {
            let query = `SELECT categories.*, COUNT(blogs.id) AS numberOfBlog FROM categories,blogs
                        GROUP BY categories.name;`;
            this.connection.query(query, (err, data) => {
                if (err) {
                    rejects(err);
                } else {
                    resolve(data);
                }
            })
        })
    }
    // tạo 1 danh mục
    createCategory(category) {
        let queryCreate = `insert into categories (name) values ('${category.nameCategory}')`;
        this.connection.query(queryCreate, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log('create category success');
            }
        })
    };
    // xóa 1 danh mục
    deleteCategory(id) {
        let query = `delete from categories where categories.id=${id}`;
        this.connection.query(query, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log('delete category success');
            }
        })
    }

    findByNameCategory(name){
        return new Promise((resolve,rejects)=>{
            this.connection.query(`select * from categories where name = '${name}'`,(err,data)=>{
                if(err){
                    rejects(err);
                }else{
                    resolve(data)
                }
            })
        })
    }

    // chỉnh sửa category
    editCategory(id, category) {
        let query = `update categories set name='${category.nameCategory}' where id=${id}`;
        this.connection.query(query, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('edit success');
            }
        })
    }
    getCategoryWithName(name) {
        return new Promise((resolve, rejects) => {
            this.connection.query(`select * from categories where name like "%${name.q}%"`, (err, data) => {
                if (err) {
                    rejects(err);
                } else {
                    resolve(data)
                }
            })
        })
    }
    getCategory(id){
        return new Promise((resolve, rejects) => {
            this.connection.query(`select * from categories where categories.id=${id}`, (err, data) => {
                if (err) {
                    rejects(err);
                } else {
                    resolve(data);
                }
            })
        })
    }
};
module.exports = Category;
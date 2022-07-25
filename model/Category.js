const { rejects } = require('assert');
const { resolve } = require('url');
const Connection=require('./connection.js');

class Category{
    constructor(){
        this.connection= Connection.createConnection();
        this.connection.connect((err)=>{
            if(err){
                console.log(err);
            }else{
                console.log('connect success');
            }
        })
    };
    // trả về danh sách các danh mục
    getCategories(){
        return new Promise((resolve,rejects)=>{
            this.connection.query('select * from categories',(err,data)=>{
                if(err){
                    rejects(err);
                }else{
                    resolve(data)
                }
            })
        })
    };
    // tạo 1 danh mục
    createCategory(category){
        let queryCreate=`insert into categories (name) values (${category.name})`;
        this.connection.query(queryCreate,(err,data)=>{
            if(err){
                console.log(err);
            }else{
                console.log('create category success');
            }
        })
    };
    // xóa 1 danh mục
    deleteCategory(id){
        let query=`delete from categories where categories.id=${id}`;
        this.connection.query(query,(err,data)=>{
            if(err){
                console.log(err);
            }else{
                console.log('delete category success');
            }
        })
    }
    
};
module.exports=Category;
const fs= require('fs');
const Category = require('../model/Category.js');
const Blog = require('../model/Blog.js');
class HomeController{
    constructor(){
        this.blog = new Blog();
        this.category = new Category();
    }
    showHome(req,res){
        fs.readFile('./views/home/home.html','utf-8',async (err,data)=>{

            if(err){
                console.log(err);
            }else{
                let blogs=await this.blog.getBlogs();
                let categories=await this.category.getCategories();
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
                    category+=`<a href="/login" class="fh5co_tagg">${categories[i].name}</a>`
                }
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
};
module.exports=HomeController;
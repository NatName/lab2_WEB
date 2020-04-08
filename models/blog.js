const fs = require('fs').promises;

class Blog {

    async getComments(id) {
        const { comments } = JSON.parse(await fs.readFile('./data/comments.json', "utf8"));
        const comment = comments.filter(comment => comment.id === id);
                
        return comment[0];
    }

    async deleteComments(id) {
        
        const { commentsId, comments } = JSON.parse(await fs.readFile('./data/comments.json', "utf8"));
        const comment = comments.filter(comment => id.some(temp => temp !== parseInt(comment.id)));
        console.log(comment);
                
        await fs.writeFile('./data/comments.json', JSON.stringify({commentsId, comments: comment}));
    }

    async find() {
        try {

            const { blogs } = JSON.parse(await fs.readFile('./data/blogs.json', "utf8"));
           
            if (blogs.length === 0)
                return [

                ]
            
            for (const blog of blogs) {
                const commentsPromises = blog.comments.map(this.getComments); 
                
                const comments = await Promise.all(commentsPromises);
                
                blog.comments = comments;
            }  
                      
            return blogs;           
        } catch (error) {
            return [
                    
                ]
            
        }

    };

    async addBlog({name, text}) {
        try {
            const blogsJSON = JSON.parse(await fs.readFile('./data/blogs.json', "utf8"));
            const { blogs, blogsId } = blogsJSON;
            let id = blogsId;
            
            blogs.push({id, name, text,
                comments: [

                ]
            });

            const listBlogs = {
                blogsId: ++id,
                blogs
            }

            await fs.writeFile('./data/blogs.json', JSON.stringify(listBlogs));

            return blogs;           
        } catch (error) {
            console.log(error);            
        }
    };

    async deleteBlog(id) {
        try {
            
            const { blogs, blogsId } = JSON.parse(await fs.readFile('./data/blogs.json', "utf8"));
            const currentBlog = blogs.filter(blog => blog.id === parseInt(id));
            await this.deleteComments(currentBlog[0].comments);
            const blogsFilter = blogs.filter(blog => blog.id !== parseInt(id));
            
            const listBlogs = {
                blogsId,
                blogs: blogsFilter
            }
                          
            await fs.writeFile('./data/blogs.json', JSON.stringify(listBlogs));

            return blogs;           
        } catch (error) {
            console.log(error);            
        }
    };
  }
  
  
module.exports = Blog;


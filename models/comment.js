const fs = require('fs').promises;

class Comment {

    async addCommentToBlog(id, commentsId) {
        
        const { blogs, blogsId } = JSON.parse(await fs.readFile('./data/blogs.json', "utf8"));
        const blog = blogs.map(blog => {
            if(blog.id ===  parseInt(id)) {
                const { comments } = blog;
                
                comments.push(commentsId)               
                blog.comments = comments;
            }            
            return blog;
        });        

        await fs.writeFile('./data/blogs.json', JSON.stringify({blogsId, blogs: blog}));
    }

    async addComment({text, blogId}) {
        try {
            const { comments, commentsId } = JSON.parse(await fs.readFile('./data/comments.json', "utf8"));
            this.addCommentToBlog(blogId, commentsId);
            let id = commentsId;

            comments.push({id, text});

            const listComments = {
                commentsId: ++id,
                comments
            }

            await fs.writeFile('./data/comments.json', JSON.stringify(listComments));         
        } catch (error) {
            console.log(error);            
        }
    };

    async countComments() {
        try {
            
            const { blogs, blogsId } = JSON.parse(await fs.readFile('./data/blogs.json', "utf8"));
            
            const comments = [ ];
            
            for (const blog of blogs) {
                comments.push({
                    name: blog.name,
                    comments: blog.comments.length
                })
            }
            
            return comments;
        } catch (error) {
            console.log(error);            
        }
    };

  }
  
  
module.exports = Comment;

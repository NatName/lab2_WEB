import Blog from '../models/blog';
import Comment from '../models/comment';
const comment = new Comment();

const addComment = async (req, res) => {
    try {
      
      const {text} = req.body;
      
      const {id} = req.params;
      
      await comment.addComment({text, blogId: id});
      
  
      return res.json({
          message: "new comment",
      });
    } catch (e) {
      return res.status(500).json({
        message: e,
      });
    }
  };

  const count = async (req, res) => {
    try {
      
      const data = await comment.countComments();
      
      return res.json({
        data,
      });
    } catch (e) {
      console.log(e);
      
      return res.status(500).json({
        message: e,
      });
    }
  };


module.exports = {
  addComment,
  count
};
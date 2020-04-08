import Blog from '../models/blog';
const blog = new Blog();

const list = async (req, res) => {
  try {
    const blogs = await blog.find();   
    
    
    res.render('blogs', {
        blogs,
    });    
    
  } catch (e) {
    return res.status(500).send({
      message: e,
    });
  }
};

const addBlog = async (req, res) => {
    try {
      
      await blog.addBlog(req.body);  
  
      return res.json({
          message: "new blog",
      });
    } catch (e) {
      return res.status(500).json({
        message: e,
      });
    }
  };

  const deleteBlog = async (req, res) => {
    try {
      await blog.deleteBlog(req.body.id);
  
      return res.json({
          message: "delete blog",
      });
    } catch (e) {
      return res.status(500).json({
        message: e,
      });
    }
  };


module.exports = {
  list,
  addBlog,
  deleteBlog
};

import express from 'express';
import blogControllers from './controllers/blog';
import commentControllers from './controllers/comments';

const router = express.Router();

//blogs
router.get('/blogs', blogControllers.list);
router.post('/blogs', blogControllers.addBlog);
router.delete('/blogs', blogControllers.deleteBlog);

//comments
router.post('/blogs/comments/:id', commentControllers.addComment);

router.get('/count', commentControllers.count);

module.exports = router;
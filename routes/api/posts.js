/* =================================
API POSTS PAGE C/R/U/D
==================================== */

// Require Express Library
const express = require('express');

// Use the router function in the express library
const router = express.Router();

// Require our validation functions from the express library
const { check, validationResult } = require('express-validator');

// Require our Auth middleware
const auth = require('../../middleware/auth');

// Require our User model
const User = require('../../models/User');

// Require our Post model
const Post = require('../../models/Post');


/* =================================
          CREATE C/R/U/D
==================================== */

// CREATE / POST api/posts
router.post('/', [auth, [
  check('text', 'Text Field is required').not().isEmpty(),
]], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findById(req.user.id).select('-password');

    const newPost = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
    };

    const post = new Post(newPost);

    await post.save();
    return res.json(post);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server Error');
  }
});

// CREATE / COMMENT api/posts/comment/:id
router.post('/comment/:id', [auth, [
  check('text', 'Text Field is required').not().isEmpty(),
]], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findById(req.user.id).select('-password');
    const post = await Post.findById(req.params.id);

    const newComment = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
    };

    post.comments.unshift(newComment);

    await post.save();

    return res.json(post.comments);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server Error');
  }
});


/* =================================
          READ C/R/U/D
==================================== */

// READ All POSTS / GET api/posts
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    return res.json(posts);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server Error');
  }
});

// READ ONE POSTS by Id / GET api/posts/:id
router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'No Post was found!' });
    }

    return res.json(post);
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'No Post was found!' });
    }
    return res.status(500).send('Server Error');
  }
});

/* =================================
          UPDATE C/R/U/D
==================================== */

// UPDATE A POST (LIKE) / PUT api/posts/like/:id
router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has already been liked
    if (post.likes.filter((like) => like.user.toString() === req.user.id).length > 0) {
      return res.status(400).json({ msg: 'Post has already been liked' });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    return res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server Error');
  }
});

// UPDATE A POST (UNLIKE) / PUT api/posts/unlike/:id
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has already been liked
    if (post.likes.filter((like) => like.user.toString() === req.user.id).length === 0) {
      return res.status(400).json({ msg: 'Post has not been liked, yet' });
    }

    // New array of likes without the unlike one
    const updatedLikes = post.likes.filter((element) => element.user.toString() !== req.user.id);

    post.likes = updatedLikes;

    await post.save();

    return res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server Error');
  }
});

/* =================================
          DELETE C/R/U/D
==================================== */

// DELETE A POST / DELETE api/posts/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post exists
    if (!post) {
      return res.status(404).json({ msg: 'No Post was found!' });
    }

    // Check is the post belongs to the user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'No authorization' });
    }

    // remove post
    await post.remove();

    return res.json({ mgs: 'Post has been removed' });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'No Post was found!' });
    }
    console.error(error.message);
    return res.status(500).send('Server Error');
  }
});

// DELETE A COMMENT / DELETE api/posts/comment/:id/:comment_id
router.delete('/comment/:post_id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    const comment = post.comments.find((element) => element.id === req.params.comment_id);

    if (!comment) {
      return res.status(404).json({ msg: 'Comment non existent' });
    }

    // Check if the comment belongs to the user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User is not authorized' });
    }

    // // New array of comments without the selected comment
    const updatedComments = post.comments.filter((element) => element.id !== req.params.comment_id);

    post.comments = updatedComments;

    await post.save();

    return res.json(post.comments);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server Error');
  }
});


module.exports = router;

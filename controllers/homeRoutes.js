const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/login", async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    // Pass serialized data and session flag into template
    res.render("login", {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const projectData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["first_name"],
        },
        {
          model: Comment
        }
      ],
    });

    // Serialize data so the template can read it
    const posts = projectData.map((post) => post.get({ plain: true }));
    console.log(posts);

    // Pass serialized data and session flag into template
    res.render("newsfeed", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/profile", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }]
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/create-post", async (req, res) => {
  if (req.session.logged_in) {
    res.render('create-post');
    return;
  }

  res.render('login');

});
router.get("/update-post/:id", async (req, res) => {
  if (req.session.logged_in) {
    try {
      // Get all projects and JOIN with user data
      const postData = await Post.findOne({
        include: [
          {
            model: User,
            attributes: ["first_name"],
          }
        ],
        where: {
          id: req.params.id,
          user_id: req.session.user_id
        }
      });
  
      // Serialize data so the template can read it
      const post =  postData.get({ plain: true });
      console.log(post);
  
      // Pass serialized data and session flag into template
      res.render('update-post', {
        post,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
    }
    return;
  }

  res.render('login');

});

module.exports = router;

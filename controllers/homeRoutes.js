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

router.get("/newsfeed", async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const projectData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["first_name", "profile_picture"],
        },
        {
          model: Comment,
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = projectData.map((post) => post.get({ plain: true }));
    console.log(posts);

    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Post }],
    });
    //
    const user = userData.get({ plain: true });

    // Pass serialized data and session flag into template
    res.render("newsfeed", {
      posts,
      logged_in: req.session.logged_in,
      user,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/profile", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Post }],
    });
    //
    const user = userData.get({ plain: true });

    res.render("profile", {
      isCurrentUser: true,
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/profile/:id", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findOne({
      include: [{ model: Post }],
      where: {
        id: req.params.id,
      },
    });
    //
    const user = userData.get({ plain: true });
    
    console.log(req.session.user_id);
    console.log(req.params.id);
    res.render("profile", {      
      // is id == post.user_id
      isCurrentUser: req.session.user_id == req.params.id,
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get("/create-post", async (req, res) => {
  if (req.session.logged_in) {
    const currUser = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Post }],
    });
    //
    const user = currUser.get({ plain: true });

    res.render("create-post", {
      user,
    });
    return;
  }

  res.render("login");
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
          },
        ],
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });

      // Serialize data so the template can read it
      const post = postData.get({ plain: true });
      console.log(post);

      // Pass serialized data and session flag into template
      res.render("update-post", {
        post,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
    }
    return;
  }

  res.render("login");
});

router.get("/search/:query", async (req, res) => {
  try {
    const query = req.params.query;
    console.log(query);
    // Get all projects and JOIN with user data
    const userData = await User.findAll();

    // const userData = data.get({ plain: true });
    const filteredUsers = userData.filter((user) => {
      const username = `${user.first_name} + ${user.last_name}`.toLowerCase();
      return username.includes(query.toLowerCase());
    });

    const currUser = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Post }],
    });
    //
    const user = currUser.get({ plain: true });

    // const serialized = filteredUsers.get({ plain: true });

    // postData

    // res.json(serialized);
    console.log(filteredUsers);
    // Pass serialized data and session flag into template
    res.render("search-results", {
      results: filteredUsers,
      user,
      // logged_in: req.session.logged_in,
      // user,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

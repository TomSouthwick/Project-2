const router = require("express").Router();
const { User, Post } = require("../models");
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

const posts_stub = [
  {
    id: 1,
    title: "Music Near Me",
    description:
      "A mobile app that will send you notifications whenever a concert is playing in your area.",
    date_created: "2021-12-02T10:48:27.000Z",
    user_id: 2,
    user: { first_name: "Bill" },
    img_url:
      "https://cdn.shopify.com/s/files/1/1190/4748/t/10/assets/logo.png?v=5439823434889869121",
  },
  {
    id: 2,
    title: "The Ultimate Tech Quiz",
    description:
      "A web app that will give users 10 new technical questions each day and track their progress in things like programming, cybersecurity, database architecture, and more!",
    date_created: "2021-12-02T10:48:27.000Z",
    user_id: 1,
    user: { first_name: "Mark" },
    img_url:
      "https://cdn.shopify.com/s/files/1/1190/4748/t/10/assets/logo.png?v=5439823434889869121",
  },
  {
    id: 3,
    title: "Roll 'Em Up",
    description:
      "A game for Windows and macOS where players move a ball through a series of increasingly challenging mazes.",
    date_created: "2021-12-02T10:48:27.000Z",
    user_id: 1,
    user: { first_name: "Mark" },
    img_url:
      "https://cdn.shopify.com/s/files/1/1190/4748/t/10/assets/logo.png?v=5439823434889869121",
  },
];

router.get("/", async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const projectData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["first_name"],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = projectData.map((post) => post.get({ plain: true }));
    console.log(posts);

    // Pass serialized data and session flag into template
    res.render("newsfeed", {
      //posts: posts,
      posts: posts_stub,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/profile", async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const projectData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["first_name"],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = projectData.map((post) => post.get({ plain: true }));
    console.log(posts);

    // Pass serialized data and session flag into template
    res.render("profile", {
      //posts: posts,
      posts: posts_stub,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

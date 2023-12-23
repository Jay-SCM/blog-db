let express = require("express");
let router = express.Router();
let Controllers = require("../controllers"); //index.js

// matches GET requests to /api/posts (the prefix from server.js)
router.get("/", (req, res) => {
    Controllers.postController.getPosts(res);
});

// matches POST requests to /api/posts/create
router.post("/create", (req, res) => {
    Controllers.postController.createPost(req.body, res);
});

// matches PUT requests to /api/posts/123 (stores 123 in id param)
router.put("/:id", (req, res) => {
    Controllers.postController.updatePost(req, res);
});

// matches DELETE requests to /api/posts/123 (stores 123 in id param)
router.delete("/:id", (req, res) => {
    Controllers.postController.deletePost(req, res);
});

// matches GET requests to /api/posts/user/123 (stores 123 in uid param)
router.get("/user/:uid", (req, res) => {
    // dynamic user id for filtering posts
    Controllers.postController.getUserPosts(req, res);
});

// matches GET requests to /api/posts/filter
router.get("/filter", (req, res) => {
    // uses query parameters to filter posts by user fields
    Controllers.postController.filterUserPosts(req, res);
});

module.exports = router;

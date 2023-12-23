let express = require("express");
let router = express.Router();
let Controllers = require("../controllers"); //index.js

// matches GET requests to /api/comments (the prefix from server.js)
router.get("/", (req, res) => {
    Controllers.commentController.getComments(res);
});

// matches POST requests to /api/comments/create
router.post("/create", (req, res) => {
    Controllers.commentController.createComment(req.body, res);
});

// matches PUT requests to /api/comments/123 (stores 123 in id param)
router.put("/:id", (req, res) => {
    Controllers.commentController.updateComment(req, res);
});

// matches DELETE requests to /api/comments/123 (stores 123 in id param)
router.delete("/:id", (req, res) => {
    Controllers.commentController.deleteComment(req, res);
});

// matches GET requests to /api/comments/post/123 (stores 123 in pid param)
router.get("/post/:pid", (req, res) => {
    // dynamic user id for filtering posts
    Controllers.commentController.getPostComments(req, res);
});

module.exports = router;

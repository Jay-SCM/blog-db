"use strict";
let Models = require("../models"); // matches index.js

const getPosts = (res) => {
    // finds all posts
    Models.Post.findAll({})
        .then((data) => res.send({ result: 200, data: data }))
        .catch((err) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

const createPost = (data, res) => {
    // creates a new post using JSON data POSTed in request body
    console.log(data);
    Models.Post.create(data)
        .then((data) => res.send({ result: 200, data: data }))
        .catch((err) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

// uses JSON from request body to update post matching ID from params
const updatePost = (req, res) => {
    Models.Post.update(req.body, { where: { id: req.params.id } })
        .then(data => {
            res.send({ result: 200, data: data });
        }).catch((err) => {
        console.log(err);
        res.send({ result: 500, error: err.message });
    });
};

// deletes post matching ID from params
const deletePost = (req, res) => {
    Models.Post.destroy({ where: { id: req.params.id } })
        .then(data => {
            res.send({ result: 200, data: data });
        }).catch((err) => {
        console.log(err);
        res.send({ result: 500, error: err.message });
    });
};

// see https://sequelize.org/docs/v6/advanced-association-concepts/eager-loading/#basic-example
// optional function to demonstrate how to join two tables (posts and users) by including data from both in the response
const getUserPosts = (req, res) => {
    // finds all posts for a given user and populates with matching user details
    Models.Post.findAll({ where: { userId: req.params.uid }, include: Models.User })
        .then((data) => res.send({ result: 200, data: data }))
        .catch((err) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

// see https://sequelize.org/docs/v6/advanced-association-concepts/eager-loading/#basic-example
// optional function to demonstrate how to join tables (posts and users) based on a where condition from the joined table (users)
const filterUserPosts = (req, res) => {
    // finds all posts for a given user field (from query params), and populates including user details. joins two tables via the foreign key
    Models.Post.findAll({ include: { model: Models.User, where: req.query }})
        .then((data) => res.send({ result: 200, data: data }))
        .catch((err) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

module.exports = {
    getPosts,
    createPost,
    updatePost,
    deletePost,
    getUserPosts,
    filterUserPosts
};
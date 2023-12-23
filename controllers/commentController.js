"use strict";
let Models = require("../models"); // matches index.js

const getComments = (res) => {
    // finds all comments
    Models.Comment.findAll({})
        .then((data) => res.send({ result: 200, data: data }))
        .catch((err) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

const createComment = (data, res) => {
    // creates a new comment using JSON data POSTed in request body
    Models.Comment.create(data)
        .then((data) => res.send({ result: 200, data: data }))
        .catch((err) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

// uses JSON from request body to update comment matching ID from params
const updateComment = (req, res) => {
    Models.Comment.update(req.body, { where: { id: req.params.id } })
        .then((data) => {
            res.send({ result: 200, data: data });
        })
        .catch((err) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

// deletes comment matching ID from params
const deleteComment = (req, res) => {
    Models.Comment.destroy({ where: { id: req.params.id } })
        .then((data) => {
            res.send({ result: 200, data: data });
        })
        .catch((err) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

// see https://sequelize.org/docs/v6/advanced-association-concepts/eager-loading/#basic-example
// optional function to demonstrate how to join two tables (posts and comments) by including data from both in the response
const getPostComments = (req, res) => {
    // finds all posts for a given comment and populates with matching post details
    Models.Comment.findAll({
        where: { postId: req.params.pid },
        include: Models.Post,
    })
        .then((data) => res.send({ result: 200, data: data }))
        .catch((err) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

module.exports = {
    getComments,
    createComment,
    updateComment,
    deleteComment,
    getPostComments
};
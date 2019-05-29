const express = require('express');
const db = require('./userDb');
const router = express.Router();


/*  
get,
getById,
getUserPosts,
insert,
update,
remove,
*/

router.post('/', (req, res) => {

});

router.post('/:id/posts', (req, res) => {

});

router.get('/', (req, res) => {
    res.send(`<h2>Users Router Working!</h2>`)
});

router.get('/:id', (req, res) => {

});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {

};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;

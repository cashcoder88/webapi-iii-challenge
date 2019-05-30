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
    db.get()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        res.status(500).json({error: 'unable to get users', err})
    })
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
    const userId = getById(req.params.id)
    if (userId) {
        req.user = user;
    } else {
        res.sendStatus(400).json({message: "invalid user id"})
    }
    next();
};



function validateUser(req, res, next) {
    if (!req.body || !req.body.name) {
        res.status(400).json({message: "missing required name field"})
    }
    next();
};

function validatePost(req, res, next) {
    if (!req.body || !req.body.text) {
        res.status(400).json({message: "missing required text field"})
    }
    next();
};

module.exports = router;

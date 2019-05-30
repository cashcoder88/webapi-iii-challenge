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
        res.status(500).json({error: 'unable to get users'})
    })
});

router.get('/:id', (req, res) => {
    const {id} = req.params;
    db.getById(id)
    .then(user => {
        if (user) {
            res.status(200).json(user)
        } else {
            res.status(404).json({message: 'unable to get user with specified id'})
        }
    })
    .catch(err => {
        res.status(500).json({error: 'unable to get user by id'});
    })
});

router.get('/:id/posts', (req, res) => {
    const {id} = req.params;
    // console.log('params', req.params)
    // console.log('body', req.body);
    db.getUserPosts(id)
    .then(posts => {
        res.status(200).json(posts) 
    })
    .catch(err => {
        res.status(500).json({error: 'unable to get user by id'});
    })
});

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    db.remove(id)
    .then(deleted => {
        if(deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({
                message: 'user with specified id could not be located'
            })
        }
    })
    .catch(err => {
        res.status(500).json({error: "The user could not be removed" })
    })
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

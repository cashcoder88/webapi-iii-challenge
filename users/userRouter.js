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

router.post('/', validateUser, (req, res) => {
    const users = req.body;
    db.insert(users)
        .then(users => {
            // let user = User.insert({ name: req.body.name })
            res.status(201).json({users})
        })
        .catch(err => {
            res.status(500).json({
                error: "There was an error while saving the user to the database"
        })
    })
});


router.post('/:id/posts', validateUserId, validatePost, async (req, res) => {
    try {
        const post = {"user_id": req.params.id, "text": req.body.text };
        const savedPost = await db.insert(post);
        res.status(201).json(savedPost);
    } catch(err) {
        res.status(500).json({"errorMessage": "Could not save new post in database"})
    }
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


//come back to this
router.put('/:id', (req, res) => {

});

//custom middleware
// come back to this
function validateUserId(req, res, next) {
    const id = req.params.id
    if (id) {
        const user = getById(req.params.id)
        req.user = user;
        next();
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
    if (!req.body) {
        res.status(400).json({ error: { message: `Missing required post data.` }})
      }
    
      if (!req.body.text) {
        res.status(400).json({ error: { message: `Missing required text field.` }})
      }
    next();
};

module.exports = router;

const express = require("express");

 // const db = require("../data/db-config.js");  // moved this into user-model.js file

 // create a const to export user-model.js
 const Users = require("./users-model.js"); // added

const router = express.Router();

router.get("/", (req, res) => {

  // db('users') 
  // instead of calling knex we can call our model

  Users.find() /* new code doesn't take any parameters & it will return the same promise that knex returns in user-model.js because of that it is promise based
   this provides us a centralized place where we can control access to the DB through knex. This will help keep our code DRY */
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get users" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  // db("users")
  //   .where({ id })
  Users.findById(id)
    .then(user => {  // changed users to user
      // we are dealing with the array here by taking the user's array & then getting the zeroth element out that

      // because we are passing back an object that the user's object or user object
      // const user = users[0]; don't need this anymore

      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "Could not find user with given id." });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get user" });
    });
});

router.get('/:id/posts', (req, res) => {
  const { id } = req.params;


  // db('posts as p')
  Users.findPosts(id)

  // moved the below commented out code to users-model.js
  // .join('users as u', 'u.id', 'p.user_id') 
  // .select('p.id', 'u.username', 'p.contents') 
  // .where({ user_id: id })

    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
      res.status(500).json({ message: 'problem with the db', error: err });
    });
});

router.post("/", (req, res) => {
  const userData = req.body;

  Users.add(userData)

  // moved the below commented out code to users-model.js
  // db("users")
  //   .insert(userData, "id")

    .then(ids => {
      res.status(201).json({ created: ids[0] });
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to create new user" });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Users.update(id, changes)

  // moved the below commented out code to users-model.js
  // db("users")
  //   .where({ id })
  //   .update(changes)


    .then(count => {
      if (count) {
        res.json({ update: count });
      } else {
        res.status(404).json({ message: "Could not find user with given id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to update user" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Users.remove(id)
  
  // moved the below commented out code to users-model.js
  // db("users")
  //   .where({ id })
  //   .del()

    .then(count => {
      if (count) {
        res.json({ removed: count });
      } else {
        res.status(404).json({ message: "Could not find user with given id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to delete user" });
    });
});

module.exports = router;

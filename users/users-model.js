const db = require("../data/db-config.js");

function find() {
    return db('users');
}

function findById(id) {
    return db('users').where({id}).first();
    /* the first method is going to take the first element
        out of the array that comes back here and then return
        it.
        .first() will return an undefined if there isn't anything that come back

    */
}

function findPosts(id) {
    return db('posts as p')  
  .join('users as u', 'u.id', 'p.user_id') 
  .select('p.id', 'u.username', 'p.contents') 
  .where({ user_id: id });
}

function add(user) {
   return db("users")
    .insert(user, "id"); // removed useData to user
}


// going to need both the id and changes (userData)
function update(id, changes) {
    return db("users")
    .where({ id })
    .update(changes);
}

function remove(id) {
    return db("users")
    .where({ id })
    .del();
}

// our CRUD funtions that are being accessed by our DB

module.exports = {
    find,
    findById,
    findPosts,
    add,
    update, 
    remove
}


/* 
db('posts as p')  // changed
  .join('users as u', 'u.id', 'p.user_id') // join statement allows us to specify the fields (shortcut syntax) for each table that should be part of the ON clause
  .select('p.id', 'u.username', 'p.contents') // need to add this 
  .where({ user_id: id })
*/
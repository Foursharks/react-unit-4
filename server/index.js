require('dotenv').config()
const {sequelize} = require('./util/database')
const {User} = require('./models/user')
const {Post} = require('./models/post')

const express = require('express')
const cors = require('cors')

const {PORT} = process.env
const {getAllPosts, getCurrentUserPosts, addPost, editPost, deletePost} = require('./controllers/posts')
const {register, login} = require('./controllers/auth')
const {isAuthenticated} = require('./middleware/isAuthenticated')

const app = express()
app.use(cors())

app.use(express.json())


//Define user and post relationships
//this will automatically create primary and foreign keys - 
User.hasMany(Post)
Post.belongsTo(User)

//catch uncaught exceptions
process.on('uncaughtException', function (err) {
    console.log(err);
  });
//AUTH
app.post('/register', register)
app.post('/login', login)

// GET POSTS - no auth
app.get('/posts', getAllPosts)

// CRUD POSTS - auth required
app.get('/userposts/:userId', getCurrentUserPosts)
app.post('/posts', isAuthenticated, addPost)
app.put('/posts/:id', isAuthenticated, editPost)
app.delete('/posts/:id', isAuthenticated, deletePost)

//syncs what I have in my files with DB  - this will create the tables if there is no issue, ie table doesn't already exist, or if there are duplicate or unclear columns
sequelize.sync({ force: true })
// sequelize.sync()
    .then(() => {
        app.listen(PORT, () => console.log(`db sync successful & server running on port ${PORT}`))
    })
    .catch(err => console.log(err))
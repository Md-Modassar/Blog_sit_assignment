const express = require('express');
const router = express.Router()


const { createuser, login } = require("../Controller/UserController")
const { authentication, authorization } = require("../midelware/auth")
const { PostCreate, updatePost, getPost, getPostByid, detelePost } = require("../Controller/PostController")

router.post("/user", createuser)
router.post("/login", login)

router.post("/post", authentication, PostCreate)
router.put("/post/:postId", authentication, authorization, updatePost)
router.get("/post", authentication, getPost)
router.get("/post/:postId", authentication, getPostByid)
router.delete("/post/:postId", authentication, authorization, detelePost)


module.exports = router

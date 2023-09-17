const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const objectid = mongoose.Types.ObjectId
const PostModel = require('../Model/PostModel')

exports.authentication = async (req, res, next) => {
    try {

        let token = req.headers.authorization
        if (!token) return res.status(400).send({ status: false, message: "Token is mandatory" })
        token = token.split(" ")
        jwt.verify(token[1], "thismytoken", (error, decoded) => {
            if (error) return res.status(401).send({ status: false, message: error.message })
            req.id = decoded.userId
            next()
        })

    } catch (err) {
        return res.status()
    }
}
exports.authorization = async (req, res, next) => {
    try {
        const postid = req.params.postId

        if (!objectid.isValid(postid)) {
            return res.status(400).send({ status: false, message: "Please enter valid postid" })
        }
        const post = await PostModel.findById(postid)
        if (!post) {
            return res.status(404).send({ status: false, message: "Post is not found" })
        }
        const userid = post.authorId
        const id = req.id
        if (userid == id) {
            next();
        } else {
            return res.status(403).send({ status: false, message: "unathorize user" })
        }

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}
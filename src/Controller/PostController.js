const PostModel = require("../Model/PostModel")
const multer = require('multer')
const UserModel = require('../Model/UserModel')
const { authentication } = require("../midelware/auth")
const mongoose = require('mongoose')
const objectid = mongoose.Types.ObjectId

//=====================uplod Profile picture========================//
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});
var upload = multer({ storage: storage }).single('Profile_picture');
//=====================================================================//

exports.PostCreate = async (req, res) => {
  try {

    const data = req.body
    const { title, discription, tags, category, commite, auther_Name } = data
    data.image = req.files[0].mimetype

    if (!title) {
      return res.status(400).send({ status: false, message: "Please Enter title" })
    }
    if (!discription) {
      return res.status(400).send({ status: false, message: "Please Enter discription" })
    }
    if (!category) {
      return res.status(400).send({ status: false, message: "Please Enter category" })
    }
    if (!auther_Name) {
      return res.status(400).send({ status: false, message: "Please Enter auther_Name" })
    }
    const user = await UserModel.findOne({ Name: auther_Name })
    if (!user) {
      return res.status(404).send({ status: false, message: "user not found Enter valid author name" })
    }
    data.authorId = user._id
    data.publishedAt = new Date()
    const savedata = await PostModel.create(data)
    return res.status(201).send({ status: true, message: "Post create successfull", savedata })
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message })
  }
}

exports.updatePost = async (req, res) => {
  try {
    const data = req.body
    const postid = req.params.postId
    const post = await PostModel.findById(postid)
    if (!post) {
      return res.status(404).send({ status: false, message: "Post is not found" })
    }
    if (data.commite) {
      post.commite.push(data.commite)
      post.tags.push(data.tags)
      const update = await PostModel.findByIdAndUpdate(postid, post, { new: true })
      return res.status(200).send({ status: true, message: "update successfully", update })
    } else if (data.tags) {
      post.tags.push(data.tags)
      const update = await PostModel.findByIdAndUpdate(postid, post, { new: true })
      return res.status(200).send({ status: true, message: "update successfully", update })
    } else {
      const update = await PostModel.findByIdAndUpdate(postid, data, { new: true })
      return res.status(200).send({ status: true, message: "update successfully", update })
    }
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message })
  }
}
exports.getPost = async (req, res) => {
  try {
    const data = await PostModel.find()
    return res.status(200).send({ status: true, data })
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message })
  }
}

exports.getPostByid = async (req, res) => {
  try {
    const postid = req.params.postId;
    if (!objectid.isValid(postid)) {
      return res.status(400).send({ status: false, message: "Please enter valid postid" })
    }

    const post = await PostModel.findById(postid)
    if (!post) {
      return res.status(404).send({ status: false, message: "Post is not found" })
    }

    return res.status(200).send({ status: false, message: "successfull", post })
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message })
  }
}

exports.detelePost = async (req, res) => {
  try {
    let postid = req.params.postId;
    const data = await PostModel.findByIdAndDelete(postid)

    if (!data) {
      return res.status(404).send({ status: true, message: "Post is not found" })
    }
    return res.status(200).send({ status: true, message: "Delete Post Sccessfull" })

  } catch (err) {
    return res.status(500).send({ status: false, message: err.message })
  }
}
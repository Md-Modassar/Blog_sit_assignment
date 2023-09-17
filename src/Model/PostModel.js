const mongoose = require('mongoose');
const objectId = mongoose.Schema.Types.ObjectId

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  image: { type: String, required: true },
  discription: {
    type: String,
    required: true
  },
  authorId: {
    type: objectId,
    ref: "user",
    required: true
  },
  tags: [String],
  category: {
    type: String,
    required: true
  },
  commite: [String],
  publishedAt: {
    type: Date,

  }
}, { timestamps: true })

module.exports = mongoose.model('post', PostSchema)

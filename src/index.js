const express = require('express');
const mongoose = require('mongoose')
const route = require("./Routes/Routes")
const multer = require('multer')



const app = express()

app.use(express.json())
app.use(multer().any())

mongoose.connect("mongodb+srv://modassar123:modassar1234@test.ahxnnau.mongodb.net/blog_sit_assig", {
    useNewUrlParser: true
})
    .then(() => console.log("mongodb is connected"))
    .catch(Error => console.log(Error))
app.use("/", route)
app.listen(8080, () => {
    console.log("server running on 8080")
})




const UserModel = require("../Model/UserModel")
const jwt = require('jsonwebtoken');

exports.createuser = async (req, res) => {
  try {
    let data = req.body
    const { Name, Email, Password, Mobile_No } = data
    if (!Name) {
      return res.status(400).send({ status: false, message: "Please Enter Name" })
    }
    if (!Email) {
      return res.status(400).send({ status: false, message: "Please Enter Email" })
    }
    if (!Password) {
      return res.status(400).send({ status: false, message: "Please Enter Password" })

    }
    if (!Mobile_No) {
      return res.status(400).send({ status: false, message: "Please Enter Mobile_No" })
    }
    if (!Name.match(/^[A-Za-z ][A-Za-z _]{1,100}$/)) {
      return res.status(400).send({ status: false, message: "Please enter Aa-Zz string" })
    }
    if (!Email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/)) {
      return res.status(400).send({ status: false, message: "Enter valid email" })
    }
    if (!Mobile_No.match(/^[0-9]{10}$/)) {
      return res.status(400).send({ status: false, message: "Please enter valid mobile No" })
    }
    //check unique
    const emailexist = await UserModel.findOne({ Email: Email })
    if (emailexist) {
      return res.status(400).send({ status: false, message: "This Email alread exist,Pleaser enter another email" })
    }
    const Mobile_Noexist = await UserModel.findOne({ Mobile_No: Mobile_No })
    if (Mobile_Noexist) {
      return res.status(400).send({ status: false, message: "This Mobile_No alread exist,Please enter another Mobile_No" })
    }

    const savedata = await UserModel.create(data)

    return res.status(201).send({ status: true, message: "User Register successfull", savedata })

  } catch (err) {
    return res.status(500).send({ status: false, message: err.message })
  }
}

exports.login = async (req, res) => {
  try {
    const data = req.body;
    const { Email, Password } = data

    if (!Email) {
      return res.status(400).send({ status: false, message: "Please Enter Email" })
    }
    if (!Password) {
      return res.status(400).send({ status: false, message: "Please Enter Password" })

    }

    if (!Email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/)) {
      return res.status(400).send({ status: false, message: "Enter valid email" })
    }

    const user = await UserModel.findOne({ Email: Email })
    if (!user) {
      return res.status(404).send({ status: false, message: "Pleaser enter valid email" })
    }

    const token = jwt.sign({
      userId: user._id
    }, "thismytoken")

    return res.status(201).send({ status: true, message: "login successfull", token })

  } catch (err) {
    return res.status(500).send({ status: false, message: err.message })
  }
}
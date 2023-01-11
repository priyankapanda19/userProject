const express = require('express')
const router = express.Router()
const {createUser,userlogin}=require('../controller/userControler')
// const {createStudent,getStudent,deleteStudent}=require("../Controller/controller")
// const  { Authentication, Authorization }=require("../auth/authentication")


router.post("/resistor",createUser)
router.post('/login', userlogin)


// router.post("/addOrEdit", Authentication, Authorization ,createStudent)
// router.get("/view", Authentication, Authorization ,getStudent)
// router.delete("/delete", Authentication, Authorization ,deleteStudent)


//errorHandling for wrong address
router.all("/**", function (req, res) {         
    res.status(400).send({
        status: false,
        msg: "The api you request is not available"
    })
})
module.exports = router
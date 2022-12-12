const userModel = require("../model/userModel.js")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const { isValidBody, isValidEmail, isValidPwd, isValidName } = require("../validation/valid.js")


const passEncryption = async function(pass){

    const salt = await bcrypt.genSalt(10);
    let Encryptedpassword = await bcrypt.hash(pass, salt);

    return Encryptedpassword
}

const createUser = async (req, res) => {
    try {
        let { name, email, password } = req.body

        if (isValidBody(req.body))
            return res.status(400).send({ status: false, message: "Request body can't be empty" });

        if (!isValidName(name))
            return res.status(400).send({ status: false, message: "First Name must be present and only Alphabats " });

        if (!isValidEmail(email))
            return res.status(400).send({ status: "false", message: "Email id must be require and in valid formate" });

        if (!isValidPwd(password))
            return res.status(400).send({ status: "false", message: "Password must be require and Invalid formate,Minimum eight and maximum 15 characters, at least one uppercase letter, one lowercase letter, one number and one special character" });

        // Check for uniqueness of phone and email
        let user = await userModel.findOne({ email })
        if (user) {
            return res.status(409).send({ status: false, message: "Given email is already taken" })
        }
        //password encrption
        let pass =await passEncryption(password)
        req.body.password = pass

        const result = await userModel.create(req.body);
        res.status(201).send({ status: true, message: "User Created", data: result });
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

const userlogin = async (req, res) => {
    try {
        let { email,password } = req.body

        if (isValidBody(req.body))
            return res.status(400).send({ status: false, message: "Request body can't be empty" });
        if (!isValidEmail(email))
            return res.status(400).send({ status: "false", message: "Email id must be require and in valid formate" });

            let findUser = await userModel.findOne({ email: email });
        if (!findUser) return res.status(404).send({ status: false, message: "email is incorrect" });


//checking password using bycrypt
            let ValidPassword = await bcrypt.compare(password, findUser.password);
            if (!ValidPassword) return res.status(404).send({ status: false, message: "password is incorrect" });
        
        // let userDetails = await userModel.findOne({ email, ValidPassword })
        // if (!userDetails) {
        //     return res.status(404).send({ status: false, message: "Incorrect credentials" })
        // }
        let token = jwt.sign(
            { userId: userDetails._id },
            "Priy@nk@&%$2P@nDA@3579e2$%#*",
            { expiresIn: '1d' }
        )

        return res.status(201).send({ status: true, message: "Success", data: { token: token } });

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}


module.exports = {
    createUser,
    userlogin
}
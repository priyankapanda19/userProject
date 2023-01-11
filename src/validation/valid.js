const mongoose = require("mongoose")

const isValidBody = (reqBody) => {
    return Object.keys(reqBody).length == 0;
}

const isValidName = (name) => {
    return /^[a-zA-Z\. ]*$/.test(name)
}


const isValidEmail = (Email) => {
    return /^([A-Za-z0-9._]{3,}@[A-Za-z]{3,}[.]{1}[A-Za-z.]{2,6})+$/.test(Email)
};

const isValidPwd = (Password) => {
    return /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(Password)
};

const isValidObjectId = (objectId) => {
    return mongoose.Types.ObjectId.isValid(objectId);
  }


module.exports = {
    isValidBody, 
    isValidEmail, 
    isValidPwd, 
    isValidName,

    isValidObjectId
}

import { User, userValidator } from "../modells/user.js";
import bcrypt from "bcryptjs";
import { generateToken } from '../config/jwt.js'
export const getAllUsers = async (req, res) => {
    try {
        let allUsers = await User.find({}, "-password");
        res.json(allUsers)
    }
    catch (err) {
        res.status(500).send("cannot find the users");
    }
}

export const login = async (req, res) => {
    
    try {
        let { userName, email, password } = req.body;
        let validate = userValidator({ userName, email, password });
        if (userValidator.error)
            return res.status(400).send(userValidator.error[0]);
        let logedUser = await User.findOne({ userName });
        if (!logedUser)
            return res.status(400).send("user name is not exist");
        if (! await bcrypt.compare(password, logedUser.password))
            return res.status(400).send("user name is nnot exist");
        let { _id, email: e, userName: u, role } = logedUser;
        let token = generateToken(logedUser);
        res.json({ _id, email: e, userName: u, role, token });
    }
    catch (err) {
        res.status(500).send("cannot login");
    }
}

export const addUser = async (req, res) => {

    try {
        let {userName,email,password} = req.body;
        let validate = userValidator(req.body);
        console.log(validate);
        if  (validate.error)
            return res.status(400).send(validate.error.message);
         let hashedpassword = await bcrypt.hash(password, 10);
         let newUser=new User({userName, password:hashedpassword, email} );
         newUser.save();
        let { _id, userName:u, role, email:e } = newUser;
        let token = generateToken(newUser);
        res.json({ _id, userName:u, email:e,role, token });
    }
    catch (err) {
        res.status(500).send("cannot add");
    }
}
       

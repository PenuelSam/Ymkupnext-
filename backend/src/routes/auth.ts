import express,{Request, Response} from "express";
import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router()

router.post("/login", async (req: Request, res: Response) => {
    const {email, password} = req.body;
    try {
        let user = await User.findOne({email})
        if(!user || !(await bcrypt.compare(password, user.password))){
            return res.status(400).send("User not found")
        }

        
        const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET_KEY as string, {expiresIn: "1d"})

        return res.status(200).json({
            token,
        })
       
        
    } catch (error) {
        res.status(500).json({message: "something went wrong"})
    }
})

export default router
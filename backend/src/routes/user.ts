import express,{Request, Response} from "express";
import User from "../models/user";
import jwt from "jsonwebtoken"

const router = express.Router()

router.post("/register", async (req:Request, res:Response) => {

    try {
        let user = await User.findOne({
            email: req.body.email
        })
        if(user) {
            return res.status(400).send("Email already exists")
            }
        user = new User(req.body)
        await user.save()
        
        const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET_KEY as string, {expiresIn: "1d"})

        return res.status(200).json({
            status: "User created successfully",
            token,
            user
        })
    } catch (error) {
        return res.status(500).send("something went wrong")
    }
    
})

export default router
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

type UserType = {
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema<UserType>({
    email: {type: String, unique: true},
    password: {type: String, unique: true}
})

userSchema.pre("save", async function(next) {
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

const User = mongoose.model<UserType>('User', userSchema)

export default User;
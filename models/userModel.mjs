import mongoose from "mongoose"
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            required: [true, "Your firstname is required"],
            max: 25,
        },
        last_name: {
            type: String,
            required: [true,"Your lastname is required"],
            max: 25,
        },
        email: {
            type: String,
            required: [true, "Your email is required"],
            unique: [true, "Email address is already taken"],
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Your password is required"],
            select: false,
            max: 50,
        },
        role: {
            type: String,
            required: true,
            default: "0x01",
        },
    },
    { timestamps: true }
);



    UserSchema.pre('save', async function (next) {
        try {
            if (this.isModified('password')) {
                const hashedPassword = await bcrypt.hash(this.password, 10);
                this.password = hashedPassword;
            }
            next();
        } catch (err) {
            next(err); 
        }
    });



export default mongoose.model("users", UserSchema);

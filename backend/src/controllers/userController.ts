import type { Request, Response } from "express"
import User from "../models/user.js"
import { registerSchema, loginSchema } from "../types/user.types.js"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"





export const registerUser = async (req: Request, res: Response) => {

    try {

        const registerData = registerSchema.parse(req.body)

        const { name, email, password } = registerData

        const userExist = await User.findOne({ email })

        if (userExist) {
            return res.status(400).json({ message: ' User already exist' })

        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })


        return res.status(201).json({
            message: 'User Registered successfully',
            user: {
                id: user._id,
                email: user.email,
                name: user.name
            }
        })


    } catch (error: any) {
        // zod validation error handling
        if (error.name === "ZodError") {
            return res.status(400).json({ error: error.errors });
        }


        console.log('Register error : ', error)
        return res.status(500).json({ error: "Internal server error" });
    }


}

export const loginUser = async (req: Request, res: Response) => {

    try {

        const loginData = loginSchema.parse(req.body)
        const { email, password } = loginData

        
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password!)

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }
        const token = jwt.sign({ userId: user._id, userEmail: user.email }, process.env.JWT_SECRET as string)

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        return res.status(200).json({
            message: 'Login successful', user: {
                id: user._id,
                email: user.email,
                name: user.name
            }
        })


    } catch (error: any) {

        if (error.name == 'ZodError') {
            return res.status(400).json({ error: error.errors });
        }

        console.log('Login error : ', error)
        return res.status(500).json({ error: "Internal server error" });
    }
}

export const getUserProfile = async (req: Request, res: Response) => {

    console.log("reached here.... ")
    console.log(req.user)
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' })
        }

        const { userId } = req.user

        const user = await User.findById(userId)

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        return res.status(200).json({
            user: {
                id: user._id,
                email: user.email,
                name: user.name
            }
        })

    } catch (error) {
        console.log('Get user profile error: ', error)
        return res.status(500).json({ error: "Internal server error" })
    }
}
import type { Request, Response, NextFunction, Express } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' })
        }
        const data = jwt.verify(token, process.env.JWT_SECRET as string)
        req.user = data as any // Type assertion needed since jwt.verify returns string | JwtPayload  
        next()
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
}
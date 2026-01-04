import { JwtPayload } from "jsonwebtoken";

// Define the structure of your JWT payload
interface UserJwtPayload extends JwtPayload {
    userId: string;
    userEmail: string;
}

declare module "express-serve-static-core" {
    interface Request {
        user?: UserJwtPayload;
    }
}

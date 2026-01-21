import express from 'express'
import { registerUser, loginUser, getUserProfile, logoutUser } from '../controllers/userController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'


const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/me', authMiddleware, getUserProfile)
router.post('/logout', authMiddleware, logoutUser)

export default router
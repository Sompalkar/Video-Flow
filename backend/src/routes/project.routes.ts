import Router from 'express'
import { createProject, deleteProject, getProjects, updateProject } from '../controllers/projectController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'


const router = Router()

// router.use(authMiddleware)

router.post('/create', authMiddleware, createProject)
router.get('/getProject', authMiddleware, getProjects)
router.put('/updateProject/:id', authMiddleware, updateProject)
router.delete('/deleteProject/:id', authMiddleware, deleteProject)


export default router

import Router from 'express'
import { createProject, deleteProject, getProjects, updateProject } from '../controllers/projectController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'


const router = Router()

router.use(authMiddleware)

router.post('/create', createProject)
router.get('/getProject', getProjects)
router.put('/updateProject/:id', updateProject)
router.delete('/deleteProject/:id',deleteProject)


export default router

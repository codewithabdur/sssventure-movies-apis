import { Router } from 'express'
import { getApiHealth, getDatabaseStatus } from '../Controller/healthController.js'

const router = Router()

router.get('/health', getApiHealth)
router.get('/health/database', getDatabaseStatus)

export default router

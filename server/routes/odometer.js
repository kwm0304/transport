const express = require('express')
const {
  createOdometer,
  getOdometers,
  getOdometer,
  deleteOdometer,
  updateOdometer,
} = require('../controllers/odometerController')
const requireAuth = require('../middleware/requireAuth')
const router = express.Router()

router.use(requireAuth)

router.get('/', getOdometers)
router.get('/:id', getOdometer)
router.post('/', createOdometer)
router.delete('/:id', deleteOdometer)
router.patch('/:id', updateOdometer)

module.exports = router
const express = require('express')
const { 
  createEvent,
  getEvents,
  getEvent,
  deleteEvent,
  updateEvent,
} = require('../controllers/eventController')
const requireAuth = require('../middleware/requireAuth')
const router = express.Router()

router.use(requireAuth)
router.get('/', getEvents)
router.get('/:id', getEvent)
router.post('/', createEvent)
router.delete('/:id', deleteEvent)
router.patch('/:id', updateEvent)

module.exports = router

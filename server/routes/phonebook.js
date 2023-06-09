const express = require('express')
const {
  createPhonebook,
  getPhonebook,
  deletePhonebook,
  updatePhonebook,
  getPhonebooks
} = require('../controllers/phonebookController')
const requireAuth = require('../middleware/requireAuth')
const router = express.Router()
//left out getPhonebooks, can't think of a reason to use it

router.use(requireAuth)
router.get('/:id', getPhonebook)
router.get('/', getPhonebooks)
router.post('/', createPhonebook)
router.delete('/delete/:id', deletePhonebook)
router.patch('/:id', updatePhonebook)

module.exports = router
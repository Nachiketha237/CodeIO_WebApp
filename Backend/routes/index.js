const express = require('express')
const router = express.Router()
const mailController = require('../controller/mailController.js')

console.log('Inside Routes')
router.post('/mail', mailController.sendMail)
router.post('/adminMail', mailController.sendAdminMail)

module.exports = router

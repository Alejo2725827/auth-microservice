const express = require('express')
const router = express.Router()

const AuthCtrl = require('./auth.ctrl');
const authCtrl = new AuthCtrl();

router.post('/registro', authCtrl.registro);
router.post('/login', authCtrl.login);

module.exports = router
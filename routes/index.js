const express = require('express');
const UserCntrl = require('../controller/user')
//const auth = require('../middleware/auth')
const api = express.Router()


api.get('/user/:id', UserCntrl.getUserId )
api.get('/user/:id/avatar', UserCntrl.getAvatarUser );
api.put('/user/:id/avatar', UserCntrl.postAvatarUser);


module.exports = api

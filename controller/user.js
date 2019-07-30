const express = require('express');
const fileUpload = require('express-fileupload');
const app = express()


const mongoose = require('mongoose');
const Users = require('../model/user');
const fs = require('fs');
const path = require('path');

app.use(fileUpload({ useTempFiles: true }));


let getUserId = (req, res) =>{
  let id = req.params.id;

  Users.findById(id, (err, userDB)=>{
    if(err){
      return res.status(500).json({
        ok:false,
        err
      });
    }
    return res.status(200).json({
      ok:true,
      userDB
    })
  });
}

let postAvatarUser = (req, res) =>{
    let file = req;

    return res.send(file.files)
    let id = req.params.id
    uploadAvatar(file, id)
}

let getAvatarUser = (req, res)=>{
  let id = req.params.id;

  Users.findById(id, (err, userAvatar)=>{
    if(err) return res.status(500).json({ok:false, err})
    let avatar = userAvatar.avatar;
    if(avatar == null || avatar == ''){
        return res.status(200).json({
          ok: false,
          message: 'Please upload avatar'
        })
    }


    return res.status(200).json({
      ok: true,
      avatar: userAvatar.avatar
    })
  })
}

let uploadAvatar = (file, id)=>{

  const crypto = require('crypto');
  const algorithm = 'aes-192-cbc';
  const password = 'testAvatar';
  const key = crypto.scryptSync(password, 'salt', 8);
  const iv = Buffer.alloc(16, 0);
  const cipher = crypto.createCipher(algorithm, key);


  let filenamecut = archivo.name.split('.');
  let filename = cipher.update(filenamecut[0], 'utf8', 'hex');

  filename += cipher.final('hex');


  file.mv(`public/avatars/${ filename }`, (err) => {

      if (err)
          return res.status(500).json({
              ok: false,
              err
          });

      avatarUser(id, res, filename)

  });

}

function avatarUser(id, res, fileName) {

    Usuario.findById(id, (err, userDB) => {

        if (err) {
            deletFIle(fileName, 'user');

            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!userDB) {

            deletFIle(fileName, 'user');

            return res.status(400).json({
                ok: false,
                err: {
                    message: 'User no exist'
                }
            });
        }

        deletFIle(userDB.avatar, 'user')

        userDB.avatar = fileName;

        userDB.save((err, userPost) => {

            res.json({
                ok: true,
                user: userPost,
                avatar: fileName
            });

        });


    });


}

function deletFIle(nameAvatar, type) {

    let pathImagen = path.resolve(__dirname, `../../uploads/${ tipo }/${ nombreImagen }`);
    if (fs.existsSync(pathImagen)) {
        fs.unlinkSync(pathImagen);
    }


}









module.exports = {
  getUserId,
  getAvatarUser,
  postAvatarUser
}

import express from 'express'
var router = express.Router();
import bcrypt from 'bcrypt'

import { ensureLoggedIn } from './lib/middleware.js';
import { checkUserPassword } from './lib/passport.js'

import prisma from './lib/prisma.js'

router.get('/', async (req, res) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      admin: true
    }
  })

  res.send(users)
})

router.get('/account', async (req, res) => {
  if (req.user) {
    return res.send({
      account: {
        name: req.user.name,
        id: req.user.id,
        admin: req.user.admin
      }
    })
  }
  return res.send({ account: null })
})


// update a passowrd /users/password
// expect { oldPassword, newPassword}
router.put('/account/password', ensureLoggedIn, async (req, res) => {
  const { oldPassword, newPassword } = req.body
  if (!oldPassword || !newPassword) {
    res.status(403)
    return res.send({ message: 'need both oldPassword and newPassword fields' })
  }

  const checkOldPassword = await checkUserPassword(oldPassword, req.user.password)
  if (!checkOldPassword) {
    res.status(401)
    return res.send({ message: 'wrong old password' })
  }

  bcrypt.hash(newPassword, 10)
    .then(hashed => {
      return prisma.user.update({
        where: {
          id: req.user.id
        },
        data: {
          password: hashed
        }
      })
    })
    .then(() => {
      res.send({ message: 'password updated :)' })
    })
    .catch(() => {
      res.status(403)
      res.send({ message: 'an error.. ?' })
    })

})

export async function createUser(name, password, admin = false) {
  return bcrypt.hash(password, 10)
    .then(hash => {
      return prisma.user.create({
        data: {
          name,
          password: hash,
          admin
        }
      })
    })
}

export default router
import express from 'express'
var router = express.Router();
import bcrypt from 'bcrypt'

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
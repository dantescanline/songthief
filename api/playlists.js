import express from 'express'
var router = express.Router();
import { ensureLoggedIn } from './lib/middleware.js';
import prisma from './lib/prisma.js'



router.get('/', async (req, res) => {
  res.send(await prisma.playlist.findMany())
})

router.get('/:playlistID', async (req, res) => {
  const id = parseInt(req.params.playlistID)
  if (isNaN(id)) {
    res.status(400)
    return res.send('bad input playlist id')
  }
  const playlist = await prisma.playlist.findFirst({
    where: {
      id
    },
    include: {
      songs: {
        select: {
          id: true
        }
      }
    }
  })
  res.send(playlist)
})

export default router
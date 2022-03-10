import express from 'express'
var router = express.Router();
import { ensureLoggedIn } from './lib/middleware.js';
import prisma from './lib/prisma.js'


router.get('/', ensureLoggedIn, async (req, res) => {
  const songs = await prisma.song.findMany({
    include: {
      playlists: true
    }
  })
  res.send(songs)
  // res.send({ items: youtube.slice(0, 100) });
})


router.post('/', ensureLoggedIn, async (req, res) => {
  let playlist = await prisma.playlist.findFirst({
    where: {
      id: req.body.playlistID
    }
  })

  // grab any damn playlist if need be
  if (!playlist) {
    playlist = await prisma.playlist.findFirst()
  }

  let finalInput = {
    title: req.body.title,
    uploader: req.body.uploader,
    youtubeID: req.body.youtubeID,
    playlists: {
      connect: [{ id: playlist.id }]
    }
  }

  prisma.song.create({
    data: finalInput
  })
    .then(() => {
      res.send('okay!')
    })
    .catch((e) => {
      res.status(400)
      console.log(e)
      res.send(e)
    })
})


export default router

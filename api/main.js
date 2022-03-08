import express from 'express'
import fs from 'fs'
import cors from 'cors'
import bodyParser from 'body-parser'
import prisma from './lib/prisma.js'

import httpProxy from 'http-proxy'

import session from 'express-session'
import passport from 'passport'
import passportConfig from './lib/passport.js' // keep! needs to initialize
import cookieParser from 'cookie-parser'

import { SESSION_SECRET } from './lib/config.js'
import { ensureAdmin, ensureLoggedIn } from './lib/middleware.js'

import users from './users.js'

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(cors({
  origin: '*'
}))
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} | ${new Date()}`)
  next()
})
app.use(cookieParser());
app.use(session({
  resave: false,
  cookie: {
    sameSite: 'Strict'
  },
  secret: SESSION_SECRET,
  saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(express.static('public'))
app.use('/api/users', users)

app.post('/api/login', passport.authenticate('local'), (req, res) => {
  res.send('Logged In :)')
})

app.get('/api/logout', (req, res) => {
  req.logout()
  res.send({ message: 'okay :)' })
})

app.get('/api', (req, res) => {
  res.send('okay! welcome to the api')
})

app.get('/api/songs', async (req, res) => {
  const songs = await prisma.song.findMany({
    include: {
      playlists: true
    }
  })
  res.send(songs)
  // res.send({ items: youtube.slice(0, 100) });
})


app.post('/api/songs', async (req, res) => {
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

app.get('/api/playlists', async (req, res) => {
  res.send(await prisma.playlist.findMany())
})

app.get('/api/playlists/:playlistID', async (req, res) => {
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

// complicated serving of static web or proxing for dev
if (process.env.NODE_ENV === 'production') {
  console.log('production')
  app.use(express.static('../frontend/dist/', {}))
} else {
  console.log('development')

  const proxy = httpProxy.createProxyServer({})
  proxy.on('error', (error) => {
    console.log(error)
  })

  app.get('*', (req, res) => {
    proxy.web(req, res, { target: 'http://localhost:3001', ws: true })
  })

  app.post('*', (req, res) => {
    proxy.web(req, res, { target: 'http://localhost:3001', ws: true })
  })
}




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
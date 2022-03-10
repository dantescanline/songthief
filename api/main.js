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

import { SESSION_SECRET, envs } from './lib/config.js'
import { ensureAdmin, ensureLoggedIn } from './lib/middleware.js'

import users from './users.js'
import songs from './songs.js'
import playlists from './playlists.js'

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
app.use('/api/songs', songs)
app.use('/api/playlists', playlists)


app.get('/api', (req, res) => {
  res.send('okay! welcome to the api')
})


app.post('/api/login', passport.authenticate('local'), (req, res) => {
  res.send('Logged In :)')
})

app.get('/api/logout', (req, res) => {
  req.logout()
  res.send({ message: 'okay :)' })
})



// complicated serving of static web or proxing for dev
if (process.env.NODE_ENV === 'production') {
  console.log('Production')
  assertEnvs()
  app.use(express.static('../frontend/dist/', {}))
} else {
  console.log('Development mode')
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
  console.log(`Listening on ${port}`)
})

function assertEnvs() {
  for (const env of envs) {
    if (process.env[env] === undefined) {
      // this should throw maybe?
      console.log(`MISSING ENV: "${env}"`)
    }

  }
}
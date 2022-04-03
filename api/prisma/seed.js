import pkg from '@prisma/client'
import fs from 'fs'

const { PrismaClient } = pkg;
const prisma = new PrismaClient()

import { createUser } from '../users.js';

const youtubeString = fs.readFileSync('./data/youtube.json')
const youtube = JSON.parse(youtubeString)

async function main() {
  await prisma.playlist.deleteMany()
  await prisma.song.deleteMany()
  await prisma.user.deleteMany()

  const user = await createUser('dante', 'ni password', true)

  const myPlaylist = await prisma.playlist.create({
    data: {
      title: 'Best Music',
      user: {
        connect: {
          id: user.id
        }
      }
    }
  })

  const inserts = youtube.map(item => {
    return {
      youtubeID: item.id,
      title: item.title,
      uploader: item.uploader,
      playlists: {
        connect: [{
          id: myPlaylist.id
        }]
      }
    }
  })

  inserts.reverse()
  console.log(`inserting ${inserts.length} songs`)

  for (const song of inserts) {
    await prisma.song.create({
      data: song
    })
  }
}

main()
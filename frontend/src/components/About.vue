<template>
  <div>
    <h2>Songthief</h2>
    <h3>Stream music stored on youtube with external playlist management</h3>
    <a
      href="https://github.com/dantescanline/songthief/"
      target="_blank"
    >https://github.com/dantescanline/songthief/</a>
    <br />
    <br />
    <p>Songthief is a web interface for browsing your music that happens to be stored on big shitty corporate sites. It is especially targeted at youtube which is slow and has very poor playlist management. Import your playlists once, then seach and stream those youtube videos right in songthief's UI! Searching and playlist management is lightning fast, because it's stored on our side. Currenly hoping to support embed players for soundcloud and bandcamp as well.</p>
    <p>Songthief doesn't save any media locally, we're basically riding on the fact that these big companies have to keep their CDNs open. It's like creating your own card catalog for the bookstore around the corner. Your shop is my library, because i can just go in and read it there! This doesn't solve content removal, but if the CDN does delete the media data the entry with title and uploader will still be in songthief's database.</p>
    <p>Songthief aims to be run as an instance for one person / a group of friends. It will never be designed to support hundreds or thousands of users.</p>
    <br />
    <br />
    <br />
    <p>
      UNIVERSAL PUBLIC DOMAIN LICENSE
      <Br />This software and everything else in the universe is in the public domain. Ideas are not property.
    </p>
  </div>
</template>

<style scoped>
p {
  margin-bottom: 20px;
}

h2 {
  color: white;
  font-size: 30px;
}

h3 {
  color: white;
}

div {
  font-size: 16px;
}
</style>
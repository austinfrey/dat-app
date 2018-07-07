importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/3.3.1/workbox-sw.js'
)

console.log('SW installed')

const URLS = process.env.FILE_LIST

workbox.precaching.precacheAndRoute(URLS)

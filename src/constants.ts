export const TILE_SIZE = 16
export const TILE_SCALE = 1 / 4
export const LOCALSTORAGE_KEY_VIDEO_INPUT = 'wherespace-video-input'
export const LOCALSTORAGE_KEY_AUDIO_INPUT = 'wherespace-audio-input'
export const VIDEO_RATIO = 16 / 9
export const VIDEO_WIDTH = 256
export const PROXIMITY_RADIUS = 64
export const ICE_SERVERS = {
  iceServers: [
    {
      urls: [
        'stun:stun1.l.google.com:19302',
        'stun:stun2.l.google.com:19302',
      ],
    },
  ],
  iceCandidatePoolSize: 10,
}

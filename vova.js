let ctx
let audio

const playback = () => {
  console.log('playback')
  if (!ctx) {
    ctx = new AudioContext()
  }
  fetch('assets/2.wav')
    .then(data => data.arrayBuffer())
    .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
    .then(decodedAudio => {
      audio = decodedAudio
    })

  const playSound = ctx.createBufferSource()
  playSound.buffer = audio
  playSound.connect(ctx.destination)
  playSound.start(ctx.currentTime)
  playSound.start(ctx.currentTime + 10)
}

const init = () => {
  window.addEventListener('mousedown', playback)
}

init()

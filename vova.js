let ctx
let audio

const playback = () => {
  const playSound = ctx.createBufferSource()
  playSound.buffer = audio
  playSound.connect(ctx.destination)
  playSound.start(ctx.currentTime)
  console.log('playback')
}

const init = () => {
  ctx = new AudioContext()
  fetch('assets/2.wav')
    .then(data => data.arrayBuffer())
    .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
    .then(decodedAudio => {
      audio = decodedAudio
    })

  window.addEventListener('mousedown', playback)
}

init()

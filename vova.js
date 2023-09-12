let ctx
let audio1
let audio2

const playback = () => {
  console.log('playback')
  if (!ctx) {
    ctx = new AudioContext()
  }
  fetch('assets/2.wav')
    .then(data => data.arrayBuffer())
    .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
    .then(decodedAudio => {
      audio1 = decodedAudio
    })

  fetch('assets/3.wav')
    .then(data => data.arrayBuffer())
    .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
    .then(decodedAudio => {
      audio2 = decodedAudio
    })

  const playSound = ctx.createBufferSource()
  playSound.buffer = audio1
  playSound.connect(ctx.destination)
  playSound.start(ctx.currentTime)

  const playSound2 = ctx.createBufferSource()
  playSound2.buffer = audio2
  playSound2.connect(ctx.destination)
  playSound2.start(ctx.currentTime + 1000)


  console.log(`sound1: ${playSound.duration}`)
  console.log(`sound2: ${playSound2.duration}`)
}

const init = () => {
  window.addEventListener('mousedown', playback)
}

init()

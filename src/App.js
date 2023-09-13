import './App.css'
import * as Tone from 'tone'
import { useState } from 'react'
import _sample from 'lodash/sample'
import _range from 'lodash/range'


const baseUrl = 'https://basharov.net/vovalive/assets'

function App() {

  const [sounds, setSounds] = useState(undefined)
  const [synths, setSynths] = useState(undefined)

  const loadSounds = async () => {
    await Tone.start()

    const samples = _range(148).reduce((acc, item) => {
      return {...acc, ...{[`i${item}`]: `${baseUrl}/vova/${item}.wav`}}
    }, {})

    console.log(samples)

    const players = new Tone.Players(samples).toDestination()

    const synths = new Tone.Players(
      {
        aggr: `${baseUrl}/synths/agressive_scream_ambient.wav`,
        drone: `${baseUrl}/synths/dark_tense_drone.wav`,
        beat: `${baseUrl}/synths/anxious_dark_ambient_heart_beat_2.wav`,
        beat2: `${baseUrl}/synths/anxious_dark_ambient_heart_beat.wav`,
        tense: `${baseUrl}/synths/dark_tense_drone.wav`,
      }
    ).toDestination()

    setSounds(players)
    setSynths(synths)
  }

  const play = async () => {
    await Tone.start()

    const synth1 = synths.player('aggr')
    const synth2 = synths.player('drone')
    const beat = synths.player('beat')
    const beat2 = synths.player('beat2')
    const tense = synths.player('tense')

    const synthToPlay = _sample([tense, synth1, beat, beat2])

    const playersList=[]

    for (let i = 0; i < 87; i += 1) {
      playersList.push(sounds.player(`i${i}`))
    }

    synthToPlay.loop = true
    synthToPlay.start()

    setInterval(() => {
      const playerNow = _sample(playersList)
      playerNow.start(0)
      console.log(playerNow.name)
    }, 5000)

    setInterval(() => {
      synth2.start(0)
    }, 9000)


    // und1Player.start('+3')

  }

  const stop = async () => {

    const synth1 = synths.player('aggr')
    const und1Player = sounds.player('und1')
    const und2Player = sounds.player('und2')
    synth1.stop()
    und1Player.stop()
    und2Player.stop()
    Tone.Transport.stop()

  }

  return (
    <div className='App'>
      <button onClick={loadSounds}>Load</button>
      <button onClick={play}>Play</button>
      <button onClick={stop}>Stop</button>
    </div>
  )
}

export default App

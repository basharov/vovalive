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

    const samples = _range(87).reduce((acc, item) => {
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

    const und1Player = sounds.player('und1')
    const und2Player = sounds.player('und2')
    const und3Player = sounds.player('und3')
    const und4Player = sounds.player('und4')
    const und5Player = sounds.player('und5')
    const und6Player = sounds.player('und6')
    const und7Player = sounds.player('und7')
    const und8Player = sounds.player('und8')

    const und9Player = sounds.player('und9')
    const und10Player = sounds.player('und10')
    const und11Player = sounds.player('und11')
    const und12Player = sounds.player('und12')
    const und13Player = sounds.player('und13')
    const und14Player = sounds.player('und14')
    const und15Player = sounds.player('und15')
    const und16Player = sounds.player('und16')

    synthToPlay.loop = true
    synthToPlay.start()

    const players = [
      und1Player,
      und2Player,
      und3Player,
      und4Player,
      und5Player,
      und6Player,
      und7Player,
      und8Player,
      und9Player,
      und10Player,
      und11Player,
      und12Player,
      und13Player,
      und14Player,
      und15Player,
      und16Player
    ]

    setInterval(() => {
      const playerNow = _sample(players)
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

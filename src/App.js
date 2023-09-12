import './App.css'
import * as Tone from 'tone'
import { useState } from 'react'

const baseUrl = 'https://basharov.net/vovalive/assets'

function App() {

  const [sounds, setSounds] = useState(undefined)
  const [synths, setSynths] = useState(undefined)

  const loadSounds = async () => {
    await Tone.start()

    const players = new Tone.Players(
      {
        und1: `${baseUrl}/vova/2.wav`,
        und2: `${baseUrl}/vova/3.wav`
      }
    ).toDestination()

    const synths = new Tone.Players(
      {
        aggr: `${baseUrl}/synths/agressive_scream_ambient.wav`,
      }
    ).toDestination()

    setSounds(players)
    setSynths(synths)
  }

  const play = async () => {
    await Tone.start()
    const synth1 = synths.player('aggr')
    const und1Player = sounds.player('und1')
    const und2Player = sounds.player('und2')
    synth1.loop = true
    synth1.start()

    // und1Player.loop = true
    // und1Player.start()
    // und2Player.start(`+${und1Player.buffer.duration}`)
  }

  return (
    <div className='App'>
      <button onClick={loadSounds}>Start</button>
      <button onClick={play}>Play</button>
    </div>
  )
}

export default App

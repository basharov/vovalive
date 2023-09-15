import './App.css'
import * as Tone from 'tone'
import { useState } from 'react'
import _random from 'lodash/random'

const samplesAmount = 1380

const baseUrl = 'https://basharov.net/vovalive/assets'

function App() {

  const [samples, setSamples] = useState(undefined)
  const [synths, setSynths] = useState(undefined)
  const [started, setStarted] = useState(true)


  const loadTone = () => {
    const players = new Tone.Players()
    console.log(players)
    setSamples(players)
  }

  const loadSynths = async () => {
    await Tone.start()
    const synths = new Tone.Players(
      {
        aggr: `${baseUrl}/synths/agressive_scream_ambient.wav`,
        drone: `${baseUrl}/synths/dark_tense_drone.wav`,
        beat: `${baseUrl}/synths/anxious_dark_ambient_heart_beat_2.wav`,
        beat2: `${baseUrl}/synths/anxious_dark_ambient_heart_beat.wav`,
        tense: `${baseUrl}/synths/dark_tense_drone.wav`,
        // drone2: `${baseUrl}/drones/deep.wav`,
      }, {
        volume: -20,
        fadeIn: 5,
        onload: () => {
          const aggrPlayer = synths.player('aggr')

          aggrPlayer.loop = true
          aggrPlayer.start()

          // synths.player('aggr')
          // synths.player('aggr').loop = true
          // synths.player('aggr').start()
        }
      }
    ).toDestination()

  }
  const loadSample = async () => {
    await Tone.start()

    // const pitchShift = new Tone.PitchShift(-2).toDestination();
    // const crusher = new Tone.BitCrusher(8).toDestination();
    const tremolo = new Tone.Tremolo(90, 0).toDestination()
    // const filter = new Tone.Filter("G5").toDestination();

    const sampleIndex = _random(samplesAmount)

    const delay = _random(1000)

    console.log({delay, sampleIndex})

    if (samples.has(sampleIndex)) {
      setTimeout(() => {
        samples.player(sampleIndex).fan(tremolo)
        samples.player(sampleIndex).start()
      }, delay)
    } else {
      const buff = await new Tone.ToneAudioBuffer(`${baseUrl}/vova/${sampleIndex}.wav`, undefined, (err) => {
        console.log(err)
        loadSample()
      })

      samples.add(sampleIndex, buff, (val) => {
        samples.player(sampleIndex).onstop = () => {
          loadSample()
        }
        setTimeout(() => {
          samples.player(sampleIndex).fan(tremolo)
          samples.player(sampleIndex).start()
        }, delay)
      })

    }


  }

  const load = () => {
    setStarted(true)
    loadSynths()
    loadSample()
  }

  const stop = () => {
    console.log(samples)
    samples.stopAll()
    setStarted(false)
  }

  return (
    <div className='App'>
      <button onClick={loadTone}>Load Tone</button>
      <button onClick={load}>Load samples</button>
      <button onClick={stop}>Stop</button>
    </div>
  )
}

export default App

import { useEffect, useRef, useState } from 'react';
import './App.css';

const Timer = ({ setIsTimerReached0, startQuizz }) => {
  const timer = useRef("0:10")
  const [timerToShow, setTimerToShow] = useState(timer.current)

  useEffect(() => {
    let decrementTimerInterval;
    if (startQuizz) {
      decrementTimerInterval = setInterval(() => {
        const timerValue = timer.current;
        const timerSplited = timerValue.split(":")
        const minutesToSecond = parseInt(timerSplited[0]) * 60
        let timerInSeconds = minutesToSecond + parseInt(timerSplited[1])
        timerInSeconds -= 1;

        timer.current = (`${parseInt(timerInSeconds / 60)}:${parseInt(timerInSeconds % 60)}`)
        setTimerToShow(timer.current)
        
        if (timerInSeconds <= 0) {
          setIsTimerReached0(true)
          console.log("Finished now")
          clearInterval(decrementTimerInterval)
          return;
        }

      }, 1000)
    }


    return () => clearInterval(decrementTimerInterval)
  }, [startQuizz])

  return (
    <>
      <h1>{timerToShow}</h1>
    </>

  )
}

function App() {
  const [startQuizz, setStartQuizz] = useState(false)
  const [isTimerReached0, setIsTimerReached0] = useState(false)

  return (
    <div>

      <button onClick={() => setStartQuizz(true)}>Start</button>&nbsp;
      <button>Finish</button>
      <br /><br />
      <Timer setIsTimerReached0={setIsTimerReached0} startQuizz={startQuizz} />
      <br /><br />
      {!isTimerReached0 &&
        <form>
          <label>What is your name?</label><br />
          <input type="text" /><br />
          <button>Send form</button>

        </form>
      }

      { isTimerReached0 && <h1>Time end</h1>}

    </div>
  );
}

export default App;

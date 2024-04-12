import { useState } from 'react'
import ReactDOM from 'react-dom'
import "./App.css";


const Title = ({ name }) => <h1>{name}</h1>

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text} {value}</td>
  </tr>
)

const Statistics = ({ button }) => {
  const { good, neutral, bad } = button;
  const total = good + neutral + bad;
  const average = (good * 1 + bad * -1) / total;
  const positive = (good * 100) / total;

  if (total === 0) {
    return <div>No feedback given</div>;
  }

  return (
    <div>
      <table className='tabla'>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={total} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={`${positive} %`} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [button, setButton] = useState({ good: 0, neutral: 0, bad: 0 })

  const handleButtonClick = (type) => {
    setButton(prevState => ({
      ...prevState,
      [type]: prevState[type] + 1
    }))
  }

  return (
    <div>
      <Title name="Give feedback" />
      <Button onClick={() => handleButtonClick('good')} text='good' />
      <Button onClick={() => handleButtonClick('neutral')} text='neutral' />
      <Button onClick={() => handleButtonClick('bad')} text='bad' />
      <Title name="Statistics" />
      <Statistics button={button} />
    </div>
  )
}

export default App;

import { useState } from 'react'
import "./App.css"

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]


  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({})

  const getRandomAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomIndex)
  }

  const voteAnecdote = () => {
    setVotes(prevVotes => ({
      ...prevVotes,
      [selected]: (prevVotes[selected] || 0) + 1
    }))
  }

  const getMostVotedAnecdote = () => {
    let mostVotedAnecdote = ''
    let maxVotes = 0
  
    for (const anecdoteIndex in votes) {
      const anecdote = anecdotes[anecdoteIndex]
      if (votes[anecdoteIndex] > maxVotes) {
        mostVotedAnecdote = anecdote
        maxVotes = votes[anecdoteIndex]
      }
    }
    return {
      anecdote: mostVotedAnecdote,
      votes: maxVotes
    }
  }
  

  const mostVotedAnecdote = getMostVotedAnecdote()
console.log(mostVotedAnecdote);
  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]}
      <p>Votes: {votes[selected] || 0}</p>
      <br />
      <button onClick={voteAnecdote}>Vote</button>
      <button onClick={getRandomAnecdote}>Next anecdote</button>
      <h2>Anecdote with most votes</h2>
      {mostVotedAnecdote.votes > 0 ? (
        <div>
          <p>{mostVotedAnecdote.anecdote}</p>
          <p>Votes: {mostVotedAnecdote.votes}</p>
        </div>
      ) : (
        <p>No votes yet</p>
      )}
    </div>
  )
}

export default App
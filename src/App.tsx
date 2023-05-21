import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import { Summaries } from './Summaries'
import { Summary } from './interfaces/summary'

function App () {
  const [isEnabled, setIsEnabled] = useState<boolean>(true)
  const [error, setError] = useState<string>('')
  const [summariesList, setSummariesList] = useState<Summary[] | null>(null)

  async function getSummaries () {
    const backendUrl = process.env.REACT_APP_BACKEND_URL
      ? process.env.REACT_APP_BACKEND_URL
      : 'http://localhost:3000'

    try {
      const response = await axios.get(`${backendUrl}/openai/summaries`)
      setSummariesList(response.data)
    } catch (error) {
      if (error instanceof Error) setError(error.message)
    }
  }

  useEffect(() => {
    if (isEnabled) getSummaries()
  }, [isEnabled])

  return (
    <div className="App">
      <header>
        OpenAI Chrome Extension
      </header>
      <button onClick={() => setIsEnabled(!isEnabled)}>
        {isEnabled ? 'Disable' : 'Enable'}
      </button>
      {error && <>
        <p>{error}</p>
          <button onClick={() => {
            setError('')
            getSummaries()
          }}>
            Try Again
          </button>
        </>}
      {isEnabled && <Summaries summariesList={summariesList}/>}
    </div>
  )
}

export default App

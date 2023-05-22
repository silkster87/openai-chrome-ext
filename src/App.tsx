import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import { Summaries } from './Summaries'
import { Summary } from './interfaces/summary'
import Switch from '@mui/material/Switch'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

function App () {
  const [isEnabled, setIsEnabled] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [summariesList, setSummariesList] = useState<Summary[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  async function getSummaries () {
    const backendUrl = process.env.REACT_APP_BACKEND_URL
      ? process.env.REACT_APP_BACKEND_URL
      : 'http://localhost:3000'

    try {
      setIsLoading(true)
      const response = await axios.get(`${backendUrl}/openai/summaries`)
      setSummariesList(response.data)
      setIsLoading(false)
    } catch (error) {
      if (error instanceof Error) setError(error.message)
      setIsLoading(false)
    }
  }

  function handleSwitch () {
    setIsEnabled(!isEnabled)

    setError('')
  }

  useEffect(() => {
    if (isEnabled) getSummaries()
  }, [isEnabled])

  return (
    <div className="App">
      <header>
        OpenAI Chrome Extension
      </header>
      <Switch checked={isEnabled} onChange={handleSwitch} inputProps={{ 'aria-label': 'controlled' }}/>
      {error && <>
        <p>{error}</p>
          <button onClick={() => {
            setError('')
            getSummaries()
          }}>
            Try Again
          </button>
        </>}
      {isLoading &&
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      }
      {isEnabled && summariesList && <Summaries summariesList={summariesList}/>}
    </div>
  )
}

export default App

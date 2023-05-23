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
  const [summariesList, setSummariesList] = useState<Summary[] | null | undefined >(null)
  const [isLoading, setIsLoading] = useState(false)

  const backendUrl = process.env.REACT_APP_BACKEND_URL
    ? process.env.REACT_APP_BACKEND_URL
    : 'http://localhost:3000'

  async function getSummaries () {
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
    if (isEnabled) {
      getSummaries()
      window.localStorage.setItem('openaiSummaries', 'true')
    } else {
      window.localStorage.setItem('openaiSummaries', 'false')
    }
  }, [isEnabled])

  async function deleteSummary (id: string) {
    try {
      const response = await axios.delete(`${backendUrl}/openai`, {
        headers: {
          'Content-Type': 'application/json'
        },
        data: { id }
      })

      if (response.data && response.data.acknowledged) {
        setSummariesList(prev => prev?.filter(el => el._id !== id))
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      }
    }
  }

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
      {isEnabled && summariesList && <Summaries summariesList={summariesList} deleteSummary={deleteSummary}/>}
    </div>
  )
}

export default App

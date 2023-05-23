(() => {
  const innerHTMLTooltip = '<p id="tooltip" style="text-align:center; padding: 4px">Summarise text</p>'
  const tooltip = document.createElement('button')
  tooltip.innerHTML = innerHTMLTooltip
  tooltip.style.display = 'block'
  tooltip.style.color = 'black'
  tooltip.style.width = '300px'
  tooltip.style.fontSize = '1.5em'
  tooltip.style.fontFamily = 'Arial'
  tooltip.style.zIndex = '10'
  tooltip.style.position = 'absolute'
  tooltip.style.borderRadius = '8px'
  tooltip.style.cursor = 'pointer'
  tooltip.style.backgroundColor = '#c0dded'
  tooltip.addEventListener('click', fetchSummarisedText)

  function selectableTextAreaMouseUp (event) {
    const selectedText = window.getSelection()?.toString().trim()
    if (selectedText.length && event.target.id !== 'tooltip') {
      const x = event.pageX
      const y = event.pageY
      tooltip.style.display = 'block'
      tooltip.innerHTML = innerHTMLTooltip
      const toolTipHeight = Number(getComputedStyle(tooltip).height.slice(0, -2))
      tooltip.style.left = `${x}px`
      tooltip.style.top = `${y - toolTipHeight * 1.5}px`

      document.body.appendChild(tooltip)
    }
  }

  function documentMouseDown (event) {
    if (event.target.id !== 'tooltip' && getComputedStyle(tooltip).display === 'block') {
      tooltip.style.display = 'none'
      window.getSelection().empty()
    }
  }

  async function fetchSummarisedText (event) {
    const selectedText = window.getSelection()?.toString().trim()

    const request = new Request('http://localhost:3000/openai', {
      method: 'POST',
      body: JSON.stringify({ text: selectedText }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    try {
      fetch(request).then(response => response.json()).then(json => {
        document.getElementById('tooltip').textContent = json.text
      })
    } catch (error) {
      document.getElementById('tooltip').textContent = error.message
    }
  }

  document.addEventListener('mouseup', selectableTextAreaMouseUp)
  document.addEventListener('mousedown', documentMouseDown)
})()

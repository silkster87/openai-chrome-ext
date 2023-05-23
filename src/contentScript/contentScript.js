
(() => {
  const tooltip = document.createElement('button')
  tooltip.innerHTML = '<p id="tooltip" style="text-align:center; padding: 4px">Summarise text</p>'
  tooltip.style.display = 'block'
  tooltip.style.color = 'black'
  tooltip.style.width = '300px'
  tooltip.style.height = '50px'
  tooltip.style.zIndex = '10'
  tooltip.style.position = 'absolute'
  tooltip.style.fontSize = '1.25rem'
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
      const toolTipHeight = Number(getComputedStyle(tooltip).height.slice(0, -2))
      tooltip.style.left = `${x}px`
      tooltip.style.top = `${y - toolTipHeight * 1.5}px`

      document.body.appendChild(tooltip)
    }
  }

  function documentMouseDown (event) {
    console.log('mouse down:', event.target)
    if (event.target.id !== 'tooltip' && getComputedStyle(tooltip).display === 'block') {
      tooltip.style.display = 'none'
      window.getSelection().empty()
    }
  }

  function fetchSummarisedText (event) {
    const selectedText = window.getSelection()?.toString().trim()
    console.log('Send text: ', selectedText)
  }

  document.addEventListener('mouseup', selectableTextAreaMouseUp)
  document.addEventListener('mousedown', documentMouseDown)
})()

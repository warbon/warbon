const projectsMarkup = `
  <div class="eyebrow">projects</div>
  <dl class="runtime-list">
    <div><dt>LeagueFlow</dt><dd>Basketball SaaS · <a class="accent-text" href="https://leagueflowapp.io" target="_blank" rel="noopener noreferrer" aria-label="Open LeagueFlow live site">live ↗</a></dd></div>
    <div><dt>Scholiyo</dt><dd>School SaaS</dd></div>
    <div><dt>Nonix</dt><dd>AI agent workspace</dd></div>
    <div><dt>ZEER Solar</dt><dd>Solar solutions · <a class="accent-text" href="https://www.zeersolar.com/" target="_blank" rel="noopener noreferrer" aria-label="Open ZEER Solar live site">live ↗</a></dd></div>
    <div><dt>ACWare</dt><dd>Software services · <a class="accent-text" href="https://acware.org/" target="_blank" rel="noopener noreferrer" aria-label="Open ACWare live site">live ↗</a></dd></div>
    <div><dt>status</dt><dd class="accent-text">building</dd></div>
  </dl>
`

function replaceRuntimeProfile(attempt = 0) {
  const cards = Array.from(document.querySelectorAll('.side-card'))
  const runtimeCard = cards.find((card) => {
    const eyebrow = card.querySelector('.eyebrow')
    return eyebrow && eyebrow.textContent.trim().toLowerCase() === 'runtime profile'
  })

  if (runtimeCard) {
    runtimeCard.innerHTML = projectsMarkup
    return
  }

  if (attempt < 10) {
    window.setTimeout(() => replaceRuntimeProfile(attempt + 1), 50)
  }
}

function replacePortfolioPrompt(root = document) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  const nodes = []
  let node = walker.nextNode()

  while (node) {
    if (node.nodeValue && node.nodeValue.includes('wilfredo@portfolio:')) nodes.push(node)
    node = walker.nextNode()
  }

  nodes.forEach((textNode) => {
    textNode.nodeValue = textNode.nodeValue.replace(/wilfredo@portfolio:/g, 'warbon@portfolio:')
  })
}

function watchPortfolioPrompt() {
  replacePortfolioPrompt()

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'characterData' && mutation.target.nodeValue && mutation.target.nodeValue.includes('wilfredo@portfolio:')) {
        mutation.target.nodeValue = mutation.target.nodeValue.replace(/wilfredo@portfolio:/g, 'warbon@portfolio:')
      }

      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          if (node.nodeValue && node.nodeValue.includes('wilfredo@portfolio:')) {
            node.nodeValue = node.nodeValue.replace(/wilfredo@portfolio:/g, 'warbon@portfolio:')
          }
          return
        }

        if (node.nodeType === Node.ELEMENT_NODE) replacePortfolioPrompt(node)
      })
    })
  })

  observer.observe(document.body, {
    childList: true,
    characterData: true,
    subtree: true
  })
}

export default ({ app }) => {
  const render = () => window.setTimeout(() => {
    replaceRuntimeProfile()
    replacePortfolioPrompt()
  }, 0)

  render()
  watchPortfolioPrompt()
  app.router.afterEach(render)
}

const projectsMarkup = `
  <div class="eyebrow">projects</div>
  <dl class="runtime-list">
    <div><dt>LeagueFlow</dt><dd>Basketball SaaS · <a class="accent-text" href="https://leagueflowapp.io" target="_blank" rel="noopener noreferrer" aria-label="Open LeagueFlow live site">live ↗</a></dd></div>
    <div><dt>Scholiyo</dt><dd>School SaaS</dd></div>
    <div><dt>Nonix</dt><dd>AI agent workspace</dd></div>
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

export default ({ app }) => {
  const render = () => window.setTimeout(() => replaceRuntimeProfile(), 0)

  render()
  app.router.afterEach(render)
}

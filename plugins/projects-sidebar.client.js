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

const textReplacements = [
  ['wilfredo@portfolio:', 'warbon@portfolio:'],
  ['warbon@acware.tech', 'wilfredo@acware.org'],
  ['acware.tech', 'acware.org'],
  ['2024 → Present / Sansan Global Development Center', '2024 → Present / Current Employer [PRIVATE]'],
  [
    'Senior Software Engineer — product design and development, stakeholder collaboration, feature delivery, testing, debugging, code reviews and maintenance.',
    'Senior Software Engineer — Employer identity intentionally not publicly disclosed.'
  ],
  [' Senior Software Engineer at Sansan Global Development Center.', ' Senior Software Engineer · Employer [PRIVATE].'],
  [
    'Wilfredo has been a Senior Software Engineer at Sansan Global Development Center since January 2024.',
    'Wilfredo has been a Senior Software Engineer since January 2024. Current employer identity is intentionally not publicly disclosed.'
  ],
  ['Sansan Global Development Center', 'Current Employer [PRIVATE]']
]

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

function replacePublicTextValue(value) {
  return textReplacements.reduce((result, replacement) => {
    return result.split(replacement[0]).join(replacement[1])
  }, value)
}

function replacePublicAttributes(root = document) {
  const links = []

  if (root.nodeType === Node.ELEMENT_NODE && root.matches && root.matches('a[href]')) links.push(root)
  if (root.querySelectorAll) links.push(...root.querySelectorAll('a[href]'))

  links.forEach((link) => {
    const href = link.getAttribute('href')
    if (!href) return

    const replaced = replacePublicTextValue(href)
    if (replaced !== href) link.setAttribute('href', replaced)
  })
}

function replacePublicText(root = document) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  const nodes = []
  let node = walker.nextNode()

  while (node) {
    const replaced = node.nodeValue ? replacePublicTextValue(node.nodeValue) : node.nodeValue
    if (replaced !== node.nodeValue) nodes.push({ node, replaced })
    node = walker.nextNode()
  }

  nodes.forEach(({ node: textNode, replaced }) => {
    textNode.nodeValue = replaced
  })

  replacePublicAttributes(root)
}

function watchPublicText() {
  replacePublicText()

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'characterData' && mutation.target.nodeValue) {
        const replaced = replacePublicTextValue(mutation.target.nodeValue)
        if (replaced !== mutation.target.nodeValue) mutation.target.nodeValue = replaced
      }

      if (mutation.type === 'attributes' && mutation.target.nodeType === Node.ELEMENT_NODE) {
        replacePublicAttributes(mutation.target)
      }

      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          if (node.nodeValue) {
            const replaced = replacePublicTextValue(node.nodeValue)
            if (replaced !== node.nodeValue) node.nodeValue = replaced
          }
          return
        }

        if (node.nodeType === Node.ELEMENT_NODE) replacePublicText(node)
      })
    })
  })

  observer.observe(document.body, {
    childList: true,
    characterData: true,
    attributes: true,
    attributeFilter: ['href'],
    subtree: true
  })
}

export default ({ app }) => {
  const render = () => window.setTimeout(() => {
    replaceRuntimeProfile()
    replacePublicText()
  }, 0)

  render()
  watchPublicText()
  app.router.afterEach(render)
}

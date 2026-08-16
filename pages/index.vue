<template>
  <div
    ref="app"
    class="portfolio-shell"
    :style="themeVars"
    @mousemove="handlePointerMove"
  >
    <canvas ref="networkCanvas" class="network-canvas" aria-hidden="true"></canvas>
    <div ref="mouseGlow" class="mouse-glow" aria-hidden="true"></div>

    <transition name="boot-fade">
      <div v-if="bootVisible" class="boot-screen" aria-live="polite">
        <div class="boot-terminal">
          <div class="boot-brand">WBA://PORTFOLIO_OS</div>
          <div
            v-for="(line, index) in bootLines"
            :key="line"
            class="boot-line"
            :class="{ visible: index < visibleBootLines }"
          >
            {{ line }}
          </div>
          <div class="boot-progress"><span :style="{ width: bootProgress + '%' }"></span></div>
        </div>
      </div>
    </transition>

    <header class="topbar">
      <div class="window-controls" aria-hidden="true">
        <span></span><span></span><span></span>
      </div>

      <div class="host-path">wilfredo@portfolio: ~/interactive-profile</div>

      <div class="topbar-actions">
        <div class="system-online"><i></i> AI ONLINE</div>
        <div class="theme-picker">
          <button
            class="theme-trigger"
            type="button"
            :aria-expanded="themeMenuOpen ? 'true' : 'false'"
            @click.stop="themeMenuOpen = !themeMenuOpen"
          >
            <span class="theme-swatch"></span>
            {{ activeThemeLabel }}
            <span class="chevron">⌄</span>
          </button>

          <transition name="menu-pop">
            <div v-if="themeMenuOpen" class="theme-menu" @click.stop>
              <div class="theme-menu-title">Terminal themes</div>
              <button
                v-for="theme in themeOptions"
                :key="theme.key"
                class="theme-option"
                :class="{ active: activeTheme === theme.key }"
                type="button"
                @click="applyTheme(theme.key, true)"
              >
                <span class="theme-dot" :style="{ background: theme.accent }"></span>
                <span>{{ theme.label }}</span>
                <small v-if="activeTheme === theme.key">active</small>
              </button>
            </div>
          </transition>
        </div>
      </div>
    </header>

    <main class="workspace" @click="themeMenuOpen = false">
      <section class="main-column">
        <section class="hero reveal reveal-1">
          <div class="hero-copy">
            <div class="terminal-prompt">$ whoami</div>
            <h1 class="hero-name" aria-label="Wilfredo Arbon">
              <span
                v-for="(char, index) in nameCharacters"
                :key="index"
                class="name-char"
                :class="{ space: char === ' ' }"
                :style="{ animationDelay: (0.12 + index * 0.035) + 's' }"
              >{{ char === ' ' ? '\u00A0' : char }}</span><span class="block-cursor"></span>
            </h1>
            <div class="hero-role">Senior Software Engineer · Full-Stack / Backend · Cloud</div>
            <p class="hero-summary">
              Software developer with 15+ years of experience building and supporting production systems.
              I work across Microsoft/.NET technologies, APIs, databases, Python/FastAPI, modern web stacks,
              cloud platforms, DevOps, servers and virtualization.
            </p>
            <div class="hero-status-row">
              <span><i></i> Cebu, Philippines</span>
              <span><i></i> building · learning · shipping</span>
            </div>
          </div>

          <div class="ai-visual" aria-hidden="true">
            <div class="hud">
              <div class="hud-ring ring-outer"></div>
              <div class="hud-ring ring-mid"></div>
              <div class="hud-ring ring-inner"></div>
              <div class="hud-cross horizontal"></div>
              <div class="hud-cross vertical"></div>

              <div class="orbit orbit-one">
                <span class="satellite sat-one"></span>
                <span class="satellite sat-two"></span>
              </div>
              <div class="orbit orbit-two">
                <span class="satellite sat-three"></span>
                <span class="satellite sat-four"></span>
              </div>

              <span class="hud-node node-one"></span>
              <span class="hud-node node-two"></span>
              <span class="hud-node node-three"></span>
              <span class="hud-node node-four"></span>

              <span class="hud-tag tag-one">AI layer</span>
              <span class="hud-tag tag-two">automation</span>
              <span class="hud-tag tag-three">systems</span>

              <div class="ai-core">
                <span class="pulse pulse-one"></span>
                <span class="pulse pulse-two"></span>
                <div class="ai-core-text">
                  <strong>AI</strong>
                  <span>CORE</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="terminal-panel reveal reveal-2">
          <div class="terminal-header">
            <span>interactive terminal</span>
            <span>type <b>help</b> · ↑↓ history · tab complete</span>
          </div>

          <div ref="terminalOutput" class="terminal-output" aria-live="polite">
            <div
              v-for="(line, index) in terminalLines"
              :key="index"
              class="terminal-line line-enter"
              :class="line.className"
              v-html="line.html"
            ></div>
          </div>

          <div class="terminal-input-row">
            <span class="input-prefix">wilfredo@portfolio:~$</span>
            <input
              ref="commandInput"
              v-model="commandInput"
              aria-label="Portfolio terminal command"
              autocomplete="off"
              spellcheck="false"
              placeholder="try: experience, skills, projects, theme dracula..."
              @keydown="handleCommandKeydown"
            />
          </div>
        </section>
      </section>

      <aside class="side-column">
        <section class="side-card reveal reveal-2">
          <div class="eyebrow">AI portfolio copilot</div>
          <div class="copilot-heading">
            <div class="copilot-icon">AI</div>
            <div>
              <strong>CV-aware assistant</strong>
              <span>LOCAL / SIMULATED</span>
            </div>
            <em>READY</em>
          </div>
          <p>
            Ask about my technical stack, cloud certifications, API work, leadership experience or current projects.
          </p>
          <div class="signal-bars" aria-hidden="true">
            <i v-for="n in 20" :key="n" :style="{ animationDelay: ((n % 5) * 0.1) + 's' }"></i>
          </div>
        </section>

        <section class="side-card reveal reveal-3">
          <div class="eyebrow">quick commands</div>
          <div class="quick-grid">
            <button v-for="quick in quickCommands" :key="quick.command" type="button" @click="runQuick(quick.command)">
              <span>$</span> {{ quick.label }}
            </button>
          </div>
        </section>

        <section class="side-card reveal reveal-4">
          <div class="eyebrow">runtime profile</div>
          <dl class="runtime-list">
            <div><dt>current role</dt><dd>Senior Software Engineer</dd></div>
            <div><dt>company</dt><dd>Sansan Global Development Center</dd></div>
            <div><dt>since</dt><dd>Jan 2024</dd></div>
            <div><dt>experience</dt><dd>15+ years</dd></div>
            <div><dt>status</dt><dd class="accent-text">online</dd></div>
          </dl>
        </section>

        <section class="side-card reveal reveal-5">
          <div class="eyebrow">certification cache</div>
          <div class="cert-item">
            <strong>Google Cloud Associate Cloud Engineer</strong>
            <span>2025 → 2028</span>
          </div>
          <div class="cert-item">
            <strong>Microsoft Azure Fundamentals</strong>
            <span>Issued 2022</span>
          </div>
          <div class="cert-item">
            <strong>Microsoft MCP / MCTS</strong>
            <span>Issued 2012</span>
          </div>
        </section>
      </aside>
    </main>

    <footer class="footerbar">
      <span>● PROFILE: CV + CURRENT PROJECTS</span>
      <span class="accent-text">DESIGN → BUILD → TEST → DELIVER → IMPROVE</span>
      <a href="mailto:warbon@acware.tech">warbon@acware.tech</a>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'PortfolioPage',

  data() {
    return {
      activeTheme: 'homebrew',
      themeMenuOpen: false,
      bootVisible: true,
      visibleBootLines: 0,
      bootProgress: 0,
      bootTimers: [],
      animationFrame: null,
      resizeHandler: null,
      networkPoints: [],
      commandInput: '',
      commandHistory: [],
      historyIndex: -1,
      terminalLines: [],
      quickCommands: [
        { label: 'about', command: 'about' },
        { label: 'experience', command: 'experience' },
        { label: 'skills', command: 'skills' },
        { label: 'projects', command: 'projects' },
        { label: 'certs', command: 'certs' },
        { label: 'contact', command: 'contact' }
      ],
      bootLines: [
        '[BOOT] initializing interactive shell...',
        '[OK] loading professional profile',
        '[OK] indexing 15+ years of software experience',
        '[OK] mounting project workspace',
        '[OK] loading terminal theme engine',
        '[OK] connecting AI portfolio copilot',
        '[READY] welcome, visitor.'
      ],
      themes: {
        homebrew: {
          label: 'Homebrew',
          accent: '#00ff66',
          accent2: '#00c853',
          bg: '#020604',
          panel: '#061009',
          panel2: '#08140b',
          text: '#eaffef',
          muted: '#71927a'
        },
        dracula: {
          label: 'Dracula',
          accent: '#bd93f9',
          accent2: '#ff79c6',
          bg: '#191a21',
          panel: '#21222c',
          panel2: '#282a36',
          text: '#f8f8f2',
          muted: '#9990aa'
        },
        nord: {
          label: 'Nord',
          accent: '#88c0d0',
          accent2: '#81a1c1',
          bg: '#1f2630',
          panel: '#252e39',
          panel2: '#2e3845',
          text: '#eceff4',
          muted: '#91a0ab'
        },
        solarized: {
          label: 'Solarized Dark',
          accent: '#b58900',
          accent2: '#2aa198',
          bg: '#001c24',
          panel: '#00252e',
          panel2: '#073642',
          text: '#eee8d5',
          muted: '#839496'
        },
        gruvbox: {
          label: 'Gruvbox Dark',
          accent: '#b8bb26',
          accent2: '#fabd2f',
          bg: '#1d2021',
          panel: '#282828',
          panel2: '#32302f',
          text: '#ebdbb2',
          muted: '#a89984'
        },
        monokai: {
          label: 'Monokai',
          accent: '#a6e22e',
          accent2: '#f92672',
          bg: '#1d1e19',
          panel: '#24251f',
          panel2: '#2d2e27',
          text: '#f8f8f2',
          muted: '#9d9d8f'
        },
        tokyo: {
          label: 'Tokyo Night',
          accent: '#7aa2f7',
          accent2: '#bb9af7',
          bg: '#16161e',
          panel: '#1a1b26',
          panel2: '#24283b',
          text: '#c0caf5',
          muted: '#7982a9'
        },
        onedark: {
          label: 'One Dark',
          accent: '#98c379',
          accent2: '#61afef',
          bg: '#17191f',
          panel: '#21252b',
          panel2: '#282c34',
          text: '#abb2bf',
          muted: '#7f8795'
        }
      }
    }
  },

  head() {
    return {
      title: 'Wilfredo Arbon — Senior Software Engineer',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Interactive terminal-style portfolio of Wilfredo Arbon, Senior Software Engineer and backend/full-stack developer.'
        },
        { hid: 'theme-color', name: 'theme-color', content: this.currentTheme.bg }
      ]
    }
  },

  computed: {
    nameCharacters() {
      return 'Wilfredo Arbon'.split('')
    },

    currentTheme() {
      return this.themes[this.activeTheme] || this.themes.homebrew
    },

    activeThemeLabel() {
      return this.currentTheme.label
    },

    themeOptions() {
      return Object.keys(this.themes).map((key) => ({
        key,
        label: this.themes[key].label,
        accent: this.themes[key].accent
      }))
    },

    themeVars() {
      const t = this.currentTheme
      return {
        '--accent': t.accent,
        '--accent-2': t.accent2,
        '--bg': t.bg,
        '--panel': t.panel,
        '--panel-2': t.panel2,
        '--text': t.text,
        '--muted': t.muted,
        '--line': this.hexToRgba(t.accent, 0.16),
        '--line-strong': this.hexToRgba(t.accent, 0.34),
        '--glow': this.hexToRgba(t.accent, 0.18)
      }
    }
  },

  mounted() {
    this.restoreTheme()
    this.startBootSequence()
    this.resizeHandler = () => this.setupNetwork()
    window.addEventListener('resize', this.resizeHandler)
    this.$nextTick(() => {
      this.setupNetwork()
      this.animateNetwork()
      document.addEventListener('click', this.closeThemeMenu)
    })
  },

  beforeDestroy() {
    this.bootTimers.forEach((timer) => clearTimeout(timer))
    if (this.animationFrame) cancelAnimationFrame(this.animationFrame)
    if (this.resizeHandler) window.removeEventListener('resize', this.resizeHandler)
    document.removeEventListener('click', this.closeThemeMenu)
  },

  methods: {
    closeThemeMenu() {
      this.themeMenuOpen = false
    },

    startBootSequence() {
      const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const visited = sessionStorage.getItem('portfolio_booted') === '1'

      if (reducedMotion || visited) {
        this.bootVisible = false
        this.visibleBootLines = this.bootLines.length
        this.bootProgress = 100
        this.seedTerminal()
        this.focusTerminal()
        return
      }

      this.bootLines.forEach((line, index) => {
        this.bootTimers.push(setTimeout(() => {
          this.visibleBootLines = index + 1
          this.bootProgress = Math.round(((index + 1) / this.bootLines.length) * 100)
        }, 180 + index * 210))
      })

      this.bootTimers.push(setTimeout(() => {
        this.bootVisible = false
        sessionStorage.setItem('portfolio_booted', '1')
        this.seedTerminal()
        this.focusTerminal()
      }, 1950))
    },

    seedTerminal() {
      if (this.terminalLines.length) return
      const intro = [
        '<span class="muted-text">Professional profile loaded.</span>',
        '<span class="muted-text">Theme engine online: ' + this.escapeHtml(this.activeThemeLabel) + '.</span>',
        'Type <span class="accent-text">help</span> to explore, <span class="accent-text">ask cloud experience</span>, or <span class="accent-text">theme dracula</span>.'
      ]
      intro.forEach((html, index) => {
        this.bootTimers.push(setTimeout(() => this.appendTerminal(html), index * 130))
      })
    },

    focusTerminal() {
      this.$nextTick(() => {
        if (this.$refs.commandInput) this.$refs.commandInput.focus()
      })
    },

    restoreTheme() {
      const aliases = {
        green: 'homebrew',
        cyan: 'nord',
        amber: 'solarized',
        violet: 'dracula'
      }
      let stored = 'homebrew'
      try {
        stored = localStorage.getItem('portfolio_theme') || 'homebrew'
      } catch (error) {
        stored = 'homebrew'
      }
      stored = aliases[stored] || stored
      this.activeTheme = this.themes[stored] ? stored : 'homebrew'
    },

    applyTheme(key, announce) {
      const aliases = {
        green: 'homebrew',
        cyan: 'nord',
        amber: 'solarized',
        violet: 'dracula'
      }
      const normalized = aliases[key] || key
      if (!this.themes[normalized]) return false

      this.activeTheme = normalized
      this.themeMenuOpen = false
      try {
        localStorage.setItem('portfolio_theme', normalized)
      } catch (error) {
        // Local storage is optional; the theme still works for this session.
      }

      if (announce) {
        this.appendTerminal('Theme switched to <span class="accent-text">' + this.escapeHtml(this.themes[normalized].label) + '</span>.')
        this.focusTerminal()
      }
      return true
    },

    hexToRgba(hex, alpha) {
      const normalized = hex.replace('#', '')
      const value = normalized.length === 3
        ? normalized.split('').map((char) => char + char).join('')
        : normalized
      const number = parseInt(value, 16)
      const r = (number >> 16) & 255
      const g = (number >> 8) & 255
      const b = number & 255
      return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')'
    },

    handlePointerMove(event) {
      if (!this.$refs.app || !this.$refs.mouseGlow) return
      const rect = this.$refs.app.getBoundingClientRect()
      this.$refs.mouseGlow.style.left = (event.clientX - rect.left) + 'px'
      this.$refs.mouseGlow.style.top = (event.clientY - rect.top) + 'px'
    },

    setupNetwork() {
      const canvas = this.$refs.networkCanvas
      const app = this.$refs.app
      if (!canvas || !app) return

      const rect = app.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.max(1, Math.floor(rect.width * dpr))
      canvas.height = Math.max(1, Math.floor(rect.height * dpr))
      canvas.style.width = rect.width + 'px'
      canvas.style.height = rect.height + 'px'

      const context = canvas.getContext('2d')
      if (context) context.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.max(24, Math.min(54, Math.floor(rect.width / 28)))
      this.networkPoints = Array.from({ length: count }, () => ({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        radius: Math.random() * 1.1 + 0.45
      }))
    },

    animateNetwork() {
      const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reducedMotion) return

      const canvas = this.$refs.networkCanvas
      if (!canvas) return
      const context = canvas.getContext('2d')
      if (!context) return

      const draw = () => {
        const width = canvas.clientWidth
        const height = canvas.clientHeight
        context.clearRect(0, 0, width, height)

        this.networkPoints.forEach((point) => {
          point.x += point.vx
          point.y += point.vy
          if (point.x < 0 || point.x > width) point.vx *= -1
          if (point.y < 0 || point.y > height) point.vy *= -1
        })

        for (let i = 0; i < this.networkPoints.length; i += 1) {
          for (let j = i + 1; j < this.networkPoints.length; j += 1) {
            const a = this.networkPoints[i]
            const b = this.networkPoints[j]
            const distance = Math.hypot(a.x - b.x, a.y - b.y)
            if (distance < 120) {
              context.strokeStyle = this.hexToRgba(this.currentTheme.accent, (1 - distance / 120) * 0.07)
              context.lineWidth = 0.65
              context.beginPath()
              context.moveTo(a.x, a.y)
              context.lineTo(b.x, b.y)
              context.stroke()
            }
          }
        }

        this.networkPoints.forEach((point) => {
          context.fillStyle = this.hexToRgba(this.currentTheme.accent, 0.26)
          context.beginPath()
          context.arc(point.x, point.y, point.radius, 0, Math.PI * 2)
          context.fill()
        })

        this.animationFrame = requestAnimationFrame(draw)
      }

      draw()
    },

    appendTerminal(html, className) {
      this.terminalLines.push({ html, className: className || '' })
      this.$nextTick(() => {
        const output = this.$refs.terminalOutput
        if (output) output.scrollTop = output.scrollHeight
      })
    },

    runQuick(command) {
      this.executeCommand(command)
      this.focusTerminal()
    },

    handleCommandKeydown(event) {
      if (event.key === 'Enter') {
        event.preventDefault()
        const command = this.commandInput
        this.commandInput = ''
        this.executeCommand(command)
        return
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault()
        if (!this.commandHistory.length) return
        if (this.historyIndex < 0) this.historyIndex = this.commandHistory.length
        this.historyIndex = Math.max(0, this.historyIndex - 1)
        this.commandInput = this.commandHistory[this.historyIndex] || ''
        return
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault()
        if (!this.commandHistory.length || this.historyIndex < 0) return
        this.historyIndex = Math.min(this.commandHistory.length, this.historyIndex + 1)
        this.commandInput = this.historyIndex === this.commandHistory.length
          ? ''
          : (this.commandHistory[this.historyIndex] || '')
        return
      }

      if (event.key === 'Tab') {
        event.preventDefault()
        this.autoCompleteCommand()
      }
    },

    autoCompleteCommand() {
      const commands = ['help', 'about', 'whoami', 'experience', 'skills', 'projects', 'certs', 'education', 'ai', 'contact', 'theme', 'clear']
      const value = this.commandInput.trim().toLowerCase()
      if (!value) return
      const matches = commands.filter((command) => command.indexOf(value) === 0)
      if (matches.length === 1) this.commandInput = matches[0]
    },

    executeCommand(rawCommand) {
      const text = (rawCommand || '').trim()
      if (!text) return

      this.commandHistory.push(text)
      this.historyIndex = -1
      this.appendTerminal('wilfredo@portfolio:~$ ' + this.escapeHtml(text), 'command-line')

      const pieces = text.split(/\s+/)
      const base = pieces[0].toLowerCase()

      if (base === 'clear') {
        this.terminalLines = []
        return
      }

      if (base === 'ask') {
        const question = text.slice(3).trim()
        this.appendTerminal('<span class="muted-text">AI searching professional profile...</span>')
        this.bootTimers.push(setTimeout(() => {
          this.appendTerminal('<span class="accent-text">AI →</span> ' + this.escapeHtml(this.answerQuestion(question)))
        }, 260))
        return
      }

      if (base === 'theme') {
        this.handleThemeCommand(text.slice(5).trim())
        return
      }

      const command = this.commandOutput(base)
      if (!command) {
        this.appendTerminal('Command not found: <span class="bright-text">' + this.escapeHtml(base) + '</span>. Type <span class="accent-text">help</span>.')
        return
      }

      command.forEach((line, index) => {
        this.bootTimers.push(setTimeout(() => this.appendTerminal(line), index * 45))
      })
    },

    handleThemeCommand(argument) {
      const aliases = {
        'solarized dark': 'solarized',
        'solarized-dark': 'solarized',
        'gruvbox dark': 'gruvbox',
        'gruvbox-dark': 'gruvbox',
        'tokyo night': 'tokyo',
        'tokyo-night': 'tokyo',
        'one dark': 'onedark',
        'one-dark': 'onedark',
        'one_dark': 'onedark',
        green: 'homebrew',
        cyan: 'nord',
        amber: 'solarized',
        violet: 'dracula'
      }
      const raw = (argument || '').toLowerCase()
      const key = aliases[raw] || raw

      if (!key || key === 'list') {
        const names = this.themeOptions.map((theme) => theme.label).join(', ')
        this.appendTerminal('<span class="bright-text">Available themes:</span> <span class="accent-text">' + this.escapeHtml(names) + '</span>')
        return
      }

      if (!this.applyTheme(key, false)) {
        this.appendTerminal('Unknown theme. Type <span class="accent-text">theme list</span>.')
        return
      }

      this.appendTerminal('Theme switched to <span class="accent-text">' + this.escapeHtml(this.activeThemeLabel) + '</span>.')
    },

    commandOutput(base) {
      const commands = {
        help: [
          '<span class="bright-text">AVAILABLE COMMANDS</span>',
          '<span class="accent-text">about</span>        professional summary',
          '<span class="accent-text">experience</span>   employment timeline',
          '<span class="accent-text">skills</span>       technical stack',
          '<span class="accent-text">projects</span>     selected current products',
          '<span class="accent-text">certs</span>        certifications & training',
          '<span class="accent-text">education</span>    formal education',
          '<span class="accent-text">ai</span>           AI / API experience',
          '<span class="accent-text">contact</span>      public contact links',
          '<span class="accent-text">ask &lt;topic&gt;</span>   query the portfolio copilot',
          '<span class="accent-text">theme list</span>   list terminal themes',
          '<span class="accent-text">clear</span>        clear terminal'
        ],
        whoami: [
          '<span class="bright-text">Wilfredo Baladya Arbon Jr.</span>',
          'Senior Software Engineer · Full-Stack / Backend Developer',
          '<span class="muted-text">Cebu, Philippines · 15+ years in software development</span>'
        ],
        about: [
          '<span class="bright-text">profile.md</span>',
          '15+ years of software development experience with deep Microsoft-stack experience and broad exposure to modern open-source technologies.',
          'I build production software, translate user needs into technical solutions, improve existing systems, and work comfortably across software and infrastructure.',
          '<span class="accent-text">Current:</span> Senior Software Engineer at Sansan Global Development Center.'
        ],
        experience: [
          '<span class="bright-text">experience.log</span>',
          '<div class="terminal-record"><strong>2024 → Present / Sansan Global Development Center</strong><br>Senior Software Engineer — product design and development, stakeholder collaboration, feature delivery, testing, debugging, code reviews and maintenance.</div>',
          '<div class="terminal-record"><strong>Oct 2023 → Dec 2023 / EQHO AI</strong><br>Backend Developer — integrated Google Calendar API and OpenAI API using Python; implemented event scheduling and natural-language features.</div>',
          '<div class="terminal-record"><strong>2007 → 2023 / Tsuneishi Technical Services (Phils.)</strong><br>Software Developer → Assistant IT Supervisor / Software Developer → IT Supervisor / Software Developer. Built in-house applications and supervised developers, servers, networks, backups and VMware infrastructure.</div>',
          '<div class="terminal-record"><strong>2004 → 2007 / Gaisano Main, Inc.</strong><br>Software Developer — developed and maintained in-house applications and store servers.</div>'
        ],
        skills: [
          '<span class="bright-text">skills --matrix</span>',
          '<span class="accent-text">Microsoft</span>      C# · ASP.NET · .NET Core · MVC · Web API · WebForms · WinForms · Blazor',
          '<span class="accent-text">Web</span>            Vue.js · ReactJS · JavaScript · HTML/CSS · Laravel PHP',
          '<span class="accent-text">Backend</span>        Python/FastAPI · Kotlin/Ktor · REST/Web APIs',
          '<span class="accent-text">Data</span>           SQL Server · PostgreSQL · MySQL · Oracle · Stored Procedures · Triggers · Views',
          '<span class="accent-text">Dev tools</span>      Azure DevOps · Git · GitHub · Bitbucket · Docker · VS Code · Visual Studio · Postman',
          '<span class="accent-text">Infrastructure</span> Ubuntu/Linux · Windows Server · IIS · Active Directory · VMware vSphere · networking'
        ],
        projects: [
          '<span class="bright-text">projects --selected</span>',
          '<div class="terminal-record"><strong>LeagueFlow</strong><br>Basketball league management platform for organizations, teams, schedules, standings, game results and public league experiences.<br><span class="terminal-tags">SaaS · Next.js · PostgreSQL</span></div>',
          '<div class="terminal-record"><strong>Scholiyo</strong><br>End-to-end school SaaS platform designed around school operations, attendance and parent/student experiences.<br><span class="terminal-tags">Next.js · React Native · SaaS</span></div>',
          '<div class="terminal-record"><strong>Nonix</strong><br>Local-first AI coding-agent workspace and monitoring environment for multi-agent development workflows.<br><span class="terminal-tags">AI tooling · local-first · developer experience</span></div>'
        ],
        certs: [
          '<span class="bright-text">certifications.txt</span>',
          '<span class="accent-text">2025</span> Google Cloud Certified — Associate Cloud Engineer (valid through Feb 2028)',
          '<span class="accent-text">2022</span> Microsoft Certified — Azure Fundamentals',
          '<span class="accent-text">2012</span> Microsoft Certified Professional (MCP)',
          '<span class="accent-text">2012</span> Microsoft Certified Technology Specialist — SQL Server 2008 Implementation & Maintenance',
          '<span class="muted-text">Training: VMware vSphere 5.5 Administration · ITIL v3 Foundation · Data Privacy Governance Compliance Act Workshop.</span>'
        ],
        education: [
          '<span class="bright-text">education.txt</span>',
          'University of Cebu — Bachelor of Science in Information of Computer Science · Graduated October 2002',
          'Toledo National Vocational School — High School / Secondary · Graduated March 1996'
        ],
        ai: [
          '<span class="bright-text">ai-experience.log</span>',
          'At EQHO AI, I integrated the <span class="accent-text">OpenAI API</span> and <span class="accent-text">Google Calendar API</span> using Python.',
          'The work included event scheduling and natural-language processing features.',
          '<span class="muted-text">AI in this portfolio is part of the interaction model, not only a visual theme.</span>'
        ],
        contact: [
          '<span class="bright-text">contact --public</span>',
          'email    → <a href="mailto:warbon@acware.tech">warbon@acware.tech</a>',
          'github   → <a href="https://github.com/warbon" target="_blank" rel="noopener">github.com/warbon</a>',
          'linkedin → <a href="https://www.linkedin.com/in/wilfredo-arbon" target="_blank" rel="noopener">linkedin.com/in/wilfredo-arbon</a>',
          'website  → <a href="https://warbon.dev" target="_blank" rel="noopener">warbon.dev</a>',
          '<span class="muted-text">Private CV phone number and street address are intentionally not exposed here.</span>'
        ]
      }

      return commands[base] || null
    },

    answerQuestion(question) {
      const query = (question || '').toLowerCase()
      if (!query) return 'Ask me about Wilfredo\'s backend experience, Microsoft stack, cloud certifications, leadership, AI/API work or projects.'

      if (query.includes('cloud') || query.includes('azure') || query.includes('google')) {
        return 'Wilfredo holds Google Cloud Associate Cloud Engineer and Microsoft Azure Fundamentals certifications. His CV also lists Azure DevOps and Google Cloud Console experience.'
      }
      if (query.includes('ai') || query.includes('openai')) {
        return 'At EQHO AI, Wilfredo integrated OpenAI API and Google Calendar API using Python, including event scheduling and natural-language processing features.'
      }
      if (query.includes('lead') || query.includes('supervis') || query.includes('manage')) {
        return 'At Tsuneishi Technical Services, he progressed from Software Developer to Assistant IT Supervisor and IT Supervisor / Software Developer, supervising developers and IT staff while managing applications and infrastructure.'
      }
      if (query.includes('backend') || query.includes('api')) {
        return 'His backend experience spans ASP.NET Web API, .NET Core, Python/FastAPI, Kotlin/Ktor, REST APIs, SQL databases and third-party API integrations.'
      }
      if (query.includes('current') || query.includes('sansan')) {
        return 'Wilfredo has been a Senior Software Engineer at Sansan Global Development Center since January 2024.'
      }
      if (query.includes('project') || query.includes('product')) {
        return 'Current product work includes LeagueFlow, Scholiyo and Nonix, covering sports SaaS, school SaaS and local-first AI developer tooling.'
      }
      if (query.includes('skill') || query.includes('stack')) {
        return 'The stack includes C#/.NET, ASP.NET, SQL Server, PostgreSQL, Python/FastAPI, Vue, React, Laravel, Kotlin/Ktor, Docker, Azure DevOps, Linux/Windows Server and VMware.'
      }

      return 'I can answer from the portfolio profile about experience, skills, certifications, backend/API work, cloud, AI integrations, leadership history and current projects.'
    },

    escapeHtml(value) {
      return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
    }
  }
}
</script>

<style>
:root {
  color-scheme: dark;
}

html,
body,
#__nuxt,
#__layout {
  min-height: 100%;
  margin: 0;
  background: #010302;
}

body {
  overflow-x: hidden;
}

* {
  box-sizing: border-box;
}

button,
input {
  font: inherit;
}

.portfolio-shell {
  --accent: #00ff66;
  --accent-2: #00c853;
  --bg: #020604;
  --panel: #061009;
  --panel-2: #08140b;
  --text: #eaffef;
  --muted: #71927a;
  --line: rgba(0, 255, 102, 0.16);
  --line-strong: rgba(0, 255, 102, 0.34);
  --glow: rgba(0, 255, 102, 0.18);

  position: relative;
  width: min(1540px, calc(100% - 28px));
  min-height: calc(100vh - 28px);
  margin: 14px auto;
  overflow: hidden;
  border: 1px solid var(--line-strong);
  border-radius: 22px;
  color: var(--text);
  background:
    radial-gradient(circle at 75% 14%, var(--glow), transparent 31rem),
    linear-gradient(180deg, var(--bg), #010302 110%);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
  box-shadow: 0 35px 120px rgba(0, 0, 0, 0.56), 0 0 65px color-mix(in srgb, var(--accent) 5%, transparent);
  transition: background 0.45s ease, border-color 0.35s ease, color 0.35s ease;
}

.portfolio-shell::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 10;
  pointer-events: none;
  background: linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px);
  background-size: 100% 4px;
  opacity: 0.35;
}

.portfolio-shell::after {
  content: "";
  position: absolute;
  z-index: 9;
  top: 56px;
  left: -20%;
  width: 140%;
  height: 1px;
  pointer-events: none;
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
  opacity: 0;
  box-shadow: 0 0 16px var(--glow);
  animation: scan-sweep 8s linear infinite;
}

@keyframes scan-sweep {
  0% { transform: translateY(0); opacity: 0; }
  7% { opacity: 0.22; }
  93% { opacity: 0.2; }
  100% { transform: translateY(calc(100vh - 120px)); opacity: 0; }
}

.network-canvas {
  position: absolute;
  inset: 56px 0 42px;
  z-index: 0;
  width: 100%;
  height: calc(100% - 98px);
  pointer-events: none;
  opacity: 0.55;
}

.mouse-glow {
  position: absolute;
  z-index: 1;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  pointer-events: none;
  opacity: 0;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle, var(--glow), transparent 68%);
  transition: opacity 0.25s ease;
}

.portfolio-shell:hover .mouse-glow {
  opacity: 0.42;
}

.topbar,
.workspace,
.footerbar {
  position: relative;
  z-index: 2;
}

.topbar {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 12px;
  height: 58px;
  padding: 0 18px;
  border-bottom: 1px solid var(--line);
  background: color-mix(in srgb, var(--bg) 94%, transparent);
  backdrop-filter: blur(16px);
}

.window-controls {
  display: flex;
  gap: 8px;
}

.window-controls span {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: color-mix(in srgb, var(--accent) 24%, #253025);
}

.window-controls span:nth-child(2) {
  background: color-mix(in srgb, var(--accent) 50%, #2e3a2f);
}

.window-controls span:nth-child(3) {
  background: var(--accent);
  box-shadow: 0 0 12px var(--glow);
}

.host-path {
  color: var(--muted);
  font-size: 11px;
}

.topbar-actions {
  justify-self: end;
  display: flex;
  align-items: center;
  gap: 14px;
}

.system-online {
  display: flex;
  align-items: center;
  gap: 7px;
  color: var(--accent);
  font-size: 9px;
  white-space: nowrap;
}

.system-online i,
.hero-status-row i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 10px var(--accent);
}

.theme-picker {
  position: relative;
}

.theme-trigger {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 132px;
  padding: 8px 10px;
  border: 1px solid var(--line);
  border-radius: 9px;
  color: var(--text);
  background: color-mix(in srgb, var(--panel) 88%, transparent);
  cursor: pointer;
  font-size: 9px;
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.theme-trigger:hover {
  border-color: var(--line-strong);
  transform: translateY(-1px);
}

.theme-swatch,
.theme-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 10px var(--glow);
  flex: 0 0 auto;
}

.chevron {
  margin-left: auto;
  color: var(--muted);
}

.theme-menu {
  position: absolute;
  z-index: 30;
  top: calc(100% + 9px);
  right: 0;
  width: 230px;
  padding: 10px;
  border: 1px solid var(--line-strong);
  border-radius: 12px;
  background: color-mix(in srgb, var(--panel-2) 97%, black 3%);
  box-shadow: 0 20px 55px rgba(0, 0, 0, 0.45), 0 0 30px var(--glow);
}

.theme-menu-title {
  padding: 4px 7px 9px;
  color: var(--muted);
  font-size: 8px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.theme-option {
  display: grid;
  grid-template-columns: 14px 1fr auto;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 8px 7px;
  border: 0;
  border-radius: 7px;
  color: var(--text);
  background: transparent;
  text-align: left;
  cursor: pointer;
  font-size: 9px;
}

.theme-option:hover,
.theme-option.active {
  background: color-mix(in srgb, var(--accent) 8%, transparent);
}

.theme-option small {
  color: var(--accent);
  font-size: 7px;
  text-transform: uppercase;
}

.menu-pop-enter-active,
.menu-pop-leave-active {
  transition: opacity 0.17s ease, transform 0.17s ease;
}

.menu-pop-enter,
.menu-pop-leave-to {
  opacity: 0;
  transform: translateY(-5px) scale(0.98);
}

.workspace {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 330px;
  min-height: 760px;
}

.main-column {
  min-width: 0;
  padding: 30px;
  border-right: 1px solid var(--line);
}

.side-column {
  padding: 18px;
  background: color-mix(in srgb, var(--panel) 74%, transparent);
  backdrop-filter: blur(10px);
}

.hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 330px;
  align-items: center;
  gap: 28px;
  min-height: 300px;
}

.hero-copy {
  position: relative;
}

.hero-copy::before {
  content: "";
  position: absolute;
  top: -14px;
  left: -15px;
  width: 2px;
  height: 100%;
  background: linear-gradient(var(--accent), transparent);
  opacity: 0.25;
  box-shadow: 0 0 10px var(--glow);
}

.terminal-prompt {
  margin-bottom: 10px;
  color: var(--accent);
  font-size: 12px;
}

.hero-name {
  display: flex;
  flex-wrap: nowrap;
  align-items: baseline;
  margin: 0 0 11px;
  white-space: nowrap;
  color: var(--text);
  font-family: Inter, ui-sans-serif, system-ui, sans-serif;
  font-size: clamp(38px, 5vw, 70px);
  line-height: 0.98;
  letter-spacing: -0.055em;
  font-weight: 720;
}

.name-char {
  display: inline-block;
  opacity: 0;
  transform: translateY(13px) rotateX(28deg);
  animation: letter-in 0.55s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}

.name-char.space {
  min-width: 0.28em;
}

@keyframes letter-in {
  to { opacity: 1; transform: none; }
}

.block-cursor {
  display: inline-block;
  width: 0.1em;
  height: 0.82em;
  margin-left: 0.12em;
  background: var(--accent);
  box-shadow: 0 0 14px var(--accent);
  animation: cursor-blink 1s steps(1) infinite;
}

@keyframes cursor-blink {
  50% { opacity: 0.12; }
}

.hero-role {
  margin-bottom: 18px;
  color: var(--accent);
  font-size: 13px;
}

.hero-summary {
  max-width: 760px;
  margin: 0;
  color: color-mix(in srgb, var(--text) 69%, var(--muted));
  font-size: 12px;
  line-height: 1.8;
}

.hero-status-row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 18px;
  color: var(--muted);
  font-size: 9px;
}

.hero-status-row span {
  display: flex;
  align-items: center;
  gap: 7px;
}

.ai-visual {
  height: 300px;
  display: grid;
  place-items: center;
}

.hud {
  position: relative;
  width: 300px;
  height: 300px;
  display: grid;
  place-items: center;
  isolation: isolate;
}

.hud::before {
  content: "";
  position: absolute;
  inset: 18px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--glow), transparent 64%);
  filter: blur(10px);
  opacity: 0.75;
}

.hud-ring,
.orbit {
  position: absolute;
  border-radius: 50%;
  border: 1px solid var(--line-strong);
}

.ring-outer {
  width: 272px;
  height: 272px;
  border-style: dashed;
  opacity: 0.45;
  animation: spin 30s linear infinite;
}

.ring-mid {
  width: 226px;
  height: 226px;
  opacity: 0.65;
}

.ring-inner {
  width: 186px;
  height: 186px;
  border-style: dotted;
  opacity: 0.4;
  animation: spin-reverse 22s linear infinite;
}

.hud-cross {
  position: absolute;
  z-index: -1;
  opacity: 0.38;
}

.hud-cross.horizontal {
  width: 246px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
}

.hud-cross.vertical {
  width: 1px;
  height: 246px;
  background: linear-gradient(180deg, transparent, var(--accent), transparent);
}

.orbit-one {
  width: 246px;
  height: 246px;
  animation: spin 18s linear infinite;
}

.orbit-two {
  width: 198px;
  height: 198px;
  animation: spin-reverse 13s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes spin-reverse {
  to { transform: rotate(-360deg); }
}

.satellite,
.hud-node {
  position: absolute;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 12px var(--accent), 0 0 26px var(--glow);
}

.satellite {
  width: 13px;
  height: 13px;
  animation: satellite-pulse 2.8s ease-in-out infinite;
}

.sat-one { top: 17px; right: 60px; }
.sat-two { bottom: 22px; left: 43px; width: 10px; height: 10px; animation-delay: 0.6s; }
.sat-three { top: 34px; left: 16px; width: 9px; height: 9px; animation-delay: 1.2s; }
.sat-four { bottom: 31px; right: 13px; width: 8px; height: 8px; animation-delay: 1.7s; }

@keyframes satellite-pulse {
  0%, 100% { transform: scale(0.75); opacity: 0.55; }
  50% { transform: scale(1.18); opacity: 1; }
}

.hud-node {
  width: 5px;
  height: 5px;
  opacity: 0.7;
  animation: node-pulse 2.4s ease-in-out infinite;
}

.node-one { top: 30px; left: 57px; }
.node-two { top: 70px; right: 25px; animation-delay: 0.7s; }
.node-three { bottom: 40px; left: 82px; animation-delay: 1.4s; }
.node-four { bottom: 78px; right: 50px; animation-delay: 1.9s; }

@keyframes node-pulse {
  0%, 100% { transform: scale(0.75); opacity: 0.35; }
  50% { transform: scale(1.35); opacity: 1; }
}

.hud-tag {
  position: absolute;
  z-index: 4;
  padding: 5px 9px;
  border: 1px solid var(--line);
  border-radius: 999px;
  color: color-mix(in srgb, var(--accent) 70%, var(--text));
  background: color-mix(in srgb, var(--panel) 88%, transparent);
  font-size: 8px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  animation: tag-float 4.5s ease-in-out infinite;
}

.tag-one { top: 9px; left: 102px; }
.tag-two { top: 123px; right: -3px; animation-delay: 0.8s; }
.tag-three { bottom: 108px; left: -3px; animation-delay: 1.6s; }

@keyframes tag-float {
  50% { transform: translateY(-4px); }
}

.ai-core {
  position: relative;
  z-index: 3;
  display: grid;
  place-items: center;
  width: 152px;
  height: 152px;
  border: 1px solid var(--accent);
  border-radius: 50%;
  background: radial-gradient(circle at center, var(--glow), color-mix(in srgb, var(--panel) 85%, black));
  box-shadow: 0 0 44px var(--glow), inset 0 0 30px color-mix(in srgb, var(--accent) 5%, transparent);
  animation: core-breathe 4.2s ease-in-out infinite;
}

.ai-core::before,
.ai-core::after {
  content: "";
  position: absolute;
  border: 1px solid var(--line-strong);
  border-radius: 50%;
}

.ai-core::before { inset: -18px; }
.ai-core::after { inset: -42px; border-style: dashed; opacity: 0.4; }

@keyframes core-breathe {
  50% { transform: scale(1.035); box-shadow: 0 0 65px var(--glow), inset 0 0 35px color-mix(in srgb, var(--accent) 8%, transparent); }
}

.pulse {
  position: absolute;
  inset: -1px;
  border: 1px solid var(--line-strong);
  border-radius: 50%;
  animation: pulse-ring 2.8s ease-out infinite;
}

.pulse-two { animation-delay: 1.1s; }

@keyframes pulse-ring {
  0% { transform: scale(0.88); opacity: 0.55; }
  100% { transform: scale(1.9); opacity: 0; }
}

.ai-core-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1;
}

.ai-core-text strong {
  color: var(--text);
  font-family: Inter, ui-sans-serif, system-ui, sans-serif;
  font-size: 56px;
  letter-spacing: -0.06em;
}

.ai-core-text span {
  margin-top: 8px;
  color: var(--accent);
  font-size: 18px;
  letter-spacing: 0.34em;
  text-indent: 0.34em;
}

.terminal-panel {
  position: relative;
  margin-top: 24px;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: color-mix(in srgb, var(--bg) 92%, black 8%);
  box-shadow: 0 16px 50px rgba(0, 0, 0, 0.18);
}

.terminal-panel::after {
  content: "";
  position: absolute;
  top: 40px;
  right: 0;
  left: 0;
  height: 52px;
  pointer-events: none;
  background: linear-gradient(180deg, color-mix(in srgb, var(--accent) 4%, transparent), transparent);
}

.terminal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  height: 40px;
  padding: 0 14px;
  border-bottom: 1px solid var(--line);
  color: var(--muted);
  font-size: 9px;
}

.terminal-header b {
  color: var(--accent);
  font-weight: 500;
}

.terminal-output {
  height: 330px;
  overflow: auto;
  padding: 16px;
  scrollbar-color: var(--line-strong) transparent;
  scrollbar-width: thin;
}

.terminal-line {
  color: color-mix(in srgb, var(--text) 78%, var(--muted));
  font-size: 11px;
  line-height: 1.68;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}

.terminal-line + .terminal-line {
  margin-top: 4px;
}

.line-enter {
  animation: terminal-enter 0.25s ease both;
}

@keyframes terminal-enter {
  from { opacity: 0; transform: translateX(-6px); }
}

.command-line,
.accent-text,
.terminal-line .accent-text {
  color: var(--accent) !important;
}

.muted-text,
.terminal-line .muted-text {
  color: var(--muted) !important;
}

.bright-text,
.terminal-line .bright-text {
  color: var(--text) !important;
}

.terminal-line a,
.footerbar a {
  color: var(--accent);
  text-decoration: none;
}

.terminal-line a:hover,
.footerbar a:hover {
  text-decoration: underline;
}

.terminal-record {
  margin: 8px 0;
  padding-left: 11px;
  border-left: 2px solid var(--accent);
  color: color-mix(in srgb, var(--text) 70%, var(--muted));
}

.terminal-record strong {
  color: var(--text);
}

.terminal-tags {
  color: var(--accent);
  font-size: 9px;
}

.terminal-input-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-top: 1px solid var(--line);
}

.input-prefix {
  color: var(--accent);
  font-size: 11px;
  white-space: nowrap;
}

.terminal-input-row input {
  width: 100%;
  min-width: 0;
  padding: 9px 0;
  border: 0;
  outline: 0;
  color: var(--text);
  background: transparent;
  caret-color: var(--accent);
  font-size: 11px;
}

.terminal-input-row input::placeholder {
  color: color-mix(in srgb, var(--muted) 70%, transparent);
}

.side-card {
  position: relative;
  margin-bottom: 14px;
  overflow: hidden;
  padding: 14px;
  border: 1px solid var(--line);
  border-radius: 13px;
  background: linear-gradient(145deg, color-mix(in srgb, var(--panel-2) 88%, transparent), color-mix(in srgb, var(--panel) 88%, transparent));
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}

.side-card:hover {
  transform: translateY(-2px);
  border-color: var(--line-strong);
  box-shadow: 0 14px 36px rgba(0, 0, 0, 0.18), 0 0 24px color-mix(in srgb, var(--accent) 3%, transparent);
}

.side-card::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(110deg, transparent 20%, color-mix(in srgb, var(--accent) 5%, transparent) 45%, transparent 70%);
  transform: translateX(-120%);
}

.side-card:hover::after {
  animation: card-sweep 0.9s ease;
}

@keyframes card-sweep {
  to { transform: translateX(120%); }
}

.eyebrow {
  margin-bottom: 10px;
  color: color-mix(in srgb, var(--muted) 72%, transparent);
  font-size: 8px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.copilot-heading {
  display: grid;
  grid-template-columns: 36px 1fr auto;
  align-items: center;
  gap: 9px;
}

.copilot-icon {
  position: relative;
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border: 1px solid var(--accent);
  border-radius: 50%;
  color: var(--accent);
  font-size: 8px;
  box-shadow: 0 0 18px var(--glow);
}

.copilot-icon::before {
  content: "";
  position: absolute;
  inset: -6px;
  border: 1px solid var(--line);
  border-radius: 50%;
}

.copilot-heading strong {
  display: block;
  color: var(--text);
  font-size: 10px;
  font-weight: 500;
}

.copilot-heading span {
  display: block;
  margin-top: 2px;
  color: var(--muted);
  font-size: 7px;
}

.copilot-heading em {
  color: var(--accent);
  font-size: 7px;
  font-style: normal;
}

.side-card p {
  margin: 13px 0 0;
  color: color-mix(in srgb, var(--text) 59%, var(--muted));
  font-size: 9px;
  line-height: 1.65;
}

.signal-bars {
  display: flex;
  align-items: flex-end;
  gap: 3px;
  height: 24px;
  margin-top: 10px;
}

.signal-bars i {
  width: 3px;
  height: 4px;
  border-radius: 3px 3px 0 0;
  background: var(--accent);
  opacity: 0.35;
  animation: signal-wave 1.4s ease-in-out infinite;
}

@keyframes signal-wave {
  0%, 100% { height: 4px; opacity: 0.22; }
  50% { height: 21px; opacity: 0.85; box-shadow: 0 0 7px var(--glow); }
}

.quick-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 7px;
}

.quick-grid button {
  position: relative;
  overflow: hidden;
  padding: 9px 10px;
  border: 1px solid var(--line);
  border-radius: 8px;
  color: color-mix(in srgb, var(--text) 58%, var(--muted));
  background: transparent;
  text-align: left;
  cursor: pointer;
  font-size: 9px;
  transition: 0.18s ease;
}

.quick-grid button span {
  color: var(--accent);
}

.quick-grid button:hover {
  border-color: var(--line-strong);
  color: var(--text);
  background: color-mix(in srgb, var(--accent) 5%, transparent);
  transform: translateY(-1px);
}

.runtime-list {
  margin: 0;
}

.runtime-list div {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  padding: 7px 0;
  border-bottom: 1px dashed color-mix(in srgb, var(--line) 75%, transparent);
}

.runtime-list div:last-child {
  border-bottom: 0;
}

.runtime-list dt {
  color: var(--muted);
  font-size: 8px;
}

.runtime-list dd {
  max-width: 58%;
  margin: 0;
  color: color-mix(in srgb, var(--text) 72%, var(--muted));
  font-size: 8px;
  line-height: 1.45;
  text-align: right;
}

.cert-item {
  padding: 8px 0;
  border-bottom: 1px solid color-mix(in srgb, var(--line) 75%, transparent);
}

.cert-item:last-child {
  border-bottom: 0;
}

.cert-item strong {
  display: block;
  color: color-mix(in srgb, var(--text) 78%, var(--muted));
  font-size: 8px;
  font-weight: 500;
  line-height: 1.45;
}

.cert-item span {
  display: block;
  margin-top: 3px;
  color: var(--muted);
  font-size: 7px;
}

.footerbar {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 12px;
  min-height: 44px;
  padding: 10px 18px;
  border-top: 1px solid var(--line);
  color: var(--muted);
  background: color-mix(in srgb, var(--bg) 94%, transparent);
  font-size: 8px;
}

.footerbar span:nth-child(2) {
  justify-self: center;
}

.footerbar a {
  justify-self: end;
}

.reveal {
  animation: reveal-up 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) both;
}

.reveal-1 { animation-delay: 0.08s; }
.reveal-2 { animation-delay: 0.2s; }
.reveal-3 { animation-delay: 0.3s; }
.reveal-4 { animation-delay: 0.4s; }
.reveal-5 { animation-delay: 0.5s; }

@keyframes reveal-up {
  from { opacity: 0; transform: translateY(10px); }
}

.boot-screen {
  position: absolute;
  inset: 0;
  z-index: 50;
  display: grid;
  place-items: center;
  background: #010402;
}

.boot-terminal {
  width: min(620px, 84%);
  color: #6b8771;
  font-size: 10px;
}

.boot-brand {
  margin-bottom: 18px;
  color: #71ff89;
  font-size: 23px;
  text-shadow: 0 0 20px rgba(113, 255, 137, 0.45);
}

.boot-line {
  margin: 7px 0;
  opacity: 0;
  transform: translateY(4px);
  transition: opacity 0.22s ease, transform 0.22s ease;
}

.boot-line.visible {
  opacity: 1;
  transform: none;
}

.boot-progress {
  height: 2px;
  margin-top: 18px;
  overflow: hidden;
  background: #0f2815;
}

.boot-progress span {
  display: block;
  height: 100%;
  background: #71ff89;
  box-shadow: 0 0 10px #71ff89;
  transition: width 0.2s ease;
}

.boot-fade-leave-active {
  transition: opacity 0.55s ease;
}

.boot-fade-leave-to {
  opacity: 0;
}

@media (max-width: 1060px) {
  .workspace {
    grid-template-columns: 1fr;
  }

  .main-column {
    border-right: 0;
  }

  .side-column {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
    border-top: 1px solid var(--line);
  }

  .side-card {
    margin: 0;
  }
}

@media (max-width: 760px) {
  .portfolio-shell {
    width: calc(100% - 12px);
    min-height: calc(100vh - 12px);
    margin: 6px auto;
    border-radius: 14px;
  }

  .topbar {
    grid-template-columns: auto 1fr;
  }

  .host-path,
  .system-online {
    display: none;
  }

  .topbar-actions {
    justify-self: end;
  }

  .theme-trigger {
    min-width: 120px;
  }

  .main-column {
    padding: 18px;
  }

  .hero {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .hero-name {
    font-size: clamp(34px, 10vw, 52px);
  }

  .ai-visual {
    height: 240px;
  }

  .hud {
    width: 230px;
    height: 230px;
    transform: scale(0.82);
  }

  .terminal-output {
    height: 360px;
  }

  .terminal-header span:last-child {
    display: none;
  }

  .input-prefix {
    display: none;
  }

  .side-column {
    grid-template-columns: 1fr;
  }

  .footerbar {
    grid-template-columns: 1fr;
  }

  .footerbar span:nth-child(2),
  .footerbar a {
    justify-self: start;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }

  .network-canvas,
  .mouse-glow {
    display: none;
  }
}
</style>

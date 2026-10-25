import { useState } from 'react'

function Brand() {
  return (
    <span className="brand" aria-label="Movies Mod home">
      <span>COREX</span><span className="brand-play">▶</span><span className="brand-mod">MOD</span>
    </span>
  )
}

export default function Header({ onSearch, onHome }) {
  const [query, setQuery] = useState('')

  function submitSearch(event) {
    event.preventDefault()
    onSearch(query)
  }

  return (
    <header className="site-header">
      <div className="topbar">
        <button className="brand-button" onClick={onHome} aria-label="Go to home">
          <Brand />
        </button>
        <form className="search" onSubmit={submitSearch}>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="What are you looking for?"
            aria-label="Search titles"
          />
          <button type="submit" aria-label="Search">⌕</button>
        </form>
        <div className="network-links">
          <button className="network bolly">Bollywood</button>
          <button className="network anime">AnimeFlix</button>
        </div>
      </div>
      <nav className="main-nav" aria-label="Main navigation">
        {['HOME', 'MOVIES', 'LANGUAGE', 'GENRE', 'YEAR', 'OTT', 'WEB SERIES', 'TV SERIES'].map((item, index) => (
          <button key={item} onClick={onHome}>
            {item}{index > 0 && <span className="nav-caret">⌄</span>}
          </button>
        ))}
      </nav>
    </header>
  )
}

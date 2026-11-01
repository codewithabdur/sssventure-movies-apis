import { sidebarTags } from '../utils/movies.js'

export default function Sidebar({ movies = [], onSelect }) {
  return (
    <aside className="sidebar">
      <section className="side-box">
        <h3>SEARCH MOVIES</h3>
        <form className="side-search" onSubmit={(event) => event.preventDefault()}>
          <input placeholder="What are you looking for?" aria-label="Search movies" />
          <button type="submit" aria-label="Search">⌕</button>
        </form>
      </section>
      <section className="side-box">
        <h3>ADVERTISEMENT</h3>
        <div className="ad-card">
          <span className="ad-tag">FEATURED</span>
          <strong>YOUR NEXT<br />FAVORITE<br /><em>STORY</em></strong>
          <small>Discover something new</small>
          <button>EXPLORE NOW ↗</button>
        </div>
      </section>
      <section className="side-box telegram-box">
        <h3>JOIN US ON TELEGRAM</h3>
        <button className="telegram"><span>➤</span> TELEGRAM CHANNEL</button>
      </section>
      <section className="side-box">
        <h3>CATEGORIES</h3>
        <div className="tag-cloud">
          {sidebarTags.map((tag) => <button key={tag}>{tag}</button>)}
        </div>
      </section>
      <section className="side-box popular">
        <h3>POPULAR POSTS</h3>
        {movies.slice(0, 6).map((movie) => (
          <button key={movie.title} className="popular-item" onClick={() => onSelect(movie)}>
            <span className={`mini-poster art-${movie.color}`} />
            <span>Download {movie.title} ({movie.season}) Dual Audio | 480p | 720p | 1080p</span>
          </button>
        ))}
      </section>
    </aside>
  )
}

import { categories } from '../utils/movies.js'
import MovieCard from './MovieCard.jsx'

export default function Catalog({ movies, onSelect, onFilter }) {
  return (
    <>
      <div className="quick-links">
        <button className="telegram-chip">◉ JOIN TELEGRAM</button>
        {categories.map((filter) => (
          <button key={filter} onClick={() => onFilter(filter)}>{filter}</button>
        ))}
        <button className="all-movies">▣ 4K MOVIES</button>
      </div>
      <div className="notice">
        <span>We have changed our Official Domain to MoviesMod Bookmarks Now.</span>
        <button aria-label="Dismiss notice">×</button>
      </div>
      {movies.length ? (
        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.title} movie={movie} onSelect={onSelect} />
          ))}
        </div>
      ) : (
        <div className="empty-state">No titles found. Try another search.</div>
      )}
      <nav className="pagination" aria-label="Pagination">
        {[1, 2, 3, 4, 5, 6, '…', '1,084', 'Next'].map((page, index) => (
          <button key={page} className={index === 0 ? 'current' : ''}>{page}</button>
        ))}
      </nav>
    </>
  )
}

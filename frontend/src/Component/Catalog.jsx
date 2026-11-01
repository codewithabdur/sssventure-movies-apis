import { categories } from '../utils/movies.js'
import MovieCard from './MovieCard.jsx'

export default function Catalog({
  movies,
  page,
  pageCount,
  loading,
  error,
  onPageChange,
  onSelect,
  onFilter,
}) {
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
      {error ? (
        <div className="empty-state" role="alert">Could not load titles: {error}</div>
      ) : loading ? (
        <div className="loading-state">Loading titles…</div>
      ) : movies.length ? (
        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onSelect={onSelect} />
          ))}
        </div>
      ) : (
        <div className="empty-state">No titles found. Try another search.</div>
      )}
      <nav className="pagination" aria-label="Pagination">
        <button disabled={page === 0 || loading} onClick={() => onPageChange(page - 1)}>Previous</button>
        {Array.from({ length: Math.min(pageCount, 5) }, (_, index) => {
          const firstPage = Math.max(0, Math.min(page - 2, pageCount - 5))
          const pageIndex = firstPage + index
          return (
            <button
              key={pageIndex}
              className={pageIndex === page ? 'current' : ''}
              aria-current={pageIndex === page ? 'page' : undefined}
              disabled={loading}
              onClick={() => onPageChange(pageIndex)}
            >
              {pageIndex + 1}
            </button>
          )
        })}
        <button disabled={page >= pageCount - 1 || loading} onClick={() => onPageChange(page + 1)}>Next</button>
      </nav>
    </>
  )
}

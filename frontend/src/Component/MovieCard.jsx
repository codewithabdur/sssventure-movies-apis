import Poster from './Poster.jsx'

export default function MovieCard({ movie, onSelect }) {
  return (
    <button className="movie-card" onClick={() => onSelect(movie)}>
      <Poster movie={movie} />
      <span className="card-caption">
        <strong>{movie.title}</strong>
        {movie.year && <> · {movie.year}</>}
        {movie.language && <> · {movie.language}</>}
      </span>
    </button>
  )
}

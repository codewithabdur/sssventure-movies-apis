import Poster from './Poster.jsx'

export default function MovieCard({ movie, onSelect }) {
  return (
    <button className="movie-card" onClick={() => onSelect(movie)}>
      <Poster movie={movie} />
      <span className="card-caption">
        <strong>Download {movie.title}</strong> ({movie.season}) Dual Audio [Hindi-English]
        Web-DL 480p | 720p | 1080p
      </span>
    </button>
  )
}

export default function Poster({ movie }) {
  return (
    <div className={`poster-art art-${movie.color}`}>
      <div className="poster-sun" />
      <div className="poster-silhouette"><i /><b /></div>
      <div className="poster-shape poster-shape-one" />
      <div className="poster-shape poster-shape-two" />
      <div className="poster-copy">
        <span className="poster-kicker">{movie.genre.split(' · ')[0]} • {movie.year}</span>
        <strong>
          {movie.mark.split('\\n').map((line, index) => (
            <span key={`${line}-${index}`}>{line}</span>
          ))}
        </strong>
        <small>AN ORIGINAL SERIES</small>
      </div>
    </div>
  )
}

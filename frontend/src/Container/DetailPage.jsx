import MovieCard from '../Component/MovieCard.jsx'
import Poster from '../Component/Poster.jsx'
import Sidebar from '../Component/Sidebar.jsx'

export default function DetailPage({ movie, downloads, relatedMovies, onSelect, onBack }) {
  const qualityLabels = [
    movie.has480p && '480p',
    movie.has720p && '720p',
    movie.has1080p && '1080p',
  ].filter(Boolean)

  return (
    <main className="detail-layout">
      <article className="detail-content">
        <div className="breadcrumbs">◉ &nbsp; {movie.language || 'Movie'}</div>
        <h1>{movie.title}</h1>
        <div className="post-meta">
          ◷ {movie.publishedAt ? new Date(movie.publishedAt).toLocaleDateString() : 'Recently published'}
          {movie.year && <> &nbsp; · &nbsp; {movie.year}</>}
        </div>
        <div className="detail-copy">
          {movie.synopsis && <p>{movie.synopsis}</p>}
          <p><b className="green-text">MoviesMod.Org</b> is the best website platform for Bollywood and Hollywood movies. We provide free online downloads in your favorite quality. Click on the download button and follow the steps to get your favorite movies for free.</p>
        </div>
        <div className="feature-panel">
          <div className="feature-poster"><Poster movie={movie} /></div>
          <div>
            <h2>{movie.title}</h2>
            {movie.year && <p><b>Release:</b> {movie.year}</p>}
            {movie.language && <p><b>Language:</b> {movie.language}</p>}
            {qualityLabels.length > 0 && <p><b>Available quality:</b> {qualityLabels.join(', ')}</p>}
            {movie.posterLink && (
              <p>
                <a href={movie.posterLink} target="_blank" rel="noreferrer">
                  View external title page
                </a>
              </p>
            )}
          </div>
        </div>
        <section className="info-section">
          <h2>Post Info:</h2>
          <ul>
            <li><b>Full Name:</b> {movie.title}</li>
            {movie.year && <li><b>Release:</b> {movie.year}</li>}
            {movie.language && <li><b>Language:</b> {movie.language}</li>}
            {qualityLabels.length > 0 && <li><b>Quality:</b> {qualityLabels.join(' | ')}</li>}
          </ul>
        </section>
        {movie.screenshots.length > 0 && (
          <section className="screenshots">
            <h2>Screenshots:</h2>
            {movie.screenshots.map((url) => (
              <img className="detail-screenshot" src={url} alt={`${movie.title} screenshot`} loading="lazy" key={url} />
            ))}
          </section>
        )}
        {downloads.length > 0 && <p className="download-title">Available downloads for {movie.title}</p>}
        <div className="season-links">
          {downloads.map((download) => {
            const archiveBaseUrl = Number(download.EpisodeNumber) === 0
              ? 'https://links.modpro.blog'
              : 'https://episodes.modpro.blog'

            return (
              <div key={download.DownloadId}>
                <span>{download.Label || `${download.Quality} download`}</span>
                <small>{download.FileSizeText}{download.Codec && ` · ${download.Codec}`}</small>
                <div className="download-buttons">
                  {download.TargetUrl != null && String(download.TargetUrl).trim() !== '' && (
                    <a
                      className="download-button zip"
                      href={`${archiveBaseUrl}/archives/${encodeURIComponent(String(download.TargetUrl).trim())}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      ZIP
                    </a>
                  )}
                  {download.Epe_Link != null && String(download.Epe_Link).trim() !== '' && (
                    <a
                      className="download-button"
                      href={`${archiveBaseUrl}/archives/${encodeURIComponent(String(download.Epe_Link).trim())}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      File Download
                    </a>
                  )}
                </div>
              </div>
            )
          })}
        </div>
        <div className="detail-chips">
          {['JOIN TELEGRAM', 'Bollywood', 'AnimeFlix', 'Updates', '4K MOVIES'].map((tag) => <button key={tag}>{tag}</button>)}
        </div>
        <div className="download-notes">
          <p>Please Do Not Use VPN for Downloading Movies From Our Site.</p>
          <p>Click On The Above Download Button To Download File.</p>
          <p>If You Find Any Broken Link Then Report To Us.</p>
          <p>Comment Your Queries And Requests Below In The Comment Box.</p>
        </div>
        <section className="related">
          <h2>RELATED POSTS</h2>
          <div>
            {relatedMovies.map((relatedMovie) => (
              <MovieCard key={relatedMovie.id} movie={relatedMovie} onSelect={onSelect} />
            ))}
          </div>
        </section>
        <section className="comment-form">
          <h2>ADD COMMENT</h2>
          <form onSubmit={(event) => event.preventDefault()}>
            <textarea placeholder="Comment Text*" aria-label="Comment text" />
            <input placeholder="Name*" aria-label="Name" />
            <input placeholder="Email*" aria-label="Email" />
            <label><input type="checkbox" /> Save my name, email, and website in this browser for the next time I comment.</label>
            <button>SUBMIT COMMENT</button>
          </form>
        </section>
        <button className="back-button" onClick={onBack}>← Back to all titles</button>
      </article>
      <Sidebar movies={relatedMovies} onSelect={onSelect} />
    </main>
  )
}

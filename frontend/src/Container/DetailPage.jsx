import MovieCard from '../Component/MovieCard.jsx'
import Poster from '../Component/Poster.jsx'
import Sidebar from '../Component/Sidebar.jsx'
import { movies } from '../utils/movies.js'

export default function DetailPage({ movie, onSelect, onBack }) {
  return (
    <main className="detail-layout">
      <article className="detail-content">
        <div className="breadcrumbs">◉ &nbsp; {movie.genre}, Drama Series, English, Hindi, Latest Released, Netflix, Popular Series</div>
        <h1>Download {movie.title} ({movie.year}) Multi Audio [Hindi-English] Spanish) Web-DL 480p | 720p | 1080p</h1>
        <div className="post-meta">◷ 2 Days Ago &nbsp; · &nbsp; ♡ No Comments</div>
        <div className="detail-copy">
          <p>✅ Download {movie.title} Season 1 2026 All Episodes (Hindi-English-Spanish) and watch online in high quality. Get all episodes in multiple formats with subtitles. Stream and download your favorite series in HD quality.</p>
          <p><b className="green-text">MoviesMod.Org</b> is the best website platform for Bollywood and Hollywood movies. We provide free online downloads in your favorite quality. Click on the download button and follow the steps to get your favorite movies for free.</p>
        </div>
        <div className="feature-panel">
          <div className={`feature-poster art-${movie.color}`}><Poster movie={movie} /></div>
          <div>
            <h2>{movie.title} <small>({movie.year})</small></h2>
            <p>⭐ Rating: <b>{movie.rating} / 10</b></p>
            <p>A gripping story with a cast of unforgettable characters, a richly imagined world, and a mystery that will keep you watching until the very end.</p>
            <p><b>Actors:</b> Jo Dev, Anika Belle, David Tennent</p>
          </div>
        </div>
        <section className="info-section">
          <h2>Series Info:</h2>
          <ul>
            <li><b>Full Name:</b> {movie.title}</li>
            <li><b>Season:</b> 1</li>
            <li><b>Episodes:</b> 08 Episodes</li>
            <li><b>Language:</b> Dual Audio (Hindi-English)</li>
            <li><b>Subtitles:</b> Yes (English)</li>
            <li><b>Release Year:</b> {movie.year}</li>
            <li><b>Size:</b> 480p | 720p | 1080p</li>
            <li><b>Quality:</b> 480p 720p 1080p</li>
            <li><b>Format:</b> Mkv</li>
          </ul>
        </section>
        <section className="info-section">
          <h2>Storyline:</h2>
          <p>Don’t miss this exciting new series, where every decision changes what comes next. A story of family, ambition, and unexpected twists brings the characters together in a world full of possibility.</p>
        </section>
        <section className="screenshots">
          <h2>Screenshots:</h2>
          {[0, 1, 2, 3].map((item) => (
            <div className={`story-frame story-frame-${item + 1}`} key={item}><span>{movie.title}</span></div>
          ))}
        </section>
        <p className="download-title">Download {movie.title} (S01 Hindi Dubbed 480p, 720p &amp; 1080p)</p>
        <div className="season-links">
          {['Season 1 [Hindi-English-Spanish] 480p', 'Season 1 [Hindi-English-Spanish] 720p', 'Season 1 [Hindi-English-Spanish] 720p x265', 'Season 1 [Hindi-English-Spanish] 1080p'].map((quality) => (
            <div key={quality}>
              <span>{quality} Movies [10GB]</span>
              <div><button>Episode Links</button><button className="zip">Batch/Zip File</button></div>
            </div>
          ))}
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
            {movies.slice(8, 12).map((relatedMovie) => (
              <MovieCard key={relatedMovie.title} movie={relatedMovie} onSelect={onSelect} />
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
      <Sidebar onSelect={onSelect} />
    </main>
  )
}

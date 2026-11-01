import { useState } from "react";
import MovieCard from "../Component/MovieCard.jsx";
import Poster from "../Component/Poster.jsx";
import Sidebar from "../Component/Sidebar.jsx";

function getDownloadExtraUrl(download, targetId) {
  const extraUrl = String(download.ExtraUrl ?? "").trim();
  const id = String(targetId ?? "").trim();
  if (!extraUrl || !id) return "";

  const url = new URL(extraUrl, window.location.origin);
  url.pathname = `${url.pathname.replace(/\/+$/, "")}/${encodeURIComponent(id)}`;
  return url.href;
}

export default function DetailPage({
  movie,
  downloads,
  relatedMovies,
  onSelect,
  onBack,
}) {
  const qualityLabels = [
    movie.has480p && "480p",
    movie.has720p && "720p",
    movie.has1080p && "1080p",
  ].filter(Boolean);

const [form, setForm] = useState({
    Name: "",
    Email: "",
    Comment: "",
  });

const [error, setError] = useState(null);
const [success, setSuccess] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const url = `${import.meta.env.VITE_API_ENDPOINT}/api/comments/add`
      const payload = {
        Name: form.Name,
        Email: form.Email,
        Comment: form.Comment,
      }
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if(!response.ok) {
        throw new Error("Failed to submit comment");
      }else{
        setForm({
          Name: "",
          Email: "",
          Comment: "",
        });
        setSuccess("Comment submitted successfully!");
        setError(null);

        setTimeout(() => {
          setSuccess(null);
        }, 5000); // Clear success message after 5 seconds
      }
    } catch (error) {
      setError("Failed to submit comment.");
      setSuccess(null);
      setTimeout(() => {
          setError(null);
        }, 5000); // Clear success message after 5 seconds
    }
  }

  return (
    <main className="detail-layout">
      <article className="detail-content">
        <header className="post-heading">
          <h1>
            Download {movie.title}
            {movie.year && ` (${movie.year})`}
          </h1>
          <div className="post-meta">
            {movie.language || "Movie"}
            {movie.publishedAt && (
              <>
                {" "}
                &nbsp; | &nbsp;{" "}
                {new Date(movie.publishedAt).toLocaleDateString()}
              </>
            )}
          </div>
        </header>
        <div className="feature-panel">
          <div className="feature-poster">
            <Poster movie={movie} />
          </div>
          <div className="feature-details">
            <h1>
              {movie.title}
              {movie.year && <small> ({movie.year})</small>}
            </h1>
            <div className="feature-meta">
              {movie.language && <span>{movie.language}</span>}
              {movie.publishedAt && (
                <span>
                  Published {new Date(movie.publishedAt).toLocaleDateString()}
                </span>
              )}
            </div>
            {movie.synopsis && (
              <p className="feature-synopsis">{movie.synopsis}</p>
            )}
            {qualityLabels.length > 0 && (
              <p>
                <b>Available quality:</b> {qualityLabels.join(" · ")}
              </p>
            )}
            {movie.posterLink && (
              <p className="feature-link">
                <a href={movie.posterLink} target="_blank" rel="noreferrer">
                  Go to IMDB →
                </a>
              </p>
            )}
          </div>
        </div>
        <section className="info-section">
          <h2>Movie Info:</h2>
          <ul>
            <li>
              <b>Full Name:</b> {movie.title}
            </li>
            {movie.language && (
              <li>
                <b>Language:</b> {movie.language}
              </li>
            )}
            {movie.year && (
              <li>
                <b>Release Year:</b> {movie.year}
              </li>
            )}
            {qualityLabels.length > 0 && (
              <li>
                <b>Quality:</b> {qualityLabels.join(" | ")}
              </li>
            )}
          </ul>
        </section>
        {movie.screenshots.length > 0 && (
          <section className="screenshots">
            <h2>Screenshots:</h2>
            {movie.screenshots.map((url) => (
              <img
                className="detail-screenshot"
                src={url}
                alt={`${movie.title} screenshot`}
                loading="lazy"
                key={url}
              />
            ))}
          </section>
        )}
        {downloads.length > 0 && (
          <p className="download-title">
            Available downloads for {movie.title}
          </p>
        )}
        <div className="season-links">
          {downloads.map((download) => {
            const archiveBaseUrl =
                Number(download.EpisodeNumber) === 0
                  ? "https://links.modpro.blog"
                  : "https://episodes.modpro.blog";
            const zipUrl =
                `${archiveBaseUrl}/archives/${encodeURIComponent(String(download.TargetUrl ?? "").trim())}`;
            const fileUrl =
                `${archiveBaseUrl}/archives/${encodeURIComponent(String(download.Epe_Link ?? "").trim())}`;

            return (
                <div key={download.DownloadId}>
                  <span>{download.Label || `${download.Quality} download`}</span>
                  <small>
                    {download.FileSizeText}
                    {download.Codec && ` · ${download.Codec}`}
                  </small>
                  <div className="download-buttons">
                    {download.TargetUrl != null &&
                      String(download.TargetUrl).trim() !== "" && (
                        <a
                          className="download-button zip"
                          href={getDownloadExtraUrl(download, download.TargetUrl) || zipUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Batch/ZIP
                        </a>
                      )}
                    {download.Epe_Link != null &&
                      String(download.Epe_Link).trim() !== "" && (
                        <a
                          className="download-button"
                          href={getDownloadExtraUrl(download, download.Epe_Link) || fileUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          File Download
                        </a>
                      )}
                  </div>
                </div>
            );
          })}
        </div>
        <div className="detail-chips">
          {[
            "JOIN TELEGRAM",
            "Bollywood",
            "AnimeFlix",
            "Updates",
            "4K MOVIES",
          ].map((tag) => (
            <button key={tag}>{tag}</button>
          ))}
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
              <MovieCard
                key={relatedMovie.id}
                movie={relatedMovie}
                onSelect={onSelect}
              />
            ))}
          </div>
        </section>
        <section className="comment-form">
          <h2>ADD COMMENT</h2>
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
          <form onSubmit={(event) => event.preventDefault()}>
            <input
              placeholder="Name*"
              aria-label="Name"
              value={form.Name}
              onChange={(e) => setForm({ ...form, Name: e.target.value })}
            />
            <input
              placeholder="Email*"
              aria-label="Email"
              value={form.Email}
              onChange={(e) => setForm({ ...form, Email: e.target.value })}
            />
            <textarea
              placeholder="Comment Text*"
              aria-label="Comment text"
              value={form.Comment}
              onChange={(e) => setForm({ ...form, Comment: e.target.value })}
            />
            <button onClick={handleSubmit}>SUBMIT COMMENT</button>
          </form>
        </section>
        <button className="back-button" onClick={onBack}>
          ← Back to all titles
        </button>
      </article>
      <Sidebar movies={relatedMovies} onSelect={onSelect} />
    </main>
  );
}

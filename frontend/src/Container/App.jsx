import { useMemo, useState } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import Catalog from "../Component/Catalog.jsx";
import Footer from "../Component/Footer.jsx";
import Header from "../Component/Header.jsx";
import {
  createMovieSlug,
  filterMovies,
  findMovieBySlug,
} from "../utils/catalog.js";
import { movies } from "../utils/movies.js";
import DetailPage from "./DetailPage.jsx";

function MovieRoute({ onSelect, onBack }) {
  const { slug, id } = useParams();
  const movie = findMovieBySlug(movies, slug, id);

  if (!movie) {
    return (
      <main className="not-found">
        <h1>Title not found</h1>
        <p>The movie in this URL could not be found.</p>
        <button className="back-button" onClick={onBack}>
          ← Back to all titles
        </button>
      </main>
    );
  }

  return <DetailPage movie={movie} onSelect={onSelect} onBack={onBack} />;
}

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("");
  const navigate = useNavigate();
  const visibleMovies = useMemo(
    () => filterMovies(movies, searchTerm, activeFilter),
    [searchTerm, activeFilter],
  );

  function returnHome() {
    navigate("/");
    setActiveFilter("");
    setSearchTerm("");
  }

  function selectMovie(movie) {
    navigate(`/movie/${createMovieSlug(movie.title)}/${movie.id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="page-shell">
      <Header onSearch={setSearchTerm} onHome={returnHome} />
      <Routes>
        <Route
          path="/"
          element={
            <main className="catalog">
              <Catalog
                movies={visibleMovies}
                onSelect={selectMovie}
                onFilter={setActiveFilter}
              />
            </main>
          }
        />
        <Route
          path="/movie/:slug/:id"
          element={<MovieRoute onSelect={selectMovie} onBack={returnHome} />}
        />
        <Route
          path="*"
          element={<MovieRoute onSelect={selectMovie} onBack={returnHome} />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

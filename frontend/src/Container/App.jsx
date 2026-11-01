import { useEffect, useMemo, useState } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import Catalog from "../Component/Catalog.jsx";
import Footer from "../Component/Footer.jsx";
import Header from "../Component/Header.jsx";
import {
  createMovieSlug,
  filterMovies,
} from "../utils/catalog.js";
import { fetchPostDetails, fetchPosts, searchPosts } from "../utils/posts.js";
import DetailPage from "./DetailPage.jsx";

function MovieRoute({ movies, onSelect, onBack }) {
  const { slug, id } = useParams();
  const [detailResponse, setDetailResponse] = useState(null);
  const [detailError, setDetailError] = useState(null);

  useEffect(() => {
    let active = true;

    fetchPostDetails(slug, id)
      .then((result) => {
        if (active) setDetailResponse({ slug, id, result });
      })
      .catch((requestError) => {
        if (active) setDetailError({ slug, id, message: requestError.message });
      });

    return () => {
      active = false;
    };
  }, [slug, id]);

  const currentDetail = detailResponse?.slug === slug && detailResponse?.id === id
    ? detailResponse.result
    : null;
  const currentError = detailError?.slug === slug && detailError?.id === id
    ? detailError.message
    : "";

  if (currentError) {
    return (
      <main className="not-found">
        <h1>Unable to load title</h1>
        <p>{currentError}</p>
        <button className="back-button" onClick={onBack}>
          ← Back to all titles
        </button>
      </main>
    );
  }

  if (!currentDetail) {
    return <main className="loading-state">Loading title…</main>;
  }

  return (
    <DetailPage
      movie={currentDetail.post}
      downloads={currentDetail.downloads}
      relatedMovies={movies.filter((movie) => movie.id !== currentDetail.post.id).slice(0, 4)}
      onSelect={onSelect}
      onBack={onBack}
    />
  );
}

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize] = useState(10);
  const [catalogResponse, setCatalogResponse] = useState({
    page: -1,
    searchTerm: "",
    movies: [],
    totalPosts: 0,
    error: "",
  });
  const navigate = useNavigate();
  const movies = catalogResponse.movies;
  const loading = catalogResponse.page !== page || catalogResponse.searchTerm !== searchTerm;
  const error = loading ? "" : catalogResponse.error;

  useEffect(() => {
    let active = true;

    const request = searchTerm
      ? searchPosts(searchTerm).then((posts) => ({ posts, totalPosts: posts.length }))
      : fetchPosts(page, pageSize);

    request
      .then((result) => {
        if (active) {
          setCatalogResponse({
            page,
            searchTerm,
            movies: result.posts,
            totalPosts: result.totalPosts,
            error: "",
          });
        }
      })
      .catch((requestError) => {
        if (active) {
          setCatalogResponse({
            page,
            searchTerm,
            movies: [],
            totalPosts: 0,
            error: requestError.message,
          });
        }
      });

    return () => {
      active = false;
    };
  }, [page, pageSize, searchTerm]);

  const visibleMovies = useMemo(
    () => filterMovies(movies, "", activeFilter),
    [movies, activeFilter],
  );

  function returnHome() {
    navigate("/");
    setActiveFilter("");
    setSearchTerm("");
    setPage(0);
  }

  function submitSearch(query) {
    navigate("/");
    setActiveFilter("");
    setPage(0);
    setSearchTerm(query.trim());
  }

  function selectMovie(movie) {
    navigate(`/movie/${movie.slug || createMovieSlug(movie.title)}/${movie.id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="page-shell">
      <Header onSearch={submitSearch} onHome={returnHome} />
      <Routes>
        <Route
          path="/"
          element={
            <main className="catalog">
              <Catalog
                movies={visibleMovies}
                page={page}
                pageCount={Math.max(1, Math.ceil(catalogResponse.totalPosts / pageSize))}
                loading={loading}
                error={error}
                onPageChange={setPage}
                onSelect={selectMovie}
                onFilter={setActiveFilter}
              />
            </main>
          }
        />
        <Route
          path="/movie/:slug/:id"
          element={
            <MovieRoute
              movies={movies}
              onSelect={selectMovie}
              onBack={returnHome}
            />
          }
        />
        <Route
          path="*"
          element={
            <MovieRoute
              movies={movies}
              onSelect={selectMovie}
              onBack={returnHome}
            />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

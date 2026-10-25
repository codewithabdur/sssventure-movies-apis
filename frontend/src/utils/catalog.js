export function filterMovies(movies, searchTerm, activeFilter) {
  const normalizedSearch = searchTerm.trim().toLowerCase()

  return movies.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(normalizedSearch)
    const matchesFilter = !activeFilter ||
      activeFilter !== 'Anime' ||
      movie.genre.startsWith('Anime')

    return matchesSearch && matchesFilter
  })
}

export function createMovieSlug(title) {
  return title
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function findMovieBySlug(movies, slug) {
  return movies.find((movie) => createMovieSlug(movie.title) === slug)
}

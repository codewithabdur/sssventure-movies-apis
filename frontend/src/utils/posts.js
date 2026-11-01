const postsApiUrl = `${import.meta.env.VITE_API_ENDPOINT}/api/posts`

async function postJson(path, payload) {
  const response = await fetch(`${postsApiUrl}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const body = await response.json().catch(() => null)
    throw new Error(body?.message || `Request failed with status ${response.status}`)
  }

  return response.json()
}

export async function fetchPosts(page, pageSize) {
  const recordsets = await postJson('/fecth', { page, pageSize })
  const posts = Array.isArray(recordsets?.[0]) ? recordsets[0] : []
  const totalPosts = Number(recordsets?.[1]?.[0]?.TotalPosts ?? posts.length)

  return { posts: posts.map(mapPost), totalPosts }
}

export async function searchPosts(search) {
  const posts = await postJson('/fetch/search', { search })

  if (!Array.isArray(posts)) {
    throw new Error('Search returned an unexpected response')
  }

  return posts.map(mapPost)
}

export async function fetchPostDetails(slug, postId) {
  const recordsets = await postJson('/fecth/slug', { slug, postId: Number(postId) })
  const post = recordsets?.[0]?.[0]

  if (!post) {
    throw new Error('Post not found')
  }

  return {
    post: mapPost(post),
    downloads: Array.isArray(recordsets?.[1]) ? recordsets[1] : [],
  }
}

function mapPost(post) {
  return {
    id: String(post.PostId),
    slug: post.Slug,
    title: post.Title,
    year: post.ReleaseYear || '',
    genre: post.LanguageInfo || 'Movie',
    language: post.LanguageInfo || '',
    posterUrl: post.PosterUrl || '',
    posterLink: post.PosterLink || post.PosterRedirectUrl || '',
    synopsis: post.Synopsis || '',
    publishedAt: post.PublishedAt || '',
    screenshots: post.ScreenshotUrls
      ? post.ScreenshotUrls.split(/\r?\n/).filter(Boolean)
      : [],
    has480p: Boolean(post.Has480p),
    has720p: Boolean(post.Has720p),
    has1080p: Boolean(post.Has1080p),
  }
}

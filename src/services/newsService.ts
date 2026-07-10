export async function createNews(data: FormData) {
  const token = localStorage.getItem('abg_admin_token')

  const response = await fetch(
    'http://localhost/abg-api/api/news/create.php',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    }
  )

  return response.json()
}

export async function getNews() {
  const response = await fetch(
    'http://localhost/abg-api/api/news/list.php'
  )

  return response.json()
}

export async function getSingleNews(slug: string) {
  const response = await fetch(
    `http://localhost/abg-api/api/news/single.php?slug=${slug}`
  )

  return response.json()
}

export async function deleteNews(id: number) {
  const token = localStorage.getItem('abg_admin_token')
  const formData = new FormData()
  formData.append('id', String(id))

  const response = await fetch(
    'http://localhost/abg-api/api/news/delete.php',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  )

  return response.json()
}

export async function updateNews(data: FormData) {
  const token = localStorage.getItem('abg_admin_token')

  const response = await fetch(
    'http://localhost/abg-api/api/news/update.php',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    }
  )

  return response.json()
}
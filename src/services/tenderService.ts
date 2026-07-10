export async function createTender(data: FormData) {
  const token = localStorage.getItem('abg_admin_token')

  const response = await fetch(
    'http://localhost/abg-api/api/tenders/create.php',
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

export async function getTenders() {
  const response = await fetch(
    'http://localhost/abg-api/api/tenders/list.php'
  )

  return response.json()
}

export async function deleteTender(id: number) {
  const token = localStorage.getItem('abg_admin_token')
  const formData = new FormData()
  formData.append('id', String(id))

  const response = await fetch(
    'http://localhost/abg-api/api/tenders/delete.php',
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

export async function updateTender(data: FormData) {
  const token = localStorage.getItem('abg_admin_token')

  const response = await fetch(
    'http://localhost/abg-api/api/tenders/update.php',
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
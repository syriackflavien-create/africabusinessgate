export async function getAdminClients() {
  const token = localStorage.getItem('abg_admin_token')

  const response = await fetch(
    'http://localhost/abg-api/api/admin/clients-list.php',
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return response.json()
}

export async function uploadClientDocument(data: FormData) {
  const token = localStorage.getItem('abg_admin_token')

  const response = await fetch(
    'http://localhost/abg-api/api/admin/upload-client-document.php',
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

export async function getAdminDocuments() {
  const token = localStorage.getItem('abg_admin_token')

  const response = await fetch(
    'http://localhost/abg-api/api/admin/documents-list.php',
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return response.json()
}

export async function deleteClientDocument(id: number) {
  const token = localStorage.getItem('abg_admin_token')

  const formData = new FormData()
  formData.append('id', String(id))

  const response = await fetch(
    'http://localhost/abg-api/api/admin/delete-client-document.php',
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

export async function updateClientDocument(data: FormData) {
  const token = localStorage.getItem('abg_admin_token')

  const response = await fetch(
    'http://localhost/abg-api/api/admin/update-client-document.php',
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
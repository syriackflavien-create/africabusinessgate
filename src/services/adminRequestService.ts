const API = 'http://localhost/abg-api/api/admin'

export async function getAdminRequests() {
  const token = localStorage.getItem('abg_admin_token')

  const response = await fetch(`${API}/requests.php`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.json()
}

export async function updateRequestStatus(id: number, status: string) {
  const token = localStorage.getItem('abg_admin_token')

  const formData = new FormData()
  formData.append('id', String(id))
  formData.append('status', status)

  const response = await fetch(`${API}/update-request-status.php`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })

  return response.json()
}
const API = 'http://localhost/abg-api/api/clients'

export async function createClientRequest(data: FormData) {
  const token = localStorage.getItem('abg_client_token')

  const response = await fetch(
    `${API}/create-request.php`,
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

export async function getClientRequests() {
  const token = localStorage.getItem('abg_client_token')

  const response = await fetch(
    `${API}/requests.php`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return response.json()
}

export async function getClientActiveRequestsCount() {
  const token = localStorage.getItem('abg_client_token')

  const response = await fetch(
    'http://localhost/abg-api/api/clients/requests-count.php',
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return response.json()
}
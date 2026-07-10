export async function getClientDocuments() {
  const token = localStorage.getItem('abg_client_token')

  const response = await fetch(
    'http://localhost/abg-api/api/clients/documents.php',
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return response.json()
}
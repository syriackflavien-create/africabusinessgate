export async function getContactRequests() {
  const token = localStorage.getItem('abg_admin_token')

  const response = await fetch(
    'http://localhost/abg-api/api/contacts/list.php',
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return response.json()
}
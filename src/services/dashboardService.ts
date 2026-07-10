export async function getDashboardStats() {
  const token = localStorage.getItem('abg_admin_token')

  const response = await fetch(
    'http://localhost/abg-api/api/dashboard/stats.php',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return response.json()
}
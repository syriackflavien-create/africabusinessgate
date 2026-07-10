export async function adminLogin(data: FormData) {
  const response = await fetch(
    'http://localhost/abg-api/api/auth/login.php',
    {
      method: 'POST',
      body: data,
    }
  )

  return response.json()
}
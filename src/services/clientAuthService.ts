export async function registerClient(data: FormData) {
  const response = await fetch(
    'http://localhost/abg-api/api/clients/register.php',
    {
      method: 'POST',
      body: data,
    }
  )

  return response.json()
}

export async function loginClient(data: FormData) {
  const response = await fetch(
    'http://localhost/abg-api/api/clients/login.php',
    {
      method: 'POST',
      body: data,
    }
  )

  return response.json()
}
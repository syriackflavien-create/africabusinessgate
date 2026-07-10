/* export async function sendContact(data: FormData) {
  try {
    const res = await fetch(
      "http://localhost/abg-api/api/contact.php",
      {
        method: "POST",
        body: data,
      }
    )

    return await res.json()

  } catch (error) {
    console.error("Contact API Error:", error)

    return {
      status: "error",
      message: "Erreur serveur"
    }
  }
}
*/
export async function sendContact(data: FormData) {
  const response = await fetch(
    'http://localhost/abg-api/api/contact.php',
    {
      method: 'POST',
      body: data,
    }
  )

  return response.json()
}
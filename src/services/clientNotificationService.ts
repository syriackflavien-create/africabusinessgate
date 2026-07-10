export async function getClientNotifications() {
  const token = localStorage.getItem('abg_client_token')

  const response = await fetch(
    'http://localhost/abg-api/api/clients/notifications.php',
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return response.json()
}

export async function markNotificationAsRead(id: number) {
  const token = localStorage.getItem('abg_client_token')

  const formData = new FormData()
  formData.append('id', String(id))

  const response = await fetch(
    'http://localhost/abg-api/api/clients/notification-read.php',
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

export async function markAllNotificationsAsRead() {
  const token = localStorage.getItem('abg_client_token')

  const response = await fetch(
    'http://localhost/abg-api/api/clients/notifications-read-all.php',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return response.json()
}
const API = 'http://localhost/abg-api/api'

export async function getRequestReplies(
  requestId: number,
  tokenType: 'client' | 'admin'
) {
  const token =
    tokenType === 'client'
      ? localStorage.getItem('abg_client_token')
      : localStorage.getItem('abg_admin_token')

  const response = await fetch(
    `${API}/requests/replies.php?request_id=${requestId}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return response.json()
}

export async function replyToRequest(data: FormData) {
  const token = localStorage.getItem('abg_admin_token')

  const response = await fetch(`${API}/admin/reply-request.php`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
  })

  return response.json()
}

export async function clientReplyToRequest(data: FormData) {
  const token = localStorage.getItem('abg_client_token')

  const response = await fetch(`${API}/clients/reply-request.php`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
  })

  return response.json()
}

export async function markRepliesAsRead(
  requestId: number,
  tokenType: 'client' | 'admin'
) {
  const token =
    tokenType === 'client'
      ? localStorage.getItem('abg_client_token')
      : localStorage.getItem('abg_admin_token')

  const formData = new FormData()
  formData.append('request_id', String(requestId))

  const response = await fetch(
    'http://localhost/abg-api/api/requests/mark-reply-read.php',
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

export async function getUnreadRepliesCount(tokenType: 'client' | 'admin') {
  const token =
    tokenType === 'client'
      ? localStorage.getItem('abg_client_token')
      : localStorage.getItem('abg_admin_token')

  const response = await fetch(
    'http://localhost/abg-api/api/requests/unread-count.php',
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return response.json()
}
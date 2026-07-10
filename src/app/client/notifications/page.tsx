'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import {
  ArrowLeft,
  Bell,
  Calendar,
  FileText,
  CheckCircle,
} from 'lucide-react'

import {
  getClientNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from '../../../services/clientNotificationService'

type Notification = {
  id: number
  title: string
  message: string
  type: string
  status: string
  created_at: string
}

export default function ClientNotificationsPage() {
  const router = useRouter()

  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('abg_client_token')

    if (!token) {
      router.push('/client/login')
      return
    }

    loadNotifications()
  }, [router])

  async function loadNotifications() {
    setLoading(true)

    const res = await getClientNotifications()

    if (res.success) {
      setNotifications(res.data)
    }

    setLoading(false)
  }

  async function handleRead(id: number) {
    const res = await markNotificationAsRead(id)

    if (res.success) {
      loadNotifications()
    } else {
      alert(res.message || 'Erreur')
    }
  }

  async function handleReadAll() {
    const res = await markAllNotificationsAsRead()

    if (res.success) {
      loadNotifications()
    } else {
      alert(res.message || 'Erreur')
    }
  }

  const unreadCount = notifications.filter(
    (notification) => notification.status === 'unread'
  ).length

  return (
    <main className="min-h-screen bg-[#F3F6FA] p-8">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/client/dashboard"
          className="inline-flex items-center gap-2 font-bold text-[#071739] mb-8"
        >
          <ArrowLeft size={20} />
          Retour Dashboard
        </Link>

        <div className="bg-[#071739] rounded-[35px] p-10 text-white mb-10">
          <p className="uppercase tracking-[4px] text-[#D4A63D] font-bold">
            Centre de notifications
          </p>

          <h1 className="text-5xl font-extrabold mt-4">
            Mes notifications
          </h1>

          <p className="text-gray-300 mt-4">
            Retrouvez ici toutes les informations envoyées par AFRICA BUSINESS GATE.
          </p>
        </div>

        {!loading && notifications.length > 0 && (
          <div className="flex justify-between items-center mb-8">
            <p className="text-[#071739] font-bold">
              {unreadCount} notification(s) non lue(s)
            </p>

            {unreadCount > 0 && (
              <button
                onClick={handleReadAll}
                className="bg-[#071739] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#0b255c]"
              >
                Tout marquer comme lu
              </button>
            )}
          </div>
        )}

        {loading && (
          <div className="bg-white rounded-[30px] p-10">
            Chargement...
          </div>
        )}

        {!loading && notifications.length === 0 && (
          <div className="bg-white rounded-[30px] p-10 text-gray-500">
            Aucune notification disponible.
          </div>
        )}

        <div className="space-y-6">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="bg-white rounded-[30px] shadow-sm border border-gray-100 p-8"
            >
              <div className="flex gap-5">
                <div className="w-16 h-16 rounded-2xl bg-[#071739] text-[#D4A63D] flex items-center justify-center">
                  {notification.status === 'unread' ? (
                    <Bell />
                  ) : (
                    <CheckCircle />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex justify-between gap-4">
                    <h2 className="text-2xl font-bold text-[#071739]">
                      {notification.title}
                    </h2>

                    {notification.status === 'unread' ? (
                      <span className="bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-bold h-fit">
                        Nouveau
                      </span>
                    ) : (
                      <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold h-fit">
                        Lu
                      </span>
                    )}
                  </div>

                  <p className="mt-4 text-gray-600 leading-8">
                    {notification.message}
                  </p>

                  {notification.status === 'unread' && (
                    <button
                      onClick={() => handleRead(notification.id)}
                      className="mt-5 bg-[#D4A63D] text-[#071739] px-5 py-2 rounded-xl font-bold"
                    >
                      Marquer comme lu
                    </button>
                  )}

                  <div className="flex gap-6 mt-6 text-gray-500">
                    <span className="flex items-center gap-2">
                      <Calendar size={17} />
                      {notification.created_at}
                    </span>

                    <span className="flex items-center gap-2">
                      <FileText size={17} />
                      {notification.type}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
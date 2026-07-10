'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import {
  LayoutDashboard,
  FileText,
  User,
  Bell,
  LogOut,
  FolderOpen,
  MessageSquare,
  ShieldCheck,
} from 'lucide-react'

import { getClientDocuments } from '../../../services/clientDocumentService'
import { getClientNotifications } from '../../../services/clientNotificationService'
import { getUnreadRepliesCount } from '../../../services/requestReplyService'
import { getClientActiveRequestsCount } from '../../../services/clientRequestService'

type Client = {
  id: number
  fullname: string
  email: string
  phone?: string
  company?: string
  role: string
}

export default function ClientDashboardPage() {
  const router = useRouter()

  const [client, setClient] = useState<Client | null>(null)
  const [documentsCount, setDocumentsCount] = useState(0)
  const [notificationsCount, setNotificationsCount] = useState(0)
  const [unreadRepliesCount, setUnreadRepliesCount] = useState(0)
  const [activeRequestsCount, setActiveRequestsCount] = useState(0)

  useEffect(() => {
    const token = localStorage.getItem('abg_client_token')
    const clientData = localStorage.getItem('abg_client')

    if (!token) {
      router.push('/client/login')
      return
    }

    if (clientData) {
      setClient(JSON.parse(clientData))
    }

    getClientDocuments().then((res) => {
      if (res.success && Array.isArray(res.data)) {
        setDocumentsCount(res.data.length)
      }
    })

    getClientNotifications().then((res) => {
      if (res.success && Array.isArray(res.data)) {
        const unread = res.data.filter((item: any) => item.status === 'unread')
        setNotificationsCount(unread.length)
      }
    })

    getUnreadRepliesCount('client').then((res) => {
      if (res.success) {
        setUnreadRepliesCount(res.total)
      }
    })

    getClientActiveRequestsCount().then((res) => {
      if (res.success) {
        setActiveRequestsCount(res.total)
      }
    })
  }, [router])

  const cards = [
    {
      title: 'Documents',
      value: documentsCount,
      icon: FolderOpen,
      text: 'Documents disponibles',
    },
    {
      title: 'Demandes',
      value: activeRequestsCount,
      icon: FileText,
      text: 'Demandes actives',
    },
    {
      title: 'Messages',
      value: unreadRepliesCount,
      icon: MessageSquare,
      text: 'Réponses non lues',
    },
    {
      title: 'Notifications',
      value: notificationsCount,
      icon: Bell,
      text: 'Notifications non lues',
    },
  ]

  function logout() {
    localStorage.removeItem('abg_client_token')
    localStorage.removeItem('abg_client')
    router.push('/client/login')
  }

  return (
    <main className="min-h-screen bg-[#F3F6FA] flex">
      <aside className="w-[290px] bg-[#071739] text-white min-h-screen p-6 hidden lg:flex flex-col">
        <div className="mb-12">
          <h1 className="text-2xl font-extrabold leading-tight">
            AFRICA BUSINESS
          </h1>
          <p className="text-[#D4A63D] font-bold">
            GATE – CLIENT
          </p>
        </div>

        <nav className="space-y-3 flex-1">
          <Link
            href="/client/dashboard"
            className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl bg-[#D4A63D] text-[#071739] font-bold"
          >
            <LayoutDashboard size={22} />
            Dashboard
          </Link>

          <Link
            href="/client/documents"
            className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-gray-300 hover:bg-white/10 hover:text-white transition"
          >
            <FolderOpen size={22} />
            Mes documents
          </Link>

          <Link
            href="/client/notifications"
            className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-gray-300 hover:bg-white/10 hover:text-white transition"
          >
            <Bell size={22} />
            Notifications
          </Link>

          <Link
            href="/client/requests"
            className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-gray-300 hover:bg-white/10 hover:text-white transition"
          >
            <FileText size={22} />
            Mes demandes
          </Link>

          <button className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-gray-300 hover:bg-white/10 hover:text-white transition">
            <User size={22} />
            Mon profil
          </button>
        </nav>

        <button
          onClick={logout}
          className="flex items-center gap-4 px-5 py-4 rounded-2xl text-gray-300 hover:bg-red-500/20 hover:text-red-300 transition"
        >
          <LogOut size={22} />
          Déconnexion
        </button>
      </aside>

      <section className="flex-1">
        <header className="bg-white border-b border-gray-100 px-8 py-5 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-[#071739]">
              Espace Client
            </h2>
            <p className="text-gray-500 mt-1">
              Bienvenue, {client?.fullname || 'Client'}
            </p>
          </div>

          <div className="flex items-center gap-5">
            <div className="relative">
              <button className="w-12 h-12 rounded-full bg-[#F3F6FA] flex items-center justify-center text-[#071739]">
                <Bell size={22} />
              </button>

              {notificationsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold">
                  {notificationsCount}
                </span>
              )}
            </div>

            <div className="hidden md:block text-right">
              <p className="font-bold text-[#071739]">
                {client?.fullname || 'Client'}
              </p>
              <p className="text-sm text-gray-500">
                {client?.email}
              </p>
            </div>

            <div className="w-12 h-12 rounded-full bg-[#071739] text-[#D4A63D] flex items-center justify-center font-bold">
              CL
            </div>
          </div>
        </header>

        <div className="p-8">
          <div className="relative overflow-hidden rounded-[35px] bg-[#071739] p-10 mb-10 text-white">
            <div className="absolute right-0 top-0 w-80 h-80 bg-[#D4A63D]/20 rounded-full blur-3xl" />

            <div className="relative z-10">
              <p className="uppercase tracking-[4px] text-[#D4A63D] font-bold">
                Portail sécurisé
              </p>

              <h1 className="text-4xl md:text-5xl font-extrabold mt-4">
                Bienvenue dans votre espace client
              </h1>

              <p className="text-gray-300 mt-4 max-w-3xl leading-8">
                Retrouvez vos documents, demandes, notifications et informations de suivi
                dans un espace confidentiel et sécurisé.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
            {cards.map((card, index) => {
              const Icon = card.icon

              return (
                <div
                  key={index}
                  className="bg-white rounded-[28px] p-7 shadow-sm border border-gray-100 hover:shadow-xl transition"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-500">{card.title}</p>

                      <h3 className="text-4xl font-extrabold text-[#071739] mt-4">
                        {card.value}
                      </h3>

                      <p className="text-gray-500 mt-3">{card.text}</p>
                    </div>

                    <div className="w-16 h-16 rounded-2xl bg-[#071739] text-[#D4A63D] flex items-center justify-center">
                      <Icon size={30} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="grid xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2 bg-white rounded-[30px] p-8 shadow-sm border border-gray-100">
              <h3 className="text-2xl font-extrabold text-[#071739]">
                Activité récente
              </h3>

              <div className="mt-8 p-5 rounded-2xl bg-[#F8FAFC] text-gray-600">
                {notificationsCount > 0
                  ? `Vous avez ${notificationsCount} notification(s) non lue(s).`
                  : unreadRepliesCount > 0
                    ? `Vous avez ${unreadRepliesCount} réponse(s) non lue(s).`
                    : activeRequestsCount > 0
                      ? `Vous avez ${activeRequestsCount} demande(s) active(s).`
                      : 'Aucune activité récente pour le moment.'}
              </div>
            </div>

            <div className="bg-white rounded-[30px] p-8 shadow-sm border border-gray-100">
              <h3 className="text-2xl font-extrabold text-[#071739]">
                Informations du compte
              </h3>

              <div className="mt-6 space-y-4 text-gray-600">
                <p>
                  <strong>Nom :</strong> {client?.fullname || '-'}
                </p>

                <p>
                  <strong>Email :</strong> {client?.email || '-'}
                </p>

                <p>
                  <strong>Téléphone :</strong> {client?.phone || '-'}
                </p>

                <p>
                  <strong>Organisation :</strong> {client?.company || '-'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getDashboardStats } from '../../../services/dashboardService'
import { getUnreadRepliesCount } from '../../../services/requestReplyService'

import {
  LayoutDashboard,
  Mail,
  FileText,
  Newspaper,
  Users,
  LogOut,
  BriefcaseBusiness,
  Settings,
  Upload,
  Bell,
  ClipboardList,
} from 'lucide-react'

const menu = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Contacts', href: '/admin/contacts', icon: Mail },
  { label: 'Appels d’offres', href: '/admin/tenders', icon: FileText },
  { label: 'Actualités', href: '/admin/news', icon: Newspaper },
  { label: 'Clients', href: '/admin/clients', icon: Users },
  { label: 'Documents', href: '/admin/documents', icon: Upload },
  { label: 'Demandes clients', href: '/admin/requests', icon: ClipboardList },
  { label: 'Paramètres', href: '/admin/settings', icon: Settings },
]

export default function AdminDashboardPage() {
  const router = useRouter()
  const [admin, setAdmin] = useState<any>(null)
  const [unreadRepliesCount, setUnreadRepliesCount] = useState(0)

  const [stats, setStats] = useState({
    contacts: 0,
    tenders: 0,
    news: 0,
    clients: 0,
  })

  useEffect(() => {
    const token = localStorage.getItem('abg_admin_token')
    const adminData = localStorage.getItem('abg_admin')

    if (!token) {
      router.push('/admin/login')
      return
    }

    if (adminData) {
      setAdmin(JSON.parse(adminData))
    }

    getDashboardStats().then((res) => {

  console.log("Réponse API Dashboard :", res);

  if (res.success) {
    setStats(res.data)
  }

})

    getUnreadRepliesCount('admin').then((res) => {
      if (res.success) {
        setUnreadRepliesCount(res.total)
      }
    })
  }, [router])

  const dashboardCards = [
    { title: 'Demandes contact', value: stats.contacts, icon: Mail },
    { title: 'Appels d’offres', value: stats.tenders, icon: FileText },
    { title: 'Actualités', value: stats.news, icon: Newspaper },
    { title: 'Clients', value: stats.clients, icon: Users },
    { title: 'Réponses clients', value: unreadRepliesCount, icon: Bell },
  ]

  function logout() {
    localStorage.removeItem('abg_admin_token')
    localStorage.removeItem('abg_admin')
    router.push('/admin/login')
  }

  return (
    <main className="min-h-screen bg-[#F3F6FA] flex">
      <aside className="w-[290px] bg-[#071739] text-white min-h-screen p-6 hidden lg:flex flex-col">
        <div className="mb-12">
          <h1 className="text-2xl font-extrabold leading-tight">
            AFRICA BUSINESS
          </h1>
          <p className="text-[#D4A63D] font-bold">
            GATE – ADMIN
          </p>
        </div>

        <nav className="space-y-3 flex-1">
          {menu.map((item, index) => {
            const Icon = item.icon

            return (
              <Link
                key={index}
                href={item.href}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition ${
                  index === 0
                    ? 'bg-[#D4A63D] text-[#071739] font-bold'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon size={22} />
                {item.label}
              </Link>
            )
          })}
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
              Tableau de bord
            </h2>
            <p className="text-gray-500 mt-1">
              Bienvenue, {admin?.name || 'Administrateur'}
            </p>
          </div>

          <div className="flex items-center gap-5">
            <div className="relative">
              <button className="w-12 h-12 rounded-full bg-[#F3F6FA] flex items-center justify-center text-[#071739]">
                <Bell size={22} />
              </button>

              {unreadRepliesCount > 0 && (
                <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold">
                  {unreadRepliesCount}
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#071739] text-[#D4A63D] flex items-center justify-center font-bold">
                AB
              </div>

              <div className="hidden md:block">
                <p className="font-bold text-[#071739]">
                  {admin?.name || 'Admin ABG'}
                </p>
                <p className="text-sm text-gray-500">
                  {admin?.role || 'admin'}
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          <div className="relative overflow-hidden rounded-[35px] bg-[#071739] p-10 mb-10 text-white">
            <div className="absolute right-0 top-0 w-80 h-80 bg-[#D4A63D]/20 rounded-full blur-3xl" />

            <div className="relative z-10 flex flex-col lg:flex-row justify-between gap-8 items-start lg:items-center">
              <div>
                <p className="uppercase tracking-[4px] text-[#D4A63D] font-bold">
                  Administration
                </p>

                <h1 className="text-4xl md:text-5xl font-extrabold mt-4">
                  Gestion centrale ABG – RCA
                </h1>

                <p className="text-gray-300 mt-4 max-w-2xl leading-8">
                  Suivez les demandes, appels d’offres, actualités,
                  documents et activités clients depuis un espace sécurisé.
                </p>
              </div>

              <Link
                href="/admin/requests"
                className="bg-[#D4A63D] text-[#071739] px-7 py-4 rounded-2xl font-bold flex items-center gap-3"
              >
                <BriefcaseBusiness size={22} />
                Nouvelle action
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-6 mb-10">
            {dashboardCards.map((card, index) => {
              const Icon = card.icon

              return (
                <div
                  key={index}
                  className="bg-white rounded-[28px] p-7 shadow-sm border border-gray-100 hover:shadow-xl transition"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-500">
                        {card.title}
                      </p>

                      <h3 className="text-5xl font-extrabold text-[#071739] mt-4">
                        {card.value}
                      </h3>
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

              <div className="mt-8 space-y-5">
                <div className="p-5 rounded-2xl bg-[#F8FAFC] flex justify-between">
                  <span className="text-gray-600">
                    {unreadRepliesCount > 0
                      ? `${unreadRepliesCount} réponse(s) client non lue(s)`
                      : 'Aucune activité récente'}
                  </span>
                  <span className="text-gray-400">—</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[30px] p-8 shadow-sm border border-gray-100">
              <h3 className="text-2xl font-extrabold text-[#071739]">
                Actions rapides
              </h3>

              <div className="mt-8 space-y-4">
                <Link
                  href="/admin/tenders"
                  className="block text-center w-full bg-[#071739] text-white py-4 rounded-2xl font-bold"
                >
                  Ajouter un appel d’offres
                </Link>

                <Link
                  href="/admin/news"
                  className="block text-center w-full bg-[#F8FAFC] text-[#071739] py-4 rounded-2xl font-bold"
                >
                  Publier une actualité
                </Link>

                <Link
                  href="/admin/contacts"
                  className="block text-center w-full bg-[#D4A63D] text-[#071739] py-4 rounded-2xl font-bold"
                >
                  Voir les contacts
                </Link>

                <Link
                  href="/admin/requests"
                  className="block text-center w-full bg-green-600 text-white py-4 rounded-2xl font-bold"
                >
                  Gérer les demandes clients
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
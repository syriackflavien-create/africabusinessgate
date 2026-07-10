'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import {
  ArrowLeft,
  FileText,
  User,
  Building2,
  Calendar,
  RefreshCw,
  Send,
  Download,
  Paperclip,
  MessageSquare,
  Search,
  Filter,
} from 'lucide-react'

import {
  getAdminRequests,
  updateRequestStatus,
} from '../../../services/adminRequestService'

import {
  getRequestReplies,
  replyToRequest,
  markRepliesAsRead,
} from '../../../services/requestReplyService'

type AdminRequest = {
  id: number
  subject: string
  service: string
  message: string
  status: string
  created_at: string
  client_id: number
  fullname: string
  email: string
  company: string
  updated_at: string
  last_activity_at: string
  last_activity_by: string
  replies_count: number
}

type Reply = {
  id: number
  request_id: number
  sender_type: string
  sender_id: number
  message: string
  attachment: string | null
  created_at: string
}

export default function AdminRequestsPage() {
  const router = useRouter()

  const [requests, setRequests] = useState<AdminRequest[]>([])
  const [replies, setReplies] = useState<Record<number, Reply[]>>({})
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    const token = localStorage.getItem('abg_admin_token')

    if (!token) {
      router.push('/admin/login')
      return
    }

    loadRequests()
  }, [router])

  async function loadRequests() {
    const res = await getAdminRequests()

    if (res.success) {
      setRequests(res.data)

      res.data.forEach((request: AdminRequest) => {
        loadReplies(request.id)
      })
    }
  }

  async function loadReplies(requestId: number) {
    const res = await getRequestReplies(requestId, 'admin')

    if (res.success) {
      setReplies((prev) => ({
        ...prev,
        [requestId]: res.data,
      }))

      await markRepliesAsRead(requestId, 'admin')
    }
  }

  async function handleStatusChange(id: number, status: string) {
    setLoading(true)

    const res = await updateRequestStatus(id, status)

    if (res.success) {
      loadRequests()
    } else {
      alert(res.message || 'Erreur modification statut')
    }

    setLoading(false)
  }

  async function handleReply(
    e: React.FormEvent<HTMLFormElement>,
    requestId: number
  ) {
    e.preventDefault()
    setLoading(true)

    const form = e.currentTarget
    const formData = new FormData(form)
    formData.append('request_id', String(requestId))

    const res = await replyToRequest(formData)

    if (res.success) {
      alert('Réponse envoyée au client')
      form.reset()
      loadReplies(requestId)
    } else {
      alert(res.message || 'Erreur envoi réponse')
    }

    setLoading(false)
  }

  function statusLabel(status: string) {
    if (status === 'pending') return 'En attente'
    if (status === 'in_progress') return 'En cours'
    if (status === 'completed') return 'Terminée'
    if (status === 'rejected') return 'Rejetée'
    return status
  }

  function statusClass(status: string) {
    if (status === 'pending') return 'bg-yellow-100 text-yellow-700'
    if (status === 'in_progress') return 'bg-blue-100 text-blue-700'
    if (status === 'completed') return 'bg-green-100 text-green-700'
    if (status === 'rejected') return 'bg-red-100 text-red-700'
    return 'bg-gray-100 text-gray-700'
  }

  const filteredRequests = requests.filter((request) => {
    const query = search.toLowerCase()

    const matchesSearch =
      request.subject.toLowerCase().includes(query) ||
      request.service.toLowerCase().includes(query) ||
      request.message.toLowerCase().includes(query) ||
      request.fullname.toLowerCase().includes(query) ||
      request.email.toLowerCase().includes(query) ||
      (request.company || '').toLowerCase().includes(query)

    const matchesStatus =
      statusFilter === 'all' || request.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <main className="min-h-screen bg-[#F3F6FA] p-8">
      <div className="max-w-7xl mx-auto">
        <Link
          href="/admin/dashboard"
          className="inline-flex items-center gap-2 text-[#071739] font-bold mb-8"
        >
          <ArrowLeft size={20} />
          Retour dashboard
        </Link>

        <div className="bg-[#071739] text-white rounded-[35px] p-10 mb-8">
          <p className="uppercase tracking-[4px] text-[#D4A63D] font-bold">
            Administration
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold mt-4">
            Demandes clients
          </h1>

          <p className="text-gray-300 mt-4 max-w-3xl">
            Consultez, suivez, répondez et traitez toutes les demandes envoyées par les clients.
          </p>
        </div>

        <div className="bg-white rounded-[28px] p-6 mb-8 shadow-sm border border-gray-100 grid md:grid-cols-2 gap-5">
          <div className="relative">
            <Search
              size={20}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher une demande, client, email, service..."
              className="w-full border rounded-2xl pl-14 pr-5 py-4"
            />
          </div>

          <div className="relative">
            <Filter
              size={20}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full border rounded-2xl pl-14 pr-5 py-4 bg-white"
            >
              <option value="all">Tous les statuts</option>
              <option value="pending">En attente</option>
              <option value="in_progress">En cours</option>
              <option value="completed">Terminée</option>
              <option value="rejected">Rejetée</option>
            </select>
          </div>
        </div>

        <div className="space-y-6">
          {filteredRequests.length === 0 ? (
            <div className="bg-white rounded-[30px] p-8 text-gray-500">
              Aucune demande ne correspond à votre recherche.
            </div>
          ) : (
            filteredRequests.map((request) => (
              <div
                key={request.id}
                className="bg-white rounded-[28px] p-7 shadow-sm border border-gray-100"
              >
                <div className="flex flex-col xl:flex-row justify-between gap-6">
                  <div className="flex gap-4 flex-1">
                    <div className="w-14 h-14 rounded-2xl bg-[#071739] text-[#D4A63D] flex items-center justify-center shrink-0">
                      <FileText />
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap gap-3 items-center">
                        <h3 className="text-2xl font-extrabold text-[#071739]">
                          {request.subject}
                        </h3>

                        <span
                          className={`px-4 py-2 rounded-full text-sm font-bold ${statusClass(
                            request.status
                          )}`}
                        >
                          {statusLabel(request.status)}
                        </span>
                      </div>

                      <p className="text-sm text-gray-500 mt-2">
                        Service : {request.service}
                      </p>

                      <p className="text-gray-600 mt-4 leading-7 max-w-4xl">
                        {request.message}
                      </p>

                      <div className="flex flex-wrap gap-5 text-gray-500 mt-5 text-sm">
                        <span className="flex items-center gap-2">
                          <User size={16} />
                          {request.fullname} — {request.email}
                        </span>

                        <span className="flex items-center gap-2">
                          <Building2 size={16} />
                          {request.company || 'Organisation non précisée'}
                        </span>

                        <span className="flex items-center gap-2">
                          <Calendar size={16} />
                          Créée : {request.created_at}
                        </span>

                        <span className="flex items-center gap-2">
                          <Calendar size={16} />
                          Dernière activité : {request.last_activity_at} par{' '}
                          {request.last_activity_by === 'admin'
                            ? 'Admin ABG'
                            : 'Client'}
                        </span>

                        <span className="flex items-center gap-2">
                          <MessageSquare size={16} />
                          {request.replies_count} échange(s)
                        </span>
                      </div>

                      <div className="mt-8 bg-[#F8FAFC] rounded-2xl p-5">
                        <h4 className="font-extrabold text-[#071739] mb-4">
                          Historique des réponses
                        </h4>

                        {(replies[request.id] || []).length === 0 ? (
                          <p className="text-gray-500">
                            Aucune réponse pour le moment.
                          </p>
                        ) : (
                          <div className="space-y-4">
                            {(replies[request.id] || []).map((reply) => (
                              <div
                                key={reply.id}
                                className={`rounded-2xl p-4 ${
                                  reply.sender_type === 'admin'
                                    ? 'bg-[#071739] text-white'
                                    : 'bg-white text-gray-700'
                                }`}
                              >
                                <p className="font-bold mb-2">
                                  {reply.sender_type === 'admin'
                                    ? 'Admin ABG'
                                    : 'Client'}
                                </p>

                                <p className="leading-7">
                                  {reply.message}
                                </p>

                                {reply.attachment && (
                                  <a
                                    href={`http://localhost/abg-api/${reply.attachment}`}
                                    target="_blank"
                                    className="inline-flex items-center gap-2 mt-3 text-[#D4A63D] font-bold"
                                  >
                                    <Download size={17} />
                                    Voir la pièce jointe
                                  </a>
                                )}

                                <p className="text-xs mt-3 opacity-70">
                                  {reply.created_at}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <form
                        onSubmit={(e) => handleReply(e, request.id)}
                        className="mt-5 bg-white border border-gray-100 rounded-2xl p-5 space-y-4"
                      >
                        <textarea
                          name="message"
                          rows={4}
                          placeholder="Écrire une réponse au client..."
                          className="w-full border rounded-2xl px-5 py-4"
                          required
                        />

                        <label className="flex items-center gap-2 text-sm font-bold text-gray-500">
                          <Paperclip size={17} />
                          Pièce jointe optionnelle
                        </label>

                        <input
                          name="attachment"
                          type="file"
                          accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.webp"
                          className="w-full border rounded-2xl px-5 py-4 bg-white"
                        />

                        <button
                          disabled={loading}
                          className="bg-[#D4A63D] text-[#071739] px-6 py-3 rounded-xl font-bold inline-flex items-center gap-2"
                        >
                          <Send size={18} />
                          {loading ? 'Envoi...' : 'Répondre'}
                        </button>
                      </form>
                    </div>
                  </div>

                  <div className="min-w-[240px]">
                    <label className="text-sm font-bold text-[#071739]">
                      Changer le statut
                    </label>

                    <select
                      value={request.status}
                      disabled={loading}
                      onChange={(e) =>
                        handleStatusChange(request.id, e.target.value)
                      }
                      className="w-full mt-2 border rounded-2xl px-5 py-4 bg-white"
                    >
                      <option value="pending">En attente</option>
                      <option value="in_progress">En cours</option>
                      <option value="completed">Terminée</option>
                      <option value="rejected">Rejetée</option>
                    </select>

                    <button
                      type="button"
                      onClick={loadRequests}
                      className="mt-4 w-full flex items-center justify-center gap-2 bg-[#F8FAFC] text-[#071739] py-3 rounded-xl font-bold"
                    >
                      <RefreshCw size={18} />
                      Actualiser
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  )
}
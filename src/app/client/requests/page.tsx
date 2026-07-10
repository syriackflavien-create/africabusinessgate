'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import {
  ArrowLeft,
  Send,
  FileText,
  Calendar,
  Clock,
  Download,
  MessageSquare,
  Paperclip,
} from 'lucide-react'

import {
  createClientRequest,
  getClientRequests,
} from '../../../services/clientRequestService'

import {
  getRequestReplies,
  clientReplyToRequest,
  markRepliesAsRead,
} from '../../../services/requestReplyService'

type ClientRequest = {
  id: number
  subject: string
  service: string
  message: string
  status: string
  created_at: string
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

export default function ClientRequestsPage() {
  const router = useRouter()

  const [requests, setRequests] = useState<ClientRequest[]>([])
  const [replies, setReplies] = useState<Record<number, Reply[]>>({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('abg_client_token')

    if (!token) {
      router.push('/client/login')
      return
    }

    loadRequests()
  }, [router])

  async function loadRequests() {
    const res = await getClientRequests()

    if (res.success) {
      setRequests(res.data)

      res.data.forEach((request: ClientRequest) => {
        loadReplies(request.id)
      })
    }
  }

async function loadReplies(requestId: number) {
  const res = await getRequestReplies(requestId, 'client')

  if (res.success) {
    setReplies((prev) => ({
      ...prev,
      [requestId]: res.data,
    }))

    await markRepliesAsRead(requestId, 'client')
  }
}

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const form = e.currentTarget
    const formData = new FormData(form)

    const res = await createClientRequest(formData)

    if (res.success) {
      alert('Demande envoyée avec succès')
      form.reset()
      loadRequests()
    } else {
      alert(res.message || 'Erreur lors de l’envoi')
    }

    setLoading(false)
  }

  async function handleClientReply(
    e: React.FormEvent<HTMLFormElement>,
    requestId: number
  ) {
    e.preventDefault()
    setLoading(true)

    const form = e.currentTarget
    const formData = new FormData(form)

    formData.append('request_id', String(requestId))

    const res = await clientReplyToRequest(formData)

    if (res.success) {
      alert('Réponse envoyée')
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

  return (
    <main className="min-h-screen bg-[#F3F6FA] p-8">
      <div className="max-w-7xl mx-auto">
        <Link
          href="/client/dashboard"
          className="inline-flex items-center gap-2 text-[#071739] font-bold mb-8"
        >
          <ArrowLeft size={20} />
          Retour Dashboard
        </Link>

        <div className="bg-[#071739] text-white rounded-[35px] p-10 mb-8">
          <p className="uppercase tracking-[4px] text-[#D4A63D] font-bold">
            Espace client
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold mt-4">
            Mes demandes
          </h1>

          <p className="text-gray-300 mt-4 max-w-3xl">
            Envoyez une demande à AFRICA BUSINESS GATE et suivez son traitement.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-[30px] p-8 shadow-sm border border-gray-100 space-y-5 h-fit"
          >
            <h2 className="text-2xl font-extrabold text-[#071739]">
              Nouvelle demande
            </h2>

            <input
              name="subject"
              placeholder="Objet de la demande"
              className="w-full border rounded-2xl px-5 py-4"
              required
            />

            <select
              name="service"
              className="w-full border rounded-2xl px-5 py-4"
              required
            >
              <option value="">Choisir un service</option>
              <option value="Création d’entreprise">Création d’entreprise</option>
              <option value="Investissement">Investissement</option>
              <option value="Appels d’offres">Appels d’offres</option>
              <option value="Assistance administrative">
                Assistance administrative
              </option>
              <option value="Partenariat">Partenariat</option>
              <option value="Autre">Autre</option>
            </select>

            <textarea
              name="message"
              rows={7}
              placeholder="Décrivez votre demande..."
              className="w-full border rounded-2xl px-5 py-4"
              required
            />

            <button
              disabled={loading}
              className="w-full bg-[#D4A63D] text-[#071739] py-4 rounded-2xl font-bold flex items-center justify-center gap-3"
            >
              <Send size={20} />
              {loading ? 'Envoi...' : 'Envoyer la demande'}
            </button>
          </form>

          <div className="space-y-5">
            {requests.length === 0 ? (
              <div className="bg-white rounded-[30px] p-8 text-gray-500">
                Aucune demande envoyée pour le moment.
              </div>
            ) : (
              requests.map((request) => (
                <div
                  key={request.id}
                  className="bg-white rounded-[28px] p-6 shadow-sm border border-gray-100"
                >
                  <div className="flex gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#071739] text-[#D4A63D] flex items-center justify-center shrink-0">
                      <FileText />
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between gap-4">
                        <h3 className="text-xl font-extrabold text-[#071739]">
                          {request.subject}
                        </h3>

                        <span
                          className={`px-4 py-2 rounded-full text-sm font-bold h-fit ${statusClass(
                            request.status
                          )}`}
                        >
                          {statusLabel(request.status)}
                        </span>
                      </div>

                      <p className="text-sm text-gray-500 mt-2">
                        Service : {request.service}
                      </p>

                      <p className="text-gray-600 mt-4 leading-7">
                        {request.message}
                      </p>

                      <div className="flex flex-wrap gap-5 text-gray-500 mt-5 text-sm">
                        <span className="flex items-center gap-2">
                          <Calendar size={16} />
                          Créée : {request.created_at}
                        </span>

                        <span className="flex items-center gap-2">
                          <Clock size={16} />
                          Mise à jour : {request.updated_at}
                          <span className="flex items-center gap-2">
  <Clock size={16} />
  Dernière activité : {request.last_activity_at} par{' '}
  {request.last_activity_by === 'admin' ? 'ABG' : 'Vous'}
</span>

<span className="flex items-center gap-2">
  <MessageSquare size={16} />
  {request.replies_count} échange(s)
</span>
                        </span>
                      </div>

                      <div className="mt-7 bg-[#F8FAFC] rounded-2xl p-5">
                        <h4 className="font-extrabold text-[#071739] mb-4 flex items-center gap-2">
                          <MessageSquare size={18} />
                          Historique des échanges
                        </h4>

                        {(replies[request.id] || []).length === 0 ? (
                          <p className="text-gray-500">
                            Aucune réponse de l’administration pour le moment.
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
                                    ? 'AFRICA BUSINESS GATE'
                                    : 'Vous'}
                                </p>

                                <p className="leading-7">{reply.message}</p>

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

                        <form
                          onSubmit={(e) => handleClientReply(e, request.id)}
                          className="mt-5 bg-white border border-gray-100 rounded-2xl p-5 space-y-4"
                        >
                          <textarea
                            name="message"
                            rows={4}
                            placeholder="Répondre à l’administration..."
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
                            accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.webp,.zip"
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
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  )
}